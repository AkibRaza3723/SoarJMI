'use client';

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  quote: string;
  social?: string;
}

const TEAM: TeamMember[] = [
  {
    name: 'Anam Tabrez',
    role: 'President',
    avatar: `https://res.cloudinary.com/wyuzj0og/image/upload/v1784204156/anam_lqyqxf.jpg`,
    quote: 'United we stand, together we shine',
    social: 'https://www.linkedin.com/in/anamtabrez/',
  },
  {
    name: 'Mohd Faizan',
    role: 'Vice President',
    avatar: 'https://res.cloudinary.com/wyuzj0og/image/upload/v1784204713/Faizan_or6ar8.jpg',
    quote: 'Let\'s not be strangers, let\'s be family.',
    social: 'https://www.linkedin.com/in/mohd-faizan-005942343/',
  },
  {
    name: 'Mohammad Ayan Khan',
    role: 'General Secretary',
    avatar: 'https://res.cloudinary.com/wyuzj0og/image/upload/v1784204076/ayaan_alhdtt.jpg',
    quote: 'Every role is an opportunity to make a difference.',
    social: 'https://www.linkedin.com/in/mohammadayan8318/',
  },
  {
    name: 'Muhammad Sufyan Nehal',
    role: 'Joint Secretary',
    avatar: 'https://res.cloudinary.com/wyuzj0og/image/upload/v1784798675/sufyan_xmpg7l.jpg',
    quote: 'Success is measured by what you achieve; character is measured by how you achieve it.',
    social: 'https://www.linkedin.com/in/muhammad-sufyan-nehal-95b29a381/',
  },
];

const HEADS: TeamMember[] = [
  {
    name: 'Iqra Akhtar',
    role: 'HR Head',
    avatar: 'https://res.cloudinary.com/wyuzj0og/image/upload/v1784204529/iqra_lkafer.jpg',
    quote: 'Be a good person',
  },
  {
    name: 'Faiz Khan',
    role: 'Content Head',
    avatar: 'https://res.cloudinary.com/wyuzj0og/image/upload/v1785173327/20260717_180457_-_Faiz_Khan_j2oufc.jpg',
    quote: 'Words that matter.',
  },
  {
    name: 'Akib Raza',
    role: 'Tech Head',
    avatar: 'https://res.cloudinary.com/wyuzj0og/image/upload/v1785173135/akibraza_evdrbt.jpg',
    quote: 'Destroying the foundation.',
  },
  {
    name: 'Sayma Nasim',
    role: 'Tech Head',
    avatar: 'https://res.cloudinary.com/wyuzj0og/image/upload/v1785173830/sayma_v7nj9e.jpg',
    quote: 'Building the foundation.',
  },
  {
    name: 'Sidra Arshad',
    role: 'Graphics Head',
    avatar: 'https://res.cloudinary.com/wyuzj0og/image/upload/v1785173397/IMG_20260713_095902_-_Sidra_Arshad_qovp8v.jpg',
    quote: 'Designing the future.',
  },
  {
    name: 'Azmat Siddiqui',
    role: 'Research Head',
    avatar: 'https://res.cloudinary.com/wyuzj0og/image/upload/v1785176282/azmat_l4ftek.png',
    quote: 'Discovering knowledge.',
  },
  {
    name: 'Ibarat Ali',
    role: 'Operations Head',
    avatar: 'https://res.cloudinary.com/wyuzj0og/image/upload/v1785173720/ibarat_vyy4zk.jpg',
    quote: 'Ensuring smooth execution.',
  },
  {
    name: 'Faheem Arif',
    role: 'SMM Head',
    avatar: 'https://res.cloudinary.com/wyuzj0og/image/upload/v1785174188/faheem_vnwlxe.jpg',
    quote: 'Connecting with the world.',
  },
  {
    name: 'Nischay Kumar',
    role: 'P&V Head',
    avatar: 'https://res.cloudinary.com/wyuzj0og/image/upload/v1785173270/WhatsApp_Image_2026-07-17_at_19.45.23_-_GRIM_obi7ia.jpg',
    quote: 'Capturing moments.',
  },
  {
    name: 'Arshad Ali',
    role: 'Sponsorship Head.',
    avatar: 'https://res.cloudinary.com/wyuzj0og/image/upload/v1785176668/arshad_h6sk1z.jpg',
    quote: 'Connecting with the world.',
  },
];

function MemberCard({ member, index, variant }: { member: TeamMember; index: number; variant: 'eb' | 'head' }) {
  const handleClick = () => {
    if (member.social) {
      window.open(member.social, '_blank');
    }
  };

  const isEB = variant === 'eb';

  return (
    <div
      className={`member-card glass-card ${variant}-card`}
      onClick={handleClick}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="card-glow" />
      <div className="member-avatar">
        {member.avatar.startsWith('http') || member.avatar.startsWith('/') ? (
          <img src={member.avatar} alt={member.name} className="avatar-img" />
        ) : (
          member.avatar
        )}
      </div>
      <div className="member-role">{member.role}</div>
      <h3 className="member-name">{member.name}</h3>
      <p className="member-quote">"{member.quote}"</p>
      <div className="card-divider" />
      <div className="card-footer">
        <span className="card-tag">SoarJMI</span>
        <span className="card-tag">2026–27</span>
      </div>

      <style jsx>{`
        .member-card {
          position: relative;
          padding: ${isEB ? '36px 28px' : '26px 20px'};
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: ${isEB ? '10px' : '8px'};
          overflow: hidden;
          cursor: default;
          animation: cardFadeIn 0.6s ease-out both;
        }

        @keyframes cardFadeIn {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .eb-card {
          width: 280px;
          height: 380px;
        }

        .head-card {
          width: 210px;
          height: 285px;
        }

        .card-glow {
          position: absolute;
          top: -50px;
          left: 50%;
          transform: translateX(-50%);
          width: ${isEB ? '120px' : '90px'};
          height: ${isEB ? '120px' : '90px'};
          background: var(--accent-1);
          border-radius: 50%;
          filter: blur(50px);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .member-card:hover .card-glow {
          opacity: 0.25;
        }

        .member-avatar {
          font-size: ${isEB ? '4rem' : '2.5rem'};
          width: ${isEB ? '90px' : '64px'};
          height: ${isEB ? '90px' : '64px'};
          border-radius: 50%;
          background: var(--bg-secondary);
          border: 2px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
          transition: transform 0.3s ease;
          overflow: hidden;
        }

        .avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .member-card:hover .member-avatar {
          transform: scale(1.1) rotate(-5deg);
        }

        .member-role {
          margin-top: ${isEB ? '8px' : '4px'};
          font-size: ${isEB ? '0.75rem' : '0.65rem'};
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--accent-1);
          background: linear-gradient(to right, var(--accent-1), var(--accent-2));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .member-name {
          font-size: ${isEB ? '1.2rem' : '0.95rem'};
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        .member-quote {
          font-size: ${isEB ? '0.9rem' : '0.75rem'};
          color: var(--text-muted);
          line-height: 1.6;
          font-style: italic;
          max-width: ${isEB ? '240px' : '180px'};
        }

        .card-divider {
          width: ${isEB ? '40px' : '30px'};
          height: 2px;
          background: var(--gradient-accent);
          border-radius: 4px;
          margin: auto auto 6px auto;
        }

        .card-footer {
          display: flex;
          gap: ${isEB ? '8px' : '6px'};
        }

        .card-tag {
          font-size: ${isEB ? '0.7rem' : '0.6rem'};
          padding: ${isEB ? '3px 10px' : '2px 8px'};
          border-radius: 50px;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          color: var(--text-muted);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}

export default function TeamSection() {
  return (
    <section id="team" className="team-section">
      <div className="team-container eb-container">
        <div className="section-header">
          <p className="section-eyebrow">The People Behind the Magic</p>
          <h2 className="section-title team-title">
            Meet Our <span className="accent-gradient">Executive Members</span>
          </h2>
          <p className="section-desc">
            Passionate individuals driving SoarJMI's vision every single day.
          </p>
        </div>

        <div className="team-grid">
          {TEAM.map((member, i) => (
            <MemberCard key={member.name} member={member} index={i} variant="eb" />
          ))}
        </div>
      </div>

      <div className="team-container heads-container">
        <div className="section-header" style={{ marginTop: '100px' }}>
          <p className="section-eyebrow">Leading the Teams</p>
          <h2 className="section-title team-title">
            Meet Our <span className="accent-gradient">Leadership</span>
          </h2>
          <p className="section-desc">
            The creative and operational force behind our success.
          </p>
        </div>

        <div className="team-grid">
          {HEADS.map((member, i) => (
            <MemberCard key={`${member.role}-${i}`} member={member} index={i} variant="head" />
          ))}
        </div>
      </div>

      <style jsx>{`
        .team-section {
          padding: 100px 6%;
          background: var(--bg-secondary);
          position: relative;
          overflow: hidden;
        }

        .team-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: var(--gradient-accent);
          opacity: 0.4;
        }

        .team-container {
          margin: 0 auto;
        }
        
        .eb-container {
          max-width: 1250px;
        }

        .heads-container {
          max-width: 1250px;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-eyebrow {
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--accent-1);
          margin-bottom: 12px;
        }

        .team-title {
          margin-bottom: 16px;
        }

        .section-desc {
          font-size: 1rem;
          color: var(--text-muted);
          max-width: 500px;
          margin: 0 auto;
          line-height: 1.7;
        }

        .team-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 28px;
        }

        @media (max-width: 600px) {
          .team-section {
            padding: 60px 4%;
          }
        }
      `}</style>
    </section>
  );
}
