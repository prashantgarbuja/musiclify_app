import { useRef, useEffect, useState } from 'react';
import { Album, Disc3, ListMusic } from 'lucide-react';
import { useIntersectionObserver } from '@/lib/animations';
import { useUser } from '@/context/UserContext';
import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';

const Library = () => {
  const { ref } = useIntersectionObserver();
  const { userData } = useUser();
  const [libraryItems, setLibraryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const titleRef = useFadeInOnScroll(loading); 
  const apiUrl = import.meta.env.VITE_MUSICLIFY_API_URL;

  useEffect(() => {
    const fetchLibrary = async () => {
      if (!userData?.accessToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${apiUrl}/library`, {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch library items');
        }
        const data = await response.json();
        setLibraryItems(data.items || []);
      } catch (error) {
        console.error('Error fetching library:', error);
        setLibraryItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLibrary();
  }, [userData]);

  return (
    <section id="your-library" className="py-16 md:py-24 bg-music-card bg-opacity-30">
      <div className="container mx-auto px-6">
        <div className="mb-10">
          <div className="inline-block px-3 py-1 bg-music-card rounded-full mb-4">
            <span className="text-music-primary text-sm font-medium">Collections</span>
          </div>
          <h2 ref={titleRef} className="section-title text-3xl md:text-4xl opacity-0">
            Your Library
          </h2>
          <p className="text-music-textSecondary max-w-2xl">
            Your personal collection of music. Browse your saved albums, playlists, and favorites.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {libraryItems.length > 0 ? (
            libraryItems.map((item, index) => {
              const isPlaylist = item.type === 'playlist';
              const title = item.name;
              const description = isPlaylist ? item.description : item.artists.map(a => a.name).join(', ');
              const coverImage = item.images?.[0]?.url || '/default-cover.jpg';
              const itemCount = isPlaylist ? item.tracks.total : item.total_tracks;
              const icon = isPlaylist ? <ListMusic className="h-5 w-5" /> : <Album className="h-5 w-5" />;

              return (
                <div
                  key={item.id}
                  className="bg-music-background rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group opacity-0 animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="relative">
                    <img
                      src={coverImage}
                      alt={title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-0 right-0 bg-black/60 m-3 px-2 py-1 rounded-md flex items-center gap-1">
                      {icon}
                      <span className="text-xs">{itemCount} tracks</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <h3 className="text-white font-bold text-lg truncate">{title}</h3>
                      <p className="text-white/80 text-sm truncate">{description}</p>
                    </div>
                  </div>

                  <div className="p-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Disc3 className="h-5 w-5 text-music-primary" />
                      <span className="text-sm text-music-textSecondary capitalize">{item.type}</span>
                    </div>

                    <button className="flex items-center justify-center h-10 w-10 rounded-full bg-music-primary text-white shadow-md hover:bg-music-primary/90 transition-colors">
                      <ListMusic className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No library items available.</p>
          )}
        </div>

        <div className="mt-8 text-center">
          <button className="px-6 py-3 rounded-full border border-music-primary text-music-primary hover:bg-music-primary hover:text-white transition-colors duration-300">
            Show All Items
          </button>
        </div>
      </div>
    </section>
  );
};

export default Library;