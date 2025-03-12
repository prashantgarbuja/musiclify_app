import { useEffect, useRef } from 'react';
import { Headphones, Music, Mic, Radio } from 'lucide-react';
import { personalityTraits, userProfile } from '@/lib/data';
import { useIntersectionObserver } from '@/lib/animations';
import MBTIDonutChart from '../ui/MBTIDonutChart';

const mbtiData = [
  { 
    trait: "E/I", 
    values: [65, 35],
    icon: <Headphones className="h-6 w-6 text-purple-400" />,
    description: "Extrovert vs Introvert"
  },
  { 
    trait: "S/N", 
    values: [40, 60],
    icon: <Music className="h-6 w-6 text-purple-400" />,
    description: "Sensing vs Intuition"
  },
  { 
    trait: "T/F", 
    values: [70, 30],
    icon: <Mic className="h-6 w-6 text-purple-400" />,
    description: "Thinking vs Feeling" 
  },
  { 
    trait: "J/P", 
    values: [45, 55],
    icon: <Radio className="h-6 w-6 text-purple-400" />,
    description: "Judging vs Perceiving"
  }
];

const MusicPersonality = () => {
  const { ref } = useIntersectionObserver();
  
  return (
    <section id="personality" className="py-16 md:py-24 bg-gradient-to-b from-music-background to-music-card/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 bg-music-card rounded-full mb-4">
            <span className="text-music-primary text-sm font-medium">Your Music Personality</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-music-primary">
            How Music Shapes Your Personality
          </h2>
          <p className="text-music-textSecondary max-w-2xl mx-auto">
            Your MBTI (Myers-Briggs Type Indicator) based on your music preferences reveals your unique 
            musical personality and listening patterns.
          </p>
        </div>
        
        <div ref={ref} className="opacity-0 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {mbtiData.map((item, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-music-card to-music-card/50 p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-purple-500/20 border border-purple-500/10"
              >
                <div className="flex flex-col items-center mb-4">
                  <div className="p-3 rounded-full bg-purple-900/30 mb-3">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-music-primary">{item.trait}</h3>
                  <span className="text-sm text-music-textSecondary mt-1">{item.description}</span>
                </div>
                
                <div className="h-48 flex items-center justify-center">
                  <MBTIDonutChart 
                    values={item.values}
                    labels={item.trait.split('/')}
                    delay={index * 0.2}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-gradient-to-br from-music-card to-music-card/60 rounded-2xl p-8 max-w-3xl mx-auto shadow-xl border border-purple-500/10 hover:shadow-purple-500/20 transition-all duration-500">
            <h3 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-music-primary">
              Your Top Personality Traits
            </h3>
            <div className="space-y-6">
              {personalityTraits.map((trait, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-lg">{trait.trait}</span>
                    <span className="text-music-primary font-bold">{trait.score}%</span>
                  </div>
                  <div className="h-3 bg-music-card/30 border border-music-border/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-music-primary rounded-full"
                      style={{ 
                        width: `${trait.score}%`,
                        animationDelay: `${index * 0.1}s`,
                      }}
                    ></div>
                  </div>
                  <p className="text-sm text-music-textSecondary italic">{trait.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicPersonality;
