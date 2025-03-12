import { Github, X, Linkedin, Music } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 bg-music-background border-t border-music-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-4">
              <Music className="h-6 w-6 text-music-primary" />
              <span className="text-xl font-bold tracking-tight">Musiclify</span>
            </div>
            <p className="text-music-textSecondary max-w-md">
              Musiclify is a beautiful Spotify wrapper that showcases your musical interests and listening habits with elegant visualizations and personality trails.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              <a href="https://github.com/prashantgarbuja" target="_blank" rel="noopener noreferrer" className="text-music-textSecondary hover:text-music-primary transition-colors duration-200">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://x.com/garbuja_p" target="_blank" rel="noopener noreferrer" className="text-music-textSecondary hover:text-music-primary transition-colors duration-200">
                <X className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/in/prashant-garbuja/" target="_blank" rel="noopener noreferrer" className="text-music-textSecondary hover:text-music-primary transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            <p className="text-music-textSecondary text-sm">
              &copy; {new Date().getFullYear()} Musiclify. All rights reserved.
            </p>
          </div>
        </div>
        
        <div className="mt-10 pt-8 border-t border-music-border text-center">
          <p className="text-music-textSecondary text-xs">
            This app is not affiliated with Spotify. It's a showcase project that demonstrates how the Spotify API could be used to create beautiful music visualizations.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
