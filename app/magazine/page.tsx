'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─── Single magazine ─── */
const MAGAZINE = {
  title: 'Soar Chronicle',
  edition: 'Vol. I',
  year: '2025–26',
  tag: 'Annual',
  coverColor: 'linear-gradient(145deg, #4A2C0A 0%, #A0522D 55%, #F5C59A 100%)',
  coverImage: undefined as string | undefined,   // swap in a real URL when ready
  pdfUrl: '#',
  downloadUrl: '#',
  pages: '64',
  language: 'English / Urdu',
  publishedBy: 'SoarJMI Publications',
  description:
    'Soar Chronicle is the official annual magazine of SoarJMI — Jamia Millia Islamia\'s premier cultural and tech society. Vol. I marks our first print, a milestone document woven from student voices, creative writing, photo essays, event retrospectives, and technology spotlights.',
  highlights: [
    'Founder\'s note & society origin story',
    'Photo essay: SoarFest 2025 in frames',
    'Student poetry, prose & artwork showcase',
    'Tech spotlight: projects built by our members',
    'Interviews with faculty mentors',
    'Behind-the-scenes of our flagship events',
  ],
};

export default function MagazinePage() {
  /* Feature-section refs */
  const infoRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  /* Feature section scroll animation */
  useEffect(() => {
    if (!infoRef.current || !cardRef.current) return;

    gsap.fromTo(
      infoRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: infoRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
    );
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, x: 50, scale: 0.95 },
      { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: 'power3.out', delay: 0.1,
        scrollTrigger: { trigger: cardRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } }
    );
  }, []);

  /* 3-D tilt on card hover */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 12;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -12;
    gsap.to(el, { rotateX: y, rotateY: x, duration: 0.3, ease: 'power2.out', transformPerspective: 900 });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power3.out' });
  };

  return (
    <main>
      <Navbar />


      {/* ── Featured Magazine — split layout ── */}
      <section className="mag-feature-section">
        <div className="mag-feature-inner">

          {/* Left — Info panel */}
          <div ref={infoRef} className="mag-info">
            {/* Label */}
            <p className="mag-info-eyebrow">
              <span className="eyebrow-dot" />
              Latest Issue
            </p>

            <h2 className="mag-info-title">{MAGAZINE.title}</h2>
            <p className="mag-info-edition">{MAGAZINE.edition} · {MAGAZINE.year}</p>

            <p className="mag-info-desc">{MAGAZINE.description}</p>

            {/* Metadata grid */}
            <div className="mag-meta-grid">
              {[
                { label: 'Edition',      value: MAGAZINE.edition },
                { label: 'Session',      value: MAGAZINE.year },
                { label: 'Pages',        value: MAGAZINE.pages },
                { label: 'Language',     value: MAGAZINE.language },
                { label: 'Published By', value: MAGAZINE.publishedBy },
                { label: 'Type',         value: MAGAZINE.tag },
              ].map(({ label, value }) => (
                <div key={label} className="meta-item">
                  <span className="meta-label">{label}</span>
                  <span className="meta-value">{value}</span>
                </div>
              ))}
            </div>

            {/* Highlights */}
            <div className="mag-highlights">
              <p className="highlights-heading">What's Inside</p>
              <ul className="highlights-list">
                {MAGAZINE.highlights.map((h) => (
                  <li key={h} className="highlight-item">
                    <span className="highlight-chevron">›</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTAs */}
            <div className="mag-ctas">
              <a href={MAGAZINE.pdfUrl} target="_blank" rel="noopener noreferrer" className="btn-view">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                </svg>
                Read Online
              </a>
              <a href={MAGAZINE.downloadUrl} download className="btn-download">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download PDF
              </a>
            </div>
          </div>

          {/* Right — Magazine card */}
          <div
            ref={cardRef}
            className="mag-card-wrap"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Tag chip */}
            <span className="card-tag">{MAGAZINE.tag}</span>

            {/* Cover */}
            <div
              className="mag-cover"
              style={{ background: MAGAZINE.coverImage ? undefined : MAGAZINE.coverColor }}
            >
              {MAGAZINE.coverImage ? (
                <img src={MAGAZINE.coverImage} alt={`${MAGAZINE.title} cover`} className="cover-img" />
              ) : (
                <>
                  {/* Decorative editorial SVG overlay */}
                  <svg className="cover-deco" viewBox="0 0 260 380" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    {/* Abstract bird wings */}
                    <ellipse cx="130" cy="120" rx="75" ry="24" fill="rgba(255,255,255,0.06)" />
                    <ellipse cx="130" cy="148" rx="50" ry="16" fill="rgba(255,255,255,0.08)" />
                    <path d="M75 148 Q130 92 185 148 Q130 126 75 148Z" fill="rgba(255,255,255,0.14)" />
                    {/* Grid lines */}
                    <line x1="30" y1="240" x2="230" y2="240" stroke="rgba(255,255,255,0.20)" strokeWidth="0.8" />
                    <line x1="30" y1="255" x2="170" y2="255" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
                    <line x1="30" y1="268" x2="130" y2="268" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
                    {/* Circles */}
                    <circle cx="210" cy="62"  r="36" stroke="rgba(255,255,255,0.10)" strokeWidth="1" fill="none" />
                    <circle cx="210" cy="62"  r="24" stroke="rgba(255,255,255,0.07)" strokeWidth="1" fill="none" />
                    <circle cx="210" cy="62"  r="6"  fill="rgba(255,255,255,0.10)" />
                    {/* Bottom bar */}
                    <rect x="0" y="340" width="260" height="40" fill="rgba(0,0,0,0.30)" />
                  </svg>

                  {/* Soar wordmark on cover */}
                  <div className="cover-wordmark">
                    <p className="wordmark-soar">SOAR</p>
                    <p className="wordmark-sub">JMI</p>
                  </div>

                  {/* Cover bottom text */}
                  <div className="cover-bottom">
                    <p className="cover-title-text">{MAGAZINE.title}</p>
                    <p className="cover-edition-text">{MAGAZINE.edition} · {MAGAZINE.year}</p>
                  </div>
                </>
              )}
            </div>

            {/* Shadow under card */}
            <div className="card-shadow" />
          </div>

        </div>
      </section>

      <Footer />

      <style jsx global>{`
        /* ────────────────────────────
           HERO
        ──────────────────────────── */
        .mag-hero {
          position: relative;
          padding: 160px 6% 90px;
          background: var(--surface);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mag-hero::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: var(--gradient-accent);
          opacity: 0.3;
        }

        .hero-book-svg {
          position: absolute;
          right: 4%;
          bottom: 0;
          width: clamp(180px, 26vw, 340px);
          opacity: 0.38;
          pointer-events: none;
        }

        .mag-hero-inner {
          position: relative;
          z-index: 2;
          max-width: 660px;
          text-align: center;
          margin: 0 auto;
        }

        .mag-hero-eyebrow {
          font-family: var(--font-mono);
          font-size: var(--fs-label-caps);
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent-1);
          margin-bottom: 18px;
          opacity: 0;
        }

        .mag-hero-title {
          font-family: var(--font-display);
          font-size: clamp(3rem, 6.5vw, 5rem);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: var(--on-surface);
          margin-bottom: 22px;
          opacity: 0;
        }

        .mag-hero-subtitle {
          font-family: var(--font-body);
          font-size: var(--fs-body-lg);
          line-height: 1.75;
          color: var(--on-surface-variant);
          max-width: 540px;
          margin: 0 auto 36px;
          opacity: 0;
        }

        .mag-hero-rule {
          width: 56px;
          height: 3px;
          background: var(--gradient-accent);
          border-radius: var(--radius-full);
          margin: 0 auto;
          transform-origin: center;
          opacity: 0;
        }

        /* Particles */
        .mag-particles { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
        .mag-particle {
          position: absolute;
          border-radius: 50%;
          background: var(--accent-1);
          opacity: 0;
          animation: mag-float linear infinite;
        }
        @keyframes mag-float {
          0%   { transform: translateY(60px) translateX(0) scale(0); opacity: 0; }
          10%  { opacity: 0.15; }
          85%  { opacity: 0.08; }
          100% { transform: translateY(-80px) translateX(var(--drift, 20px)) scale(1); opacity: 0; }
        }

        /* ────────────────────────────
           FEATURE SECTION
        ──────────────────────────── */
        .mag-feature-section {
          padding: 120px 6% 110px;
          background: var(--bg-secondary);
        }

        .mag-feature-inner {
          max-width: 1160px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 72px;
          align-items: start;
        }

        /* ── Info panel ── */
        .mag-info { display: flex; flex-direction: column; gap: 28px; }

        .mag-info-eyebrow {
          font-family: var(--font-mono);
          font-size: var(--fs-label-caps);
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .eyebrow-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--gradient-accent);
          flex-shrink: 0;
        }

        .mag-info-title {
          font-family: var(--font-display);
          font-size: clamp(2.2rem, 4vw, 3.2rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: var(--on-surface);
          margin: 0;
        }

        .mag-info-edition {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--accent-1);
          margin-top: -16px;
        }

        .mag-info-desc {
          font-family: var(--font-body);
          font-size: var(--fs-body-lg);
          line-height: 1.78;
          color: var(--on-surface-variant);
          border-left: 3px solid var(--outline-variant);
          padding-left: 20px;
        }

        /* Metadata grid */
        .mag-meta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }

        .meta-item {
          padding: 14px 18px;
          border-bottom: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          gap: 3px;
          background: var(--bg-card);
        }

        .meta-item:nth-child(odd) { border-right: 1px solid var(--border); }
        .meta-item:nth-last-child(-n+2) { border-bottom: none; }

        .meta-label {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .meta-value {
          font-family: var(--font-body);
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        /* Highlights */
        .mag-highlights { display: flex; flex-direction: column; gap: 12px; }

        .highlights-heading {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 700;
          color: var(--on-surface);
          letter-spacing: -0.01em;
        }

        .highlights-list {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .highlight-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 10px 0;
          border-bottom: 1px solid var(--border);
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: var(--on-surface-variant);
          line-height: 1.5;
        }

        .highlight-item:last-child { border-bottom: none; }

        .highlight-chevron {
          color: var(--accent-1);
          font-size: 1.1em;
          line-height: 1.4;
          flex-shrink: 0;
        }

        /* CTAs */
        .mag-ctas { display: flex; gap: 12px; flex-wrap: wrap; }

        .btn-view, .btn-download {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 26px;
          border-radius: var(--radius-full);
          font-family: var(--font-display);
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.22s ease;
          text-decoration: none;
        }

        .btn-view {
          background: var(--primary);
          color: var(--on-primary);
          border: none;
        }

        .btn-view:hover { opacity: 0.85; }

        .btn-download {
          background: transparent;
          color: var(--secondary);
          border: 1.5px solid var(--secondary);
        }

        .btn-download:hover {
          background: var(--secondary);
          color: var(--on-secondary);
        }

        /* ── Magazine card ── */
        .mag-card-wrap {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          will-change: transform;
          transform-style: preserve-3d;
        }

        .card-tag {
          align-self: flex-end;
          margin-bottom: 10px;
          padding: 4px 12px;
          border-radius: 4px;
          font-family: var(--font-mono);
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: var(--secondary);
          color: var(--on-secondary);
        }

        .mag-cover {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid var(--border);
          box-shadow: 0 24px 60px rgba(0,0,0,0.18);
          transition: box-shadow 0.35s ease;
        }

        .mag-card-wrap:hover .mag-cover {
          box-shadow: 0 32px 80px var(--glow), 0 0 0 1px var(--accent-1);
        }

        .cover-img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
        }

        .cover-deco {
          position: absolute;
          inset: 0; width: 100%; height: 100%;
        }

        .cover-wordmark {
          position: absolute;
          top: 28px;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          z-index: 2;
        }

        .wordmark-soar {
          font-family: var(--font-display);
          font-size: 2rem;
          font-weight: 900;
          letter-spacing: 0.18em;
          color: rgba(255,255,255,0.88);
          line-height: 1;
          text-shadow: 0 2px 16px rgba(0,0,0,0.5);
        }

        .wordmark-sub {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.3em;
          color: rgba(255,255,255,0.55);
          text-align: center;
          margin-top: 4px;
        }

        .cover-bottom {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 14px 16px;
          background: rgba(0,0,0,0.30);
          backdrop-filter: blur(6px);
          z-index: 3;
        }

        .cover-title-text {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 800;
          color: rgba(255,255,255,0.92);
          letter-spacing: -0.01em;
        }

        .cover-edition-text {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          margin-top: 3px;
        }

        .card-shadow {
          width: 70%;
          height: 20px;
          background: var(--glow);
          border-radius: 50%;
          filter: blur(16px);
          margin-top: -6px;
          opacity: 0.6;
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .mag-feature-inner {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .mag-card-wrap {
            width: 100%;
            max-width: 100%;
            margin: 0 auto;
          }
        }

        @media (max-width: 600px) {
          .mag-feature-section { padding: 80px 5% 80px; }
          .mag-meta-grid { grid-template-columns: 1fr; }
          .meta-item { border-right: none !important; }
          .meta-item:nth-last-child(-n+2) { border-bottom: 1px solid var(--border); }
          .meta-item:last-child { border-bottom: none; }
        }
      `}</style>
    </main>
  );
}
