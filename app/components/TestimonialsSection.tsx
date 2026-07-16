'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const TESTIMONIALS = [
  {
    name: 'Aisha Siddiqui',
    role: 'Final Year, English Literature',
    avatar: '👩‍🎓',
    wing: 'Cultural',
    text: 'Before SoarJMI, I was terrified to speak in front of 10 people. After two years of open mics and theatre workshops, I performed at a national youth fest. SoarJMI literally rewired my confidence.',
    stars: 5,
  },
  {
    name: 'Kabir Ansari',
    role: '3rd Year, Computer Science',
    avatar: '👨‍💻',
    wing: 'Tech',
    text: 'The hackathon SoarJMI organized landed me an internship at a Delhi startup. The mentorship from Dr. Fatima before the pitch was game-changing. I genuinely owe my career start to this society.',
    stars: 5,
  },
  {
    name: 'Noor Fatima',
    role: '2nd Year, Fine Arts',
    avatar: '👩‍🎨',
    wing: 'Cultural',
    text: 'I joined expecting a typical college club. What I found was a family. The annual art exhibition we curated had 2,000 visitors. Seeing strangers moved by my paintings — nothing prepares you for that.',
    stars: 5,
  },
  {
    name: 'Rohan Verma',
    role: 'Alumni, Batch 2024',
    avatar: '🧑‍💼',
    wing: 'Tech',
    text: 'SoarJMI taught me that the best products sit at the intersection of great engineering and great storytelling. That mindset is what got me into my current UX Engineering role at a product company.',
    stars: 5,
  },
  {
    name: 'Mariam Shaikh',
    role: '4th Year, Mass Communication',
    avatar: '👩‍🎤',
    wing: 'Cultural',
    text: 'The spoken word events changed how I write, how I think, and how I listen. Prof. Imran\'s workshop on storytelling is something every student — regardless of their major — should experience.',
    stars: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="stars">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="star">★</span>
      ))}
      <style jsx>{`
        .stars { display: flex; gap: 2px; }
        .star { color: var(--accent-2); font-size: 1rem; }
      `}</style>
    </div>
  );
}

function TestimonialCard({
  t,
  index,
  active,
}: {
  t: typeof TESTIMONIALS[0];
  index: number;
  active: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: active ? 1 : 0.45, scale: active ? 1 : 0.92, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`testimonial-card ${active ? 'active' : ''}`}
    >
      <div className="t-header">
        <div className="t-avatar">{t.avatar}</div>
        <div className="t-identity">
          <h4 className="t-name">{t.name}</h4>
          <p className="t-role">{t.role}</p>
          <span className={`t-wing-badge ${t.wing.toLowerCase()}`}>{t.wing} Wing</span>
        </div>
        <StarRating count={t.stars} />
      </div>

      <p className="t-text">"{t.text}"</p>

      <style jsx>{`
        .testimonial-card {
          padding: 32px;
          flex: 1;
          cursor: default;
          transition: all 0.4s ease;
          min-width: 0;
          border-radius: 20px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          box-shadow: var(--shadow-card);
        }

        .testimonial-card.active {
          box-shadow: 0 16px 48px var(--glow) !important;
        }

        .t-header {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          margin-bottom: 16px;
        }

        .t-avatar {
          font-size: 2.4rem;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: var(--bg-secondary);
          border: 2px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .t-identity {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .t-name {
          font-size: 1rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .t-role {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .t-wing-badge {
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 2px 8px;
          border-radius: 50px;
          width: fit-content;
          margin-top: 4px;
        }

        .t-wing-badge.cultural {
          background: rgba(232, 112, 74, 0.1);
          color: var(--accent-1);
          border: 1px solid rgba(232, 112, 74, 0.25);
        }

        .t-wing-badge.tech {
          background: rgba(108, 99, 255, 0.1);
          color: var(--accent-3);
          border: 1px solid rgba(108, 99, 255, 0.2);
        }

        .t-text {
          font-size: 0.92rem;
          line-height: 1.8;
          color: var(--text-secondary);
          font-style: italic;
        }
      `}</style>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const displayed = isMobile 
    ? [TESTIMONIALS[activeIdx % TESTIMONIALS.length]]
    : [
        TESTIMONIALS[(activeIdx) % TESTIMONIALS.length],
        TESTIMONIALS[(activeIdx + 1) % TESTIMONIALS.length],
        TESTIMONIALS[(activeIdx + 2) % TESTIMONIALS.length],
      ];

  return (
    <section id="testimonials" className="t-section">
      <div className="t-container" ref={ref}>
        {/* Header */}
        <motion.div
          className="t-header-section"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-eyebrow">Voices of SoarJMI</p>
          <h2 className="section-title t-title">
            What Our <span className="accent-gradient">Members Say</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="t-cards-container"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="t-cards"
            >
              {displayed.map((t, i) => (
                <TestimonialCard key={t.name} t={t} index={i} active={isMobile ? true : i === 1} />
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Navigation dots */}
        <div className="t-nav">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              className={`t-dot ${i === activeIdx ? 'active' : ''}`}
              onClick={() => setActiveIdx(i)}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
          <button
            className="t-arrow"
            onClick={() => setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length)}
            aria-label="Next testimonial"
          >
            →
          </button>
        </div>
      </div>

      <style jsx>{`
        .t-section {
          padding: 100px 6%;
          background: var(--bg-primary);
          overflow: hidden;
        }

        .t-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .t-header-section {
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

        .t-title {
          margin-bottom: 16px;
        }

        .section-desc {
          color: var(--text-muted);
          font-size: 1rem;
          line-height: 1.7;
          max-width: 480px;
          margin: 0 auto;
        }

        .t-cards-container {
          position: relative;
          width: 100%;
        }

        .t-cards {
          display: grid;
          grid-template-columns: 1fr 1.15fr 1fr;
          gap: 24px;
          align-items: start;
          margin-bottom: 40px;
          width: 100%;
          padding: 8px 0;
        }

        .t-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .t-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 2px solid var(--border);
          background: transparent;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .t-dot.active {
          background: var(--accent-1);
          border-color: var(--accent-1);
          transform: scale(1.3);
        }

        .t-arrow {
          margin-left: 8px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid var(--border);
          background: var(--bg-card);
          color: var(--text-primary);
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .t-arrow:hover {
          background: var(--accent-1);
          color: #fff;
          border-color: var(--accent-1);
        }

        @media (max-width: 900px) {
          .t-cards {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 480px) {
          .t-section {
            padding: 60px 4%;
          }
        }
      `}</style>
    </section>
  );
}
