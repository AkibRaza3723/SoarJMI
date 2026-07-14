// All events data — same content regardless of theme
export interface SoarEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  category: 'Cultural' | 'Tech';
  tag: string;                // short tag like "Annual Fest", "Hackathon" etc
  description: string;
  seats: number;
  registered: number;
  image: string | null;       // null → smart placeholder shown
}

export const EVENTS: SoarEvent[] = [
  {
    id: 1,
    title: 'SoarFest 2025 — Annual Cultural Extravaganza',
    date: 'Aug 15, 2025',
    time: '5:00 PM onwards',
    location: 'JMI Amphitheatre, New Delhi',
    category: 'Cultural',
    tag: 'Annual Fest',
    description:
      'The flagship event of SoarJMI! Three days of music, dance, theatre, art installations, and spoken word. 50+ performances by students and invited artists. Food stalls, competitions, and open exhibitions.',
    seats: 1200,
    registered: 983,
    image: null,
  },
  {
    id: 2,
    title: 'HackSoar 2025 — 48‑Hour Build Marathon',
    date: 'Sep 6–7, 2025',
    time: '10:00 AM (Day 1) – 10:00 AM (Day 2)',
    location: 'CS Block Lab, JMI',
    category: 'Tech',
    tag: 'Hackathon',
    description:
      'Teams of 2–4 build solutions to real-world problems across tracks: AI/ML, FinTech, HealthTech, and Social Impact. ₹1.5 Lakh prize pool. Open to all JMI students and alumni.',
    seats: 200,
    registered: 176,
    image: null,
  },
  {
    id: 3,
    title: 'Open Mic Night — Voices of JMI',
    date: 'Aug 30, 2025',
    time: '7:00 PM – 10:30 PM',
    location: 'Faculty of Humanities Lawn, JMI',
    category: 'Cultural',
    tag: 'Open Mic',
    description:
      'A raw, unfiltered evening of poetry, stand-up, storytelling, and original music. Every voice matters. No audition required — just sign up and take the mic.',
    seats: 300,
    registered: 211,
    image: null,
  },
  {
    id: 4,
    title: 'AI & Machine Learning Workshop',
    date: 'Sep 14, 2025',
    time: '11:00 AM – 4:00 PM',
    location: 'Seminar Hall 3, Engineering Block, JMI',
    category: 'Tech',
    tag: 'Workshop',
    description:
      'Hands-on workshop covering Python ML fundamentals, neural networks, and building your first model. Led by Dr. Fatima Ansari. Bring your laptop. Certificates provided.',
    seats: 80,
    registered: 72,
    image: null,
  },
  {
    id: 5,
    title: 'Pixel & Lens — Photography Exhibition',
    date: 'Oct 3–5, 2025',
    time: '10:00 AM – 7:00 PM daily',
    location: 'Fine Arts Gallery, JMI',
    category: 'Cultural',
    tag: 'Exhibition',
    description:
      'Curated exhibition of student photography exploring the theme "Margins". 60 prints. Interactive digital installations. Panel discussion with photojournalists on Day 2.',
    seats: 500,
    registered: 340,
    image: null,
  },
  {
    id: 6,
    title: 'Web3 & Blockchain Bootcamp',
    date: 'Oct 18–19, 2025',
    time: '10:00 AM – 5:00 PM',
    location: 'Innovation Lab, JMI',
    category: 'Tech',
    tag: 'Bootcamp',
    description:
      'Two-day intensive on blockchain fundamentals, smart contract development with Solidity, and building dApps. Guest sessions from industry engineers. Limited seats — apply early.',
    seats: 50,
    registered: 48,
    image: null,
  },
];
