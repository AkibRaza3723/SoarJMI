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
  fullDescription: string;    // longer description for popup modal
  image: string | null;       // null → smart placeholder shown
  gallery: string[];          // photo gallery images for the popup slideshow
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
    fullDescription:
      'The flagship event of SoarJMI! Three days of music, dance, theatre, art installations, and spoken word. 50+ performances by students and invited artists. Food stalls, competitions, and open exhibitions.\n\nSoarFest is the crown jewel of JMI\'s cultural calendar — a vibrant celebration that unites every corner of campus. From classical Kathak recitals under the stars to electrifying rock performances, from interactive art walls to poetry slams, every moment is crafted to inspire. This year features an extended night market, cultural exhibitions representing all departments, and a grand finale concert.',
    image: null,
    gallery: [
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&h=500&fit=crop',
    ],
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
    fullDescription:
      'Teams of 2–4 build solutions to real-world problems across tracks: AI/ML, FinTech, HealthTech, and Social Impact. ₹1.5 Lakh prize pool. Open to all JMI students and alumni.\n\nHackSoar brings together the brightest minds at JMI for 48 intense hours of coding, designing, and pitching. With mentorship from industry professionals, free food and caffeine, and a buzzing atmosphere, it\'s the ultimate test of innovation under pressure. Past winners have gone on to build real startups from their hackathon projects.',
    image: null,
    gallery: [
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop',
    ],
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
    fullDescription:
      'A raw, unfiltered evening of poetry, stand-up, storytelling, and original music. Every voice matters. No audition required — just sign up and take the mic.\n\nUnder the canopy of fairy lights on the Humanities lawn, Open Mic Night has become JMI\'s most intimate gathering. Whether you\'re performing your first poem or your hundredth joke, the crowd is always warm, always real. Past editions have featured surprise musical collaborations and spoken word pieces that went viral. Come with a story — leave with a community.',
    image: null,
    gallery: [
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=800&h=500&fit=crop',
    ],
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
    fullDescription:
      'Hands-on workshop covering Python ML fundamentals, neural networks, and building your first model. Led by Dr. Fatima Ansari. Bring your laptop. Certificates provided.\n\nThis workshop takes you from zero to trained model in one day. Starting with data preprocessing and feature engineering, moving through neural network architectures, and culminating in a live demo where you deploy your model. Dr. Fatima Ansari, who leads JMI\'s AI research lab, will be joined by two industry engineers from Google and Microsoft for Q&A sessions.',
    image: null,
    gallery: [
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1515879218367-8466d910auj7?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800&h=500&fit=crop',
    ],
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
    fullDescription:
      'Curated exhibition of student photography exploring the theme "Margins". 60 prints. Interactive digital installations. Panel discussion with photojournalists on Day 2.\n\nPixel & Lens transforms JMI\'s Fine Arts Gallery into a visual narrative of life at the margins — both literal and metaphorical. This year\'s exhibition features 60 large-format prints selected from over 400 submissions, accompanied by interactive digital installations using projection mapping. The Day 2 panel brings together award-winning photojournalists to discuss visual storytelling in the age of social media.',
    image: null,
    gallery: [
      'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1554080353-a576cf803bda?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&h=500&fit=crop',
    ],
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
    fullDescription:
      'Two-day intensive on blockchain fundamentals, smart contract development with Solidity, and building dApps. Guest sessions from industry engineers. Limited seats — apply early.\n\nGo from "what is a blockchain?" to deploying your own smart contract in two days. This bootcamp covers consensus mechanisms, Ethereum architecture, Solidity development patterns, and frontend integration with Ethers.js. Each participant builds and deploys a working dApp by the end of Day 2. Limited to 50 seats to ensure hands-on mentorship for every attendee.',
    image: null,
    gallery: [
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1591115765373-5b3ee6806810?w=800&h=500&fit=crop',
    ],
  },
];
