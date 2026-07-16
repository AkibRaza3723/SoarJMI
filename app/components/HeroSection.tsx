'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function HeroSection() {
  const { theme } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section className="hero-section">
      {/* Floating tech circles (Tech theme decorations) */}
      <div className="hero-bg-decoration">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`deco-circle deco-circle-${i + 1}`} />
        ))}
      </div>

      <div ref={ref} className="hero-content">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="hero-inner"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="hero-badge">
            <span className="badge-dot" />
            {theme === 'cultural' ? '🎭 Cultural & Arts Society' : '⚡ Tech & Innovation Hub'}
          </motion.div>

          {/* Headline */}
          <motion.h2 variants={itemVariants} className="hero-headline section-title">
            {theme === 'cultural' ? (
              <>
                Where Every Story<br />
                <span className="accent-gradient">Comes Alive</span>
              </>
            ) : (
              <>
                Build. Innovate.<br />
                <span className="accent-gradient">Disrupt.</span>
              </>
            )}
          </motion.h2>

          {/* Description */}
          <motion.p variants={itemVariants} className="hero-desc">
            {theme === 'cultural'
              ? 'SoarJMI is the beating heart of creativity at Jamia Millia Islamia. We celebrate art, music, theatre, dance, and cultural exchange — uniting hundreds of passionate students under one roof.'
              : 'SoarJMI drives technological innovation at Jamia Millia Islamia. From hackathons to AI workshops, we empower the next generation of engineers, designers, and entrepreneurs.'}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="hero-ctas">
            <a href="#events" className="btn-primary">
              {theme === 'cultural' ? '🎪 See Our Events' : '🚀 Explore Projects'}
            </a>
            <a href="#team" className="btn-secondary">Meet the Team</a>
          </motion.div>

          {/* Stats row */}
          <motion.div variants={itemVariants} className="hero-stats">
            {[
              { value: '40+', label: 'Members' },
              { value: '15+', label: 'Events' },
              { value: '4', label: 'Years Strong' },
            ].map((stat) => (
              <div key={stat.label} className="stat-item">
                <span className="stat-value accent-gradient">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right side illustration */}
        <motion.div
          className="hero-illustration"
          initial={{ opacity: 0, x: 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="illustration-ring ring-1" />
          <div className="illustration-ring ring-2" />
          <div className="illustration-ring ring-3" />
          <div className="illustration-core">
            {theme === 'cultural' ? '🎭' : '⚡'}
          </div>
          {/* Orbiting icons */}
          {(theme === 'cultural'
            ? ['🎵', '🖼️', '💃', '🎬', '🎨']
            : ['💻', '🤖', '🔗', '📡', '🛰️']
          ).map((icon, i) => (
            <div
              key={i}
              className="orbit-icon"
              style={{
                '--angle': `${i * 72}deg`,
                animationDelay: `${i * 0.4}s`,
              } as React.CSSProperties}
            >
              {icon}
            </div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        .hero-section {
          position: relative;
          min-height: 100vh;
          background: var(--bg-primary);
          display: flex;
          align-items: center;
          padding: 120px 6% 80px;
          overflow: hidden;
        }

        .hero-bg-decoration {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .deco-circle {
          position: absolute;
          border-radius: 50%;
          border: 1px solid var(--border);
        }
        .deco-circle-1 { width: 600px; height: 600px; top: -200px; right: -100px; }
        .deco-circle-2 { width: 400px; height: 400px; top: -100px; right: 50px; border-color: var(--accent-1); opacity: 0.15; }
        .deco-circle-3 { width: 200px; height: 200px; bottom: 80px; left: 10%; opacity: 0.1; border-color: var(--accent-3); }
        .deco-circle-4 { width: 80px; height: 80px; top: 30%; left: 5%; background: var(--accent-2); opacity: 0.1; }
        .deco-circle-5 { width: 40px; height: 40px; bottom: 20%; right: 10%; background: var(--accent-1); opacity: 0.2; }

        .hero-content {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .hero-inner {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
          width: fit-content;
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent-1);
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .hero-headline {
          color: var(--text-primary);
        }

        .hero-desc {
          font-size: 1.05rem;
          line-height: 1.75;
          color: var(--text-secondary);
          max-width: 500px;
        }

        .hero-ctas {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .btn-primary {
          padding: 14px 28px;
          background: var(--gradient-accent);
          color: #fff;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 700;
          font-size: 0.95rem;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 20px var(--glow);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px var(--glow);
        }

        .btn-secondary {
          padding: 14px 28px;
          background: transparent;
          color: var(--text-primary);
          border: 1px solid var(--border);
          border-radius: 12px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.2s;
        }

        .btn-secondary:hover {
          background: var(--bg-card);
          border-color: var(--accent-1);
        }

        .hero-stats {
          display: flex;
          gap: 40px;
          padding-top: 12px;
          border-top: 1px solid var(--border);
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stat-value {
          font-size: 1.8rem;
          font-weight: 900;
          letter-spacing: -0.04em;
        }

        .stat-label {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        /* ─── Illustration ─── */
        .hero-illustration {
          position: relative;
          width: 100%;
          aspect-ratio: 1;
          max-width: 460px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .illustration-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px dashed var(--border);
        }

        .ring-1 { width: 100%; height: 100%; animation: spin-slow 20s linear infinite; }
        .ring-2 { width: 75%; height: 75%; animation: spin-slow 14s linear infinite reverse; border-color: var(--accent-1); opacity: 0.3; }
        .ring-3 { width: 50%; height: 50%; animation: spin-slow 9s linear infinite; border-color: var(--accent-2); opacity: 0.4; }

        .illustration-core {
          position: relative;
          z-index: 5;
          font-size: 5rem;
          filter: drop-shadow(0 0 30px var(--glow));
          animation: float 4s ease-in-out infinite;
        }

        .orbit-icon {
          position: absolute;
          font-size: 1.8rem;
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 50%;
          /* Place on the outer ring at angle */
          top: calc(50% - 28px + sin(var(--angle)) * 170px);
          left: calc(50% - 28px + cos(var(--angle)) * 170px);
          animation: float 3s ease-in-out infinite;
          box-shadow: var(--shadow-card);
        }

        @media (max-width: 900px) {
          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .hero-badge { margin: 0 auto; }
          .hero-desc { max-width: 100%; }
          .hero-stats { justify-content: center; }
          .hero-ctas { justify-content: center; }
          .hero-illustration { max-width: 300px; }
        }

        @media (max-width: 480px) {
          .hero-section {
            padding: 100px 4% 60px;
          }
          .hero-stats {
            flex-wrap: wrap;
            gap: 20px;
          }
          .stat-item {
            flex: 1 1 40%;
            align-items: center;
          }
          .hero-ctas {
            flex-direction: column;
            width: 100%;
          }
          .btn-primary, .btn-secondary {
            width: 100%;
            text-align: center;
          }
          .hero-illustration {
            max-width: 220px;
          }
          .illustration-core {
            font-size: 3.5rem;
          }
        }
      `}</style>
    </section>
  );
}
