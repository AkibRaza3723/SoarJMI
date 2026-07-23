'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function GuidanceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const cardVariants: any = {
    hidden: { opacity: 0, y: 40, scale: 0.94 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="guidance" className="guidance-section">
      <div className="guidance-container" ref={ref}>

        {/* ── Top: Section header ── */}
        <motion.div
          className="guidance-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-eyebrow">Structured Growth</p>
          <h2 className="section-title guidance-title">
            Our <span className="accent-gradient">Guidance</span> Framework
          </h2>
          
        </motion.div>

        {/* ── Pillars Grid ── */}
        <motion.div
          className="pillars-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div className="flex flex-col justify-center items-center w-full section-desc ">
            <p>To maintain a positive, professional, and inclusive environment, all members of SoarJMI are expected to uphold the values and standards of the society. Every member should actively participate in meetings, events, workshops, and society activities while respecting the time, efforts, and contributions of fellow members. Punctuality, discipline, teamwork, and mutual respect are fundamental principles that every member must follow. Members are encouraged to communicate openly, share innovative ideas, and contribute positively to the growth of the society. Any form of discrimination, harassment, misconduct, or behavior that harms the reputation of the society or the university will not be tolerated. By adhering to these guidelines, every member plays a vital role in creating a collaborative, inspiring, and supportive community where learning, innovation, leadership, and creativity can thrive.</p>
          </div>
        </motion.div>

        

      </div>

      <style jsx>{`
        .guidance-section {
          padding: 100px 6%;
          background: var(--bg-secondary);
          position: relative;
          overflow: hidden;
        }

        .guidance-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: var(--gradient-accent);
          opacity: 0.35;
        }

        .guidance-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .guidance-header {
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

        .guidance-title {
          margin-bottom: 16px;
        }

        .section-desc {
          grid-column: 1 / -1;
          color: var(--text-muted);
          font-size: 1.3rem;
          line-height: 1.7;
          max-width: 100%;
          margin: 0 auto;
        }

        /* ─── Pillars ─── */
        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 64px;
        }

        .pillar-block {
          padding: 28px 22px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          position: relative;
        }

        .pillar-icon-wrap {
          position: relative;
          width: fit-content;
        }

        .pillar-icon {
          font-size: 2.2rem;
          position: relative;
          z-index: 1;
        }

        .pillar-icon-glow {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: var(--accent-1);
          filter: blur(16px);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .pillar-block:hover .pillar-icon-glow {
          opacity: 0.2;
        }

        .pillar-heading {
          font-size: 1rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.01em;
        }

        .pillar-text {
          font-size: 0.87rem;
          line-height: 1.7;
          color: var(--text-muted);
        }

        /* ─── Divider ─── */
        .guidance-divider {
          position: relative;
          text-align: center;
          margin-bottom: 48px;
        }

        .guidance-divider::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: var(--border);
        }

        .divider-text {
          position: relative;
          background: var(--bg-secondary);
          padding: 0 20px;
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--text-muted);
        }

        /* ─── Mentor Words ─── */
        .mentor-words-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
          margin-bottom: 64px;
        }

        .mentor-word-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          transition: transform 0.3s, box-shadow 0.3s;
          position: relative;
          overflow: hidden;
        }

        .mentor-word-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 50px var(--glow);
        }

        .mw-top {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .mw-avatar {
          font-size: 2.5rem;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--bg-secondary);
          border: 2px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .mw-name {
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .mw-role {
          font-size: 0.8rem;
          color: var(--accent-1);
          font-weight: 600;
        }

        .mw-quote {
          font-size: 0.97rem;
          line-height: 1.85;
          color: var(--text-secondary);
          font-style: normal;
          position: relative;
        }

        .mw-open-quote,
        .mw-close-quote {
          font-size: 2rem;
          font-family: Georgia, serif;
          color: var(--accent-1);
          opacity: 0.5;
          line-height: 0;
          vertical-align: -0.5em;
        }

        .mw-close-quote {
          vertical-align: -0.6em;
        }

        .mw-line {
          height: 3px;
          background: var(--gradient-accent);
          border-radius: 4px;
          width: 60px;
        }

        /* ─── CTA ─── */
        .guidance-cta {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .cta-text {
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        .btn-primary {
          display: inline-block;
          padding: 16px 36px;
          background: var(--gradient-accent);
          color: #fff;
          border-radius: 14px;
          text-decoration: none;
          font-weight: 700;
          font-size: 1rem;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 6px 24px var(--glow);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 36px var(--glow);
        }

        /* ─── Responsive ─── */
        @media (max-width: 1024px) {
          .pillars-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 700px) {
          .pillars-grid {
            grid-template-columns: 1fr;
          }
          .mentor-words-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 480px) {
          .guidance-section {
            padding: 60px 4%;
          }
        }
      `}</style>
    </section>
  );
}
