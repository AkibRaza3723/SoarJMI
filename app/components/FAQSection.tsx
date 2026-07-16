'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    q: 'Who can join SoarJMI?',
    a: 'Any student currently enrolled at Jamia Millia Islamia can join SoarJMI — regardless of their department, year, or background. We welcome all skill levels and interests.',
  },
  {
    q: 'Are there membership fees?',
    a: 'Nope! Joining SoarJMI is completely free. However, some events and workshops may have a nominal registration fee to cover logistics.',
  },
  {
    q: 'How often are events organized?',
    a: 'We host 30+ events every academic year — ranging from weekly workshops and open mics to large-scale annual fests. Stay tuned to our events page for updates.',
  },
  {
    q: 'Can I contribute to both Cultural and Tech wings?',
    a: 'Absolutely! SoarJMI is one society with two vibrant wings. You are encouraged to participate in events across both themes. Many of our members are both artists and coders.',
  },
  {
    q: 'How do I apply for a leadership role?',
    a: 'Leadership applications open at the start of each academic year. Keep an eye on our announcements. The process involves a brief application and an interview with current leads.',
  },
  {
    q: 'Do you collaborate with other societies or colleges?',
    a: 'Yes! SoarJMI regularly collaborates with other student bodies at JMI and partner institutions across Delhi NCR. Collaboration fuels our biggest events.',
  },
];

function FAQItem({ faq, index }: { faq: { q: string; a: string }; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="faq-item"
    >
      <button
        className={`faq-question ${open ? 'faq-open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{faq.q}</span>
        <div className={`faq-icon ${open ? 'rotated' : ''}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="faq-answer-wrap"
          >
            <p className="faq-answer">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .faq-item {
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          background: var(--bg-card);
          transition: border-color 0.3s, box-shadow 0.3s;
        }

        .faq-item:hover {
          border-color: var(--accent-1);
          box-shadow: 0 4px 20px var(--glow);
        }

        .faq-question {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          padding: 22px 24px;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-primary);
          font-size: 1rem;
          font-weight: 600;
          text-align: left;
          transition: color 0.2s;
        }

        .faq-question.faq-open {
          color: var(--accent-1);
        }

        .faq-icon {
          flex-shrink: 0;
          color: var(--text-muted);
          transition: transform 0.35s ease;
        }

        .faq-icon.rotated {
          transform: rotate(180deg);
          color: var(--accent-1);
        }

        .faq-answer-wrap {
          overflow: hidden;
        }

        .faq-answer {
          padding: 0 24px 22px;
          font-size: 0.95rem;
          line-height: 1.75;
          color: var(--text-secondary);
        }
      `}</style>
    </motion.div>
  );
}

export default function FAQSection() {
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true });

  return (
    <section id="faq" className="faq-section">
      <div className="faq-container">
        <motion.div
          ref={titleRef}
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-eyebrow">Got Questions?</p>
          <h2 className="section-title faq-title">
            Frequently Asked <span className="accent-gradient">Questions</span>
          </h2>
          <p className="section-desc">
            Everything you need to know about SoarJMI. Can't find an answer?{' '}
            <a href="#contact" className="faq-link">Contact us</a>.
          </p>
        </motion.div>

        <div className="faq-list">
          {FAQS.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .faq-section {
          padding: 100px 6%;
          background: var(--bg-secondary);
        }

        .faq-container {
          max-width: 860px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: 56px;
        }

        .section-eyebrow {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--accent-1);
          margin-bottom: 12px;
        }

        .faq-title {
          margin-bottom: 16px;
        }

        .section-desc {
          color: var(--text-muted);
          font-size: 1rem;
          line-height: 1.7;
        }

        .faq-link {
          color: var(--accent-1);
          font-weight: 600;
          text-decoration: none;
        }

        .faq-link:hover {
          text-decoration: underline;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        @media (max-width: 480px) {
          .faq-section {
            padding: 60px 4%;
          }
          .faq-question {
            padding: 16px 20px;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </section>
  );
}
