
import { useEffect, useRef } from 'react';
import { userProfile } from '@/lib/data';
import { Play, Clock, Music, User } from 'lucide-react';
import { useUser } from '@/context/UserContext';

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const { userData } = useUser();

  useEffect(() => {
    // Add animation classes after component mount for smooth entrance
    setTimeout(() => {
      if (titleRef.current) {
        titleRef.current.classList.add('animate-fade-in');
      }
      
      if (statsRef.current) {
        statsRef.current.classList.add('animate-fade-in');
        statsRef.current.style.animationDelay = '200ms';
      }
      
      if (imageRef.current) {
        imageRef.current.classList.add('animate-scale-in');
        imageRef.current.style.animationDelay = '400ms';
      }
    }, 100);
  }, []);

  return (
    <section className="pt-28 pb-16 md:pt-32 md:pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-music-background via-music-background to-music-card opacity-50 z-0"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col">
            <div className="inline-block px-3 py-1 bg-music-card rounded-full mb-6 self-start">
              <span className="text-music-primary text-sm font-medium">Your Music Profile</span>
            </div>
            
            <h1 
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 opacity-0"
            >
              <span className="block">Welcome back,</span>
              <span className="bg-gradient-to-r from-music-primary to-blue-400 bg-clip-text text-transparent">
                {userData?.user?.display_name}
              </span>
            </h1>
            
            <p className="text-music-textSecondary text-lg mb-8 max-w-lg">
              Explore your personalized music journey, discover your listening patterns, 
              and dive deep into your musical personality.
            </p>
            
            <div 
              ref={statsRef}
              className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 opacity-0"
            >
              <div className="bg-music-card p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-4 w-4 text-music-primary" />
                  <span className="text-sm text-music-textSecondary">Listening Time</span>
                </div>
                <p className="text-xl font-semibold">{userProfile.listeningTime.weekly}</p>
                <p className="text-xs text-music-textSecondary">This week</p>
              </div>
              
              <div className="bg-music-card p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Music className="h-4 w-4 text-music-primary" />
                  <span className="text-sm text-music-textSecondary">Top Genre</span>
                </div>
                <p className="text-xl font-semibold">{userProfile.topGenres[0]}</p>
                <p className="text-xs text-music-textSecondary">This month</p>
              </div>
              
              <div className="bg-music-card p-4 rounded-lg col-span-2 md:col-span-1">
                <div className="flex items-center space-x-2 mb-2">
                  <User className="h-4 w-4 text-music-primary" />
                  <span className="text-sm text-music-textSecondary">Profile</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xl font-semibold">{userProfile.followers}</p>
                    <p className="text-xs text-music-textSecondary">Followers</p>
                  </div>
                  <div>
                    <p className="text-xl font-semibold">{userProfile.following}</p>
                    <p className="text-xs text-music-textSecondary">Following</p>
                  </div>
                </div>
              </div>
            </div>
            <a href="https://open.spotify.com/" target="_blank" rel="noopener noreferrer">
              <button className="button-primary self-start flex items-center space-x-2">
                <Play className="h-4 w-4" />
                <span>Explore Your Music</span>
              </button>
            </a>
          </div>
          
          <div 
            ref={imageRef} 
            className="relative opacity-0"
          >
            {/* Circular profile image with blurred background */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
              <div className="absolute inset-0 bg-music-primary opacity-20 blur-3xl rounded-full"></div>
              <div className="absolute inset-4 bg-music-card rounded-full overflow-hidden border-4 border-music-primary">
                <img 
                  src={userData?.user?.images?.[0]?.url || 'https://i.pravatar.cc/150?img=68'} //Put some image url here
                  alt={userData?.user?.display_name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating genre tags */}
              {userProfile.topGenres.slice(0, 5).map((genre, index) => (
                <div 
                  key={genre}
                  className="absolute bg-music-card px-3 py-1 rounded-full text-sm animate-float"
                  style={{ 
                    top: `${10 + (index * 20)}%`, 
                    [index % 2 === 0 ? 'left' : 'right']: '-20%', 
                    animationDelay: `${index * 0.2}s` 
                  }}
                >
                  {genre}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
