'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SoarLogo from './SoarLogo';

gsap.registerPlugin(ScrollTrigger);

// Pre-computed stable positions to avoid hydration mismatch (no Math.random in render)
const PARTICLE_POSITIONS = [
  '5%', '11%', '18%', '24%', '31%', '38%', '44%', '50%',
  '56%', '62%', '68%', '74%', '80%', '86%', '91%', '96%', '3%', '47%',
];

export default function LogoSplash() {
  const splashRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Step 1: Logo pops in on load ──
      const tl = gsap.timeline();

      tl.fromTo(
        splashRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 }
      )
        .fromTo(
          logoRef.current,
          { scale: 0, rotate: -180, opacity: 0 },
          { scale: 1, rotate: 0, opacity: 1, duration: 1, ease: 'elastic.out(1, 0.5)' }
        )
        .fromTo(
          textRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.3'
        );

      // ── Step 2: On scroll, shrink logo towards navbar ──
      // The splash section itself pins during the scroll shrink
      ScrollTrigger.create({
        trigger: splashRef.current,
        start: 'top top',
        end: '+=500',
        pin: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const scale = 1 - progress * 0.6;          // shrinks from 1 → 0.4
          const opacity = 1 - progress * 0.8;         // fades logo text out

          if (logoRef.current) {
            gsap.set(logoRef.current, {
              scale,
              y: progress * -160, // moves up
            });
          }
          if (textRef.current) {
            gsap.set(textRef.current, { opacity });
          }
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={splashRef} id="home" className="logo-splash">
      {/* Decorative blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="particles">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className="particle" style={{ '--delay': `${i * 0.4}s`, '--x': PARTICLE_POSITIONS[i] } as React.CSSProperties} />
        ))}
      </div>

      <div className="splash-center">
        <div ref={logoRef} className="splash-logo float-anim">
          <div className="logo-frame">
            <SoarLogo size={350} />
          </div>
        </div>
        <div ref={textRef} className="splash-text">
          <h1 className="splash-title">
            Soar<span className="accent-gradient">JMI</span>
          </h1>
          <p className="splash-subtitle">Strengths, Opportunities, Aspirations, Results</p>
          <div className="scroll-hint">
            <span>Scroll to explore</span>
            <div className="scroll-arrow" />
          </div>
        </div>
      </div>

      <style jsx>{`
        .logo-splash {
          position: relative;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--gradient-hero);
          overflow: hidden;
        }

        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.35;
          pointer-events: none;
        }

        .blob-1 {
          width: 500px;
          height: 500px;
          background: var(--accent-1);
          top: -100px;
          right: -100px;
        }

        .blob-2 {
          width: 400px;
          height: 400px;
          background: var(--accent-3);
          bottom: -80px;
          left: -80px;
        }

        .particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          bottom: -10px;
          left: var(--x);
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--accent-2);
          animation: particle-float 8s ease-in-out infinite;
          animation-delay: var(--delay);
          opacity: 0;
        }

        .splash-center {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          text-align: center;
        }

        .splash-logo {
          transform-origin: center;
        }

        .logo-frame {
          border-radius: 24px;
          overflow: hidden;
          transition: box-shadow 0.4s ease;
        }

        .splash-text {
          margin-top: -40px; /* Adjust this value to overlap more or less */
          position: relative;
          z-index: 10;
        }

        .splash-title {
          font-size: clamp(3rem, 8vw, 6rem);
          font-weight: 900;
          letter-spacing: -0.04em;
          color: var(--text-primary);
          line-height: 1;
        }

        .splash-subtitle {
          font-size: clamp(1rem, 2.5vw, 1.4rem);
          color: var(--text-muted);
          font-weight: 400;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .scroll-hint {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          margin-top: 16px;
          color: var(--text-muted);
          font-size: 0.85rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .scroll-arrow {
          width: 24px;
          height: 24px;
          border-right: 2px solid var(--accent-1);
          border-bottom: 2px solid var(--accent-1);
          transform: rotate(45deg);
          animation: bounce 1.5s ease-in-out infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: rotate(45deg) translateY(0); }
          50% { transform: rotate(45deg) translateY(6px); }
        }
      `}</style>
    </div>
  );
}
