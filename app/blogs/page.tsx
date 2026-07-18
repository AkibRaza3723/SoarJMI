'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/Navbar';

/* ────────────────────────────────────────────
   Floating Particle System
   ──────────────────────────────────────────── */
function FloatingParticles() {
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        duration: Math.random() * 8 + 6,
        delay: Math.random() * 5,
        drift: (Math.random() - 0.5) * 60,
      }))
    );
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="nf-particles" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="nf-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            ['--drift' as string]: `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────
   Animated Broken Circuit SVG (Tech side)
   ──────────────────────────────────────────── */
function BrokenCircuitSVG() {
  return (
    <svg
      className="nf-circuit-svg"
      viewBox="0 0 600 400"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <filter id="nf-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="nf-circuit-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--accent-1)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--accent-2)" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* Circuit paths — broken */}
      <g stroke="url(#nf-circuit-grad)" strokeWidth="1.5" fill="none" opacity="0.4">
        <path d="M50,200 L120,200 L120,100 L200,100" className="nf-circuit-path" />
        <path d="M50,250 L150,250 L150,300 L230,300" className="nf-circuit-path" style={{ animationDelay: '0.5s' }} />
        <path d="M400,100 L480,100 L480,200 L550,200" className="nf-circuit-path" style={{ animationDelay: '1s' }} />
        <path d="M370,300 L450,300 L450,250 L550,250" className="nf-circuit-path" style={{ animationDelay: '1.5s' }} />
      </g>

      {/* Broken gap — spark area */}
      <g className="nf-spark-group">
        {/* Left broken end */}
        <path d="M200,100 L240,100" stroke="var(--accent-1)" strokeWidth="2" strokeLinecap="round" opacity="0.7">
          <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2s" repeatCount="indefinite" />
        </path>
        {/* Right broken end */}
        <path d="M320,100 L370,100" stroke="var(--accent-1)" strokeWidth="2" strokeLinecap="round" opacity="0.7">
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite" />
        </path>
        {/* Sparks between broken ends */}
        <line x1="248" y1="96" x2="312" y2="104" stroke="var(--accent-1)" strokeWidth="1" opacity="0">
          <animate attributeName="opacity" values="0;0.9;0" dur="0.8s" repeatCount="indefinite" begin="0.2s" />
        </line>
        <line x1="255" y1="102" x2="305" y2="98" stroke="var(--accent-2)" strokeWidth="1" opacity="0">
          <animate attributeName="opacity" values="0;0.7;0" dur="1.1s" repeatCount="indefinite" begin="0.6s" />
        </line>
        <line x1="260" y1="94" x2="300" y2="106" stroke="var(--accent-1)" strokeWidth="0.8" opacity="0">
          <animate attributeName="opacity" values="0;1;0" dur="0.6s" repeatCount="indefinite" begin="1.0s" />
        </line>
      </g>

      {/* Circuit nodes */}
      {[
        { cx: 120, cy: 200 }, { cx: 120, cy: 100 }, { cx: 150, cy: 250 },
        { cx: 150, cy: 300 }, { cx: 480, cy: 100 }, { cx: 480, cy: 200 },
        { cx: 450, cy: 300 }, { cx: 450, cy: 250 },
      ].map((node, i) => (
        <g key={i}>
          <circle cx={node.cx} cy={node.cy} r="4" fill="var(--bg-card)" stroke="var(--accent-1)" strokeWidth="1.5" opacity="0.5">
            <animate attributeName="opacity" values="0.3;0.7;0.3" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
          </circle>
          <circle cx={node.cx} cy={node.cy} r="2" fill="var(--accent-1)" opacity="0.6">
            <animate attributeName="r" values="1.5;3;1.5" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}

      {/* Floating binary text */}
      <text x="80" y="170" fontSize="8" fill="var(--accent-1)" opacity="0.12" fontFamily="monospace">
        01001110 01001111 01010100
        <animate attributeName="opacity" values="0.08;0.18;0.08" dur="4s" repeatCount="indefinite" />
      </text>
      <text x="380" y="350" fontSize="8" fill="var(--accent-1)" opacity="0.1" fontFamily="monospace">
        01000110 01001111 01010101
        <animate attributeName="opacity" values="0.06;0.15;0.06" dur="5s" repeatCount="indefinite" />
      </text>
    </svg>
  );
}

/* ────────────────────────────────────────────
   Animated Stage / Spotlight SVG (Cultural side)
   ──────────────────────────────────────────── */
function EmptyStageSVG() {
  return (
    <svg
      className="nf-stage-svg"
      viewBox="0 0 600 400"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="nf-spotlight" cx="50%" cy="0%" r="70%">
          <stop offset="0%" stopColor="var(--accent-1)" stopOpacity="0.2" />
          <stop offset="60%" stopColor="var(--accent-1)" stopOpacity="0.04" />
          <stop offset="100%" stopColor="var(--accent-1)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="nf-curtain-l" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--accent-1)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="var(--accent-1)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="nf-curtain-r" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="var(--accent-1)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="var(--accent-1)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Spotlight cone */}
      <path d="M300,0 L180,380 L420,380 Z" fill="url(#nf-spotlight)">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
      </path>

      {/* Stage floor */}
      <ellipse cx="300" cy="360" rx="200" ry="25" fill="var(--accent-1)" opacity="0.08" />
      <line x1="100" y1="355" x2="500" y2="355" stroke="var(--accent-1)" strokeWidth="2" opacity="0.15" />

      {/* Curtains */}
      <rect x="0" y="0" width="80" height="400" fill="url(#nf-curtain-l)">
        <animate attributeName="width" values="80;90;80" dur="6s" repeatCount="indefinite" />
      </rect>
      <rect x="520" y="0" width="80" height="400" fill="url(#nf-curtain-r)">
        <animate attributeName="x" values="520;510;520" dur="6s" repeatCount="indefinite" />
        <animate attributeName="width" values="80;90;80" dur="6s" repeatCount="indefinite" />
      </rect>

      {/* Curtain folds */}
      {[15, 35, 55].map((x, i) => (
        <line key={`cl-${i}`} x1={x} y1="0" x2={x} y2="400" stroke="var(--accent-1)" strokeWidth="0.5" opacity="0.06">
          <animate attributeName="opacity" values="0.04;0.1;0.04" dur={`${4 + i}s`} repeatCount="indefinite" />
        </line>
      ))}
      {[545, 565, 585].map((x, i) => (
        <line key={`cr-${i}`} x1={x} y1="0" x2={x} y2="400" stroke="var(--accent-1)" strokeWidth="0.5" opacity="0.06">
          <animate attributeName="opacity" values="0.04;0.1;0.04" dur={`${4 + i}s`} repeatCount="indefinite" />
        </line>
      ))}

      {/* Floating music notes */}
      {['♪', '♫', '♩', '♬'].map((note, i) => (
        <text
          key={i}
          x={150 + i * 100}
          y={120 + (i % 2) * 60}
          fontSize={14 + i * 2}
          fill="var(--accent-1)"
          opacity="0"
          className="nf-floating-note"
          style={{ animationDelay: `${i * 1.5}s` }}
        >
          {note}
        </text>
      ))}

      {/* Mic stand (fallen/tilted) */}
      <g transform="translate(285, 280) rotate(15)" opacity="0.25">
        <line x1="0" y1="0" x2="0" y2="-60" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="0" cy="-65" r="6" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" />
        <circle cx="0" cy="-65" r="3" fill="var(--text-muted)" opacity="0.4" />
        <line x1="-10" y1="0" x2="10" y2="0" stroke="var(--text-muted)" strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* Empty chair */}
      <g transform="translate(380, 310)" opacity="0.15">
        <rect x="0" y="0" width="30" height="3" rx="1" fill="var(--text-muted)" />
        <rect x="-2" y="-25" width="3" height="25" rx="1" fill="var(--text-muted)" />
        <rect x="29" y="-25" width="3" height="25" rx="1" fill="var(--text-muted)" />
        <rect x="2" y="3" width="3" height="18" rx="1" fill="var(--text-muted)" />
        <rect x="25" y="3" width="3" height="18" rx="1" fill="var(--text-muted)" />
      </g>
    </svg>
  );
}

/* ────────────────────────────────────────────
   Animated Glitch Text
   ──────────────────────────────────────────── */
function GlitchSoon() {
  return (
    <div className="nf-glitch-wrap" aria-hidden="true">
      <span className="nf-glitch" data-text="SOON">SOON</span>
    </div>
  );
}

/* ════════════════════════════════════════════
   BLOGS COMING SOON PAGE
   ════════════════════════════════════════════ */
export default function Blogs() {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  // Parallax spotlight follows mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };
    const el = containerRef.current;
    el?.addEventListener('mousemove', handleMouseMove);
    return () => el?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const isTech = theme === 'tech';

  return (
    <>
      <Navbar />

      <div ref={containerRef} className="nf-page" id="blogs-soon-page">
        {/* Ambient glow that follows mouse */}
        <div
          className="nf-mouse-glow"
          aria-hidden="true"
          style={{
            left: `${mousePos.x * 100}%`,
            top: `${mousePos.y * 100}%`,
          }}
        />

        {/* Particles */}
        <FloatingParticles />

        {/* Background SVG — switches with theme */}
        <div className="nf-bg-illustration">
          {isTech ? <BrokenCircuitSVG /> : <EmptyStageSVG />}
        </div>

        {/* Main content */}
        <div className="nf-content">
          {/* Glitch Text */}
          <GlitchSoon />

          {/* Eyebrow */}
          <p className="nf-eyebrow">
            {isTech ? '// STATUS: COMING_SOON' : '— The curtain is still rising —'}
          </p>

          {/* Title */}
          <h1 className="nf-title">
            Coming <span className="accent-gradient">Soon</span>
          </h1>

          {/* Description */}
          <p className="nf-desc">
            {isTech
              ? 'Our tech writers are compiling some amazing content. Check back later!'
              : 'Our creative minds are drafting some amazing stories. Check back later!'}
          </p>

          {/* CTA buttons */}
          <div className="nf-actions">
            <Link href="/" className="nf-btn-primary" id="blogs-home">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Back to Home
            </Link>
            <Link href="/events" className="nf-btn-secondary" id="blogs-events">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Explore Events
            </Link>
          </div>

          {/* Fun ASCII / Mono detail */}
          <div className="nf-terminal">
            <div className="nf-terminal-bar">
              <span className="nf-terminal-dot" />
              <span className="nf-terminal-dot" />
              <span className="nf-terminal-dot" />
              <span className="nf-terminal-title">
                {isTech ? 'soarjmi@terminal' : 'backstage@soarjmi'}
              </span>
            </div>
            <div className="nf-terminal-body">
              <p className="nf-terminal-line">
                <span className="nf-prompt">$</span>
                <span className="nf-typing">
                  {isTech
                    ? 'fetch("/blogs") → 202 Accepted (Coming Soon)'
                    : 'looking for "blogs" → still in rehearsals'}
                </span>
              </p>
              <p className="nf-terminal-line nf-terminal-hint">
                <span className="nf-prompt">→</span>
                <span>Stay tuned for updates ↑</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* ═══ Page ═══ */
        .nf-page {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-primary);
          overflow: hidden;
          padding: 120px 24px 60px;
        }

        /* ═══ Mouse-follow glow ═══ */
        .nf-mouse-glow {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--glow) 0%, transparent 70%);
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 0;
          transition: left 0.3s ease-out, top 0.3s ease-out;
          opacity: 0.7;
        }

        /* ═══ Particles ═══ */
        .nf-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          overflow: hidden;
        }

        .nf-particle {
          position: absolute;
          border-radius: 50%;
          background: var(--accent-1);
          opacity: 0;
          animation: nf-float-particle linear infinite;
        }

        @keyframes nf-float-particle {
          0% {
            opacity: 0;
            transform: translateY(0) translateX(0) scale(0.5);
          }
          15% {
            opacity: 0.5;
          }
          85% {
            opacity: 0.3;
          }
          100% {
            opacity: 0;
            transform: translateY(-100vh) translateX(var(--drift)) scale(1);
          }
        }

        /* ═══ Background Illustration ═══ */
        .nf-bg-illustration {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          z-index: 1;
        }

        .nf-circuit-svg,
        .nf-stage-svg {
          width: 90%;
          max-width: 900px;
          height: auto;
          opacity: 0.5;
        }

        /* Circuit path draw animation */
        .nf-circuit-path {
          stroke-dasharray: 400;
          stroke-dashoffset: 400;
          animation: nf-draw-circuit 3s ease-out forwards;
        }

        @keyframes nf-draw-circuit {
          to { stroke-dashoffset: 0; }
        }

        /* Floating music notes */
        .nf-floating-note {
          animation: nf-note-float 5s ease-in-out infinite;
        }

        @keyframes nf-note-float {
          0%, 100% { opacity: 0; transform: translateY(0); }
          20% { opacity: 0.35; }
          80% { opacity: 0.15; }
          50% { transform: translateY(-40px); opacity: 0.3; }
        }

        /* ═══ Content ═══ */
        .nf-content {
          position: relative;
          z-index: 10;
          text-align: center;
          max-width: 680px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          animation: nf-content-in 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes nf-content-in {
          from {
            opacity: 0;
            transform: translateY(40px);
            filter: blur(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        /* ═══ Glitch Text ═══ */
        .nf-glitch-wrap {
          position: relative;
          display: inline-block;
        }

        .nf-glitch {
          font-family: var(--font-display);
          font-size: clamp(4rem, 15vw, 10rem);
          font-weight: 900;
          letter-spacing: -0.04em;
          color: var(--text-primary);
          opacity: 0.12;
          position: relative;
          display: inline-block;
          line-height: 1;
          user-select: none;
          animation: nf-glitch-anim 4s ease-in-out infinite;
        }

        .nf-glitch::before,
        .nf-glitch::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          opacity: 0.7;
        }

        .nf-glitch::before {
          color: var(--accent-1);
          animation: nf-glitch-skew 3s ease-in-out infinite;
          clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
        }

        .nf-glitch::after {
          color: var(--accent-2);
          animation: nf-glitch-skew 3s ease-in-out infinite reverse;
          clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
        }

        @keyframes nf-glitch-anim {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.01); }
        }

        @keyframes nf-glitch-skew {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-3px, 1px); }
          40% { transform: translate(3px, -1px); }
          60% { transform: translate(-2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }

        /* ═══ Eyebrow ═══ */
        .nf-eyebrow {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--accent-1);
          animation: nf-fade-in 1s 0.3s both;
        }

        @keyframes nf-fade-in {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ═══ Title ═══ */
        .nf-title {
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 5vw, 3.2rem);
          font-weight: 900;
          color: var(--text-primary);
          letter-spacing: -0.03em;
          line-height: 1.1;
          animation: nf-fade-in 1s 0.45s both;
        }

        /* ═══ Description ═══ */
        .nf-desc {
          font-size: 1rem;
          line-height: 1.7;
          color: var(--text-muted);
          max-width: 520px;
          animation: nf-fade-in 1s 0.6s both;
        }

        /* ═══ CTA Buttons ═══ */
        .nf-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
          margin-top: 8px;
          animation: nf-fade-in 1s 0.75s both;
        }

        .nf-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          border-radius: 100px;
          background: var(--gradient-accent);
          color: #fff;
          font-family: var(--font-display);
          font-size: 0.9rem;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 8px 28px var(--glow);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .nf-btn-primary:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 14px 44px var(--glow);
        }

        .nf-btn-primary:active {
          transform: translateY(0) scale(0.98);
        }

        .nf-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 24px;
          border-radius: 100px;
          background: transparent;
          color: var(--accent-1);
          font-family: var(--font-display);
          font-size: 0.85rem;
          font-weight: 600;
          text-decoration: none;
          border: 1px solid var(--border);
          backdrop-filter: blur(8px);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .nf-btn-secondary:hover {
          background: var(--accent-1);
          color: var(--bg-primary);
          border-color: var(--accent-1);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px var(--glow);
        }

        .nf-btn-secondary:active {
          transform: translateY(0) scale(0.97);
        }

        /* ═══ Terminal ═══ */
        .nf-terminal {
          width: 100%;
          max-width: 520px;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid var(--border);
          background: var(--bg-card);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
          animation: nf-fade-in 1s 0.9s both;
          margin-top: 8px;
        }

        .nf-terminal-bar {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 14px;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border);
        }

        .nf-terminal-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--text-muted);
          opacity: 0.3;
        }

        .nf-terminal-dot:first-child { background: #ef4444; opacity: 0.7; }
        .nf-terminal-dot:nth-child(2) { background: #f59e0b; opacity: 0.7; }
        .nf-terminal-dot:nth-child(3) { background: #22c55e; opacity: 0.7; }

        .nf-terminal-title {
          margin-left: auto;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--text-muted);
          letter-spacing: 0.06em;
        }

        .nf-terminal-body {
          padding: 16px 18px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .nf-terminal-line {
          display: flex;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .nf-prompt {
          color: var(--accent-1);
          font-weight: 700;
          flex-shrink: 0;
        }

        .nf-typing {
          overflow: hidden;
          border-right: 2px solid var(--accent-1);
          white-space: nowrap;
          animation:
            nf-typewriter 2.5s steps(50) 1.2s forwards,
            nf-blink-caret 0.75s step-end infinite;
          width: 0;
        }

        @keyframes nf-typewriter {
          from { width: 0; }
          to { width: 100%; }
        }

        @keyframes nf-blink-caret {
          0%, 100% { border-color: var(--accent-1); }
          50% { border-color: transparent; }
        }

        .nf-terminal-hint {
          opacity: 0;
          animation: nf-fade-in 0.6s 4s forwards;
        }

        /* ═══ Mobile ═══ */
        @media (max-width: 600px) {
          .nf-page {
            padding: 100px 16px 40px;
          }

          .nf-glitch {
            font-size: clamp(4rem, 15vw, 8rem);
          }

          .nf-actions {
            flex-direction: column;
            width: 100%;
          }

          .nf-btn-primary,
          .nf-btn-secondary {
            width: 100%;
            justify-content: center;
          }

          .nf-typing {
            white-space: normal;
            border-right: none;
            width: auto;
            animation: nf-fade-in 1s 1.5s both;
          }

          .nf-circuit-svg,
          .nf-stage-svg {
            width: 140%;
            opacity: 0.3;
          }
        }
      `}</style>
    </>
  );
}
