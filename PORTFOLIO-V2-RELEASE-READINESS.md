# Portfolio V2 — Release Readiness Audit

Audit date: 2026-10-30
Repository: `C:\Users\EN\Documents\earl-portfolio`
Branch: `feature/portfolio-v2-redesign`
HEAD: `977f4289c46cc49cf48eaa51e1b876f2e813f2d9`
Remote: `https://github.com/Yukiiii2/earl-portfolio.git`
Recommendation: **READY WITH LIMITATIONS**

## 1. Executive summary

No technical release blocker remains in the audited local build. The approved identity, responsive layout, desktop Three.js sculpture, mobile static sculpture, project selector, galleries, navigation, form validation, résumé download, metadata, and external destinations passed fresh checks.

The audit fixed three concrete release issues:

- Removed a cross-origin, render-blocking Google Fonts stylesheet by self-hosting the exact Outfit and DM Mono files with their OFL licenses.
- Made the mobile LCP sculpture discoverable from the initial document with a mobile-only preload. Median mobile Lighthouse improved from **88 to 98**, with LCP improving from **3.49 s to 2.41 s**.
- Preserved the 1.44 MB logo reference and 307 KB extraction master under `docs/assets/branding/` instead of shipping both from `public/`. The production artifact is now 2,557,140 bytes and excludes 1,742,174 bytes of archival branding sources.

The audit also corrected BrightMinds' displayed backend stack from Express to the repository's verified FastAPI backend, changed the Twitter card type to match the existing portrait image, and added a one-URL sitemap referenced by `robots.txt`.

## 2. Verified user flows

1. **Landing and hero — Healthy.** Earl Ang's frontend/full-stack identity, primary calls to action, custom mark, résumé link, and sculpture render correctly. Phones up to 767 px use the static WebP; 768 px and wider use the interactive Three.js canvas.
2. **Navigation — Healthy.** Desktop links, active-section state, mobile dialog, focus containment, Escape close, link close, safe-area padding, and the skip link were verified.
3. **About and avatar — Healthy.** Education/practicum text is preserved. Mouse styling is present; click and keyboard Enter toggle the alternate portrait with `aria-pressed` state.
4. **Skills — Healthy.** The section remains readable at every audited breakpoint and uses semantic grouped lists.
5. **Featured-project selection — Healthy.** ProjectFlow opens by default; ProjectFlow, Voclaria, MarianTBI Connect, and BrightMinds update the selected case study through touch, click, and keyboard controls.
6. **Galleries and branded overviews — Healthy with documented content limits.** ProjectFlow has dashboard and Kanban captures; BrightMinds has Home, Login, and Role Selection in that order. Voclaria and MarianTBI retain authentic branded overviews and explicitly avoid fabricated screens.
7. **Experience and certifications — Healthy.** Content, hierarchy, and responsive layout passed browser inspection.
8. **Contact form — Healthy, live delivery not exercised.** Empty submission shows three inline errors and focuses Name. Unit tests cover success, rejection, validation, and duplicate-submit protection. No real Formspree message was sent during the audit.
9. **Résumé, footer, and social destinations — Healthy.** The browser downloaded `Earl_Ang_Resume.pdf` successfully; GitHub and X links resolve and include `noopener noreferrer`.

## 3. Project evidence and link verification

| Project | Evidence checked | Public destinations | Result |
|---|---|---|---|
| ProjectFlow | Repository README, documented features, dashboard and Kanban images, React/TypeScript/Express/PostgreSQL architecture | Demo and source | HTTP 200 / verified |
| Voclaria | `final-najud` package and app directories; Expo 53, React Native, TypeScript, Supabase, student and teacher flows | Landing and source branch | HTTP 200 / verified |
| MarianTBI Connect | Public README and source; React, TypeScript, Vite, Tailwind, and Supabase workflows | Source only | HTTP 200 / verified |
| BrightMinds | `Frontend/src/views/Home.vue`, genuine Login/Role Selection captures, FastAPI requirements, and Earl's topic-management commit | Source only | HTTP 200 / verified |

All authored project, profile, résumé, manifest, and crawler URLs returned HTTP 200 on 2026-10-30. No source project was deployed or modified.

## 4. Automated validation

| Check | Result |
|---|---|
| Vitest | **42/42 passed** across 9 files |
| Production build | **Passed** with Vite 8.3.5; 49 modules transformed |
| TypeScript | Not applicable to this JavaScript/Vue portfolio; ProjectFlow/Voclaria source claims were inspected separately |
| npm dependency audit | **0** info, low, moderate, high, or critical vulnerabilities |
| Lockfile consistency | `npm ci --dry-run --ignore-scripts` passed |
| Git whitespace validation | `git diff --check` passed; Git only reported existing LF-to-CRLF conversion notices for two files |
| Browser console | No warnings or errors after the interaction pass |
| Broken images | None at the audited breakpoints |

The build still reports that the 736 KB minified Three.js chunk exceeds Vite's default 500 KB warning threshold. It is dynamically imported and was absent from the final mobile Lighthouse request list, so this is not a release blocker.

## 5. Performance results

Measurements were run against the same local production preview with Lighthouse 13.6.0 and Brave, using three mobile runs and one desktop run.

| Metric | Mobile baseline median | Mobile final median | Desktop final |
|---|---:|---:|---:|
| Performance | 88 | **98** | **100** |
| First Contentful Paint | 1.71 s | **0.76 s** | 0.2 s |
| Largest Contentful Paint | 3.49 s | **2.41 s** | 0.6 s |
| Total Blocking Time | 155 ms | **41 ms** | 0 ms |
| Cumulative Layout Shift | 0 | **0** | 0 |
| Speed Index | 2.8 s | **1.0 s** | 0.3 s |

Final mobile transfer was 758 KiB. The 50.2 KB gzip main JavaScript bundle loaded on mobile; the 186.8 KB gzip Three.js chunk did not. INP requires field interaction data and was not claimed from this lab audit.

## 6. Accessibility and responsive results

- Lighthouse Accessibility: **100 mobile / 100 desktop**.
- Lighthouse Best Practices: **100 mobile / 100 desktop**.
- Lighthouse SEO: **100 mobile / 100 desktop**.
- No horizontal page overflow at 320, 360, 390, 430, 768, 1024, 1440, or 1920 px.
- Mobile controls, project cards, gallery controls, form fields, and navigation have visible focus styling and suitable touch sizes. The hidden Formspree honeypot is intentionally removed from tab order.
- Heading order is one H1 followed by section H2s and component H3/H4 headings.
- Reduced-motion CSS removes nonessential transitions, and the scene strategy returns the static sculpture for reduced-motion, Save-Data, mobile, and constrained-hardware contexts.
- The mobile menu traps Tab/Shift+Tab inside the dialog, closes with Escape, returns focus to its trigger, and restores page scrolling.

Fresh screenshots:

- `outputs/release-readiness/final-mobile-top-390.jpg`
- `outputs/release-readiness/final-mobile-brightminds-390.jpg`
- `outputs/release-readiness/final-desktop-hero-1440.jpg`
- `outputs/release-readiness/final-desktop-projects-overview-1440.jpg`
- `outputs/release-readiness/final-desktop-bookshelf-1440.jpg`
- `outputs/release-readiness/final-390.jpg` (full page)
- `outputs/release-readiness/final-1440.jpg` (full page)

The `outputs/` evidence directory is intentionally ignored and will not enter a future commit.

## 7. SEO and identity

- Title and description identify Earl Ang as a frontend/full-stack web developer.
- Canonical, Open Graph, Twitter, theme-color, favicon, Apple touch icon, and web manifest are present.
- The Twitter card is `summary`, matching the existing 641 × 538 portrait instead of forcing a large 2:1 crop.
- `robots.txt` allows crawling and references `https://earl-portfolio-ten.vercel.app/sitemap.xml`.
- `sitemap.xml` contains the single canonical SPA URL.
- There are no testimonials, client metrics, or unverified professional-experience claims.

## 8. Security findings

- No `.env` files, private keys, certificates, common API-key patterns, or service-role secrets were found outside ignored dependency/build directories.
- No `v-html`, application `innerHTML`, `eval`, or `new Function` use was found. The only `innerHTML` occurrence resets the JSDOM body in test setup.
- The Formspree URL is a public form endpoint, not a secret, and remains unchanged: `https://formspree.io/f/xqpawldp`.
- Contact fields are trimmed and validated, the message is length-limited, a honeypot is present, duplicate submissions are blocked while pending, and server failures are reported without exposing response content.
- All external links opened in a new tab use `rel="noopener noreferrer"`.
- Generated `dist/`, dependencies, QA output, local workflow state, and temporary test artifacts are ignored.

## 9. Remaining limitations

- No real contact message was sent; final Formspree inbox delivery remains a deliberate owner acceptance check.
- Voclaria and MarianTBI have no verified application screenshots in the inspected repositories, so their honest branded overviews remain by design.
- Lighthouse is controlled lab data. Real-user INP and geographic network behavior require production field data after an approved release.
- The desktop Three.js module remains large, although it is code-split and not requested by mobile/reduced-motion fallbacks.
- External service and repository availability can change after this audit.
- Release remains blocked procedurally until Earl gives the explicit commit/push/deploy approval requested in the project brief.

## 10. Exact changed-file inventory

Current tracked modifications:

```text
.gitignore
index.html
package-lock.json
package.json
public/favicon.ico
src/App.vue
src/components/Marquee.vue
src/components/Scene3D.vue
src/index.css
src/main.js
src/pages/About.vue
src/pages/Contact.vue
src/pages/Experience.vue
src/pages/Home.vue
src/pages/Projects.vue
src/pages/Skills.vue
src/pages/portfolio/data.js
vite.config.js
```

Current untracked work (excluding intentionally ignored QA output):

```text
PORTFOLIO-V2-CHECKPOINT.md
PORTFOLIO-V2-MOBILE-QA.md
PORTFOLIO-V2-RELEASE-READINESS.md
design-qa.md
docs/assets/branding/connected-forms-option-03.png
docs/assets/branding/earl-connected-mark.png
docs/superpowers/plans/2026-10-29-portfolio-v2-implementation.md
docs/superpowers/plans/2026-10-29-premium-bookshelf-refinement.md
docs/superpowers/plans/2026-10-30-portfolio-v2-final-refinements.md
docs/superpowers/plans/2026-10-30-portfolio-v2-mobile-optimization.md
docs/superpowers/plans/2026-10-30-portfolio-v2-release-readiness-audit.md
docs/superpowers/specs/2026-10-29-portfolio-v2-design.md
docs/superpowers/specs/2026-10-29-premium-bookshelf-refinement-design.md
docs/superpowers/specs/2026-10-30-portfolio-v2-mobile-optimization-design.md
public/brand/earl-mark-16.png
public/brand/earl-mark-180.png
public/brand/earl-mark-192.png
public/brand/earl-mark-32.png
public/brand/earl-mark-48.png
public/brand/earl-mark-512.png
public/fonts/LICENSE-DM-Mono.txt
public/fonts/LICENSE-Outfit.txt
public/fonts/dm-mono-400-latin.woff2
public/fonts/dm-mono-500-latin.woff2
public/fonts/outfit-latin.woff2
public/hero-sculpture-still.webp
public/projects/brands/projectflow-mark.svg
public/projects/brightminds-home-1280.jpg
public/projects/brightminds-home-800.jpg
public/projects/brightminds-login-1280.jpg
public/projects/brightminds-login-800.jpg
public/projects/brightminds-roles-1280.jpg
public/projects/brightminds-roles-800.jpg
public/projects/projectflow-dashboard-1280.jpg
public/projects/projectflow-dashboard-800.jpg
public/projects/projectflow-kanban-1280.jpg
public/projects/projectflow-kanban-800.jpg
public/robots.txt
public/site.webmanifest
public/sitemap.xml
scripts/create-hero-still.py
scripts/extract-connected-mark.py
src/App.test.js
src/components/ProjectBookshelf.vue
src/components/ProjectShowcase.vue
src/components/Scene3D.test.js
src/components/scene-strategy.js
src/metadata.test.js
src/pages/About.test.js
src/pages/Contact.test.js
src/pages/Projects.test.js
src/pages/portfolio/contact-validation.js
src/pages/portfolio/contact-validation.test.js
src/pages/portfolio/data.test.js
src/pages/portfolio/project-links.js
src/pages/portfolio/project-links.test.js
src/test/setup.js
vitest.config.js
```

## 11. Current Git and preview status

- Branch: `feature/portfolio-v2-redesign`
- Working tree: dirty by design; all Portfolio V2 changes remain local and uncommitted.
- Remote: `origin https://github.com/Yukiiii2/earl-portfolio.git`
- Development review URL: `http://127.0.0.1:5173/`
- Production-mode validation URL: `http://127.0.0.1:4175/`
- No commit, push, merge, pull request, or deployment was performed.

## 12. Release recommendation

**READY WITH LIMITATIONS.** There are no unresolved technical release blockers in the audited local implementation. The remaining limitations are transparent content/field-measurement constraints and the required owner approval gate. Do not release until the local review is approved.
