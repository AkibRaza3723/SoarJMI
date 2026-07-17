'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { SoarEvent } from '../data/events';

/* ─── Illustration mapping (reuse from parent) ─── */
interface EventPopupModalProps {
  event: SoarEvent | null;
  isOpen: boolean;
  onClose: () => void;
  IllustrationComponent: (() => React.JSX.Element) | null;
}

export default function EventPopupModal({
  event,
  isOpen,
  onClose,
  IllustrationComponent,
}: EventPopupModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');
  const [isClosing, setIsClosing] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState<boolean[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isAutoplay, setIsAutoplay] = useState(true);

  // Reset on new event
  useEffect(() => {
    if (event && isOpen) {
      setCurrentSlide(0);
      setIsClosing(false);
      setIsAutoplay(true);
      setIsImageLoaded(new Array(event.gallery.length).fill(false));
    }
  }, [event, isOpen]);

  // Autoplay
  useEffect(() => {
    if (!isOpen || !event || !isAutoplay) return;
    autoplayRef.current = setInterval(() => {
      goToSlide((prev: number) => (prev + 1) % event.gallery.length, 'next');
    }, 4000);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isOpen, event, isAutoplay, currentSlide]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen || !event) return;
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') {
        goToSlide(() => (currentSlide + 1) % event.gallery.length, 'next');
        setIsAutoplay(false);
      }
      if (e.key === 'ArrowLeft') {
        goToSlide(() => (currentSlide - 1 + event.gallery.length) % event.gallery.length, 'prev');
        setIsAutoplay(false);
      }
    },
    [isOpen, event, currentSlide]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const goToSlide = (
    getNext: (prev: number) => number,
    direction: 'next' | 'prev'
  ) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSlideDirection(direction);
    setCurrentSlide((prev) => getNext(prev));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 400);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) handleClose();
  };

  const handleImageLoad = (index: number) => {
    setIsImageLoaded((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

  if (!isOpen || !event) return null;

  return (
    <>
      <div
        ref={modalRef}
        className={`epm-overlay ${isClosing ? 'epm-overlay--closing' : ''}`}
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-label={`Event details: ${event.title}`}
      >
        <div className={`epm-modal ${isClosing ? 'epm-modal--closing' : ''}`}>
          {/* Close button */}
          <button
            className="epm-close"
            onClick={handleClose}
            aria-label="Close dialog"
            id={`close-event-popup-${event.id}`}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <line x1="16" y1="4" x2="4" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          {/* ── Top section: Event image + Info ── */}
          <div className="epm-header">
            {/* Event illustration at corner */}
            <div className="epm-corner-art">
              {IllustrationComponent ? (
                <IllustrationComponent />
              ) : (
                <div className="epm-corner-placeholder" />
              )}
              <span className="epm-corner-emoji">
                {event.category === 'Cultural' ? '🎭' : '⚡'}
              </span>
            </div>

            {/* Event info */}
            <div className="epm-info">
              <div className="epm-tags-row">
                <span className="epm-category-chip">{event.category}</span>
                <span className="epm-tag-chip">{event.tag}</span>
              </div>

              <h2 className="epm-title">{event.title}</h2>

              <div className="epm-meta-grid">
                <div className="epm-meta-item">
                  <span className="epm-meta-icon">📅</span>
                  <div>
                    <span className="epm-meta-label">Date</span>
                    <span className="epm-meta-value">{event.date}</span>
                  </div>
                </div>
                <div className="epm-meta-item">
                  <span className="epm-meta-icon">🕐</span>
                  <div>
                    <span className="epm-meta-label">Time</span>
                    <span className="epm-meta-value">{event.time}</span>
                  </div>
                </div>
                <div className="epm-meta-item">
                  <span className="epm-meta-icon">📍</span>
                  <div>
                    <span className="epm-meta-label">Venue</span>
                    <span className="epm-meta-value">{event.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider with glow */}
          <div className="epm-divider" />

          {/* ── Description ── */}
          <div className="epm-description">
            <h3 className="epm-section-title">About This Event</h3>
            {event.fullDescription.split('\n\n').map((para, i) => (
              <p key={i} className="epm-desc-para">{para}</p>
            ))}
          </div>

          {/* Divider */}
          <div className="epm-divider" />

          {/* ── Photo Gallery ── */}
          {event.gallery.length > 0 && (
            <div className="epm-gallery-section">
              <div className="epm-gallery-header">
                <h3 className="epm-section-title">Photo Gallery</h3>
                <div className="epm-gallery-controls-info">
                  <span className="epm-slide-counter">
                    {currentSlide + 1} / {event.gallery.length}
                  </span>
                  <button
                    className={`epm-autoplay-btn ${isAutoplay ? 'active' : ''}`}
                    onClick={() => setIsAutoplay(!isAutoplay)}
                    aria-label={isAutoplay ? 'Pause autoplay' : 'Start autoplay'}
                    id={`autoplay-toggle-${event.id}`}
                  >
                    {isAutoplay ? '⏸' : '▶️'}
                  </button>
                </div>
              </div>

              <div className="epm-gallery">
                {/* Prev button */}
                <button
                  className="epm-gallery-nav epm-gallery-nav--prev"
                  onClick={() => {
                    goToSlide(
                      () => (currentSlide - 1 + event.gallery.length) % event.gallery.length,
                      'prev'
                    );
                    setIsAutoplay(false);
                  }}
                  aria-label="Previous image"
                  id={`gallery-prev-${event.id}`}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {/* Slides */}
                <div className="epm-slides-container">
                  {event.gallery.map((src, i) => (
                    <div
                      key={i}
                      className={`epm-slide ${
                        i === currentSlide ? 'epm-slide--active' : ''
                      } ${
                        i === currentSlide && isAnimating
                          ? slideDirection === 'next'
                            ? 'epm-slide--enter-next'
                            : 'epm-slide--enter-prev'
                          : ''
                      }`}
                    >
                      {!isImageLoaded[i] && i === currentSlide && (
                        <div className="epm-slide-skeleton">
                          <div className="epm-skeleton-shimmer" />
                        </div>
                      )}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt={`${event.title} — gallery photo ${i + 1}`}
                        loading={i === 0 ? 'eager' : 'lazy'}
                        onLoad={() => handleImageLoad(i)}
                        style={{ opacity: isImageLoaded[i] ? 1 : 0 }}
                      />
                    </div>
                  ))}
                </div>

                {/* Next button */}
                <button
                  className="epm-gallery-nav epm-gallery-nav--next"
                  onClick={() => {
                    goToSlide(
                      () => (currentSlide + 1) % event.gallery.length,
                      'next'
                    );
                    setIsAutoplay(false);
                  }}
                  aria-label="Next image"
                  id={`gallery-next-${event.id}`}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* Dot indicators */}
              <div className="epm-dots">
                {event.gallery.map((_, i) => (
                  <button
                    key={i}
                    className={`epm-dot ${i === currentSlide ? 'epm-dot--active' : ''}`}
                    onClick={() => {
                      const dir = i > currentSlide ? 'next' : 'prev';
                      goToSlide(() => i, dir);
                      setIsAutoplay(false);
                    }}
                    aria-label={`Go to slide ${i + 1}`}
                    id={`gallery-dot-${event.id}-${i}`}
                  />
                ))}
              </div>

              {/* Progress bar for autoplay */}
              {isAutoplay && (
                <div className="epm-progress-track">
                  <div
                    key={`${currentSlide}-${Date.now()}`}
                    className="epm-progress-fill"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        /* ═══ Overlay ═══ */
        .epm-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          animation: epm-overlay-in 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .epm-overlay--closing {
          animation: epm-overlay-out 0.4s cubic-bezier(0.55, 0, 1, 0.45) forwards;
        }

        @keyframes epm-overlay-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        @keyframes epm-overlay-out {
          from { opacity: 1; }
          to   { opacity: 0; }
        }

        /* ═══ Modal ═══ */
        .epm-modal {
          position: relative;
          width: 100%;
          max-width: 820px;
          max-height: 90vh;
          overflow-y: auto;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 28px;
          box-shadow:
            0 40px 100px rgba(0, 0, 0, 0.4),
            0 0 0 1px var(--border),
            0 0 80px var(--glow);
          animation: epm-modal-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          scrollbar-width: thin;
          scrollbar-color: var(--accent-1) transparent;
        }

        .epm-modal--closing {
          animation: epm-modal-out 0.4s cubic-bezier(0.55, 0, 1, 0.45) forwards;
        }

        @keyframes epm-modal-in {
          from {
            opacity: 0;
            transform: scale(0.88) translateY(40px);
            filter: blur(8px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0);
          }
        }

        @keyframes epm-modal-out {
          from {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0);
          }
          to {
            opacity: 0;
            transform: scale(0.92) translateY(30px);
            filter: blur(6px);
          }
        }

        /* Scrollbar for modal */
        .epm-modal::-webkit-scrollbar { width: 4px; }
        .epm-modal::-webkit-scrollbar-track { background: transparent; }
        .epm-modal::-webkit-scrollbar-thumb {
          background: var(--accent-1);
          border-radius: 10px;
        }

        /* ═══ Close button ═══ */
        .epm-close {
          position: sticky;
          top: 16px;
          float: right;
          margin: 16px 16px 0 0;
          z-index: 10;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: 1px solid var(--border);
          background: var(--bg-secondary);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.25s ease;
          backdrop-filter: blur(8px);
        }

        .epm-close:hover {
          background: var(--accent-1);
          color: #fff;
          border-color: var(--accent-1);
          transform: rotate(90deg) scale(1.1);
          box-shadow: 0 0 20px var(--glow);
        }

        /* ═══ Header ═══ */
        .epm-header {
          display: flex;
          gap: 24px;
          padding: 32px 32px 0;
          align-items: flex-start;
        }

        .epm-corner-art {
          position: relative;
          width: 160px;
          height: 160px;
          flex-shrink: 0;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid var(--border);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
        }

        .epm-corner-placeholder {
          width: 100%;
          height: 100%;
          background: var(--gradient-accent);
          opacity: 0.3;
        }

        .epm-corner-emoji {
          position: absolute;
          top: 8px;
          left: 8px;
          font-size: 1.8rem;
          filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.6));
        }

        .epm-info {
          flex: 1;
          min-width: 0;
        }

        /* Tags row */
        .epm-tags-row {
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }

        .epm-category-chip {
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          padding: 4px 14px;
          border-radius: 50px;
          background: var(--gradient-accent);
          color: #fff;
          box-shadow: 0 4px 14px var(--glow);
        }

        .epm-tag-chip {
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 4px 14px;
          border-radius: 50px;
          background: rgba(0, 0, 0, 0.12);
          color: var(--accent-1);
          border: 1px solid var(--border);
          backdrop-filter: blur(4px);
        }

        .epm-title {
          font-size: clamp(1.1rem, 2.5vw, 1.6rem);
          font-weight: 900;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          line-height: 1.2;
          margin-bottom: 16px;
        }

        /* Meta grid */
        .epm-meta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .epm-meta-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          border-radius: 12px;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          transition: all 0.25s ease;
        }

        .epm-meta-item:hover {
          border-color: var(--accent-1);
          box-shadow: 0 0 12px var(--glow);
          transform: translateY(-1px);
        }

        .epm-meta-icon {
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        .epm-meta-label {
          display: block;
          font-size: 0.58rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
        }

        .epm-meta-value {
          display: block;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.3;
        }

        .epm-hot { color: #f59e0b !important; }

        /* ═══ Divider ═══ */
        .epm-divider {
          height: 1px;
          margin: 24px 32px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--border) 20%,
            var(--accent-1) 50%,
            var(--border) 80%,
            transparent
          );
          opacity: 0.6;
        }

        /* ═══ Description ═══ */
        .epm-description {
          padding: 0 32px;
        }

        .epm-section-title {
          font-size: 0.9rem;
          font-weight: 800;
          color: var(--accent-1);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 12px;
        }

        .epm-desc-para {
          font-size: 0.88rem;
          line-height: 1.7;
          color: var(--text-secondary);
          margin-bottom: 10px;
        }

        .epm-desc-para:last-child {
          margin-bottom: 0;
        }

        /* ═══ Gallery ═══ */
        .epm-gallery-section {
          padding: 0 32px;
        }

        .epm-gallery-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .epm-gallery-controls-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .epm-slide-counter {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--text-muted);
          font-variant-numeric: tabular-nums;
        }

        .epm-autoplay-btn {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: 1px solid var(--border);
          background: var(--bg-secondary);
          color: var(--text-secondary);
          cursor: pointer;
          font-size: 0.85rem;
          transition: all 0.25s ease;
        }

        .epm-autoplay-btn.active {
          border-color: var(--accent-1);
          color: var(--accent-1);
          box-shadow: 0 0 12px var(--glow);
        }

        .epm-autoplay-btn:hover {
          background: var(--accent-1);
          color: #fff;
          border-color: var(--accent-1);
        }

        .epm-gallery {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .epm-slides-container {
          position: relative;
          flex: 1;
          aspect-ratio: 16 / 9;
          border-radius: 16px;
          overflow: hidden;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
        }

        .epm-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.5s ease, transform 0.5s ease;
          transform: scale(0.96);
        }

        .epm-slide--active {
          opacity: 1;
          transform: scale(1);
          z-index: 1;
        }

        .epm-slide--enter-next {
          animation: epm-slide-in-next 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .epm-slide--enter-prev {
          animation: epm-slide-in-prev 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes epm-slide-in-next {
          from { opacity: 0; transform: translateX(60px) scale(0.95); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }

        @keyframes epm-slide-in-prev {
          from { opacity: 0; transform: translateX(-60px) scale(0.95); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }

        .epm-slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 0.4s ease;
        }

        /* Skeleton loader */
        .epm-slide-skeleton {
          position: absolute;
          inset: 0;
          background: var(--bg-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }

        .epm-skeleton-shimmer {
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            var(--bg-secondary) 25%,
            var(--bg-card) 37%,
            var(--bg-secondary) 63%
          );
          background-size: 200% 100%;
          animation: epm-shimmer 1.4s ease infinite;
        }

        @keyframes epm-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* Nav buttons */
        .epm-gallery-nav {
          width: 44px;
          height: 44px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: 1px solid var(--border);
          background: var(--bg-secondary);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          backdrop-filter: blur(6px);
        }

        .epm-gallery-nav:hover {
          background: var(--gradient-accent);
          color: #fff;
          border-color: var(--accent-1);
          transform: scale(1.15);
          box-shadow: 0 8px 24px var(--glow);
        }

        .epm-gallery-nav:active {
          transform: scale(0.95);
        }

        /* Dots */
        .epm-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 16px;
        }

        .epm-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: none;
          background: var(--text-muted);
          opacity: 0.4;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          padding: 0;
        }

        .epm-dot--active {
          opacity: 1;
          width: 28px;
          border-radius: 100px;
          background: var(--gradient-accent);
          box-shadow: 0 0 12px var(--glow);
        }

        .epm-dot:hover:not(.epm-dot--active) {
          opacity: 0.7;
          transform: scale(1.3);
        }

        /* Autoplay progress */
        .epm-progress-track {
          margin-top: 10px;
          height: 3px;
          background: var(--bg-secondary);
          border-radius: 100px;
          overflow: hidden;
        }

        .epm-progress-fill {
          height: 100%;
          background: var(--gradient-accent);
          border-radius: 100px;
          box-shadow: 0 0 8px var(--glow);
          animation: epm-progress 4s linear forwards;
        }

        @keyframes epm-progress {
          from { width: 0; }
          to   { width: 100%; }
        }

        /* ═══ Footer ═══ */
        .epm-footer {
          display: flex;
          align-items: flex-end;
          gap: 20px;
          padding: 24px 32px 32px;
        }

        .epm-footer-left {
          flex: 1;
        }

        .epm-bar-wrap {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .epm-bar-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.68rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .epm-bar {
          height: 6px;
          background: var(--bg-secondary);
          border-radius: 100px;
          overflow: hidden;
        }

        .epm-bar-fill {
          height: 100%;
          background: var(--gradient-accent);
          border-radius: 100px;
          box-shadow: 0 0 8px var(--glow);
          animation: epm-bar-grow 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
        }

        @keyframes epm-bar-grow {
          from { width: 0 !important; }
        }

        .epm-register-btn {
          flex-shrink: 0;
          padding: 14px 28px;
          border-radius: 14px;
          border: none;
          background: var(--gradient-accent);
          color: #fff;
          font-size: 0.9rem;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 8px 24px var(--glow);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: nowrap;
          letter-spacing: 0.02em;
        }

        .epm-register-btn:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 14px 40px var(--glow);
        }

        .epm-register-btn:active {
          transform: translateY(0) scale(0.98);
        }

        /* ═══ Mobile responsive ═══ */
        @media (max-width: 680px) {
          .epm-overlay {
            padding: 12px;
          }

          .epm-modal {
            border-radius: 20px;
            max-height: 95vh;
          }

          .epm-header {
            flex-direction: column;
            padding: 24px 20px 0;
            gap: 16px;
          }

          .epm-corner-art {
            width: 100%;
            height: 120px;
            border-radius: 14px;
          }

          .epm-meta-grid {
            grid-template-columns: 1fr;
          }

          .epm-description,
          .epm-gallery-section {
            padding: 0 20px;
          }

          .epm-divider {
            margin: 20px 20px;
          }

          .epm-footer {
            flex-direction: column;
            padding: 20px 20px 24px;
            gap: 14px;
          }

          .epm-register-btn {
            width: 100%;
            text-align: center;
          }

          .epm-gallery-nav {
            width: 36px;
            height: 36px;
          }

          .epm-close {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>
    </>
  );
}
