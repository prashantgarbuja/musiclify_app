import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Music, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-music-background">
      <motion.div 
        className="text-center p-8 glass-card rounded-xl max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 blur-md bg-music-primary/20 rounded-full"></div>
            <Music className="h-20 w-20 text-music-primary relative z-10" />
          </div>
        </div>
        
        <h1 className="text-5xl font-bold mb-4 text-music-text">404</h1>
        <div className="waveform-container mb-6">
          <div className="waveform-bar h-6"></div>
          <div className="waveform-bar h-8"></div>
          <div className="waveform-bar h-10"></div>
          <div className="waveform-bar h-8"></div>
          <div className="waveform-bar h-6"></div>
        </div>
        <p className="text-xl font-medium text-music-text mb-2">Track Not Found</p>
        <p className="text-music-textSecondary mb-8">
          The page you're looking for doesn't exist or has been moved to another playlist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => navigate(-1)} 
            variant="outline"
            className="border-music-border text-music-textSecondary hover:text-music-text hover:bg-music-cardHover flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          <Button 
            onClick={() => navigate("/")} 
            className="bg-music-primary hover:bg-music-primary/80 flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Return Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
