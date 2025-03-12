import { useEffect, useRef } from "react";

export const useFadeInOnScroll = (loading: boolean) => {
  const ref = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (loading) return; // Don't run observer when loading

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && ref.current) {
          ref.current.classList.add("animate-fade-in");
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [loading]);

  return ref; // Return the ref so it can be assigned to an element
};