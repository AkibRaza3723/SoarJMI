import { NextRequest } from 'next/server';
import { getSupabaseAdmin } from '../../lib/supabase';
import { getResend } from '../../lib/resend';
import { validateRecruitment } from '../../lib/recruitmentSchema';
import { buildRecruitmentHREmail, buildRecruitmentConfirmationEmail } from '../../lib/emailTemplates';

// ─── Rate Limiting (in-memory sliding window) ─────────────────────────────────
const rateLimitMap = new Map<string, { count: number; windowStart: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

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

function generateAppId(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
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
  const result = validateRecruitment(rawBody);
  if (!result.valid) {
    return Response.json(
      { success: false, error: 'Validation failed.', fieldErrors: result.errors },
      { status: 400 }
    );
  }

  const data = result.data;

  // 4. Check for duplicate registration
  const supabaseAdmin = getSupabaseAdmin();
  const { data: existing, error: lookupError } = await supabaseAdmin
    .from('recruitment_applications')
    .select('id')
    .eq('email', data.email)
    .maybeSingle();

  if (lookupError) {
    console.error('[recruit] Supabase lookup error:', lookupError);
    return Response.json(
      { success: false, error: 'Server error. Please try again later.' },
      { status: 500 }
    );
  }

  if (existing) {
    return Response.json(
      {
        success: false,
        error: `You have already submitted an application with this email address.`,
        code: 'DUPLICATE',
      },
      { status: 409 }
    );
  }

  // 5. Generate Application ID
  const appId = generateAppId();
  const now = new Date().toISOString();

  // 6. Insert into Supabase
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error: insertError } = await (supabaseAdmin as any)
    .from('recruitment_applications')
    .insert({
      app_id: appId,
      name: data.name,
      contact_no: data.contactNo,
      email: data.email,
      course: data.course,
      year_of_study: data.yearOfStudy,
      department: data.department,
      team_1: data.team1,
      team_2: data.team2,
      team_1_answers: data.team1Answers,
      team_2_answers: data.team2Answers,
    });

  if (insertError) {
    if (insertError.code === '23505') {
      return Response.json(
        {
          success: false,
          error: `You have already submitted an application with this email address.`,
          code: 'DUPLICATE',
        },
        { status: 409 }
      );
    }
    console.error('[recruit] Supabase insert error:', insertError);
    return Response.json(
      { success: false, error: 'Failed to save application. Please try again.' },
      { status: 500 }
    );
  }

  // 7. Send emails
  const hrEmail = process.env.HR_EMAIL ?? 'soarxjmichapter@gmail.com';
  const resend = getResend();

  const emailPromises = [
    // HR notification
    resend.emails.send({
      from: 'SoarJMI Recruitment <onboarding@resend.dev>',
      to: [hrEmail],
      subject: `[SoarJMI Recruitment] New Application — ${data.name} (${appId})`,
      html: buildRecruitmentHREmail(data, appId, now),
    }),
    // Applicant confirmation
    resend.emails.send({
      from: 'SoarJMI <onboarding@resend.dev>',
      to: [data.email],
      subject: `Application Received — SoarJMI`,
      html: buildRecruitmentConfirmationEmail(data, appId),
    }),
  ];

  Promise.allSettled(emailPromises).then((results) => {
    results.forEach((r, i) => {
      if (r.status === 'rejected') {
        console.error(`[recruit] Email ${i === 0 ? 'HR' : 'confirmation'} failed:`, r.reason);
      }
    });
  });

  // 8. Success
  return Response.json(
    {
      success: true,
      appId,
      message: `Application submitted successfully! Your ID is ${appId}.`,
    },
    { status: 201 }
  );
}
