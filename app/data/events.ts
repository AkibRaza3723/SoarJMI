// All events data — same content regardless of theme
export interface SoarEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  category: 'Cultural' | 'Tech';
  tag: string;                
  description: string;
  image: string | null;       
  gallery: string[];         
  isRegistrationOpen?: boolean;
}

const rawEvents: Omit<SoarEvent, 'id'>[] = [
  {
    title: 'CAREER GUIDANCE AND RESUME BUILDING',
    date: 'July 05, 2026',
    time: '10:00 AM – 5:00 PM',
    location: 'FET',
    category: 'Tech',
    tag: 'Event',
    description:
      'Career Guidance and Resume Building is an insightful session designed to equip students with essential career skills. From mastering resume building and interview techniques to understanding Generative AI and GDPR compliance, the event aims to prepare participants for today\'s competitive professional landscape.',
    image: 'https://res.cloudinary.com/crxs8dfo/image/upload/v1784809702/WhatsApp_Image_2026-07-23_at_17.58.00_ywtpfn.jpg',
    gallery: [
      'https://res.cloudinary.com/crxs8dfo/image/upload/v1784809702/WhatsApp_Image_2026-07-23_at_17.58.00_ywtpfn.jpg'
    ],
  },
  {
    title: 'SKLATE',
    date: 'April 21, 2026',
    time: '10:00 AM – 5:00 PM',
    location: 'POLYTECHNIQUE AUDITORIUM',
    category: 'Tech',
    tag: 'Event',
    description:
      'SKLATE – UI/UX & B-Plan Competition is a dynamic two-round event organized by SOAR JMI that unites innovation, creativity, and strategic thinking. Participants tackle real-world challenges through UI/UX design and business planning, showcasing their problem-solving abilities. The competition begins online on Unstop and culminates in an offline grand finale under the theme "Pitch. Design. Disrupt." SKLATE provides a platform for students to collaborate across domains, refine their ideas, and gain recognition for their talent and innovation.',
      image:  'https://res.cloudinary.com/crxs8dfo/image/upload/v1784919974/sklate2_zg9p4t.jpg',
    gallery: [
      'https://res.cloudinary.com/crxs8dfo/image/upload/v1784919976/WhatsApp_Image_2026-07-23_at_17.38.49_jyq0nv.jpg',
      'https://res.cloudinary.com/crxs8dfo/image/upload/v1784919974/sklate2_zg9p4t.jpg',
      'https://res.cloudinary.com/crxs8dfo/image/upload/v1784920342/Screenshot_2026-07-25_at_12.41.17_AM_zju3vv.png',
    ],
  },
  {
    title: 'TREASURE HUNT',
    date: 'February 14, 2026',
    time: '10:00 AM – 5:00 PM',
    location: 'FET',
    category: 'Cultural',
    tag: 'Event',
    description:
      'TREASURE HUNT: The Treasure Hunt was organized with the objective of fostering participant engagement, teamwork, and critical thinking. The event featured a campus-wide challenge across the Faculty of Engineering and Technology (FET) and Gate No. 13, where teams navigated through a series of riddles to locate strategically placed QR codes. Each successfully scanned QR code revealed the next clue, guiding participants to subsequent locations. The event encouraged collaboration, problem-solving, and healthy competition while ensuring an engaging and memorable experience for all attendees. The winning team was awarded a cash prize of ₹1,500 in recognition of their outstanding performance.',
      image: 'https://res.cloudinary.com/crxs8dfo/image/upload/v1784919975/WhatsApp_Image_2026-07-23_at_17.31.47_jushws.jpg',
    gallery: [
      'https://res.cloudinary.com/crxs8dfo/image/upload/v1784920018/WhatsApp_Image_2026-07-23_at_17.31.52_xfrnd1.jpg',
      'https://res.cloudinary.com/crxs8dfo/image/upload/v1784919975/WhatsApp_Image_2026-07-23_at_17.31.47_jushws.jpg',
    ],
  },
  {
    title: 'GAMEXPO',
    date: 'February 19, 2025',
    time: '10:00 AM – 5:00 PM',
    location: 'JMI',
    category: 'Tech',
    tag: 'Event',
    description:
      'The tournament featured five highly popular games—BGMI, FC 25, Valorant, Tekken 8, and Among Us—catering to a wide range of gaming enthusiasts. Each game brought its own unique challenges, testing the strategic thinking, reflexes, and teamwork of participants. The format ensured that there was one ultimate winner per game, leading to a total of five champions, each of whom showcased remarkable skill and determination to claim victory.',
      image: 'https://res.cloudinary.com/crxs8dfo/image/upload/v1784919261/IMG_5212_ig5nby.jpg',
    gallery: [
      'https://res.cloudinary.com/crxs8dfo/image/upload/v1784919261/IMG_5212_ig5nby.jpg',
      'https://res.cloudinary.com/crxs8dfo/image/upload/v1784919260/IMG_5105_lcaazc.jpg',
      'https://res.cloudinary.com/crxs8dfo/image/upload/v1784919258/IMG_5099_zsco8h.jpg',
      'https://res.cloudinary.com/crxs8dfo/image/upload/v1784920019/WhatsApp_Image_2026-07-23_at_17.38.48_zlihxx.jpg',
    ],
  },
  {
    title: 'UNLOCKING EARNINGS WITH FREELANCING',
    date: 'November 07, 2024',
    time: '10:00 AM – 5:00 PM',
    location: 'JMI',
    category: 'Tech',
    tag: 'Event',
    description:
      'SoarX JMI organized a workshop aimed at empowering participants to advance their tech careers. The session focused on key areas such as freelancing, open-source contributions, and building a professional portfolio. Industry experts shared valuable insights on unlocking income opportunities through freelancing, making meaningful contributions to open-source projects, and effectively developing a professional portfolio to attract potential clients and employers. Speakers: • Insharah Ayyubi Former GDSC JMI Lead, Freelance Voiceover Artist, Full Stack Developer, and one of the highest student PPO (Pre-Placement Offer) recipients at Optum. • Asif Rahman Freelancer & Front-end Engineering Intern at Pixel Bridge.',
      image: 'https://res.cloudinary.com/crxs8dfo/image/upload/v1784919010/Screenshot_2026-07-25_at_12.19.47_AM_bxgppv.png',
    gallery: [
      'https://res.cloudinary.com/crxs8dfo/image/upload/v1784919010/Screenshot_2026-07-25_at_12.19.47_AM_bxgppv.png',
      'https://res.cloudinary.com/crxs8dfo/image/upload/v1784919026/Screenshot_2026-07-25_at_12.19.54_AM_j7eo5j.png',
      'https://res.cloudinary.com/crxs8dfo/image/upload/v1784919034/Screenshot_2026-07-25_at_12.20.24_AM_jm3hwg.png',
    ],
  },
  {
    title: 'COUNTER ARENA- DEBATING CHAMPIONSHIP',
    date: 'November 05, 2024',
    time: '10:00 AM – 5:00 PM',
    location: 'FET',
    category: 'Tech',
    tag: 'Cultural',
    description:
      'The Grand Annual Debate Competition, the firstever event by SoarX JMI Cultural Society on 5th November 2024, brought students together to explore critical issues that challenge our viewpoints and inspire deep thinking. This inaugural event by SoarX JMI deserves commendation for successfully fostering intellectual and cultural engagement. The competition provided a valuable platform for participants to showcase eloquence, reasoning, and constructive discourse on subjects impacting our lives and society. T.I.M.E. \'s support aligned with its mission of fostering young minds, while Biryanibaaz’s involvement brought an added element of community warmth and enjoyment. This Grand Annual Debate Competition was a celebration of dialogue, learning, and mutual respect, proving the power of debate to unite people and engage with meaningful issues.',
      image: 'https://res.cloudinary.com/crxs8dfo/image/upload/v1784918885/Screenshot_2026-07-25_at_12.17.35_AM_iboafh.png',
    gallery: [
      'https://res.cloudinary.com/crxs8dfo/image/upload/v1784918885/Screenshot_2026-07-25_at_12.17.35_AM_iboafh.png',
      'https://res.cloudinary.com/crxs8dfo/image/upload/v1784918885/Screenshot_2026-07-25_at_12.17.51_AM_g06xuz.png',
    ],
  },
  {
    title: 'AR/VR/MR WORKSHOP',
    date: 'October 26, 2024',
    time: '10:00 AM – 5:00 PM',
    location: 'INDUSTRIAL VISIT',
    category: 'Tech',
    tag: 'Visit',
    description:
      'Team SoarX JMI attended an immersive AR/VR workshop, gaining hands-on experience with state-of-the-art technology. Members explored real-world applications of augmented and virtual reality, from gaming to healthcare, guided by industry experts.',
      image: 'https://res.cloudinary.com/crxs8dfo/image/upload/v1784918791/Screenshot_2026-07-25_at_12.16.20_AM_bjpckd.png',
    gallery: [
      'https://res.cloudinary.com/crxs8dfo/image/upload/v1784918791/Screenshot_2026-07-25_at_12.16.20_AM_bjpckd.png',
    ],
  },
  {
    title: 'SOARJMI ORIENTATION 1.0',
    date: 'October 16, 2024',
    time: '10:00 AM – 5:00 PM',
    location: 'JMI', 
    category: 'Tech',
    tag: 'Event',
    description:
      'Before the official start of the tenure, we came together for SoarJMI Orientation 1.0 an evening dedicated to connecting as one team. The Executive Board and Team Heads introduced themselves, shared their vision, and welcomed every member into the SoarJMI family. Through fun team-bonding activities, conversations, snacks, and a jamming session with live guitar, we got to know each other beyond our roles. It was the perfect beginning to build friendships, strengthen collaboration, and set the tone for an exciting journey ahead. Here\'s to a tenure filled with learning, growth, and unforgettable memories!',
      image: 'https://res.cloudinary.com/wyuzj0og/image/upload/v1784982377/e1_dqi5ea.jpg',
    gallery: [
      'https://res.cloudinary.com/wyuzj0og/image/upload/v1784982377/e1_dqi5ea.jpg',
      'https://res.cloudinary.com/wyuzj0og/image/upload/v1784982387/e2_znbbez.jpg',
      'https://res.cloudinary.com/wyuzj0og/image/upload/v1784982401/e3_ej4tct.jpg',
    ],
  },
  {
    title: 'DEMYSTIFYING BLOCKCHAIN',
    date: 'October 09, 2024',
    time: '10:00 AM – 5:00 PM',
    location: 'FET',
    category: 'Tech',
    tag: 'Event',
    description:
      'SoarX JMI hosted an online session titled "Demystifying Blockchain: Beyond the Hype," aimed at clarifying the fundamentals of blockchain technology. The session addressed common misconceptions, focusing on the real-world applications and transformative potential of blockchain beyond cryptocurrency. Attendees gained insights into how blockchain is reshaping industries like finance, supply chain, and data security. This interactive session provided a clearer understanding of blockchain’s impact, equipping participants with knowledge to navigate its future developments confidently.',
      image: 'https://res.cloudinary.com/crxs8dfo/image/upload/v1784918711/Screenshot_2026-07-25_at_12.14.59_AM_ahudwa.png',
    gallery: [
      'https://res.cloudinary.com/crxs8dfo/image/upload/v1784918711/Screenshot_2026-07-25_at_12.14.59_AM_ahudwa.png',
    ],
  },
  {
    title: 'NATIONAL SPACE DAY BHARAT MANDAPAM',
    date: 'August 25, 2024',
    time: '10:00 AM – 5:00 PM',
    location: 'BHARAT MANDAPAM',
    category: 'Tech',
    tag: 'Visit',
    description:
      'Team SoarX JMI attended National Space Day at Bharat Mandapam, an event celebrating advancements in space exploration and technology. The day featured insightful sessions by prominent scientists and industry leaders, sparking inspiration among participants. Team SoarX JMI members had the opportunity to engage in discussions on the latest developments in space research and the potential for future innovation. The event enriched their knowledge and strengthened their passion for contributing to space and technology fields.',
      image: 'https://res.cloudinary.com/crxs8dfo/image/upload/v1784918279/Screenshot_2026-07-25_at_12.07.36_AM_ejqnha.png',
    gallery: [
      'https://res.cloudinary.com/crxs8dfo/image/upload/v1784918279/Screenshot_2026-07-25_at_12.07.36_AM_ejqnha.png',
      'https://res.cloudinary.com/crxs8dfo/image/upload/v1784918280/Screenshot_2026-07-25_at_12.07.46_AM_nwxm6r.png',
    ],
  },
  {
    title: 'DEVX JMI',
    date: 'June 30, 2024',
    time: '10:00 AM – 5:00 PM',
    location: 'FET',
    category: 'Tech',
    tag: 'Hackathon',
    description:
      'Jamia Millia Islamia (JMI) held its first intercollege hackathon, DevX JMI, gathering engineering students from across Delhi in a virtual format after a month of preparation beginning on May 27. Following budget finalization on June 5, the Google Developer Student Club (GDSC) partnered with SoarX JMI on June 9 to expand the event\'s reach, launching an interactive website on June 17 and unveiling a creative event poster on June 20. Media support from The Jamia Review on June 28 further boosted visibility, making the hackathon a major success and a testament to teamwork and innovation.',
      image: 'https://res.cloudinary.com/crxs8dfo/image/upload/v1784917980/Screenshot_2026-07-25_at_12.01.40_AM_yy7yux.png',
    gallery: [
      'https://res.cloudinary.com/crxs8dfo/image/upload/v1784917980/Screenshot_2026-07-25_at_12.01.40_AM_yy7yux.png',
      'https://res.cloudinary.com/crxs8dfo/image/upload/v1784917980/Screenshot_2026-07-25_at_12.01.30_AM_jh0oxi.png',
      'https://res.cloudinary.com/crxs8dfo/image/upload/v1784917980/Screenshot_2026-07-25_at_12.02.38_AM_orzc5u.png',
    ],
  },
  {
    title: 'WEBINAR FEST',
    date: 'June 22, 2024',
    time: '10:00 AM – 5:00 PM',
    location: 'FET',
    category: 'Tech',
    tag: 'Webinar',
    description:
      'A three-day webinar fest featured topics chosen by students, including "Roadmap to AR, VR, and MR," "Demystifying the Internet of Robotic Things," and "Quantum Computing 101." Each session was conducted online by certified industry experts, giving students valuable insights into these advanced technologies and providing foundational knowledge through interactive sessions.',
      image: 'https://res.cloudinary.com/crxs8dfo/image/upload/v1784917779/Screenshot_2026-07-24_at_11.59.03_PM_wrpmnh.png',
    gallery: [
      'https://res.cloudinary.com/crxs8dfo/image/upload/v1784917779/Screenshot_2026-07-24_at_11.59.03_PM_wrpmnh.png',
      'https://res.cloudinary.com/crxs8dfo/image/upload/v1784917779/Screenshot_2026-07-24_at_11.58.50_PM_bdc0bn.png',
      'https://res.cloudinary.com/crxs8dfo/image/upload/v1784917779/Screenshot_2026-07-24_at_11.59.11_PM_qx1zy8.png',
    ],
  },
  {
    title: 'ARTIFICIAL INTELLIGENCE AT MICROSOFT',
    date: 'May 18, 2024',
    time: '10:00 AM – 5:00 PM',
    location: 'MICROSOFT OFFICE GURUGRAM',
    category: 'Tech',
    tag: 'Visit',
    description:
      'The Microsoft Visit on May 18 showcased Microsoft’s latest AI advancements, featuring industry leaders and developers. Speakers discussed new AI tools, ethical AI development, and real-world applications, highlighting how AI is boosting productivity and innovation across various fields.',
      image: 'https://res.cloudinary.com/crxs8dfo/image/upload/v1784917669/Screenshot_2026-07-24_at_11.57.35_PM_t4fqoi.png',
    gallery: [
      'https://res.cloudinary.com/crxs8dfo/image/upload/v1784917669/Screenshot_2026-07-24_at_11.57.35_PM_t4fqoi.png',
      'https://res.cloudinary.com/crxs8dfo/image/upload/v1784917670/Screenshot_2026-07-24_at_11.56.58_PM_urp83r.png',
    ],
  },
  {
    title: 'BHASHINI CONNECT',
    date: 'April 30, 2024',
    time: '10:00 AM – 5:00 PM',
    location: 'DAIC, BHIM AUDITORIUM',
    category: 'Tech',
    tag: 'Event',
    description:
      'The Bhashini Velocity Challenge Live Pitching Event on April 30, 2024, brought together industry experts, government officials, and investors to explore advancements in language technology. The event showcased innovative solutions, highlighting the importance of multilingual tech in promoting accessibility and inclusivity across digital platforms.',
      image: 'https://res.cloudinary.com/crxs8dfo/image/upload/v1784917553/Screenshot_2026-07-24_at_11.55.35_PM_itwwjj.png',
    gallery: [
      'https://res.cloudinary.com/crxs8dfo/image/upload/v1784917553/Screenshot_2026-07-24_at_11.55.35_PM_itwwjj.png',
      'https://res.cloudinary.com/crxs8dfo/image/upload/v1784917553/Screenshot_2026-07-24_at_11.55.41_PM_u4c6rg.png',
    ],
  },
  {
    title: 'MASTER CLASS ON DSA AND SYSTEM DESIGN',
    date: 'April 23, 2024',
    time: '10:00 AM – 5:00 PM',
    location: 'FET AUDITORIUM',
    category: 'Tech',
    tag: 'Workshop',
    description:
      'Partnering again with Coding Blocks, SoarX JMI organized a comprehensive workshop at JMI Auditorium. Esteemed speakers Mosina Ashraf (Data Structures and Algorithms) and Deepak Kumar (System Design) led the session, igniting enthusiasm among attendees and encouraging them to pursue essential skills in programming and system architecture. This event left a lasting impression on participants, equipping them with both technical knowledge and inspiration to deepen their understanding of these key concepts.',
      image: 'https://res.cloudinary.com/crxs8dfo/image/upload/v1784810081/Screenshot_2026-07-23_at_6.04.23_PM_vnatut.png',
    gallery: [
      'https://res.cloudinary.com/crxs8dfo/image/upload/v1784810081/Screenshot_2026-07-23_at_6.04.23_PM_vnatut.png',
      'https://res.cloudinary.com/crxs8dfo/image/upload/v1784810088/bharat_mandapam_cpbbv3.jpg',
    ],
  },
  {
    title: 'CARRIER MAKEUP MEETUP',
    date: 'April 13, 2024',
    time: '11:00 AM – 4:00 PM',
    location: 'Microsoft Office, Gurugram',
    category: 'Cultural',
    tag: 'Meetup',
    description:
      'This second Microsoft visit provided 40+ students with a unique opportunity to explore career paths in the tech industry. The session, hosted by Mr. Hitesh Bhayana, a Cloud Solution Architect at Microsoft, highlighted critical future-ready skills and delved into the role of a solution architect. The meetup offered valuable career advice and insights into how students could strategically build their skills to align with industry demands.',
    image: 'https://res.cloudinary.com/crxs8dfo/image/upload/v1784809921/Screenshot_2026-07-23_at_5.59.26_PM_mgc8ir.png',
    gallery: [
      'https://res.cloudinary.com/crxs8dfo/image/upload/v1784809921/Screenshot_2026-07-23_at_5.59.26_PM_mgc8ir.png',
      'https://res.cloudinary.com/crxs8dfo/image/upload/v1784809922/Screenshot_2026-07-23_at_5.59.32_PM_ndtrtd.png',
      'https://res.cloudinary.com/crxs8dfo/image/upload/v1784809922/Screenshot_2026-07-23_at_5.59.39_PM_zpbqec.png',
    ],
  },
  {
    title: 'CODE WITHOUT BARRIERS MICROSOFT VISIT',
    date: 'March 30, 2024',
    time: '10:00 AM – 7:00 PM',
    location: 'MICROSOFT OFFICE GURUGRAM', 
    category: 'Tech',
    tag: 'Visit',
    description:
      'Just ten days after its formation, SoarX JMI organized its first field visit to Microsoft, called "Code Without Barriers." This outing generated significant enthusiasm, with a large number of students eager to join SoarX JMI in this new endeavor. The visit underscored the society\'s commitment to opening doors to industry exposure and creating meaningful learning experiences for members, marking a critical first step in SoarX JMI\'s outreach efforts.',
    image: 'https://res.cloudinary.com/crxs8dfo/image/upload/v1784809410/Screenshot_2026-07-23_at_5.53.03_PM_k3dpzn.png',
    gallery: [
      'https://res.cloudinary.com/crxs8dfo/image/upload/v1784809410/Screenshot_2026-07-23_at_5.53.03_PM_k3dpzn.png',
      'https://res.cloudinary.com/crxs8dfo/image/upload/v1784809411/Screenshot_2026-07-23_at_5.53.09_PM_neu4p7.png',
      'https://res.cloudinary.com/crxs8dfo/image/upload/v1784809533/microsoft_s3qfwk.jpg',
    
    ],
  },
  {
    title: 'SOARXJMI FOUNDATION',
    date: 'March 18, 2024',
    time: '10:00 AM – 5:00 PM',
    location: 'JMI',
    category: 'Tech',
    tag: 'Foundation',
    description:
    " Shortly after SoarX JMI's inception, the team launched its first recruitment drive to build a dedicated group of tech enthusiasts. The President, alongside mentors, created an application form to attract candidates, receiving an impressive 75+ responses. The applicants underwent industry-level interviews that closely mirrored the real-world hiring process, allowing them to experience a professional setting while being evaluated on technical and problem-solving skills. This rigorous process resulted in selecting the most promising and committed individuals for the Tech Team, a cornerstone of SoarX JMI's journey.",
    image: 'https://res.cloudinary.com/crxs8dfo/image/upload/v1784809702/WhatsApp_Image_2026-07-23_at_17.58.00_ywtpfn.jpg',
    gallery: [
      'https://res.cloudinary.com/crxs8dfo/image/upload/v1784809702/WhatsApp_Image_2026-07-23_at_17.58.00_ywtpfn.jpg', 
    ],
  },
];

export const EVENTS: SoarEvent[] = rawEvents.map((event, index) => ({
  ...event,
  id: index + 1,
}));

export const UPCOMING_EVENT: SoarEvent | null = {
  id: 0,
  title: 'CAREER GUIDANCE AND RESUME BUILDING',
  date: 'July 05, 2026',
  time: '10:00 AM – 5:00 PM',
  location: 'FET',
  category: 'Tech',
  tag: 'Event',
  description:
      'Career Guidance and Resume Building is an insightful session designed to equip students with essential career skills. From mastering resume building and interview techniques to understanding Generative AI and GDPR compliance, the event aims to prepare participants for today\'s competitive professional landscape.',
  image: 'https://res.cloudinary.com/crxs8dfo/image/upload/v1784809702/WhatsApp_Image_2026-07-23_at_17.58.00_ywtpfn.jpg',
  gallery: [],
  isRegistrationOpen: false, 
};
