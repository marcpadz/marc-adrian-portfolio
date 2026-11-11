# Marc Adrian portfolio V2 design system

## Direction

A warm, editorial portfolio with a distinctly pixel-art heart. The page system uses the supplied cream-and-teal pixel mockup as the visual source of truth, with the second mockup supplying new copy and the data it actually contains. The visual signature is the supplied pixel command centre, Marc sprites, and four cat sprites; they are real supplied assets, not stand-ins.

Design read: seven static routes for founders and marketing leaders who want to see how Marc uses AI in actual marketing work. Primary action: start a conversation about services; field-tested work supplies the proof. Tone: practical, candid, lightly playful. Visual variance 7/10, motion 4/10, information density 5/10, asset dependence 8/10, brand fidelity 8/10.

## Tokens

- Light mode: warm cream paper and ink remain the base palette, with teal and amber as semantic accents.
- Dark mode: a user-toggleable, system-aware OKLCH palette keeps the cream/teal character, raises text contrast, keeps surface layers slightly lighter than the canvas, and removes offset shadows.
- Display: upright Instrument Serif. Body: Plus Jakarta Sans variable weights 300–700, with a lighter body weight in dark mode. JetBrains Mono is reserved for actual code and measurements. No italic face is loaded or used.
- Container: 1200px maximum content width, centered, 24–64px responsive gutters. Spacing uses a 4px base with an 8px major rhythm. Multi-column sections share one 48px column gap. Sharp 1px rules carry most structure; a single restrained offset shadow is used for selected interactive surfaces.

## Routes and content

- `/` — home, pixel command-centre scene, direct service CTA, pixel-art rows for web design, AI/automation, SEO/GEO, and a hands-on Why section.
- `/philosophy.html` — the anti-slop operating system, with a three-way AI-versus-human simulator.
- `/tool-lab.html` — searchable, expandable tool verdicts. The mockup embeds nine records although its heading says 12, so the page reports the nine records actually supplied.
- `/work.html` — six supplied apps and workflow projects, three featured in a scroll-stacked set and the other three in a plain index.
- `/timeline.html` — seven supplied career entries with the mockup's four phase labels and a scroll-progress spine.
- `/audit.html` — an interactive starting blueprint using the two implemented inputs (bottleneck and AI maturity); no unsupported third channel input or guaranteed savings claim.
- `/contact.html` — direct contact and social paths; no nonfunctional form submission.

## Motion and component references

The app stays on its existing React/Vite stack. The home pins use an accessible popover pattern; the work page uses the scroll-pinned stack pattern from [21st.dev Stacking Cards](https://21st.dev/@danielpetho/components/stacking-cards); the timeline follows [21st.dev Modern Timeline](https://21st.dev/@chowlol202/components/modern-timeline); the tool index borrows the searchable accordion shape from [21st.dev Searchable FAQ](https://21st.dev/@educalvolpz/components/faq-3); the diagnostic follows [21st.dev Product Finder Quiz](https://21st.dev/@ziegfiroyt/components/ecommerce46). The portfolio grid and popover references are [Portfolio Showcase Grid](https://21st.dev/@uiable/components/block-portfolio-9) and [Popover](https://21st.dev/@ddoemonn/components/popover).

Interactions are implemented with the existing React, Radix, and GSAP dependencies rather than installing a new component generator or changing the app framework. Home services remain still, matching the reference; the Why heading uses one subtle CSS view-timeline reveal on larger screens, with a static fallback and reduced-motion support. The Process scroll behavior is intentionally not implemented until Marc clarifies whether pinning was the problem. The dark-mode choice persists locally, and the ambient sprite keeps its existing pause control. Every interactive item remains keyboard reachable with a visible focus state. The page content remains complete without animation.

## Preservation and risk notes

- V1 remains on `main`; V2 is developed on `portfolio-v2` and is not deployed to staging or production.
- Keep the header logo/wordmark as a placeholder; do not invent a replacement mark.
- Preserve user-supplied claims as written in the mockup; do not add new metrics, clients, testimonials, or tool verdicts.
- The nine tool cards, six project records, seven timeline records, three philosophy simulator modes, and two audit inputs come from the supplied second HTML mockup.
- Keep legacy source components in place; V2 routes use new page code and V2-specific assets.

## Final review

- The home now follows the supplied pixel-art service direction, with web design, AI/automation, and SEO/GEO rows, a hands-on Why section, a direct service CTA, and a six-link route index. The existing wordmark stays a placeholder.
- Typography uses Plus Jakarta Sans for body, upright Instrument Serif for headings, and JetBrains Mono only for code; italic styling is removed. The persistent light/dark toggle is system-aware, and the Why heading reveal has a reduced-motion fallback. Process behavior remains deferred until Marc clarifies whether pinning was the issue.
- `npm run build` succeeds and prerenders all seven routes. `git diff --check` is clean.
- The changed V2 TSX passes targeted ESLint. Repository-wide `npm run lint` still reports eight errors in unchanged `src/components/ui/*` files; none are in this change set.
- Hallmark rendered five home captures at 1280×800, 1440×900, 1920×1080, full-page 1440px, and full-page 375px. Final result: 0 FAIL, 0 REFLEX, 0 WARN; kept-content checks passed for 17/17 links, 2/2 fields, and 15/15 handlers.
- Browser checks covered explicit and system dark mode, saved-theme persistence across routes, mobile width, reduced motion, and a clean console. The standalone preview is `https://marc-adrian-portfolio-v2-preview.pages.dev`, sourced only from `portfolio-v2` with no custom domain; the V1 staging alias and actual production site were not changed.

## Static output

`npm run build` now pre-renders each route into its own HTML file using the same React page components, then hydrates that markup in the browser. The Vite development server still supports its empty-root client-render fallback; no new dependencies were added.
