'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TeamMember {
  name: string;
  role: string;
  avatar: string;        // emoji avatar for now
  quote: string;
  social?: string;
}

const TEAM: TeamMember[] = [
  {
    name: 'Zara Hussain',
    role: 'President',
    avatar: '👩‍💼',
    quote: 'Together, we turn ideas into movements.',
  },
  {
    name: 'Aryan Malik',
    role: 'Vice President',
    avatar: '👨‍🎓',
    quote: 'Innovation is our language, creativity is our voice.',
  },
  {
    name: 'Prof. Imran Siddiqui',
    role: 'Faculty Mentor',
    avatar: '👨‍🏫',
    quote: 'I guide them to soar beyond their limits.',
  },
  {
    name: 'Dr. Fatima Ansari',
    role: 'Co-Mentor',
    avatar: '👩‍🔬',
    quote: 'Nurturing excellence, one student at a time.',
  },
];

function MemberCard({ member, index }: { member: TeamMember; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 60, scale: 0.92 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        delay: index * 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [index]);

  return (
    <div ref={cardRef} className="member-card glass-card">
      <div className="card-glow" />
      <div className="member-avatar">{member.avatar}</div>
      <div className="member-role">{member.role}</div>
      <h3 className="member-name">{member.name}</h3>
      <p className="member-quote">"{member.quote}"</p>
      <div className="card-divider" />
      <div className="card-footer">
        <span className="card-tag">SoarJMI</span>
        <span className="card-tag">2025–26</span>
      </div>

      <style jsx>{`
        .member-card {
          position: relative;
          padding: 36px 28px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 10px;
          overflow: hidden;
          cursor: default;
        }

        .card-glow {
          position: absolute;
          top: -50px;
          left: 50%;
          transform: translateX(-50%);
          width: 120px;
          height: 120px;
          background: var(--accent-1);
          border-radius: 50%;
          filter: blur(50px);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .member-card:hover .card-glow {
          opacity: 0.25;
        }

        .member-avatar {
          font-size: 4rem;
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: var(--bg-secondary);
          border: 2px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
          transition: transform 0.3s ease;
        }

        .member-card:hover .member-avatar {
          transform: scale(1.1) rotate(-5deg);
        }

        .member-role {
          margin-top: 8px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--accent-1);
          background: linear-gradient(to right, var(--accent-1), var(--accent-2));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .member-name {
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        .member-quote {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.6;
          font-style: italic;
          max-width: 240px;
        }

        .card-divider {
          width: 40px;
          height: 2px;
          background: var(--gradient-accent);
          border-radius: 4px;
          margin: 6px auto;
        }

        .card-footer {
          display: flex;
          gap: 8px;
        }

        .card-tag {
          font-size: 0.7rem;
          padding: 3px 10px;
          border-radius: 50px;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          color: var(--text-muted);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}

export default function TeamSection() {
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;

    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <section id="team" className="team-section">
      <div className="team-container">
        <div ref={headingRef} className="section-header">
          <p className="section-eyebrow">The People Behind the Magic</p>
          <h2 className="section-title team-title">
            Meet Our <span className="accent-gradient">Leadership</span>
          </h2>
          <p className="section-desc">
            Passionate individuals driving SoarJMI's vision every single day.
          </p>
        </div>

        <div className="team-grid">
          {TEAM.map((member, i) => (
            <MemberCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .team-section {
          padding: 100px 6%;
          background: var(--bg-secondary);
          position: relative;
          overflow: hidden;
        }

        .team-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: var(--gradient-accent);
          opacity: 0.4;
        }

        .team-container {
          max-width: 1100px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-eyebrow {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--accent-1);
          margin-bottom: 12px;
        }

        .team-title {
          margin-bottom: 16px;
        }

        .section-desc {
          font-size: 1rem;
          color: var(--text-muted);
          max-width: 500px;
          margin: 0 auto;
          line-height: 1.7;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 28px;
        }

        @media (max-width: 600px) {
          .team-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
