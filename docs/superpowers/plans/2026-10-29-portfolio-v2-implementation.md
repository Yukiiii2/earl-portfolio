# Earl Portfolio V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a polished, accessible Vue portfolio whose editorial visual system and enhanced 3D bookshelf make ProjectFlow the flagship project while preserving verified existing functionality.

**Architecture:** Keep the single-page Vue/Vite application and split the project experience into data, selector, and showcase responsibilities. Use testable pure helpers for project-link filtering and contact validation, Vue components for interaction, CSS 3D for the bookshelf, and the existing direct Three.js renderer for the hero sculpture. Remove AOS-driven hidden states and rely on content-visible CSS transitions plus native/observer behavior.

**Tech Stack:** Vue 3, Vue Router, Vite 8, Tailwind CSS 4, Three.js, CSS 3D transforms, Vitest, Vue Test Utils, jsdom.

**Spec:** `docs/superpowers/specs/2026-10-29-portfolio-v2-design.md`

## Global Constraints

- Keep the existing Vue 3, Vite, Tailwind, and Three.js architecture.
- Preserve the Formspree endpoint `https://formspree.io/f/xqpawldp` exactly.
- Preserve all four projects in this order: ProjectFlow, Voclaria, MarianTBI Connect, BrightMinds.
- Use only verified project facts, contributions, screenshots, and destinations.
- Use the real `public/Earl_Ang_Resume.pdf` asset and `/Earl_Ang_Resume.pdf` download path.
- Support widths 1920, 1440, 1024, 768, 390, and 320 px, keyboard access, visible focus, and reduced motion.
- Do not add paid services or unrelated dependencies.
- Do not commit, push, merge, create a pull request, alter Vercel settings, or deploy.
- Keep the original Codex checkout unchanged as a backup; all work occurs in `C:\Users\EN\Documents\earl-portfolio` on `feature/portfolio-v2-redesign`.

## Review Focus

- A missing/placeholder external URL must omit its CTA instead of rendering a broken link; pin this in Task 2 data tests.
- Reduced-motion users must receive static, fully visible content without marquee, shelf, gallery, or sculpture animation; pin helper/component behavior in Tasks 4 and 6 and verify in Task 8.
- A coarse-pointer/mobile visitor must be able to select every project without hover or precise 3D manipulation; pin selector behavior in Task 6 and browser-test it in Task 8.
- Invalid contact fields and simulated network failure must produce associated, announced feedback without a real Formspree submission; pin validation/status behavior in Task 7.
- A WebGL initialization failure must leave an intentional hero composition rather than an empty box; pin the fallback state in Task 4.

---

### Task 1: Test Harness and Baseline Guardrails

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `vitest.config.js`
- Create: `src/test/setup.js`
- Create: `src/pages/portfolio/data.test.js`

**Interfaces:**
- Produces: `npm test` running `vitest run` in jsdom with Vue Test Utils cleanup and DOM matchers available to later tasks.

- [ ] **Step 1: Add a deliberately failing smoke test for the future ProjectFlow-first data contract**

Create `src/pages/portfolio/data.test.js` importing `DATA.projects` and asserting the first title is `ProjectFlow`; the current data must fail.

- [ ] **Step 2: Install only the test dependencies**

Run: `npm install --save-dev vitest @vue/test-utils jsdom`

- [ ] **Step 3: Add the Vitest configuration and setup file**

Use jsdom, include `src/**/*.test.js`, restore mocks after every test, and clear `document.body` after each test.

- [ ] **Step 4: Add `test` and `test:watch` scripts**

Run: `npm test`
Expected: FAIL because the first current project is `Voclaria`.

- [ ] **Step 5: Record the red result and continue without committing**

### Task 2: Verified Portfolio Data and Real Project Assets

**Files:**
- Modify: `src/pages/portfolio/data.js`
- Create: `src/pages/portfolio/project-links.js`
- Modify: `src/pages/portfolio/data.test.js`
- Create: `src/pages/portfolio/project-links.test.js`
- Create: `public/projects/projectflow-dashboard-800.jpg`
- Create: `public/projects/projectflow-dashboard-1280.jpg`
- Create: `public/projects/projectflow-kanban-800.jpg`
- Create: `public/projects/projectflow-kanban-1280.jpg`

**Interfaces:**
- Produces: `DATA.projects` entries with `id`, `title`, `category`, `description`, `contribution`, `tags`, `images`, `live`, `liveLabel`, `source`, `coverColor`, and `accentColor`.
- Produces: `visibleProjectLinks(project)` returning only valid non-placeholder action objects.

- [ ] **Step 1: Extend the failing data test**

Assert exact project order, ProjectFlow stack, two real ProjectFlow image paths, and absence of live URLs for MarianTBI Connect and BrightMinds.

- [ ] **Step 2: Write failing link-filter tests**

Assert valid ProjectFlow live/source actions are returned and `''`, `'#'`, and placeholder URLs are omitted.

- [ ] **Step 3: Copy the four verified ProjectFlow image variants from `C:\Users\EN\Documents\projectflow\public`**

Verify source and destination SHA-256 hashes match; do not modify the ProjectFlow repository.

- [ ] **Step 4: Implement verified project data and `visibleProjectLinks(project)`**

Use the approved specification's factual descriptions and conservative contribution wording.

- [ ] **Step 5: Run the focused tests**

Run: `npm test -- src/pages/portfolio/data.test.js src/pages/portfolio/project-links.test.js`
Expected: PASS.

### Task 3: Global Editorial Shell, Navigation, and Metadata

**Files:**
- Modify: `src/index.css`
- Modify: `src/App.vue`
- Modify: `src/main.js`
- Modify: `vite.config.js`
- Modify: `index.html`
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `src/metadata.test.js`

**Interfaces:**
- Produces: global design tokens, `.section-shell`, `.section-kicker`, `.display-title`, `.button-primary`, `.button-secondary`, skip-link/focus styles, and content-visible reduced-motion defaults.
- Produces: fixed responsive navigation with active-section state, accessible mobile menu, and skip link.

- [ ] **Step 1: Add a failing static metadata test**

Create `src/metadata.test.js` that reads `index.html` and asserts the exact portfolio title, description, canonical URL, Open Graph title/description/image, Twitter card, and theme color.

- [ ] **Step 2: Remove AOS initialization/imports and uninstall AOS**

Content must render visible without scroll initialization. Keep Vue, router, and Three.js/TresJS behavior intact.

- [ ] **Step 3: Replace global CSS with the approved color/type/spacing system**

Define the design tokens, container widths, button primitives, focus states, selection colors, reduced-motion rules, and responsive typography.

- [ ] **Step 4: Rebuild the application shell and navigation**

Add `#main-content`, skip link, improved mobile focus/escape/body-scroll behavior, verified social links, and editorial footer.

- [ ] **Step 5: Add SEO/social metadata and remove production Vue devtools**

Use `/Avatar.png` as the available social image until a future dedicated share card is supplied; do not fabricate project imagery.

- [ ] **Step 6: Run metadata tests and build**

Run: `npm test -- src/metadata.test.js`
Expected: PASS.

Run: `npm run build`
Expected: PASS without AOS-hidden output.

### Task 4: Refined Hero and Three.js Sculpture

**Files:**
- Modify: `src/pages/Home.vue`
- Modify: `src/components/Scene3D.vue`
- Create: `src/components/Scene3D.test.js`

**Interfaces:**
- Produces: `Scene3D` with `data-render-state="ready|fallback"`, capped DPR, ResizeObserver sizing, IntersectionObserver/visibility pausing, pointer easing, reduced-motion static render, and WebGL fallback copy.

- [ ] **Step 1: Write failing Scene3D fallback and reduced-motion tests**

Mock WebGLRenderer failure and `matchMedia`; assert fallback text/state is visible and reduced motion does not request a continuous animation frame.

- [ ] **Step 2: Implement the refined renderer lifecycle**

Improve camera/framing, use physically coherent warm key/rim lighting, richer material, resize observation, viewport pausing, cleanup, and fallback state.

- [ ] **Step 3: Rebuild the hero copy and layout**

Use `Earl Ang.`, `Frontend & Full-Stack Web Developer`, the approved value proposition, `View projects`, `Contact me`, and verified resume download.

- [ ] **Step 4: Run focused tests**

Run: `npm test -- src/components/Scene3D.test.js`
Expected: PASS.

### Task 5: About, Skills, Experience, and Certifications

**Files:**
- Modify: `src/pages/About.vue`
- Modify: `src/pages/Skills.vue`
- Modify: `src/pages/Experience.vue`
- Modify: `src/components/Marquee.vue`

**Interfaces:**
- Consumes: verified `DATA.skills`, `DATA.experience`, and `DATA.certifications`.
- Produces: keyboard/touch-capable avatar switch, verified grouped skills, editorial practicum timeline, compact credentials list, and reduced-motion-safe technology strip.

- [ ] **Step 1: Write a failing About component interaction test**

Create `src/pages/About.test.js`; assert the alternate avatar is revealed by focus and click/tap as well as hover-compatible CSS state.

- [ ] **Step 2: Implement the editorial About layout and accessible avatar switch**

Use a semantic button around the portrait, preserve both assets, and expose pressed state without adding motion for reduced-motion users.

- [ ] **Step 3: Implement verified skill groups and supporting sections**

Include Vue, React, TypeScript, JavaScript, Tailwind, React Native/Expo, Node.js, Express, PostgreSQL, Neon, Supabase, Git/GitHub, Vite, testing/accessibility, and API integration. Keep AWS in certification context.

- [ ] **Step 4: Refine the marquee into a non-essential technology strip**

Pause on hover/focus and render statically under reduced motion.

- [ ] **Step 5: Run the focused test**

Run: `npm test -- src/pages/About.test.js`
Expected: PASS.

### Task 6: Enhanced Bookshelf and Selected Project Showcase

**Files:**
- Create: `src/components/ProjectBookshelf.vue`
- Create: `src/components/ProjectBookshelf.test.js`
- Create: `src/components/ProjectShowcase.vue`
- Create: `src/components/ProjectShowcase.test.js`
- Modify: `src/pages/Projects.vue`

**Interfaces:**
- `ProjectBookshelf` consumes `projects`, `selectedId`; emits `select(id)`; supports ArrowLeft/ArrowRight/Home/End and semantic `aria-pressed` buttons.
- `ProjectShowcase` consumes `project`; owns a bounded `activeImageIndex`; renders `visibleProjectLinks(project)` actions and no more than two readable images at once.
- `Projects` owns `selectedProjectId`, defaults to `projectflow`, and passes the selected project to both components.

- [ ] **Step 1: Write failing bookshelf selection/keyboard/mobile tests**

Assert ProjectFlow is selected initially, click and arrow keys select the next project, all four controls are at least semantically button controls, and selection does not depend on pointer events.

- [ ] **Step 2: Write failing showcase tests**

Assert ProjectFlow title/category/contribution/stack, valid CTAs, real dashboard/Kanban paths, bounded gallery index, and omitted invalid live CTAs.

- [ ] **Step 3: Extract and enhance the existing CSS 3D bookshelf**

Preserve book faces/spines/pages, improve cloth/paper shading, edge light, selection/focus states, shelf depth, and requestAnimationFrame-throttled pointer spotlight. Disable tilt/spotlight for coarse pointers and reduced motion.

- [ ] **Step 4: Implement the touch-friendly mobile selector**

Use horizontal scroll snap, book-spine styling, minimum 44 px targets, and direct taps; do not require hover.

- [ ] **Step 5: Implement the selected project showcase**

Use a concise detail header, contribution, stack, verified links, responsive `picture/srcset`, explicit image dimensions, optional two-image gallery, and reduced-motion instant updates.

- [ ] **Step 6: Run focused component tests**

Run: `npm test -- src/components/ProjectBookshelf.test.js src/components/ProjectShowcase.test.js`
Expected: PASS.

### Task 7: Contact Form Validation and Feedback

**Files:**
- Create: `src/pages/portfolio/contact.js`
- Create: `src/pages/portfolio/contact.test.js`
- Modify: `src/pages/Contact.vue`
- Create: `src/pages/Contact.test.js`

**Interfaces:**
- Produces: `validateContact({ name, email, projectType, message, website })` returning `{ valid, errors }` with field keys.
- `Contact.vue` consumes validation, preserves the Formspree endpoint, uses a hidden `website` honeypot, and exposes idle/submitting/success/error status.

- [ ] **Step 1: Write failing validation tests**

Assert trimmed required fields, email format, minimum meaningful message length, honeypot rejection, and valid submission data.

- [ ] **Step 2: Implement `validateContact`**

Return deterministic field errors without network access.

- [ ] **Step 3: Write a failing Contact component test**

Assert invalid submit does not call fetch and announces errors; mocked success resets fields; mocked rejection preserves values and announces an error.

- [ ] **Step 4: Implement the redesigned contact section**

Use associated error IDs, `aria-invalid`, loading state, live status, result focus, existing endpoint, and honeypot. Do not submit to the real endpoint during tests.

- [ ] **Step 5: Run focused tests**

Run: `npm test -- src/pages/portfolio/contact.test.js src/pages/Contact.test.js`
Expected: PASS.

### Task 8: Full Verification, Browser QA, Screenshots, and Checkpoint

**Files:**
- Create: `PORTFOLIO-V2-CHECKPOINT.md`
- Create: user-facing screenshots under `C:\Users\EN\Documents\Codex\2026-10-29\earl-portfolio-v2-complete-redesign-repository\outputs`
- Modify: any source files required by test/QA findings

**Interfaces:**
- Consumes: the complete application.
- Produces: a running local Vite preview, final QA evidence, screenshots, comparison, and known-issues report.

- [ ] **Step 1: Run the full automated suite**

Run: `npm test`
Expected: all tests pass with no unreported failures.

- [ ] **Step 2: Run production and dependency checks**

Run: `npm run build`
Run: `npm audit --omit=dev`
Record bundle sizes, warnings, and unresolved audit findings.

- [ ] **Step 3: Start the retained Vite development server**

Run: `npm run dev -- --host localhost`
Keep the assigned `http://localhost:<port>/` session running.

- [ ] **Step 4: Run real-browser responsive QA**

Use the in-app browser at 1920, 1440, 1024, 768, 390, and 320 px. Check navigation, bookshelf selection, gallery, avatar, resume download target, links, form validation without real submission, reduced motion, focus order, overflow, WebGL, and console errors.

- [ ] **Step 5: Capture and inspect full-page desktop and mobile screenshots**

Save accepted captures in the task `outputs` folder and reject blank, loading, hidden-AOS, or cropped captures.

- [ ] **Step 6: Fix QA findings test-first and repeat affected checks**

For each behavioral bug, add a failing regression test before the source fix.

- [ ] **Step 7: Write `PORTFOLIO-V2-CHECKPOINT.md`**

Document the transfer path, branch/status, design comparison, implementation summary, exact verification commands/results, link checks, screenshots, known limitations, preview/restart instructions, and approval gate.

- [ ] **Step 8: Stop at local review**

Report the final repository path, `git status`, clickable localhost preview, screenshot links, and known issues. Do not commit, push, merge, alter Vercel, or deploy.
