# Portfolio V2 Design QA

## Evidence

- Source visual truth: `C:\Users\EN\.codex\generated_images\01a18622-c769-7a40-af8b-8471bc58cadf\exec-0e435d70-9c77-4964-978e-4f9b6533f6b0.png` (829 × 1898 px), interpreted as an art-direction reference rather than a literal wireframe. The approved hybrid specification in `docs\superpowers\specs\2026-10-29-portfolio-v2-design.md` is the content and interaction source of truth.
- Implementation: `http://127.0.0.1:5173/`, captured in the ChatGPT in-app browser at 1440 × 1000 CSS px and 390 × 844 CSS px. Full-page browser captures measured 1425 × 6219 px and 375 × 6682 px after the browser scrollbar.
- Same-input comparison: `C:\Users\EN\Documents\Codex\2026-10-29\earl-portfolio-v2-complete-redesign-repository\work\design-qa-comparison\index.html` placed the source hero and live 1440 × 1000 implementation hero in one browser-rendered comparison board. The browser screenshot provider displayed the evidence inline but does not expose a persistent local screenshot path.
- Density normalization: browser device scale factor was the in-app browser default (1 CSS px comparison). The source was scaled proportionally and top-cropped only for the focused hero comparison; no pixel-precise claim is made because the source is a conceptual full-page direction.
- State: dark theme, ProjectFlow selected, dashboard screenshot active, no authenticated state, no form submission.

## Full-view comparison

The implementation preserves the source direction's black editorial field, warm-red accent, EA. masthead, strong display typography, sculpture-led hero, ruled sections, compact mono labels, and large ProjectFlow product imagery. It intentionally adds the approved About, skills, 3D bookshelf, experience, certifications, and contact sections. The desktop and mobile full-page captures show a consistent hierarchy without horizontal overflow or clipped persistent controls.

## Focused comparison

The combined hero board was used because typography, sculpture framing, CTA proportions, navigation, and above-the-fold balance are the details most dependent on the source image. The project area received a separate browser inspection because the approved hybrid replaced the concept's card grid with the user's existing bookshelf; the real ProjectFlow dashboard and Kanban captures were inspected at readable desktop and mobile sizes.

## Required fidelity surfaces

- Fonts and typography: Outfit remains the expressive display/body family; DM Mono distinguishes indices and technical labels. Weight, wrapping, line height, and scale remain legible from 320 to 1920 px. The final headline differs from the concept intentionally to make Earl's positioning action-oriented.
- Spacing and layout rhythm: 76rem content width, ruled section boundaries, asymmetrical grids, and restrained square controls preserve the editorial direction. Section gaps were tightened after the first mobile/desktop capture.
- Colors and tokens: near-black, charcoal, warm white, muted gray, and warm red map directly to the approved palette. Project-specific accents are limited to selection and case-study context.
- Image quality: existing avatar assets are preserved. ProjectFlow uses real optimized 800/1280 JPEG captures with responsive `srcset`; BrightMinds uses genuine locally captured 800/1280 JPEG screens. Voclaria and MarianTBI use explicitly labelled unavailable states rather than enlarged logos presented as screenshots or fabricated interfaces.
- Copy and content: claims are limited to repository-verified work, education, practicum, and certifications. MarianTBI explicitly avoids an unverifiable personal-contribution claim. Placeholder destinations are omitted.
- Interaction and accessibility: visible focus styles, semantic buttons, keyboard/touch selection, Escape-close navigation, alt text, reduced-motion CSS, WebGL fallback, and inline form errors were verified.

## Findings and comparison history

### Pass 1

- [P2] Mobile sculpture caption clipped near the right edge.
  - Fix: constrained the mobile art to 100% width and inset its caption in `Home.vue`.
- [P2] Section transitions felt too sparse on mobile and desktop.
  - Fix: tightened Skills and Projects vertical padding while retaining editorial breathing room.
- [P2] Project controls exposed `listitem` roles instead of their native button role.
  - Fix: changed the wrappers to labelled groups and restored native button semantics in `ProjectBookshelf.vue`.

### Pass 2

The 390 px and 768 px captures showed the sculpture caption inside the viewport, tighter section rhythm, and no overlap or horizontal overflow. Browser role queries reached the mobile menu, avatar, project selectors, gallery controls, and form. No actionable P0/P1/P2 differences remained.

### Pass 3 — Premium bookshelf refinement

- Replaced gallery-image-derived cover art with a dedicated, source-traceable brand contract for all four volumes.
- Preserved the CSS 3D implementation and refined page depth, spines, cover perspective, shelf material, contact shadows, cover borders, and restrained accent lighting.
- Kept logo planes nearly front-facing so ProjectFlow, Voclaria, MarianTBI, and BrightMinds remain legible at 768 px and above.
- Added the verified marks to the touch selector below 640 px with 96 px minimum card height, visible selected state, native buttons, and horizontal scroll snapping.
- Connected every selector to the labelled `#project-case-study` region and corrected the live-demo action's primary-style discriminator.
- Verified one selected volume at a time, all four desktop case-study destinations, all four mobile touch selections, Enter-key selection, gallery reset, and valid-only actions.
- Measured no horizontal page overflow at 1920, 1440, 1024, 768, 390, or 320 CSS px. Browser console output remained free of warnings and errors.

Final bookshelf screenshots were displayed inline at 1440 × 1000, 768 × 900, 390 × 844, and 320 × 568. The browser screenshot provider does not provide a persistent local file path.

### Pass 4 — Authentic gallery correction

- Restored the supplied authentic `public\BrightMinds.svg` cover mark and kept `public\Speaksy.png` and `public\MarianTBI.jpg` unchanged.
- Verified Voclaria as React Native/Expo/TypeScript/Supabase and replaced its logo-only gallery with a portrait mobile fallback that explicitly says why a genuine capture is unavailable.
- Verified that no Android or iOS emulator is available in the local review environment; no desktop representation of Voclaria was introduced.
- Verified MarianTBI's public checkout contains no screenshots and lacks the Vite entry document needed to start; its fallback identifies that limitation without inventing an interface.
- Ran BrightMinds locally and captured its genuine login and role-selection screens without modifying or publishing the project.
- Verified all four desktop selections, the mobile selector and Voclaria fallback, two BrightMinds gallery tabs, no page-level overflow at 768/390/320 px, and a clean browser console.

### Pass 5 — Exact Option 03 portfolio mark

- Inspected `docs\assets\branding\connected-forms-option-03.png` directly at its original 1,254 × 1,254 resolution before implementation.
- Pixel-extracted only the large central symbol, excluding the presentation-board background, divider, lower icon examples, and label. No generative image tool, replacement symbol, vector redraw, rotation, mirror, or simplification was used.
- Preserved the red/off-white interlocking ribbons, fold shading, central diamond, silhouette, orientation, and source proportions in a transparent 640 px master.
- Integrated the same master into desktop/mobile navigation and footer while keeping the accessible and visible identity as Earl Ang.
- Derived and verified 16, 32, 48, 180, 192, and 512 px PNGs and a 16/32/48 px ICO. All icon, manifest, and master URLs returned HTTP 200.
- Compared the source and extraction side by side on dark and light backgrounds, then captured the desktop header, open mobile navigation, and mobile footer. At 390 px the page had no horizontal overflow and both shared brand images remained approximately 35–37 px square.
- A clean browser tab reported no warnings or errors after the preview server restart.

### Pass 6 — Final galleries and whole-site QA

- Verified `lnxexu/BrightMinds/Frontend/src/views/Home.vue` contains a real landing page and `/home` route, then built an isolated local copy and captured the production-rendered page without changing or publishing the source repository.
- Added the accepted landing capture ahead of the existing genuine login and role-selection screens; verified all three gallery controls update the correct image and accessible description.
- Replaced Voclaria and MarianTBI Connect's dominant capture-unavailable panels with balanced project overviews using the supplied authentic identities, verified feature lists, contribution context, and a small source-evidence note. Artwork is labelled as project identity rather than a screenshot.
- Preserved Voclaria's portrait phone treatment and MarianTBI Connect's desktop platform treatment. Both stack cleanly on mobile, and the evidence notes remain visually secondary.
- Rechecked navigation, hero sculpture, avatar click/keyboard state, skills, all four project selectors, ProjectFlow/BrightMinds galleries, experience, certifications, contact validation, résumé, footer, and the shared Option 03 identity.
- Browser checks at 1920 × 1080, 1440 × 1000, 1024 × 900, 768 × 900, 390 × 844, and 320 × 568 showed no content beyond the viewport, one H1/main landmark, usable mobile controls, eight reduced-motion media rules, and a clean console.
- Saved and inspected the final desktop and mobile captures plus focused project evidence in the local review output folder.

## Open questions

- None blocking. The source concept is an art-direction reference; the bookshelf and expanded portfolio sections are intentional approved deviations.

## Follow-up polish

- [P3] A dedicated 1200 × 630 social preview image would improve link unfurls beyond the current verified avatar fallback.
- [P3] The dynamically loaded Three.js chunk is 736 kB minified (187 kB gzip). Initial application JavaScript is only 130 kB, but a future sculpture-specific build could reduce the deferred chunk further.
- [P3] ProjectFlow exposes two reusable real product captures (dashboard and Kanban); no reusable landing-page screenshot was available, so no third image was fabricated.
- [P3] Genuine application screenshots remain unavailable for Voclaria and MarianTBI; both limitations are documented in secondary source notes rather than concealed with fabricated screens.

## Final result

passed
