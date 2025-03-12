
import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import TopArtists from '@/components/sections/TopArtists';
import TopTracks from '@/components/sections/TopTracks';
import RecentlyPlayed from '@/components/sections/RecentlyPlayed';
import MusicPersonality from '@/components/sections/MusicPersonality';
import Library from '@/components/sections/Library';
import { useUser } from '@/context/UserContext';

const Index = () => {
  const { userData } = useUser();
  
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        <TopArtists />
        <TopTracks />
        <RecentlyPlayed />
        <Library />
        <MusicPersonality />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
