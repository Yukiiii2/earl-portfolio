# Portfolio V2 Premium Animation Restoration Plan

**Spec:** `docs/superpowers/specs/2026-10-30-premium-animation-restoration-design.md`

**Global constraints:** Work only in `C:\Users\EN\Documents\earl-portfolio`; preserve all current uncommitted work; do not commit, push, merge, deploy, redesign, or add an animation dependency.

## Task 1: Native reveal behavior

**Files:** `src/motion/reveal.js`, `src/motion/reveal.test.js`, `src/main.js`, `src/index.css`

1. Add failing behavioral tests for observer reveal, unsupported-observer fallback, reduced-motion fallback, and cleanup.
2. Implement one shared IntersectionObserver-backed Vue directive.
3. Add progressive reveal CSS and global reduced-motion behavior.
4. Run the focused test file.

## Task 2: Hero and section entrances

**Files:** `src/pages/Home.vue`, `src/pages/About.vue`, `src/pages/Skills.vue`, `src/pages/Projects.vue`, `src/pages/Experience.vue`, `src/pages/Contact.vue`

1. Apply restrained hero entrance classes without changing layout or copy.
2. Apply `v-reveal` to the approved sections and small internal groups.
3. Add a one-time entrance for the static sculpture while leaving desktop Three.js rotation untouched.
4. Run affected component tests.

## Task 3: Project and interaction refinement

**Files:** `src/pages/Projects.vue`, `src/components/ProjectShowcase.vue`, `src/components/ProjectBookshelf.vue`, `src/App.vue`, `src/pages/Contact.vue`, relevant tests

1. Add a short keyed case-study transition and gallery media transition.
2. Refine book lighting/brand response and selected state without changing geometry or content.
3. Add consistent pressed/arrow/control feedback to navigation, links, buttons, gallery controls, and the form.
4. Keep all focus and reduced-motion behavior intact.
5. Run project, app, and contact tests.

## Task 4: Verification and evidence

1. Run the full automated test suite and production build.
2. Verify desktop, mobile, and reduced-motion behavior in the real local browser.
3. Check desktop Three.js and mobile static render states, project selections, gallery controls, navigation, and console errors.
4. Capture desktop/mobile screenshots and keep the local preview running.
5. Review the final diff for unrelated changes and report remaining limitations.

## Review focus

- Content must remain visible if the observer is missing or fails.
- Reduced motion must not leave pending elements hidden.
- Mobile must not load Three.js.
- Transitions must not create duplicate IDs, broken aria relationships, layout collapse, or focus movement.
