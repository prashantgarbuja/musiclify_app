
import { useRef, useEffect } from 'react';
import { Play } from 'lucide-react';
import type { Artist } from '@/lib/data';

interface ArtistCardProps {
  artist: Artist;
  index: number;
}

const ArtistCard = ({ artist, index }: ArtistCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    // Add staggered animation delay based on index
    card.style.animationDelay = `${index * 100}ms`;
    
    // Add animation class after a small delay
    setTimeout(() => {
      card.classList.add('animate-fade-in');
    }, 100);
  }, [index]);

  return (
    <div 
      ref={cardRef}
      className="artist-card opacity-0 group"
    >
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={artist.images?.[0]?.url} 
          alt={artist.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
          <button className="bg-music-primary text-white rounded-full p-3 opacity-0 transform scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
            <Play className="h-6 w-6 fill-current" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg truncate">{artist.name}</h3>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {artist.genres.slice(0, 2).map((genre) => (
            <span key={genre} className="text-xs px-2 py-1 bg-music-cardHover rounded-full text-music-textSecondary">
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
