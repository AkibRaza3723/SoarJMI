'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import SoarLogo from './SoarLogo';
import Link from 'next/link';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Events', href: '/events' },
  { label: 'Contact Us', href: '/contact' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const navRef = useRef<HTMLElement>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!navRef.current) return;
      if (window.scrollY > 60) {
        navRef.current.classList.add('nav-scrolled');
      } else {
        navRef.current.classList.remove('nav-scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav ref={navRef} className="soar-nav">
      {/* Logo (shrinks in on scroll via CSS class) */}
      <div ref={logoWrapRef} className="nav-logo-wrap">
        <div className="nav-logo-img">
          <SoarLogo size={38} />
        </div>
        <span className="nav-brand">
          Soar<span className="accent-gradient">JMI</span>
        </span>
      </div>

      {/* Links */}
      <ul className="nav-links">
        {NAV_LINKS.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="nav-link">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Theme toggle */}
      <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
        {theme === 'cultural' ? '🌙 Tech' : '🎭 Cultural'}
      </button>

      <style jsx>{`
        .soar-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 6%;
          background: transparent;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .soar-nav.nav-scrolled {
          background: var(--nav-bg);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
          padding: 12px 6%;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.08);
        }

        .nav-logo-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          text-decoration: none;
        }

        .nav-logo-img {
          border-radius: 10px;
          overflow: hidden;
          border: 1.5px solid var(--border);
          flex-shrink: 0;
        }

        .nav-brand {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.03em;
        }

        .nav-links {
          display: flex;
          list-style: none;
          gap: 40px;
          align-items: center;
        }

        .nav-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          position: relative;
          transition: color 0.3s ease;
          letter-spacing: 0.01em;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0%;
          height: 2px;
          background: var(--gradient-accent);
          transition: width 0.3s ease;
          border-radius: 4px;
        }

        .nav-link:hover {
          color: var(--accent-1);
        }

        .nav-link:hover::after {
          width: 100%;
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
}
