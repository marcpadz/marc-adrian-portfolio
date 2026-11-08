# Marc Adrian portfolio V2 design system

## Direction

A warm, editorial portfolio with a distinctly pixel-art heart. The page system uses the supplied cream-and-teal pixel mockup as the visual source of truth, with the second mockup supplying new copy and the data it actually contains. The visual signature is the supplied pixel command centre, Marc sprites, and four cat sprites; they are real supplied assets, not stand-ins.

Design read: seven static routes for founders and marketing leaders who want to see how Marc uses AI in actual marketing work. Primary action: explore the field-tested work and start a conversation. Tone: practical, candid, lightly playful. Visual variance 7/10, motion 4/10, information density 5/10, asset dependence 8/10, brand fidelity 8/10.

## Tokens

- Paper: warm cream `#FAF8F5`; secondary paper `#F2EEE7`; hairline `#E7E2DA`.
- Ink: `#141413`; muted ink `#57534E`.
- Signal: teal `#0D9488`, with a pale teal wash `#CCFBF1`; supporting amber `#D97706` and pale amber `#FEF3C7`.
- Display: Instrument Serif. Body: Plus Jakarta Sans. JetBrains Mono is reserved for actual code and measurements.
- Container: 1200px maximum content width, centered, 24–64px responsive gutters. Spacing uses a 4px base with an 8px major rhythm. Multi-column sections share one 48px column gap. Sharp 1px rules carry most structure; a single restrained offset shadow is used for selected interactive surfaces.

## Routes and content

- `/` — home, pixel command-centre scene, new first-person manifesto copy, direct paths into the work.
- `/philosophy.html` — the anti-slop operating system, with a three-way AI-versus-human simulator.
- `/tool-lab.html` — searchable, expandable tool verdicts. The mockup embeds nine records although its heading says 12, so the page reports the nine records actually supplied.
- `/work.html` — six supplied apps and workflow projects, three featured in a scroll-stacked set and the other three in a plain index.
- `/timeline.html` — seven supplied career entries with the mockup's four phase labels and a scroll-progress spine.
- `/audit.html` — an interactive starting blueprint using the two implemented inputs (bottleneck and AI maturity); no unsupported third channel input or guaranteed savings claim.
- `/contact.html` — direct contact and social paths; no nonfunctional form submission.

## Motion and component references

The app stays on its existing React/Vite stack. The home pins use an accessible popover pattern; the work page uses the scroll-pinned stack pattern from [21st.dev Stacking Cards](https://21st.dev/@danielpetho/components/stacking-cards); the timeline follows [21st.dev Modern Timeline](https://21st.dev/@chowlol202/components/modern-timeline); the tool index borrows the searchable accordion shape from [21st.dev Searchable FAQ](https://21st.dev/@educalvolpz/components/faq-3); the diagnostic follows [21st.dev Product Finder Quiz](https://21st.dev/@ziegfiroyt/components/ecommerce46). The portfolio grid and popover references are [Portfolio Showcase Grid](https://21st.dev/@uiable/components/block-portfolio-9) and [Popover](https://21st.dev/@ddoemonn/components/popover).

Interactions are implemented with the existing React, Radix, and GSAP dependencies rather than installing a new component generator or changing the app framework. Motion is limited to transforms and opacity, has visible pause for the ambient sprite, and is disabled or flattened under `prefers-reduced-motion`. Every interactive item remains keyboard reachable with a visible focus state. The page content remains complete without animation.

## Preservation and risk notes

- V1 remains on `main`; V2 is developed on `portfolio-v2` and is not deployed to staging or production.
- Preserve user-supplied claims as written in the mockup; do not add new metrics, clients, testimonials, or tool verdicts.
- The nine tool cards, six project records, seven timeline records, three philosophy simulator modes, and two audit inputs come from the supplied second HTML mockup.
- Keep legacy source components in place; V2 routes use new page code and V2-specific assets.

## Final review

- The supplied command-centre art and Marc/cat sprites remain the visual anchor; the Home index is a six-link, numbered route list that stacks on phones. Contact now has full-width, two-column service rows while retaining web design, AI workflows/automation, SEO/GEO, internal AI/MCP integrations, and fractional leadership.
- Build verification passed: `npm run build`, ESLint on the changed app files, and `git diff --check`.
- Hallmark rendered 35 captures across all seven routes at 1280×800, 1440×900, 1920×1080, full-page 1440px, and 375px. Final result: 0 FAIL, 0 WARN, 6 WAIVED. The single documented Reflex waiver is 44c on the six interior routes: their deliberate Banner intros lead into the page body sooner than a full-screen hero; Home retains its Stage posture.
- V1 remains on `main`; this work is isolated to `portfolio-v2`. No staging or production deployment was made.

## Static output

`npm run build` now pre-renders each route into its own HTML file using the same React page components, then hydrates that markup in the browser. The Vite development server still supports its empty-root client-render fallback; no new dependencies were added.
