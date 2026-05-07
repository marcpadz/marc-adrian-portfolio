import ExpertiseCard from '../components/ExpertiseCard';

const expertiseData = [
  {
    number: '01',
    tag: 'Foundation',
    title: 'Organic Growth Strategy',
    description: 'SEO, content, and positioning that compounds. Not the kind that flatlines when the budget does.',
    footnote: 'The orange cat is plotting something.',
  },
  {
    number: '02',
    tag: 'Identity',
    title: 'Brand Positioning',
    description: 'Vague identity into ownable positioning. The clarity that makes your market instantly get it.',
    footnote: 'Easier than explaining to my mother what I do.',
  },
  {
    number: '03',
    tag: 'Execution',
    title: 'Content Systems',
    description: 'Content that works like a machine. Strategy to distribution, designed to produce authority without burning out.',
    footnote: 'Built between coffee refills.',
  },
  {
    number: '04',
    tag: 'Systems',
    title: 'Growth Architecture',
    description: 'The full system — SEO, content, email, referral loops. Built for compounding, not quarterly pivots.',
    footnote: 'The TV is on. I\'m still working.',
  },
  {
    number: '05',
    tag: 'Operations',
    title: 'AI-Integrated Marketing',
    description: 'AI woven into research, creation, and workflow. Not replacing thinking — multiplying lean teams.',
    footnote: 'Yes, it lives in a bubble. No, it\'s not sorry.',
  },
];

export default function Expertise() {
  return (
    <section id="expertise" className="w-full bg-pixel-bg-alt py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block font-terminal text-xs text-pixel-cyan bg-pixel-cyan/15 px-3.5 py-1.5 rounded mb-6">
            What I do
          </span>
          <h2 className="font-pixel text-2xl md:text-3xl text-pixel-text">
            Not tactics.{' '}
            <span className="text-pixel-cyan">Systems.</span>
          </h2>
          <p className="font-terminal text-base text-pixel-muted mt-3 italic">
            (And the occasional cat hair.)
          </p>
          <p className="font-body text-base text-pixel-muted max-w-[560px] mx-auto mt-4 leading-relaxed">
            Businesses ready for long-term growth don't need another campaign. They need systems that compound. I build those.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expertiseData.slice(0, 3).map((card, i) => (
            <ExpertiseCard key={card.number} {...card} index={i} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-w-[800px] mx-auto">
          {expertiseData.slice(3).map((card, i) => (
            <ExpertiseCard key={card.number} {...card} index={i + 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
