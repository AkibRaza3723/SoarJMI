
export interface TeamQuestion {
  key: string;
  label: string;
}

export interface Team {
  id: string;
  label: string;
  icon: string;
  questions: TeamQuestion[];
}

export const TEAMS: Team[] = [
  {
    id: 'technical',
    label: 'Technical',
    icon: '💻',
    questions: [
      { key: 'tech_q1', label: 'Why do you want to join the Technical Team of SoarJMI?' },
      { key: 'tech_q2', label: 'Which technical domain interests you the most (Web Dev, AI/ML, App Dev, Cybersecurity, UI/UX, etc.)?' },
      { key: 'tech_q3', label: 'If you are assigned a task that is new to you, how would you approach it?' },
    ],
  },
  {
    id: 'content',
    label: 'Content',
    icon: '✍️',
    questions: [
      { key: 'content_q1', label: 'Why do you want to join the Content Team, and what interests you about content creation?' },
      { key: 'content_q2', label: 'If you are given a topic you\'ve never worked on before, how would you create engaging content for it?' },
      { key: 'content_q3', label: 'Can you share a piece of content (caption, article, poster text, or script) that you\'ve created before?' },
    ],
  },
  {
    id: 'graphics',
    label: 'Graphics',
    icon: '🎨',
    questions: [
      { key: 'graphics_q1', label: 'Why do you want to join the graphics team?' },
      { key: 'graphics_q2', label: 'What will you do if your design gets rejected or needs changes?' },
      { key: 'graphics_q3', label: 'Do you have any previous work to show?' },
    ],
  },
  {
    id: 'hr',
    label: 'HR',
    icon: '🤝',
    questions: [
      { key: 'hr_q1', label: 'What qualities do you think make a good HR representative?' },
      { key: 'hr_q2', label: 'If a member repeatedly misses meetings without informing anyone. What would you do?' },
      { key: 'hr_q3', label: 'Suppose a volunteer doesn\'t complete their assigned task before a major event. What would you do?' },
    ],
  },
  {
    id: 'marketing-sponsorship',
    label: 'Marketing and Sponsorship',
    icon: '📢',
    questions: [
      { key: 'marketing_q1', label: 'Why do you want to join the Marketing and Sponsorship Team at SoarJMI? (Describe in depth)' },
      { key: 'marketing_q2', label: 'Suppose you\'re asked to approach a company for sponsorship. How would you convince them to partner with SoarJMI?' },
      { key: 'marketing_q3', label: 'Describe a situation where you had to convince someone, negotiate, or take initiative. It can be from college, school, or your personal life.' },
    ],
  },
  {
    id: 'operations-management',
    label: 'Operations and Management',
    icon: '⚙️',
    questions: [
      { key: 'ops_q1', label: 'If an event starts in 10 minutes and a major technical issue occurs, how will you handle the situation?' },
      { key: 'ops_q2', label: 'Describe a situation where you had to manage multiple tasks under pressure. How would you prioritize them?' },
      { key: 'ops_q3', label: 'Why do you think you are the right fit for the Operations Team, and what unique value will you bring?' },
    ],
  },
  {
    id: 'photography-videography',
    label: 'Photography and Videography',
    icon: '📸',
    questions: [
      { key: 'photo_q1', label: 'What interests you more—photography, videography, or editing? Why?' },
      { key: 'photo_q2', label: 'Which camera(s) or smartphone do you usually use?' },
      { key: 'photo_q3', label: 'Which editing software are you familiar with? (e.g., Adobe Lightroom, Photoshop, Premiere Pro, DaVinci Resolve, CapCut)' },
    ],
  },
  {
    id: 'research-development',
    label: 'Research and Development',
    icon: '🔬',
    questions: [
      { key: 'rd_q1', label: 'How do you start researching a topic you know nothing about?' },
      { key: 'rd_q2', label: 'Which sources do you trust for reliable information, and why?' },
      { key: 'rd_q3', label: 'How do you verify whether the information you found is accurate?' },
    ],
  },
  {
    id: 'social-media',
    label: 'Social Media Management',
    icon: '📱',
    questions: [
      { key: 'social_q1', label: 'What do you think makes a social media page successful?' },
      { key: 'social_q2', label: 'How would you promote an upcoming college event on Instagram?' },
      { key: 'social_q3', label: 'If engagement suddenly dropped, what steps would you take to identify and fix the issue?' },
    ],
  },
];

export const YEAR_OF_STUDY_OPTIONS = ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year'];
