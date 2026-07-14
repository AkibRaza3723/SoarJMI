'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function AboutSection() {
  const { theme } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const pillars = theme === 'cultural'
    ? [
        { icon: '🎭', title: 'Theatre & Drama', desc: 'Annual plays, improv sessions, and drama workshops that bring stories to life.' },
        { icon: '🎵', title: 'Music & Dance', desc: 'Classical, fusion, and contemporary performances celebrating every art form.' },
        { icon: '🖼️', title: 'Visual Arts', desc: 'Exhibitions, installations, and murals transforming campus into a living gallery.' },
        { icon: '✍️', title: 'Literature', desc: 'Poetry slams, open mics, and creative writing clubs for voices to be heard.' },
      ]
    : [
        { icon: '💻', title: 'Hackathons', desc: '48-hour build marathons where teams create solutions to real-world problems.' },
        { icon: '🤖', title: 'AI & ML', desc: 'Workshops and projects exploring cutting-edge machine learning and AI tools.' },
        { icon: '🔗', title: 'Web3 & Blockchain', desc: 'Exploring decentralized tech, smart contracts, and the future of the internet.' },
        { icon: '🚀', title: 'Entrepreneurship', desc: 'Startup bootcamps and mentorship programs for aspiring founders.' },
      ];

  return (
    <section id="about" className="about-section">
      <div className="about-container" ref={ref}>
        {/* Left: text */}
        <motion.div
          className="about-text"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="section-eyebrow">About SoarJMI</p>
          <h2 className="section-title about-title">
            {theme === 'cultural'
              ? <>We Are <span className="accent-gradient">Art.</span></>
              : <>We Are <span className="accent-gradient">Code.</span></>
            }
          </h2>
          <p className="about-body">
            {theme === 'cultural'
              ? `Founded in 2020, SoarJMI began as a small collective of passionate artists at Jamia Millia Islamia. Today, we are a vibrant community of 500+ students, alumni, and faculty — united by the belief that culture is the soul of education.`
              : `SoarJMI's Tech wing was born from a simple idea: students learn best by building. Since 2020, our technical community has grown into a powerhouse of engineers, designers, and problem-solvers who ship real products.`
            }
          </p>
          <p className="about-body about-body-2">
            {theme === 'cultural'
              ? `From grand cultural fests to intimate open-mic nights, every event we curate is a testament to the richness of human expression. We don't just celebrate culture — we create it.`
              : `Whether you're a first-year discovering your first algorithm or a final-year shipping your startup, SoarJMI is the launchpad you've been looking for. We build, we break, we learn, we grow.`
            }
          </p>
          <div className="about-badge-row">
            <span className="about-badge">Est. 2020</span>
            <span className="about-badge">JMI Campus</span>
            <span className="about-badge">500+ Members</span>
          </div>
        </motion.div>

        {/* Right: pillar cards */}
        <div className="about-pillars">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              className="pillar-card glass-card"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="pillar-icon">{p.icon}</span>
              <h4 className="pillar-title">{p.title}</h4>
              <p className="pillar-desc">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .about-section {
          padding: 100px 6%;
          background: var(--bg-primary);
          position: relative;
        }

        .about-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 70px;
          align-items: center;
        }

        .about-text {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .section-eyebrow {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--accent-1);
        }

        .about-title {
          line-height: 1.05;
        }

        .about-body {
          font-size: 1rem;
          line-height: 1.8;
          color: var(--text-secondary);
        }

        .about-body-2 {
          color: var(--text-muted);
        }

        .about-badge-row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 8px;
        }

        .about-badge {
          padding: 6px 14px;
          border-radius: 50px;
          border: 1px solid var(--border);
          background: var(--bg-card);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .about-pillars {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .pillar-card {
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .pillar-icon {
          font-size: 2rem;
        }

        .pillar-title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .pillar-desc {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.6;
        }

        @media (max-width: 900px) {
          .about-container {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 500px) {
          .about-pillars {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
