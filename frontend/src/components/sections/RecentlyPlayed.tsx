
import { useRef, useEffect, useState } from 'react';
import { Clock3 } from 'lucide-react';
import { useIntersectionObserver } from '@/lib/animations';
import { useUser } from '@/context/UserContext';
import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';

const RecentlyPlayed = () => {
  const { ref } = useIntersectionObserver();
  const { userData } = useUser();
  const [recentTracks, setRecentTracks] = useState([]);
  const [loading, setLoading] = useState(true)
  const titleRef = useFadeInOnScroll(loading);
  const apiUrl = import.meta.env.VITE_MUSICLIFY_API_URL?.replace(/\/+$/, ''); // Remove trailing slash;

  useEffect(() => {
    const fetchRecentTracks = async () => {
      if (!userData?.accessToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/recentTracks`, {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch recent tracks');
        }
        const data = await response.json();
        setRecentTracks(data.items || []);
      } catch (error) {
        console.error('Error fetching recent tracks:', error);
        setRecentTracks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentTracks();
  }, [userData]);

  // Helper to format duration from ms to MM:SS
  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Helper to format played_at to a readable string
  const formatPlayedAt = (playedAt) => {
    const date = new Date(playedAt);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  return (
    <section id="recently-played" className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="mb-10">
          <div className="inline-block px-3 py-1 bg-music-card rounded-full mb-4">
            <span className="text-music-primary text-sm font-medium">Listening History</span>
          </div>
          <h2 ref={titleRef} className="section-title text-3xl md:text-4xl opacity-0">
            Recently Played
          </h2>
          <p className="text-music-textSecondary max-w-2xl">
            Your musical journey in real time. Here are the tracks you've been enjoying lately.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentTracks.length > 0 ? (
            recentTracks.map((item, index) => {
              const track = item.track; // Extract track from item
              const albumCover = track.album.images?.[0]?.url || '/default-track.jpg';
              const artistNames = track.artists.map((a) => a.name).join(', ');
              const duration = formatDuration(track.duration_ms);
              const playedAt = formatPlayedAt(item.played_at);

              return (
                <div
                  key={track.id}
                  className="bg-music-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="relative">
                    <img
                      src={albumCover} // Updated from track.albumCover
                      alt={track.album.name}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div className="text-white">
                        <h3 className="font-bold truncate">{track.name}</h3>
                        <p className="text-sm opacity-80 truncate">{artistNames}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium truncate">{track.name}</h3> {/* Updated from track.title */}
                      <span className="text-music-primary text-sm">{duration}</span>
                    </div>
                    <p className="text-sm text-music-textSecondary mb-3 truncate">{artistNames}</p> {/* Updated from track.artist */}

                    <div className="flex items-center text-xs text-music-textSecondary">
                      <Clock3 className="h-3 w-3 mr-1" />
                      <span>{playedAt}</span> {/* Updated from track.playedAt */}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No recent tracks available.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default RecentlyPlayed;
