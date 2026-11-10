# Portfolio V2 Premium Animation Restoration Design

## Goal

Restore a refined sense of motion to the approved Portfolio V2 design without regressing the mobile rendering, accessibility, or performance work.

## Approved approach

Use a small native motion layer built from Vue directives, CSS transforms and opacity, and one shared `IntersectionObserver`. Do not restore AOS or add another animation dependency.

## Motion system

- Content is visible by default. The reveal directive may place an element in a pending state only after Vue has mounted successfully.
- If `IntersectionObserver` is unavailable, initialization throws, or reduced motion is requested, the element becomes visible immediately.
- Reveals run once, then the observer stops tracking the element.
- Motion uses opacity and transforms only, with short delays and restrained easing.
- Hero copy receives a staggered initial entrance. The desktop sculpture keeps its existing Three.js loop; the mobile/static sculpture receives one CSS entrance and no continuous motion.
- Section reveals cover About, Skills, Projects, Experience, Certifications, and Contact with small group staggers.
- Project selection and gallery media use short Vue transitions. Existing selection, keyboard, screen-reader, and touch behavior stays unchanged.
- Hover and pressed feedback remains subtle and never replaces visible focus styling.

## Accessibility and failure behavior

- `prefers-reduced-motion: reduce` removes entrance motion, smooth scrolling, and decorative transitions.
- No content depends on an animation completing to become usable.
- Focus targets do not move when focused, and all current labels and semantics remain intact.
- The mobile fallback does not import or initialize Three.js.

## Performance constraints

- No new runtime dependency.
- One observer instance, once-only reveals, and GPU-friendly properties only.
- No scroll listeners for reveals.
- Preserve the existing scene visibility pause, pixel-ratio cap, and mobile/static strategy.

## Verification

- Unit-test reveal success, fallback, reduced-motion behavior, and cleanup.
- Keep the existing project, scene strategy, navigation, and content tests green.
- Verify desktop and mobile motion, project transitions, keyboard behavior, reduced motion, console health, and production build in the browser.
