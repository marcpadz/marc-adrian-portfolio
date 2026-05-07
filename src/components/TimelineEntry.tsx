import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ACCENT_COLORS = ['#4DEEEA', '#FF6AC1', '#FF9F1C', '#2ECC71', '#4DEEEA', '#FF6AC1', '#FF9F1C'];

interface TimelineEntryProps {
  date: string;
  title: string;
  company: string;
  description: string;
  index: number;
}

export default function TimelineEntry({ date, title, company, description, index }: TimelineEntryProps) {
  const entryRef = useRef<HTMLDivElement>(null);
  const color = ACCENT_COLORS[index % ACCENT_COLORS.length];

  useGSAP(() => {
    if (!entryRef.current) return;
    gsap.from(entryRef.current, {
      opacity: 0,
      x: 30,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: entryRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      delay: index * 0.1,
    });
  }, { scope: entryRef });

  return (
    <div ref={entryRef} className="flex gap-6 relative">
      {/* Timeline dot + line */}
      <div className="flex flex-col items-center">
        <div
          className="w-3 h-3 rounded-full flex-shrink-0 z-10"
          style={{ backgroundColor: color }}
        />
        {index < 6 && (
          <div
            className="w-0.5 flex-1 min-h-[40px]"
            style={{
              background: `linear-gradient(to bottom, ${color}, ${ACCENT_COLORS[(index + 1) % ACCENT_COLORS.length]})`,
            }}
          />
        )}
      </div>

      {/* Content */}
      <div className="pb-8">
        <div className="font-terminal text-sm tracking-wider" style={{ color }}>
          {date}
        </div>
        <h4 className="font-pixel text-sm text-pixel-text mt-1">{title}</h4>
        <div className="font-body text-sm font-medium text-pixel-muted mt-1">{company}</div>
        <p className="font-body text-sm text-pixel-muted/80 mt-2 max-w-[480px] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
