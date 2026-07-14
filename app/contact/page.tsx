'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const HRS = [
  {
    id: 1,
    name: 'Ayesha Khan',
    role: 'Head of Human Resources',
    department: 'Cultural Wing',
    email: 'ayesha.khan@soarjmi.in',
    phone: '+91 98765 43210',
    availability: 'Mon – Fri, 10 AM – 5 PM',
    emoji: '🎭',
    accent: 'cultural',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    github: '',
  },
  {
    id: 2,
    name: 'Zaid Mirza',
    role: 'HR Manager',
    department: 'Tech Wing',
    email: 'zaid.mirza@soarjmi.in',
    phone: '+91 91234 56789',
    availability: 'Mon – Sat, 11 AM – 6 PM',
    emoji: '⚡',
    accent: 'tech',
    linkedin: 'https://linkedin.com',
    instagram: '',
    github: 'https://github.com',
  },
];

const INFO_ITEMS = [
  { icon: '📍', label: 'Address', value: 'Jamia Millia Islamia, Maulana Mohammed Ali Jauhar Marg, New Delhi – 110025' },
  { icon: '🌐', label: 'Website', value: 'www.soarjmi.in' },
  { icon: '📮', label: 'General Enquiries', value: 'hello@soarjmi.in' },
  { icon: '🕐', label: 'Office Hours', value: 'Monday to Friday · 10:00 AM – 6:00 PM IST' },
];

function HRCard({ hr, idx }: { hr: typeof HRS[0]; idx: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      gsap.to(el, { rotateX: -dy * 6, rotateY: dx * 6, scale: 1.03, duration: 0.4, ease: 'power2.out', transformPerspective: 900 });
    };
    const onLeave = () => gsap.to(el, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.6, ease: 'elastic.out(1,0.5)' });
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); };
  }, []);

  return (
    <div ref={cardRef} className="hr-card" style={{ transformStyle: 'preserve-3d' } as React.CSSProperties}>
      <div className="card-glow-blob" />
      <div className="hr-avatar">
        <span className="hr-avatar-emoji">{hr.emoji}</span>
        <div className="hr-avatar-ring" />
      </div>
      <span className={`hr-dept-badge dept-${hr.accent}`}>{hr.department}</span>
      <h3 className="hr-name">{hr.name}</h3>
      <p className="hr-role">{hr.role}</p>
      <div className="hr-divider" />
      <div className="hr-contacts">
        <a href={`mailto:${hr.email}`} className="hr-contact-row">
          <span className="hr-contact-icon">✉️</span>
          <div className="hr-contact-info">
            <span className="hr-contact-label">Email</span>
            <span className="hr-contact-value">{hr.email}</span>
          </div>
          <span className="hr-contact-arrow">↗</span>
        </a>
        <a href={`tel:${hr.phone.replace(/\s/g, '')}`} className="hr-contact-row">
          <span className="hr-contact-icon">📞</span>
          <div className="hr-contact-info">
            <span className="hr-contact-label">Phone</span>
            <span className="hr-contact-value">{hr.phone}</span>
          </div>
          <span className="hr-contact-arrow">↗</span>
        </a>
        <div className="hr-contact-row no-link">
          <span className="hr-contact-icon">🕐</span>
          <div className="hr-contact-info">
            <span className="hr-contact-label">Available</span>
            <span className="hr-contact-value">{hr.availability}</span>
          </div>
        </div>
      </div>
      <div className="hr-socials">
        {hr.linkedin && (
          <a href={hr.linkedin} target="_blank" rel="noopener noreferrer" className="hr-social-btn" aria-label="LinkedIn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        )}
        {hr.instagram && (
          <a href={hr.instagram} target="_blank" rel="noopener noreferrer" className="hr-social-btn" aria-label="Instagram">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
          </a>
        )}
        {hr.github && (
          <a href={hr.github} target="_blank" rel="noopener noreferrer" className="hr-social-btn" aria-label="GitHub">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
          </a>
        )}
      </div>
      <style jsx>{`
        .hr-card { position:relative; background:var(--bg-card); border:1px solid var(--border); border-radius:28px; padding:40px 36px 32px; display:flex; flex-direction:column; align-items:center; overflow:hidden; box-shadow:var(--shadow-card); cursor:default; will-change:transform; }
        .card-glow-blob { position:absolute; top:-60px; left:50%; transform:translateX(-50%); width:280px; height:280px; background:radial-gradient(ellipse, var(--glow) 0%, transparent 70%); pointer-events:none; opacity:0.7; border-radius:50%; }
        .hr-avatar { position:relative; width:96px; height:96px; display:flex; align-items:center; justify-content:center; margin-bottom:18px; z-index:1; }
        .hr-avatar-emoji { font-size:3.2rem; filter:drop-shadow(0 4px 16px var(--glow)); animation:float 4s ease-in-out infinite; position:relative; z-index:2; }
        .hr-avatar-ring { position:absolute; inset:-4px; border-radius:50%; border:2px dashed var(--accent-1); opacity:0.4; animation:spin-slow 12s linear infinite; }
        .hr-dept-badge { font-size:0.68rem; font-weight:800; text-transform:uppercase; letter-spacing:0.14em; padding:4px 14px; border-radius:50px; margin-bottom:14px; z-index:1; }
        .dept-cultural { background:rgba(61,139,94,0.12); color:var(--accent-1); border:1px solid rgba(61,139,94,0.28); }
        .dept-tech { background:rgba(34,197,94,0.10); color:var(--accent-2); border:1px solid rgba(34,197,94,0.22); }
        .hr-name { font-size:1.45rem; font-weight:800; color:var(--text-primary); letter-spacing:-0.02em; text-align:center; z-index:1; margin-bottom:6px; }
        .hr-role { font-size:0.85rem; color:var(--text-muted); font-weight:500; text-align:center; z-index:1; margin-bottom:0; }
        .hr-divider { width:100%; height:1px; background:var(--border); margin:24px 0 20px; z-index:1; }
        .hr-contacts { display:flex; flex-direction:column; gap:10px; width:100%; z-index:1; margin-bottom:24px; }
        .hr-contact-row { display:flex; align-items:center; gap:12px; padding:11px 14px; border-radius:14px; background:var(--bg-secondary); border:1px solid var(--border); text-decoration:none; color:var(--text-primary); transition:all 0.25s ease; position:relative; overflow:hidden; }
        .hr-contact-row:not(.no-link):hover { background:var(--bg-card); border-color:var(--accent-1); box-shadow:0 4px 20px var(--glow); transform:translateX(4px); }
        .hr-contact-row::before { content:''; position:absolute; left:0; top:0; bottom:0; width:3px; background:var(--gradient-accent); border-radius:3px; transform:scaleY(0); transition:transform 0.25s ease; }
        .hr-contact-row:not(.no-link):hover::before { transform:scaleY(1); }
        .hr-contact-icon { font-size:1.1rem; flex-shrink:0; }
        .hr-contact-info { flex:1; display:flex; flex-direction:column; gap:2px; overflow:hidden; }
        .hr-contact-label { font-size:0.65rem; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; color:var(--text-muted); }
        .hr-contact-value { font-size:0.82rem; font-weight:600; color:var(--text-secondary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .hr-contact-arrow { font-size:0.9rem; color:var(--accent-1); opacity:0; transition:opacity 0.2s, transform 0.2s; flex-shrink:0; }
        .hr-contact-row:not(.no-link):hover .hr-contact-arrow { opacity:1; transform:translate(2px,-2px); }
        .hr-socials { display:flex; gap:10px; z-index:1; }
        .hr-social-btn { width:40px; height:40px; border-radius:12px; background:var(--bg-secondary); border:1px solid var(--border); display:flex; align-items:center; justify-content:center; color:var(--text-muted); text-decoration:none; transition:all 0.25s ease; }
        .hr-social-btn:hover { background:var(--accent-1); color:#fff; border-color:var(--accent-1); transform:translateY(-3px); box-shadow:0 6px 18px var(--glow); }
      `}</style>
    </div>
  );
}

export default function ContactPage() {
  const pageRef    = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);
  const infoRef    = useRef<HTMLDivElement>(null);
  const mapRef     = useRef<HTMLDivElement>(null);
  const ptRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (ptRef.current) {
        const dots = ptRef.current.querySelectorAll('.particle-dot');
        gsap.set(dots, { opacity: 0, scale: 0 });
        gsap.to(dots, { opacity: 'random(0.3,0.8)', scale: 1, duration: 1.2, stagger: { each: 0.06, from: 'random' }, ease: 'back.out(2)', delay: 0.2 });
        gsap.to(dots, { y: 'random(-20,20)', x: 'random(-15,15)', duration: 'random(4,8)', repeat: -1, yoyo: true, ease: 'sine.inOut', stagger: { each: 0.4, from: 'random' } });
      }
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from(eyebrowRef.current, { opacity: 0, y: 30, duration: 0.7 }, 0.3)
        .from(headingRef.current, { opacity: 0, y: 50, duration: 0.8 }, 0.5)
        .from(subRef.current,     { opacity: 0, y: 30, duration: 0.7 }, 0.75);
      if (cardsRef.current) {
        gsap.from(cardsRef.current.querySelectorAll('.hr-card'), {
          opacity: 0, y: 80, rotateX: 15, scale: 0.92, duration: 0.9, stagger: 0.18, ease: 'power3.out',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
        });
      }
      if (infoRef.current) {
        gsap.from(infoRef.current.querySelectorAll('.info-item'), {
          opacity: 0, x: -40, duration: 0.7, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: infoRef.current, start: 'top 82%' },
        });
      }
      if (mapRef.current) {
        gsap.from(mapRef.current, {
          opacity: 0, scale: 0.95, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: mapRef.current, start: 'top 82%' },
        });
      }
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />
      <div ref={pageRef} className="contact-page">
        <div ref={ptRef} className="particles-bg" aria-hidden="true">
          {[...Array(36)].map((_, i) => (
            <div key={i} className="particle-dot" style={{ left: `${(i * 2.78) % 100}%`, top: `${(i * 4.17 + 10) % 100}%`, width: `${3 + (i % 5)}px`, height: `${3 + (i % 5)}px` } as React.CSSProperties} />
          ))}
        </div>

        <header className="contact-hero">
          <p ref={eyebrowRef} className="contact-eyebrow">SoarJMI &middot; Get In Touch</p>
          <h1 ref={headingRef} className="contact-heading section-title">
            We&rsquo;d Love to&nbsp;<span className="accent-gradient">Hear From You</span>
          </h1>
          <p ref={subRef} className="contact-sub">
            Reach out to our HR team for collaborations, queries, or just to say hello. We&rsquo;re always around to help.
          </p>
        </header>

        <section className="hr-section">
          <div ref={cardsRef} className="hr-grid">
            {HRS.map((hr, i) => <HRCard key={hr.id} hr={hr} idx={i} />)}
          </div>
        </section>

        <section className="info-section">
          <div ref={infoRef} className="info-panel">
            <div className="info-panel-header">
              <span className="info-panel-icon">🏛️</span>
              <div>
                <h2 className="info-panel-title">General Information</h2>
                <p className="info-panel-sub">Everything you need to find us</p>
              </div>
            </div>
            <div className="info-items-list">
              {INFO_ITEMS.map((item) => (
                <div key={item.label} className="info-item">
                  <span className="info-icon">{item.icon}</span>
                  <div className="info-text">
                    <span className="info-label">{item.label}</span>
                    <span className="info-value">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="social-strip">
              <p className="social-strip-label">Follow the journey</p>
              <div className="social-strip-links">
                {[
                  { label: 'Instagram', icon: '📸', href: 'https://instagram.com' },
                  { label: 'LinkedIn',  icon: '💼', href: 'https://linkedin.com' },
                  { label: 'Twitter',   icon: '🐦', href: 'https://twitter.com' },
                  { label: 'YouTube',   icon: '▶️',  href: 'https://youtube.com' },
                ].map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="social-chip">
                    <span>{s.icon}</span><span>{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div ref={mapRef} className="map-panel">
            <div className="map-inner">
              <div className="map-pin-wrap">
                <span className="map-pin">📍</span>
                <div className="map-ping" />
                <div className="map-ping map-ping-2" />
              </div>
              <p className="map-label">Jamia Millia Islamia</p>
              <p className="map-sub">New Delhi &mdash; 110025</p>
              <a href="https://maps.google.com/?q=Jamia+Millia+Islamia+New+Delhi" target="_blank" rel="noopener noreferrer" className="map-cta" id="contact-map-cta">
                Open in Google Maps →
              </a>
            </div>
            <div className="map-grid" aria-hidden="true">
              {[...Array(8)].map((_, i) => <div key={`h${i}`} className="map-grid-line-h" style={{ top: `${12 + i * 11}%` } as React.CSSProperties} />)}
              {[...Array(8)].map((_, i) => <div key={`v${i}`} className="map-grid-line-v" style={{ left: `${12 + i * 11}%` } as React.CSSProperties} />)}
            </div>
          </div>
        </section>
      </div>
      <Footer />

      <style jsx global>{`
        .contact-page { position:relative; background:var(--bg-primary); overflow-x:hidden; padding-top:100px; min-height:100vh; }
        .particles-bg { position:fixed; inset:0; pointer-events:none; z-index:0; overflow:hidden; }
        .particle-dot { position:absolute; border-radius:50%; background:var(--accent-1); opacity:0; }
        .contact-hero { position:relative; z-index:2; text-align:center; padding:60px 6% 20px; max-width:820px; margin:0 auto; }
        .contact-eyebrow { font-size:0.78rem; font-weight:700; text-transform:uppercase; letter-spacing:0.18em; color:var(--accent-1); margin-bottom:16px; }
        .contact-heading { color:var(--text-primary); margin-bottom:20px; }
        .contact-sub { font-size:1.05rem; line-height:1.8; color:var(--text-secondary); max-width:520px; margin:0 auto; }
        .hr-section { position:relative; z-index:2; padding:60px 6%; }
        .hr-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(340px,1fr)); gap:32px; max-width:900px; margin:0 auto; }
        .info-section { position:relative; z-index:2; display:grid; grid-template-columns:1fr 1fr; gap:32px; max-width:1100px; margin:0 auto; padding:0 6% 100px; }
        .info-panel { background:var(--bg-card); border:1px solid var(--border); border-radius:28px; padding:40px 36px; box-shadow:var(--shadow-card); display:flex; flex-direction:column; gap:28px; }
        .info-panel-header { display:flex; align-items:center; gap:16px; }
        .info-panel-icon { font-size:2.4rem; filter:drop-shadow(0 4px 12px var(--glow)); }
        .info-panel-title { font-size:1.25rem; font-weight:800; color:var(--text-primary); letter-spacing:-0.02em; }
        .info-panel-sub { font-size:0.82rem; color:var(--text-muted); margin-top:3px; }
        .info-items-list { display:flex; flex-direction:column; gap:12px; }
        .info-item { display:flex; align-items:flex-start; gap:14px; padding:14px 16px; border-radius:16px; background:var(--bg-secondary); border:1px solid var(--border); transition:border-color 0.2s ease, box-shadow 0.2s ease; }
        .info-item:hover { border-color:var(--accent-1); box-shadow:0 4px 20px var(--glow); }
        .info-icon { font-size:1.3rem; flex-shrink:0; margin-top:2px; }
        .info-text { display:flex; flex-direction:column; gap:3px; }
        .info-label { font-size:0.65rem; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; color:var(--text-muted); }
        .info-value { font-size:0.87rem; font-weight:500; color:var(--text-secondary); line-height:1.5; }
        .social-strip { border-top:1px solid var(--border); padding-top:24px; }
        .social-strip-label { font-size:0.72rem; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; color:var(--text-muted); margin-bottom:12px; }
        .social-strip-links { display:flex; flex-wrap:wrap; gap:8px; }
        .social-chip { display:flex; align-items:center; gap:6px; padding:7px 14px; border-radius:50px; background:var(--bg-secondary); border:1px solid var(--border); font-size:0.8rem; font-weight:600; color:var(--text-secondary); text-decoration:none; transition:all 0.25s ease; }
        .social-chip:hover { background:var(--accent-1); color:#fff; border-color:var(--accent-1); transform:translateY(-2px); box-shadow:0 6px 18px var(--glow); }
        .map-panel { position:relative; background:var(--bg-card); border:1px solid var(--border); border-radius:28px; overflow:hidden; box-shadow:var(--shadow-card); min-height:400px; display:flex; align-items:center; justify-content:center; }
        .map-grid { position:absolute; inset:0; pointer-events:none; }
        .map-grid-line-h { position:absolute; left:0; right:0; height:1px; background:var(--border); opacity:0.5; }
        .map-grid-line-v { position:absolute; top:0; bottom:0; width:1px; background:var(--border); opacity:0.5; }
        .map-inner { position:relative; z-index:2; text-align:center; padding:40px 32px; display:flex; flex-direction:column; align-items:center; gap:10px; }
        .map-pin-wrap { position:relative; display:flex; align-items:center; justify-content:center; margin-bottom:10px; }
        .map-pin { font-size:3.5rem; filter:drop-shadow(0 6px 20px var(--glow)); animation:float 3.5s ease-in-out infinite; position:relative; z-index:2; }
        .map-ping { position:absolute; width:70px; height:70px; border-radius:50%; border:2px solid var(--accent-1); opacity:0; animation:ping-out 2.4s ease-out infinite; }
        .map-ping-2 { animation-delay:1.2s; }
        @keyframes ping-out { 0%{transform:scale(0.5);opacity:0.8;} 100%{transform:scale(2);opacity:0;} }
        .map-label { font-size:1.3rem; font-weight:800; color:var(--text-primary); letter-spacing:-0.02em; }
        .map-sub { font-size:0.85rem; color:var(--text-muted); }
        .map-cta { margin-top:16px; padding:12px 28px; border-radius:50px; background:var(--gradient-accent); color:#fff; font-weight:700; font-size:0.88rem; text-decoration:none; box-shadow:0 4px 20px var(--glow); transition:transform 0.2s, box-shadow 0.2s; display:inline-block; }
        .map-cta:hover { transform:translateY(-2px); box-shadow:0 8px 28px var(--glow); }
        @media (max-width:860px) {
          .info-section { grid-template-columns:1fr; }
          .hr-grid { grid-template-columns:1fr; max-width:480px; }
          .contact-hero { padding:40px 5% 10px; }
        }
      `}</style>
    </>
  );
}
