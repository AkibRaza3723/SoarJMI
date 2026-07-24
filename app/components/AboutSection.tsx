'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function AboutSection() {
  const { theme } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <section id="about" className="about-section">
      <div className="about-container flex flex-col justify-center items-center gap-10"  ref={ref}>
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
              ? <>We Are <span className="accent-gradient">SoarJMI.</span></>
              : <>We Are <span className="accent-gradient">SoarJMI.</span></>
            }
          </h2>
          <p className="about-body">
            SoarJMI is the multidisciplinary society of Jamia Millia Islamia, dedicated to empowering students to turn bold ideas into reality. Built on the belief that true innovation thrives at the intersection of logic, artistry, and expression, SoarJMI provides a vibrant umbrella where technology, creativity, and culture coexist.
            <br/><br/>By bringing together diverse domains spanning over tech, visual design, media production, event management, and hackathons alongside rich cultural initiatives, SoarJMI creates a collaborative ecosystem. Here, technical rigour meets cultural passion, giving members from all backgrounds the platform to build skills, celebrate heritage and modern expression, lead impactful projects, and grow together.
          </p>
          <h2 className="section-title about-title">
            {theme === 'cultural'
              ? <>Our <span className="accent-gradient">Mission</span></>
              : <>Our <span className="accent-gradient">Mission</span></>
            }
          </h2>
          <p className='about-body'>
         To empower students by creating an inclusive, multidisciplinary ecosystem where technology, creative expression, and cultural heritage converge,  enabling members to build future-ready skills, lead impactful projects, and turn bold ideas into reality
          </p>
         <h2 className="section-title about-title">
            {theme === 'cultural'
              ? <>Core <span className="accent-gradient">Values</span></>
              : <>Core <span className="accent-gradient">Values</span></>
            }
          </h2>
          <p className='about-body'>
          Innovation, Collaboration, Integrity, and Excellence, SoarJMI is committed to creating an inclusive space where every idea is welcomed, every skill is valued, and every member is encouraged to soar.
          </p>
          <div className="about-badge-row">
            <span className="about-badge">Est. 2022</span>
            <span className="about-badge">JMI Campus</span>
            <span className="about-badge">40+ Active Members</span>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .about-section {
          padding: 100px 6%;
          background: var(--bg-primary);
          position: relative;
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
          line-height:1.8 ;
        }

        .about-body {
          font-size: 1.2rem;
          line-height: 1.8;
          max-width: 100%;
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
          .about-section {
            padding: 60px 4%;
          }
        }
      `}</style>
    </section>
  );
}
