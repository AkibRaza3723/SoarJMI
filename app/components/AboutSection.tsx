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
            SOAR JMI is the technology and creative society of Jamia Millia Islamia, built for students who want to turn ideas into reality. The society brings together coding, graphic designing, photography, video editing, management, and hackathons under one platform, giving members a space to learn, build, and collaborate across disciplines. Whether it is writing clean code, designing a striking visual identity, capturing a moment through the lens, editing a compelling video, organising a large-scale event, or competing in a high-energy hackathon, SOAR JMI is where students from every background come together to innovate with technology and creativity. The society is driven by the belief that the best ideas come to life when curiosity meets collaboration, and it continues to build an ecosystem where every member finds a domain to grow in and a team to grow with.
          </p>
          <h2 className="section-title about-title">
            {theme === 'cultural'
              ? <>Our <span className="accent-gradient">Mission</span></>
              : <>Our <span className="accent-gradient">Mission</span></>
            }
          </h2>
          <p className='about-body'>
         To nurture practical skills in coding, design, photography, video editing, event management, and hackathons through hands-on projects, workshops, and collaborative events, while fostering a culture of teamwork, innovation, and continuous learning.
          </p>
         <h2 className="section-title about-title">
            {theme === 'cultural'
              ? <>Core <span className="accent-gradient">Values</span></>
              : <>Core <span className="accent-gradient">Values</span></>
            }
          </h2>
          <p className='about-body'>
          Innovation, Collaboration, Integrity, and Excellence — SOAR JMI is committed to creating an inclusive space where every idea is welcomed, every skill is valued, and every member is encouraged to soar.
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
