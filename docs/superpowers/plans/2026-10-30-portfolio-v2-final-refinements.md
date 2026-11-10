# Portfolio V2 Final Refinements — Implementation Plan

**Goal:** Add the genuine BrightMinds landing page to its gallery, replace Voclaria and MarianTBI Connect's oversized capture-unavailable panels with verified premium project overviews, then complete evidence-based whole-site QA without changing the approved design direction.

**Constraints:** Keep Vue 3/Vite/Tailwind and the current CSS 3D bookshelf; preserve the Connected Forms Option 03 mark already implemented; do not fabricate screens or claims; do not submit the contact form; do not commit, push, merge, publish, or deploy. The user's no-commit rule overrides any workflow default that would normally create commits.

## Files

- Modify `src/pages/portfolio/data.js`: add the verified BrightMinds home capture and structured overview facts for the two screenshot-limited projects.
- Modify `src/components/ProjectShowcase.vue`: render the existing authentic brand within a compact split overview with feature list and secondary evidence note.
- Modify `src/pages/Projects.test.js`: pin gallery ordering, verified overview content, device treatment, and subtle evidence-note behavior.
- Add `public/projects/brightminds-home-800.jpg` and `public/projects/brightminds-home-1280.jpg`: optimized crops derived from the locally rendered repository page.
- Update `PORTFOLIO-V2-CHECKPOINT.md` and `design-qa.md`: record provenance, QA evidence, results, and remaining limitations.

## Task 1 — BrightMinds genuine homepage

1. Confirm the public `Frontend/src/views/Home.vue` and `/home` route contain the real landing page.
2. Run an isolated copy locally, build it, and capture the clean production page without modifying or publishing the source repository.
3. Add a failing component test requiring `BrightMinds` to open on the home capture with three gallery controls in Home/Login/Role-selection order.
4. Run the focused test and verify the expected failure.
5. Create 1280×800 and 800×500 optimized JPEGs from the accepted local capture and update the project data.
6. Re-run the focused test and the data tests.

## Task 2 — Premium split overviews

1. Add failing component tests requiring Voclaria and MarianTBI Connect to show authentic logos, verified feature lists, contribution context, correct mobile/desktop treatment, and a secondary source-evidence note without a large unavailable headline.
2. Run the focused tests and verify the expected failures.
3. Add structured `galleryFallback` overview fields using only previously verified source facts.
4. Replace the large fallback treatment with a balanced split overview: branded device/art panel, concise purpose, verified features, and a subdued evidence note.
5. Preserve portrait proportions for Voclaria, desktop proportions for MarianTBI Connect, semantic headings/lists, reduced-motion behavior, and responsive stacking.
6. Re-run the focused tests and full suite.

## Task 3 — Whole-site QA and narrow fixes

1. Capture the current and final portfolio in the in-app browser at desktop and mobile sizes.
2. Inspect hero/3D fallback, avatar hover/keyboard/touch behavior, skills, bookshelf selection, all galleries, experience/certifications, navigation, footer, résumé, and contact validation without sending a real message.
3. Check keyboard focus, semantic controls, reduced-motion behavior, lazy images, overflow, console errors, and referenced local assets.
4. For any genuine defect found, write a failing test first, implement the smallest correction, and re-run the focused and full suites.
5. Run `npm test`, `npm run build`, `npm audit --audit-level=high`, and `git diff --check`.
6. Save accepted desktop/mobile screenshots outside the production bundle, inspect them, and update the checkpoint documents.

## Review focus

- BrightMinds' first gallery image must be the actual `/home` page rendered from `lnxexu/BrightMinds`, not a reconstruction.
- Voclaria and MarianTBI Connect must feel intentional without presenting logos as application screenshots.
- Capture limitations must remain truthful but visually secondary.
- No unverified metrics, contribution claims, live links, or public deployments may be introduced.
- The existing Option 03 mark, project selection behavior, Formspree endpoint, résumé path, and current live site must remain unchanged.
