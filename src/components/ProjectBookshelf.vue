<script setup>
defineProps({ projects: { type: Array, required: true }, selectedId: { type: String, required: true } })
const emit = defineEmits(['select'])

const volumeNumber = (index) => String(index + 1).padStart(2, '0')
const coverStyle = (project, index) => ({
  '--book-depth': `${(0.68 + (index % 3) * 0.05).toFixed(2)}rem`,
  '--book-angle': `${index % 2 ? -8 : -10}deg`,
  '--book-lean': `${index % 2 ? 0.35 : -0.35}deg`,
  '--cover-color': project.coverColor,
  '--project-accent': project.accentColor,
})

const updateSpotlight = (event) => {
  if (event.pointerType && event.pointerType !== 'mouse') return
  const bounds = event.currentTarget.getBoundingClientRect()
  event.currentTarget.style.setProperty('--spot-x', `${event.clientX - bounds.left}px`)
  event.currentTarget.style.setProperty('--spot-y', `${event.clientY - bounds.top}px`)
}
</script>

<template>
  <div class="project-navigation">
    <div class="mobile-project-tabs" role="group" aria-label="Select a featured project">
      <button
        v-for="(project, index) in projects"
        :key="project.id"
        type="button"
        :style="{ '--project-accent': project.accentColor, '--cover-color': project.coverColor }"
        :aria-pressed="selectedId === project.id"
        aria-controls="project-case-study"
        @click="emit('select', project.id)"
      >
        <span class="sr-only">Show project: </span>
        <span class="mobile-brand" aria-hidden="true">
          <img v-if="project.brand?.src" data-mobile-brand :src="project.brand.src" alt="" width="56" height="56" loading="lazy" decoding="async" />
          <span v-else>{{ project.title.slice(0, 2) }}</span>
        </span>
        <span class="mobile-book-copy">
          <span class="mobile-volume">Vol. {{ volumeNumber(index) }}</span>
          <strong>{{ project.title }}</strong>
          <span class="mobile-category">{{ project.category }}</span>
        </span>
      </button>
    </div>

    <div class="bookshelf" role="group" aria-label="Interactive project bookshelf" @pointermove="updateSpotlight">
      <div class="archive-rail" aria-hidden="true"><span>EA. / PRIVATE PROJECT ARCHIVE</span><span>VOLUMES 01—04</span></div>
      <div class="book-row" role="group" aria-label="Select a featured project">
        <button
          v-for="(project, index) in projects"
          :key="project.id"
          type="button"
          class="project-book"
          :class="[`project-book--${project.id}`, { 'project-book--selected': selectedId === project.id }]"
          :style="coverStyle(project, index)"
          :aria-pressed="selectedId === project.id"
          aria-controls="project-case-study"
          @click="emit('select', project.id)"
        >
          <span class="sr-only">Show project: </span>
          <span class="book-object">
            <span class="book-back" aria-hidden="true"></span>
            <span class="book-page-edge book-page-edge--side" aria-hidden="true"></span>
            <span class="book-page-edge book-page-edge--top" aria-hidden="true"></span>
            <span class="book-page-edge book-page-edge--bottom" aria-hidden="true"></span>
            <span class="book-spine" aria-hidden="true">
              <span class="spine-volume">{{ volumeNumber(index) }}</span>
              <span class="spine-title">{{ project.title }}</span>
              <span class="spine-monogram">EA.</span>
            </span>
            <span class="book-front">
              <span class="cover-inset" aria-hidden="true"></span>
              <span class="cover-topline">
                <span class="book-number">VOL. {{ volumeNumber(index) }}</span>
                <span class="book-edition">COLLECTOR'S EDITION</span>
              </span>
              <span class="book-category">{{ project.category }}</span>
              <span class="book-artwell" :class="`book-artwell--${project.brand?.treatment || 'text'}`" aria-hidden="true">
                <img
                  v-if="project.brand?.src"
                  data-book-brand
                  :src="project.brand.src"
                  alt=""
                  class="book-brand"
                  width="160"
                  height="160"
                  loading="lazy"
                  decoding="async"
                />
                <span v-else class="book-monogram">{{ project.title.slice(0, 2) }}</span>
              </span>
              <span class="cover-rule" aria-hidden="true"><span></span></span>
              <span class="book-title">{{ project.title }}</span>
              <span class="cover-footer" aria-hidden="true"><span>EA. ARCHIVE</span><span>MMXXVI</span></span>
              <span v-if="selectedId === project.id" class="book-selected">SELECTED</span>
            </span>
          </span>
        </button>
      </div>
      <div class="shelf-plank" aria-hidden="true"><span class="shelf-edge"></span></div>
      <div class="shelf-base" aria-hidden="true"></div>
      <p class="shelf-caption" aria-hidden="true">SELECT A VOLUME TO OPEN ITS CASE STUDY</p>
    </div>
  </div>
</template>

<style scoped>
.mobile-project-tabs { display: none; }

.bookshelf {
  --spot-x: 50%;
  --spot-y: 42%;
  position: relative;
  isolation: isolate;
  min-height: 31rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.1rem clamp(1.2rem,5vw,4rem) 1.15rem;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,.085);
  background:
    linear-gradient(90deg,rgba(255,255,255,.016) 1px,transparent 1px),
    radial-gradient(ellipse at 51% 38%,rgba(122,48,44,.17),transparent 58%),
    linear-gradient(180deg,#0d0c0c 0%,#080707 78%,#0b0909 100%);
  background-size: 4rem 100%,auto,auto;
  box-shadow: inset 0 1px rgba(255,255,255,.03), inset 0 -4rem 6rem rgba(0,0,0,.34);
  perspective: 1450px;
}
.bookshelf::before,
.bookshelf::after { position: absolute; inset: 0; content: ''; pointer-events: none; }
.bookshelf::before {
  z-index: -1;
  opacity: .32;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.78' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.14'/%3E%3C/svg%3E");
  mix-blend-mode: soft-light;
}
.bookshelf::after {
  z-index: -1;
  background: radial-gradient(340px circle at var(--spot-x) var(--spot-y),rgba(255,104,91,.12),transparent 72%);
  transition: background 180ms linear;
}
.archive-rail { position: absolute; top: 1.15rem; right: clamp(1rem,3vw,2rem); left: clamp(1rem,3vw,2rem); display: flex; justify-content: space-between; padding-bottom: .7rem; border-bottom: 1px solid rgba(255,255,255,.065); color: #625c58; font: 400 .5rem/1 var(--font-mono); letter-spacing: .15em; }

.book-row { position: relative; z-index: 2; min-height: 22.5rem; display: flex; align-items: flex-end; justify-content: center; gap: clamp(.7rem,2.5vw,2rem); padding: 2rem 0 1.15rem; transform: rotateX(1.5deg); transform-style: preserve-3d; }
.book-row::after { position: absolute; right: 5%; bottom: .55rem; left: 5%; height: 1.2rem; z-index: -1; content: ''; background: radial-gradient(ellipse,rgba(0,0,0,.82),transparent 68%); filter: blur(.35rem); transform: rotateX(78deg); }
.project-book {
  --book-depth: .72rem;
  position: relative;
  width: clamp(7rem,13vw,9.25rem);
  height: clamp(15.1rem,25vw,18.25rem);
  flex: 0 1 9.25rem;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  transform: translateZ(0) rotateZ(var(--book-lean)) rotateY(var(--book-angle));
  transform-style: preserve-3d;
  transition: transform 440ms cubic-bezier(.18,.82,.24,1), filter 380ms ease;
  will-change: transform;
}
.project-book::after { position: absolute; right: 2%; bottom: -.95rem; left: 5%; height: .85rem; z-index: -1; content: ''; border-radius: 50%; background: rgba(0,0,0,.74); filter: blur(.35rem); transform: rotateX(72deg); transition: opacity 300ms ease, transform 440ms cubic-bezier(.18,.82,.24,1); }
.book-object { position: absolute; inset: 0; transform-style: preserve-3d; }
.book-back,.book-front { position: absolute; inset: 0; border-radius: .08rem .22rem .22rem .08rem; }
.book-back { border: 1px solid rgba(255,255,255,.07); background: color-mix(in srgb,var(--cover-color) 74%,#080707); transform: rotateY(180deg) translateZ(var(--book-depth)); }
.book-page-edge { position: absolute; border-color: rgba(255,255,255,.23); background: repeating-linear-gradient(0deg,#c8bcae 0 1px,#a99b8e 1px 2px,#d2c6b7 2px 3px); }
.book-page-edge--side { top: .45rem; left: calc(100% - .08rem); width: calc(var(--book-depth) * 2); height: calc(100% - .9rem); border-block: 1px solid rgba(255,255,255,.31); border-right: 1px solid rgba(255,255,255,.19); transform: translateZ(var(--book-depth)) rotateY(90deg); transform-origin: left center; }
.book-page-edge--top,.book-page-edge--bottom { left: .42rem; width: calc(100% - .75rem); height: calc(var(--book-depth) * 2); background: repeating-linear-gradient(90deg,#c8bcae 0 1px,#a99b8e 1px 3px); transform-origin: center bottom; }
.book-page-edge--top { top: 0; transform: translateZ(calc(var(--book-depth) * -1)) rotateX(90deg); }
.book-page-edge--bottom { bottom: 0; transform: translateZ(var(--book-depth)) rotateX(-90deg); transform-origin: center top; }
.book-spine { position: absolute; inset-block: 0; left: calc(var(--book-depth) * -2); width: calc(var(--book-depth) * 2); display: flex; flex-direction: column; align-items: center; justify-content: space-between; overflow: hidden; padding: .62rem .15rem; border: 1px solid color-mix(in srgb,var(--project-accent) 34%,#1b1515); background: linear-gradient(90deg,color-mix(in srgb,var(--cover-color) 68%,#070606),var(--cover-color) 66%,color-mix(in srgb,var(--cover-color) 78%,#fff)); color: rgba(255,243,236,.78); box-shadow: inset 1px 0 rgba(0,0,0,.42),inset -1px 0 rgba(255,255,255,.08); transform: translateZ(calc(var(--book-depth) * -1)) rotateY(-90deg); transform-origin: right center; }
.spine-volume,.spine-title,.spine-monogram { font-family: var(--font-mono); text-transform: uppercase; }
.spine-volume { color: var(--project-accent); font-size: .44rem; letter-spacing: .12em; }
.spine-title { writing-mode: vertical-rl; transform: rotate(180deg); font-size: .48rem; font-weight: 600; letter-spacing: .07em; white-space: nowrap; }
.spine-monogram { font-size: .43rem; letter-spacing: .08em; }
.book-front { display: flex; flex-direction: column; padding: .95rem .85rem .78rem 1rem; overflow: hidden; border: 1px solid color-mix(in srgb,var(--project-accent) 34%,rgba(255,255,255,.15)); background: linear-gradient(112deg,rgba(255,255,255,.085),transparent 22%,rgba(0,0,0,.08) 67%,rgba(255,255,255,.025)),radial-gradient(circle at 82% 12%,color-mix(in srgb,var(--project-accent) 13%,transparent),transparent 35%),var(--cover-color); box-shadow: inset 1px 0 rgba(255,255,255,.16),inset -2px 0 rgba(0,0,0,.34),inset 0 1px rgba(255,255,255,.08),0 .35rem 1.2rem rgba(0,0,0,.28); text-align: left; transform: translateZ(var(--book-depth)); transform-style: preserve-3d; transition:border-color 320ms ease,box-shadow 380ms ease; }
.book-front::before { position: absolute; inset: 0; content: ''; opacity: .18; pointer-events: none; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23p)' opacity='.16'/%3E%3C/svg%3E"); mix-blend-mode: overlay; }
.cover-inset { position: absolute; inset: .42rem; border: 1px solid color-mix(in srgb,var(--project-accent) 20%,rgba(255,255,255,.08)); border-radius: .02rem .12rem .12rem .02rem; pointer-events: none; }
.cover-inset::before,.cover-inset::after { position: absolute; width: .58rem; height: .58rem; content: ''; }
.cover-inset::before { top: .22rem; left: .22rem; border-top: 1px solid var(--project-accent); border-left: 1px solid var(--project-accent); }
.cover-inset::after { right: .22rem; bottom: .22rem; border-right: 1px solid var(--project-accent); border-bottom: 1px solid var(--project-accent); }
.cover-topline { position: relative; z-index: 2; display: flex; align-items: center; justify-content: space-between; gap: .3rem; }
.book-number,.book-edition,.book-selected,.book-category,.cover-footer { font-family: var(--font-mono); text-transform: uppercase; }
.book-number { color: color-mix(in srgb,var(--project-accent) 74%,#fff1e9); font-size: .55rem; font-weight: 600; letter-spacing: .12em; white-space: nowrap; }
.book-edition { color: rgba(255,238,231,.42); font-size: .34rem; letter-spacing: .08em; white-space: nowrap; }
.book-category { position: relative; z-index: 1; margin-top: .55rem; min-height: 2.5em; max-width: 92%; color: rgba(255,242,236,.64); font-size: .45rem; letter-spacing: .095em; line-height: 1.35; }
.book-artwell { position: relative; z-index: 1; height: 39%; min-height: 4rem; display: grid; place-items: center; margin-top: .55rem; overflow: hidden; border: 1px solid color-mix(in srgb,var(--project-accent) 27%,rgba(255,255,255,.08)); background: color-mix(in srgb,var(--project-accent) 7%,#141212); box-shadow: inset 0 0 1.1rem rgba(0,0,0,.32); }
.book-artwell::after { position: absolute; inset: 0; content: ''; pointer-events: none; box-shadow: inset 0 0 0 1px rgba(255,255,255,.025),inset 0 -1.5rem 2rem rgba(0,0,0,.12); }
.book-brand { display: block; width: 68%; height: 68%; object-fit: contain; filter: saturate(.9) contrast(1.04); transition:transform 420ms cubic-bezier(.18,.82,.24,1),filter 320ms ease; }
.book-artwell--projectflow { background: radial-gradient(circle at 50% 43%,rgba(109,78,214,.22),transparent 64%),#15121e; }
.book-artwell--projectflow .book-brand { width: 57%; height: 57%; filter: drop-shadow(0 .45rem .75rem rgba(62,33,132,.4)); }
.book-artwell--voclaria { background: radial-gradient(circle at 64% 28%,rgba(32,202,220,.13),transparent 38%),linear-gradient(145deg,#171124,#0e0b18); }
.book-artwell--voclaria .book-brand { width: 84%; height: 84%; filter: saturate(.9) drop-shadow(0 .42rem .6rem rgba(75,35,146,.38)); }
.book-artwell--marian { background: #f4f0ea; }
.book-artwell--marian .book-brand { width: 77%; height: 77%; }
.book-artwell--brightminds { background: linear-gradient(145deg,#f1eee7,#dfe5de); }
.book-artwell--brightminds .book-brand { width: 64%; height: 64%; }
.book-monogram { color: rgba(255,255,255,.72); font-size: 1.45rem; font-weight: 700; }
.cover-rule { position: relative; z-index: 1; height: 1px; margin-top: .65rem; background: rgba(255,255,255,.13); }
.cover-rule span { display: block; width: 34%; height: 1px; background: var(--project-accent); box-shadow: 0 0 .45rem color-mix(in srgb,var(--project-accent) 40%,transparent); transition:width 420ms cubic-bezier(.18,.82,.24,1),box-shadow 320ms ease; }
.book-title { position: relative; z-index: 1; margin-top: auto; padding-top: .55rem; color: #fff6f1; font-size: clamp(.78rem,1.18vw,.94rem); font-weight: 700; line-height: 1.05; letter-spacing: -.025em; overflow-wrap: anywhere; text-shadow: 0 1px rgba(0,0,0,.32); }
.cover-footer { position: relative; z-index: 1; display: flex; justify-content: space-between; margin-top: .52rem; color: rgba(255,238,231,.4); font-size: .35rem; letter-spacing: .11em; }
.book-selected { position: absolute; right: .4rem; bottom: .4rem; z-index: 3; padding: .24rem .35rem; border: 1px solid color-mix(in srgb,var(--project-accent) 62%,#fff); background: color-mix(in srgb,var(--cover-color) 86%,#000); color: color-mix(in srgb,var(--project-accent) 68%,#fff); font-size: .38rem; letter-spacing: .1em; }
.project-book--projectflow .book-front { box-shadow: inset 1px 0 rgba(255,255,255,.19),inset -2px 0 rgba(0,0,0,.34),0 .45rem 1.3rem rgba(0,0,0,.32); }
.project-book:hover { z-index: 4; transform: translate3d(0,-.48rem,.42rem) rotateZ(calc(var(--book-lean) * .18)) rotateY(-5deg); filter: brightness(1.06); }
.project-book:hover::after { opacity: .86; transform: translateY(.22rem) rotateX(72deg) scale(.92); }
.project-book:hover .book-brand { transform:scale(1.025); }
.project-book:hover .cover-rule span { width:44%; box-shadow:0 0 .7rem color-mix(in srgb,var(--project-accent) 52%,transparent); }
.project-book--selected { z-index: 3; transform: translate3d(0,-.82rem,.82rem) rotateZ(0) rotateY(-1.5deg); filter: drop-shadow(0 .85rem .75rem rgba(0,0,0,.46)); }
.project-book--selected::after { opacity: .62; transform: translateY(.36rem) rotateX(72deg) scale(.82); }
.project-book--selected .book-front { border-color: color-mix(in srgb,var(--project-accent) 72%,#fff); box-shadow: inset 1px 0 rgba(255,255,255,.24),inset 0 0 0 1px color-mix(in srgb,var(--project-accent) 30%,transparent),0 0 1.5rem color-mix(in srgb,var(--project-accent) 13%,transparent),0 .65rem 1.45rem rgba(0,0,0,.38); }
.project-book--selected .book-brand { transform:scale(1.018); }
.project-book--selected .cover-rule span { width:52%; box-shadow:0 0 .75rem color-mix(in srgb,var(--project-accent) 58%,transparent); }
.project-book:focus-visible { z-index: 5; outline: 2px solid #ff8178; outline-offset: 8px; }
.shelf-plank { position: relative; z-index: 1; height: 1.15rem; margin: -.12rem -2.2rem 0; border-top: 1px solid rgba(235,179,159,.27); background: linear-gradient(180deg,#3d2822,#261915 48%,#130e0d); box-shadow: 0 .75rem 1.3rem rgba(0,0,0,.55),inset 0 1px rgba(255,255,255,.045); transform: perspective(28rem) rotateX(8deg); }
.shelf-plank::before { position: absolute; inset: 0; content: ''; opacity: .19; background: repeating-linear-gradient(91deg,transparent 0 3.2rem,rgba(255,255,255,.08) 3.25rem 3.3rem,transparent 3.35rem 6rem); }
.shelf-edge { position: absolute; inset: auto 0 -.48rem; height: .48rem; border-top: 1px solid rgba(255,255,255,.035); background: linear-gradient(180deg,#19100e,#0c0908); }
.shelf-base { height: .55rem; margin: 0 -2.2rem; background: linear-gradient(180deg,#0c0908,transparent); }
.shelf-caption { align-self: flex-end; margin: .62rem 0 0; color: #6c6560; font: 400 .5rem/1 var(--font-mono); letter-spacing: .145em; }

@media (max-width:900px) {
  .bookshelf { min-height: 27.5rem; padding-inline: 1.15rem; }
  .book-row { min-height: 20rem; gap: clamp(.55rem,1.65vw,1rem); }
  .project-book { width: clamp(6.35rem,14.5vw,7.6rem); height: clamp(14.2rem,29vw,16.4rem); }
  .book-front { padding: .8rem .7rem .68rem .82rem; }
  .book-edition { display: none; }
  .book-title { font-size: clamp(.71rem,1.7vw,.84rem); }
}
@media (max-width:640px) {
  .bookshelf { display:none; }
  .mobile-project-tabs { display:grid; grid-auto-flow:column; grid-auto-columns:minmax(15.5rem,82vw); gap:.75rem; overflow-x:auto; padding:.25rem .1rem .9rem; scroll-padding-inline:.1rem; scroll-snap-type:x mandatory; overscroll-behavior-inline:contain; touch-action:pan-x; scrollbar-width:thin; scrollbar-color:#6b423e #141111; }
  .mobile-project-tabs button { min-height:6rem; display:grid; grid-template-columns:3.25rem minmax(0,1fr); align-items:center; gap:.85rem; padding:.75rem .85rem; border:1px solid rgba(255,255,255,.12); background:linear-gradient(118deg,rgba(255,255,255,.035),transparent 44%),var(--cover-color); color:#d8d2ce; text-align:left; scroll-snap-align:start; scroll-snap-stop:always; cursor:pointer; box-shadow:inset 0 0 0 1px rgba(255,255,255,.025); transition:border-color 220ms ease,transform 220ms cubic-bezier(.18,.82,.24,1),background 220ms ease; }
  .mobile-project-tabs button:hover { border-color:color-mix(in srgb,var(--project-accent) 55%,rgba(255,255,255,.18)); }
  .mobile-project-tabs button:active { transform:scale(.99); }
  .mobile-project-tabs button:focus-visible { outline:2px solid #ff8178; outline-offset:3px; }
  .mobile-project-tabs button[aria-pressed="true"] { border-color:color-mix(in srgb,var(--project-accent) 78%,#fff); background:linear-gradient(118deg,color-mix(in srgb,var(--project-accent) 13%,transparent),transparent 54%),var(--cover-color); box-shadow:inset 3px 0 var(--project-accent),0 .55rem 1.3rem rgba(0,0,0,.26); transform:translateY(-2px); }
  .mobile-brand { width:3.25rem; height:3.25rem; display:grid; place-items:center; overflow:hidden; border:1px solid color-mix(in srgb,var(--project-accent) 28%,rgba(255,255,255,.12)); background:#f0ede7; }
  .mobile-brand img { width:76%; height:76%; object-fit:contain; }
  .mobile-book-copy { min-width:0; display:flex; flex-direction:column; gap:.28rem; }
  .mobile-volume,.mobile-category { font-family:var(--font-mono); text-transform:uppercase; }
  .mobile-volume { color:color-mix(in srgb,var(--project-accent) 70%,#f7eee9); font-size:.56rem; letter-spacing:.12em; }
  .mobile-book-copy strong { overflow:hidden; color:#fff5ef; font-size:.94rem; line-height:1.1; text-overflow:ellipsis; white-space:nowrap; }
  .mobile-category { overflow:hidden; color:rgba(255,245,239,.52); font-size:.48rem; letter-spacing:.06em; text-overflow:ellipsis; white-space:nowrap; }
}
@media (prefers-reduced-motion:reduce) {
  .project-book,.project-book::after,.book-front,.book-brand,.cover-rule span,.bookshelf::after,.mobile-project-tabs button { transition:none; }
  .project-book:hover,.project-book--selected { transform:rotateZ(0) rotateY(-2deg); }
  .project-book:hover .book-brand,.project-book--selected .book-brand { transform:none; }
  .mobile-project-tabs button[aria-pressed="true"] { transform:none; }
}
</style>
