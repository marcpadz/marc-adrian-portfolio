import { useState } from 'react';

interface ToolCategory {
  id: string;
  label: string;
  tools: string[];
}

const categories: ToolCategory[] = [
  {
    id: 'automation',
    label: 'Automation',
    tools: ['Make.com', 'n8n', 'Zapier', 'Bika.ai', 'Pipedream', 'Webhooks & APIs'],
  },
  {
    id: 'ai-dev',
    label: 'AI & Dev',
    tools: ['Claude Code', 'Codex', 'Gemini CLI', 'Zhipu AI', 'VS Code / Cursor', 'Docker', 'Git', 'GitHub', 'Vercel', 'Netlify'],
  },
  {
    id: 'marketing',
    label: 'Marketing & SEO',
    tools: ['Semrush', 'Ahrefs', 'Google Search Console', 'Apify', 'RapidAPI', 'HubSpot', 'ActiveCampaign', 'Perplexity API', 'Gemini API'],
  },
  {
    id: 'design',
    label: 'Design & Content',
    tools: ['Figma', 'Notion', 'Final Cut Pro', 'Higgsfield AI', 'Google Stitch', 'Webflow', 'Framer', 'WordPress', 'Canva'],
  },
];

export default function StackTabs() {
  const [activeTab, setActiveTab] = useState('automation');
  const activeCategory = categories.find((c) => c.id === activeTab) || categories[0];

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={`font-terminal text-sm px-5 py-2.5 border rounded transition-all duration-200 ${
              activeTab === cat.id
                ? 'bg-pixel-cyan text-pixel-bg border-pixel-cyan font-bold'
                : 'border-pixel-cyan/30 text-pixel-muted hover:border-pixel-cyan hover:text-pixel-cyan'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Tool Grid */}
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        {activeCategory.tools.map((tool) => (
          <div
            key={tool}
            className="bg-pixel-bg-alt border border-pixel-muted/20 rounded-md px-6 py-4 min-w-[120px] text-center hover:border-pixel-cyan hover:shadow-[0_0_15px_rgba(77,238,234,0.15)] transition-all duration-200"
          >
            <span className="font-terminal text-base text-pixel-text">{tool}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
