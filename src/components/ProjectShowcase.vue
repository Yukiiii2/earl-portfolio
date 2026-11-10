<script setup>
import { computed, ref, watch } from 'vue'
import { visibleProjectLinks } from '../pages/portfolio/project-links.js'

const props = defineProps({ project: { type: Object, required: true }, index: { type: Number, required: true } })
const activeImageIndex = ref(0)
const volume = computed(() => String(props.index + 1).padStart(2, '0'))
const actions = computed(() => visibleProjectLinks(props.project))
const activeImage = computed(() => props.project.images?.[activeImageIndex.value])
watch(() => props.project.id, () => { activeImageIndex.value = 0 })
</script>

<template>
  <article id="project-case-study" data-project-showcase class="project-showcase" :style="{ '--project-accent': project.accentColor }" aria-live="polite" aria-labelledby="project-case-study-title">
    <header class="showcase-header">
      <div class="showcase-index"><span class="showcase-eyebrow">Selected case study</span><p>Volume {{ volume }}</p><span>{{ project.category }}</span></div>
      <div class="showcase-copy">
        <h3 id="project-case-study-title">{{ project.title }}</h3>
        <p class="showcase-description">{{ project.description }}</p>
        <div class="showcase-actions">
          <a v-for="action in actions" :key="action.href" :href="action.href" :class="action.kind === 'primary' ? 'action-primary' : 'action-secondary'" target="_blank" rel="noopener noreferrer">
            {{ action.label }} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </header>

    <div v-if="activeImage" class="showcase-visual">
      <div id="project-case-study-image" class="image-frame" :class="{ 'image-frame--contain': activeImage.contain }">
        <Transition name="gallery-media" mode="out-in">
          <img :key="activeImage.src" :src="activeImage.src" :srcset="activeImage.srcset" sizes="(max-width: 768px) 92vw, 1120px" :alt="activeImage.alt" :width="activeImage.width" :height="activeImage.height" loading="lazy" decoding="async" />
        </Transition>
        <p class="image-caption"><span>{{ activeImage.label }}</span><span>{{ activeImageIndex + 1 }} / {{ project.images.length }}</span></p>
      </div>
      <div v-if="project.images.length > 1" class="gallery-tabs" role="group" :aria-label="`${project.title} screenshot gallery`">
        <button v-for="(image, imageIndex) in project.images" :key="image.src" type="button" :aria-pressed="activeImageIndex === imageIndex" aria-controls="project-case-study-image" @click="activeImageIndex = imageIndex">
          <span class="sr-only">Show {{ project.title }} image: </span><span>{{ String(imageIndex + 1).padStart(2, '0') }}</span>{{ image.label }}
        </button>
      </div>
    </div>

    <section
      v-else-if="project.galleryFallback"
      class="project-overview"
      :class="`project-overview--${project.galleryFallback.type}`"
      :aria-labelledby="`${project.id}-overview-heading`"
    >
      <div class="overview-art" aria-hidden="true">
        <div class="overview-device">
          <div v-if="project.galleryFallback.type === 'mobile'" class="overview-speaker"></div>
          <div class="overview-screen">
          <img :src="project.galleryFallback.logo" alt="" loading="lazy" decoding="async" />
            <p>Authentic project identity</p>
          </div>
        </div>
      </div>
      <div class="overview-body">
        <p class="overview-eyebrow">{{ project.galleryFallback.eyebrow }}</p>
        <h4 :id="`${project.id}-overview-heading`" class="overview-heading">{{ project.galleryFallback.heading }}</h4>
        <p class="overview-summary">{{ project.galleryFallback.summary }}</p>
        <div class="overview-feature-block">
          <p class="note-label">Verified capabilities</p>
          <ul class="overview-features">
            <li v-for="feature in project.galleryFallback.features" :key="feature">{{ feature }}</li>
          </ul>
        </div>
        <p class="overview-evidence"><span>Source note</span>{{ project.galleryFallback.evidence }}</p>
      </div>
    </section>

    <div class="showcase-notes">
      <section><p class="note-label">Contribution</p><p>{{ project.contribution }}</p></section>
      <section><p class="note-label">Technology</p><ul aria-label="Technology stack"><li v-for="tag in project.tags" :key="tag">{{ tag }}</li></ul></section>
    </div>
  </article>
</template>

<style scoped>
.project-showcase { position: relative; margin-top: clamp(2.5rem,6vw,5rem); border-top: 1px solid rgba(255,255,255,.14); }
.project-showcase::before { position: absolute; top: -1px; left: 0; width: clamp(4rem,10vw,7.5rem); height: 1px; content: ''; background: var(--project-accent); box-shadow: 0 0 .8rem color-mix(in srgb,var(--project-accent) 35%,transparent); }
.showcase-header { display: grid; grid-template-columns: minmax(9rem,.38fr) minmax(0,1fr); gap: clamp(2rem,7vw,7rem); padding: clamp(2.2rem,5vw,4rem) 0 clamp(2rem,4vw,3rem); }
.showcase-index p,.showcase-index span,.note-label { font-family: var(--font-mono); text-transform: uppercase; }
.showcase-index .showcase-eyebrow { display: block; margin: 0 0 1.15rem; color: #5f5955; font-size: .48rem; letter-spacing: .13em; }
.showcase-index p { margin: 0; color: var(--project-accent); font-size: .69rem; letter-spacing: .12em; }
.showcase-index span:not(.showcase-eyebrow) { display: block; max-width: 12rem; margin-top: .75rem; color: #817a75; font-size: .58rem; line-height: 1.55; letter-spacing: .08em; }
.showcase-copy h3 { margin: 0; color: #f5f1ed; font-size: clamp(2.4rem,6vw,5.1rem); font-weight: 600; line-height: .95; letter-spacing: -.06em; }
.showcase-description { max-width: 45rem; margin: 1.4rem 0 0; color: #aaa4a0; font-size: clamp(1rem,1.5vw,1.14rem); line-height: 1.75; }
.showcase-actions { display: flex; flex-wrap: wrap; gap: .7rem; margin-top: 1.7rem; }
.showcase-actions a { min-height: 3.15rem; display: inline-flex; align-items: center; justify-content: space-between; gap: 1.8rem; padding: 0 1.05rem; border: 1px solid rgba(255,255,255,.15); color: #eee9e5; font-size: .77rem; font-weight: 600; text-decoration: none; transition: transform 180ms ease,border-color 180ms ease,background 180ms ease; }
.showcase-actions a:hover { transform: translateY(-2px); }
.showcase-actions a:active { transform: translateY(0); }
.showcase-actions a span { transition: transform 180ms ease; }
.showcase-actions a:hover span { transform: translate3d(.18rem,-.12rem,0); }
.showcase-actions .action-primary { border-color: var(--project-accent); background: color-mix(in srgb,var(--project-accent) 22%,#121010); color: #fff; }
.showcase-actions .action-secondary:hover { border-color: rgba(255,255,255,.38); }
.showcase-visual { position: relative; padding: clamp(.38rem,.8vw,.65rem); border: 1px solid rgba(255,255,255,.1); background: linear-gradient(145deg,rgba(255,255,255,.035),transparent 32%),#090808; box-shadow: 0 1.7rem 4rem rgba(0,0,0,.26); }
.image-frame { position: relative; aspect-ratio: 16 / 10; overflow: hidden; background: color-mix(in srgb,var(--project-accent) 6%,#0c0b0b); }
.image-frame img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: top center; }
.gallery-media-enter-active,.gallery-media-leave-active { transition: opacity 180ms ease, transform 240ms cubic-bezier(.2,.78,.2,1); }
.gallery-media-enter-from { opacity: 0; transform: scale(.992); }
.gallery-media-leave-to { opacity: 0; transform: scale(1.006); }
.image-frame--contain { display: grid; place-items: center; }
.image-frame--contain img { width: 70%; height: 70%; object-fit: contain; object-position: center; }
.image-caption { position: absolute; right: 0; bottom: 0; left: 0; display: flex; justify-content: space-between; margin: 0; padding: 2.5rem 1rem .85rem; background: linear-gradient(transparent,rgba(4,4,4,.82)); color: #d7d0cb; font: 400 .57rem/1 var(--font-mono); letter-spacing: .08em; text-transform: uppercase; }
.gallery-tabs { display: flex; gap: .38rem; overflow-x: auto; padding: .55rem 0 0; scroll-snap-type:x proximity; overscroll-behavior-inline:contain; touch-action:pan-x; }
.gallery-tabs button { min-width: 11rem; min-height: 3.35rem; display: inline-flex; align-items: center; gap: .7rem; padding: .6rem 1rem; border: 1px solid rgba(255,255,255,.075); background: #0d0c0c; color: #88817c; font-size: .71rem; scroll-snap-align:start; cursor: pointer; transition: color 180ms ease,border-color 180ms ease,background 180ms ease,transform 180ms ease; }
.gallery-tabs button span { color: #665f5a; font: 400 .56rem/1 var(--font-mono); }
.gallery-tabs button:hover { border-color:rgba(255,255,255,.2); color:#d7d0cb; transform:translateY(-1px); }
.gallery-tabs button:active { transform:translateY(0); }
.gallery-tabs button[aria-pressed="true"] { border-color: color-mix(in srgb,var(--project-accent) 48%,rgba(255,255,255,.08)); background: color-mix(in srgb,var(--project-accent) 8%,#0d0c0c); color: #f1ece8; box-shadow: inset 0 -2px var(--project-accent); }
.gallery-tabs button:focus-visible { outline: 2px solid #ff8178; outline-offset: -3px; }
.project-overview { min-height: clamp(27rem,48vw,36rem); display: grid; grid-template-columns: minmax(16rem,.75fr) minmax(20rem,1.25fr); align-items: stretch; gap: clamp(2rem,6vw,5.5rem); padding: clamp(1.6rem,4vw,3.4rem); border: 1px solid rgba(255,255,255,.1); background: radial-gradient(circle at 20% 40%,color-mix(in srgb,var(--project-accent) 10%,transparent),transparent 34%),linear-gradient(145deg,rgba(255,255,255,.035),transparent 33%),#090808; box-shadow: 0 1.7rem 4rem rgba(0,0,0,.26); }
.overview-art { min-height: 22rem; display: grid; place-items: center; border: 1px solid rgba(255,255,255,.07); background: linear-gradient(135deg,rgba(255,255,255,.025),transparent 45%); }
.overview-device { position: relative; width: min(100%,25rem); overflow: hidden; border: 1px solid rgba(255,255,255,.18); background: #111; box-shadow: 0 1.8rem 4rem rgba(0,0,0,.45),inset 0 0 0 1px rgba(255,255,255,.035); }
.project-overview--mobile .overview-device { width: min(78%,13rem); aspect-ratio: 9 / 18.5; padding: .55rem; border-radius: 2rem; background: linear-gradient(145deg,#272526,#080808 32%,#171515); }
.project-overview--desktop .overview-device { width: min(88%,25rem); aspect-ratio: 16 / 10; padding: .5rem; border-radius: .55rem; }
.overview-speaker { position: absolute; z-index: 2; top: .9rem; left: 50%; width: 2.8rem; height: .26rem; transform: translateX(-50%); border-radius: 999px; background: rgba(255,255,255,.18); }
.overview-screen { width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1.15rem; padding: clamp(1.2rem,3vw,2.6rem); border: 1px solid rgba(255,255,255,.055); border-radius: inherit; background: radial-gradient(circle at 50% 36%,color-mix(in srgb,var(--project-accent) 18%,transparent),transparent 42%),#111010; text-align: center; }
.project-overview--mobile .overview-screen { border-radius: 1.5rem; }
.overview-screen img { width: min(64%,9rem); max-height: 8.5rem; display: block; object-fit: contain; filter: drop-shadow(0 .8rem 1.4rem rgba(0,0,0,.38)); }
.project-overview--desktop .overview-screen img { width: min(44%,8.5rem); }
.overview-screen p { margin: 0; color: #8f8883; font: 500 .5rem/1.4 var(--font-mono); letter-spacing: .1em; text-transform: uppercase; }
.overview-body { align-self: center; max-width: 40rem; padding-block: .5rem; }
.overview-eyebrow { margin: 0 0 .85rem; color: var(--project-accent); font: 500 .57rem/1.4 var(--font-mono); letter-spacing: .11em; text-transform: uppercase; }
.overview-heading { max-width: 35rem; margin: 0; color: #f0ebe7; font-size: clamp(1.8rem,3.3vw,2.8rem); font-weight: 550; line-height: 1.08; letter-spacing: -.04em; }
.overview-summary { max-width: 38rem; margin: 1rem 0 0; color: #aaa4a0; line-height: 1.72; }
.overview-feature-block { margin-top: clamp(1.4rem,3vw,2rem); padding-top: 1.25rem; border-top: 1px solid rgba(255,255,255,.09); }
.overview-features { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: .7rem 1.5rem; margin: .85rem 0 0; padding: 0; list-style: none; }
.overview-features li { position: relative; padding-left: 1rem; color: #c7c0bb; font-size: .78rem; line-height: 1.5; }
.overview-features li::before { position: absolute; top: .58em; left: 0; width: .32rem; height: .32rem; content: ''; border-radius: 50%; background: var(--project-accent); box-shadow: 0 0 .55rem color-mix(in srgb,var(--project-accent) 45%,transparent); }
.overview-evidence { margin: clamp(1.5rem,3vw,2rem) 0 0; padding: .9rem 1rem; border-left: 2px solid color-mix(in srgb,var(--project-accent) 42%,transparent); background: rgba(255,255,255,.025); color: #77716c; font-size: .68rem; line-height: 1.65; }
.overview-evidence span { display: block; margin-bottom: .25rem; color: #928b86; font: 500 .5rem/1.2 var(--font-mono); letter-spacing: .1em; text-transform: uppercase; }
.showcase-notes { display: grid; grid-template-columns: 1.2fr .8fr; gap: clamp(2rem,6vw,6rem); padding: clamp(2rem,5vw,4rem) 0; border-bottom: 1px solid rgba(255,255,255,.1); }
.showcase-notes section { display: grid; grid-template-columns: minmax(6.5rem,.32fr) 1fr; gap: 1rem; }
.note-label { margin: .18rem 0 0; color: #716a65; font-size: .58rem; letter-spacing: .1em; }
.showcase-notes p:not(.note-label) { margin: 0; color: #aaa4a0; line-height: 1.75; }
.showcase-notes ul { display: flex; flex-wrap: wrap; gap: .5rem .65rem; margin: 0; padding: 0; list-style: none; }
.showcase-notes li { padding: .42rem .6rem; border: 1px solid rgba(255,255,255,.11); color: #c6bfba; font-size: .68rem; }
@media (max-width:720px) { .showcase-header { grid-template-columns:1fr; gap:1.3rem; } .showcase-index { display:grid; grid-template-columns:1fr auto; align-items:end; gap:.45rem 1rem; } .showcase-index .showcase-eyebrow { grid-column:1 / -1; margin:0 0 .4rem; } .showcase-index span:not(.showcase-eyebrow) { margin:0; text-align:right; } .showcase-copy h3 { font-size:clamp(2.35rem,13vw,4rem); } .showcase-visual { margin-inline:-.35rem; padding:.3rem; } .image-frame { aspect-ratio:16 / 10; } .project-overview { min-height:0; grid-template-columns:1fr; gap:1.5rem; margin-inline:-.35rem; padding:1.4rem; } .overview-art { min-height:18rem; } .project-overview--mobile .overview-device { width:min(64vw,12.5rem); } .project-overview--desktop .overview-device { width:min(100%,25rem); } .overview-body { padding:.35rem .1rem .2rem; } .overview-features { grid-template-columns:1fr; gap:.62rem; } .showcase-notes { grid-template-columns:1fr; } .showcase-notes section { grid-template-columns:1fr; } }
@media (prefers-reduced-motion:reduce) { .showcase-actions a,.showcase-actions a span,.gallery-tabs button,.gallery-media-enter-active,.gallery-media-leave-active { transition:none; } }
</style>
