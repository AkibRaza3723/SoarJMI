import { TEAMS, YEAR_OF_STUDY_OPTIONS } from '../data/recruitmentData';

export interface RecruitmentFormData {
  name: string;
  contactNo: string;
  email: string;
  course: string;
  yearOfStudy: string;
  department: string;
  team1: string;
  team2: string;
  team1Answers: Record<string, string>;
  team2Answers: Record<string, string>;
}

export type ValidationResult =
  | { valid: true; data: RecruitmentFormData }
  | { valid: false; errors: Record<string, string> };

function trim(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.trim().replace(/\s+/g, ' ');
}

function sanitize(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
const PHONE_RE = /^[6-9]\d{9}$/;

export function validateRecruitment(raw: unknown): ValidationResult {
  if (!raw || typeof raw !== 'object') {
    return { valid: false, errors: { _form: 'Invalid request body.' } };
  }

  const body = raw as Record<string, unknown>;
  const errors: Record<string, string> = {};

  // Name
  const name = sanitize(trim(body.name));
  if (!name) errors.name = 'Full name is required.';
  else if (name.length < 2) errors.name = 'Name must be at least 2 characters.';
  else if (name.length > 120) errors.name = 'Name is too long (max 120 chars).';

  // Email
  const email = trim(body.email).toLowerCase();
  if (!email) errors.email = 'Email address is required.';
  else if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.';
  else if (email.length > 254) errors.email = 'Email address is too long.';

  // Contact No
  const contactNoStr = trim(body.contactNo);
  const contactNo = contactNoStr.replace(/[\s\-().+]/g, '');
  if (!contactNo) errors.contactNo = 'Phone number is required.';
  else if (!PHONE_RE.test(contactNo)) errors.contactNo = 'Enter a valid 10-digit Indian mobile number.';

  // Course
  const course = sanitize(trim(body.course));
  if (!course) errors.course = 'Course is required.';
  else if (course.length > 120) errors.course = 'Course name is too long.';

  // Year of Study
  const yearOfStudy = trim(body.yearOfStudy);
  if (!yearOfStudy) {
    errors.yearOfStudy = 'Year of study is required.';
  } else if (!YEAR_OF_STUDY_OPTIONS.includes(yearOfStudy)) {
    errors.yearOfStudy = 'Select a valid year of study.';
  }

  // Department
  const department = sanitize(trim(body.department));
  if (!department) errors.department = 'Department is required.';
  else if (department.length > 120) errors.department = 'Department name is too long.';

  // Teams
  const team1 = trim(body.team1);
  const team2 = trim(body.team2);
  const validTeamIds = TEAMS.map(t => t.id);

  if (!team1) errors.team1 = '1st preference is required.';
  else if (!validTeamIds.includes(team1)) errors.team1 = 'Invalid 1st preference.';

  if (!team2) errors.team2 = '2nd preference is required.';
  else if (!validTeamIds.includes(team2)) errors.team2 = 'Invalid 2nd preference.';

  if (team1 && team2 && team1 === team2) {
    errors.team2 = '2nd preference must be different from 1st preference.';
  }

  // Answers
  const t1Data = TEAMS.find(t => t.id === team1);
  const t2Data = TEAMS.find(t => t.id === team2);
  
  const team1Answers: Record<string, string> = {};
  const team2Answers: Record<string, string> = {};

  const bodyTeamAnswers = (body.teamAnswers || {}) as Record<string, string>;

  if (t1Data) {
    t1Data.questions.forEach(q => {
      const ans = sanitize(trim(bodyTeamAnswers[q.key]));
      if (!ans) errors[q.key] = 'This question is required.';
      else team1Answers[q.key] = ans;
    });
  }

  if (t2Data) {
    t2Data.questions.forEach(q => {
      const ans = sanitize(trim(bodyTeamAnswers[q.key]));
      if (!ans) errors[q.key] = 'This question is required.';
      else team2Answers[q.key] = ans;
    });
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    data: {
      name,
      contactNo,
      email,
      course,
      yearOfStudy,
      department,
      team1,
      team2,
      team1Answers,
      team2Answers,
    },
  };
}
