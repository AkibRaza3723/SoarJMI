'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const { theme } = useTheme();
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const bottomTrackRef = useRef<HTMLDivElement>(null);
  
  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: true, margin: '-100px' });

  useEffect(() => {
    // Check if ScrollTrigger is registered and running on client
    if (typeof window === 'undefined' || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop and tablet (min-width: 901px): pin hero and slide bottom image track
      mm.add("(min-width: 901px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=150%', // Scroll distance while pinned
            pin: true,
            scrub: 1, // Smooth scrolling animation
            invalidateOnRefresh: true,
          },
        });

        // Slide bottom row of photos from right to left (starts centered, moves left)
        tl.fromTo(
          bottomTrackRef.current,
          { x: 0 },
          { x: '-30vw', ease: 'none' },
          0
        );
      });

      // Mobile (max-width: 900px): use CSS marquee animation instead of scroll-scrub
      mm.add("(max-width: 900px)", () => {
        if (bottomTrackRef.current) {
          gsap.set(bottomTrackRef.current, { x: 0 });
          bottomTrackRef.current.classList.add('marquee-reverse');
        }
        // Cleanup: remove classes when this breakpoint is no longer active
        return () => {
          bottomTrackRef.current?.classList.remove('marquee-reverse');
        };
      });
    }, sectionRef);

    return () => ctx.revert(); // GSAP context cleanup
  }, []);

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

  // Society Images & Labels
  const baseBottomImages = [
    { src: '/images/society_collaboration.png', label: theme === 'cultural' ? 'Workshop Brainstorm' : 'Project Ideation' },
    { src: '/images/society_keynote.png', label: theme === 'cultural' ? 'Alumni Panel' : 'Guest Lectures' },
    { src: '/images/society_tech.png', label: theme === 'cultural' ? 'Media Design' : 'Web Dev Workshop' },
    { src: '/images/society_cultural.png', label: theme === 'cultural' ? 'Poetry Recitation' : 'UI/UX Session' },
    { src: '/images/society_collaboration.png', label: theme === 'cultural' ? 'Organizing Team' : 'Management Group' },
    { src: '/images/society_keynote.png', label: theme === 'cultural' ? 'Award Ceremony' : 'Demo Day' },
  ];

  const bottomImages = [...baseBottomImages, ...baseBottomImages, ...baseBottomImages];

  return (
    <section ref={sectionRef} id="hero" className="hero-section">
      {/* Background Tech/Cultural decorations */}
      <div className="hero-bg-decoration">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`deco-circle deco-circle-${i + 1}`} />
        ))}
      </div>


      {/* 2. Middle Hero Content Grid */}
      <div ref={contentRef} className="hero-content">
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
              ? 'SoarJMI is a dynamic cultural platform dedicated to fostering creativity, confidence, and holistic development among students. We organize engaging events such as debates, public speaking contests, talent showcases, and cultural celebrations.'
              : 'SoarJMI is a technical society built for students to turn ideas into reality. We bring together coding, designing, photography, and hackathons under one platform to learn, build, and collaborate across disciplines.'}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="hero-ctas">
            <a href="/events" className="btn-primary">
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
        <div className="hero-illustration-wrapper">
          <motion.div
            className="hero-illustration"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="illustration-ring ring-1" />
            <div className="illustration-ring ring-2" />
            <div className="illustration-ring ring-3" />
            <div className="illustration-core">
              {theme === 'cultural' ? '🎭' : '🚀'}
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
      </div>

      {/* 3. Bottom sliding track (Right to Left) */}
      <div className="image-track-container bottom-track">
        <div ref={bottomTrackRef} className="image-track">
          {bottomImages.map((img, idx) => (
            <div key={idx} className="image-card">
              <img src={img.src} alt={img.label} className="track-img" />
              <div className="img-overlay">
                <span className="img-caption">{img.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GLOBAL styles applied to motion.div and layout elements */}
      <style jsx global>{`
        /* ─── Hero Section ─── */
        .hero-section {
          position: relative;
          height: 100vh;
          background: var(--bg-primary);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          padding: 100px 0 24px;
          overflow: hidden;
          box-sizing: border-box;
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

        /* ─── Sliding Image Tracks ─── */
        .image-track-container {
          width: 100%;
          overflow: hidden;
          position: relative;
          z-index: 3;
          padding: 8px 0;
          display: flex;
          justify-content: center;
        }

        .image-track {
          display: flex;
          gap: 24px;
          width: max-content;
          will-change: transform;
          flex-shrink: 0;
        }

        .image-card {
          position: relative;
          width: 280px;
          height: 160px;
          border-radius: 0px; /* Sharp editorial cuts as per system specs */
          overflow: hidden;
          border: 1px solid var(--border);
          transition: transform 0.3s ease, border-color 0.3s ease;
          flex-shrink: 0;
          cursor: pointer;
        }

        .image-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent-1);
        }

        .track-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .image-card:hover .track-img {
          transform: scale(1.05);
        }

        .img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(6, 27, 14, 0.85) 0%, rgba(6, 27, 14, 0) 70%);
          display: flex;
          align-items: flex-end;
          padding: 12px 16px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .image-card:hover .img-overlay {
          opacity: 1;
        }

        .img-caption {
          color: #ffffff;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        /* ─── Grid Layout ─── */
        .hero-content {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 6%;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 40px;
          align-items: center;
          flex-grow: 1;
        }

        .hero-inner {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* ─── Badge ─── */
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

        /* ─── Text ─── */
        .hero-headline {
          color: var(--text-primary);
          line-height: 1.2;
        }

        .hero-desc {
          font-size: 1.05rem;
          line-height: 1.65;
          color: var(--text-secondary);
          max-width: 520px;
        }

        /* ─── CTAs ─── */
        .hero-ctas {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .btn-primary {
          padding: 12px 28px;
          background: var(--gradient-accent);
          color: #fff;
          border-radius: 9999px; /* Pill-shaped as per system specs */
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
          padding: 12px 28px;
          background: transparent;
          color: var(--text-primary);
          border: 1px solid var(--border);
          border-radius: 9999px; /* Pill-shaped as per system specs */
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.2s;
        }

        .btn-secondary:hover {
          background: var(--bg-card);
          border-color: var(--accent-1);
        }

        /* ─── Stats ─── */
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
        .hero-illustration-wrapper {
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          justify-self: end;
        }

        .hero-illustration {
          position: relative;
          width: 400px;
          height: 300px;
          flex-shrink: 0;
        }

        .illustration-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px dashed var(--border);
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
        }

        .ring-1 { width: 92%; height: 88%; animation: spin-slow 20s linear infinite; }
        .ring-2 { width: 68%; height: 64%; animation: spin-slow 14s linear infinite reverse; border-color: var(--accent-1); opacity: 0.3; }
        .ring-3 { width: 44%; height: 40%; animation: spin-slow 9s linear infinite; border-color: var(--accent-2); opacity: 0.4; }

        .illustration-core {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          width: fit-content;
          height: fit-content;
          z-index: 5;
          font-size: 4rem;
          filter: drop-shadow(0 0 30px var(--glow));
          animation: float 4s ease-in-out infinite;
        }

        .orbit-icon {
          position: absolute;
          font-size: 1.4rem;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 50%;
          top: calc(50% - 22px + sin(var(--angle)) * 110px);
          left: calc(50% - 22px + cos(var(--angle)) * 160px);
          animation: float 3s ease-in-out infinite;
          box-shadow: var(--shadow-card);
          z-index: 6;
        }

        /* ─── Mobile Marquee CSS Animation ─── */
        @keyframes marquee-ltr {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes marquee-rtl {
          0%   { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }

        .marquee-forward {
          animation: marquee-ltr 18s linear infinite;
        }
        .marquee-reverse {
          animation: marquee-rtl 18s linear infinite;
        }

        /* Pause on hover for accessibility */
        .image-track-container:hover .marquee-forward,
        .image-track-container:hover .marquee-reverse {
          animation-play-state: paused;
        }

        /* ─── Responsive Adjustments ─── */
        @media (max-width: 900px) {
          .hero-section {
            height: auto;
            min-height: 100vh;
            justify-content: center;
            gap: 32px;
            padding: 100px 0 40px;
          }
          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
            flex-grow: 0;
          }
          .image-card {
            width: 220px;
            height: 130px;
          }
          .hero-badge { margin: 0 auto; }
          .hero-desc { max-width: 100%; }
          .hero-stats { justify-content: center; }
          .hero-ctas { justify-content: center; }
          .hero-illustration-wrapper {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .hero-section {
            padding: 85px 0 20px;
            gap: 24px;
          }
          .image-card {
            width: 160px;
            height: 100px;
          }
          .image-track {
            gap: 16px;
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
            width: 260px;
            height: 190px;
          }
          .illustration-core {
            font-size: 2.5rem;
          }
          .orbit-icon {
            width: 32px;
            height: 32px;
            font-size: 1rem;
            top: calc(50% - 16px + sin(var(--angle)) * 65px);
            left: calc(50% - 16px + cos(var(--angle)) * 95px);
          }
        }
      `}</style>
    </section>
  );
}
