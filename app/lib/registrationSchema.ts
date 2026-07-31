/**
 * Pure-TypeScript validation and sanitization for event registration.
 * No external dependencies — keeps the server bundle lean.
 */

export interface RegistrationFormData {
  fullName: string;
  email: string;
  phone: string;
  university: string;
  course: string;
  yearOfStudy: string;
  rollNumber?: string;
  eventName: string;
  reason?: string;
  consented: boolean;
}

export type ValidationResult =
  | { valid: true; data: RegistrationFormData }
  | { valid: false; errors: Record<string, string> };

/** Allowed year-of-study values */
export const YEAR_OF_STUDY_OPTIONS = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  '4th Year',
  'Postgraduate',
  'PhD',
] as const;

// ─── Sanitizers ───────────────────────────────────────────────────────────────

/** Strips leading/trailing whitespace and collapses internal runs */
function trim(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.trim().replace(/\s+/g, ' ');
}

/** Encodes HTML-sensitive characters to prevent stored XSS */
function sanitize(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// ─── Validators ───────────────────────────────────────────────────────────────

const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
const PHONE_RE = /^[6-9]\d{9}$/; // Indian mobile: starts 6-9, 10 digits

function validateEmail(email: string): string | null {
  if (!email) return 'Email address is required.';
  if (!EMAIL_RE.test(email)) return 'Please enter a valid email address.';
  if (email.length > 254) return 'Email address is too long.';
  return null;
}

function validatePhone(phone: string): string | null {
  const digits = phone.replace(/[\s\-().+]/g, '');
  if (!digits) return 'Phone number is required.';
  if (!PHONE_RE.test(digits)) return 'Enter a valid 10-digit Indian mobile number.';
  return null;
}

// ─── Main Validator ───────────────────────────────────────────────────────────

export function validateRegistration(raw: unknown): ValidationResult {
  if (!raw || typeof raw !== 'object') {
    return { valid: false, errors: { _form: 'Invalid request body.' } };
  }

  const body = raw as Record<string, unknown>;
  const errors: Record<string, string> = {};

  // Full Name
  const fullName = sanitize(trim(body.fullName));
  if (!fullName) errors.fullName = 'Full name is required.';
  else if (fullName.length < 2) errors.fullName = 'Name must be at least 2 characters.';
  else if (fullName.length > 120) errors.fullName = 'Name is too long (max 120 chars).';

  // Email
  const email = trim(body.email).toLowerCase();
  const emailErr = validateEmail(email);
  if (emailErr) errors.email = emailErr;

  // Phone
  const phone = trim(body.phone);
  const phoneErr = validatePhone(phone);
  if (phoneErr) errors.phone = phoneErr;

  // University
  const university = sanitize(trim(body.university));
  if (!university) errors.university = 'University/College is required.';
  else if (university.length > 200) errors.university = 'University name is too long.';

  // Course
  const course = sanitize(trim(body.course));
  if (!course) errors.course = 'Course/Branch is required.';
  else if (course.length > 120) errors.course = 'Course name is too long.';

  // Year of Study
  const yearOfStudy = trim(body.yearOfStudy);
  if (!yearOfStudy) {
    errors.yearOfStudy = 'Year of study is required.';
  } else if (!(YEAR_OF_STUDY_OPTIONS as readonly string[]).includes(yearOfStudy)) {
    errors.yearOfStudy = 'Select a valid year of study.';
  }

  // Roll Number (optional, 80 chars max)
  const rollNumber = sanitize(trim(body.rollNumber));
  if (rollNumber && rollNumber.length > 80) {
    errors.rollNumber = 'Enrollment number is too long.';
  }

  // Event Name (server-supplied / auto-filled — still validated)
  const eventName = sanitize(trim(body.eventName));
  if (!eventName) errors.eventName = 'Event name is required.';
  else if (eventName.length > 200) errors.eventName = 'Event name is too long.';

  // Reason (optional, 1000 chars max)
  const reason = sanitize(trim(body.reason));
  if (reason && reason.length > 1000) {
    errors.reason = 'Response is too long (max 1000 characters).';
  }

  // Consent
  const consented = body.consented === true || body.consented === 'true';
  if (!consented) errors.consented = 'You must agree to the terms before submitting.';

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    data: {
      fullName,
      email,
      phone: phone.replace(/[\s\-().+]/g, ''), // store normalized digits
      university,
      course,
      yearOfStudy,
      rollNumber: rollNumber || undefined,
      eventName,
      reason: reason || undefined,
      consented,
    },
  };
}
