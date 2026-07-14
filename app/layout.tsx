import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './context/ThemeContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
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
    <html lang="en" className={inter.variable} data-theme="cultural">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
