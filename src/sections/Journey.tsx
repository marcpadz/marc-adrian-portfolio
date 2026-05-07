import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TimelineEntry from '../components/TimelineEntry';

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    date: '2024 — Present',
    title: 'Marketing Director',
    company: 'Eloqwnt Creative Agency',
    description: 'Leading organic growth for scaling brands. Systems that let lean teams produce authority. Cats not promoted. Yet.',
  },
  {
    date: 'Aug 2023 — Dec 2024',
    title: 'Marketing Lead',
    company: 'Treantly',
    description: 'CEO personal brand from zero. Content strategy, distribution, tracking. Zero cats. Faster timeline.',
  },
  {
    date: 'Apr 2023 — Jun 2024',
    title: 'Marketing Comms Lead',
    company: 'DMX',
    description: 'Led comms across two offices. Branding videos, accounts, website revamp. Only two cats at the time.',
  },
  {
    date: 'Jun 2022 — May 2023',
    title: 'Content Marketing',
    company: 'StoreHub',
    description: 'SEO content for B2B SaaS across MY/PH/TH. Content calendars, CRM. Cats don\'t respect SaaS metrics.',
  },
  {
    date: 'May 2017 — Jun 2022',
    title: 'Senior Writer & Strategist',
    company: 'iMoney',
    description: 'Five years, three markets. Content strategy, EDM optimization. Cat count: classified.',
  },
  {
    date: 'Jan 2016 — May 2017',
    title: 'Editorial Writer',
    company: 'iPrice Group',
    description: 'Product pages for organic traffic across SE Asia. Early SEO instincts.',
  },
  {
    date: 'Dec 2011 — Jan 2016',
    title: 'Freelance Writer',
    company: 'iWriter.com',
    description: 'Where it started. Dozens of industries, four years. Zero cats. Thought it was hard.',
  },
];

export default function Journey() {
  const bannerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!bannerRef.current) return;
    gsap.to(bannerRef.current, {
      backgroundPositionX: '-10%',
      ease: 'none',
      scrollTrigger: {
        trigger: bannerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, { scope: bannerRef });

  return (
    <section id="journey" className="w-full bg-pixel-bg py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block font-terminal text-xs text-pixel-pink bg-pixel-pink/15 px-3.5 py-1.5 rounded mb-6">
            The journey
          </span>
          <h2 className="font-pixel text-2xl md:text-3xl">
            <span className="text-pixel-cyan">13 years.</span>
            <span className="text-pixel-text"> Still one direction.</span>
          </h2>
          <p className="font-terminal text-base text-pixel-muted mt-3 italic">
            (Multiple screens. Multiple cats. One trajectory.)
          </p>
        </div>

        {/* Platformer Banner */}
        <div
          ref={bannerRef}
          className="w-full h-[200px] rounded-lg overflow-hidden pixel-art mb-16"
          style={{
            backgroundImage: 'url(/assets/platformer-banner.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Timeline */}
        <div className="max-w-[700px] mx-auto">
          {timelineData.map((entry, i) => (
            <TimelineEntry key={i} {...entry} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
