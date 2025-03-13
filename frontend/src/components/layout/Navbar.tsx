
import { useState, useEffect } from 'react';
import { Music, Library, Clock3, Star, ListMusic, Activity, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useUser } from '@/context/UserContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('top-artists');
  const { userData } = useUser();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_MUSICLIFY_API_URL?.replace(/\/+$/, ''); // Remove trailing slash;
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }

      // Update active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      let currentSection = 'top-artists';

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 100) {
          currentSection = section.id;
        }
      });

      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled, activeSection]);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogout = async () => {
    try {
      // Call backend to logout
      const response = await fetch(`${apiUrl}/logout`, {
        method: "GET",
        credentials: "include", // Ensure cookies/session info are sent
      });
  
      if (!response.ok) throw new Error("Logout request failed");
  
      // Show success toast before redirecting
      toast.success('Successfully logged out', {
        position: 'top-center',
        duration: 3000,
        className: 'bg-music-card border border-music-primary/20',
        icon: <LogOut className="h-5 w-5 text-music-primary" />,
        style: {
          animation: 'fade-in 0.3s ease-out forwards',
        },
      });
  
      // Delay navigation slightly to show toast
      setTimeout(() => {
        navigate('/?logout'); // Redirect to landing page with logout param
      }, 1000); // Wait 1 second for better UX
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };


  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'
      }`}
    >
      <nav className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Music className="h-8 w-8 text-music-primary" />
          <span className="text-2xl font-bold tracking-tight">Musiclify</span>
        </div>
        
        <ul className="hidden md:flex space-x-1">
          <li>
            <button 
              onClick={() => scrollToSection('top-artists')}
              className={`nav-link flex items-center gap-1 ${activeSection === 'top-artists' ? 'active' : ''}`}
            >
              <Star className="h-4 w-4" />
              <span>Top Artists</span>
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('top-tracks')}
              className={`nav-link flex items-center gap-1 ${activeSection === 'top-tracks' ? 'active' : ''}`}
            >
              <ListMusic className="h-4 w-4" />
              <span>Top Tracks</span>
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('recently-played')}
              className={`nav-link flex items-center gap-1 ${activeSection === 'recently-played' ? 'active' : ''}`}
            >
              <Clock3 className="h-4 w-4" />
              <span>Recently Played</span>
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('your-library')}
              className={`nav-link flex items-center gap-1 ${activeSection === 'your-library' ? 'active' : ''}`}
            >
              <Library className="h-4 w-4" />
              <span>Your Library</span>
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('personality')}
              className={`nav-link flex items-center gap-1 ${activeSection === 'personality' ? 'active' : ''}`}
            >
              <Activity className="h-4 w-4" />
              <span>Personality</span>
            </button>
          </li>
        </ul>
        
        <div className="flex items-center space-x-4">
          {/* New greeting text */}
          <div className="hidden md:block text-music-text">
            <span className="mr-1">Hi,</span>
            <span className="font-medium text-music-primary">{userData?.user?.display_name}</span>
          </div>
          
          <div className="relative group">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-music-primary transition-all duration-300 group-hover:border-opacity-80">
              <img 
                src={userData?.user?.images?.[0]?.url || 'https://i.pravatar.cc/150?img=68'} 
                alt="User profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute right-0 mt-2 w-48 bg-music-card rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right">
              {/* <a href="#" className="block px-4 py-2 text-sm text-music-text hover:bg-music-cardHover">Profile</a>
              <a href="#" className="block px-4 py-2 text-sm text-music-text hover:bg-music-cardHover">Settings</a> */}
              <button 
                onClick={handleLogout}
                className="flex items-center w-full text-left px-4 py-2 text-sm text-rose-400 hover:bg-music-cardHover"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Log out
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-music-card border-t border-music-border">
        <div className="flex justify-around py-3">
          <button onClick={() => scrollToSection('top-artists')} className={`flex flex-col items-center ${activeSection === 'top-artists' ? 'text-music-primary' : 'text-music-textSecondary'}`}>
            <Star className="h-5 w-5" />
            <span className="text-xs mt-1">Artists</span>
          </button>
          <button onClick={() => scrollToSection('top-tracks')} className={`flex flex-col items-center ${activeSection === 'top-tracks' ? 'text-music-primary' : 'text-music-textSecondary'}`}>
            <ListMusic className="h-5 w-5" />
            <span className="text-xs mt-1">Tracks</span>
          </button>
          <button onClick={() => scrollToSection('recently-played')} className={`flex flex-col items-center ${activeSection === 'recently-played' ? 'text-music-primary' : 'text-music-textSecondary'}`}>
            <Clock3 className="h-5 w-5" />
            <span className="text-xs mt-1">Recent</span>
          </button>
          <button onClick={() => scrollToSection('your-library')} className={`flex flex-col items-center ${activeSection === 'your-library' ? 'text-music-primary' : 'text-music-textSecondary'}`}>
            <Library className="h-5 w-5" />
            <span className="text-xs mt-1">Library</span>
          </button>
          <button onClick={() => scrollToSection('personality')} className={`flex flex-col items-center ${activeSection === 'personality' ? 'text-music-primary' : 'text-music-textSecondary'}`}>
            <Activity className="h-5 w-5" />
            <span className="text-xs mt-1">You</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;