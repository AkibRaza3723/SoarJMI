'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SoarLogo from './SoarLogo';
import Typewriter from 'typewriter-effect';

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
      <svg className="splash-wave splash-wave-diagonal" viewBox="0 0 1440 1024" preserveAspectRatio="none" aria-hidden="true">
        <path fill="var(--splash-wave)" d="M1440,0 L1440,450 C900,150 500,1300 0,1024 L0,574 C500,850 900,-200 1440,0 Z"></path>
      </svg>
      <svg className="splash-wave splash-wave-tl" viewBox="0 0 400 400" preserveAspectRatio="none" aria-hidden="true">
        <path fill="var(--splash-wave)" d="M0,0 L400,0 C300,300 100,100 0,400 Z"></path>
      </svg>
      <svg className="splash-wave splash-wave-br" viewBox="0 0 400 400" preserveAspectRatio="none" aria-hidden="true">
        <path fill="var(--splash-wave)" d="M400,400 L0,400 C100,100 300,300 400,0 Z"></path>
      </svg>
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
        <div ref={textRef} className="splash-text flex flex-col justify-center items-center" >
          <h1 className=" splash-title ">
            Soar<span style={{ color: 'var(--primary)', WebkitTextFillColor: 'var(--primary)' }}>JMI</span>
          </h1>
          
          <div className='splash-subtitle mt-7 w-3/4 min-h-[60px]'>
            <Typewriter
              options={{
                delay: 35,
                cursor: '',
              }}
              onInit={(typewriter) => {
                typewriter.pauseFor(1500)
                  .typeString('To foster a community of student innovators at Jamia Millia Islamia who use technology, design, and creativity to solve real-world problems while learning, leading, and creating lasting impact.')
                  .start();
              }}
            />
          </div>
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

        .splash-wave {
          position: absolute;
          pointer-events: none;
          z-index: 0;
        }

        .splash-wave-diagonal {
          width: 100vw;
          height: 100vh;
          top: 0;
          left: 0;
          opacity: 0.7;
        }

        .splash-wave-tl {
          width: 30vw;
          max-width: 450px;
          height: 30vw;
          max-height: 450px;
          top: 0;
          left: 0;
          opacity: 0.8;
        }

        .splash-wave-br {
          width: 35vw;
          max-width: 500px;
          height: 35vw;
          max-height: 500px;
          bottom: 0;
          right: 0;
          opacity: 0.8;
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
          width: 100%;
          max-width: 100vw;
          padding: 0 20px;
          box-sizing: border-box;
        }

        .splash-logo {
          transform-origin: center;
        }

        .logo-frame {
          border-radius: 24px;
          overflow: hidden;
          transition: box-shadow 0.4s ease;
          max-width: 90vw;
        }

        .logo-frame :global(svg) {
          max-width: 100%;
          height: auto;
        }

        .splash-text {
          margin-top: -10px; /* Adjust this value to overlap more or less */
          position: relative;
          z-index: 10;
        }

        .splash-title {
          font-family: var(--font-orbitron);
          font-size: clamp(3rem, 7.5vw, 6rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          line-height: 1;
        }

        .splash-subtitle {
          font-size: clamp(0.7rem, 2.5vw, 1.4rem);
          color: var(--text-muted);
          font-weight: 400;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0 20px;
          line-height: 1.5;
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
