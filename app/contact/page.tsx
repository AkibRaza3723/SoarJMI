'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);



const INFO_ITEMS = [
  { icon: '📍', label: 'Address', value: 'Jamia Millia Islamia, Maulana Mohammed Ali Jauhar Marg, New Delhi – 110025' },
  { icon: '🌐', label: 'Website', value: 'www.soarjmi.in' },
  { icon: '📮', label: 'General Enquiries', value: 'soarxjmichapter@gmail.com' },
  { icon: '🕐', label: 'Office Hours', value: 'Monday to Friday · 10:00 AM – 6:00 PM IST' },
];



export default function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const ptRef = useRef<HTMLDivElement>(null);

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
        .from(subRef.current, { opacity: 0, y: 30, duration: 0.7 }, 0.75);

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
                  { label: 'Instagram', icon: '📸', href: 'https://www.instagram.com/soarjmi/?hl=en' },
                  { label: 'LinkedIn', icon: '💼', href: 'https://www.linkedin.com/search/results/all/?keywords=SoarJMI&origin=RICH_QUERY_SUGGESTION&heroEntityKey=urn%3Ali%3Aorganization%3A102252703&position=0' },
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
        .map-panel { position:relative; background: linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.35)), url('/ghalib.jpeg') center/cover no-repeat; border:1px solid var(--border); border-radius:28px; overflow:hidden; box-shadow:var(--shadow-card); min-height:400px; display:flex; align-items:center; justify-content:center; }
        .map-inner { position:relative; z-index:2; text-align:center; padding:40px 32px; display:flex; flex-direction:column; align-items:center; gap:10px; }
        .map-pin-wrap { position:relative; display:flex; align-items:center; justify-content:center; margin-bottom:10px; }
        .map-pin { font-size:3.5rem; filter:drop-shadow(0 6px 20px var(--glow)); animation:float 3.5s ease-in-out infinite; position:relative; z-index:2; }
        .map-ping { position:absolute; width:70px; height:70px; border-radius:50%; border:2px solid var(--accent-1); opacity:0; animation:ping-out 2.4s ease-out infinite; }
        .map-ping-2 { animation-delay:1.2s; }
        @keyframes ping-out { 0%{transform:scale(0.5);opacity:0.8;} 100%{transform:scale(2);opacity:0;} }
        .map-label { font-size:1.3rem; font-weight:800; color:rgba(255, 255, 255, 0.85); letter-spacing:-0.02em; text-shadow: 0 2px 10px rgba(0,0,0,0.5); }
        .map-sub { font-size:0.85rem; color:rgba(255, 255, 255, 0.65); text-shadow: 0 1px 8px rgba(0,0,0,0.5); }
        .map-cta { margin-top:16px; padding:12px 28px; border-radius:50px; background:rgba(255, 255, 255, 0.1); backdrop-filter:blur(10px); border:1px solid rgba(255, 255, 255, 0.25); color:#fff; font-weight:700; font-size:0.88rem; text-decoration:none; box-shadow:0 4px 20px rgba(0,0,0,0.2); transition:all 0.2s; display:inline-block; }
        .map-cta:hover { background:rgba(255, 255, 255, 0.2); transform:translateY(-2px); border-color:rgba(255, 255, 255, 0.4); }
        @media (max-width:860px) {
          .info-section { grid-template-columns:1fr; }
          .contact-hero { padding:40px 5% 10px; }
        }
        @media (max-width:480px) {
          .info-panel { padding:24px 20px; }
          .info-item { flex-direction:column; gap:8px; }
          .info-icon { margin-top:0; }
          .contact-hero { padding:20px 5% 10px; }
        }
      `}</style>
    </>
  );
}
