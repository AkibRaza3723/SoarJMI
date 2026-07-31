import { Resend } from 'resend';

/**
 * Resend email client — lazy singleton.
 * Only import from Route Handlers / Server Components.
 * Lazy init prevents build failures when RESEND_API_KEY is not set.
 */

let _resend: Resend | null = null;

export function getResend(): Resend {
  if (_resend) return _resend;

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    throw new Error(
      'Missing RESEND_API_KEY environment variable. Set it in .env.local (or Vercel environment).'
    );
  }

  _resend = new Resend(resendApiKey);
  return _resend;
}
