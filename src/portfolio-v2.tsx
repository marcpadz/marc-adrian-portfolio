import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import * as Popover from '@radix-ui/react-popover';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = [
  { label: 'Philosophy', href: '/philosophy.html' },
  { label: 'Tool verdict lab', href: '/tool-lab.html' },
  { label: 'Apps & workflows', href: '/work.html' },
  { label: '13-year track record', href: '/timeline.html' },
  { label: 'AI stack audit', href: '/audit.html' },
];

const asset = (filename: string) => `/assets/v2/${filename}`;

function SiteHeader({
  pathname,
  spritesPaused,
  onToggleSprites,
  isDark,
  onToggleTheme,
}: {
  pathname: string;
  spritesPaused: boolean;
  onToggleSprites: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header__inner page-container">
        <a className="wordmark" href="/" aria-label="Marc Adrian, home">
          <span>marc.</span> ADRIAN
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} aria-current={pathname === item.href ? 'page' : undefined}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="motion-toggle"
            type="button"
            onClick={onToggleSprites}
            aria-pressed={spritesPaused}
            aria-label={spritesPaused ? 'Play pixel sprites' : 'Pause pixel sprites'}
          >
            {spritesPaused ? 'Play' : 'Pause'}
          </button>
          <button
            className="theme-toggle"
            type="button"
            onClick={onToggleTheme}
            aria-pressed={isDark}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            {isDark ? 'Light' : 'Dark'}
          </button>
          <a className="header-contact" href="/contact.html">Work with me</a>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav id="mobile-navigation" className="mobile-nav page-container" aria-label="Mobile navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? 'page' : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a href="/contact.html" onClick={() => setMenuOpen(false)}>Work with me</a>
        </nav>
      )}
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-container site-footer__inner">
        <div className="footer-signoff">
          <a className="wordmark wordmark--footer" href="/">marc. ADRIAN</a>
          <p>Marc Adrian Padillo, Kuala Lumpur / Global</p>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <a href="mailto:marcpadz@gmail.com">Email Marc</a>
          <a href="https://linkedin.com/in/marcpadz" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://github.com/marcpadz" target="_blank" rel="noreferrer">GitHub</a>
          <a href="/contact.html">Work with me</a>
        </nav>
        <div className="footer-colophon">
          <p>© 2026 Marc Adrian Padillo.</p>
          <p>Four cats fed and online.</p>
        </div>
      </div>
    </footer>
  );
}

function PageFrame({ children }: { children: ReactNode }) {
  const pathname = window.location.pathname;
  const [spritesPaused, setSpritesPaused] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const shellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const preference = typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-color-scheme: dark)')
      : null;
    const syncTheme = () => {
      const explicitMode = root.dataset.mode;
      setIsDark(explicitMode ? explicitMode === 'dark' : Boolean(preference?.matches));
    };
    const onPreferenceChange = (event: MediaQueryListEvent) => {
      if (!root.dataset.mode) setIsDark(event.matches);
    };
    syncTheme();
    preference?.addEventListener('change', onPreferenceChange);
    return () => preference?.removeEventListener('change', onPreferenceChange);
  }, []);

  useEffect(() => {
    if (!shellRef.current || !('IntersectionObserver' in window)) return;
    const sprites = shellRef.current.querySelectorAll<HTMLElement>('.ambient-sprite');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle('is-visible', entry.isIntersecting));
    });
    sprites.forEach((sprite) => observer.observe(sprite));
    return () => observer.disconnect();
  }, []);

  const handleToggleTheme = () => {
    const mode = isDark ? 'light' : 'dark';
    document.documentElement.dataset.mode = mode;
    try {
      window.localStorage.setItem('marc-portfolio-theme', mode);
    } catch {
      // The current tab still changes mode if storage is unavailable.
    }
    setIsDark(mode === 'dark');
  };

  return (
    <div ref={shellRef} className="site-shell" data-motion={spritesPaused ? 'paused' : 'playing'} id="top">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader
        pathname={pathname}
        spritesPaused={spritesPaused}
        onToggleSprites={() => setSpritesPaused((paused) => !paused)}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
      />
      <main id="main-content">{children}</main>
      <SiteFooter />
    </div>
  );
}

function PageIntro({ title, summary, children }: { title: string; summary: string; children?: ReactNode }) {
  return (
    <section className="page-intro">
      <div className="page-container page-intro__grid">
        <h1>{title}</h1>
        <div className="page-intro__aside">
          <p>{summary}</p>
          {children}
        </div>
      </div>
    </section>
  );
}

function ReadMore({ label, children }: { label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <details className="read-more" onToggle={(event) => setOpen(event.currentTarget.open)}>
      <summary>{label}</summary>
      {open && <div className="read-more__content">{children}</div>}
    </details>
  );
}

const HOTSPOTS = [
  {
    key: 'marc',
    short: 'M',
    tag: 'Operator, Marc Adrian',
    title: 'Thirteen years in the field',
    description: 'From writing 1,000+ SEO articles to scaling teams of 12 and building AI-native software. Eyes flicking between revenue metrics, code commits, and editorial hooks.',
  },
  {
    key: 'screens',
    short: 'AI',
    tag: 'System telemetry, dual monitors',
    title: 'Where AI meets editorial quality',
    description: 'One monitor tracks organic keyword velocity and pipeline attribution. The other runs Claude Code and custom MCP servers for research and QA.',
  },
  {
    key: 'cats',
    short: 'Cats',
    tag: 'Production supervisors',
    title: 'Four cats on the production team',
    description: 'The black cat bats at moving cursors during A/B tests; the calico guards the coffee that powers late-night app builds.',
  },
  {
    key: 'bookshelf',
    short: 'Books',
    tag: 'Foundation, the bookshelf',
    title: 'The books behind the framework',
    description: 'Cialdini’s Influence, Eyal’s Hooked, and Clean Code. AI tools change every few weeks; human psychology does not. The workflows stay grounded in persuasion and software craftsmanship.',
  },
];

function SceneHotspots() {
  return (
    <div className="scene-hotspots" role="group" aria-label="Explore the command centre">
      {HOTSPOTS.map((item) => (
        <Popover.Root key={item.key}>
          <Popover.Trigger asChild>
            <button className={`scene-pin scene-pin--${item.key}`} type="button" aria-label={`Inspect ${item.tag}`}>
              {item.short}
            </button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content className="scene-popover" side="top" align="center" sideOffset={10} collisionPadding={16}>
              <p className="scene-popover__tag">{item.tag}</p>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <Popover.Close className="scene-popover__close" aria-label="Close scene note">Close</Popover.Close>
              <Popover.Arrow className="scene-popover__arrow" />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      ))}
    </div>
  );
}

function HomePage() {
  return (
    <PageFrame>
      <section className="home-hero">
        <div className="page-container home-hero__grid">
          <div className="home-hero__copy">
            <h1>Better marketing with AI and good judgment.</h1>
            <p>I build and test AI marketing workflows on real campaigns.</p>
            <div className="hero-actions">
              <a className="button button--primary" href="/contact.html">Work with me</a>
              <a className="button button--quiet" href="/work.html">See the work</a>
            </div>
          </div>
          <div className="home-hero__visual">
            <div className="scene-frame">
              <img
                className="pixel-art scene-image"
                src={asset('copy-marc-adrian-isometric-pixel-art-command--2536eedfc6.jpg')}
                alt="Pixel-art command centre with Marc and four cats"
                fetchPriority="high"
              />
              <SceneHotspots />
              <img
                className="pixel-art scene-peeker ambient-sprite"
                src={asset('style-peekingcatsprite-38362ad205.png')}
                alt=""
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="home-manifesto" id="about" aria-labelledby="about-title">
        <div className="page-container manifesto-grid">
          <h2 id="about-title">AI should help you do your best work.</h2>
          <div>
            <p className="manifesto-copy">AI speeds up research, prototyping, and campaign operations. People keep the context and make the decisions.</p>
            <a className="text-link" href="/philosophy.html">Read my philosophy</a>
          </div>
          <img
            className="pixel-art manifesto-cat ambient-sprite"
            src={asset('style-orange-tabby-head-tilt-8e9422f571.png')}
            alt="Pixel-art orange tabby looking up thoughtfully"
            loading="lazy"
          />
        </div>
      </section>

      <section className="home-practice" id="our-services" aria-labelledby="home-practice-title">
        <div className="page-container">
          <div className="section-heading section-heading--row">
            <h2 id="home-practice-title">Practical work for real marketing needs.</h2>
            <p>Web design, AI and automation, SEO and GEO.</p>
          </div>
          <div className="practice-rows">
            <article className="practice-row">
              <div className="practice-row__copy">
                <h3>Web design</h3>
                <p>Sites that clarify your offer and next step.</p>
              </div>
              <img className="pixel-art practice-row__sprite" src={asset('style-builderorangecatimg-6666fb9299.png')} alt="" aria-hidden="true" loading="lazy" />
            </article>
            <article className="practice-row">
              <div className="practice-row__copy">
                <h3>AI &amp; automation</h3>
                <p>Human-reviewed workflows that protect quality.</p>
              </div>
              <img className="pixel-art practice-row__sprite" src={asset('style-builderrobotimg-484a6b0eb1.png')} alt="" aria-hidden="true" loading="lazy" />
            </article>
            <article className="practice-row">
              <div className="practice-row__copy">
                <h3>SEO &amp; GEO</h3>
                <p>Search and AI visibility built on useful information.</p>
              </div>
              <img className="pixel-art practice-row__sprite" src={asset('style-dark-grey-cat-node-swat-9a1267b156.png')} alt="" aria-hidden="true" loading="lazy" />
            </article>
          </div>
        </div>
      </section>

      <section className="home-why" id="why-choose-us" aria-labelledby="why-title">
        <div className="page-container why-grid">
          <div className="why-copy">
            <h2 id="why-title" className="why-title">
              <span className="why-title__line">I build and test</span>{' '}
              <span className="why-title__line">what I use.</span>
            </h2>
            <p className="why-intro">I test tools in my own work before bringing proven workflows to yours.</p>
            <a className="button button--primary why-cta" href="/contact.html">Talk about your project</a>
          </div>
          <div className="why-aside">
            <img className="pixel-art why-aside__sprite" src={asset('style-back-3-4-view-of-marc-orchestrating-term-a54597b794.png')} alt="Pixel-art Marc reviewing a workflow on screen." loading="lazy" />
            <ul className="why-points">
              <li>
                <h3>Human judgment</h3>
                <p>People make the calls.</p>
              </li>
              <li>
                <h3>Proven quality</h3>
                <p>Tested on real campaigns.</p>
              </li>
              <li>
                <h3>Shared tools</h3>
                <p>Experiments become practical tools.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="home-index" aria-labelledby="home-index-title">
        <div className="page-container">
          <div className="section-heading section-heading--row">
            <h2 id="home-index-title">Work that holds up in practice</h2>
            <p>Pick a door. Each page goes deeper.</p>
          </div>
          <div className="route-index">
            <a href="/philosophy.html"><span>01</span><h3>Where AI stops</h3></a>
            <a href="/tool-lab.html"><span>02</span><h3>Which tools held up</h3></a>
            <a href="/work.html"><span>03</span><h3>Apps I ship myself</h3></a>
            <a href="/timeline.html"><span>04</span><h3>Thirteen years of work</h3></a>
            <a href="/audit.html"><span>05</span><h3>Find a workflow to fix</h3></a>
            <a href="/contact.html"><span>06</span><h3>Work with Marc</h3></a>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}

const PILLARS = {
  content: {
    label: 'SEO & content',
    aiTitle: 'Research synthesis and structural scaffolding',
    aiList: [
      'SERP gap clustering and entity extraction via MCP',
      'Transcript mining from customer and sales calls',
      'First-pass schema, meta, and 1-to-10 asset slicing',
    ],
    humanTitle: 'Contrarian positioning, voice, and proof',
    humanList: [
      'Lived operator anecdotes and real P&L screenshots',
      'Sharp hooks that challenge industry orthodoxy',
      'Final narrative rhythm and emotional resonance',
    ],
    outcomeShort: 'Cut production time 60%; grew organic traffic 180%.',
    outcome: 'Cut production turnaround by 60% (saving 25+ hrs/week) while growing Eloqwnt organic traffic 180% in 6 months.',
  },
  apps: {
    label: 'App building',
    aiTitle: 'Boilerplate, CI/CD audits, and schema generation',
    aiList: [
      'Claude Code + Neo MCP for rapid TypeScript scaffolding',
      'Automated security and static code scans via Jules and CodeQL',
      'Instant database branching on Ghost Postgres',
    ],
    humanTitle: 'Product architecture, UX taste, and edge cases',
    humanList: [
      'Designing workflows around real marketer pain points',
      'Haptic UI polish, micro-interactions, and zero bloat',
      'Dogfooding every feature in my own daily business',
    ],
    outcomeShort: 'Three apps shipped with automated CI/CD.',
    outcome: 'Shipped Marcus_v2, NomadOS, and Scribe with full CI/CD pipelines, turning internal bottlenecks into working software.',
  },
  ops: {
    label: 'Growth ops',
    aiTitle: 'Multi-channel routing and automated reporting',
    aiList: [
      'Make and n8n pipelines syncing CRM, SEO, and lead alerts',
      'Automated weekly attribution dashboards (20+ hrs saved/wk)',
      'AI task triage inside Dart AI and Notion',
    ],
    humanTitle: 'Offer strategy, funnel economics, and team coaching',
    humanList: [
      'Deciding which channels deserve budget and focus',
      'Training 12-person teams to cut ramp-up time by 50%',
      'High-stakes client positioning and revenue attribution',
    ],
    outcomeShort: 'Faster delivery at Treantly; 50+ qualified leads monthly.',
    outcome: 'Scaled team output from 2-week turnarounds to 3 days at Treantly while generating 50+ qualified leads/month.',
  },
} as const;

type PillarKey = keyof typeof PILLARS;

function PillarTasks({ lines }: { lines: readonly string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <details className="delegation-details" onToggle={(event) => setOpen(event.currentTarget.open)}>
      <summary>Details</summary>
      {open && <ul>{lines.map((line) => <li key={line}>{line}</li>)}</ul>}
    </details>
  );
}

function PhilosophyPage() {
  const [activePillar, setActivePillar] = useState<PillarKey>('content');
  const data = PILLARS[activePillar];

  return (
    <PageFrame>
      <PageIntro
        title="Where AI stops, human taste takes over."
        summary="Most teams use AI to flood channels with generic noise. After writing 1,000+ ranking articles and leading growth teams, here is the exact boundary I enforce in my own business."
      />
      <section className="section-block philosophy-simulator">
        <div className="page-container">
          <div className="section-heading section-heading--row">
            <div>
              <h2>AI speed, human craft</h2>
              <p>Choose a work area.</p>
            </div>
            <div className="tab-list" role="group" aria-label="Choose a work area">
              {(Object.keys(PILLARS) as PillarKey[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  className={activePillar === key ? 'tab-button is-active' : 'tab-button'}
                  aria-pressed={activePillar === key}
                  onClick={() => setActivePillar(key)}
                >
                  {PILLARS[key].label}
                </button>
              ))}
            </div>
          </div>
          <div className="delegation-grid" aria-live="polite">
            <article className="delegation-panel">
              <h3>{data.aiTitle}</h3>
              <p className="delegation-panel__label">Machine layer</p>
              <PillarTasks lines={data.aiList} />
            </article>
            <article className="delegation-panel delegation-panel--human">
              <h3>{data.humanTitle}</h3>
              <p className="delegation-panel__label">Marc’s layer</p>
              <PillarTasks lines={data.humanList} />
            </article>
          </div>
          <p className="simulator-outcome">{data.outcomeShort}</p>
          <ReadMore label="Full outcome"><p>{data.outcome}</p></ReadMore>
        </div>
      </section>

      <section className="section-block philosophy-principles">
        <div className="page-container">
          <div className="section-heading section-heading--row">
            <div>
              <h2>Operating rules</h2>
              <p>I test tools in my own work before recommending them.</p>
            </div>
            <ReadMore label="Full operating note">
              <blockquote>“I’m a full-stack marketer who figures out where AI genuinely helps, which tools are worth using, and how to work with them without losing what makes my work good. I build apps, test workflows, and run my own business with AI, then share what holds up in practice.”</blockquote>
            </ReadMore>
          </div>
          <ul className="principle-list">
            <li><article>
              <h3>Dogfood it</h3>
              <p>Test before recommending.</p>
              <ReadMore label="More"><p>I test workflows inside Marcus_v2, NomadOS, Scribe, and agency pipelines before recommending them.</p></ReadMore>
            </article></li>
            <li><article>
              <h3>Build what’s missing</h3>
              <p>Build when software fails.</p>
              <ReadMore label="More"><p>When off-the-shelf SaaS misses the job, I wire MCP servers, Postgres backends, and TypeScript apps.</p></ReadMore>
            </article></li>
            <li><article>
              <h3>Human review</h3>
              <p>Keep a human gate.</p>
              <ReadMore label="More"><p>I share candid teardowns of what survives past week two and what gets cancelled.</p></ReadMore>
            </article></li>
          </ul>
        </div>
      </section>
      <section className="close-band">
        <div className="page-container close-band__inner">
          <h2>See the tools that made it through</h2>
          <a className="button button--primary" href="/tool-lab.html">View tool verdicts</a>
        </div>
      </section>
    </PageFrame>
  );
}

type Verdict = 'daily-driver' | 'situational' | 'skip';
type ToolRecord = {
  name: string;
  category: string;
  verdict: Verdict;
  score: string;
  summary: string;
  holdsUp: string;
  watchOut: string;
};

const TOOLS: ToolRecord[] = [
  {
    name: 'Claude Code + MCP', category: 'AI coding & agents', verdict: 'daily-driver', score: '9.8/10',
    summary: 'My command-line co-pilot for building internal marketing apps, wiring Model Context Protocol (MCP) servers, and refactoring production repositories.',
    holdsUp: 'Connecting local research plugins (Neo MCP) and live databases directly into the CLI eliminates copy-paste context switching.',
    watchOut: 'Requires clear architectural boundaries up front. Never let it guess your data schema without a spec.',
  },
  {
    name: 'Claude 3.7 / Projects (Voice Card)', category: 'Editorial & strategy', verdict: 'daily-driver', score: '9.6/10',
    summary: 'Unbeatable for nuanced marketing copy and structural editing when loaded with a custom Voice Card built from real writing samples.',
    holdsUp: 'Respects negative constraints (what not to sound like) far better than default prompting when grounded in real transcripts.',
    watchOut: 'Without real operator examples injected into context, it will still drift toward polite consultant clichés.',
  },
  {
    name: 'Make.com + n8n', category: 'Workflow automation', verdict: 'daily-driver', score: '9.5/10',
    summary: 'The backbone of my 25+ hrs/week time savings: automating content distribution, lead enrichment, and multi-channel reporting.',
    holdsUp: 'Visual webhook routing and HTTP modules let you chain custom LLM API calls with Airtable, HubSpot, and Slack reliably.',
    watchOut: 'Always build error-handling fallbacks and human approval gates before publishing to live customer channels.',
  },
  {
    name: 'Ghost (Postgres for Agents)', category: 'AI infrastructure', verdict: 'daily-driver', score: '9.3/10',
    summary: 'Cloud Postgres infrastructure built for AI agents with instant database forking, essential for testing agentic workflows safely.',
    holdsUp: 'Lets AI agents experiment on a forked database branch without risking production analytics or customer records.',
    watchOut: 'Best suited when you are building custom full-stack tools rather than simple no-code zaps.',
  },
  {
    name: 'Ahrefs + Screaming Frog + GSC', category: 'SEO & demand intelligence', verdict: 'daily-driver', score: '9.7/10',
    summary: 'The non-negotiable truth layer behind 700+ Page-1 rankings and 100K→2M traffic growth. AI synthesizes the data, but these tools provide ground truth.',
    holdsUp: 'Feeding real search intent, crawl logs, and competitor decay curves into AI scripts turns guesswork into compounding traffic.',
    watchOut: 'Never trust an LLM to invent search volume or keyword difficulty without live SERP telemetry.',
  },
  {
    name: 'Jules + CodeQL + Vercel', category: 'Shipping & QA pipeline', verdict: 'daily-driver', score: '9.2/10',
    summary: 'Automated code review, security scanning, and instant preview deployments for my software builds (Marcus_v2 and Scribe).',
    holdsUp: 'Catches security edge cases and regressions automatically on every pull request so solo-built apps stay production-grade.',
    watchOut: 'Keep preview environments locked behind auth when testing live client API keys.',
  },
  {
    name: 'Dart AI + Notion', category: 'Ops & sprint management', verdict: 'situational', score: '8.4/10',
    summary: 'Great for turning messy strategy docs into structured sprint tasks and keeping lean 3-to-12 person teams aligned.',
    holdsUp: 'Cuts project-management admin overhead when paired with clear SOP templates.',
    watchOut: 'A tool won’t fix a broken approval bottleneck. Simplify the human sign-off chain first.',
  },
  {
    name: 'Ollama (Local Open-Weight Models)', category: 'Local privacy & testing', verdict: 'situational', score: '8.2/10',
    summary: 'Running local models for private data classification, bulk tagging, and zero-cost prompt experimentation.',
    holdsUp: 'Zero API cost for high-volume classification tasks and complete client data privacy.',
    watchOut: 'For customer-facing persuasive copy, frontier models still win on nuance.',
  },
  {
    name: 'One-Click “Auto-Blog” SEO SaaS Wrappers', category: 'Content generation', verdict: 'skip', score: '2.5/10',
    summary: 'Tested dozens of “1-click 100 SEO articles” wrappers. They produce bloated, repetitive slop that tanks brand trust and gets de-indexed.',
    holdsUp: 'Nothing once Google’s helpful content filters catch up.',
    watchOut: 'Replace with a modular workflow: real SERP data + proprietary SME insights + structured human editing.',
  },
];

const VERDICT_LABELS: Record<Verdict | 'all', string> = {
  all: 'All notes (9)',
  'daily-driver': 'Daily drivers',
  situational: 'Situational',
  skip: 'Skip or replaced',
};

function ToolEntry({ tool }: { tool: (typeof TOOLS)[number] }) {
  const [open, setOpen] = useState(false);

  return (
    <details className="tool-entry" onToggle={(event) => setOpen(event.currentTarget.open)}>
      <summary>
        <span className="tool-entry__main">
          <span className="tool-entry__name">{tool.name}</span>
          <span className="tool-entry__category">{tool.category}</span>
        </span>
        <span className={`verdict verdict--${tool.verdict}`}>{tool.verdict === 'skip' ? 'Skip or replaced' : tool.verdict === 'situational' ? 'Situational' : 'Daily driver'}</span>
        <span className="tool-entry__score">{tool.score}</span>
        <span className="details-mark" aria-hidden="true">+</span>
      </summary>
      {open && (
        <div className="tool-entry__body">
          <p>{tool.summary}</p>
          <div className="tool-detail-grid">
            <div><h3>What holds up</h3><p>{tool.holdsUp}</p></div>
            <div><h3>Watch out</h3><p>{tool.watchOut}</p></div>
          </div>
        </div>
      )}
    </details>
  );
}

function ToolLabPage() {
  const [filter, setFilter] = useState<Verdict | 'all'>('all');
  const [query, setQuery] = useState('');
  const shownTools = useMemo(() => TOOLS.filter((tool) => {
    const matchesVerdict = filter === 'all' || tool.verdict === filter;
    const term = query.trim().toLowerCase();
    const matchesQuery = !term || `${tool.name} ${tool.category} ${tool.summary}`.toLowerCase().includes(term);
    return matchesVerdict && matchesQuery;
  }), [filter, query]);

  return (
    <PageFrame>
      <PageIntro
        title="Which AI tools are actually worth using?"
        summary="Field notes from tools I use in apps and agency work."
      />
      <section className="section-block verdict-guide" aria-labelledby="verdict-guide-title">
        <div className="page-container">
          <div className="section-heading section-heading--row">
            <h2 id="verdict-guide-title">Three verdicts</h2>
            <p>Field notes, not trend rankings.</p>
          </div>
          <div className="verdict-guide__rows">
            <article><h3>Daily driver</h3><p>Used in regular work.</p></article>
            <article><h3>Situational</h3><p>Useful for a narrow job.</p></article>
            <article><h3>Skip</h3><p>Not a default choice.</p></article>
          </div>
        </div>
      </section>
      <section className="section-block tool-lab">
        <div className="page-container">
          <div className="tool-controls">
            <div className="tab-list" role="group" aria-label="Filter tools by verdict">
              {(['all', 'daily-driver', 'situational', 'skip'] as const).map((key) => (
                <button
                  className={filter === key ? 'tab-button is-active' : 'tab-button'}
                  key={key}
                  type="button"
                  aria-pressed={filter === key}
                  onClick={() => setFilter(key)}
                >
                  {VERDICT_LABELS[key]}
                </button>
              ))}
            </div>
            <label className="search-field">
              <span>Search tools</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Type a name or use" />
            </label>
          </div>
          <p className="result-count" aria-live="polite">Showing {shownTools.length} field {shownTools.length === 1 ? 'note' : 'notes'}.</p>
          {shownTools.length > 0 ? (
            <div className="tool-list">
              {shownTools.map((tool) => <ToolEntry key={tool.name} tool={tool} />)}
            </div>
          ) : (
            <p className="empty-result" role="status">No tool notes match that search. Try another name or clear the filter.</p>
          )}
                  </div>
      </section>
      <section className="close-band">
        <div className="page-container close-band__inner">
          <h2>Tools that survive week two</h2>
          <a className="button button--primary" href="/work.html">See apps and workflows</a>
        </div>
      </section>
    </PageFrame>
  );
}

type ProjectRecord = {
  title: string;
  type: 'app' | 'workflow';
  badge: string;
  metrics: string;
  desc: string;
  summary: string;
  stack: string[];
  deepDive: string;
};

const PROJECTS: ProjectRecord[] = [
  {
    title: 'Marcus_v2: Autonomous Marketing & Ops Engine', type: 'app', badge: 'AI codebase, Vercel and GitHub Actions',
    metrics: 'Automated CI/CD, multi-agent workflows',
    desc: 'My flagship internal software suite combines AI workflow execution, automated content QA, and telemetry with CodeQL and Codacy guardrails.',
    summary: 'AI-assisted ops, content QA, and code safety guardrails.',
    stack: ['TypeScript', 'Next.js', 'Vercel', 'Claude MCP', 'GitHub Actions'],
    deepDive: 'Built to test agentic marketing workflows in a real production environment before rolling patterns out to client teams.',
  },
  {
    title: 'Eloqwnt AI-First Content System', type: 'workflow', badge: 'Growth engine, agency ops',
    metrics: '180% organic traffic growth, 60% shorter turnaround',
    desc: 'Architected an AI-assisted editorial pipeline producing 20+ high-ranking pieces/month with a lean 3-person team while saving 25+ hours/week.',
    summary: 'An editorial pipeline built for a lean agency growth team.',
    stack: ['Claude Voice Cards', 'Make.com', 'Semrush', 'Webflow', 'Dart AI'],
    deepDive: 'Replaced fragmented freelancer drafts with structured SERP intelligence, automated brief assembly, and strict human narrative editing.',
  },
  {
    title: 'Scribe: AI Audio & Drive Intelligence', type: 'app', badge: 'Shipped app, Gemini and Google Drive API',
    metrics: 'Voice-to-structured-asset pipeline',
    desc: 'A custom application integrating Google Drive and Gemini models to turn raw founder voice notes and call recordings into structured briefs and articles.',
    summary: 'Turns founder voice notes and calls into structured briefs.',
    stack: ['TypeScript', 'Gemini API', 'Google Drive API', 'Jules QA'],
    deepDive: 'It solves the reason AI content sounds generic: it extracts authentic subject-matter expertise straight from spoken conversations.',
  },
  {
    title: 'NomadOS: Operator Finance & Velocity Cockpit', type: 'app', badge: 'Full-stack app, Zeabur Cloud',
    metrics: 'Real-time P&L, subscriptions and runway',
    desc: 'A full-stack dashboard built to run my own business, tracking SaaS tool ROI, client retainers, and operational velocity in one interface.',
    summary: 'One cockpit for tool ROI, retainers, and business runway.',
    stack: ['React', 'TypeScript', 'Zeabur', 'PostgreSQL'],
    deepDive: 'Every AI tool subscription gets audited here against actual hours saved and revenue generated.',
  },
  {
    title: 'iMoney 20x Organic Growth Engine', type: 'workflow', badge: 'Enterprise SEO, revenue attribution',
    metrics: '100K → 2M monthly visitors, 500+ #1 ranks',
    desc: 'Scaled organic traffic 20x across Southeast Asia, built and mentored an 8-person editorial team, and authored the company-wide SEO playbook.',
    summary: 'Regional SEO growth, editorial teams, and revenue attribution.',
    stack: ['Ahrefs', 'Technical SEO', 'Editorial Playbooks', 'Revenue Attribution'],
    deepDive: 'Proved that deep domain authority and conversion-focused comparison architecture can compound into attributed revenue.',
  },
  {
    title: 'PeraNova: Fintech Borrower Empowerment Platform', type: 'app', badge: 'Fintech product and brand architecture',
    metrics: 'Trust-score UX, Southeast Asia fintech',
    desc: 'Brand positioning, trust-score UX architecture, and AI-assisted competitive intelligence for a borrower empowerment platform in the Philippines.',
    summary: 'Trust-score UX and fintech strategy for Southeast Asian borrowers.',
    stack: ['Product Strategy', 'Trust Score UX', 'AI Market Research', 'Fintech'],
    deepDive: 'Combines Southeast Asia fintech domain expertise with modern AI product prototyping.',
  },
];

function ProjectDetails({ project }: { project: ProjectRecord }) {
  const [open, setOpen] = useState(false);

  return (
    <details className="project-details" onToggle={(event) => setOpen(event.currentTarget.open)}>
      <summary>Project details and stack</summary>
      {open && (
        <div className="project-details__content">
          <p className="project-details__badge">{project.badge}</p>
          <p>{project.desc}</p>
          <p>{project.deepDive}</p>
          <ul className="tag-list" aria-label="Tools and methods used">
            {project.stack.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      )}
    </details>
  );
}

function ProjectStack({ projects }: { projects: ProjectRecord[] }) {
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!stackRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const context = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.project-stack-card');
      cards.slice(0, -1).forEach((card, index) => {
        gsap.to(card, {
          scale: 0.97 - index * 0.008,
          y: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: cards[index + 1],
            start: 'top 72%',
            end: 'top 25%',
            scrub: true,
          },
        });
      });
    }, stackRef);
    return () => context.revert();
  }, [projects]);

  return (
    <div ref={stackRef} className="project-stack-wrap">
      <ol className="project-stack">
        {projects.map((project) => (
          <li className="project-stack-card" key={project.title}>
            <article className="project-card">
              <div className="project-card__topline">
                <span>{project.type === 'app' ? 'App' : 'Workflow'}</span>
              </div>
              <h3>{project.title}</h3>
              <p className="project-card__metrics">{project.metrics}</p>
              <p className="project-card__summary">{project.summary}</p>
              <ProjectDetails project={project} />
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}

function WorkPage() {
  const [filter, setFilter] = useState<'all' | ProjectRecord['type']>('all');
  const projects = useMemo(() => PROJECTS.filter((project) => filter === 'all' || project.type === filter), [filter]);
  const featured = projects.slice(0, 3);
  const remaining = projects.slice(3);

  return (
    <PageFrame>
      <PageIntro
        title="I ship products, not prompts."
        summary="I don’t just write prompts. I ship apps and workflows around real operating work, from AI-assisted editorial pipelines to tools I use to run my own business."
      />
      <section className="section-block work-page">
        <div className="page-container">
          <div className="section-heading section-heading--row">
            <div><h2>Six builds for real work</h2><p>Open a project note for the longer version.</p></div>
            <div className="tab-list" role="group" aria-label="Filter projects">
              <button className={filter === 'all' ? 'tab-button is-active' : 'tab-button'} type="button" aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>All builds (6)</button>
              <button className={filter === 'app' ? 'tab-button is-active' : 'tab-button'} type="button" aria-pressed={filter === 'app'} onClick={() => setFilter('app')}>AI apps &amp; codebases</button>
              <button className={filter === 'workflow' ? 'tab-button is-active' : 'tab-button'} type="button" aria-pressed={filter === 'workflow'} onClick={() => setFilter('workflow')}>Growth workflows</button>
            </div>
          </div>
          <ProjectStack projects={featured} />
        </div>
      </section>
      {remaining.length > 0 && (
        <section className="section-block project-index-section">
          <div className="page-container">
            <div className="project-index">
              <h2>More from the workbench</h2>
              <ol>
                {remaining.map((project) => (
                  <li key={project.title}>
                    <article className="project-row">
                      <div><h3>{project.title}</h3></div>
                      <p>{project.metrics}</p>
                      <ProjectDetails project={project} />
                    </article>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      )}
      <section className="close-band">
        <div className="page-container close-band__inner">
          <h2>Have a workflow worth fixing?</h2>
          <a className="button button--primary" href="/contact.html">Work with Marc</a>
        </div>
      </section>
    </PageFrame>
  );
}

type TimelineRecord = {
  period: string;
  role: string;
  company: string;
  era: 'consulting' | 'strategy' | 'scale' | 'craft';
  eraLabel: string;
  highlight: string;
  details: string;
};

const TIMELINE: TimelineRecord[] = [
  {
    period: '2024 to present', role: 'Marketing Director & AI Systems Architect', company: 'Eloqwnt', era: 'consulting', eraLabel: 'AI & consulting',
    highlight: '180% organic growth in 6 months, 60% less production time, 25+ hrs/wk saved',
    details: 'Leading marketing strategy and AI-first operations for a growth-stage creative agency. Built proprietary AI-assisted content frameworks producing 20+ pieces/month with a lean 3-person team.',
  },
  {
    period: 'Aug 2023 to Dec 2024', role: 'Marketing Lead', company: 'Treantly', era: 'strategy', eraLabel: 'Strategy & ops',
    highlight: 'Scaled team 3 → 12, turnaround cut from 2 weeks to 3 days, 50+ SQLs/mo',
    details: 'Scaled marketing operations from 3 to 12 team members. Ranked 30+ commercial keywords on Page 1 and built onboarding playbooks that cut new-hire ramp-up time by 50%.',
  },
  {
    period: 'Apr 2023 to Jun 2024', role: 'Marketing Communications Lead', company: 'DMX', era: 'strategy', eraLabel: 'Strategy & ops',
    highlight: 'Saved 20+ hrs/wk via automated dashboards, +35% campaign lift',
    details: 'Directed multi-channel enterprise campaigns across email, social, and search. Built reusable campaign templates reducing launch setup time by 60%.',
  },
  {
    period: 'Jun 2022 to May 2023', role: 'Content Marketing Specialist', company: 'StoreHub', era: 'scale', eraLabel: 'Systems at scale',
    highlight: '3x pipeline growth, 10K → 80K monthly blog visits, 45% email open rate',
    details: 'Engineered a 1-to-10 content repurposing system across five distribution channels and high-converting email nurture flows for retail and FnB SaaS.',
  },
  {
    period: 'May 2017 to Jun 2022', role: 'Senior Writer & Content Marketing Specialist', company: 'iMoney', era: 'scale', eraLabel: 'Systems at scale',
    highlight: '20x traffic growth (100K → 2M/mo), $5M+ attributed revenue, 500+ Page-1 ranks',
    details: 'Built and mentored an 8-person regional editorial team across Southeast Asia, establishing the SEO playbook that turned content into a primary revenue engine.',
  },
  {
    period: 'Jan 2016 to Sept 2019', role: 'Editorial Content Writer & Content Specialist', company: 'iPrice Group & Psychology Hacker', era: 'craft', eraLabel: 'The craft',
    highlight: '500+ comparison & SEO articles, 95% first-pass approval, 5K → 25K email list',
    details: 'Mastered cross-market product comparison SEO across six Southeast Asian markets and high-open-rate behavioral email marketing.',
  },
  {
    period: 'Dec 2011 to Jan 2016', role: 'Freelance SEO Content Writer', company: 'iWriter.com (Top 1% Platform Writer)', era: 'craft', eraLabel: 'The craft',
    highlight: '1,000+ SEO articles written, 4.9/5 rating across 500+ projects, 70% repeat clients',
    details: 'Earned my stripes writing 1,000+ articles across 20+ industries, learning firsthand what makes copy rank, convert, and hold a reader’s attention.',
  },
];

function TimelineNote({ item }: { item: TimelineRecord }) {
  const [open, setOpen] = useState(false);

  return (
    <details className="timeline-details" onToggle={(event) => setOpen(event.currentTarget.open)}>
      <summary>Read the role note</summary>
      {open && <p>{item.details}</p>}
    </details>
  );
}

function TimelinePage() {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timelineRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const context = gsap.context(() => {
      const fill = timelineRef.current?.querySelector<HTMLElement>('.timeline-track__fill');
      const list = timelineRef.current?.querySelector<HTMLElement>('.timeline-list');
      if (fill && list) {
        gsap.to(fill, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: list, start: 'top 72%', end: 'bottom 48%', scrub: true },
        });
      }
    }, timelineRef);
    return () => context.revert();
  }, []);

  return (
    <PageFrame>
      <PageIntro
        title="Built from the trenches, not consultant theory."
        summary="Thirteen years across writing, growth teams, and AI systems. The work changed; the focus on useful outcomes stayed."
      />
      <section className="section-block phase-index" aria-labelledby="phase-index-title">
        <div className="page-container">
          <div className="section-heading section-heading--row">
            <h2 id="phase-index-title">Timeline chapters</h2>
            <p>Jump to a chapter.</p>
          </div>
          <nav className="phase-index__links" aria-label="Career phases">
            <a href="#phase-consulting">Phase 4: AI &amp; consulting</a>
            <a href="#phase-strategy">Phase 3: Strategy &amp; ops</a>
            <a href="#phase-scale">Phase 2: Systems at scale</a>
            <a href="#phase-craft">Phase 1: The craft</a>
          </nav>
        </div>
      </section>
      <section className="section-block timeline-section">
        <div className="page-container" ref={timelineRef}>
          <div className="timeline-intro">
            <h2>Four phases, one direction</h2>
            <p>From the craft of writing to the systems behind modern marketing.</p>
          </div>
          <div className="timeline-layout">
            <div className="timeline-track" aria-hidden="true"><span className="timeline-track__fill" /></div>
            <ol className="timeline-list">
              {TIMELINE.map((item, index) => {
                const startsPhase = index === 0 || TIMELINE[index - 1]?.era !== item.era;
                return (
                  <li className="timeline-entry" id={startsPhase ? `phase-${item.era}` : undefined} key={`${item.period}-${item.company}`}>
                    <article>
                      <div className="timeline-entry__top">
                        <p className="phase-label">{item.eraLabel}</p>
                        <time>{item.period}</time>
                      </div>
                      <h3>{item.role}</h3>
                      <p className="timeline-company">{item.company}</p>
                      <p className="timeline-highlight">{item.highlight}</p>
                      <TimelineNote item={item} />
                    </article>
                  </li>
                );
              })}
            </ol>
          </div>
          <div className="timeline-cat" aria-hidden="true">
            <span className="cat-runner ambient-sprite" />
          </div>
                  </div>
      </section>
      <section className="close-band">
        <div className="page-container close-band__inner">
          <h2>How the tools fit</h2>
          <a className="button button--primary" href="/tool-lab.html">View tool verdicts</a>
        </div>
      </section>
    </PageFrame>
  );
}

type Bottleneck = 'content' | 'reporting' | 'leads';
type Maturity = 'adhoc' | 'slop' | 'scaling';
type Prescription = { impact: string; stack: string; advice: string };

const PRESCRIPTIONS: Record<`${Bottleneck}-${Maturity}`, Prescription> = {
  'content-adhoc': {
    impact: 'Est. savings: 18 to 25 hours/week (60% shorter turnaround)',
    stack: 'Recommended stack: Claude Voice Card + Ahrefs SERP Telemetry + Make.com Slicer',
    advice: 'Move your writers out of blank-page chat prompts. Build a persistent Voice Card from your top 10 human-written pieces, automate SERP entity briefs, and keep humans 100% in charge of hooks, proof points, and final polish.',
  },
  'content-slop': {
    impact: 'Est. impact: +180% organic lift & 95% first-pass approval',
    stack: 'Recommended stack: Scribe (SME Voice Capture) + Claude 3.7 + Human Editorial Gate',
    advice: 'Your output feels generic because the LLM has no proprietary insight. Record 10-minute voice interviews with your founders or SMEs, feed those transcripts into structured outlines, and ban one-click AI article wrappers immediately.',
  },
  'content-scaling': {
    impact: 'Est. output: 20+ ranking assets/mo with a 3-person team',
    stack: 'Recommended stack: Custom Claude Code MCP Server + Ghost Postgres + Webflow API',
    advice: 'Wire a custom MCP agent directly to Google Search Console and your CMS so your team can audit decaying pages, generate data-backed refresh briefs, and ship 1-to-10 multi-channel variations in a single afternoon.',
  },
  'reporting-adhoc': {
    impact: 'Est. savings: 20+ hrs/wk on Friday reporting',
    stack: 'Recommended stack: Make.com + Google Analytics/GSC API + Automated Executive Digest',
    advice: 'Eliminate manual CSV pulling. Automate weekly cross-channel attribution snapshots that flag anomalies, so Friday is spent making budget decisions rather than copying numbers into slides.',
  },
  'reporting-slop': {
    impact: 'Est. impact: Clear revenue attribution ($5M+ playbook)',
    stack: 'Recommended stack: Postgres Telemetry + Custom Cohort Dashboard + AI Anomaly Summary',
    advice: 'Stop letting AI summarize vanity metrics. Connect content URLs directly to assisted pipeline and SQL conversion events so leadership sees revenue by content cluster.',
  },
  'reporting-scaling': {
    impact: 'Est. savings: Real-time autonomous telemetry',
    stack: 'Recommended stack: NomadOS-style Custom Cockpit + Ghost Branching + Slack Alerts',
    advice: 'Deploy a lightweight custom TypeScript dashboard that merges CRM pipeline, SEO rankings, and ad spend with agentic alerts whenever CAC or conversion rates drift.',
  },
  'leads-adhoc': {
    impact: 'Est. impact: 50+ qualified leads/mo engine',
    stack: 'Recommended stack: Interactive Assessment Funnel + Make Enrichment + Behavior-Based Email',
    advice: 'Replace static PDF lead magnets with an interactive diagnostic. Enrich submissions automatically and route high-intent prospects to tailored case studies.',
  },
  'leads-slop': {
    impact: 'Est. impact: 45%+ open rates & high-reply outreach',
    stack: 'Recommended stack: Deep Prospect Research Agent + Segmented Portfolio Matching',
    advice: 'Kill generic AI sequence templates. Use AI to research prospect pain points and match them to one or two relevant case studies by stage and industry, then write short, human-first notes.',
  },
  'leads-scaling': {
    impact: 'Est. impact: 3x pipeline velocity',
    stack: 'Recommended stack: Multi-Channel 1-to-10 Distribution Engine + Automated Lead Scoring',
    advice: 'Turn every flagship case study into 10 native assets across search, LinkedIn, and segmented email nurtures with automated intent scoring.',
  },
};

const BOTTLENECK_OPTIONS: { value: Bottleneck; label: string }[] = [
  { value: 'content', label: 'Content speed vs. quality' },
  { value: 'reporting', label: 'Manual reporting & data' },
  { value: 'leads', label: 'Lead generation & distribution' },
];
const MATURITY_OPTIONS: { value: Maturity; label: string }[] = [
  { value: 'adhoc', label: 'Ad-hoc ChatGPT prompts' },
  { value: 'slop', label: 'Automated, but it feels generic' },
  { value: 'scaling', label: 'Ready for custom agents' },
];

function ChoiceGroup<T extends string>({
  legend,
  name,
  options,
  selected,
  onSelect,
}: {
  legend: string;
  name: string;
  options: { value: T; label: string }[];
  selected: T;
  onSelect: (value: T) => void;
}) {
  return (
    <fieldset className="choice-group">
      <legend>{legend}</legend>
      <div className="choice-list">
        {options.map((option) => (
          <label className={selected === option.value ? 'choice-option is-selected' : 'choice-option'} key={option.value}>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={selected === option.value}
              onChange={() => onSelect(option.value)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function AuditPage() {
  const [bottleneck, setBottleneck] = useState<Bottleneck>('content');
  const [maturity, setMaturity] = useState<Maturity>('adhoc');
  const [result, setResult] = useState<Prescription | null>(null);

  const updateBottleneck = (value: Bottleneck) => { setBottleneck(value); setResult(null); };
  const updateMaturity = (value: Maturity) => { setMaturity(value); setResult(null); };

  return (
    <PageFrame>
      <PageIntro
        title="Find where AI helps without hurting quality."
        summary="Choose a bottleneck and AI maturity to get a starting workflow blueprint."
      />
      <section className="section-block audit-section">
        <div className="page-container audit-layout">
          <div className="audit-copy">
            <h2>A better first workflow</h2>
            <p>Treat this as a starting point, not a forecast for your team.</p>
            <img className="pixel-art audit-sprite" src={asset('style-builderrobotimg-484a6b0eb1.png')} alt="Pixel-art Marc tuning a small agent bot" loading="lazy" />
          </div>
          <div className="audit-terminal">
            <p className="terminal-title">Marc’s workflow diagnostic</p>
            <ChoiceGroup
              legend="1. Biggest workflow bottleneck?"
              name="bottleneck"
              options={BOTTLENECK_OPTIONS}
              selected={bottleneck}
              onSelect={updateBottleneck}
            />
            <ChoiceGroup
              legend="2. How is your team using AI today?"
              name="maturity"
              options={MATURITY_OPTIONS}
              selected={maturity}
              onSelect={updateMaturity}
            />
            <button className="button button--primary audit-run" type="button" onClick={() => setResult(PRESCRIPTIONS[`${bottleneck}-${maturity}`])}>
              Build my playbook
            </button>
            <div className="audit-result" aria-live="polite" aria-atomic="true">
              {result ? (
                <>
                  <p className="audit-result__impact">{result.impact}</p>
                  <h3>{result.stack}</h3>
                  <p>{result.advice}</p>
                </>
              ) : (
              <p>Choose inputs, then build a starting playbook.</p>
              )}
            </div>
            <p className="source-note">Examples from Marc’s playbook, not forecasts for your team.</p>
          </div>
        </div>
      </section>
      <section className="section-block audit-outcomes" aria-labelledby="audit-outcomes-title">
        <div className="page-container">
          <div className="section-heading section-heading--row">
            <h2 id="audit-outcomes-title">What the result contains</h2>
            <p>A useful starting point, not a guarantee.</p>
          </div>
          <div className="audit-outcomes__rows">
            <article><h3>Potential impact</h3><p>An example from Marc’s playbook, not a team-specific forecast.</p></article>
            <article><h3>Suggested stack</h3><p>Tools matched to the bottleneck and AI maturity you selected.</p></article>
            <article><h3>Next step</h3><p>A practical workflow to explore before automating or shipping.</p></article>
          </div>
        </div>
      </section>
      <section className="close-band">
        <div className="page-container close-band__inner">
          <h2>Find your next workflow</h2>
          <a className="button button--primary" href="/contact.html">Talk with Marc</a>
        </div>
      </section>
    </PageFrame>
  );
}

function ContactPage() {
  return (
    <PageFrame>
      <PageIntro
        title="Want AI workflows that hold up?"
        summary="Web design, SEO and GEO, AI workflows, or fractional marketing leadership."
      />
      <section className="section-block contact-section">
        <div className="page-container">
          <div className="contact-main">
            <h2>Start with the real bottleneck</h2>
            <p>Share the slowest part of the work. We’ll find the right fix.</p>
            <a className="button button--primary" href="mailto:marcpadz@gmail.com?subject=Let%E2%80%99s%20talk%20about%20a%20workflow">Email Marc</a>
          </div>
        </div>
      </section>
      <section className="section-block contact-direct" aria-labelledby="contact-direct-title">
        <div className="page-container">
          <div className="section-heading section-heading--row">
            <h2 id="contact-direct-title">Direct channels</h2>
            <p>Or find the work and the code in public.</p>
          </div>
          <div className="contact-aside">
            <img className="pixel-art contact-avatar" src={asset('style-marc-seated-casually-on-the-footer-borde-12e5bbc8d4.png')} alt="Pixel-art Marc seated with a laptop and coffee" loading="lazy" />
            <dl className="contact-links">
              <div><dt>Direct email</dt><dd><a href="mailto:marcpadz@gmail.com">marcpadz@gmail.com</a></dd></div>
              <div><dt>LinkedIn</dt><dd><a href="https://linkedin.com/in/marcpadz" target="_blank" rel="noreferrer">linkedin.com/in/marcpadz</a></dd></div>
              <div><dt>GitHub</dt><dd><a href="https://github.com/marcpadz" target="_blank" rel="noreferrer">github.com/marcpadz</a></dd></div>
            </dl>
          </div>
        </div>
      </section>
      <section className="contact-offers">
        <div className="page-container">
          <h2>What we can work on</h2>
          <ul className="offer-rows">
            <li><span className="offer-rows__title">Web design</span><span>Clear websites, product experiences, and next steps.</span></li>
            <li><span className="offer-rows__title">AI workflows</span><span>Automation and content systems with human quality checks at the end.</span></li>
            <li><span className="offer-rows__title">SEO and GEO</span><span>Search visibility and generative answer reach.</span></li>
            <li><span className="offer-rows__title">Custom AI apps</span><span>Internal tools with MCP integrations.</span></li>
            <li><span className="offer-rows__title">Fractional marketing leadership</span><span>Strategy, execution, and growth systems.</span></li>
          </ul>
        </div>
      </section>
    </PageFrame>
  );
}

export default function PortfolioV2() {
  const pathname = window.location.pathname;
  let page: ReactNode;

  switch (pathname) {
    case '/philosophy.html': page = <PhilosophyPage />; break;
    case '/tool-lab.html': page = <ToolLabPage />; break;
    case '/work.html': page = <WorkPage />; break;
    case '/timeline.html': page = <TimelinePage />; break;
    case '/audit.html': page = <AuditPage />; break;
    case '/contact.html': page = <ContactPage />; break;
    default: page = <HomePage />;
  }

  return <>{page}</>;
}
