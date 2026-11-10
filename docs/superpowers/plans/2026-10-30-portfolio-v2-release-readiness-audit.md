# Portfolio V2 Release-Readiness Audit Plan

**Goal:** Independently verify the current local Portfolio V2 build, fix only genuine release blockers or low-risk measurable defects, and produce an evidence-backed release recommendation without committing or deploying.

**Approach:** Audit the release surface first, then verify facts and interactions from source and browser evidence. Preserve the approved visual system and project content. Any code change must have a focused verification and must not broaden the feature set.

**Constraints:** Work only in `C:\Users\EN\Documents\earl-portfolio` on `feature/portfolio-v2-redesign`. Do not commit, push, merge, open a pull request, deploy, submit Formspree, or publish linked projects.

## Review focus

- No secrets, local-only state, or accidental build artifacts are eligible for a future commit.
- Public assets copied by Vite are referenced, intentionally retained, or documented.
- Project claims and links are backed by source repositories or verified deployed behavior.
- Keyboard, mouse, touch, focus, validation, download, and adaptive Three.js behavior remain functional.
- Performance changes are accepted only with comparable Lighthouse evidence.

### Task 1: Repository and security inventory

- Inspect branch, remote, status, ignore rules, dependency manifests, environment files, credential patterns, public assets, and generated output.
- Map every public asset and untracked file to a runtime, test, documentation, or tooling purpose.
- Record release-surface findings without deleting or resetting work.

### Task 2: Content, metadata, and project verification

- Verify portfolio identity, metadata, canonical URL, robots, manifest/icons, headings, project copy, screenshots, technology tags, and external destinations.
- Compare project claims against the current public repositories and ProjectFlow deployment.
- Add only missing public metadata that has clear release value.

### Task 3: Browser and accessibility audit

- Capture fresh mobile and desktop evidence from the current run.
- Verify the complete flow at 320, 360, 390, 430, 768, 1024, 1440, and 1920 px.
- Exercise mouse and keyboard behavior for navigation, avatar, bookshelf, galleries, contact validation, resume, and footer links without external submissions.
- Inspect console errors, semantics, focus, touch targets, overflow, layout stability, and reduced-motion behavior.

### Task 4: Performance and production validation

- Establish a fresh production Lighthouse baseline before any performance change.
- Investigate LCP attribution and apply only a low-risk optimization with a measurable result.
- Run the full test suite, build, dependency audit, HTTP/link checks, Lighthouse, and `git diff --check`.

### Task 5: Release report and checkpoint

- Create `PORTFOLIO-V2-RELEASE-READINESS.md` with findings, exact changed-file inventory, screenshots, limitations, Git status, blockers, and a release recommendation.
- Leave the local preview running and stop for personal review.
