'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  animation?: 'fade-up' | 'fade-in' | 'slide-in-right' | 'scale-in';
}

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  animation = 'fade-up',
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const animationMap = {
    'fade-up': 'animate-fade-up',
    'fade-in': 'animate-fade-in',
    'slide-in-right': 'animate-slide-in-right',
    'scale-in': 'animate-scale-in',
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? undefined : 0,
        animationDelay: `${delay}ms`,
        animationFillMode: 'both',
      }}
    >
      <div
        className={isVisible ? animationMap[animation] : ''}
        style={{
          animationDelay: `${delay}ms`,
          animationFillMode: 'both',
        }}
      >
        {children}
      </div>
    </div>
  );
}