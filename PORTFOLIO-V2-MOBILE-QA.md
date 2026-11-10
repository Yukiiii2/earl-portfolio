# Portfolio V2 — Mobile UX and Performance QA

Date: 2026-10-30 (Asia/Taipei)
Repository: `C:\Users\EN\Documents\earl-portfolio`
Branch: `feature/portfolio-v2-redesign`
Remote: `https://github.com/Yukiiii2/earl-portfolio.git`
Local review URL: `http://127.0.0.1:5173/`

## Review status

Portfolio V2 remains local and uncommitted. No push, merge, pull request, Vercel change, or deployment was performed. The existing live site was not modified.

The Vite development server is running at `http://127.0.0.1:5173/`. If it stops, restart it with:

```powershell
Set-Location C:\Users\EN\Documents\earl-portfolio
npm run dev -- --host 127.0.0.1
```

## Original issues

- The 320 px layout retained a 320 px body minimum inside a viewport reduced by its scrollbar, causing content to extend beneath the scrollbar.
- Phones downloaded and initialized the desktop Three.js scene despite receiving no meaningful mobile-specific benefit.
- The 640 px brand source transferred about 307 KiB even when displayed at 48 px.
- Small-phone CTAs wrapped tightly and some header/footer/resume targets were below the preferred 44 px touch size.
- The mobile menu lacked focus containment and locked only the body, not the document root.
- Project and gallery `aria-label` values did not include all visible label text.
- Several below-fold images lacked lazy loading or intrinsic dimensions.
- Lighthouse identified insufficient contrast on the two warm-red primary actions.
- The SPA fallback was returned for `/robots.txt`, which Lighthouse treated as invalid crawl instructions.

## Changes implemented

- Removed the body minimum-width constraint and verified zero document overflow at all requested widths.
- Added a tested scene strategy that selects a faithful 18 KiB WebP still for widths up to 767 px, reduced-motion, Save-Data, and constrained devices before importing `three`.
- Preserved the original live Three.js sculpture on capable tablet and desktop contexts.
- Replaced the navigation's oversized 640 px source with the approved 48 px Connected Forms mark.
- Refined 320–430 px hero sizing, CTA layout, reading width, and touch targets without changing the established design.
- Added a safe-area-aware, full-height mobile menu with Escape handling, Tab/Shift+Tab containment, navigation-close behavior, scroll-lock cleanup, and focus return.
- Added touch-friendly project/gallery snap scrolling, visible-label-inclusive accessible names, compact 16:10 mobile galleries, lazy decoding, and intrinsic image sizing.
- Added lazy, intrinsically sized About portraits while preserving the avatar switch interaction.
- Changed the primary warm red to `#c23d36` (5.23:1 with white; 4.60:1 with off-white) with a darker hover state.
- Changed Google Fonts to `display=optional` and added a real `public/robots.txt`.
- Kept Formspree endpoint `https://formspree.io/f/xqpawldp` unchanged.

## Three.js strategy evidence

| Context | Render state | Canvas | Still | Three.js transfer |
| --- | --- | --- | --- | --- |
| 390 px mobile | `static` | No | `/hero-sculpture-still.webp` | 0 KiB |
| 1440 px desktop | `ready` | Yes | No | 181.4 KiB |
| Reduced motion | Static by unit-tested strategy | No | Yes | Avoided before import |

The mobile fallback was extracted from the real existing sculpture, not generated or redesigned. Browser console inspection returned no warnings or errors.

## Lighthouse comparison

Lighthouse 13 ran against the production build on `http://127.0.0.1:4175/` using local Brave/Chromium. The optimized mobile result is the median of three final runs; score range was 85–87.

| Mobile metric | Baseline | Optimized |
| --- | ---: | ---: |
| Performance | 68 | **85 median** |
| Accessibility | 97 | **100** |
| Best Practices | 100 | **100** |
| SEO | 92 | **100** |
| FCP | 3.2 s | **3.1 s** |
| LCP | 6.8 s | **3.5 s** |
| Speed Index | 4.6 s | **3.1 s** |
| TBT | 0 ms | 41 ms median |
| CLS | 0 | **0** |
| Main-thread work | 2.9 s | **0.68 s** |
| JavaScript transferred | 230.1 KiB | **49.1 KiB** |
| Three.js transferred | 181.4 KiB | **0 KiB** |
| Total transfer | 1,204 KiB | **746 KiB** |

| Desktop metric | Baseline | Optimized |
| --- | ---: | ---: |
| Performance | 97 | **99** |
| Accessibility | 97 | **100** |
| Best Practices | 100 | **100** |
| SEO | 92 | **100** |
| FCP | 0.6 s | 0.6 s |
| LCP | 1.2 s | **0.9 s** |
| TBT | 0 ms | 30 ms |
| CLS | 0.001 | **0** |
| JavaScript transferred | 230.1 KiB | 230.5 KiB |
| Total transfer | 1,256 KiB | **979 KiB** |

The desktop Three.js payload remains intentionally available because the original interactive sculpture is preserved. It is dynamically isolated from the mobile initial path.

## Responsive browser QA

Full-page and viewport screenshots were captured at every requested width. `scrollWidth - clientWidth` was 0 at each breakpoint.

| Width | Hero strategy | Layout / interaction result |
| ---: | --- | --- |
| 320 | Static | Pass; stacked full-width 52 px CTAs, no clipping or overflow |
| 360 | Static | Pass; stacked full-width 52 px CTAs, readable heading and copy |
| 375 | Static | Pass; stable image sizing and project selector |
| 390 | Static | Pass; stacked CTAs plus menu, project, gallery, form, and avatar testing |
| 414 | Static | Pass; balanced two-column CTAs and stable full page |
| 430 | Static | Pass; no overlap, clipping, or horizontal page scroll |
| 768 | Live Three.js | Pass; desktop bookshelf retained and responsive |
| 1024 | Live Three.js | Pass; complete desktop layout and bookshelf visible |
| 1440 | Live Three.js | Pass; complete desktop layout and case study verified |
| 1920 | Live Three.js | Pass; centered max-width layout remains intentional |

### Interaction findings

1. **Hero and header — healthy.** Correct Connected Forms branding and favicon assets are present; mobile CTAs and resume link meet the 44 px target; desktop retains the interactive sculpture.
2. **Navigation — healthy.** The mobile dialog locks both root and body scrolling, moves focus to the first link on Tab, closes on Escape or selection, returns focus, and scrolls to the correct section. Sticky navigation remains visible without covering the target content.
3. **About and Skills — healthy.** The avatar switches to the alternate image and exposes pressed state; lazy portrait dimensions prevent layout movement; skill rows remain readable at 320 px.
4. **Featured Projects — healthy.** Volume order and authentic branding remain intact. Touch and keyboard selection update the correct case study. ProjectFlow switches between verified Dashboard and Kanban images; Voclaria and MarianTBI retain their truthful branded overviews; BrightMinds switches through Home, Login, and Role Selection captures.
5. **Experience, Certifications, Contact, and Footer — healthy.** Content remains aligned at every width. Empty contact submission shows three inline errors, marks the fields invalid, focuses Name, and does not call Formspree. Resume returned HTTP 200 as a 108,112-byte PDF. Footer targets meet the mobile minimum.
6. **Accessibility and motion — healthy in automated and browser checks.** Lighthouse Accessibility scored 100; landmarks, labels, focus indicators, selected states, intrinsic media sizes, contrast, and reduced-motion source behavior were verified.

## Automated and functional checks

- `npm test -- --run`: **9 test files, 40 tests passed**.
- `npm run build`: **passed** with Vite 8.3.5.
- Production output: app JS 137.15 KiB minified / 50.32 KiB gzip; Three.js 736.43 KiB minified / 186.84 KiB gzip (desktop-only dynamic path on mobile).
- `npm audit --audit-level=high`: **0 vulnerabilities**.
- `git diff --check`: **passed**; only pre-existing line-ending notices were printed.
- TypeScript check: not applicable; this portfolio is JavaScript/Vue and defines no TypeScript check script.
- Local `/`, `/robots.txt`, `/Earl_Ang_Resume.pdf`, and `/hero-sculpture-still.webp`: **HTTP 200**.
- ProjectFlow demo and all visible GitHub/source destinations: **HTTP 200 on 2026-10-30**.
- Console warnings/errors during scene and interaction QA: **none**.

## Evidence files

All evidence is outside the repository so it does not add portfolio payload:

```text
C:\Users\EN\Documents\Codex\2026-10-29\earl-portfolio-v2-complete-redesign-repository\outputs\mobile-qa
```

Key files:

- `before-390-top.png` / `after-390-top.png`
- `before-390-menu-open.png` / `after-390-menu-open.png`
- `after-320-full.png`, `after-360-full.png`, `after-375-full.png`, `after-390-full.png`, `after-414-full.png`, `after-430-full.png`
- `after-768-full.png`, `after-1024-full.png`, `after-1440-full.png`, `after-1920-full.png`
- `after-390-project-projectflow.png`, `after-390-project-voclaria.png`, `after-390-project-mariantbi-connect.png`, `after-390-project-brightminds.png`
- `before-lighthouse-mobile.json`, `after-lighthouse-mobile.json`, `after-lighthouse-mobile-run2.json`, `after-lighthouse-mobile-run3.json`
- `before-lighthouse-desktop.json`, `after-lighthouse-desktop.json`
- `after-layout-metrics.json`, `after-project-states.json`

## Remaining limitations

- INP is not produced as a meaningful lab metric without real user field data. TBT and direct interaction checks are reported instead; no INP value is invented.
- The desktop Three.js chunk still triggers Vite's 500 KiB chunk-size warning. It is preserved by design and is not requested on the mobile path.
- Google Fonts remain an external optional enhancement; system fallbacks render immediately if the font request is slow or unavailable.
- No real Formspree message was sent. Validation and mocked success/error paths are covered by tests.
- Browser QA used responsive Brave/Chromium viewports. A final physical-device pass on iOS Safari and Android Chrome is still advisable before publication.
- Voclaria and MarianTBI continue to use clearly identified branded overviews because verified application captures are unavailable; no interfaces were fabricated.

## Git status

The branch remains `feature/portfolio-v2-redesign` with the expected uncommitted Portfolio V2 files and mobile-optimization changes. No files were reset, cleaned, committed, pushed, merged, or deployed.
