'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import SoarLogo from './SoarLogo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function useClickOutside(ref: React.RefObject<HTMLElement | null>, handler: () => void) {
  useEffect(() => {
    const listener = (e: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      handler();
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

const NAV_LINKS = [
  { 
    label: 'Home', 
    href: '/',
    subLinks: [
      { label: 'Introduction', href: '/#hero' },
      { label: 'Our Mentors', href: '/#leadership' },
      { label: 'Testimonials', href: '/#testimonials' },
      { label: 'About Us', href: '/#about' },
      { label: 'Guidelines', href: '/#guidance' },
      { label: 'FAQs', href: '/#faq' },
    ]
  },
  { label: 'Members', href: '/members' },
  { label: 'Events', href: '/events' },
  { label: 'Magazine', href: '/magazine' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Contact Us', href: '/contact' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const navRef = useRef<HTMLElement>(null);
  const logoWrapRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Close when clicking outside the nav
  useClickOutside(navRef, () => setIsMobileMenuOpen(false));

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
          <li key={link.label} className={link.subLinks ? 'nav-item-has-dropdown' : ''}>
            <Link href={link.href} className="nav-link">
              {link.label}
              {link.subLinks && <span className="dropdown-arrow">▾</span>}
            </Link>
            
            {link.subLinks && (
              <ul className="dropdown-menu">
                {link.subLinks.map((sub) => (
                  <li key={sub.label}>
                    <Link href={sub.href} className="dropdown-item">
                      {sub.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <div className="nav-actions">
        {/* Theme toggle */}
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'cultural' ? '🌙 Tech' : '🎭 Cultural'}
        </button>

        {/* Mobile menu toggle */}
        <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
          <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div ref={dropdownRef} className={`mobile-dropdown ${isMobileMenuOpen ? 'open' : ''}`} aria-hidden={!isMobileMenuOpen}>
        <ul className="mobile-dropdown-links">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="mobile-dropdown-link "
                onClick={() => setIsMobileMenuOpen(false)}
              ><div className='flex justify-center items-center h-full w-full '>{link.label}</div>
                
              </Link>
            </li>
          ))}
        </ul>
      </div>

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
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .dropdown-arrow {
          font-size: 0.8rem;
          opacity: 0.7;
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

        .nav-item-has-dropdown {
          position: relative;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: -15px;
          background: var(--bg-primary);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 16px 20px;
          min-width: 220px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(10px);
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .nav-item-has-dropdown:hover .dropdown-menu {
          opacity: 1;
          visibility: visible;
          transform: translateY(15px);
        }

        .dropdown-item {
          display: block;
          padding: 12px 16px;
          color: var(--text-primary);
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          border-radius: 8px;
          transition: background 0.2s, color 0.2s;
        }

        .dropdown-item:hover {
          background: var(--surface-variant);
          color: var(--accent-1);
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .mobile-menu-btn {
          display: none;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 8px;
          z-index: 2000;
        }

        .hamburger {
          width: 24px;
          height: 20px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .hamburger span {
          display: block;
          width: 100%;
          height: 2px;
          background: var(--text-primary);
          border-radius: 2px;
          transition: all 0.3s ease;
          transform-origin: left center;
        }

        .hamburger.open span:nth-child(1) {
          transform: rotate(45deg);
        }

        .hamburger.open span:nth-child(2) {
          width: 0%;
          opacity: 0;
        }

        .hamburger.open span:nth-child(3) {
          transform: rotate(-45deg);
        }

        /* ─── Mobile Dropdown ─── */
        .mobile-dropdown {
          display: none;
          position: absolute;
          top: calc(100% + 8px);
          right: 6%;
          width: 220px;
          background: var(--bg-card, rgba(15,15,20,0.92));
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid var(--border);
          border-radius: 14px;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
          z-index: 1600;
          overflow: hidden;
          opacity: 0;
          transform: translateY(-8px) scale(0.97);
          pointer-events: none;
          transition: opacity 0.22s ease, transform 0.22s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .mobile-dropdown.open {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }

        .mobile-dropdown-links {
          list-style: none;
          padding: 6px 0;
          margin: 0;
        }

        .mobile-dropdown-links li:not(:last-child) {
          border-bottom: 1px solid var(--border);
        }

        .mobile-dropdown-link {
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 14px 24px;
          color: var(--text-primary);
          text-decoration: none;
          font-size: 0.92rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          transition: background 0.15s ease, color 0.15s ease;
        }

        .mobile-dropdown-link:hover {
          background: var(--surface-variant, rgba(255,255,255,0.06));
          color: var(--accent-1);
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
          .mobile-menu-btn {
            display: flex;
          }
          .mobile-dropdown {
            display: block;
          }
        }

        @media (max-width: 480px) {
          .soar-nav {
            padding: 12px 16px;
          }
          .nav-brand {
            font-size: 1.15rem;
          }
          .theme-toggle {
            padding: 4px 10px;
            font-size: 0.65rem;
          }
        }
      `}</style>
    </nav>
  );
}
