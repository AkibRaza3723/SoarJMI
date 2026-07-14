'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import { EVENTS, SoarEvent } from '../data/events';

gsap.registerPlugin(ScrollTrigger);

/* ─── How many cards peek behind the active one ─── */
const BEHIND = 2;
/* ─── px of scroll per card transition ─── */
const SCROLL_PER_CARD = 900;

/* ═══════════════════════════════════════════
   Landscape Event Card
═══════════════════════════════════════════ */
function EventCard({ event, idx }: { event: SoarEvent; idx: number }) {
  const pct = Math.round((event.registered / event.seats) * 100);
  const hot = pct >= 85;

  return (
    <div className="ev-card">
      {/* ── Left visual panel ── */}
      <div className="ev-visual">
        <div className="ev-visual-inner">
          <div className="ev-icon">{event.category === 'Cultural' ? '🎭' : '⚡'}</div>
          <div className="ev-tag-big">{event.tag}</div>
        </div>
        {/* top-left number */}
        <span className="ev-num">{String(idx + 1).padStart(2, '0')}</span>
        {/* bottom badge */}
        <span className={`ev-badge ${event.category.toLowerCase()}`}>{event.category}</span>
      </div>

      {/* ── Right content panel ── */}
      <div className="ev-content">
        <div className="ev-content-top">
          <span className="ev-cat-label">{event.tag}</span>
          <h2 className="ev-title">{event.title}</h2>
        </div>

        <div className="ev-meta">
          <div className="ev-meta-item"><span>📅</span>{event.date}</div>
          <div className="ev-meta-item"><span>🕐</span>{event.time}</div>
          <div className="ev-meta-item"><span>📍</span>{event.location}</div>
        </div>

        <p className="ev-desc">{event.description}</p>

        <div className="ev-footer">
          <div className="ev-seats">
            <div className="ev-seats-top">
              <span className="ev-seats-label">Seats Filled</span>
              <span className={`ev-seats-val ${hot ? 'hot' : ''}`}>
                {event.registered}/{event.seats}{hot ? ' 🔥' : ''}
              </span>
            </div>
            <div className="ev-bar">
              <div className="ev-bar-fill" style={{ width: `${pct}%` }} />
            </div>
          </div>
          <button className="ev-btn">Register Now →</button>
        </div>
      </div>

      <style jsx>{`
        .ev-card {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: row;
          border-radius: 24px;
          overflow: hidden;
          background: var(--bg-card);
          border: 1px solid var(--border);
          box-shadow: 0 20px 60px rgba(0,0,0,0.18);
        }

        /* ── Visual ── */
        .ev-visual {
          position: relative;
          width: 36%;
          flex-shrink: 0;
          background: linear-gradient(145deg, var(--bg-secondary), var(--bg-primary));
          border-right: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .ev-visual::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 60% 40%, var(--glow) 0%, transparent 65%);
        }

        .ev-visual-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          position: relative;
          z-index: 1;
        }

        .ev-icon {
          font-size: clamp(3rem, 6vw, 5rem);
          filter: drop-shadow(0 4px 16px var(--glow));
          animation: float 4s ease-in-out infinite;
        }

        .ev-tag-big {
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--text-muted);
        }

        .ev-num {
          position: absolute;
          top: 18px;
          left: 18px;
          font-size: 2.2rem;
          font-weight: 900;
          color: var(--accent-1);
          opacity: 0.18;
          font-variant-numeric: tabular-nums;
          line-height: 1;
        }

        .ev-badge {
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          padding: 4px 14px;
          border-radius: 50px;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          white-space: nowrap;
        }

        .ev-badge.cultural {
          background: rgba(61, 139, 94, 0.15);
          color: var(--accent-1);
          border: 1px solid rgba(61, 139, 94, 0.3);
        }

        .ev-badge.tech {
          background: rgba(34, 197, 94, 0.12);
          color: var(--accent-2);
          border: 1px solid rgba(34, 197, 94, 0.25);
        }

        /* ── Content ── */
        .ev-content {
          flex: 1;
          padding: clamp(20px, 3vw, 36px);
          display: flex;
          flex-direction: column;
          gap: 14px;
          overflow: hidden;
        }

        .ev-content-top {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .ev-cat-label {
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--accent-1);
        }

        .ev-title {
          font-size: clamp(1rem, 2.2vw, 1.5rem);
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          line-height: 1.2;
        }

        .ev-meta {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .ev-meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          color: var(--text-secondary);
        }

        .ev-desc {
          font-size: 0.87rem;
          line-height: 1.65;
          color: var(--text-muted);
          flex: 1;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }

        /* ── Footer ── */
        .ev-footer {
          display: flex;
          align-items: flex-end;
          gap: 20px;
        }

        .ev-seats {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .ev-seats-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .ev-seats-label {
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .ev-seats-val {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-secondary);
        }

        .ev-seats-val.hot {
          color: #f59e0b;
        }

        .ev-bar {
          height: 5px;
          border-radius: 100px;
          background: var(--bg-secondary);
          overflow: hidden;
        }

        .ev-bar-fill {
          height: 100%;
          border-radius: 100px;
          background: var(--gradient-accent);
          box-shadow: 0 0 8px var(--glow);
        }

        .ev-btn {
          flex-shrink: 0;
          padding: 11px 22px;
          border-radius: 12px;
          border: none;
          background: var(--gradient-accent);
          color: #fff;
          font-size: 0.88rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 4px 16px var(--glow);
          transition: transform 0.2s, box-shadow 0.2s;
          white-space: nowrap;
        }

        .ev-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px var(--glow);
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Events Page
═══════════════════════════════════════════ */
export default function EventsPage() {
  /* The scrollable wrapper — its height = total scroll space */
  const scrollRef = useRef<HTMLDivElement>(null);
  /* Each card slot (absolutely positioned in the stack) */
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const n = EVENTS.length;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length !== n) return;

    /* ── Set initial stack positions ── */
    gsap.set(cards, {
      y: (i: number) => (i <= BEHIND ? i * 22 : 100),
      scale: (i: number) => (i <= BEHIND ? 1 - i * 0.05 : 0.82),
      zIndex: (i: number) => n - i,
      opacity: (i: number) => (i <= BEHIND ? 1 : 0),
      transformOrigin: 'bottom center',
    });

    /* ── Build the transition timeline ── */
    const tl = gsap.timeline();

    for (let i = 0; i < n - 1; i++) {
      const label = `card${i}`;

      /* 1. Active card exits — pushed DOWN behind the stack */
      tl.to(
        cards[i],
        {
          y: 130,
          scale: 0.74,
          opacity: 0,
          zIndex: 0,
          duration: 1,
          ease: 'power2.inOut',
        },
        label
      );

      /* 2. Every visible card behind shifts one position forward */
      for (let j = i + 1; j <= Math.min(i + BEHIND + 1, n - 1); j++) {
        const newPos = j - (i + 1); // 0 = becomes active, 1 = first behind, etc.
        tl.to(
          cards[j],
          {
            y: newPos * 22,
            scale: 1 - newPos * 0.05,
            zIndex: n - newPos,
            opacity: 1,
            duration: 1,
            ease: 'power2.inOut',
          },
          label
        );
      }

      /* 3. Bring the next hidden card into view at the back of the stack */
      const incoming = i + BEHIND + 1;
      if (incoming < n) {
        tl.to(
          cards[incoming],
          {
            y: BEHIND * 22,
            scale: 1 - BEHIND * 0.05,
            zIndex: n - BEHIND,
            opacity: 1,
            duration: 1,
            ease: 'power2.inOut',
          },
          label
        );
      }
    }

    /* ── Attach ScrollTrigger ── */
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: scrollRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.4,
        animation: tl,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />

      {/*
        Tall wrapper = scroll distance for all card transitions.
        The sticky child stays fixed in view while parent height creates scroll space.
      */}
      <div
        ref={scrollRef}
        className="events-scroll-wrapper"
        style={{
          height: `calc(${(EVENTS.length - 1) * SCROLL_PER_CARD}px + 100vh)`,
        }}
      >
        {/* ── Sticky viewport ── */}
        <div className="events-sticky">

          {/* Header */}
          <div className="events-header">
            <p className="events-eyebrow">SoarJMI &middot; 2025</p>
            <h1 className="events-h1">
              Events &amp;&nbsp;
              <span className="accent-gradient">Collaborations</span>
            </h1>
            <p className="events-sub">
              {EVENTS.length} events this season &middot; <em>Scroll to explore the stack</em>
            </p>
          </div>

          {/* Card stack */}
          <div className="stack-scene">
            {EVENTS.map((ev, i) => (
              <div
                key={ev.id}
                ref={(el) => { cardRefs.current[i] = el; }}
                className="card-slot"
              >
                <EventCard event={ev} idx={i} />
              </div>
            ))}
          </div>

          {/* Scroll chevron hint */}
          <div className="scroll-hint">
            <div className="chevron" />
            <span>scroll</span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* ── Page shell ── */
        .events-scroll-wrapper {
          position: relative;
          background: var(--bg-primary);
        }

        .events-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 5% 40px;
          gap: 28px;
          overflow: hidden;
        }

        /* decorative radial behind stack */
        .events-sticky::before {
          content: '';
          position: absolute;
          bottom: -100px;
          left: 50%;
          transform: translateX(-50%);
          width: 70vw;
          height: 300px;
          background: radial-gradient(ellipse at center, var(--glow) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ── Header ── */
        .events-header {
          text-align: center;
          z-index: 10;
        }

        .events-eyebrow {
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: var(--accent-1);
          margin-bottom: 8px;
        }

        .events-h1 {
          font-size: clamp(1.8rem, 5vw, 3rem);
          font-weight: 900;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          line-height: 1.05;
          margin-bottom: 8px;
        }

        .events-sub {
          font-size: 0.88rem;
          color: var(--text-muted);
          font-style: normal;
        }

        .events-sub em {
          font-style: normal;
          color: var(--accent-1);
          font-weight: 600;
        }

        /* ── Stack scene ── */
        .stack-scene {
          position: relative;
          /*
            Landscape card dimensions:
            Width > Height — clearly horizontal rectangle
          */
          width: min(88vw, 920px);
          height: min(46vh, 380px);
          flex-shrink: 0;
        }

        /* Each card fills the scene absolutely */
        .card-slot {
          position: absolute;
          inset: 0;
          will-change: transform, opacity;
        }

        /* ── Scroll hint ── */
        .scroll-hint {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          color: var(--text-muted);
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          z-index: 10;
        }

        .chevron {
          width: 18px;
          height: 18px;
          border-right: 2px solid var(--accent-1);
          border-bottom: 2px solid var(--accent-1);
          transform: rotate(45deg);
          animation: bounce 1.6s ease-in-out infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: rotate(45deg) translateY(0); }
          50% { transform: rotate(45deg) translateY(5px); }
        }
      `}</style>
    </>
  );
}
