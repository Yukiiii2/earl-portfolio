# Earl Ang | Developer Portfolio

A responsive developer portfolio showcasing Earl Ang's projects, experience, skills, and contact information.

## Technology stack

- Vue 3 and Vue Router
- Vite
- Tailwind CSS
- Three.js for the animated Möbius hero
- AOS for scroll animations
- Formspree for contact form submissions

## Features

- Responsive portfolio sections for About, Skills, Featured Projects, Experience, and Certifications
- Animated Three.js Möbius hero sculpture
- Interactive 3D bookshelf with project details and links
- Technology marquee with reduced-motion support
- Contact form submitted to Formspree
- Mobile navigation and responsive layouts

## Prerequisites

- Node.js matching the `package.json` engine requirement: `^22.18.0 || >=24.12.0`
- npm

No environment variables are required for local development.

## Installation

```bash
git clone https://github.com/Yukiiii2/earl-portfolio.git
cd earl-portfolio
npm install
```

## Run locally

```bash
npm run dev
```

Open the local URL printed by Vite in your terminal.

## Production build

Create a production build:

```bash
npm run build
```

Preview the build locally:

```bash
npm run preview
```

## Project structure

- `src/App.vue` — site shell, navigation, and footer
- `src/pages/` — portfolio page sections
- `src/pages/portfolio/data.js` — portfolio content and project data
- `src/components/Scene3D.vue` — Three.js hero sculpture
- `src/components/Marquee.vue` — scrolling technology marquee
- `public/` — static project and avatar images

The contact form uses the public Formspree endpoint configured in `src/pages/Contact.vue`.
