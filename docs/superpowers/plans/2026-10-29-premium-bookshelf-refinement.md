# Premium Bookshelf Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:test-driven-development for every behavior change. This plan is executed locally without commits because the user requires a review checkpoint.

**Goal:** Turn the existing Featured Projects selector into a premium collector's-edition CSS 3D bookshelf with authentic project branding and a refined synchronized case study.

**Architecture:** Extend the existing project data with dedicated cover-brand metadata, render it in the current CSS 3D bookshelf and compact mobile selector, and polish the existing showcase without changing selection ownership. ProjectFlow's verified mark stays under `public/projects/brands`; the other covers reuse the authentic assets already supplied in `public`.

**Tech Stack:** Vue 3, Vite, scoped CSS, Vitest, Vue Test Utils

**Spec:** `docs/superpowers/specs/2026-10-29-premium-bookshelf-refinement-design.md`

## Global Constraints

- Preserve the existing Vue 3, Vite, Tailwind, and CSS 3D architecture.
- Add no dependency solely for visual effects.
- Use only verified branding and existing truthful project content.
- Do not commit, push, open a pull request, merge, deploy, or modify Vercel.
- Honor `prefers-reduced-motion` and preserve keyboard/screen-reader behavior.

## Review Focus

- A brand asset missing or failing must leave readable project text rather than an empty selector.
- Selected volume state must remain obvious and must update one case study only.
- Narrow desktop/tablet layouts must not clip book covers or overflow the page.
- Mobile controls must remain at least 44px tall, horizontally scrollable, and recognizable.
- Decorative imagery must not create duplicate or misleading screen-reader announcements.

### Task 1: Authentic cover asset contract

**Files:**
- Create: `public/projects/brands/projectflow-mark.svg`
- Reuse: `public/Speaksy.png`
- Reuse: `public/MarianTBI.jpg`
- Reuse: `public/BrightMinds.svg`
- Modify: `src/pages/portfolio/data.js`
- Modify: `src/pages/portfolio/data.test.js`

- [ ] Write a failing test that each project exposes a verified brand asset, label, and source note.
- [ ] Run the focused test and confirm failure because `brand` is absent.
- [ ] Add the verified assets and minimal brand metadata.
- [ ] Run the focused test and full suite.

### Task 2: Collector's-edition bookshelf and mobile selector

**Files:**
- Modify: `src/components/ProjectBookshelf.vue`
- Modify: `src/pages/Projects.test.js`

- [ ] Write failing component tests for four dedicated cover marks, decorative image semantics, mobile brand marks, and selected-volume state.
- [ ] Run the focused test and confirm the expected failure.
- [ ] Implement the new cover composition and mobile identity while preserving native buttons and `aria-pressed`.
- [ ] Refine depth, spines, pages, shelf, lighting, hover/focus/selected states, responsive behavior, and reduced motion in scoped CSS.
- [ ] Run the focused test and full suite.

### Task 3: Editorial case-study polish

**Files:**
- Modify: `src/components/ProjectShowcase.vue`
- Modify: `src/pages/Projects.test.js`

- [ ] Write a failing behavior test that gallery selection resets when the selected book changes.
- [ ] Run the focused test and confirm the expected failure if uncovered.
- [ ] Add only the minimal semantic/state change required, then refine the existing panel's visual framing and gallery controls.
- [ ] Run the focused test and full suite.

### Task 4: Browser QA and review handoff

**Files:**
- Modify: `PORTFOLIO-V2-CHECKPOINT.md`
- Modify: `design-qa.md`

- [ ] Run `npm test`, `npm run build`, `npm audit`, and `git diff --check`.
- [ ] Start Vite from `C:\Users\EN\Documents\earl-portfolio` and record the actual URL.
- [ ] Test 1920, 1440, 1024, 768, 390, and 320 widths in the browser.
- [ ] Verify all four project selections, galleries, links, keyboard/touch behavior, reduced-motion handling, console output, and no horizontal overflow.
- [ ] Capture desktop and mobile screenshots and update the checkpoint with brand provenance, results, and remaining limitations.
