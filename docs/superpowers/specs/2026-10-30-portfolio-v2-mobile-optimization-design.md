# Portfolio V2 Mobile Optimization Design

## Intent

Make the existing Portfolio V2 feel deliberate and fast on phones without changing its approved editorial identity or removing the desktop Three.js sculpture and 3D bookshelf.

## Goals

- Preserve the black, charcoal, off-white, and warm-red design system.
- Keep the interactive Three.js sculpture and collector bookshelf on capable desktop layouts.
- Give 320–430 px viewports readable type, comfortable controls, reliable navigation, and a stable project gallery.
- Reduce initial mobile transfer and rendering work using measured evidence.
- Resolve verified accessibility, SEO, and responsive defects.
- Produce repeatable before/after browser evidence and a local QA report.

## Non-goals and anti-goals

- No page rebuild, framework migration, new visual direction, or replacement of the bookshelf.
- No fabricated project media, new public deployments, paid services, or source-project changes.
- No benchmark-only removal of meaningful content.
- No commit, push, merge, pull request, or deployment before Earl's approval.

## Measured baseline

- Mobile Lighthouse: Performance 68, Accessibility 97, Best Practices 100, SEO 92; FCP 3.2 s, LCP 6.8 s, TBT 0 ms, CLS 0, 1,204 KiB transferred.
- Desktop Lighthouse: Performance 97, Accessibility 97, Best Practices 100, SEO 92; FCP 0.6 s, LCP 1.2 s, TBT 0 ms, CLS 0.001.
- The mobile LCP is the hero headline. Three.js is still imported and rendered at every phone width, with approximately 99 KiB of unused JavaScript identified by Lighthouse.
- The 640 px navigation logo source transfers 307 KiB to render at 48 px even though an approved 48 px variant already exists.
- At 320 px, `body { min-width: 320px }` extends under the browser scrollbar.
- Lighthouse identified insufficient contrast on the primary hero/contact buttons and accessible-name mismatches on project/gallery selectors.
- No valid `/robots.txt` exists, so the SPA fallback is interpreted as malformed robots content.

## Approaches considered

1. Keep Three.js active on every device and only reduce geometry. This preserves interaction but retains the large mobile module transfer and continuous animation work.
2. Use a faithful still on every phone and on reduced-motion/low-power contexts while retaining the interactive scene at tablet/desktop widths. This is the selected approach because it removes unnecessary mobile work predictably and preserves the established desktop experience.
3. Attempt capability scoring and keep mobile 3D on high-end phones. This is more complex, creates inconsistent behavior at the same viewport, and still pays the module cost on many phones.

## Design decisions

- Use a still captured from the actual existing WebGL sculpture, not generated or approximated artwork.
- Select static rendering at 767 px and below, when reduced motion or Save-Data is enabled, or when desktop hardware signals are clearly constrained.
- Keep the mobile project selector horizontal and touch-friendly; improve snap, accessible names, and gallery density without changing project order or content.
- Turn the mobile menu into a full-height navigation layer with safe-area padding, background isolation, Escape support, and a contained Tab loop.
- Use the approved 48 px Connected Forms mark for navigation/footer instead of transferring the 640 px source.
- Defer below-fold avatar and project-brand media, preserve intrinsic dimensions, and retain genuine screenshots.
- Use `font-display: optional` for the existing Google Fonts request to avoid holding the mobile text LCP on a slow connection.

## Verification

- Unit tests cover adaptive hero strategy, menu focus containment, selector accessible names, and lazy media behavior.
- Browser QA covers 320, 360, 375, 390, 414, 430, 768, 1024, 1440, and 1920 px.
- Lighthouse mobile and desktop runs use the same production build, Brave binary, and Lighthouse 13.0.1 before and after.
- No real Formspree submission is sent; validation is tested locally.
