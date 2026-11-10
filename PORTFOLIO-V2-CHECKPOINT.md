# Portfolio V2 — Local Review Checkpoint

Date: 2026-10-29
Status: Ready for personal local review; not committed, pushed, merged, or deployed.

## Repository and approval gate

- Active repository: `C:\Users\EN\Documents\earl-portfolio`
- Preserved backup: `C:\Users\EN\Documents\Codex\2026-10-29\earl-portfolio-v2-complete-redesign-repository\work\earl-portfolio`
- Unmodified sibling project: `C:\Users\EN\Documents\projectflow`
- Git remote: `https://github.com/Yukiiii2/earl-portfolio.git`
- Branch: `feature/portfolio-v2-redesign`
- HEAD and `origin/main`: `977f4289c46cc49cf48eaa51e1b876f2e813f2d9`
- Working tree: intentionally contains all uncommitted Portfolio V2 changes.
- GitHub/Vercel: no commit, push, pull request, merge, deployment, or Vercel setting change was performed.

## Resume verification

- File: `public\Earl_Ang_Resume.pdf`
- Size: 108,112 bytes
- SHA-256: `3C9BD9C085A7029F2D4F7E1067BE9CBE8AA7673D68E774A7E2C9FC115B0A78AB`
- Portfolio path: `/Earl_Ang_Resume.pdf`
- Local preview request: HTTP 200

## What changed

- Established an editorial black/charcoal/warm-red design system with stronger typography, layout rhythm, focus states, and reduced-motion handling.
- Reworked the hero around Earl Ang's developer identity while preserving and refining the Three.js Möbius sculpture. Three.js now loads asynchronously, reducing initial application JavaScript from about 973 kB to 130 kB.
- Preserved both avatar assets and made the alternate portrait available by hover, keyboard, and touch.
- Reorganized verified skills into frontend, full-stack/database, mobile/interface, and delivery tooling.
- Made the enhanced CSS 3D bookshelf the desktop Featured Projects navigator, with ProjectFlow as Volume 01 and an accessible touch-card selector on mobile.
- Refined the bookshelf into a collector's-edition archive with dedicated authentic brand art, thicker book geometry, visible page edges and spines, cover registration details, shelf grain, contact shadows, restrained ambient lighting, and clearer hover/focus/selected states.
- Added the same verified brand identity to the mobile selector while keeping its controls touch-friendly and horizontally scrollable.
- Added a large case-study area with verified descriptions, contributions, stack, valid-only actions, real ProjectFlow dashboard/Kanban captures, and genuine locally captured BrightMinds home/login/role-selection screens.
- Replaced the large screenshot-unavailable treatments with concise branded split overviews: a portrait mobile presentation for the React Native/Expo Voclaria app and a desktop platform presentation for MarianTBI Connect. Both emphasize verified capabilities and contribution context while keeping capture limitations in a subdued source note.
- Preserved and refined experience and certifications without adding unverified professional claims.
- Preserved the exact Formspree endpoint `https://formspree.io/f/xqpawldp` and added inline validation, accessible error focus, loading/success/error states, a message limit, and a honeypot.
- Added SEO/social metadata, canonical URL, theme color, a skip link, mobile-menu focus management, and error-free document semantics.
- Replaced the default Vite/EA text mark with the exact large central symbol pixel-extracted from the supplied `public\connected-forms-option-03.png` reference. The same transparent master now drives the navigation, mobile navigation, footer, favicon, Apple touch icon, and manifest icons without renaming the Earl Ang portfolio.
- Added Vitest/jsdom coverage for data order, project links, metadata, WebGL fallback, avatar interaction, project selection/gallery behavior, and contact validation/submission state.

## Approved portfolio mark

- Definitive source: `docs\assets\branding\connected-forms-option-03.png` (1,254 × 1,254 px).
- Extraction method: deterministic pixel crop/background removal in `scripts\extract-connected-mark.py`; no generated artwork, redrawing, mirroring, rotation, or vector reinterpretation was used.
- Transparent master: `docs\assets\branding\earl-connected-mark.png` (640 × 640 RGBA).
- Browser variants: 16, 32, 48, 180, 192, and 512 px transparent PNGs plus a multi-size 16/32/48 px `public\favicon.ico`.
- Integration: shared decorative symbol in the main/mobile navigation and footer; `Earl Ang` remains the accessible home label, page title, manifest name, and visible footer identity.
- Dark/light QA: the extracted mark was checked side by side with the supplied reference on near-black and warm-white backgrounds. Its red/off-white ribbons, central diamond, orientation, proportions, folds, and silhouette remain intact.

## Original vs Portfolio V2

| Area | Original | Portfolio V2 |
| --- | --- | --- |
| Hero | Name-led hero with always-bundled Three.js | Editorial positioning, clearer CTAs, refined sculpture, WebGL fallback, deferred Three.js |
| Projects | Small previews and data-field mismatches | Bookshelf-led navigation, ProjectFlow flagship, real large screenshots, truthful case-study copy |
| Mobile | Horizontal 3D books only | Touch-friendly labelled selector and readable project detail |
| Content visibility | AOS could leave offscreen sections invisible | Content renders immediately; motion remains restrained and optional |
| Contact | Native required fields and basic result message | Tested inline validation, focus guidance, state feedback, character limit, honeypot |
| Metadata | `Vite App` title and minimal head | Descriptive title, canonical, Open Graph/Twitter, theme color |
| Performance | ~973 kB main JS | ~130 kB initial JS plus deferred Three.js chunk |

## Premium bookshelf brand provenance

| Volume | Cover artwork used | Verified source |
| --- | --- | --- |
| 01 — ProjectFlow | Purple linked-chain app mark | `C:\Users\EN\Documents\projectflow\public\favicon.svg`, matching `Yukiiii2/projectflow` |
| 02 — Voclaria | Speaksy/Voclaria ribbon mark | `assets/Speaksy.png` in `Yukiiii2/Voclaria` branch `final-najud`; the existing portfolio asset is byte-compatible project artwork |
| 03 — MarianTBI Connect | Magenta/teal MarianTBI project artwork | Existing original-portfolio asset `public\MarianTBI.jpg`; the public `BantawigP/TBI_marian` repository exposes no image assets, so no replacement logo was invented |
| 04 — BrightMinds | Blue graduation-cap mark | Existing authentic portfolio asset `public\BrightMinds.svg`, per the supplied project-branding source of truth |

Brand art is separate from case-study screenshots in the project data model, so changing a gallery image cannot silently change a book cover.

## Case-study media provenance

| Project | Gallery evidence | Result |
| --- | --- | --- |
| ProjectFlow | Existing verified dashboard and Kanban captures from the deployed demo | Two responsive 800/1280 JPEG views |
| Voclaria | React Native/Expo source contains authentic branding and application code, but no committed interface captures; no Android/iOS emulator is available locally | Compact portrait mobile overview using `public\Speaksy.png`, verified features, and a secondary source note; no interface invented |
| MarianTBI Connect | Public source contains no committed screenshots and its checked-out Vite frontend lacks the entry document required to start | Compact desktop platform overview using `public\MarianTBI.jpg`, verified features, and a secondary source note; no interface invented |
| BrightMinds | `Frontend/src/views/Home.vue` contains a genuine landing page and the `/home` route was built and run from an isolated local copy without publishing it | Genuine home, login, and role-selection screens, optimized to 800/1280 JPEGs |

## Automated checks

- `npm test`: 9 files, 31 tests passed.
- `npm run build`: passed with Vite 8.3.5.
- Production output: 136.14 kB initial application JavaScript (49.94 kB gzip), 64.35 kB CSS (13.97 kB gzip), plus the deferred 736.43 kB Three.js module (186.84 kB gzip).
- `npm audit --audit-level=high`: 0 vulnerabilities.
- `git diff --check`: passed (only Windows line-ending notices remain).
- Fresh browser console at local preview: no warnings or errors. Two stale Vite HMR connection messages in the original tab were caused by deliberately restarting the stopped preview server; a clean tab confirmed they are not application errors.

## Browser QA

Checked in the in-app Chromium browser at:

- 1920 × 1080
- 1440 × 1000
- 1024 × 900
- 768 × 900
- 390 × 844
- 320 × 568

At all six widths: no horizontal overflow, the H1 remained visible, ProjectFlow imagery stayed readable, desktop navigation/bookshelf switched to mobile navigation/touch selector at the expected breakpoint, and persistent controls remained accessible.

Interactions verified:

- Mobile menu open/close and Escape behavior
- Keyboard focus order through brand, menu, CTAs, résumé, avatar, and project selectors
- Avatar alternate-image switch
- All four desktop book selections and all four mobile touch selections update the matching case study and preserve exactly one selected volume
- Desktop Enter-key selection and visible native-button semantics
- Dashboard/Kanban gallery update
- Voclaria's portrait mobile overview, MarianTBI's desktop platform overview, and all three BrightMinds gallery tabs
- Valid-only project actions
- Contact validation without sending a real message
- Résumé URL, six project/source destinations, all four authentic brand assets, and every referenced project screenshot returned HTTP 200

## Known limitations / follow-up polish

- The deferred Three.js module remains 736 kB minified (187 kB gzip), so Vite reports a large-chunk warning. It no longer blocks the initial application bundle.
- The deployed ProjectFlow app exposes reusable real dashboard and Kanban captures; no reusable landing-page screenshot was available, so no third interface image was fabricated.
- Voclaria is correctly represented as a React Native/Expo mobile app. Its source has no committed interface screenshots, and this machine has no Android/iOS emulator, so the case study uses an explicit branded overview rather than a fabricated screen.
- MarianTBI's public repository has no committed screenshots and its checked-out Vite app lacks an entry document. The case study uses a verified platform overview and labels the artwork as project identity rather than an application screenshot.
- Formspree success behavior is covered with a mocked response and the real endpoint remains unchanged; no unnecessary real message was sent.
- The social preview currently uses the verified avatar. A dedicated 1200 × 630 preview image would be optional future polish.
- BrightMinds screenshots were produced from an isolated local build of its public source; no hosting or source-repository changes were made. The isolated source checkout reports existing dependency advisories, but those dependencies are not installed in or shipped with this portfolio.
- Final logo and refinement review captures are stored outside the repository under `C:\Users\EN\Documents\Codex\2026-10-29\earl-portfolio-v2-complete-redesign-repository\outputs`: full desktop, mobile BrightMinds, tablet gallery, Voclaria desktop/mobile, MarianTBI desktop, BrightMinds desktop, and the Option 03 comparison evidence. They are review evidence only and are not part of the production build.

## Local preview

The review server is running at:

`http://127.0.0.1:5173/`

If it stops, restart it from PowerShell:

```powershell
cd C:\Users\EN\Documents\earl-portfolio
npm run dev -- --host 127.0.0.1
```

Then open `http://127.0.0.1:5173/`.

## Approval checkpoint

Please inspect every section, the sculpture, project selectors, screenshots, links, résumé, responsive layouts, and contact validation locally. No changes will be committed or published unless the exact approval phrase is provided:

`Approved. Commit, push, and deploy Portfolio V2.`
