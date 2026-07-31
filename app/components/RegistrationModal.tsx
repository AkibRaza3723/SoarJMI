'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import RegistrationForm from './RegistrationForm';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventName: string;
}

export default function RegistrationModal({ isOpen, onClose, eventName }: RegistrationModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [successRegId, setSuccessRegId] = useState<string>('');
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsClosing(false);
      setSuccessRegId('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 350);
  }, [onClose]);

  // Keyboard: Escape to close
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) handleClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, handleClose]);

  // Focus trap — keep focus inside modal
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;
    const focusable = modalRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const onTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    first?.focus();
    window.addEventListener('keydown', onTab);
    return () => window.removeEventListener('keydown', onTab);
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  const animClass = isClosing ? 'rm-closing' : 'rm-opening';

  return (
    <div
      ref={overlayRef}
      className={`rm-overlay ${animClass}`}
      onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={`Register for ${eventName}`}
    >
      <div ref={modalRef} className="rm-modal">

        {/* Header */}
        <div className="rm-header">
          <div className="rm-header__left">
            <p className="rm-header__eyebrow">SoarJMI · Event Registration</p>
            <h2 className="rm-header__title">
              Join the <span className="rm-header__accent">Experience</span>
            </h2>
          </div>
          <button
            className="rm-close"
            onClick={handleClose}
            aria-label="Close registration modal"
            type="button"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Divider */}
        <div className="rm-divider" aria-hidden="true" />

        {/* Scrollable content */}
        <div className="rm-body">
          <RegistrationForm
            eventName={eventName}
            onSuccess={(regId) => setSuccessRegId(regId)}
            onClose={handleClose}
          />
        </div>

      </div>

      <style jsx>{`
        /* ── Overlay ── */
        .rm-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.72);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          z-index: 9000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        /* Entrance / exit animations */
        .rm-overlay.rm-opening {
          animation: rm-overlay-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .rm-overlay.rm-closing {
          animation: rm-overlay-out 0.35s cubic-bezier(0.55, 0, 1, 0.45) both;
        }
        @keyframes rm-overlay-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes rm-overlay-out {
          from { opacity: 1; }
          to   { opacity: 0; }
        }

        /* ── Modal panel ── */
        .rm-modal {
          width: 100%;
          max-width: 680px;
          max-height: 90vh;
          background: var(--surface-container-low);
          border: 1px solid var(--outline-variant);
          border-radius: 28px;
          box-shadow: 0 32px 80px rgba(0,0,0,0.4), 0 0 0 1px var(--outline-variant);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .rm-overlay.rm-opening .rm-modal {
          animation: rm-modal-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) both 0.05s;
        }
        .rm-overlay.rm-closing .rm-modal {
          animation: rm-modal-out 0.3s cubic-bezier(0.55, 0, 1, 0.45) both;
        }
        @keyframes rm-modal-in {
          from { transform: scale(0.88) translateY(20px); filter: blur(8px); opacity: 0; }
          to   { transform: scale(1) translateY(0); filter: blur(0px); opacity: 1; }
        }
        @keyframes rm-modal-out {
          from { transform: scale(1); filter: blur(0px); opacity: 1; }
          to   { transform: scale(0.9) translateY(16px); filter: blur(6px); opacity: 0; }
        }

        /* ── Header ── */
        .rm-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 28px 32px 20px;
          flex-shrink: 0;
        }
        .rm-header__eyebrow {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: var(--text-muted);
          margin-bottom: 4px;
        }
        .rm-header__title {
          font-family: var(--font-display);
          font-size: clamp(1.3rem, 3vw, 1.75rem);
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.025em;
          line-height: 1.1;
        }
        .rm-header__accent {
          background: var(--gradient-accent);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Close button */
        .rm-close {
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--surface-container);
          border: 1px solid var(--outline-variant);
          border-radius: 50%;
          color: var(--text-secondary);
          cursor: pointer;
          transition: background 0.2s, color 0.2s, transform 0.25s, box-shadow 0.25s;
          margin-left: 16px;
          margin-top: 2px;
        }
        .rm-close:hover {
          background: var(--surface-container-high);
          color: var(--text-primary);
          transform: rotate(90deg) scale(1.1);
          box-shadow: 0 4px 16px var(--glow);
        }

        /* Gradient divider */
        .rm-divider {
          height: 1px;
          margin: 0 32px;
          background: var(--gradient-accent);
          opacity: 0.25;
          flex-shrink: 0;
        }

        /* ── Scrollable body ── */
        .rm-body {
          overflow-y: auto;
          padding: 24px 32px 32px;
          flex: 1;
          /* custom scrollbar */
          scrollbar-width: thin;
          scrollbar-color: var(--secondary) var(--surface-container-low);
        }
        .rm-body::-webkit-scrollbar { width: 5px; }
        .rm-body::-webkit-scrollbar-track { background: transparent; }
        .rm-body::-webkit-scrollbar-thumb { background: var(--secondary); border-radius: 10px; opacity: 0.6; }

        /* Mobile full-screen treatment */
        @media (max-width: 480px) {
          .rm-overlay { padding: 0; align-items: flex-end; }
          .rm-modal {
            max-width: 100%;
            max-height: 95vh;
            border-radius: 24px 24px 0 0;
          }
          .rm-header { padding: 20px 20px 16px; }
          .rm-divider { margin: 0 20px; }
          .rm-body { padding: 20px 20px 28px; }
        }
      `}</style>
    </div>
  );
}
