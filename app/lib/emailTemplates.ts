import { RegistrationFormData } from './registrationSchema';
import { RecruitmentFormData } from './recruitmentSchema';

/**
 * Formats a date string as IST (Indian Standard Time).
 */
function toIST(dateStr: string): string {
  return new Date(dateStr).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'short',
  });
}

// ─── Shared brand tokens ──────────────────────────────────────────────────────
const BRAND_GREEN = '#22c55e';
const BRAND_DARK = '#020c04';
const BRAND_CREAM = '#FBF5EC';
const BRAND_BROWN = '#4A2C0A';

// ─── HR Notification Email ────────────────────────────────────────────────────

export function buildHREmail(data: RegistrationFormData, regId: string, submittedAt: string): string {
  const rows = [
    ['Registration ID', `<code style="background:#f0fff0;padding:2px 8px;border-radius:4px;font-family:monospace;color:${BRAND_GREEN};font-weight:700">${regId}</code>`],
    ['Full Name', data.fullName],
    ['Email', `<a href="mailto:${data.email}" style="color:${BRAND_GREEN}">${data.email}</a>`],
    ['Phone', data.phone],
    ['University / College', data.university],
    ['Course / Branch', data.course],
    ['Year of Study', data.yearOfStudy],
    ['Roll Number', data.rollNumber || '<em style="color:#888">Not provided</em>'],
    ['Event Name', `<strong>${data.eventName}</strong>`],
    ['Why do you want to join?', data.reason || '<em style="color:#888">Not provided</em>'],
    ['Consent Given', data.consented ? '✅ Yes' : '❌ No'],
    ['Submitted At (IST)', toIST(submittedAt)],
  ];

  const tableRows = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:10px 16px;font-family:monospace;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#5C4A32;background:#FBF5EC;border-bottom:1px solid #EDE4D6;white-space:nowrap;font-weight:600">${label}</td>
        <td style="padding:10px 16px;font-size:14px;color:#2C1F0E;background:#FFFFFF;border-bottom:1px solid #EDE4D6">${value}</td>
      </tr>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>New Registration — ${data.eventName}</title></head>
<body style="margin:0;padding:0;background:#F5F0E8;font-family:'Helvetica Neue',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:40px auto;background:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">
    <!-- Header -->
    <tr>
      <td style="background:linear-gradient(135deg,${BRAND_BROWN} 0%,#7A3D18 100%);padding:32px 40px">
        <p style="margin:0 0 6px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.16em;color:rgba(251,245,236,0.7)">SoarJMI · HR Portal</p>
        <h1 style="margin:0;font-size:24px;font-weight:800;color:${BRAND_CREAM};letter-spacing:-0.02em">New Event Registration</h1>
        <p style="margin:8px 0 0;font-size:14px;color:rgba(251,245,236,0.8)">${data.eventName}</p>
      </td>
    </tr>
    <!-- Body -->
    <tr>
      <td style="padding:32px 40px 16px">
        <p style="margin:0 0 20px;font-size:14px;color:#5C4A32">A new participant has registered. Full details below:</p>
        <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;border:1px solid #EDE4D6">
          ${tableRows}
        </table>
      </td>
    </tr>
    <!-- Footer -->
    <tr>
      <td style="padding:24px 40px 32px">
        <p style="margin:0;font-size:11px;color:#9E825E;text-align:center">This is an automated notification from the SoarJMI registration system. Do not reply to this email.</p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ─── Participant Confirmation Email ───────────────────────────────────────────

export function buildConfirmationEmail(data: RegistrationFormData, regId: string): string {
  const firstName = data.fullName.split(' ')[0];

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Registration Confirmed — ${data.eventName}</title></head>
<body style="margin:0;padding:0;background:#F5F0E8;font-family:'Helvetica Neue',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:40px auto;background:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">

    <!-- Hero Header -->
    <tr>
      <td style="background:linear-gradient(135deg,${BRAND_DARK} 0%,#06180a 100%);padding:40px;text-align:center">
        <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;color:rgba(34,197,94,0.7)">SoarJMI · Registration Confirmed</p>
        <div style="font-size:48px;margin:16px 0">🎉</div>
        <h1 style="margin:0;font-size:26px;font-weight:800;color:#e8ffe8;letter-spacing:-0.02em">You&rsquo;re In, ${firstName}!</h1>
        <p style="margin:10px 0 0;font-size:14px;color:rgba(232,255,232,0.7)">Your spot has been confirmed for</p>
        <p style="margin:6px 0 0;font-size:18px;font-weight:700;color:${BRAND_GREEN}">${data.eventName}</p>
      </td>
    </tr>

    <!-- Registration ID Callout -->
    <tr>
      <td style="padding:28px 40px 0">
        <div style="background:#f0fff0;border:1px solid rgba(34,197,94,0.25);border-radius:10px;padding:18px 24px;text-align:center">
          <p style="margin:0 0 6px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#3a8a54">Your Registration ID</p>
          <p style="margin:0;font-size:22px;font-weight:800;font-family:monospace;color:${BRAND_GREEN};letter-spacing:0.04em">${regId}</p>
          <p style="margin:6px 0 0;font-size:12px;color:#6b7280">Keep this for your records</p>
        </div>
      </td>
    </tr>

    <!-- Details -->
    <tr>
      <td style="padding:24px 40px">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #F2E8D4">
              <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#9E825E">Name</span><br>
              <span style="font-size:14px;color:#2C1F0E;font-weight:600">${data.fullName}</span>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #F2E8D4">
              <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#9E825E">Email</span><br>
              <span style="font-size:14px;color:#2C1F0E">${data.email}</span>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid #F2E8D4">
              <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#9E825E">University</span><br>
              <span style="font-size:14px;color:#2C1F0E">${data.university}</span>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 0">
              <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#9E825E">Course &amp; Year</span><br>
              <span style="font-size:14px;color:#2C1F0E">${data.course} · ${data.yearOfStudy}</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- What's Next -->
    <tr>
      <td style="padding:0 40px 28px">
        <div style="background:#FBF5EC;border-radius:10px;padding:20px 24px">
          <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:${BRAND_BROWN}">✦ What Happens Next?</p>
          <ul style="margin:0;padding-left:18px;font-size:13px;color:#5C4A32;line-height:1.7">
            <li>Our team will review your registration</li>
            <li>You&rsquo;ll receive event details closer to the date</li>
            <li>Follow us on social media for live updates</li>
          </ul>
        </div>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background:#FBF5EC;padding:24px 40px;text-align:center;border-top:1px solid #EDE4D6">
        <p style="margin:0 0 4px;font-size:15px;font-weight:800;color:${BRAND_BROWN}">Soar<span style="color:${BRAND_GREEN}">JMI</span></p>
        <p style="margin:0;font-size:11px;color:#9E825E">Official Cultural &amp; Tech Society · Jamia Millia Islamia, New Delhi</p>
        <p style="margin:12px 0 0;font-size:11px;color:#9E825E">soarxjmichapter@gmail.com</p>
      </td>
    </tr>

  </table>
</body>
</html>`;
}

// ─── Recruitment HR Notification Email ────────────────────────────────────────

export function buildRecruitmentHREmail(data: RecruitmentFormData, appId: string, submittedAt: string): string {
  const formatAnswers = (answers: Record<string, string>) => {
    if (!answers || Object.keys(answers).length === 0) return '<em>None provided</em>';
    return Object.entries(answers)
      .map(([qKey, ans]) => `<div style="margin-bottom:8px"><strong>${qKey}:</strong><br/>${ans.replace(/\n/g, '<br/>')}</div>`)
      .join('');
  };

  const rows = [
    ['Application ID', `<code style="background:#f0fff0;padding:2px 8px;border-radius:4px;font-family:monospace;color:${BRAND_GREEN};font-weight:700">${appId}</code>`],
    ['Full Name', data.name],
    ['Email', `<a href="mailto:${data.email}" style="color:${BRAND_GREEN}">${data.email}</a>`],
    ['Phone', data.contactNo],
    ['Course', data.course],
    ['Year of Study', data.yearOfStudy],
    ['Department', data.department],
    ['1st Preference', `<strong>${data.team1}</strong>`],
    ['1st Pref Answers', formatAnswers(data.team1Answers)],
    ['2nd Preference', `<strong>${data.team2}</strong>`],
    ['2nd Pref Answers', formatAnswers(data.team2Answers)],
    ['Submitted At (IST)', toIST(submittedAt)],
  ];

  const tableRows = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:10px 16px;font-family:monospace;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#5C4A32;background:#FBF5EC;border-bottom:1px solid #EDE4D6;white-space:nowrap;font-weight:600;vertical-align:top">${label}</td>
        <td style="padding:10px 16px;font-size:14px;color:#2C1F0E;background:#FFFFFF;border-bottom:1px solid #EDE4D6;vertical-align:top">${value}</td>
      </tr>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>New Application — ${data.name}</title></head>
<body style="margin:0;padding:0;background:#F5F0E8;font-family:'Helvetica Neue',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:40px auto;background:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">
    <tr>
      <td style="background:linear-gradient(135deg,${BRAND_BROWN} 0%,#7A3D18 100%);padding:32px 40px">
        <p style="margin:0 0 6px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.16em;color:rgba(251,245,236,0.7)">SoarJMI · HR Portal</p>
        <h1 style="margin:0;font-size:24px;font-weight:800;color:${BRAND_CREAM};letter-spacing:-0.02em">New Recruitment Application</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:32px 40px 16px">
        <p style="margin:0 0 20px;font-size:14px;color:#5C4A32">A new application has been submitted. Full details below:</p>
        <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;border:1px solid #EDE4D6">
          ${tableRows}
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:24px 40px 32px">
        <p style="margin:0;font-size:11px;color:#9E825E;text-align:center">This is an automated notification from the SoarJMI recruitment system.</p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ─── Recruitment Confirmation Email ───────────────────────────────────────────

export function buildRecruitmentConfirmationEmail(data: RecruitmentFormData, appId: string): string {
  const firstName = data.name.split(' ')[0];

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Application Received</title></head>
<body style="margin:0;padding:0;background:#F5F0E8;font-family:'Helvetica Neue',Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:40px auto;background:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">
    <tr>
      <td style="background:linear-gradient(135deg,${BRAND_DARK} 0%,#06180a 100%);padding:40px;text-align:center">
        <p style="margin:0 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;color:rgba(34,197,94,0.7)">SoarJMI · Application Received</p>
        <div style="font-size:48px;margin:16px 0">🚀</div>
        <h1 style="margin:0;font-size:26px;font-weight:800;color:#e8ffe8;letter-spacing:-0.02em">We've got your application, ${firstName}!</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:28px 40px 0">
        <div style="background:#f0fff0;border:1px solid rgba(34,197,94,0.25);border-radius:10px;padding:18px 24px;text-align:center">
          <p style="margin:0 0 6px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#3a8a54">Your Application ID</p>
          <p style="margin:0;font-size:22px;font-weight:800;font-family:monospace;color:${BRAND_GREEN};letter-spacing:0.04em">${appId}</p>
        </div>
      </td>
    </tr>
    <tr>
      <td style="padding:0 40px 28px; margin-top:20px;">
        <div style="background:#FBF5EC;border-radius:10px;padding:20px 24px; margin-top: 20px;">
          <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:${BRAND_BROWN}">✦ What Happens Next?</p>
          <ul style="margin:0;padding-left:18px;font-size:13px;color:#5C4A32;line-height:1.7">
            <li>Our team will review your application carefully.</li>
            <li>We will get back to you regarding the next steps via email.</li>
            <li>Follow our social media for updates.</li>
          </ul>
        </div>
      </td>
    </tr>
    <tr>
      <td style="background:#FBF5EC;padding:24px 40px;text-align:center;border-top:1px solid #EDE4D6">
        <p style="margin:0 0 4px;font-size:15px;font-weight:800;color:${BRAND_BROWN}">Soar<span style="color:${BRAND_GREEN}">JMI</span></p>
        <p style="margin:0;font-size:11px;color:#9E825E">Official Cultural &amp; Tech Society · Jamia Millia Islamia, New Delhi</p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
