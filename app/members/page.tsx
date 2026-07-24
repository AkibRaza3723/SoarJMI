'use client';

import Navbar from '../components/Navbar';
import TeamSection from '../components/TeamSection';
import Footer from '../components/Footer';

export default function MembersPage() {
  return (
    <main>
      <Navbar />

     {/* to add some heads here.*/}

      {/* Team cards */}
      <TeamSection />

      <Footer />
    </main>
  );
}
