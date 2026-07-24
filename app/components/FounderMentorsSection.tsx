'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ─── */
const FOUNDER = {
  name: 'Ali Nasir',
  role: 'Founder & Mentor',
  avatar: 'https://res.cloudinary.com/crxs8dfo/image/upload/v1784804820/WhatsApp_Image_2026-07-23_at_16.36.42_uurgrb.jpg',
  year: '2020',
  dept: '',
  vision:
    'When I looked around, I saw a clear divide: societies were either strictly technical or purely cultural. But creativity doesn\'t exist in a silo, and neither does innovation. I wanted to build a platform where logic and art coexist—where you can write code by day and take the stage by night. SOAR was born out of that vision: a space for young innovators to bridge the gap between technology and culture, proving that you don\'t have to choose between the two.',

  socials: ['LinkedIn'],
};

const MENTORS = [
  {
    name: 'Dr Navaid Z. Rizvi',
    role: 'Faculty Mentor',
    avatar: 'https://res.cloudinary.com/wyuzj0og/image/upload/v1784802565/Screenshot_2026-07-23_at_3.57.11_PM_hgmzue.png',
    dept: 'Department of Applied Science, JMI',
    message:
      'I believe in the power of collaboration and welcome new professional connections. Whether you are interested in technology, research, career growth, or startup ventures, I am here to lend my expertise and support your aspirations.',
    // expertise: ['Theatre', 'Literary Arts', 'Cultural Policy'],
  },
  {
    name: 'Dr Haroon Anwar',
    role: 'Faculty Mentor',
    avatar: 'https://res.cloudinary.com/wyuzj0og/image/upload/v1784802560/Screenshot_2026-07-23_at_3.57.55_PM_wkqpco.png',
    dept: 'Department of Applied Science, JMI',
    message:
      '16+ years of vibrant Industry and Academia Experience (8+ Corporate experience in Channel Sales, Business Development, Franchise Development, Corporate Sales and 8+ years of Teaching Experience in Entrepreneurship, Financial Management and Marketing Management.) PhD, UGC NET and MBA (Marketing and Finance)',
    // expertise: ['AI/ML', 'Web Dev', 'Open Source'],
  },
];

/* ─── Founder Card ─── */
function FounderCard() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, x: -70, scale: 0.94 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none reverse' },
      }
    );
  }, []);

  return (
    <div ref={ref} className="founder-card">
      {/* Top accent bar */}
      <div className="founder-accent-bar" />

      {/* Avatar + name */}
      <div className="founder-identity">
        <div className="founder-avatar-wrap">
          <div className="founder-avatar">
            {FOUNDER.avatar.startsWith('http') || FOUNDER.avatar.startsWith('/') ? (
              <img src={FOUNDER.avatar} alt={FOUNDER.name} className="avatar-img" />
            ) : (
              FOUNDER.avatar
            )}
          </div>
          <div className="founder-glow-ring" />
        </div>
        <div className="founder-meta">
          <span className="founder-badge">✦ Founder</span>
          <h3 className="founder-name">{FOUNDER.name}</h3>
          <p className="founder-role accent-gradient">{FOUNDER.role}</p>
          <p className="founder-dept">{FOUNDER.dept}</p>
        </div>
      </div>

      {/* Quote */}
      <div className="founder-quote-wrap">
        <span className="quote-mark">"</span>
        <p className="founder-quote">{FOUNDER.vision}</p>
      </div>

      {/* Social links */}
      <div className="founder-socials">
        {FOUNDER.socials.map((s: any) => {
          const name = typeof s === 'string' ? s : s?.name || 'LinkedIn';
          const url = typeof s === 'string' ? 'https://www.linkedin.com/' : s?.url || 'https://www.linkedin.com/';
          const isExternal = url && url !== '#';
          return (
            <a
              key={name}
              href={url}
              target={isExternal ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className="social-pill"
            >
              {name} {isExternal ? '↗' : ''}
            </a>
          );
        })}
      </div>

      <style jsx>{`
        .founder-card {
          position: relative;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 0 0 24px 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 0;
          box-shadow: var(--shadow-card);
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }

        .founder-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 40px var(--glow);
        }

        .founder-accent-bar {
          height: 3px;
          background: var(--gradient-accent);
          opacity: 0.8;
          width: 100%;
        }

        /* Stack avatar on top, text below — matches mentor layout */
        .founder-identity {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 24px 24px 16px;
        }

        .founder-avatar-wrap {
          position: relative;
          flex-shrink: 0;
        }

        .founder-avatar {
          width: 64px;
          height: 64px;
          border-radius: 200px;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.6rem;
          position: relative;
          z-index: 1;
          overflow: hidden;
          transition: transform 0.3s ease;
        }

        .founder-card:hover .founder-avatar {
          transform: scale(1.08) rotate(-4deg);
        }

        .founder-glow-ring {
          position: absolute;
          inset: -5px;
          border-radius: 50%;
          border: 2px solid transparent;
          background: var(--gradient-accent) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out;
          mask-composite: exclude;
          animation: spin-slow 6s linear infinite;
        }

        .founder-meta {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .founder-badge {
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--accent-2);
        }

        .founder-name {
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.01em;
        }

        .founder-role {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--accent-1);
        }

        .founder-dept {
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        .founder-quote-wrap {
          position: relative;
          padding: 0 24px 20px;
          flex: 1;
        }

        .quote-mark {
          font-size: 5rem;
          line-height: 0.5;
          color: var(--accent-1);
          opacity: 0.12;
          font-family: Georgia, serif;
          position: absolute;
          top: 4px;
          left: 16px;
        }

        .founder-quote {
          font-size: 0.88rem;
          line-height: 1.7;
          color: var(--text-secondary);
          position: relative;
          z-index: 1;
          font-style: italic;
          border-left: 2px solid var(--accent-1);
          padding-left: 12px;
        }

        .founder-stats-ribbon {
          display: flex;
          gap: 0;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          margin: 0 0 16px;
          overflow: hidden;
        }

        .ribbon-item {
          flex: 1;
          text-align: center;
          padding: 10px 6px;
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--text-muted);
          border-right: 1px solid var(--border);
        }

        .ribbon-item:last-child {
          border-right: none;
        }

        .founder-socials {
          display: flex;
          gap: 8px;
          padding: 0 24px;
        }

        .social-pill {
          padding: 6px 16px;
          border-radius: 50px;
          border: 1px solid var(--border);
          background: var(--bg-secondary);
          color: var(--text-secondary);
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
        }

        .social-pill:hover {
          border-color: var(--accent-1);
          color: var(--accent-1);
          background: var(--bg-card);
        }

        @media (max-width: 480px) {
          .founder-identity { padding: 20px; flex-direction: column; align-items: flex-start; }
          .founder-stats-ribbon { flex-direction: column; }
          .ribbon-item { border-right: none; border-bottom: 1px solid var(--border); }
          .ribbon-item:last-child { border-bottom: none; }
        }
      `}</style>
    </div>
  );
}

/* ─── Mentor Card ─── */
function MentorCard({ mentor, index }: { mentor: typeof MENTORS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, x: 70, scale: 0.94 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        delay: index * 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
      }
    );
  }, [index]);

  return (
    <div ref={ref} className="mentor-card">
      <div className="mentor-top">
        <div className="mentor-avatar">
          {mentor.avatar.startsWith('http') || mentor.avatar.startsWith('/') ? (
            <img src={mentor.avatar} alt={mentor.name} className="avatar-img" />
          ) : (
            mentor.avatar
          )}
        </div>
        <div className="mentor-info">
          <span className="mentor-badge">✦ Mentor</span>
          <h4 className="mentor-name">{mentor.name}</h4>
          <p className="mentor-role">{mentor.role}</p>
          <p className="mentor-dept">{mentor.dept}</p>
        </div>
      </div>

      <p className="mentor-msg">"{mentor.message}"</p>

      {/* <div className="mentor-expertise">
        {mentor.expertise.map((tag) => (
          <span key={tag} className="expertise-tag">{tag}</span>
        ))}
      </div> */}

      <style jsx>{`
        .mentor-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .mentor-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--gradient-accent);
          opacity: 0.6;
        }

        .mentor-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 40px var(--glow);
        }

        .mentor-top {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .mentor-avatar {
          font-size: 2.6rem;
          width: 64px;
          height: 64px;
          border-radius: 200px;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.3s ease;
          overflow: hidden;
        }

        :global(.avatar-img) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: inherit;
        }

        .mentor-card:hover .mentor-avatar {
          transform: scale(1.08) rotate(-4deg);
        }

        .mentor-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .mentor-badge {
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--accent-2);
        }

        .mentor-name {
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .mentor-role {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--accent-1);
        }

        .mentor-dept {
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        .mentor-msg {
          font-size: 0.88rem;
          line-height: 1.7;
          color: var(--text-secondary);
          font-style: italic;
          border-left: 2px solid var(--accent-1);
          padding-left: 12px;
        }

        .mentor-expertise {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .expertise-tag {
          padding: 4px 10px;
          border-radius: 50px;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        @media (max-width: 480px) {
          .mentor-top { flex-direction: column; align-items: flex-start; text-align: left; }
        }
      `}</style>
    </div>
  );
}

/* ─── Main Export ─── */
export default function FounderMentorsSection() {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
      }
    );
  }, []);

  return (
    <section id="leadership" className="leadership-section">
      {/* Header */}
      <div ref={headingRef} className="leadership-header">
        <p className="section-eyebrow">The Visionaries</p>
        <h2 className="section-title leadership-title">
          Meet Our <span className="accent-gradient">Mentors</span>
        </h2>
        <p className="section-desc">
          The guiding minds behind everything SoarJMI stands for.
        </p>
      </div>

      {/* Three-equal-column layout — no priority between cards */}
      <div className="leadership-layout">
        <FounderCard />
        {MENTORS.map((mentor, i) => (
          <MentorCard key={mentor.name} mentor={mentor} index={i} />
        ))}
      </div>

      <style jsx>{`
        .leadership-section {
          padding: 100px 6%;
          background: var(--bg-primary);
          position: relative;
        }

        .leadership-header {
          text-align: center;
          margin-bottom: 64px;
        }

        .section-eyebrow {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--accent-1);
          margin-bottom: 12px;
        }

        .leadership-title {
          margin-bottom: 16px;
        }

        .section-desc {
          color: var(--text-muted);
          font-size: 1rem;
          line-height: 1.7;
          max-width: 520px;
          margin: 0 auto;
        }

        /* ── Equal 3-column grid ── */
        .leadership-layout {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          align-items: stretch;
        }

        @media (max-width: 960px) {
          .leadership-layout {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .leadership-layout {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .leadership-section { padding: 60px 4%; }
        }
      `}</style>
    </section>
  );
}
