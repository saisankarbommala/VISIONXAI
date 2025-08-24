'use client';
import { useState, useEffect } from 'react';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Speakers from '@/components/sections/Speakers';
import Events from '@/components/sections/Events';
import Contact from '@/components/sections/Contact';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      {!isLoading && (
        <main className="bg-black min-h-screen">
          <Navbar />
          <Hero />
          <About />
          <Speakers />
          <Events />
          <Contact />
        </main>
      )}
    </>
  );
}