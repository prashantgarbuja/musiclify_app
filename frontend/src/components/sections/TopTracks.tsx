
import { useRef, useEffect, useState } from 'react';
import TrackItem from '@/components/ui/TrackItem';
import { useIntersectionObserver } from '@/lib/animations';
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";
import { useUser } from '@/context/UserContext';

const TopTracks = () => {
  const { ref } = useIntersectionObserver();
  const { userData } = useUser();
  const [topTracks, setTopTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const titleRef = useFadeInOnScroll(loading);
  const apiUrl = import.meta.env.VITE_MUSICLIFY_API_URL;

  useEffect(() => {
    const fetchTopTracks = async () => {
      if (!userData?.accessToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/topTracks?term=2`, {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch top tracks');
        }
        const data = await response.json();
        setTopTracks(data.items || []);
      } catch (error) {
        console.error('Error fetching top tracks:', error);
        setTopTracks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopTracks();
  }, [userData]);

  return (
    <section id="top-tracks" className="py-16 md:py-24 bg-music-card bg-opacity-30">
      <div className="container mx-auto px-6">
        <div className="mb-10">
          <div className="inline-block px-3 py-1 bg-music-card rounded-full mb-4">
            <span className="text-music-primary text-sm font-medium">On Repeat</span>
          </div>
          <h2 
            ref={titleRef}
            className="section-title text-3xl md:text-4xl opacity-0"
          >
            Your Top Tracks
          </h2>
          <p className="text-music-textSecondary max-w-2xl">
            The songs you can't get enough of. These tracks have been your most played
            over the last few months.
          </p>
        </div>
        
        <div 
          ref={ref}
          className="bg-music-background rounded-xl p-4 shadow-lg"
        >
          <div className="mb-4 px-4 py-2 flex items-center text-music-textSecondary text-sm">
            <div className="w-10">#</div>
            <div className="w-12 mr-4"></div>
            <div className="flex-grow">TITLE</div>
            <div className="hidden md:block w-1/4 px-4">ALBUM</div>
            <div className="w-16 text-right">DURATION</div>
          </div>
          
          <div className="space-y-2">
          {topTracks.length > 0 ? (
              topTracks.map((track, index) => (
                <TrackItem key={track.id} track={track} index={index} />
              ))
            ) : (
              <p>No top tracks available.</p>
            )}
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <button className="button-secondary">
            View More Tracks
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopTracks;
