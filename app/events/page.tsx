'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import { EVENTS, SoarEvent } from '../data/events';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─── Inline SVG illustrations per event ─── */
function IllustrationSoarFest() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <radialGradient id="il1bg" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#1a4a2e" /><stop offset="100%" stopColor="#0a1a0f" /></radialGradient>
      </defs>
      <rect width="200" height="200" fill="url(#il1bg)" />
      <ellipse cx="60" cy="160" rx="35" ry="70" fill="rgba(255,215,0,0.12)" />
      <ellipse cx="100" cy="160" rx="30" ry="75" fill="rgba(255,165,50,0.10)" />
      <ellipse cx="145" cy="160" rx="35" ry="68" fill="rgba(100,255,150,0.10)" />
      <ellipse cx="100" cy="170" rx="80" ry="12" fill="#2a5a3a" />
      <circle cx="75" cy="128" r="6" fill="#3d8b5e" /><rect x="71" y="134" width="8" height="18" rx="4" fill="#3d8b5e" />
      <line x1="75" y1="142" x2="64" y2="155" stroke="#3d8b5e" strokeWidth="3" strokeLinecap="round" />
      <line x1="75" y1="142" x2="86" y2="152" stroke="#3d8b5e" strokeWidth="3" strokeLinecap="round" />
      <circle cx="100" cy="122" r="6" fill="#7dbf87" /><rect x="96" y="128" width="8" height="18" rx="4" fill="#7dbf87" />
      <line x1="100" y1="136" x2="89" y2="148" stroke="#7dbf87" strokeWidth="3" strokeLinecap="round" />
      <line x1="100" y1="136" x2="111" y2="146" stroke="#7dbf87" strokeWidth="3" strokeLinecap="round" />
      <circle cx="125" cy="128" r="6" fill="#3d8b5e" /><rect x="121" y="134" width="8" height="18" rx="4" fill="#3d8b5e" />
      <line x1="125" y1="142" x2="114" y2="152" stroke="#3d8b5e" strokeWidth="3" strokeLinecap="round" />
      <line x1="125" y1="142" x2="136" y2="155" stroke="#3d8b5e" strokeWidth="3" strokeLinecap="round" />
      <text x="45" y="60" fontSize="18" fill="#fbbf24" opacity="0.9">♪</text>
      <text x="140" y="50" fontSize="22" fill="#34d399" opacity="0.9">♫</text>
      <text x="90" y="38" fontSize="16" fill="#fbbf24" opacity="0.8">♩</text>
      <circle cx="30" cy="40" r="3" fill="#f59e0b" /><circle cx="170" cy="35" r="2" fill="#34d399" />
      <circle cx="160" cy="80" r="3" fill="#fbbf24" /><circle cx="35" cy="90" r="2" fill="#a78bfa" />
      <rect x="50" y="30" width="6" height="6" rx="1" fill="#f87171" transform="rotate(30 50 30)" />
      <rect x="155" y="100" width="5" height="5" rx="1" fill="#60a5fa" transform="rotate(-20 155 100)" />
    </svg>
  );
}

function IllustrationHackSoar() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <radialGradient id="il2bg" cx="50%" cy="60%" r="55%"><stop offset="0%" stopColor="#0f2b18" /><stop offset="100%" stopColor="#050d08" /></radialGradient>
      </defs>
      <rect width="200" height="200" fill="url(#il2bg)" />
      <g stroke="#22c55e" strokeWidth="0.8" opacity="0.3" fill="none">
        <line x1="0" y1="40" x2="60" y2="40" /><line x1="60" y1="40" x2="60" y2="80" />
        <line x1="60" y1="80" x2="120" y2="80" /><line x1="120" y1="80" x2="120" y2="30" />
        <circle cx="60" cy="40" r="3" fill="#22c55e" opacity="0.5" />
        <circle cx="120" cy="80" r="3" fill="#22c55e" opacity="0.5" />
      </g>
      <rect x="30" y="90" width="55" height="35" rx="4" fill="#142a1a" stroke="#22c55e" strokeWidth="1.2" />
      <rect x="33" y="93" width="49" height="27" rx="2" fill="#0a1a0f" />
      <text x="38" y="105" fontSize="5" fill="#22c55e" fontFamily="monospace">&#60;/&#62;</text>
      <text x="38" y="112" fontSize="4" fill="#4ade80" fontFamily="monospace">while(true)</text>
      <text x="38" y="118" fontSize="4" fill="#86efac" fontFamily="monospace">  hack();</text>
      <rect x="25" y="125" width="65" height="4" rx="2" fill="#142a1a" stroke="#22c55e" strokeWidth="0.8" />
      <rect x="110" y="75" width="60" height="38" rx="4" fill="#142a1a" stroke="#4ade80" strokeWidth="1.2" />
      <rect x="113" y="78" width="54" height="30" rx="2" fill="#0a1a0f" />
      <text x="118" y="90" fontSize="5" fill="#4ade80" fontFamily="monospace">import ai</text>
      <text x="118" y="98" fontSize="4" fill="#22c55e" fontFamily="monospace">model.train()</text>
      <text x="118" y="106" fontSize="4" fill="#86efac" fontFamily="monospace">print(&apos;🚀&apos;)</text>
      <rect x="105" y="113" width="70" height="4" rx="2" fill="#142a1a" stroke="#4ade80" strokeWidth="0.8" />
      <circle cx="100" cy="50" r="8" fill="none" stroke="#22c55e" strokeWidth="1.5" opacity="0.6" />
      <circle cx="100" cy="50" r="4" fill="#22c55e" opacity="0.8" />
      <circle cx="100" cy="50" r="14" fill="none" stroke="#22c55e" strokeWidth="0.5" opacity="0.25" />
      <polyline points="96,10 100,30 90,32 100,55" stroke="#fbbf24" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.8" />
      <text x="10" y="185" fontSize="7" fill="#22c55e" opacity="0.15" fontFamily="monospace">101010110100</text>
      <text x="120" y="190" fontSize="7" fill="#22c55e" opacity="0.12" fontFamily="monospace">010110111</text>
    </svg>
  );
}

function IllustrationOpenMic() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <radialGradient id="il3bg" cx="50%" cy="40%" r="55%"><stop offset="0%" stopColor="#2a1a08" /><stop offset="100%" stopColor="#0f0a04" /></radialGradient>
      </defs>
      <rect width="200" height="200" fill="url(#il3bg)" />
      <g>
        {[20, 50, 80, 110, 140, 170].map((x, i) => (
          <g key={i}>
            <line x1={x} y1="0" x2={x + 15} y2="20" stroke="#a78bfa" strokeWidth="0.8" opacity="0.3" />
            <circle cx={x + 15} cy="20" r="3" fill={i % 2 === 0 ? '#fbbf24' : '#f87171'} />
            <circle cx={x + 15} cy="20" r="5" fill={i % 2 === 0 ? '#fbbf24' : '#f87171'} opacity="0.2" />
          </g>
        ))}
      </g>
      <g fill="#1a0e05" opacity="0.85">
        {[10, 40, 70, 100, 130, 160].map((x, i) => (
          <g key={i}>
            <circle cx={x + 10} cy={165 + (i % 3 === 1 ? -8 : 0)} r={7 + i % 2} />
            <rect x={x + 4} y={165 + (i % 3 === 1 ? -8 : 0)} width={12} height={20} rx="3" />
          </g>
        ))}
      </g>
      <rect x="65" y="133" width="70" height="5" rx="2" fill="#a67c52" opacity="0.6" />
      <ellipse cx="100" cy="165" rx="30" ry="8" fill="rgba(251,191,36,0.12)" />
      <path d="M75,0 L85,133 L115,133 L125,0" fill="rgba(251,191,36,0.04)" />
      <circle cx="100" cy="108" r="8" fill="#f59e0b" />
      <rect x="94" y="116" width="12" height="22" rx="5" fill="#d97706" />
      <line x1="100" y1="125" x2="88" y2="133" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
      <line x1="100" y1="125" x2="112" y2="133" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
      <circle cx="100" cy="100" r="5" fill="#6b7280" stroke="#9ca3af" strokeWidth="1" />
      <line x1="100" y1="105" x2="100" y2="118" stroke="#6b7280" strokeWidth="2" />
      <text x="22" y="80" fontSize="9" fill="#fbbf24" opacity="0.65" fontStyle="italic">&quot;words...&quot;</text>
      <text x="132" y="68" fontSize="8" fill="#f87171" opacity="0.55" fontStyle="italic">&quot;poetry&quot;</text>
      <text x="42" y="98" fontSize="7" fill="#a78bfa" opacity="0.5" fontStyle="italic">&quot;stories&quot;</text>
    </svg>
  );
}

function IllustrationAIWorkshop() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <radialGradient id="il4bg" cx="50%" cy="50%" r="55%"><stop offset="0%" stopColor="#0a1a2e" /><stop offset="100%" stopColor="#04090f" /></radialGradient>
      </defs>
      <rect width="200" height="200" fill="url(#il4bg)" />
      <g stroke="#22c55e" strokeWidth="0.7" opacity="0.35" fill="none">
        <line x1="40" y1="60" x2="100" y2="40" /><line x1="40" y1="100" x2="100" y2="40" />
        <line x1="40" y1="140" x2="100" y2="80" /><line x1="40" y1="100" x2="100" y2="80" />
        <line x1="40" y1="60" x2="100" y2="80" /><line x1="40" y1="140" x2="100" y2="120" />
        <line x1="40" y1="100" x2="100" y2="120" />
        <line x1="100" y1="40" x2="160" y2="70" /><line x1="100" y1="80" x2="160" y2="70" />
        <line x1="100" y1="40" x2="160" y2="110" /><line x1="100" y1="80" x2="160" y2="110" />
        <line x1="100" y1="120" x2="160" y2="110" /><line x1="100" y1="120" x2="160" y2="150" />
        <line x1="100" y1="80" x2="160" y2="150" />
      </g>
      {[60, 100, 140].map((y, i) => (
        <g key={i}><circle cx="40" cy={y} r="8" fill="#0f172a" stroke="#22c55e" strokeWidth="1.5" /><circle cx="40" cy={y} r="4" fill="#22c55e" opacity="0.7" /></g>
      ))}
      {[40, 80, 120].map((y, i) => (
        <g key={i}><circle cx="100" cy={y} r="9" fill="#0f172a" stroke="#4ade80" strokeWidth="1.5" /><circle cx="100" cy={y} r="4" fill="#4ade80" opacity="0.7" /></g>
      ))}
      {[70, 110, 150].map((y, i) => (
        <g key={i}><circle cx="160" cy={y} r="8" fill="#0f172a" stroke="#86efac" strokeWidth="1.5" /><circle cx="160" cy={y} r="4" fill="#86efac" opacity="0.7" /></g>
      ))}
      <ellipse cx="100" cy="175" rx="40" ry="15" fill="#142a1a" stroke="#22c55e" strokeWidth="0.8" opacity="0.4" />
      <text x="72" y="179" fontSize="7" fill="#22c55e" opacity="0.7" fontFamily="monospace">AI · ML · DL</text>
      <circle cx="100" cy="90" r="72" fill="none" stroke="#22c55e" strokeWidth="0.5" opacity="0.07" />
    </svg>
  );
}

function IllustrationPixelLens() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="il5bg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#1a1a0a" /><stop offset="100%" stopColor="#0a0a18" /></linearGradient>
      </defs>
      <rect width="200" height="200" fill="url(#il5bg)" />
      <rect x="20" y="30" width="70" height="55" rx="3" fill="#1a1200" stroke="#a67c52" strokeWidth="1.5" />
      <rect x="23" y="33" width="64" height="49" rx="2" fill="#2a1a08" />
      <ellipse cx="55" cy="57" rx="20" ry="15" fill="#a67c52" opacity="0.4" />
      <circle cx="55" cy="47" r="8" fill="#fbbf24" opacity="0.35" />
      <rect x="110" y="20" width="70" height="65" rx="3" fill="#1a1200" stroke="#3d8b5e" strokeWidth="1.5" />
      <rect x="113" y="23" width="64" height="59" rx="2" fill="#0f2016" />
      <polygon points="113,78 135,35 157,78" fill="#22c55e" opacity="0.3" />
      <polygon points="125,78 148,48 175,78" fill="#3d8b5e" opacity="0.22" />
      <rect x="20" y="110" width="75" height="60" rx="3" fill="#1a1200" stroke="#7dbf87" strokeWidth="1.5" />
      <rect x="23" y="113" width="69" height="54" rx="2" fill="#142a1a" />
      <circle cx="57" cy="140" r="20" fill="none" stroke="#7dbf87" strokeWidth="2" opacity="0.5" />
      <circle cx="70" cy="148" r="15" fill="none" stroke="#3d8b5e" strokeWidth="2" opacity="0.4" />
      <circle cx="45" cy="152" r="12" fill="none" stroke="#a67c52" strokeWidth="2" opacity="0.4" />
      <rect x="105" y="110" width="75" height="60" rx="3" fill="#1a1200" stroke="#a67c52" strokeWidth="1.5" />
      <rect x="108" y="113" width="69" height="54" rx="2" fill="#2a1a08" />
      <circle cx="142" cy="133" r="12" fill="#d97706" opacity="0.35" />
      <rect x="130" y="145" width="24" height="15" rx="5" fill="#d97706" opacity="0.25" />
      <rect x="82" y="88" width="36" height="26" rx="4" fill="#374151" />
      <circle cx="100" cy="101" r="8" fill="#111827" stroke="#6b7280" strokeWidth="1.5" />
      <circle cx="100" cy="101" r="5" fill="#1f2937" />
      <circle cx="100" cy="101" r="2" fill="#4b5563" />
      <rect x="85" y="84" width="10" height="5" rx="2" fill="#374151" />
    </svg>
  );
}

function IllustrationWeb3() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <radialGradient id="il6bg" cx="50%" cy="50%" r="55%"><stop offset="0%" stopColor="#0f0a2e" /><stop offset="100%" stopColor="#04040f" /></radialGradient>
      </defs>
      <rect width="200" height="200" fill="url(#il6bg)" />
      <g stroke="#a78bfa" strokeWidth="1.2" opacity="0.4" fill="none" strokeDasharray="4 2">
        <line x1="30" y1="100" x2="75" y2="80" /><line x1="75" y1="80" x2="125" y2="80" />
        <line x1="125" y1="80" x2="170" y2="100" /><line x1="170" y1="100" x2="125" y2="120" />
        <line x1="125" y1="120" x2="75" y2="120" /><line x1="75" y1="120" x2="30" y2="100" />
      </g>
      {[{ x: 10, y: 85, c: '#7c3aed' }, { x: 60, y: 62, c: '#6d28d9' }, { x: 110, y: 62, c: '#5b21b6' }, { x: 155, y: 85, c: '#7c3aed' }, { x: 110, y: 108, c: '#6d28d9' }, { x: 60, y: 108, c: '#5b21b6' }].map((b, i) => (
        <g key={i} transform={`translate(${b.x},${b.y})`}>
          <rect width="30" height="30" rx="4" fill={b.c} opacity="0.7" />
          <text x="5" y="13" fontSize="6" fill="#e9d5ff" fontFamily="monospace" opacity="0.8">0x{i}a</text>
          <text x="5" y="21" fontSize="5" fill="#c4b5fd" fontFamily="monospace" opacity="0.6">#{i + 1}f2e</text>
        </g>
      ))}
      <g transform="translate(85,150)" opacity="0.65">
        <polygon points="15,0 0,22 15,30 30,22" fill="#a78bfa" opacity="0.8" />
        <polygon points="15,0 0,22 15,17" fill="#7c3aed" />
        <polygon points="15,30 0,22 15,17 30,22" fill="#7c3aed" opacity="0.6" />
      </g>
      <circle cx="100" cy="100" r="60" fill="none" stroke="#7c3aed" strokeWidth="0.5" opacity="0.15" />
      <circle cx="100" cy="100" r="80" fill="none" stroke="#a78bfa" strokeWidth="0.3" opacity="0.08" />
    </svg>
  );
}

const ILLUSTRATIONS_MAP: Record<number, () => React.JSX.Element> = {
  1: IllustrationSoarFest,
  2: IllustrationHackSoar,
  3: IllustrationOpenMic,
  4: IllustrationAIWorkshop,
  5: IllustrationPixelLens,
  6: IllustrationWeb3,
};

/* ─── Single timeline card ─── */
function TLCard({ event, side }: { event: SoarEvent; side: 'left' | 'right' }) {
  const pct = Math.round((event.registered / event.seats) * 100);
  const hot = pct >= 85;
  const IllustrationComponent = ILLUSTRATIONS_MAP[event.id] ?? IllustrationSoarFest;

  return (
    <div className="tlc" id={`tlc-${event.id}`} style={{ flexDirection: side === 'right' ? 'row-reverse' : 'row' }}>
      <div className="tlc__art">
        <IllustrationComponent />
        <span className="tlc__emoji">{event.category === 'Cultural' ? '🎭' : '⚡'}</span>
        <span className="tlc__cat-badge">{event.category}</span>
      </div>

      <div className="tlc__body">
        <div className="tlc__top">
          <span className="tlc__tag">{event.tag}</span>
          <span className="tlc__date">{event.date}</span>
        </div>

        <h3 className="tlc__title">{event.title}</h3>

        <ul className="tlc__meta">
          <li><span>🕐</span>{event.time}</li>
          <li><span>📍</span>{event.location}</li>
        </ul>

        <p className="tlc__desc">{event.description}</p>

        <div className="tlc__footer">
          <div className="tlc__bar-wrap">
            <div className="tlc__bar-labels">
              <span>Seats</span>
              <span className={hot ? 'tlc__hot' : ''}>{event.registered}/{event.seats}{hot ? ' 🔥' : ''}</span>
            </div>
            <div className="tlc__bar"><div className="tlc__bar-fill" style={{ width: `${pct}%` }} /></div>
          </div>
          <button className="tlc__btn" id={`register-${event.id}`}>Register →</button>
        </div>
      </div>

      <style jsx>{`
        .tlc {
          display: flex;
          width: 480px;
          max-width: 46vw;
          border-radius: 24px;
          overflow: hidden;
          background: var(--bg-card);
          border: 1px solid var(--border);
          box-shadow: 0 20px 60px rgba(0,0,0,0.2), 0 0 0 1px var(--border);
          transition: box-shadow 0.35s ease, transform 0.35s ease;
        }

        .tlc:hover {
          box-shadow: 0 32px 80px rgba(0,0,0,0.3), 0 0 40px var(--glow);
          transform: translateY(-4px);
        }

        .tlc__art {
          position: relative;
          width: 150px;
          flex-shrink: 0;
          overflow: hidden;
        }

        .tlc__emoji {
          position: absolute;
          top: 10px;
          left: 10px;
          font-size: 1.4rem;
          filter: drop-shadow(0 2px 8px rgba(0,0,0,0.6));
        }

        .tlc__cat-badge {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.6rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 3px 10px;
          border-radius: 50px;
          background: rgba(0,0,0,0.55);
          color: var(--accent-2);
          border: 1px solid var(--border);
          white-space: nowrap;
          backdrop-filter: blur(6px);
        }

        .tlc__body {
          flex: 1;
          padding: 18px 16px;
          display: flex;
          flex-direction: column;
          gap: 9px;
          min-width: 0;
        }

        .tlc__top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .tlc__tag {
          font-size: 0.62rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--accent-1);
        }

        .tlc__date {
          font-size: 0.68rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .tlc__title {
          font-size: clamp(0.85rem, 1.5vw, 1.05rem);
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          line-height: 1.25;
        }

        .tlc__meta {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 3px;
          font-size: 0.72rem;
          color: var(--text-secondary);
        }

        .tlc__meta li {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .tlc__desc {
          font-size: 0.75rem;
          line-height: 1.55;
          color: var(--text-muted);
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex: 1;
        }

        .tlc__footer {
          display: flex;
          align-items: flex-end;
          gap: 10px;
          margin-top: auto;
        }

        .tlc__bar-wrap {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .tlc__bar-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.62rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .tlc__hot { color: #f59e0b !important; }

        .tlc__bar {
          height: 4px;
          background: var(--bg-secondary);
          border-radius: 100px;
          overflow: hidden;
        }

        .tlc__bar-fill {
          height: 100%;
          background: var(--gradient-accent);
          border-radius: 100px;
          box-shadow: 0 0 6px var(--glow);
        }

        .tlc__btn {
          flex-shrink: 0;
          padding: 8px 14px;
          border-radius: 10px;
          border: none;
          background: var(--gradient-accent);
          color: #fff;
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 4px 14px var(--glow);
          transition: transform 0.2s, box-shadow 0.2s;
          white-space: nowrap;
        }

        .tlc__btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 22px var(--glow);
        }
      `}</style>
    </div>
  );
}

/* ─── Glowing milestone node ─── */
function MilestoneNode({ idx }: { idx: number }) {
  return (
    <div className="mnode" id={`mnode-${idx}`}>
      <div className="mnode__outer" />
      <div className="mnode__inner" />
      <span className="mnode__num">{String(idx + 1).padStart(2, '0')}</span>
      <style jsx>{`
        .mnode {
          position: relative;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .mnode__outer {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid var(--accent-1);
          animation: node-spin 3s linear infinite;
        }
        .mnode__inner {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--gradient-accent);
          box-shadow: 0 0 14px var(--glow), 0 0 28px var(--glow);
          flex-shrink: 0;
        }
        .mnode__num {
          position: absolute;
          top: -22px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.6rem;
          font-weight: 900;
          color: var(--accent-1);
          opacity: 0.7;
          letter-spacing: 0.05em;
          white-space: nowrap;
        }
        @keyframes node-spin {
          0%   { transform: rotate(0deg) scale(1); border-color: var(--accent-1); }
          50%  { transform: rotate(180deg) scale(1.15); border-color: var(--accent-2); }
          100% { transform: rotate(360deg) scale(1); border-color: var(--accent-1); }
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════
   PAGE
═══════════════════════════════════════ */
export default function TrialEventsPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<SVGPathElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    const nodes = nodeRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!cards.length) return;

    const ctx = gsap.context(() => {

      /* ── Hero text entrance ── */
      gsap.from('.te-eyebrow', { y: 28, opacity: 0, duration: 0.9, ease: 'power3.out' });
      gsap.from('.te-title', { y: 44, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.15 });
      gsap.from('.te-sub', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.3 });

      /* ── SVG path progressive draw ── */
      if (progressRef.current) {
        const len = progressRef.current.getTotalLength();
        gsap.set(progressRef.current, { strokeDasharray: len, strokeDashoffset: len });
        ScrollTrigger.create({
          trigger: '.te-timeline',
          start: 'top 85%',
          end: 'bottom 15%',
          scrub: 0.7,
          onUpdate: (self) => {
            if (progressRef.current) {
              gsap.set(progressRef.current, { strokeDashoffset: len * (1 - self.progress) });
            }
          },
        });
      }

      /* ── Cards bloom in from sides ── */
      cards.forEach((card, i) => {
        const fromX = i % 2 === 0 ? -90 : 90;
        gsap.set(card, { x: fromX, opacity: 0, scale: 0.82, filter: 'blur(4px)' });

        ScrollTrigger.create({
          trigger: card,
          start: 'top 84%',
          onEnter: () => {
            gsap.to(card, {
              x: 0, opacity: 1, scale: 1,
              filter: 'blur(0px)',
              duration: 1, ease: 'back.out(1.6)', delay: 0.04,
            });
          },
          onLeaveBack: () => {
            gsap.to(card, {
              x: fromX, opacity: 0, scale: 0.82,
              filter: 'blur(4px)',
              duration: 0.45, ease: 'power2.in',
            });
          },
        });
      });

      /* ── Milestone nodes pop in ── */
      nodes.forEach((node, i) => {
        gsap.set(node, { scale: 0, opacity: 0 });
        ScrollTrigger.create({
          trigger: cards[i],
          start: 'top 80%',
          onEnter: () => {
            gsap.to(node, { scale: 1, opacity: 1, duration: 0.55, ease: 'back.out(3)', delay: 0.15 });
          },
          onLeaveBack: () => {
            gsap.to(node, { scale: 0, opacity: 0, duration: 0.3, ease: 'power2.in' });
          },
        });
      });

      /* ── Ambient floating particles ── */
      const container = particlesRef.current;
      if (container) {
        const spawn = () => {
          const el = document.createElement('div');
          const sz = Math.random() * 7 + 3;
          el.style.cssText = `
            position:absolute; width:${sz}px; height:${sz}px; border-radius:50%;
            background:var(--accent-${Math.random() > 0.55 ? '1' : '2'});
            left:${Math.random() * 100}%; bottom:0; opacity:0; pointer-events:none;
            will-change:transform,opacity;
          `;
          container.appendChild(el);
          gsap.to(el, {
            y: -(Math.random() * 400 + 150),
            x: (Math.random() - 0.5) * 140,
            opacity: Math.random() * 0.55 + 0.15,
            duration: Math.random() * 5 + 3,
            ease: 'none',
            onComplete: () => {
              gsap.to(el, { opacity: 0, duration: 0.6, onComplete: () => el.remove() });
            },
          });
        };
        const id = setInterval(spawn, 550);
        return () => clearInterval(id);
      }

    }, pageRef);

    return () => ctx.revert();
  }, []);

  /* SVG path — same S-curve rendered in a tall viewBox */
  const PATH_D = 'M100,0 C200,160 0,280 100,450 C200,620 0,740 100,920 C200,1100 0,1220 100,1400 C200,1580 0,1680 100,1850';

  return (
    <>
      <Navbar />

      <div ref={pageRef} className="te-page" id="trial-events-page">

        {/* Particle layer */}
        <div ref={particlesRef} className="te-particles" aria-hidden="true" />

        {/* Hero */}
        <header className="te-header">
          <div className="te-header-glow" aria-hidden="true" />
          <p className="te-eyebrow">SoarJMI · 2025 · Trial Layout</p>
          <h1 className="te-title">
            Our <span className="accent-gradient">Events</span>
          </h1>
          <p className="te-sub">
            {EVENTS.length} curated experiences · <em>Scroll to explore</em>
          </p>
          <div className="te-scroll-hint" aria-label="Scroll down">
            <span />
            <small>scroll</small>
          </div>
        </header>

        {/* Timeline */}
        <div className="te-timeline" id="te-timeline">

          {/* S-curve track (centred column) */}
          <div className="te-track" aria-hidden="true">
            <svg
              viewBox="0 0 200 1850"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
            >
              <defs>
                <linearGradient id="tpg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent-1)" stopOpacity="0.5" />
                  <stop offset="50%" stopColor="var(--accent-2)" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="var(--accent-1)" stopOpacity="0.5" />
                </linearGradient>
                <filter id="tpglow" x="-20%" y="-5%" width="140%" height="110%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              {/* Ghost track */}
              <path d={PATH_D} stroke="var(--border)" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6" />
              {/* Animated progress */}
              <path ref={progressRef} d={PATH_D} stroke="url(#tpg)" strokeWidth="3" fill="none" strokeLinecap="round" filter="url(#tpglow)" />
            </svg>
          </div>

          {/* Event rows */}
          {EVENTS.map((ev, i) => {
            const side = i % 2 === 0 ? 'left' : 'right';
            return (
              <div key={ev.id} className={`te-row te-row--${side}`} id={`te-row-${ev.id}`}>
                {/* Card */}
                <div
                  ref={(el) => { cardRefs.current[i] = el; }}
                  className={`te-card-col te-card-col--${side}`}
                >
                  <TLCard event={ev} side={side} />
                </div>

                {/* Node */}
                <div
                  ref={(el) => { nodeRefs.current[i] = el; }}
                  className="te-node-col"
                >
                  <MilestoneNode idx={i} />
                </div>

                {/* Empty spacer */}
                <div className="te-spacer-col" />
              </div>
            );
          })}
        </div>

        {/* Bottom fade */}
        <div className="te-bottom-glow" aria-hidden="true" />
      </div>

      <style jsx global>{`
        /* ── Page ── */
        .te-page {
          min-height: 100vh;
          background: var(--bg-primary);
          position: relative;
          overflow: hidden;
          padding-bottom: 160px;
        }

        .te-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        /* ── Hero ── */
        .te-header {
          position: relative;
          text-align: center;
          padding: 140px 5% 80px;
          z-index: 5;
        }

        .te-header-glow {
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 65vw; height: 320px;
          background: radial-gradient(ellipse at center, var(--glow) 0%, transparent 65%);
          pointer-events: none;
        }

        .te-eyebrow {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.22em;
          color: var(--accent-1);
          margin-bottom: 14px;
        }

        .te-title {
          font-size: clamp(2.5rem, 7vw, 5rem);
          font-weight: 900;
          letter-spacing: -0.035em;
          color: var(--text-primary);
          line-height: 1;
          margin-bottom: 16px;
        }

        .te-sub {
          font-size: 1rem;
          color: var(--text-muted);
        }

        .te-sub em {
          font-style: normal;
          color: var(--accent-1);
          font-weight: 600;
        }

        .te-scroll-hint {
          margin-top: 28px;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: var(--text-muted);
          font-size: 0.68rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.14em;
        }

        .te-scroll-hint span {
          display: block;
          width: 1.5px;
          height: 36px;
          background: linear-gradient(to bottom, transparent, var(--accent-1));
          animation: te-line-bounce 1.6s ease-in-out infinite;
        }

        @keyframes te-line-bounce {
          0%,100% { transform: scaleY(1); opacity: 0.5; }
          50%      { transform: scaleY(1.2); opacity: 1; }
        }

        /* ── Timeline ── */
        .te-timeline {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 30px;
        }

        /* Track SVG (spans the full height of te-timeline) */
        .te-track {
          position: absolute;
          left: 50%;
          top: 0;
          transform: translateX(-50%);
          width: 80px;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        /* ── Rows ── */
        .te-row {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 80px 1fr;
          align-items: center;
          min-height: 200px;
          margin-bottom: 110px;
          z-index: 2;
        }

        /* Card left */
        .te-card-col--left {
          grid-column: 1;
          display: flex;
          justify-content: flex-end;
          padding-right: 24px;
        }

        /* Card right */
        .te-card-col--right {
          grid-column: 3;
          display: flex;
          justify-content: flex-start;
          padding-left: 24px;
        }

        /* Node (always centre) */
        .te-node-col {
          grid-column: 2;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* Spacer fills the empty side */
        .te-row--left  .te-spacer-col { grid-column: 3; }
        .te-row--right .te-spacer-col { grid-column: 1; }

        /* ── Row order fixes ── */
        .te-row--left  .te-card-col--left  { grid-row: 1; }
        .te-row--left  .te-node-col        { grid-row: 1; }
        .te-row--left  .te-spacer-col      { grid-row: 1; }

        .te-row--right .te-spacer-col      { grid-row: 1; }
        .te-row--right .te-node-col        { grid-row: 1; }
        .te-row--right .te-card-col--right { grid-row: 1; }

        /* ── Bottom glow ── */
        .te-bottom-glow {
          position: absolute;
          bottom: 0; left: 50%;
          transform: translateX(-50%);
          width: 60vw; height: 200px;
          background: radial-gradient(ellipse at center, var(--glow) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ── Mobile collapse ── */
        @media (max-width: 680px) {
          .te-row {
            grid-template-columns: 50px 1fr;
            grid-template-rows: auto;
            margin-bottom: 64px;
          }

          .te-card-col--left,
          .te-card-col--right {
            grid-column: 2 !important;
            grid-row: 1;
            padding: 0 0 0 16px !important;
            justify-content: flex-start !important;
          }

          .te-node-col {
            grid-column: 1 !important;
            grid-row: 1;
          }

          .te-spacer-col { display: none !important; }

          .te-track { left: 25px; transform: none; }

          .tlc { width: 100% !important; max-width: 100% !important; flex-direction: column !important; }
          .tlc__art { width: 100% !important; height: 140px !important; border-bottom: 1px solid var(--border); }
        }
      `}</style>
    </>
  );
}
