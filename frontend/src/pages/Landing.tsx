
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, LogIn, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Landing = () => {
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [authUrl, setAuthUrl] = useState('')
  const navigate = useNavigate()
  const apiUrl = import.meta.env.VITE_MUSICLIFY_API_URL;
  
  const toggleHowItWorks = () => {
    setShowHowItWorks(!showHowItWorks);
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    if (error) {
      console.error('Login error:', error);
      // Optionally show an error message to the user
      return;
    }
    
      try {
        const response = await fetch(apiUrl, {
          credentials: 'include',
        });
        const data = await response.json();
        if (data.isAuthenticated) {
          navigate('/index'); // Redirect to Index page if authenticated
        } else {
          setAuthUrl(data.authUrl);
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      }
    };
    checkAuthStatus();
  }, [navigate]);

  const handleLogin = () => {
    if (authUrl) window.location.href = authUrl;
  };

  return (
    <div className="min-h-screen bg-music-background text-music-text flex flex-col">
      {/* Gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-music-primary/10 to-purple-900/20 pointer-events-none" />
      
      {/* Main content */}
      <div className="flex-grow flex flex-col items-center justify-center px-6 relative z-10">
        <div className="max-w-5xl w-full">
          {/* Logo and title - enhanced with animation and visual effects */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-4"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.8,
                ease: "easeOut"
              }}
            >
              <span className="relative inline-block">
                {/* Decorative element behind the text */}
                <span className="absolute -inset-1 blur-xl bg-gradient-to-r from-purple-600 via-blue-500 to-music-primary opacity-30 rounded-lg"></span>
                
                {/* Enhanced title with gradient and text shadow */}
                <span className="relative bg-gradient-to-br from-[#9b87f5] via-[#0EA5E9] to-[#1db954] bg-clip-text text-transparent 
                  drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] font-extrabold tracking-tight">
                  Musiclify
                </span>
              </span>
            </motion.h1>
            <p className="text-xl md:text-2xl text-music-textSecondary">
              Discover your unique musical journey and preferences
            </p>
          </motion.div>
          
          {/* Call to action buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col md:flex-row gap-6 justify-center items-center mb-12"
          >
            <Button 
              onClick={handleLogin}
              className="flex items-center gap-2 bg-music-primary hover:bg-music-primary/90 text-white px-8 py-3 rounded-full text-lg font-medium transition-all transform hover:scale-105 hover:shadow-neon"
            >
              <LogIn className="w-5 h-5" />
              Login with Spotify
            </Button>
            
            <button 
              onClick={toggleHowItWorks}
              className="flex items-center gap-2 bg-music-card hover:bg-music-cardHover text-white px-8 py-3 rounded-full text-lg font-medium transition-all transform hover:scale-105"
            >
              <Music className="w-5 h-5" />
              {showHowItWorks ? 'Hide Details' : 'How it Works?'}
            </button>
          </motion.div>
          
          {/* How it works section */}
          <AnimatePresence>
            {showHowItWorks && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden"
              >
                <div className="bg-music-card rounded-2xl p-8 shadow-lg mb-10">
                  <h2 className="text-2xl font-bold mb-6 text-center">What Musiclify Offers:</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
                    <FeatureItem text="Show Your Top Played Tracks/Artists" />
                    {/* <FeatureItem text="Of All Time" isSubItem />
                    <FeatureItem text="From Past 6 Months" isSubItem />
                    <FeatureItem text="From Past Month" isSubItem /> */}
                    <FeatureItem text="Your Saved Tracks" />
                    <FeatureItem text="Check your Personality Trait" />
                    <FeatureItem text="Your Saved Albums" />
                    <FeatureItem text="Your Recent Played Tracks" />
                    {/* <FeatureItem text="New Releases" />
                    <FeatureItem text="Featured Playlists" />
                    <FeatureItem text="Current Playing Track" />
                    <FeatureItem text="Search Tracks/Artists/Playlists" /> */}
                    <FeatureItem text="Other Feature Coming Soon!" />
                  </div>
                  
                  <div className="mt-8 flex justify-center">
                    <button 
                      onClick={() => {/* Video demo functionality would go here */}}
                      className="flex items-center gap-2 bg-music-background hover:bg-music-card border border-music-primary text-music-primary px-6 py-2 rounded-full transition-all"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      Watch Demo
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Preview image - updated to better showcase the image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl mt-8"
          >
            <div className="bg-music-card p-4 rounded-t-xl flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <div className="text-sm text-music-textSecondary mx-auto">Musiclify Preview</div>
            </div>
            <div className="aspect-video bg-music-background relative">
              {/* Updated image display with better positioning */}
              <img 
                src="/images/prototype.png" 
                alt="Musiclify personality trait showcase" 
                className="w-full h-full object-contain"
              />
              
              {/* Moved text overlay to top with semi-transparent background */}
              <div className="absolute top-0 left-0 right-0 flex items-center justify-center">
                <div className="text-center py-3 px-6 rounded-b-lg backdrop-blur-sm bg-black/40 max-w-md">
                  <h3 className="text-xl font-medium">Discover Your Music Personality</h3>
                  <p className="text-sm text-music-textSecondary">Our AI analyzes your listening habits to reveal your unique traits</p>
                </div>
              </div>
              
              {/* Decorative visual elements */}
              <div className="absolute -bottom-4 left-10 w-20 h-20 rounded-full bg-music-primary/20 blur-2xl" />
              <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-purple-500/10 blur-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="py-6 text-center text-music-textSecondary text-sm">
        <p>© 2025 Musiclify. All rights reserved.</p>
      </div>
    </div>
  );
};

const FeatureItem = ({ text, isSubItem = false }: { text: string, isSubItem?: boolean }) => (
  <div className={`flex items-center ${isSubItem ? 'ml-8 col-span-2 md:col-span-1' : ''}`}>
    {!isSubItem && <div className="w-2 h-2 rounded-full bg-music-primary mr-3" />}
    {isSubItem && <div className="w-1 h-1 rounded-full bg-music-textSecondary mr-3" />}
    <span className={`${isSubItem ? 'text-music-textSecondary' : 'text-white'}`}>{text}</span>
  </div>
);

export default Landing;
