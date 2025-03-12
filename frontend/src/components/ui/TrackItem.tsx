
import { useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import type { Track } from '@/lib/data';
import { useWaveformAnimation } from '@/lib/animations';

interface TrackItemProps {
  track: Track;
  index: number;
}

const TrackItem = ({ track, index }: TrackItemProps) => {
  const [isPlaying, setIsPlaying] = useState(track.isPlaying || false);
  const [isHovered, setIsHovered] = useState(false);
  const waveformRef = useWaveformAnimation();
  
  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
  };

  // Convert duration_ms to MM:SS format
  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const albumCover = track.album.images?.[0]?.url || '/default-track.jpg';
  const artistNames = track.artists.map((a) => a.name).join(', ');
  const duration = formatDuration(track.duration_ms);

  return (
    <div 
      className="track-item group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Index/Play button */}
      <div className="w-10 flex-shrink-0 flex items-center justify-center">
        {isPlaying ? (
          <div 
            className="waveform-container" 
            ref={waveformRef}
            onClick={handlePlayToggle}
          >
            <div className="waveform-bar h-4"></div>
            <div className="waveform-bar h-6"></div>
            <div className="waveform-bar h-8"></div>
            <div className="waveform-bar h-6"></div>
            <div className="waveform-bar h-4"></div>
          </div>
        ) : (
          <>
            {isHovered ? (
              <button 
                onClick={handlePlayToggle}
                className="text-music-primary hover:text-music-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <Play className="h-6 w-6 fill-current" />
              </button>
            ) : (
              <span className="text-music-textSecondary">{index + 1}</span>
            )}
          </>
        )}
      </div>
      
      {/* Album artwork */}
      <div className="w-12 h-12 mr-4 rounded-md overflow-hidden flex-shrink-0">
        <img 
          src={albumCover} 
          alt={track.album.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      
      {/* Track info */}
      <div className="flex-grow overflow-hidden">
        <h3 className="font-medium truncate">{track.name}</h3>
        <p className="text-sm text-music-textSecondary truncate">{artistNames}</p>
      </div>
      
      {/* Album name (hidden on mobile) */}
      <div className="hidden md:block w-1/4 text-music-textSecondary text-sm truncate px-4">
        {track.album.name}
      </div>
      
      {/* Duration */}
      <div className="text-music-textSecondary text-sm flex-shrink-0 w-16 text-right">
        {duration}
      </div>
    </div>
  );
};

export default TrackItem;
