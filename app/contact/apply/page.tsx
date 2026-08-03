'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import RecruitmentForm from '../../components/RecruitmentForm';

export default function ApplyPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);
  const ptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Particle entrance animation
      if (ptRef.current) {
        const dots = ptRef.current.querySelectorAll('.particle-dot');
        gsap.set(dots, { opacity: 0, scale: 0 });
        gsap.to(dots, {
          opacity: 'random(0.3,0.8)',
          scale: 1,
          duration: 1.2,
          stagger: { each: 0.06, from: 'random' },
          ease: 'back.out(2)',
          delay: 0.2,
        });
        gsap.to(dots, {
          y: 'random(-20,20)',
          x: 'random(-15,15)',
          duration: 'random(4,8)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: { each: 0.4, from: 'random' },
        });
      }

      // Hero text entrance
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from(eyebrowRef.current, { opacity: 0, y: 30, duration: 0.7 }, 0.3)
        .from(headingRef.current, { opacity: 0, y: 50, duration: 0.8 }, 0.5)
        .from(subRef.current, { opacity: 0, y: 30, duration: 0.7 }, 0.75);

      // Form section entrance
      if (formSectionRef.current) {
        gsap.from(formSectionRef.current, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: 'power2.out',
          delay: 0.9,
        });
      }
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />
      <div ref={pageRef} className="apply-page">
        {/* Floating particles background */}
        <div ref={ptRef} className="particles-bg" aria-hidden="true">
          {[...Array(36)].map((_, i) => (
            <div
              key={i}
              className="particle-dot"
              style={{
                left: `${(i * 2.78) % 100}%`,
                top: `${(i * 4.17 + 10) % 100}%`,
                width: `${3 + (i % 5)}px`,
                height: `${3 + (i % 5)}px`,
              } as React.CSSProperties}
            />
          ))}
        </div>

        {/* Hero header */}
        <header className="apply-hero">
          <p ref={eyebrowRef} className="apply-eyebrow">
            SoarJMI &middot; Recruitment
          </p>
          <h1 ref={headingRef} className="apply-heading section-title">
            Join Our&nbsp;<span className="accent-gradient">Team</span>
          </h1>
          <p ref={subRef} className="apply-sub">
            Fill out the application below to become a part of the SoarJMI family.
            Pick your department and tell us why you&rsquo;re the perfect fit.
          </p>
        </header>

        {/* Form section */}
        <section ref={formSectionRef} className="apply-form-section">
          <div className="apply-form-card">
            <RecruitmentForm />
          </div>
        </section>
      </div>
      <Footer />

      <style jsx global>{`
        .apply-page {
          position: relative;
          background: var(--bg-primary);
          overflow-x: hidden;
          padding-top: 100px;
          min-height: 100vh;
        }

        /* Reuse the same particle background as the contact page */
        .apply-page .particles-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .apply-page .particle-dot {
          position: absolute;
          border-radius: 50%;
          background: var(--accent-1);
          opacity: 0;
        }

        /* ─── Hero ─── */
        .apply-hero {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 60px 6% 20px;
          max-width: 820px;
          margin: 0 auto;
        }

        .apply-eyebrow {
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: var(--accent-1);
          margin-bottom: 16px;
        }

        .apply-heading {
          color: var(--text-primary);
          margin-bottom: 20px;
        }

        .apply-sub {
          font-size: 1.05rem;
          line-height: 1.8;
          color: var(--text-secondary);
          max-width: 520px;
          margin: 0 auto;
        }

        /* ─── Form Card ─── */
        .apply-form-section {
          position: relative;
          z-index: 2;
          max-width: 820px;
          margin: 0 auto;
          padding: 40px 6% 100px;
        }

        .apply-form-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 28px;
          padding: 40px 36px;
          box-shadow: var(--shadow-card);
        }

        /* ─── Responsive ─── */
        @media (max-width: 860px) {
          .apply-hero {
            padding: 40px 5% 10px;
          }
        }

        @media (max-width: 480px) {
          .apply-hero {
            padding: 20px 5% 10px;
          }

          .apply-form-card {
            padding: 24px 18px;
            border-radius: 20px;
          }

          .apply-form-section {
            padding: 24px 4% 60px;
          }
        }
      `}</style>
    </>
  );
}
