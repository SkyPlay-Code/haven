import React, { useEffect, useRef, useState } from 'react';

interface MotionSectionProps {
  children: React.ReactNode;
  className?: string;
}

export const MotionSection: React.FC<MotionSectionProps> = ({ children, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Optional: Disconnect if you want it to only animate once per session
          // observer.disconnect();
        } else {
             // Optional: Reset visibility to re-trigger animation when scrolling back up
             setIsVisible(false);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
        ref={ref} 
        className={`${className} ${isVisible ? 'animate-blur-in opacity-100' : 'opacity-0'}`}
        style={{ willChange: 'transform, opacity, filter' }}
    >
      {children}
    </div>
  );
};
