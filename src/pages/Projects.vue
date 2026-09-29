<script setup>
import { ref } from 'vue'
import { DATA } from './portfolio/data.js'

const selectedProject = ref(DATA.projects[0])

const volumeNumber = (project) => {
  const index = DATA.projects.findIndex((item) => item.title === project.title)
  return index < 0 ? '' : String(index + 1).padStart(2, '0')
}

const updateSpotlight = (event) => {
  const bounds = event.currentTarget.getBoundingClientRect()
  event.currentTarget.style.setProperty('--spot-x', `${event.clientX - bounds.left}px`)
  event.currentTarget.style.setProperty('--spot-y', `${event.clientY - bounds.top}px`)
}
</script>

<template>
  <section class="projects-section max-w-5xl mx-auto px-6 py-12" aria-labelledby="projects-heading">
    <div class="section-heading" data-aos="fade-up">
      <p class="section-kicker">Selected work</p>
      <h2 id="projects-heading">Featured Projects</h2>
      <p class="section-instruction">Select a volume to explore the project.</p>
    </div>

    <div
      class="bookshelf spotlight"
      data-aos="fade-up"
      data-aos-delay="100"
      role="group"
      aria-labelledby="projects-heading"
      @pointermove="updateSpotlight"
    >
      <div class="book-row" role="group" aria-label="Select a featured project">
        <button
          v-for="(project, index) in DATA.projects"
          :key="project.title"
          type="button"
          class="project-book"
          :class="{ 'project-book--selected': selectedProject.title === project.title }"
          :style="{
            '--book-depth': `${0.48 + (index % 4) * 0.035}rem`,
            '--book-angle': `${index % 2 ? -12 : -15}deg`,
            '--book-lean': `${index % 2 ? 0.7 : -0.7}deg`,
            '--cover-color': project.coverColor || '#312523',
            '--project-accent': project.accentColor || '#d47770',
          }"
          :aria-pressed="selectedProject.title === project.title"
          :aria-label="`Show project: ${project.title}`"
          @click="selectedProject = project"
        >
          <span class="book-object">
            <span class="book-back" aria-hidden="true"></span>
            <span class="book-pages" aria-hidden="true"></span>
            <span class="book-spine" aria-hidden="true"><span>{{ project.title }}</span></span>
            <span class="book-front">
              <span class="cover-topline">
                <span class="book-number">VOL. {{ volumeNumber(project) }}</span>
                <span v-if="selectedProject.title === project.title" class="book-selected">SELECTED</span>
              </span>
              <span class="book-category">{{ project.category || project.tags?.[0] || 'PROJECT' }}</span>
              <span class="book-artwell">
                <img v-if="project.image" :src="project.image" :alt="''" class="book-artwork" />
                <span v-else class="book-artwork-placeholder">{{ project.title }}</span>
              </span>
              <span class="cover-rule" aria-hidden="true"><span></span></span>
              <span class="book-title">{{ project.title }}</span>
              <span class="cover-ornament" aria-hidden="true"></span>
            </span>
          </span>
        </button>
      </div>
      <div class="shelf-plank" aria-hidden="true"><span></span></div>
      <p class="shelf-caption" aria-hidden="true">PROJECTS / SELECTED WORK</p>
    </div>

    <article
      v-if="selectedProject"
      class="project-detail"
      :style="{ '--project-accent': selectedProject.accentColor || '#d47770' }"
      aria-live="polite"
    >
      <div class="detail-image">
        <img v-if="selectedProject.image" :src="selectedProject.image" :alt="selectedProject.title" />
        <span v-else class="detail-image-placeholder">{{ selectedProject.title }}</span>
      </div>

      <div class="detail-copy">
        <p class="detail-label">
          <span>CURRENT VOLUME / {{ volumeNumber(selectedProject) || '—' }}</span>
          <span class="detail-category">{{ selectedProject.category || selectedProject.tags?.[0] || 'PROJECT' }}</span>
        </p>
        <h3>{{ selectedProject.title }}</h3>
        <p class="detail-blurb">{{ selectedProject.blurb }}</p>

        <ul class="project-tags" aria-label="Technologies">
          <li v-for="tag in selectedProject.tags" :key="tag">{{ tag }}</li>
        </ul>

        <div class="project-links">
          <a
            v-if="selectedProject.live && selectedProject.live !== '#'"
            :href="selectedProject.live"
            class="project-live"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ selectedProject.liveLabel || 'Live app' }}
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="M6 14 14 6M7 6h7v7" /></svg>
          </a>
          <a
            v-if="selectedProject.github"
            :href="selectedProject.github"
            class="project-code"
            target="_blank"
            rel="noopener noreferrer"
          >
            View code
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="M6 14 14 6M7 6h7v7" /></svg>
          </a>
        </div>
      </div>
    </article>
  </section>
</template>

<style scoped>
.projects-section { padding-top: 4.5rem; padding-bottom: 4rem; }
.section-heading { margin-bottom: 2rem; }
.section-kicker, .detail-label {
  margin: 0 0 0.65rem;
  color: #d47770;
  font-size: 0.66rem;
  font-weight: 650;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}
.section-heading h2 {
  margin: 0;
  padding-bottom: 0.9rem;
  border-bottom: 1px solid #2a2a2a;
  color: #f1eeeb;
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  font-weight: 700;
  letter-spacing: -0.045em;
}
.section-instruction { margin: 0.85rem 0 0; color: #aaa5a1; font-size: 0.9rem; }

.bookshelf {
  --spot-x: 50%;
  --spot-y: 50%;
  position: relative;
  isolation: isolate;
  min-height: 23rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2.2rem clamp(1rem, 5vw, 4rem) 1.1rem;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,.07);
  background: radial-gradient(ellipse at 50% 42%, rgba(128,45,40,.14), transparent 56%), #0c0b0b;
  perspective: 1250px;
}
.bookshelf::after {
  position: absolute;
  z-index: -1;
  inset: 0;
  content: '';
  pointer-events: none;
  background: radial-gradient(280px circle at var(--spot-x) var(--spot-y), rgba(255,91,81,.08), transparent 72%);
}
.book-row {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: clamp(1rem, 3.4vw, 2.6rem);
  padding: 0.8rem 0 0.7rem;
  transform: rotateX(2deg);
  transform-style: preserve-3d;
}
.project-book {
  --book-depth: 0.55rem;
  position: relative;
  width: clamp(6.5rem, 14vw, 9rem);
  height: clamp(13.2rem, 26vw, 16.8rem);
  flex: 0 1 9rem;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  transform: translateZ(0) rotateZ(var(--book-lean)) rotateY(var(--book-angle));
  transform-style: preserve-3d;
  transition: transform 320ms cubic-bezier(.2,.72,.25,1), filter 320ms ease;
}
.book-object { position: absolute; inset: 0; transform-style: preserve-3d; }
.book-back, .book-front { position: absolute; inset: 0; }
.book-back {
  border: 1px solid rgba(255,255,255,.07);
  background: color-mix(in srgb, var(--cover-color) 72%, #090909);
  transform: rotateY(180deg) translateZ(var(--book-depth));
}
.book-pages {
  position: absolute;
  top: 0.42rem;
  left: 100%;
  width: calc(var(--book-depth) * 2);
  height: calc(100% - 0.84rem);
  border-top: 1px solid rgba(255,255,255,.52);
  border-right: 1px solid rgba(255,255,255,.3);
  border-bottom: 1px solid rgba(255,255,255,.24);
  background: linear-gradient(90deg, #d7cbbd, #a99c8f 85%, #887d73);
  box-shadow: inset -0.2rem 0 rgba(81,59,49,.13);
  transform: translateZ(var(--book-depth)) rotateY(90deg);
  transform-origin: left center;
}
.book-spine {
  position: absolute;
  top: 0;
  bottom: 0;
  left: calc(var(--book-depth) * -2);
  width: calc(var(--book-depth) * 2);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--project-accent) 44%, #1b1515);
  background: linear-gradient(90deg, color-mix(in srgb, var(--cover-color) 75%, #080808), var(--cover-color));
  color: rgba(255,239,231,.78);
  transform: translateZ(calc(var(--book-depth) * -1)) rotateY(-90deg);
  transform-origin: right center;
}
.book-spine span { writing-mode: vertical-rl; transform: rotate(180deg); font-size: 0.54rem; font-weight: 650; letter-spacing: 0.08em; white-space: nowrap; }
.book-front {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0.85rem 0.85rem 1rem 1rem;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--project-accent) 42%, rgba(255,255,255,.14));
  background: var(--cover-color);
  box-shadow: inset 1px 0 rgba(255,255,255,.17), inset -1px 0 rgba(0,0,0,.4), inset 0 1px rgba(255,255,255,.09);
  text-align: left;
  transform: translateZ(var(--book-depth));
  transform-style: preserve-3d;
}
.cover-topline { position: relative; z-index: 2; display: flex; align-items: center; justify-content: space-between; gap: 0.35rem; }
.book-number { color: rgba(255,238,231,.82); font-size: 0.56rem; font-weight: 700; letter-spacing: 0.12em; white-space: nowrap; }
.book-selected { color: var(--project-accent); font-size: 0.49rem; font-weight: 700; letter-spacing: 0.08em; }
.book-category { position: relative; z-index: 1; margin-top: 0.58rem; color: color-mix(in srgb, var(--project-accent) 72%, #f3e9e6); font-size: 0.5rem; font-weight: 650; letter-spacing: 0.11em; line-height: 1.3; }
.book-artwell {
  position: relative;
  z-index: 1;
  height: 38%;
  min-height: 3.2rem;
  display: grid;
  place-items: center;
  margin-top: 0.7rem;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--project-accent) 25%, rgba(255,255,255,.08));
  background: color-mix(in srgb, var(--project-accent) 10%, #171515);
}
.book-artwork { display: block; width: 70%; height: 72%; object-fit: contain; }
.book-artwork-placeholder { color: rgba(255,255,255,.75); font-size: 0.6rem; text-align: center; }
.cover-rule { position: relative; z-index: 1; height: 1px; margin-top: 0.75rem; background: rgba(255,255,255,.16); }
.cover-rule span { display: block; width: 28%; height: 1px; background: var(--project-accent); }
.book-title { position: relative; z-index: 1; margin-top: auto; padding-top: 0.65rem; color: #fff4ef; font-size: clamp(0.76rem, 1.2vw, 0.94rem); font-weight: 700; line-height: 1.1; overflow-wrap: anywhere; }
.cover-ornament { position: absolute; right: 0.6rem; bottom: 0.6rem; width: 1rem; height: 1.15rem; border-top: 1px solid color-mix(in srgb, var(--project-accent) 60%, transparent); border-right: 1px solid color-mix(in srgb, var(--project-accent) 60%, transparent); opacity: .45; }
.project-book:hover { z-index: 3; transform: translate3d(0,-0.35rem,0.3rem) rotateZ(calc(var(--book-lean) * .3)) rotateY(-10deg); }
.project-book--selected { z-index: 2; transform: translate3d(0,-0.55rem,0.65rem) rotateZ(0deg) rotateY(-4deg); filter: drop-shadow(0 0.55rem 0.55rem rgba(0,0,0,.34)); }
.project-book--selected .book-front { border-color: color-mix(in srgb, var(--project-accent) 70%, #fff); box-shadow: inset 1px 0 rgba(255,255,255,.24), inset 0 0 0 1px color-mix(in srgb, var(--project-accent) 34%, transparent); }
.project-book:focus-visible { z-index: 4; outline: 2px solid #ff8178; outline-offset: 7px; }
.shelf-plank {
  position: relative;
  z-index: 0;
  height: 0.9rem;
  margin: -0.1rem -2rem 0;
  border-top: 1px solid rgba(235,179,159,.28);
  background: linear-gradient(180deg, #38241f, #171110);
  box-shadow: 0 0.6rem 1.2rem rgba(0,0,0,.35);
  transform: perspective(24rem) rotateX(8deg);
}
.shelf-plank span { position: absolute; inset: auto 0 -0.38rem; height: 0.38rem; background: #120e0d; }
.shelf-caption { align-self: flex-end; margin: 0.7rem 0 0; color: #81746f; font-size: 0.56rem; letter-spacing: 0.15em; }

.project-detail {
  display: grid;
  grid-template-columns: minmax(0, .68fr) minmax(0, 1fr);
  gap: clamp(1.5rem, 4vw, 3.5rem);
  align-items: center;
  margin-top: 1.6rem;
  padding: clamp(1.2rem, 3vw, 2rem) 0 0;
  border-top: 1px solid rgba(255,255,255,.09);
}
.detail-image {
  aspect-ratio: 4 / 3;
  width: min(100%, 19rem);
  display: grid;
  place-items: center;
  padding: 1rem;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--project-accent) 24%, rgba(255,255,255,.08));
  background: color-mix(in srgb, var(--project-accent) 8%, #101010);
}
.detail-image img {
  display: block;
  width: auto;
  height: auto;
  max-width: 82%;
  max-height: 82%;
  object-fit: contain;
  object-position: center;
}
.detail-image-placeholder { color: #aaa5a1; font-size: 1.1rem; }
.detail-copy { min-width: 0; }
.detail-label { display: flex; flex-wrap: wrap; align-items: center; gap: 0.45rem 0.8rem; margin-bottom: 0.8rem; }
.detail-category { color: #b9adaa; }
.detail-copy h3 { margin: 0 0 0.8rem; color: #f1eeeb; font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 700; letter-spacing: -0.04em; }
.detail-blurb { max-width: 36rem; margin: 0; color: #aaa5a1; font-size: 0.95rem; line-height: 1.7; }
.project-tags { display: flex; flex-wrap: wrap; gap: 0.65rem 1rem; margin: 1.2rem 0 1.35rem; padding: 0; list-style: none; }
.project-tags li { color: #d0c8c3; font-size: 0.69rem; letter-spacing: 0.04em; }
.project-tags li + li::before { content: '·'; margin-right: 1rem; color: #e06b63; }
.project-links { display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem; }
.project-links a { min-height: 2.65rem; display: inline-flex; align-items: center; justify-content: center; gap: 0.7rem; padding: 0 0.95rem; font-size: 0.76rem; font-weight: 650; text-decoration: none; transition: color 160ms ease, background 160ms ease, border-color 160ms ease; }
.project-links svg { width: 0.9rem; height: 0.9rem; stroke: currentColor; stroke-width: 1.5; }
.project-live { border: 1px solid var(--project-accent, #d47770); background: color-mix(in srgb, var(--project-accent, #d47770) 18%, #111); color: #fff2ee; }
.project-live:hover { background: color-mix(in srgb, var(--project-accent, #d47770) 30%, #111); }
.project-code { border: 1px solid rgba(255,255,255,.16); color: #d0c8c3; }
.project-code:hover { border-color: rgba(255,255,255,.35); color: #fff; }
.project-links a:focus-visible { outline: 2px solid #ff8178; outline-offset: 4px; }

@media (max-width: 640px) {
  .projects-section { padding-top: 3.5rem; }
  .bookshelf { min-height: 0; padding: 1.7rem 0.8rem 0.9rem; perspective: 1500px; }
  .book-row { width: 100%; justify-content: flex-start; gap: 0.75rem; padding: 1rem 0.55rem 1rem; overflow-x: auto; overflow-y: hidden; scroll-snap-type: x mandatory; scrollbar-width: thin; scrollbar-color: #49322d transparent; }
  .project-book { width: clamp(6.1rem, 25vw, 7.4rem); height: clamp(12rem, 49vw, 14.2rem); flex: 0 0 clamp(6.1rem, 25vw, 7.4rem); scroll-snap-align: center; }
  .book-front { padding: 0.72rem 0.62rem 0.82rem 0.75rem; }
  .book-number { font-size: 0.5rem; }
  .book-selected { font-size: 0.45rem; }
  .book-category { font-size: 0.47rem; }
  .book-title { font-size: 0.76rem; }
  .book-artwell { min-height: 3rem; height: 36%; }
  .project-book:hover { transform: translateY(-0.25rem) rotateZ(0deg) rotateY(-8deg); }
  .project-book--selected { transform: translate3d(0,-0.42rem,0.45rem) rotateZ(0deg) rotateY(-2deg); }
  .shelf-plank { margin-inline: -0.2rem; }
  .project-detail { grid-template-columns: 1fr; gap: 1.2rem; }
  .detail-image { width: min(100%, 20rem); aspect-ratio: 16 / 9; }
  .detail-image img { max-width: 82%; max-height: 78%; }
}

@media (max-width: 370px) {
  .projects-section { padding-inline: 1rem; }
  .book-row { gap: 0.55rem; }
  .project-book { width: 5.7rem; flex-basis: 5.7rem; }
  .book-front { padding-inline: 0.6rem 0.5rem; }
  .book-title { font-size: 0.7rem; }
}

@media (prefers-reduced-motion: reduce) {
  .project-book, .project-links a { transition-duration: 0.01ms !important; }
}
</style>
