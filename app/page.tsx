'use client';

import Navbar from './components/Navbar';
import LogoSplash from './components/LogoSplash';
import HeroSection from './components/HeroSection';
import FounderMentorsSection from './components/FounderMentorsSection';
import TeamSection from './components/TeamSection';
import TestimonialsSection from './components/TestimonialsSection';
import AboutSection from './components/AboutSection';
import GuidanceSection from './components/GuidanceSection';
import MovingGallery from './components/MovingGallery';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';

export default function HomePage() {
  return (
    <main>
      <Navbar />

      {/* 1. Full-screen logo pop + scroll-shrink */}
      <LogoSplash />

      {/* 2. Hero with animations */}
      <HeroSection />

      {/* 3. Founder + Mentors full-page layout */}
      <FounderMentorsSection />

      {/* 4. President, VP, general team cards */}
      <TeamSection />

      {/* 5. About Us */}
      <AboutSection />

      {/* 6. Testimonials carousel */}
      <TestimonialsSection />

      {/* 7. Gallery Section */}
      <MovingGallery />

      {/* 8. Guidance framework */}
      <GuidanceSection />

      {/* 9. FAQs */}
      <FAQSection />

      <Footer />
    </main>
  );
}
