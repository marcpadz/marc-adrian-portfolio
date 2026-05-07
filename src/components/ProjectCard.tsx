import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProjectCardProps {
  tags: string;
  title: string;
  description: string;
  tech: string;
  thumbnail: string;
  index: number;
}

export default function ProjectCard({ tags, title, description, tech, thumbnail, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current) return;
    gsap.from(cardRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      delay: index * 0.1,
    });
  }, { scope: cardRef });

  return (
    <div
      ref={cardRef}
      className="bg-pixel-bg border border-pixel-amber/20 rounded-lg overflow-hidden card-hover-amber group"
    >
      {/* Thumbnail */}
      <div className="aspect-video overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover pixel-art group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <span className="font-terminal text-xs text-pixel-amber bg-pixel-amber/10 px-2 py-1 rounded">
          {tags}
        </span>
        <h3 className="font-pixel text-sm text-pixel-text mt-3 leading-relaxed">{title}</h3>
        <p className="font-body text-sm text-pixel-muted mt-2 leading-relaxed">{description}</p>
        <div className="font-terminal text-xs text-pixel-cyan mt-4 tracking-wide">{tech}</div>
      </div>
    </div>
  );
}
