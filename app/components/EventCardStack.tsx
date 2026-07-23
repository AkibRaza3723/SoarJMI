'use client';

import { useState, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimation,
  PanInfo,
} from 'framer-motion';
import { SoarEvent } from '../data/events';
import { useTheme } from '../context/ThemeContext';
import Image from 'next/image';

/* ─── Single Draggable Card ─── */
interface CardProps {
  event: SoarEvent;
  stackIndex: number;          // 0 = top (active), 1 = second, 2 = third
  totalVisible: number;
  onDismiss: (direction: 'left' | 'right') => void;
  isTop: boolean;
}

const SWIPE_THRESHOLD = 120;    // px drag needed to dismiss
const ROTATION_FACTOR = 12;     // degrees at max drag

function EventCard({ event, stackIndex, totalVisible, onDismiss, isTop }: CardProps) {
  const { theme } = useTheme();
  const x = useMotionValue(0);
  const controls = useAnimation();

  // Rotate card based on horizontal drag
  const rotate = useTransform(x, [-300, 0, 300], [-ROTATION_FACTOR, 0, ROTATION_FACTOR]);

  // Overlay opacity — green "GOING" on right, red "PASS" on left
  const rightOverlayOpacity = useTransform(x, [0, 80], [0, 1]);
  const leftOverlayOpacity = useTransform(x, [-80, 0], [1, 0]);

  // Stack card transforms — cards behind are smaller and pushed down
  const scaleBack = 1 - stackIndex * 0.05;
  const yBack = stackIndex * 22;


  async function handleDragEnd(_: unknown, info: PanInfo) {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (Math.abs(offset) > SWIPE_THRESHOLD || Math.abs(velocity) > 400) {
      const direction = offset > 0 ? 'right' : 'left';
      await controls.start({
        x: direction === 'right' ? 1200 : -1200,
        opacity: 0,
        transition: { duration: 0.35, ease: 'easeOut' },
      });
      onDismiss(direction);
    } else {
      // Snap back to center with spring
      controls.start({
        x: 0,
        rotate: 0,
        transition: { type: 'spring', stiffness: 260, damping: 22 },
      });
    }
  }

  return (
    <motion.div
      className="event-card-wrapper"
      animate={
        isTop
          ? controls
          : {
              scale: scaleBack,
              y: yBack,
              transition: { type: 'spring', stiffness: 200, damping: 24 },
            }
      }
      style={isTop ? { x, rotate, zIndex: totalVisible - stackIndex } : { zIndex: totalVisible - stackIndex }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={isTop ? handleDragEnd : undefined}
      whileTap={isTop ? { cursor: 'grabbing' } : undefined}
    >
      {/* ── GOING overlay (right swipe) ── */}
      {isTop && (
        <motion.div className="swipe-overlay going-overlay" style={{ opacity: rightOverlayOpacity }}>
          ✓ Going
        </motion.div>
      )}
      {/* ── PASS overlay (left swipe) ── */}
      {isTop && (
        <motion.div className="swipe-overlay pass-overlay" style={{ opacity: leftOverlayOpacity }}>
          ✕ Pass
        </motion.div>
      )}

      {/* ── Card body ── */}
      <div className={`event-card ${theme}`}>

        {/* Image / Placeholder */}
        <div className="card-image-area">
          {event.image ? (
            <Image src={event.image} alt={event.title} fill style={{ objectFit: 'cover' }} />
          ) : (
            <div className="card-placeholder">
              <div className="placeholder-icon">
                {event.category === 'Cultural' ? '🎭' : '🚀'}
              </div>
              <span className="placeholder-label">{event.tag}</span>
            </div>
          )}

          {/* Category badge */}
          <div className={`category-badge ${event.category.toLowerCase()}`}>
            {event.category === 'Cultural' ? '🎭' : '🚀'} {event.category}
          </div>
        </div>

        {/* Card content */}
        <div className="card-body">
          <div className="card-tag">{event.tag}</div>
          <h2 className="card-title">{event.title}</h2>

          {/* Meta row */}
          <div className="card-meta">
            <span className="meta-item">
              <span className="meta-icon">📅</span>
              {event.date}
            </span>
            <span className="meta-item">
              <span className="meta-icon">🕐</span>
              {event.time}
            </span>
            <span className="meta-item">
              <span className="meta-icon">📍</span>
              {event.location}
            </span>
          </div>

          {/* Description */}
          <p className="card-desc">{event.description}</p>
        </div>
      </div>

      <style jsx>{`
        .event-card-wrapper {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          cursor: ${isTop ? 'grab' : 'default'};
          user-select: none;
          -webkit-user-select: none;
        }

        .swipe-overlay {
          position: absolute;
          top: 28px;
          z-index: 10;
          padding: 10px 22px;
          border-radius: 12px;
          font-size: 1.4rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          border: 3px solid;
          pointer-events: none;
        }

        .going-overlay {
          right: 28px;
          color: #22c55e;
          border-color: #22c55e;
          background: rgba(34, 197, 94, 0.1);
        }

        .pass-overlay {
          left: 28px;
          color: #ef4444;
          border-color: #ef4444;
          background: rgba(239, 68, 68, 0.1);
        }

        .event-card {
          width: 100%;
          height: 100%;
          border-radius: 28px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          box-shadow: var(--shadow-card);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        /* ── Image area ── */
        .card-image-area {
          position: relative;
          height: 42%;
          flex-shrink: 0;
          background: var(--bg-secondary);
          overflow: hidden;
        }

        .card-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          background: linear-gradient(135deg, var(--bg-secondary), var(--bg-primary));
        }

        .placeholder-icon {
          font-size: 5rem;
          filter: drop-shadow(0 4px 20px var(--glow));
        }

        .placeholder-label {
          font-size: 0.9rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--text-muted);
        }

        .category-badge {
          position: absolute;
          bottom: 14px;
          left: 20px;
          padding: 5px 14px;
          border-radius: 50px;
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          backdrop-filter: blur(10px);
        }

        .category-badge.cultural {
          background: rgba(61, 139, 94, 0.18);
          color: var(--accent-1);
          border: 1px solid rgba(61, 139, 94, 0.3);
        }

        .category-badge.tech {
          background: rgba(34, 197, 94, 0.15);
          color: var(--accent-2);
          border: 1px solid rgba(34, 197, 94, 0.3);
        }

        /* ── Card body ── */
        .card-body {
          flex: 1;
          padding: 22px 28px 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          overflow-y: auto;
        }

        .card-tag {
          font-size: 0.72rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--accent-1);
        }

        .card-title {
          font-size: clamp(1.1rem, 2.5vw, 1.4rem);
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          line-height: 1.25;
        }

        .card-meta {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.83rem;
          color: var(--text-secondary);
        }

        .meta-icon {
          font-size: 0.95rem;
        }

        .card-desc {
          font-size: 0.88rem;
          line-height: 1.65;
          color: var(--text-muted);
          flex: 1;
        }

        /* ── Seats ── */
        .seat-block {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .seat-label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .seat-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .seat-count {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-secondary);
        }

        .seat-count.almost-full {
          color: #f59e0b;
        }

        .seat-bar {
          height: 6px;
          border-radius: 100px;
          background: var(--bg-secondary);
          overflow: hidden;
        }

        .seat-fill {
          height: 100%;
          border-radius: 100px;
          background: var(--gradient-accent);
        }

        /* ── Register btn ── */
        .register-btn {
          width: 100%;
          padding: 14px;
          border-radius: 14px;
          border: none;
          background: var(--gradient-accent);
          color: #fff;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 20px var(--glow);
          margin-top: auto;
        }

        .register-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px var(--glow);
        }

        .register-btn:active {
          transform: translateY(0);
        }
      `}</style>
    </motion.div>
  );
}

/* ─── Card Stack ─── */
interface EventCardStackProps {
  events: SoarEvent[];
}

const VISIBLE_CARDS = 3;

export default function EventCardStack({ events }: EventCardStackProps) {
  const [cards, setCards] = useState<SoarEvent[]>(events);
  const [dismissed, setDismissed] = useState(0);

  function handleDismiss() {
    setCards((prev) => {
      const next = [...prev];
      next.shift();
      return next;
    });
    setDismissed((d) => d + 1);
  }

  function handleReset() {
    setCards(events);
    setDismissed(0);
  }

  const visible = cards.slice(0, VISIBLE_CARDS);

  if (cards.length === 0) {
    return (
      <div className="stack-empty">
        <div className="empty-icon">🎉</div>
        <h3 className="empty-title">You've seen all events!</h3>
        <p className="empty-sub">Swipe right on any event to register. Want to browse again?</p>
        <button className="empty-btn" onClick={handleReset}>
          ↺ Browse Again
        </button>

        <style jsx>{`
          .stack-empty {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            gap: 16px;
            text-align: center;
            padding: 40px;
          }
          .empty-icon { font-size: 5rem; }
          .empty-title {
            font-size: 1.6rem;
            font-weight: 800;
            color: var(--text-primary);
          }
          .empty-sub {
            font-size: 0.95rem;
            color: var(--text-muted);
            max-width: 320px;
            line-height: 1.6;
          }
          .empty-btn {
            margin-top: 8px;
            padding: 14px 32px;
            border-radius: 14px;
            border: none;
            background: var(--gradient-accent);
            color: #fff;
            font-size: 1rem;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 4px 20px var(--glow);
            transition: transform 0.2s;
          }
          .empty-btn:hover { transform: translateY(-2px); }
        `}</style>
      </div>
    );
  }

  return (
    <>
      {/* Progress indicator */}
      <div className="stack-progress">
        {events.map((_, i) => (
          <div
            key={i}
            className={`progress-dot ${i < dismissed ? 'done' : i === dismissed ? 'active' : ''}`}
          />
        ))}
      </div>

      {/* Stack hint */}
      <p className="swipe-hint">
        ← Swipe or drag left to pass · right to go →
      </p>

      {/* Card stack */}
      <div className="stack-container">
        {/* Render from back to front so top card is on top */}
        {[...visible].reverse().map((event, reversedIdx) => {
          const stackIndex = visible.length - 1 - reversedIdx;
          const isTop = stackIndex === 0;
          return (
            <EventCard
              key={event.id}
              event={event}
              stackIndex={stackIndex}
              totalVisible={visible.length}
              isTop={isTop}
              onDismiss={handleDismiss}
            />
          );
        })}
      </div>

      <style jsx>{`
        .stack-progress {
          display: flex;
          gap: 8px;
          justify-content: center;
          margin-bottom: 12px;
        }

        .progress-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--border);
          transition: all 0.3s ease;
        }

        .progress-dot.done {
          background: var(--text-muted);
        }

        .progress-dot.active {
          background: var(--accent-1);
          width: 24px;
          border-radius: 4px;
          box-shadow: 0 0 8px var(--glow);
        }

        .swipe-hint {
          text-align: center;
          font-size: 0.78rem;
          color: var(--text-muted);
          font-weight: 500;
          letter-spacing: 0.04em;
          margin-bottom: 16px;
        }

        .stack-container {
          position: relative;
          /* Card dimensions — one card fills the space */
          width: min(460px, 92vw);
          height: min(680px, 78vh);
          margin: 0 auto;
        }
      `}</style>
    </>
  );
}
