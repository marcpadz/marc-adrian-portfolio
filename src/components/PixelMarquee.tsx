import { useRef, useEffect } from 'react';

interface PixelMarqueeProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export default function PixelMarquee({ children, speed = 20, className = '' }: PixelMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const measure = () => {
      if (contentRef.current && containerRef.current) {
        const firstChild = contentRef.current.children[0] as HTMLElement;
        if (firstChild) {
          const width = firstChild.offsetWidth;
          contentRef.current.style.setProperty('--marquee-width', `${width}px`);
        }
      }
    };
    requestAnimationFrame(measure);
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [children]);

  return (
    <div ref={containerRef} className={`overflow-hidden whitespace-nowrap w-full ${className}`}>
      <div
        ref={contentRef}
        className="inline-flex"
        style={{
          animation: `marquee-scroll ${speed}s linear infinite`,
        }}
      >
        <div className="inline-flex items-center">{children}</div>
        <div className="inline-flex items-center">{children}</div>
      </div>
    </div>
  );
}
