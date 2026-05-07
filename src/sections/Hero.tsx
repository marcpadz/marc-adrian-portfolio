import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PixelMarquee from '../components/PixelMarquee';
import StatBox from '../components/StatBox';
import { useTypewriter } from '../hooks/useTypewriter';

gsap.registerPlugin(ScrollTrigger);

const CYCLING_MESSAGES = [
  'build brands that compound.',
  'stop chasing the algorithm.',
  'design growth that stays.',
  'earn long-term authority.',
  'create systems, not campaigns.',
  'keep their AI from judging them.',
];

const TICKER_ITEMS = [
  'Organic Growth',
  'Brand Strategy',
  'Content Systems',
  '4 Cats',
  '13 Years',
  'SEO Architecture',
  'AI in a Bubble',
  'Long-Term Thinking',
  'Currently Watching TV',
  '20+ Brands Built',
  'Compounding Results',
  'Growth Systems',
  'Still Figuring It Out',
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const dioramaRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [messageIndex, setMessageIndex] = useState(0);

  const { displayText, isTyping } = useTypewriter(CYCLING_MESSAGES[messageIndex], 50, 500);

  // Cycle through messages
  useEffect(() => {
    if (isTyping) return;
    const timeout = setTimeout(() => {
      setMessageIndex((prev) => (prev + 1) % CYCLING_MESSAGES.length);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [isTyping]);

  // Parallax effect
  useGSAP(() => {
    if (!dioramaRef.current || !heroRef.current) return;
    gsap.to(dioramaRef.current, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, { scope: heroRef });

  // Entrance animations
  useGSAP(() => {
    if (!textRef.current) return;
    const lines = textRef.current.querySelectorAll('.hero-line');
    const stats = textRef.current.querySelectorAll('.stat-item');

    gsap.from(lines, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.15,
      delay: 0.3,
    });

    gsap.from(stats, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.1,
      delay: 0.9,
    });
  }, { scope: textRef });

  return (
    <section ref={heroRef} className="relative min-h-[100dvh] w-full overflow-hidden">
      {/* Diorama Background */}
      <div
        ref={dioramaRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{
          backgroundImage: 'url(/assets/diorama-hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Gradient overlay for text readability */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to right, rgba(26,26,46,0.92) 0%, rgba(26,26,46,0.7) 40%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div
        ref={textRef}
        className="relative z-10 flex flex-col justify-center min-h-[100dvh] max-w-[1200px] mx-auto px-6"
      >
        <div className="max-w-[520px]">
          {/* Label */}
          <p className="hero-line font-terminal text-sm text-pixel-amber tracking-[0.06em] mb-6">
            Growth Systems Architect · Est. 2011 · 4 Cats on Payroll
          </p>

          {/* Headlines */}
          <h1 className="space-y-2 mb-6">
            <span className="hero-line block font-pixel text-3xl md:text-4xl text-pixel-cyan leading-tight">
              Organic growth.
            </span>
            <span className="hero-line block font-pixel text-3xl md:text-4xl text-pixel-text leading-tight">
              Built to last.
            </span>
            <span className="hero-line block font-pixel text-3xl md:text-4xl text-pixel-pink leading-tight">
              Between naps.
            </span>
          </h1>

          {/* Cycling typewriter text */}
          <div className="hero-line font-terminal text-lg text-pixel-muted mb-8 h-8">
            I help founders: {displayText}
            <span className="animate-blink text-pixel-cyan">_</span>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 mb-10">
            <div className="stat-item">
              <StatBox number="13+" label="Years" />
            </div>
            <div className="stat-item">
              <StatBox number="20+" label="Brands" />
            </div>
            <div className="stat-item">
              <StatBox number="4" label="Cats" />
            </div>
            <div className="stat-item">
              <StatBox number="1" label="AI" />
            </div>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div className="absolute bottom-0 left-0 w-full z-10 py-4 border-t border-pixel-cyan/10 bg-pixel-bg/50 backdrop-blur-sm">
        <PixelMarquee speed={40}>
          {TICKER_ITEMS.map((item, i) => (
            <span key={i} className="font-terminal text-sm text-pixel-muted/60 mx-4">
              {item} <span className="text-pixel-cyan/40 mx-2">◆</span>
            </span>
          ))}
        </PixelMarquee>
      </div>
    </section>
  );
}
