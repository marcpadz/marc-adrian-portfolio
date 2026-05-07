import ProjectCard from '../components/ProjectCard';

const projectsData = [
  {
    tags: 'Organic Growth · SEO',
    title: 'AI-Powered SEO Suite',
    description: 'Full SEO toolkit — audits, SERP tracking, competitor monitoring. At a fraction of enterprise cost.',
    tech: 'Make.com, Apify, RapidAPI',
    thumbnail: '/assets/project-thumb-seo.jpg',
  },
  {
    tags: 'Brand · Personal',
    title: 'CEO Brand System',
    description: 'Personal brand from zero — strategy, distribution, analytics. From no presence to platform authority.',
    tech: 'Content Strategy, Make.com',
    thumbnail: '/assets/project-thumb-brand.jpg',
  },
  {
    tags: 'Content · Systems',
    title: 'Content Engine',
    description: 'Full content ops for Eloqwnt — strategy, calendar, workflow, distribution. Runs without constant management.',
    tech: 'Notion, SEO',
    thumbnail: '/assets/project-thumb-content.jpg',
  },
  {
    tags: 'AI · Infrastructure',
    title: 'Custom MCP Server',
    description: 'Model Context Protocol server giving AI agents structured tool access. Built before it was cool.',
    tech: 'MCP, Claude, Docker',
    thumbnail: '/assets/project-thumb-mcp.jpg',
  },
  {
    tags: 'Lead Gen · Automation',
    title: 'AI Lead Pipeline',
    description: 'Real-time lead enrichment + personalized outreach. AI did the heavy lifting. I did the coffee.',
    tech: 'Bika.ai, Perplexity, Gemini',
    thumbnail: '/assets/project-thumb-leads.jpg',
  },
  {
    tags: 'Product · Dev',
    title: 'iOS App',
    description: 'Personal iOS app in Swift with AI-assisted dev. Cats prefer no-code. They\'re skeptical.',
    tech: 'Swift, Claude Code, GitHub',
    thumbnail: '/assets/project-thumb-ios.jpg',
  },
];

export default function Work() {
  return (
    <section id="work" className="w-full bg-pixel-bg-alt py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block font-terminal text-xs text-pixel-amber bg-pixel-amber/15 px-3.5 py-1.5 rounded mb-6">
            Selected work
          </span>
          <h2 className="font-pixel text-2xl md:text-3xl text-pixel-text">
            Built. Shipped. Measured.
          </h2>
          <p className="font-terminal text-base text-pixel-muted mt-3 italic">
            (While something knocked over a mug.)
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project, i) => (
            <ProjectCard key={i} {...project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
