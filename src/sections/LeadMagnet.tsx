import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTypewriter } from '../hooks/useTypewriter';

gsap.registerPlugin(ScrollTrigger);

const BOOT_LINES = [
  '> MARC_ADRIAN_OS v13.1 booting...',
  '> Loading cat modules... [██████████] 100%',
  '> 4 cats detected',
  '> AI co-pilot: ONLINE',
  '> Scanning brand readiness...',
];

const FEATURES = [
  '5 minutes flat',
  'Personalized scorecard',
  'Specific next steps',
  'No pitch, ever',
  '(Cat photos accepted)',
];

function BootLine({ text, delay }: { text: string; delay: number }) {
  const { displayText, isTyping } = useTypewriter(text, 30, delay);
  return (
    <div className="font-terminal text-base text-pixel-cyan">
      {displayText}
      {isTyping && <span className="animate-blink">_</span>}
    </div>
  );
}

export default function LeadMagnet() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [bootStarted, setBootStarted] = useState(false);

  useGSAP(() => {
    if (!terminalRef.current || !sectionRef.current) return;
    gsap.from(terminalRef.current, {
      opacity: 0,
      y: 60,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none none',
        onEnter: () => setBootStarted(true),
      },
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full bg-pixel-black py-[120px] crt-overlay"
    >
      <div className="max-w-[700px] mx-auto px-6 relative z-20">
        {/* Terminal Window */}
        <div
          ref={terminalRef}
          className="bg-pixel-black-alt border border-pixel-cyan rounded-lg p-8 md:p-10"
          style={{ boxShadow: '0 0 40px rgba(77, 238, 234, 0.15)' }}
        >
          {/* Boot Sequence */}
          <div className="space-y-1 mb-8 min-h-[120px]">
            {bootStarted &&
              BOOT_LINES.map((line, i) => (
                <BootLine key={i} text={line} delay={i * 600} />
              ))}
          </div>

          {/* Headline */}
          <h2 className="font-pixel text-xl md:text-2xl text-pixel-text text-center leading-relaxed">
            Is your brand{' '}
            <span className="text-pixel-cyan">actually ready</span>
            <br />
            for long-term growth?
          </h2>

          {/* Description */}
          <p className="font-body text-base text-pixel-muted text-center max-w-[480px] mx-auto mt-4">
            Most founders are either further behind — or further ahead — than they think.
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6">
            {FEATURES.map((feature, i) => (
              <span key={i} className="font-terminal text-sm text-pixel-muted flex items-center gap-2">
                <span className="text-pixel-green">✓</span> {feature}
              </span>
            ))}
          </div>

          {/* Email Form */}
          <form
            className="flex flex-col sm:flex-row gap-3 justify-center mt-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="your@email.com"
              className="bg-pixel-bg border border-pixel-cyan/30 rounded px-4 py-3.5 font-terminal text-base text-pixel-text placeholder:text-pixel-muted/50 focus:outline-none focus:border-pixel-cyan w-full sm:w-[280px]"
            />
            <button
              type="submit"
              className="bg-pixel-pink text-pixel-bg font-pixel text-xs px-6 py-3.5 rounded hover:scale-105 transition-all duration-200 glow-pink whitespace-nowrap"
            >
              Take the Assessment →
            </button>
          </form>

          {/* Note */}
          <p className="font-terminal text-xs text-pixel-muted/60 text-center mt-4">
            // no spam · no pitch · just signal · cats optional
          </p>

          {/* Blinking cursor */}
          <div className="font-terminal text-lg text-pixel-cyan mt-6">
            <span className="animate-blink">{'>'}_</span>
          </div>
        </div>
      </div>
    </section>
  );
}
