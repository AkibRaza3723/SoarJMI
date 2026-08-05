'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { TEAMS, YEAR_OF_STUDY_OPTIONS } from '../data/recruitmentData';
import type { Team } from '../data/recruitmentData';

// ─── Types ────────────────────────────────────────────────────────────────────
interface BasicInfo {
  name: string;
  contactNo: string;
  email: string;
  course: string;
  yearOfStudy: string;
  department: string;
  team1: string; // 1st preference
  team2: string; // 2nd preference
}

/** Answers keyed by question key, e.g. { tech_q1: '...', content_q1: '...' } */
type TeamAnswers = Record<string, string>;

type FormStatus = 'idle' | 'submitting' | 'success';

// ─── Step labels ──────────────────────────────────────────────────────────────
const STEP_LABELS = ['Basic Info', 'Team Questions', 'Confirm & Submit'];

// ─── Validation ───────────────────────────────────────────────────────────────
function validateBasicInfo(info: BasicInfo): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!info.name.trim() || info.name.trim().length < 2)
    errors.name = 'Please enter your full name.';

  if (!/^[6-9]\d{9}$/.test(info.contactNo.replace(/[\s\-().+]/g, '')))
    errors.contactNo = 'Enter a valid 10-digit Indian mobile number.';

  if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(info.email.trim()))
    errors.email = 'Please enter a valid email address.';

  if (!info.course.trim())
    errors.course = 'Please enter your course.';

  if (!info.yearOfStudy)
    errors.yearOfStudy = 'Please select your year of study.';

  if (!info.department.trim())
    errors.department = 'Please enter your department.';

  if (!info.team1)
    errors.team1 = 'Please select your 1st preference.';

  if (!info.team2)
    errors.team2 = 'Please select your 2nd preference.';

  if (info.team1 && info.team2 && info.team1 === info.team2)
    errors.team2 = '2nd preference must be different from 1st preference.';

  return errors;
}

function validateTeamAnswers(
  team1: Team | undefined,
  team2: Team | undefined,
  answers: TeamAnswers
): Record<string, string> {
  const errors: Record<string, string> = {};
  const allQuestions = [
    ...(team1?.questions || []),
    ...(team2?.questions || []),
  ];
  allQuestions.forEach((q) => {
    if (!answers[q.key]?.trim()) {
      errors[q.key] = 'This question is required.';
    }
  });
  return errors;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function RecruitmentForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
    name: '',
    contactNo: '',
    email: '',
    course: '',
    yearOfStudy: '',
    department: '',
    team1: '',
    team2: '',
  });
  const [teamAnswers, setTeamAnswers] = useState<TeamAnswers>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [appId, setAppId] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // ── Derived ──────────────────────────────────────────────────────────────────
  const selectedTeam1: Team | undefined = TEAMS.find((t) => t.id === basicInfo.team1);
  const selectedTeam2: Team | undefined = TEAMS.find((t) => t.id === basicInfo.team2);

  // ── Focus first field on step change ─────────────────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => firstFieldRef.current?.focus(), 350);
    return () => clearTimeout(timer);
  }, [currentStep]);

  // ── Handlers ─────────────────────────────────────────────────────────────────
  const handleBasicChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setBasicInfo((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => { const n = { ...prev }; delete n[name]; return n; });
    },
    []
  );

  const handleTeamAnswerChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setTeamAnswers((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => { const n = { ...prev }; delete n[name]; return n; });
    },
    []
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setTouched((prev) => ({ ...prev, [e.target.name]: true }));
    },
    []
  );

  // ── Navigation ───────────────────────────────────────────────────────────────
  function goNext() {
    if (isAnimating) return;

    if (currentStep === 0) {
      const errs = validateBasicInfo(basicInfo);
      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        const allTouched: Record<string, boolean> = {};
        Object.keys(errs).forEach((k) => (allTouched[k] = true));
        setTouched((prev) => ({ ...prev, ...allTouched }));
        return;
      }
    }

    if (currentStep === 1) {
      const errs = validateTeamAnswers(selectedTeam1, selectedTeam2, teamAnswers);
      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        const allTouched: Record<string, boolean> = {};
        Object.keys(errs).forEach((k) => (allTouched[k] = true));
        setTouched((prev) => ({ ...prev, ...allTouched }));
        return;
      }
    }

    setDirection('next');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep((s) => Math.min(s + 1, 2));
      setErrors({});
      setTouched({});
      setIsAnimating(false);
    }, 300);
  }

  function goBack() {
    if (isAnimating || currentStep === 0) return;
    setDirection('prev');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep((s) => s - 1);
      setErrors({});
      setTouched({});
      setIsAnimating(false);
    }, 300);
  }

  async function handleSubmit() {
    setStatus('submitting');
    setSubmitError(null);

    try {
      const res = await fetch('/api/recruit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...basicInfo,
          teamAnswers,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.error || 'Something went wrong. Please try again.');
        if (data.fieldErrors) {
          setErrors(data.fieldErrors);
          // If there's an error on step 1 or 2 fields, go back to step 0 or 1
          if (data.fieldErrors.name || data.fieldErrors.email || data.fieldErrors.contactNo || data.fieldErrors.course || data.fieldErrors.yearOfStudy || data.fieldErrors.department || data.fieldErrors.team1 || data.fieldErrors.team2) {
            setCurrentStep(0);
          } else {
             setCurrentStep(1);
          }
        }
        setStatus('idle');
        return;
      }

      setAppId(data.appId);
      setStatus('success');
    } catch (err) {
      setSubmitError('Network error. Please check your connection and try again.');
      setStatus('idle');
    }
  }

  // ── Success Screen ──────────────────────────────────────────────────────────
  if (status === 'success') {
    const WA_PATH = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z';

    return (
      <div style={{
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '56px 24px 64px',
        maxWidth: '520px',
        margin: '0 auto',
      }} aria-live="polite">

        {/* ── Confetti ── */}
        <div style={{ position: 'absolute', top: '40%', left: '50%', pointerEvents: 'none' }} aria-hidden="true">
          {[...Array(30)].map((_, i) => (
            <span
              key={i}
              className="confetti-piece"
              style={{
                '--delay': `${i * 0.06}s`,
                '--x': `${(Math.random() - 0.5) * 360}px`,
                '--y': `${-Math.random() * 300 - 60}px`,
                '--r': `${Math.random() * 720 - 360}deg`,
                '--color': ['var(--secondary)', 'var(--tertiary)', 'var(--accent-1)', '#25d366', '#FFD700', '#a78bfa'][i % 6],
              } as React.CSSProperties}
            />
          ))}
        </div>

        {/* ── Success Icon — Animated Checkmark ── */}
        <div style={{
          width: '80px', height: '80px', borderRadius: '50%',
          background: 'var(--gradient-accent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 28px',
          boxShadow: '0 0 0 8px rgba(var(--secondary-rgb, 34,197,94), 0.1), 0 12px 40px rgba(var(--secondary-rgb, 34,197,94), 0.18)',
          animation: 'successPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'checkDraw 0.5s ease-out 0.3s both' }}>
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>

        {/* ── Heading ── */}
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.5rem, 4vw, 2.1rem)',
          fontWeight: 800,
          color: 'var(--text-primary)',
          marginBottom: '8px',
          letterSpacing: '-0.03em',
          lineHeight: 1.2,
        }}>You&rsquo;re In! 🎉</h2>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.7,
          maxWidth: '400px',
          margin: '0 auto 10px',
        }}>
          Thank you, <strong style={{ color: 'var(--text-primary)' }}>{basicInfo.name}</strong>.
          <br />Your application has been received successfully.
        </p>

        {/* ── Team Chips ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          marginBottom: '28px', flexWrap: 'wrap',
        }}>
          {[selectedTeam1, selectedTeam2].filter(Boolean).map((team, idx) => (
            <span key={team!.id} style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '6px 16px', borderRadius: '9999px',
              background: idx === 0 ? 'var(--gradient-accent)' : 'var(--surface-container)',
              color: idx === 0 ? 'var(--on-primary)' : 'var(--text-primary)',
              fontFamily: 'var(--font-display)', fontSize: '0.78rem', fontWeight: 700,
              border: idx === 0 ? 'none' : '1px solid var(--outline-variant)',
              letterSpacing: '0.01em',
            }}>
              <span>{team!.icon}</span> {team!.label}
            </span>
          ))}
        </div>

        {/* ── Application ID Card ── */}
        {appId && (
          <div style={{
            background: 'var(--surface-container-low)',
            border: '1px solid var(--outline-variant)',
            borderRadius: '14px',
            padding: '16px 28px',
            display: 'inline-block',
            marginBottom: '32px',
            position: 'relative',
          }}>
            <p style={{
              margin: '0 0 6px', fontSize: '0.6rem', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.14em',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-muted)',
            }}>Application ID</p>
            <p style={{
              margin: 0, fontSize: '1.15rem', fontWeight: 800,
              fontFamily: 'var(--font-mono)', color: 'var(--secondary)',
              letterSpacing: '0.06em',
            }}>{appId}</p>
          </div>
        )}

        {/* ── Divider ── */}
        <div style={{
          width: '48px', height: '2px',
          background: 'var(--outline-variant)',
          margin: '0 auto 32px',
          borderRadius: '2px',
        }} />

        {/* ── Next Steps Label ── */}
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '0.14em',
          color: 'var(--text-muted)', marginBottom: '16px',
        }}>Next Steps</p>

        {/* ── WhatsApp Cards Container ── */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: '12px',
          maxWidth: '440px', margin: '0 auto 36px', width: '100%',
        }}>

          {/* PRIMARY — Recruitment Group */}
          <a
            href="https://chat.whatsapp.com/J6cMktpFefT5U594pkyIYG?s=cl&p=a&mlu=0"
            target="_blank"
            rel="noopener noreferrer"
            id="recruit-join-recruitment-group"
            style={{
              display: 'flex', alignItems: 'center', gap: '16px',
              padding: '18px 22px',
              background: '#25d366',
              borderRadius: '16px',
              textDecoration: 'none',
              color: '#fff',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 4px 20px rgba(37,211,102,0.25)',
              cursor: 'pointer',
              border: 'none',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(37,211,102,0.35)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,211,102,0.25)'; }}
          >
            <div style={{
              width: '48px', height: '48px', borderRadius: '14px',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, backdropFilter: 'blur(4px)',
            }}>
              <svg viewBox="0 0 24 24" fill="#fff" width="24" height="24"><path d={WA_PATH}/></svg>
            </div>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 700,
                marginBottom: '2px',
              }}>Join Recruitment Group</div>
              <div style={{
                fontSize: '0.75rem', opacity: 0.85, lineHeight: 1.4,
              }}>Get interview schedules, updates &amp; results</div>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.7 }}>
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </a>

          {/* SECONDARY — Community Group */}
          <a
            href="https://chat.whatsapp.com/KxJkGxzshsf0xTAKunIhBw?s=sw&p=a&ilr=1"
            target="_blank"
            rel="noopener noreferrer"
            id="recruit-join-community-group"
            style={{
              display: 'flex', alignItems: 'center', gap: '16px',
              padding: '16px 22px',
              background: 'var(--surface-container-low)',
              border: '1px solid var(--outline-variant)',
              borderRadius: '16px',
              textDecoration: 'none',
              color: 'var(--text-primary)',
              transition: 'transform 0.2s, border-color 0.2s, box-shadow 0.2s',
              cursor: 'pointer',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.borderColor = '#25d366'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(37,211,102,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--outline-variant)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <div style={{
              width: '42px', height: '42px', borderRadius: '12px',
              background: 'rgba(37,211,102,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg viewBox="0 0 24 24" fill="#25d366" width="22" height="22"><path d={WA_PATH}/></svg>
            </div>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: '0.88rem', fontWeight: 700,
                color: 'var(--text-primary)', marginBottom: '1px',
              }}>SoarJMI Community</div>
              <div style={{
                fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.4,
              }}>Events, resources &amp; networking</div>
            </div>
            <span style={{
              padding: '6px 16px', borderRadius: '9999px',
              border: '1.5px solid #25d366', color: '#25d366',
              fontFamily: 'var(--font-display)', fontSize: '0.75rem', fontWeight: 700,
              whiteSpace: 'nowrap', flexShrink: 0,
            }}>Join</span>
          </a>
        </div>

        {/* ── Back Link ── */}
        <a
          href="/contact"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '12px 28px',
            background: 'var(--surface-container)',
            color: 'var(--text-secondary)',
            border: '1px solid var(--outline-variant)',
            borderRadius: '9999px',
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: '0.85rem',
            textDecoration: 'none',
            transition: 'transform 0.2s, border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.borderColor = 'var(--secondary)'; e.currentTarget.style.color = 'var(--secondary)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--outline-variant)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
        >
          ← Back to Contact
        </a>

        {/* ── Keyframes ── */}
        <style>{`
          @keyframes successPop {
            0% { transform: scale(0); opacity: 0; }
            60% { transform: scale(1.15); }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes checkDraw {
            0% { stroke-dasharray: 30; stroke-dashoffset: 30; opacity: 0; }
            100% { stroke-dasharray: 30; stroke-dashoffset: 0; opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div ref={formRef} className="recruit-form-wrap">
      {/* ── Progress Bar ── */}
      <div className="recruit-progress" role="navigation" aria-label="Form progress">
        {STEP_LABELS.map((label, i) => (
          <div key={label} className={`recruit-step-item ${i <= currentStep ? 'active' : ''} ${i < currentStep ? 'completed' : ''}`}>
            <div className="recruit-step-dot">
              {i < currentStep ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
              ) : (
                <span>{i + 1}</span>
              )}
            </div>
            <span className="recruit-step-label">{label}</span>
            {i < STEP_LABELS.length - 1 && <div className={`recruit-step-line ${i < currentStep ? 'filled' : ''}`} />}
          </div>
        ))}
      </div>

      {/* ── Step Content ── */}
      <div className="recruit-step-viewport">
        <div className={`recruit-step-slider ${isAnimating ? (direction === 'next' ? 'slide-out-left' : 'slide-out-right') : 'slide-in'}`}>

          {/* ─── STEP 1: Basic Info ─── */}
          {currentStep === 0 && (
            <div className="recruit-step" role="group" aria-label="Step 1: Basic Information">
              <div className="recruit-step-header">
                <h2 className="recruit-step-title">Tell us about yourself</h2>
                <p className="recruit-step-desc">Basic information to get started with your application.</p>
              </div>
              <div className="recruit-fields-grid">
                {/* Name */}
                <div className="recruit-field">
                  <label className="recruit-label" htmlFor="recruit-name">Name <span className="recruit-req">*</span></label>
                  <input ref={firstFieldRef} id="recruit-name" name="name" type="text"
                    className={`recruit-input ${errors.name && touched.name ? 'recruit-input--error' : ''}`}
                    placeholder="Your full name" value={basicInfo.name}
                    onChange={handleBasicChange} onBlur={handleBlur} autoComplete="name" maxLength={120} />
                  {errors.name && touched.name && <p className="recruit-field-error">⚠ {errors.name}</p>}
                </div>

                {/* Contact No. */}
                <div className="recruit-field">
                  <label className="recruit-label" htmlFor="recruit-contactNo">Contact No. <span className="recruit-req">*</span></label>
                  <input id="recruit-contactNo" name="contactNo" type="tel"
                    className={`recruit-input ${errors.contactNo && touched.contactNo ? 'recruit-input--error' : ''}`}
                    placeholder="10-digit mobile number" value={basicInfo.contactNo}
                    onChange={handleBasicChange} onBlur={handleBlur} autoComplete="tel" maxLength={15} />
                  {errors.contactNo && touched.contactNo && <p className="recruit-field-error">⚠ {errors.contactNo}</p>}
                </div>

                {/* Email */}
                <div className="recruit-field">
                  <label className="recruit-label" htmlFor="recruit-email">Email <span className="recruit-req">*</span></label>
                  <input id="recruit-email" name="email" type="email"
                    className={`recruit-input ${errors.email && touched.email ? 'recruit-input--error' : ''}`}
                    placeholder="you@example.com" value={basicInfo.email}
                    onChange={handleBasicChange} onBlur={handleBlur} autoComplete="email" maxLength={254} />
                  {errors.email && touched.email && <p className="recruit-field-error">⚠ {errors.email}</p>}
                </div>

                {/* Course */}
                <div className="recruit-field">
                  <label className="recruit-label" htmlFor="recruit-course">Course <span className="recruit-req">*</span></label>
                  <input id="recruit-course" name="course" type="text"
                    className={`recruit-input ${errors.course && touched.course ? 'recruit-input--error' : ''}`}
                    placeholder="e.g. B.Tech Computer Engineering" value={basicInfo.course}
                    onChange={handleBasicChange} onBlur={handleBlur} maxLength={120} />
                  {errors.course && touched.course && <p className="recruit-field-error">⚠ {errors.course}</p>}
                </div>

                {/* Year of Study */}
                <div className="recruit-field">
                  <label className="recruit-label" htmlFor="recruit-yearOfStudy">Year of Study <span className="recruit-req">*</span></label>
                  <div className="recruit-select-wrap">
                    <select id="recruit-yearOfStudy" name="yearOfStudy"
                      className={`recruit-select ${errors.yearOfStudy && touched.yearOfStudy ? 'recruit-input--error' : ''}`}
                      value={basicInfo.yearOfStudy} onChange={handleBasicChange} onBlur={handleBlur}>
                      <option value="" disabled>Select year…</option>
                      {YEAR_OF_STUDY_OPTIONS.map((y) => (<option key={y} value={y}>{y}</option>))}
                    </select>
                    <span className="recruit-select-arrow" aria-hidden="true">▾</span>
                  </div>
                  {errors.yearOfStudy && touched.yearOfStudy && <p className="recruit-field-error">⚠ {errors.yearOfStudy}</p>}
                </div>

                {/* Department */}
                <div className="recruit-field">
                  <label className="recruit-label" htmlFor="recruit-department">Department <span className="recruit-req">*</span></label>
                  <input id="recruit-department" name="department" type="text"
                    className={`recruit-input ${errors.department && touched.department ? 'recruit-input--error' : ''}`}
                    placeholder="e.g. Computer Science" value={basicInfo.department}
                    onChange={handleBasicChange} onBlur={handleBlur} maxLength={120} />
                  {errors.department && touched.department && <p className="recruit-field-error">⚠ {errors.department}</p>}
                </div>

                {/* Team — 1st Preference */}
                <div className="recruit-field">
                  <label className="recruit-label" htmlFor="recruit-team1">Team — 1st Preference <span className="recruit-req">*</span></label>
                  <div className="recruit-select-wrap">
                    <select id="recruit-team1" name="team1"
                      className={`recruit-select ${errors.team1 && touched.team1 ? 'recruit-input--error' : ''}`}
                      value={basicInfo.team1} onChange={handleBasicChange} onBlur={handleBlur}>
                      <option value="" disabled>Select 1st preference…</option>
                      {TEAMS.map((t) => (
                        <option key={t.id} value={t.id} disabled={t.id === basicInfo.team2}>
                          {t.icon}  {t.label}
                        </option>
                      ))}
                    </select>
                    <span className="recruit-select-arrow" aria-hidden="true">▾</span>
                  </div>
                  {errors.team1 && touched.team1 && <p className="recruit-field-error">⚠ {errors.team1}</p>}
                </div>

                {/* Team — 2nd Preference */}
                <div className="recruit-field">
                  <label className="recruit-label" htmlFor="recruit-team2">Team — 2nd Preference <span className="recruit-req">*</span></label>
                  <div className="recruit-select-wrap">
                    <select id="recruit-team2" name="team2"
                      className={`recruit-select ${errors.team2 && touched.team2 ? 'recruit-input--error' : ''}`}
                      value={basicInfo.team2} onChange={handleBasicChange} onBlur={handleBlur}>
                      <option value="" disabled>Select 2nd preference…</option>
                      {TEAMS.map((t) => (
                        <option key={t.id} value={t.id} disabled={t.id === basicInfo.team1}>
                          {t.icon}  {t.label}
                        </option>
                      ))}
                    </select>
                    <span className="recruit-select-arrow" aria-hidden="true">▾</span>
                  </div>
                  {errors.team2 && touched.team2 && <p className="recruit-field-error">⚠ {errors.team2}</p>}
                </div>
              </div>
            </div>
          )}

          {/* ─── STEP 2: Team-Specific Questions ─── */}
          {currentStep === 1 && (
            <div className="recruit-step" role="group" aria-label="Step 2: Team Questions">
              <div className="recruit-step-header">
                <h2 className="recruit-step-title">Team-Specific Questions</h2>
                <p className="recruit-step-desc">Answer the questions for both your preferred teams.</p>
              </div>

              {/* 1st Preference Questions */}
              {selectedTeam1 && (
                <div className="recruit-team-block">
                  <div className="recruit-team-badge">
                    <span className="recruit-team-badge-icon">{selectedTeam1.icon}</span>
                    <span className="recruit-team-badge-label">1st Preference</span>
                    <span className="recruit-team-badge-name">{selectedTeam1.label}</span>
                  </div>
                  <div className="recruit-fields-stack">
                    {selectedTeam1.questions.map((q, qi) => (
                      <div key={q.key} className="recruit-field">
                        <label className="recruit-label" htmlFor={`recruit-${q.key}`}>
                          {qi + 1}. {q.label} <span className="recruit-req">*</span>
                        </label>
                        <textarea
                          id={`recruit-${q.key}`}
                          name={q.key}
                          className={`recruit-textarea ${errors[q.key] && touched[q.key] ? 'recruit-input--error' : ''}`}
                          placeholder="Type your answer here…"
                          value={teamAnswers[q.key] || ''}
                          onChange={handleTeamAnswerChange}
                          onBlur={handleBlur}
                          rows={3}
                          maxLength={2000}
                        />
                        {errors[q.key] && touched[q.key] && <p className="recruit-field-error">⚠ {errors[q.key]}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 2nd Preference Questions */}
              {selectedTeam2 && (
                <div className="recruit-team-block">
                  <div className="recruit-team-badge recruit-team-badge--second">
                    <span className="recruit-team-badge-icon">{selectedTeam2.icon}</span>
                    <span className="recruit-team-badge-label">2nd Preference</span>
                    <span className="recruit-team-badge-name">{selectedTeam2.label}</span>
                  </div>
                  <div className="recruit-fields-stack">
                    {selectedTeam2.questions.map((q, qi) => (
                      <div key={q.key} className="recruit-field">
                        <label className="recruit-label" htmlFor={`recruit-${q.key}`}>
                          {qi + 1}. {q.label} <span className="recruit-req">*</span>
                        </label>
                        <textarea
                          id={`recruit-${q.key}`}
                          name={q.key}
                          className={`recruit-textarea ${errors[q.key] && touched[q.key] ? 'recruit-input--error' : ''}`}
                          placeholder="Type your answer here…"
                          value={teamAnswers[q.key] || ''}
                          onChange={handleTeamAnswerChange}
                          onBlur={handleBlur}
                          rows={3}
                          maxLength={2000}
                        />
                        {errors[q.key] && touched[q.key] && <p className="recruit-field-error">⚠ {errors[q.key]}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ─── STEP 3: Confirmation ─── */}
          {currentStep === 2 && (
            <div className="recruit-step" role="group" aria-label="Step 3: Review & Submit">
              <div className="recruit-step-header">
                <h2 className="recruit-step-title">Review your application</h2>
                <p className="recruit-step-desc">Make sure everything looks right before submitting.</p>
              </div>
              <div className="recruit-summary">
                {/* Basic Info */}
                <div className="recruit-summary-section">
                  <h3 className="recruit-summary-heading">Basic Information</h3>
                  <div className="recruit-summary-grid">
                    {([
                      ['Name', basicInfo.name],
                      ['Contact No.', basicInfo.contactNo],
                      ['Email', basicInfo.email],
                      ['Course', basicInfo.course],
                      ['Year of Study', basicInfo.yearOfStudy],
                      ['Department', basicInfo.department],
                      ['1st Preference', `${selectedTeam1?.icon || ''} ${selectedTeam1?.label || ''}`],
                      ['2nd Preference', `${selectedTeam2?.icon || ''} ${selectedTeam2?.label || ''}`],
                    ] as [string, string][]).map(([label, value]) => (
                      <div key={label} className="recruit-summary-item">
                        <span className="recruit-summary-label">{label}</span>
                        <span className="recruit-summary-value">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 1st Preference Answers */}
                {selectedTeam1 && (
                  <div className="recruit-summary-section">
                    <h3 className="recruit-summary-heading">{selectedTeam1.icon} {selectedTeam1.label} — 1st Preference</h3>
                    <div className="recruit-summary-stack">
                      {selectedTeam1.questions.map((q) => (
                        <div key={q.key} className="recruit-summary-item recruit-summary-item--wide">
                          <span className="recruit-summary-label">{q.label}</span>
                          <span className="recruit-summary-value">
                            {teamAnswers[q.key]?.trim() || <em className="recruit-summary-empty">Not provided</em>}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2nd Preference Answers */}
                {selectedTeam2 && (
                  <div className="recruit-summary-section">
                    <h3 className="recruit-summary-heading">{selectedTeam2.icon} {selectedTeam2.label} — 2nd Preference</h3>
                    <div className="recruit-summary-stack">
                      {selectedTeam2.questions.map((q) => (
                        <div key={q.key} className="recruit-summary-item recruit-summary-item--wide">
                          <span className="recruit-summary-label">{q.label}</span>
                          <span className="recruit-summary-value">
                            {teamAnswers[q.key]?.trim() || <em className="recruit-summary-empty">Not provided</em>}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Navigation Buttons ── */}
      <div className="recruit-nav-row">
        {submitError && (
          <div className="recruit-global-error">
            ⚠ {submitError}
          </div>
        )}
        {currentStep > 0 && (
          <button type="button" className="recruit-btn recruit-btn--back" onClick={goBack} disabled={isAnimating}>
            ← Back
          </button>
        )}
        <div className="recruit-nav-spacer" />
        {currentStep < 2 ? (
          <button type="button" className="recruit-btn recruit-btn--next" onClick={goNext} disabled={isAnimating}>
            Next →
          </button>
        ) : (
          <button type="button" className="recruit-btn recruit-btn--submit" onClick={handleSubmit} disabled={status === 'submitting'}>
            {status === 'submitting' ? (
              <><span className="recruit-spinner" aria-hidden="true" />Submitting…</>
            ) : (
              'Submit Application ✦'
            )}
          </button>
        )}
      </div>

      {/* ── Styles ── */}
      <style jsx>{`
        /* ─── Wrapper ─── */
        .recruit-form-wrap {
          width: 100%;
          max-width: 720px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        /* ─── Progress Bar ─── */
        .recruit-progress {
          display: flex;
          align-items: center;
          gap: 0;
          width: 100%;
        }

        .recruit-step-item {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .recruit-step-dot {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid var(--outline-variant);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--text-muted);
          background: var(--surface-container-lowest);
          transition: all 0.35s ease;
          flex-shrink: 0;
        }

        .recruit-step-item.active .recruit-step-dot {
          border-color: var(--secondary);
          color: var(--on-primary);
          background: var(--gradient-accent);
          box-shadow: 0 2px 12px var(--glow);
        }

        .recruit-step-item.completed .recruit-step-dot {
          border-color: var(--secondary);
          color: var(--on-primary);
          background: var(--secondary);
        }

        .recruit-step-label {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          transition: color 0.3s;
          white-space: nowrap;
        }

        .recruit-step-item.active .recruit-step-label {
          color: var(--secondary);
        }

        .recruit-step-line {
          flex: 1;
          height: 2px;
          background: var(--outline-variant);
          margin: 0 6px;
          min-width: 20px;
          border-radius: 2px;
          transition: background 0.35s ease;
        }

        .recruit-step-line.filled {
          background: var(--gradient-accent);
        }

        /* ─── Step Viewport ─── */
        .recruit-step-viewport {
          overflow: hidden;
          position: relative;
        }

        .recruit-step-slider {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
        }

        .recruit-step-slider.slide-in { transform: translateX(0); opacity: 1; }
        .recruit-step-slider.slide-out-left { transform: translateX(-30px); opacity: 0; }
        .recruit-step-slider.slide-out-right { transform: translateX(30px); opacity: 0; }

        /* ─── Step Content ─── */
        .recruit-step {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .recruit-step-header {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .recruit-step-title {
          font-family: var(--font-display);
          font-size: clamp(1.2rem, 3vw, 1.5rem);
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        .recruit-step-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* ─── Team Block (Step 2) ─── */
        .recruit-team-block {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 24px;
          background: var(--surface-container-low);
          border: 1px solid var(--outline-variant);
          border-radius: 20px;
        }

        .recruit-team-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          background: var(--gradient-accent);
          border-radius: 50px;
          width: fit-content;
        }

        .recruit-team-badge--second {
          background: var(--surface-container);
          border: 1px solid var(--outline-variant);
        }

        .recruit-team-badge-icon {
          font-size: 1.05rem;
        }

        .recruit-team-badge-label {
          font-family: var(--font-mono);
          font-size: 0.58rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--on-primary);
        }

        .recruit-team-badge--second .recruit-team-badge-label {
          color: var(--text-muted);
        }

        .recruit-team-badge-name {
          font-family: var(--font-display);
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--on-primary);
        }

        .recruit-team-badge--second .recruit-team-badge-name {
          color: var(--text-primary);
        }

        /* ─── Fields Grid (2-col for step 1) ─── */
        .recruit-fields-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px 24px;
        }

        .recruit-fields-stack {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .recruit-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        /* ─── Labels ─── */
        .recruit-label {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-secondary);
        }

        .recruit-req {
          color: var(--error);
        }

        /* ─── Inputs ─── */
        .recruit-input,
        .recruit-select,
        .recruit-textarea {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1.5px solid var(--outline-variant);
          padding: 8px 4px;
          font-family: var(--font-body);
          font-size: 0.95rem;
          color: var(--text-primary);
          outline: none;
          transition: border-color 0.25s ease;
          border-radius: 0;
          appearance: none;
        }

        .recruit-input::placeholder,
        .recruit-textarea::placeholder {
          color: var(--text-muted);
          font-size: 0.88rem;
        }

        .recruit-input:focus,
        .recruit-select:focus,
        .recruit-textarea:focus {
          border-bottom-color: var(--secondary);
        }

        .recruit-input--error {
          border-bottom-color: var(--error) !important;
        }

        /* ─── Select ─── */
        .recruit-select-wrap {
          position: relative;
        }

        .recruit-select {
          cursor: pointer;
          padding-right: 28px;
        }

        .recruit-select-arrow {
          position: absolute;
          right: 6px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 0.75rem;
          color: var(--text-muted);
          pointer-events: none;
        }

        /* ─── Textarea ─── */
        .recruit-textarea {
          resize: vertical;
          min-height: 80px;
          border: 1.5px solid var(--outline-variant);
          border-radius: 6px;
          padding: 10px 12px;
          transition: border-color 0.25s ease;
        }

        .recruit-textarea:focus {
          border-color: var(--secondary);
        }

        /* ─── Field Error ─── */
        .recruit-field-error {
          font-size: 0.72rem;
          color: var(--error);
          line-height: 1.4;
        }
        
        .recruit-global-error {
          position: absolute;
          bottom: -32px;
          left: 0;
          right: 0;
          text-align: center;
          font-size: 0.85rem;
          color: var(--error);
          font-weight: 600;
        }

        /* ─── Summary (Step 3) ─── */
        .recruit-summary {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .recruit-summary-section {
          background: var(--surface-container-low);
          border: 1px solid var(--outline-variant);
          border-radius: 16px;
          padding: 24px;
        }

        .recruit-summary-heading {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--text-muted);
          margin-bottom: 16px;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--outline-variant);
        }

        .recruit-summary-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px 24px;
        }

        .recruit-summary-stack {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .recruit-summary-item {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .recruit-summary-item--wide {
          grid-column: 1 / -1;
        }

        .recruit-summary-label {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
        }

        .recruit-summary-value {
          font-size: 0.92rem;
          font-weight: 500;
          color: var(--text-primary);
          line-height: 1.5;
          word-break: break-word;
          white-space: pre-wrap;
        }

        .recruit-summary-empty {
          color: var(--text-muted);
          font-style: italic;
          font-size: 0.85rem;
        }

        /* ─── Navigation Row ─── */
        .recruit-nav-row {
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
        }

        .recruit-nav-spacer { flex: 1; }

        .recruit-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 28px;
          border: none;
          border-radius: 9999px;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s, background 0.2s;
          letter-spacing: 0.01em;
        }

        .recruit-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
          transform: none;
        }

        .recruit-btn--back {
          background: var(--surface-container-low);
          color: var(--text-secondary);
          border: 1px solid var(--outline-variant);
        }

        .recruit-btn--back:hover:not(:disabled) {
          background: var(--surface-container);
          border-color: var(--secondary);
          color: var(--secondary);
        }

        .recruit-btn--next,
        .recruit-btn--submit {
          background: var(--gradient-accent);
          color: var(--on-primary);
          box-shadow: 0 4px 20px var(--glow);
        }

        .recruit-btn--next:hover:not(:disabled),
        .recruit-btn--submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px var(--glow);
        }

        /* ─── Spinner ─── */
        .recruit-spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2.5px solid rgba(255, 255, 255, 0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: recruit-spin 0.7s linear infinite;
        }

        @keyframes recruit-spin {
          to { transform: rotate(360deg); }
        }

        /* ─── Success Screen — confetti only ─── */
        .confetti-piece {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 2px;
          background: var(--color);
          animation: confetti-burst 1s cubic-bezier(0.2, 0.8, 0.4, 1) forwards;
          animation-delay: var(--delay);
          opacity: 0;
        }

        @keyframes confetti-burst {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(var(--x), var(--y)) rotate(var(--r)); opacity: 0; }
        }

        /* ─── Responsive ─── */
        @media (max-width: 640px) {
          .recruit-fields-grid { grid-template-columns: 1fr; }
          .recruit-summary-grid { grid-template-columns: 1fr; }
          .recruit-step-label { display: none; }
          .recruit-step-line { min-width: 16px; }
          .recruit-btn { padding: 10px 20px; font-size: 0.85rem; }
        }

        @media (max-width: 480px) {
          .recruit-form-wrap { gap: 24px; }
          .recruit-step-dot { width: 28px; height: 28px; font-size: 0.65rem; }
          .recruit-summary-section { padding: 16px; }
          .recruit-team-block { padding: 16px; border-radius: 14px; }
        }
      `}</style>
    </div>
  );
}
