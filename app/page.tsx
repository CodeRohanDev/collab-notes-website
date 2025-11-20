'use client';

import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Showcase from '@/components/Showcase';
import Download from '@/components/Download';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] relative">
      <AnimatedBackground />
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Showcase />
      <Download />
      <Footer />
    </main>
  );
}
