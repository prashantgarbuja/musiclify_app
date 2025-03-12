
import { useEffect, useRef } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
}

export const useIntersectionObserver = (options: UseIntersectionObserverOptions = {}) => {
  const { threshold = 0.1, rootMargin = '0px' } = options;
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useRef<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible.current) {
          isVisible.current = true;
          if (ref.current) {
            ref.current.classList.add('animate-fade-in');
          }
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin]);

  return { ref, isVisible: isVisible.current };
};

// Hook for animating waveform bars
export const useWaveformAnimation = () => {
  const waveformRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bars = waveformRef.current?.querySelectorAll('.waveform-bar');
    
    if (!bars) return;
    
    bars.forEach((bar, index) => {
      const element = bar as HTMLElement;
      element.style.animationDelay = `${index * 0.2}s`;
      element.style.height = `${Math.floor(Math.random() * 70) + 10}%`;
    });
  }, []);

  return waveformRef;
};

// Hook for smooth scroll animations
export const useSmoothScroll = () => {
  const scrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return { scrollToElement };
};

export const useHoverScale = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseEnter = () => {
      element.style.transform = 'scale(1.05)';
      element.style.transition = 'transform 0.3s ease-out';
    };

    const handleMouseLeave = () => {
      element.style.transform = 'scale(1)';
      element.style.transition = 'transform 0.3s ease-out';
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return ref;
};
