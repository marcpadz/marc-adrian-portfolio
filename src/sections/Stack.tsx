import StackTabs from '../components/StackTabs';

export default function Stack() {
  return (
    <section id="stack" className="w-full bg-pixel-bg py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block font-terminal text-xs text-pixel-cyan bg-pixel-cyan/15 px-3.5 py-1.5 rounded mb-6">
            Tech stack
          </span>
          <h2 className="font-pixel text-2xl md:text-3xl text-pixel-text">
            The toolkit.
          </h2>
          <p className="font-terminal text-base text-pixel-muted mt-3 italic">
            (Also: the mug. The blanket. The one cat who knows.)
          </p>
        </div>

        {/* Stack Tabs & Grid */}
        <StackTabs />
      </div>
    </section>
  );
}
