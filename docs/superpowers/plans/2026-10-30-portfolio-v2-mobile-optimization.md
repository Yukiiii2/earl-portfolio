# Portfolio V2 Mobile Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve Portfolio V2 mobile UX, performance, accessibility, and production readiness while preserving the approved desktop design and interactions.

**Architecture:** Add a small, testable scene-strategy helper so `Scene3D.vue` can avoid importing Three.js on phones and constrained contexts, using a captured still from the real sculpture instead. Refine existing Vue components and scoped CSS in place, reuse existing assets, and keep project data and external integrations unchanged.

**Tech Stack:** Vue 3, Vite, Tailwind CSS, Three.js, Vitest, Lighthouse 13, Codex in-app browser.

**Spec:** `docs/superpowers/specs/2026-10-30-portfolio-v2-mobile-optimization-design.md`

## Global Constraints

- Work only in `C:\Users\EN\Documents\earl-portfolio` on `feature/portfolio-v2-redesign`.
- Do not commit, push, merge, open a pull request, deploy, or modify the live site.
- Preserve the existing desktop Three.js sculpture and 3D bookshelf.
- Do not fabricate project screenshots or change Formspree credentials.
- Add no runtime dependencies.

## Review Focus

- A 320 px viewport must not extend content under the scrollbar or clip primary controls.
- Mobile/reduced-motion contexts must not import or initialize Three.js and must still show authentic hero artwork.
- The mobile menu must keep keyboard focus inside while open, close on Escape/navigation, and release scroll locking.
- Project and gallery selectors must expose names that include their visible labels and retain the correct selected project.
- Deferred media must still load when scrolled into view without image stretching or layout shift.

---

### Task 1: Adaptive hero rendering

**Files:**
- Create: `src/components/scene-strategy.js`
- Create: `src/components/scene-strategy.test.js`
- Create: `scripts/create-hero-still.py`
- Create: `public/hero-sculpture-still.webp`
- Modify: `src/components/Scene3D.vue`
- Modify: `src/components/Scene3D.test.js`

**Interfaces:**
- Produces: `shouldUseStaticScene(environment) -> boolean` and a `data-render-state="static"` still-image state.

- [x] Write tests proving phone, reduced-motion, Save-Data, and constrained-desktop environments select the still while capable desktop selects WebGL.
- [x] Run the focused tests and confirm the new expectations fail before implementation.
- [x] Generate a transparent WebP from the captured existing sculpture frame and implement the strategy before importing `three`.
- [x] Run the focused tests and full suite.

### Task 2: Mobile header, focus, and viewport fit

**Files:**
- Modify: `src/App.vue`
- Modify: `src/App.test.js`
- Modify: `src/index.css`
- Modify: `src/pages/Home.vue`

**Interfaces:**
- Consumes: existing `isMenuOpen`, `menuTrigger`, and hash navigation behavior.
- Produces: a full-height safe-area-aware menu with Escape/Tab containment and 44 px mobile brand/resume targets.

- [x] Add failing component tests for focus wrapping and scroll-lock cleanup.
- [x] Run the focused tests and confirm failure for the missing focus containment.
- [x] Implement menu containment, safe-area layout, 320 px overflow correction, and readable small-phone CTAs.
- [x] Run the focused tests and full suite.

### Task 3: Project gallery and media accessibility

**Files:**
- Modify: `src/components/ProjectBookshelf.vue`
- Modify: `src/components/ProjectShowcase.vue`
- Modify: `src/pages/Projects.test.js`
- Modify: `src/pages/About.vue`
- Modify: `src/pages/About.test.js`

**Interfaces:**
- Produces: selector accessible names containing visible text, lazy below-fold logos/portraits, stable intrinsic sizes, and compact responsive galleries.

- [x] Add failing tests for visible-label-inclusive selector names and lazy avatar/project media.
- [x] Run the focused tests and confirm they fail for the current eager/aria-label behavior.
- [x] Remove conflicting `aria-label` overrides, add screen-reader action prefixes, defer media, and refine mobile snap/gallery spacing.
- [x] Run the focused tests and full suite.

### Task 4: Verified contrast, font, and SEO corrections

**Files:**
- Modify: `src/pages/Home.vue`
- Modify: `src/pages/Contact.vue`
- Modify: `index.html`
- Create: `public/robots.txt`
- Modify: `src/metadata.test.js`

**Interfaces:**
- Produces: primary controls meeting normal-text contrast, non-blocking font behavior, and a valid public robots response.

- [x] Add a failing metadata test for the missing robots artifact.
- [x] Run the focused test and confirm failure.
- [x] Apply verified warm-red contrast values, switch the font request to `display=optional`, and add the robots file.
- [x] Run the focused tests and full suite.

### Task 5: Production verification and evidence

**Files:**
- Create: `PORTFOLIO-V2-MOBILE-QA.md`

**Interfaces:**
- Consumes: all implemented behavior and the before/after artifacts in the external QA output folder.
- Produces: an evidence-backed local review checkpoint.

- [x] Run tests, production build, dependency audit, link/resume HTTP checks, and Lighthouse mobile/desktop.
- [x] Run browser QA at every requested width, all project states, menu keyboard behavior, avatar interaction, contact validation, sticky navigation, and reduced-motion source checks.
- [x] Capture and inspect after screenshots before accepting them.
- [x] Document measured before/after results, limitations, screenshot paths, and exact preview/restart instructions.
- [x] Confirm Git status contains no commit/push/deploy activity and leave the Vite preview running.
