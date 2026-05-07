export default function Footer() {
  return (
    <footer className="w-full bg-pixel-bg-alt pt-20 pb-10 border-t border-pixel-cyan/10">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left */}
          <div className="text-center md:text-left">
            <div className="font-pixel text-sm text-pixel-cyan">
              Marc. — Growth Systems Architect
            </div>
            <div className="font-terminal text-xs text-pixel-muted mt-1">Cat Staff</div>
          </div>

          {/* Center - Mini Pixel Room */}
          <div className="w-[200px] h-[80px] rounded-lg overflow-hidden">
            <img
              src="/assets/footer-mini-room.jpg"
              alt="Mini pixel art room with cats"
              className="w-full h-full object-cover pixel-art"
            />
          </div>

          {/* Right - Links */}
          <div className="flex items-center gap-4 font-body text-sm text-pixel-muted">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pixel-cyan transition-colors"
            >
              LinkedIn
            </a>
            <span className="text-pixel-muted/30">·</span>
            <a
              href="mailto:hello@example.com"
              className="hover:text-pixel-cyan transition-colors"
            >
              Email
            </a>
            <span className="text-pixel-muted/30">·</span>
            <a
              href="https://eloqwnt.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pixel-cyan transition-colors"
            >
              Eloqwnt
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-5 border-t border-pixel-muted/10 text-center">
          <p className="font-terminal text-xs text-pixel-muted/50 italic">
            (The cats have no socials. They prefer privacy.)
          </p>
        </div>
      </div>
    </footer>
  );
}
