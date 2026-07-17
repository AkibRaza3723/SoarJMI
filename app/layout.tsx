import type { Metadata } from 'next';
import { Sora, Hanken_Grotesk, JetBrains_Mono, Orbitron } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './context/ThemeContext';

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
  display: 'swap',
  weight: ['400', '500', '600'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500'],
});

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'SoarJMI — Where Culture Meets Innovation',
  description:
    'SoarJMI is the official cultural and tech society of Jamia Millia Islamia, New Delhi. Explore events, meet our team, and join a community that soars.',
  keywords: ['SoarJMI', 'JMI', 'Jamia Millia Islamia', 'cultural society', 'tech society', 'student club'],
  openGraph: {
    title: 'SoarJMI — Where Culture Meets Innovation',
    description: 'The official cultural and tech society of JMI.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${hankenGrotesk.variable} ${jetbrainsMono.variable} ${orbitron.variable}`}
      data-theme="cultural"
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
