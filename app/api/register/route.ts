import { NextRequest } from 'next/server';
import { getSupabaseAdmin } from '../../lib/supabase';
import { getResend } from '../../lib/resend';
import { validateRegistration } from '../../lib/registrationSchema';
import { buildHREmail, buildConfirmationEmail } from '../../lib/emailTemplates';

// ─── Rate Limiting (in-memory sliding window) ─────────────────────────────────
// Max 3 submissions per IP per 60-second window.
// This resets on Vercel cold starts; suitable for low-volume spam prevention.
const rateLimitMap = new Map<string, { count: number; windowStart: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 60 seconds

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) return true;

  entry.count += 1;
  return false;
}

// ─── Registration ID Generator ─────────────────────────────────────────────────
function generateRegId(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no I, O, 0, 1 (confusable)
  let suffix = '';
  for (let i = 0; i < 6; i++) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }
  return `SOAR-${date}-${suffix}`;
}

// ─── POST Handler ──────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  // 1. Rate limiting
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';

  if (isRateLimited(ip)) {
    return Response.json(
      { success: false, error: 'Too many requests. Please wait a minute before trying again.' },
      { status: 429 }
    );
  }

  // 2. Parse body
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return Response.json(
      { success: false, error: 'Invalid JSON body.' },
      { status: 400 }
    );
  }

  // 3. Validate & sanitize
  const result = validateRegistration(rawBody);
  if (!result.valid) {
    return Response.json(
      { success: false, error: 'Validation failed.', fieldErrors: result.errors },
      { status: 400 }
    );
  }

  const data = result.data;

  // 4. Check for duplicate registration (same email + event)
  const supabaseAdmin = getSupabaseAdmin();
  const { data: existing, error: lookupError } = await supabaseAdmin
    .from('event_registrations')
    .select('id')
    .eq('email', data.email)
    .eq('event_name', data.eventName)
    .maybeSingle();

  if (lookupError) {
    console.error('[register] Supabase lookup error:', lookupError);
    return Response.json(
      { success: false, error: 'Server error. Please try again later.' },
      { status: 500 }
    );
  }

  if (existing) {
    return Response.json(
      {
        success: false,
        error: `You have already registered for "${data.eventName}" with this email address.`,
        code: 'DUPLICATE',
      },
      { status: 409 }
    );
  }

  // 5. Generate Registration ID
  const regId = generateRegId();
  const now = new Date().toISOString();

  // 6. Insert into Supabase
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error: insertError } = await (supabaseAdmin as any)
    .from('event_registrations')
    .insert({
      reg_id: regId,
      full_name: data.fullName,
      email: data.email,
      phone: data.phone,
      university: data.university,
      course: data.course,
      year_of_study: data.yearOfStudy,
      roll_number: data.rollNumber ?? null,
      event_name: data.eventName,
      reason: data.reason ?? null,
      consented: data.consented,
    });

  if (insertError) {
    // Handle the unique constraint race condition (concurrent duplicate submission)
    if (insertError.code === '23505') {
      return Response.json(
        {
          success: false,
          error: `You have already registered for "${data.eventName}" with this email address.`,
          code: 'DUPLICATE',
        },
        { status: 409 }
      );
    }
    console.error('[register] Supabase insert error:', insertError);
    return Response.json(
      { success: false, error: 'Failed to save registration. Please try again.' },
      { status: 500 }
    );
  }

  // 7. Send emails (fire-and-forget, don't block on email failure)
  const hrEmail = process.env.HR_EMAIL ?? 'soarxjmichapter@gmail.com';
  const resend = getResend();

  const emailPromises = [
    // HR notification
    resend.emails.send({
      // ✅ TESTING: Use 'onboarding@resend.dev' until you verify a domain in Resend.
      // 🚀 PRODUCTION: Replace with 'SoarJMI Registrations <noreply@yourdomain.com>'
      from: 'SoarJMI Registrations <onboarding@resend.dev>',
      to: [hrEmail],
      subject: `[SoarJMI] New Registration — ${data.eventName} (${regId})`,
      html: buildHREmail(data, regId, now),
    }),
    // Participant confirmation
    resend.emails.send({
      // ✅ TESTING: Use 'onboarding@resend.dev' until you verify a domain in Resend.
      // 🚀 PRODUCTION: Replace with 'SoarJMI <noreply@yourdomain.com>'
      from: 'SoarJMI <onboarding@resend.dev>',
      to: [data.email],
      subject: `You're registered for ${data.eventName} — SoarJMI`,
      html: buildConfirmationEmail(data, regId),
    }),
  ];

  // Log email errors but don't fail the registration
  Promise.allSettled(emailPromises).then((results) => {
    results.forEach((r, i) => {
      if (r.status === 'rejected') {
        console.error(`[register] Email ${i === 0 ? 'HR' : 'confirmation'} failed:`, r.reason);
      }
    });
  });

  // 8. Success
  return Response.json(
    {
      success: true,
      regId,
      message: `Registration confirmed! Your ID is ${regId}. Check your email for confirmation.`,
    },
    { status: 201 }
  );
}
