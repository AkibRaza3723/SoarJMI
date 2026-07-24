'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const COURSES = [
  {
    title: 'B.Tech 1st Sem',
    description: 'Comprehensive study materials, lecture notes, and previous year question papers for engineering freshmen.',
    subjects: [
      { name: 'Sem 1', link: 'https://drive.google.com/drive/folders/1V_MejIW96nSzHdbgIphz7_hiN3s-Wqf5', icon: '➗' },
      { name: 'Sem 2', link: 'https://drive.google.com/drive/folders/1_2To9U_dFWw7CG_tNjOVbghVSSeX2RF_', icon: '✖️' },
    ]
  },
  {
    title: 'BBA 1st Year',
    description: 'Curated resources covering core business concepts, management principles, and financial foundations.',
    subjects: [
      { name: 'Sem 1', link: '#', icon: '➗' },
      { name: 'Sem 2', link: '#', icon: '' },
    ]
  }
];

export default function NotesPage() {
  return (
    <main className="notes-page">
      <Navbar />

      {/* Hero Section */}
      <section className="notes-hero">
        <div className="hero-content">
          <p className="hero-eyebrow">
            <span className="eyebrow-dot" /> Academic Resources
          </p>
          <h1 className="hero-title">
            Study <span className="accent-gradient">Notes</span> Hub
          </h1>
          <p className="hero-subtitle">
            Access curated study materials, lecture notes, and resources for your first year at Jamia Millia Islamia. Empowering your academic journey with structured content.
          </p>
        </div>
        
        {/* Background Decorative Elements */}
        <div className="hero-glow hero-glow-1"></div>
        <div className="hero-glow hero-glow-2"></div>
      </section>

      {/* Courses Section */}
      <section className="courses-section">
        <div className="courses-container">
          {COURSES.map((course, index) => (
            <div 
              key={course.title} 
              className="course-block"
            >
              <div className="course-header">
                <h2 className="course-title course-text-anim">{course.title}</h2>
                <p className="course-desc course-text-anim">{course.description}</p>
                <div className="course-divider course-text-anim"></div>
              </div>

              <div className="subjects-grid">
                {course.subjects.map((subject) => (
                  <a key={subject.name} href={subject.link} target="_blank" rel="noopener noreferrer" className="subject-card">
                    <div className="subject-icon-wrap">
                      <span className="subject-icon">{subject.icon}</span>
                    </div>
                    <div className="subject-info">
                      <h3 className="subject-name">{subject.name}</h3>
                      <span className="subject-action">
                        Access Drive 
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </span>
                    </div>
                    <div className="card-hover-effect"></div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />

      <style jsx>{`
        .notes-page {
          background: var(--bg-primary);
          min-height: 100vh;
          overflow: hidden;
        }

        /* ── Hero Section ── */
        .notes-hero {
          position: relative;
          padding: 180px 6% 100px;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          border-bottom: 1px solid var(--border);
        }

        .hero-content {
          position: relative;
          z-index: 10;
          max-width: 700px;
        }

        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: var(--fs-label-caps);
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent-1);
          margin-bottom: 20px;
          background: var(--surface-variant);
          padding: 6px 16px;
          border-radius: 30px;
          border: 1px solid var(--border);
        }

        .eyebrow-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--gradient-accent);
        }

        .hero-title {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin-bottom: 24px;
        }

        .hero-subtitle {
          font-size: 1.1rem;
          line-height: 1.7;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto;
        }

        .hero-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.15;
          z-index: 1;
        }

        .hero-glow-1 {
          top: 10%;
          left: 20%;
          width: 400px;
          height: 400px;
          background: var(--accent-1);
        }

        .hero-glow-2 {
          bottom: 10%;
          right: 20%;
          width: 300px;
          height: 300px;
          background: var(--accent-2);
        }

        /* ── Courses Section ── */
        .courses-section {
          padding: 80px 6% 120px;
          background: var(--bg-secondary);
        }

        .courses-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 100px;
        }

        .course-block {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .course-header {
          max-width: 600px;
        }

        .course-title {
          font-size: 2.2rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 12px;
          letter-spacing: -0.01em;
        }

        .course-desc {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .course-divider {
          width: 60px;
          height: 4px;
          background: var(--gradient-accent);
          border-radius: 4px;
        }

        .subjects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }

        .subject-card {
          position: relative;
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 24px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          text-decoration: none;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        }

        .subject-card:hover {
          transform: translateY(-5px);
          border-color: var(--accent-1);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
        }

        .subject-icon-wrap {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 56px;
          height: 56px;
          background: var(--surface-variant);
          border-radius: 12px;
          flex-shrink: 0;
          border: 1px solid var(--border);
          transition: all 0.3s ease;
        }

        .subject-icon {
          font-size: 1.5rem;
        }

        .subject-card:hover .subject-icon-wrap {
          background: var(--accent-1);
          border-color: var(--accent-1);
          color: #fff;
        }

        .subject-info {
          display: flex;
          flex-direction: column;
          gap: 8px;
          z-index: 2;
        }

        .subject-name {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0;
        }

        .subject-action {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          font-family: var(--font-mono);
          text-transform: uppercase;
          color: var(--accent-1);
          letter-spacing: 0.05em;
          transition: gap 0.3s ease;
        }

        .subject-card:hover .subject-action {
          gap: 10px;
        }

        .card-hover-effect {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .subject-card:hover .card-hover-effect {
          opacity: 1;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .notes-hero {
            padding: 140px 5% 80px;
          }
          .hero-title {
            font-size: 2.2rem;
          }
          .subjects-grid {
            grid-template-columns: 1fr;
          }
          .courses-section {
            padding: 60px 5% 80px;
          }
          .courses-container {
            gap: 70px;
          }
        }
      `}</style>
    </main>
  );
}
