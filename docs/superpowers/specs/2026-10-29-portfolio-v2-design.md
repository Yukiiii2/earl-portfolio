# Earl Portfolio V2 — Redesign Specification

Date: 2026-10-29
Status: Proposed for review; implementation has not started
Review gate: No commit, push, pull request, merge, Vercel change, or deployment before Earl's explicit approval

## Intent

Create a distinctive, premium portfolio for Earl Ang that presents him clearly as an aspiring freelance frontend/full-stack web developer who builds functional, responsive web applications. The redesign should feel like an editorial digital monograph rather than a generic SaaS landing page, while preserving the working Vue application, EA. identity, red Möbius hero sculpture, avatar interaction, contact form, and project bookshelf.

The project showcase is the visual and narrative center of the page. The existing 3D bookshelf remains the primary project selector, with ProjectFlow promoted to Volume 01 and shown through real, readable product captures.

## Verified Current State

- Vue 3.5, Vite 8, Vue Router, Tailwind CSS 4, Three.js, TresJS registration, and AOS are installed.
- The hero sculpture is a custom Three.js Möbius mesh rendered directly with `THREE.WebGLRenderer`; it is not currently a TresJS scene.
- The project bookshelf is a CSS 3D/perspective component with keyboard-accessible buttons, selection state, and horizontal mobile scrolling.
- The About section uses `dumbavatar.jpg` and switches to `Avatar.png` on pointer hover.
- The contact form posts to the existing Formspree endpoint `https://formspree.io/f/xqpawldp` and already has basic loading, success, and error states.
- There is no `vercel.json` in the repository. Production configuration must remain untouched.
- `index.html` still uses the title `Vite App` and has no portfolio SEO/social metadata.
- The resume CTA points to `/Earl_Ang_Resume.pdf`, but no resume PDF exists in the current repository or its git history.
- The live full-page capture exposes a serious AOS issue: content below the fold remains hidden until it is scrolled into view, producing large blank regions in automated captures and potentially in unusual navigation states.
- The live site contains placeholder/broken destinations: the resume file is missing, MarianTBI and BrightMinds use `#` for live links, and LinkedIn is intentionally hidden because it is still a placeholder.

## Verified Project Facts

### Volume 01 — ProjectFlow

- Category: Full-stack web application.
- Description: Project and task management application with workspaces, Kanban workflow, team collaboration, and a secure interactive portfolio demo.
- Stack: React, TypeScript, Express, PostgreSQL, Neon, Render.
- Contribution: Designed and built by Earl as a portfolio project. Public commit history shows frontend, backend, database, security, demo, QA, and deployment-readiness work under Earl's identity.
- Live demo: `https://projectflow-s6xo.onrender.com/`.
- Source: `https://github.com/Yukiiii2/projectflow`.
- Verified imagery: the live landing page and repository-owned dashboard/Kanban captures generated from the real application. No generated/fabricated ProjectFlow interface will be used.

### Volume 02 — Voclaria

- Category: AI-assisted mobile learning application.
- Stack demonstrated by the repository: React Native, Expo, TypeScript, Supabase, media/camera/audio integrations.
- Contribution: Earl-authored commits cover student and teacher flows, class modules, progress/results, live/private video, teacher dashboard, navigation, and management components. Copy will summarize this as frontend feature development and service integration without claiming sole authorship.
- Landing page: `https://voclaria.uic.edu.ph/`.
- Source: `https://github.com/Yukiiii2/Voclaria/tree/final-najud`.

### Volume 03 — MarianTBI Connect

- Category: Contact and program management platform.
- Verified product scope: contacts, events, incubatees, team access, import/export, email verification, and Supabase-backed workflows.
- Verified stack: React, TypeScript, Vite, Tailwind CSS, Supabase.
- Source: `https://github.com/BantawigP/TBI_marian`.
- Contribution wording: the public repository credits Paul Bantawig and Ian Labonete and contains no Earl-authored commits. The portfolio will describe the project itself and avoid a personal contribution claim unless Earl supplies verified role details.
- No live CTA will be rendered because no valid public live destination is verified.

### Volume 04 — BrightMinds

- Category: E-learning platform for students, teachers, and parents.
- Verified stack: Vue, Vite, Vue Router, Vuex, Supabase, Express.
- Contribution: Earl-authored commits add topic management, topic-material upload, CourseDetails work, and related frontend components. Copy will state those concrete contributions without claiming sole authorship.
- Source: `https://github.com/lnxexu/BrightMinds`.
- No live CTA will be rendered because no valid public live destination is verified.

## Goals

- Establish a coherent editorial design system across every section.
- Improve Earl's positioning, hero messaging, calls to action, typography, rhythm, alignment, and visual hierarchy.
- Preserve the 3D Möbius sculpture, improve its lighting/camera/material integration, and provide a graceful fallback.
- Make the enhanced 3D bookshelf the primary Featured Projects selector.
- Use ProjectFlow as the initially selected flagship project with real, legible screenshots.
- Preserve truthful project descriptions and show only verified links.
- Preserve avatar hover behavior and provide equivalent keyboard/touch access.
- Preserve Formspree while improving validation, spam resistance, loading, success, and failure feedback.
- Work at 320 px through 1920 px, with keyboard navigation, visible focus, reduced motion, and efficient image loading.
- Finish with production-build evidence, real-browser QA, desktop/tablet/mobile screenshots, and `PORTFOLIO-V2-CHECKPOINT.md`.

## Non-goals

- No framework migration, CMS, database, authentication, blog, admin interface, or paid service.
- No new client claims, testimonials, employment history, metrics, awards, or expertise claims.
- No production deployment or Vercel configuration change during the review checkpoint.
- No replacement of the working 3D components for implementation convenience.
- No long case-study pages or routes; the portfolio remains a focused single-page experience.

## Anti-goals

- Generic SaaS card grids, glassmorphism, excessive pills, decorative dashboards, or a template-like agency aesthetic.
- Tiny screenshots, unreadable UI, auto-advancing carousels, scroll-jacking, heavy parallax, or excessive motion.
- Project descriptions that imply sole authorship where the repository shows team work.
- Hiding broken destinations behind visible buttons.
- A mobile bookshelf that requires precise 3D manipulation to use.

## Chosen Approach

Three directions were considered:

1. **Editorial Index:** strongest information hierarchy and whitespace, but the initial exploration reduced the bookshelf to static project cards.
2. **Cinematic Case Study:** strong flagship storytelling, but the layered environment treatment risked competing with Earl's work and extending the page unnecessarily.
3. **Interactive Monograph:** strongest numbered navigation and project emphasis, but the initial exploration still underused the existing bookshelf.

The chosen hybrid uses the restrained editorial grid and typography of Editorial Index, the large ProjectFlow presentation of Cinematic Case Study, and the project numbering/sticky index cues of Interactive Monograph. It explicitly restores and elevates the existing bookshelf as the primary selector.

## Design System

### Color

- Canvas: near-black `#070707` and ink `#0A0A0A`.
- Elevated surfaces: charcoal `#111111` and `#151515`.
- Primary text: warm white around `#F3F0EC`.
- Secondary text: warm gray around `#A9A39E`.
- Accent: warm red/coral centered on `#F05249`, with brighter red reserved for hover/focus/selection.
- Project-specific colors are confined to book covers and authentic project screenshots.

### Typography

- One expressive display family plus one highly readable sans-serif at most.
- Oversized but controlled hero title, compact uppercase section metadata, and comfortable 16–18 px body text.
- Long copy constrained to approximately 60–68 characters per line.

### Layout and rhythm

- Maximum content width approximately 1240–1320 px with fluid gutters.
- Strong editorial rules, numbered sections, asymmetric split layouts, and generous vertical rhythm.
- Repeated section chrome is limited; each section adds new information rather than repeating the same card pattern.
- Motion is restrained to fades, small translations, hover elevation, and project-detail transitions.

## Page Layout

### Navigation

- Retain fixed EA. navigation with About, Skills, Projects, Experience, and Contact.
- Improve active-section indication, focus visibility, mobile menu focus management, Escape behavior, and body-scroll handling.
- Include a skip link as the first focusable control.

### Hero

- Left: location/availability metadata, `Earl Ang.` name lockup, `Frontend & Full-Stack Web Developer`, one-sentence value proposition, and `View projects` / `Contact me` actions.
- Right: refined Three.js Möbius sculpture with warmer key/fill lighting, improved framing, subtle pointer response, capped pixel ratio, visibility pausing, and static reduced-motion rendering.
- Mobile: sculpture remains visible at a smaller, controlled aspect ratio; if WebGL initialization fails, show a styled static poster derived from the sculpture rather than an empty space.

### About and skills

- Two-column editorial portrait/story layout with verified education and 481-hour practicum details.
- Preserve the two avatar assets. Pointer hover, keyboard focus, and tap toggle reveal the alternate avatar; reduced-motion removes the fade.
- Skills reflect repository evidence: Vue, React, TypeScript, JavaScript, Tailwind CSS, React Native/Expo, Node.js, Express, PostgreSQL, Neon, Supabase, Git/GitHub, Vite, accessibility/testing, and API integration.
- AWS appears only in the certification context unless a repository demonstrates direct implementation.

### Featured Projects — bookshelf selector

- The section opens with a concise statement and instructions, followed immediately by the shelf.
- Volumes appear in this order: ProjectFlow, Voclaria, MarianTBI Connect, BrightMinds.
- Desktop/tablet uses the existing CSS 3D book construction. Materials gain richer cloth/paper shading, edge highlights, restrained shelf lighting, clearer depth, and stronger selected/focus states.
- Selection remains a semantic button group with `aria-pressed`. Arrow keys move selection; Enter/Space selects. Focus never depends on hover.
- Pointer spotlight updates are throttled through `requestAnimationFrame`; pointer work is disabled for reduced motion/coarse pointers.
- Selection changes do not move page focus automatically. The detail panel has `aria-live="polite"` on its heading/status region only, avoiding a noisy re-announcement of the entire article.
- A compact `Volume 01–04` label and project name remain legible on every book. Cover art is decorative; accessible names live on the buttons.
- Mobile uses a touch-friendly horizontal selector styled as book spines/covers with 44 px minimum targets and scroll snapping. It preserves the bookshelf metaphor without requiring tilt or hover precision.

### Selected project showcase

- A short crossfade/translate transition updates the showcase; reduced motion switches instantly.
- Header: volume, category, title, concise verified description, contribution statement, stack, and valid actions.
- Actions: `Try Live Demo`/`Live Demo` only for verified live URLs; `View Source` for verified public repositories. Placeholder links are omitted.
- Screenshot composition: one large primary image and, where available, one supporting image. No more than two images are visible at once.
- Optional gallery controls use labeled previous/next buttons and thumbnail/tab semantics; no autoplay.
- ProjectFlow initially shows the verified landing/dashboard imagery with the Kanban image available as the second view. Images use responsive `srcset`, explicit dimensions/aspect ratio, lazy loading below the first selected image, and descriptive alt text.
- Other projects use their existing real assets until better verified screenshots are available; no fabricated screens are introduced.

### Experience and certifications

- Preserve the Samal LGU practicum facts and existing certifications.
- Use a compact editorial timeline/list rather than decorative cards.
- Do not imply professional software employment from the IT support practicum.

### Contact

- Preserve the existing Formspree endpoint exactly.
- Add inline client validation, per-field error messages, disabled/loading state, persistent success/error status, and focus movement to the result message after submission.
- Add a visually hidden honeypot field compatible with Formspree and a submission time check where feasible; do not add paid CAPTCHA infrastructure.
- Browser QA validates required fields and state transitions without sending a real message.

### Footer

- Retain GitHub and X links, omit the placeholder LinkedIn link, add a restrained availability statement, and preserve EA. branding.

## Accessibility and Motion

- All controls remain reachable and operable by keyboard.
- Visible focus uses the warm-red accent with sufficient offset.
- Minimum interactive target size is 44 px on touch layouts.
- Native landmarks and heading order are preserved.
- The reduced-motion mode disables AOS transforms, marquee motion, spotlight movement, project crossfades, and continuous sculpture rotation.
- AOS will either be removed in favor of CSS/IntersectionObserver behavior that never hides content permanently, or configured so content is visible before animation initialization and in screenshots.
- Contrast, labels, error text, and alternative text are checked during QA; screenshots alone will not be treated as proof of full accessibility compliance.

## Performance and SEO

- Keep dependencies minimal; prefer existing Vue/CSS/Three.js capabilities.
- Remove unused Vue devtools from production configuration if it is not required.
- Cap renderer pixel ratio and pause rendering when offscreen/hidden.
- Optimize and copy ProjectFlow images from the real project repository; provide 800/1280 variants where appropriate.
- Add title, description, canonical URL, Open Graph/Twitter metadata, theme color, and a real social preview asset.
- Keep the current Vue history mode and confirm Vercel deep-link behavior without changing production settings.

## Verification Plan

- Automated tests for project ordering/selection, valid-link visibility, mobile selector behavior, contact validation/status handling, navigation behavior, and reduced-motion utilities.
- Production build with the existing Vite stack.
- Real-browser QA at widths 1920, 1440, 1024, 768, 390, and 320 px.
- Keyboard pass for skip link, navigation, mobile menu, bookshelf, project gallery, CTAs, avatar interaction, and form.
- Verify ProjectFlow demo/source, Voclaria landing/source, MarianTBI source, BrightMinds source, social links, and the resume asset.
- Check the contact form without sending unnecessary real messages.
- Capture full-page desktop and mobile screenshots after scrolling/animation states settle.
- Keep the Vite dev server running on its actual assigned localhost port for Earl's review.
- Record commands, QA results, screenshots, known limitations, original-versus-redesign comparison, and remaining issues in `PORTFOLIO-V2-CHECKPOINT.md`.

## Approval and Delivery Gate

Implementation occurs locally on `feature/portfolio-v2-redesign` after this specification is approved. Work remains uncommitted. The local preview stays running for personal review. The workflow stops after reporting the preview URL and QA evidence.

No commit, push, pull request, merge, Vercel setting change, or deployment is authorized until Earl explicitly says: `Approved. Commit, push, and deploy Portfolio V2.`

## Required Input Before Final Completion

The repository does not contain `Earl_Ang_Resume.pdf`. To preserve a working resume download without fabricating a document, Earl must provide the current resume PDF or an exact local path to it before final handoff. Until then, the implementation can keep the CTA visibly unavailable with an honest `Resume coming soon` label, but it cannot claim the download is functional.
