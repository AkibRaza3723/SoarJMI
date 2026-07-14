'use client';

import SoarLogo from './SoarLogo';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <SoarLogo size={36} />
          <span className="footer-name">
            Soar<span className="accent-gradient">JMI</span>
          </span>
        </div>
        <p className="footer-tagline">Where Culture Meets Innovation · JMI, New Delhi</p>
        <p className="footer-copy">
          © {new Date().getFullYear()} SoarJMI. Crafted with ❤️ by the SoarJMI Tech Team.
        </p>
      </div>

      <style jsx>{`
        .footer {
          padding: 48px 6%;
          background: var(--bg-primary);
          border-top: 1px solid var(--border);
          text-align: center;
        }

        .footer-inner {
          max-width: 600px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .footer-name {
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.03em;
        }

        .footer-tagline {
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .footer-copy {
          color: var(--text-muted);
          font-size: 0.8rem;
          opacity: 0.7;
        }
      `}</style>
    </footer>
  );
}
