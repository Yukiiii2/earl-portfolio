# Premium Bookshelf Refinement Design

## Intent

Refine the existing Featured Projects bookshelf into a collector's-edition project archive without changing the approved Portfolio V2 direction or replacing its CSS 3D implementation. The bookshelf remains the primary desktop project selector and the project case study below remains the content destination.

## Goals

- Give all four volumes authentic, traceable project branding.
- Improve book depth, cover hierarchy, shelf material, lighting, hover, focus, and selected states while keeping titles readable.
- Preserve ProjectFlow as the initially selected flagship and keep case-study details synchronized with the selected volume.
- Preserve a fast, accessible mobile selector and reduced-motion behavior.
- Keep the current Vue 3, Vite, Tailwind, and dependency footprint.

## Non-goals

- No page rebuild, framework migration, WebGL bookshelf, new animation library, or new project claims.
- No changes to the hero, production website, Vercel settings, Formspree endpoint, or resume workflow.
- No commit, push, pull request, merge, or deployment before review approval.

## Authentic brand sources

| Volume | Cover source | Decision |
| --- | --- | --- |
| ProjectFlow | `C:\Users\EN\Documents\projectflow\public\favicon.svg` from `Yukiiii2/projectflow` | Use the official purple linked-chain app mark. |
| Voclaria | `assets/Speaksy.png` on `Yukiiii2/Voclaria` branch `final-najud` | Reuse the matching original portfolio asset at `public/Speaksy.png`. |
| MarianTBI Connect | Existing original-portfolio asset `public/MarianTBI.jpg`; public repository `BantawigP/TBI_marian` has no image assets | Preserve the supplied project artwork; do not invent a replacement. |
| BrightMinds | Existing authentic portfolio asset `public/BrightMinds.svg` | Preserve the supplied blue graduation-cap project mark; repository assets are used only to understand and capture the genuine interface. |

## Chosen approach

Keep `ProjectBookshelf.vue` as one CSS 3D component and add a dedicated `brand` object to each project record. Covers use the brand asset independently from `images`, so cover identity cannot accidentally change when the case-study gallery changes. Build each cover from consistent zones: volume/category, framed brand artwork, title, archive footer, and corner registration details. Add restrained depth, page edges, contact shadows, ambient light, and selection lighting with CSS only.

The mobile selector uses the same brand data in compact horizontal cards. Buttons retain native keyboard and screen-reader behavior, `aria-pressed`, and visible focus. Project selection stays in `Projects.vue`, so it persists while scrolling and continues to drive `ProjectShowcase.vue`.

## Case-study refinement

Retain verified copy, contribution statements, technology tags, ProjectFlow's real dashboard/Kanban screenshots, and the existing valid-link filter. BrightMinds uses genuine screens captured from its locally running source. When genuine screens cannot be obtained, show a clearly identified unavailable state: a portrait phone treatment for the React Native/Expo Voclaria app and a desktop treatment for MarianTBI. Never present a large logo as an application screenshot or fabricate an interface.

## Quality bar

- Test the brand contract, four cover marks, initial ProjectFlow selection, selection updates, gallery reset, and missing-link behavior.
- Verify desktop hover/focus/click, tablet layout, mobile touch selector, reduced motion, no horizontal overflow, and console cleanliness.
- Run the full test suite and production build, then keep a local Vite preview running for the user's review.
