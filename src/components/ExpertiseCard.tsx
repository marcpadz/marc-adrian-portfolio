import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ExpertiseCardProps {
  number: string;
  tag: string;
  title: string;
  description: string;
  footnote: string;
  index: number;
}

export default function ExpertiseCard({ number, tag, title, description, footnote, index }: ExpertiseCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current) return;
    gsap.from(cardRef.current, {
      opacity: 0,
      y: 40,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      delay: index * 0.12,
    });
  }, { scope: cardRef });

  return (
    <div
      ref={cardRef}
      className="bg-pixel-bg border border-pixel-cyan/20 rounded-lg p-8 card-hover-glow"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="font-pixel text-xs text-pixel-pink">{number}</span>
        <span className="font-terminal text-xs text-pixel-amber bg-pixel-amber/10 px-2 py-1 rounded">
          {tag}
        </span>
      </div>
      <h3 className="font-pixel text-sm text-pixel-text leading-relaxed mt-3">{title}</h3>
      <p className="font-body text-sm text-pixel-muted mt-2 leading-relaxed">{description}</p>
      <p className="font-terminal text-sm text-pixel-pink/80 mt-4 italic">{footnote}</p>
    </div>
  );
}
