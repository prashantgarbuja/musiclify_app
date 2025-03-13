
import { useRef, useEffect, useState } from 'react';
import ArtistCard from '@/components/ui/ArtistCard';
import { useIntersectionObserver } from '@/lib/animations';
import { useUser } from '@/context/UserContext';
import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';

const TopArtists = () => {
  const { ref } = useIntersectionObserver();
  const { userData } = useUser();
  const [topArtists, setTopArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const titleRef = useFadeInOnScroll(loading);
  const apiUrl = import.meta.env.VITE_MUSICLIFY_API_URL?.replace(/\/+$/, ''); // Remove trailing slash;

  useEffect(() => {
    const fetchTopArtists = async () => {
      if (!userData?.accessToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/topArtists?term=1`, { 
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch top artists');
        }
        const data = await response.json();
        setTopArtists(data.items || []);
      } catch (error) {
        console.error('Error fetching top artists:', error);
        setTopArtists([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopArtists();
  }, [userData]);

  return (
    <section id="top-artists" className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="mb-10">
          <div className="inline-block px-3 py-1 bg-music-card rounded-full mb-4">
            <span className="text-music-primary text-sm font-medium">Favorite Artists</span>
          </div>
          <h2 
            ref={titleRef}
            className="section-title text-3xl md:text-4xl opacity-0"
          >
            Your Top Artists
          </h2>
          <p className="text-music-textSecondary max-w-2xl">
            These are the artists you've listened to the most over the past few months. 
            Your musical taste is as unique as you are.
          </p>
        </div>
        
        <div 
          ref={ref} 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6"
        >
          {topArtists.map((artist, index) => (
            <ArtistCard key={artist.id} artist={artist} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopArtists;
