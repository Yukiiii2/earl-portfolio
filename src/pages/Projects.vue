<script setup>
import { computed, ref } from 'vue'
import ProjectBookshelf from '../components/ProjectBookshelf.vue'
import ProjectShowcase from '../components/ProjectShowcase.vue'
import { DATA } from './portfolio/data.js'

const selectedId = ref(DATA.projects[0].id)
const selectedIndex = computed(() => Math.max(0, DATA.projects.findIndex((project) => project.id === selectedId.value)))
const selectedProject = computed(() => DATA.projects[selectedIndex.value])
</script>

<template>
  <section class="projects-section" aria-labelledby="projects-heading">
    <header v-reveal class="projects-heading">
      <div><p class="section-kicker">Project archive / 03</p><h2 id="projects-heading">Featured Projects<span>.</span></h2></div>
      <p>Select a volume from the shelf. The case study below updates without taking you away from the page.</p>
    </header>
    <div v-reveal="{ delay: 60, variant: 'scale' }">
      <ProjectBookshelf :projects="DATA.projects" :selected-id="selectedId" @select="selectedId = $event" />
    </div>
    <div v-reveal="{ delay: 90 }">
      <Transition name="case-study" mode="out-in">
        <ProjectShowcase :key="selectedProject.id" :project="selectedProject" :index="selectedIndex" />
      </Transition>
    </div>
  </section>
</template>

<style scoped>
.projects-section { width: min(100% - 3rem,76rem); margin: 0 auto; padding: clamp(4rem,8vw,7rem) 0; }
.projects-heading { display: grid; grid-template-columns: minmax(0,1fr) minmax(16rem,.5fr); gap: 2rem; align-items: end; margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid rgba(255,255,255,.14); }
.projects-heading h2 { margin: .75rem 0 0; color: #f3f0ec; font-size: clamp(2.2rem,5vw,4.2rem); font-weight: 550; line-height: .95; letter-spacing: -.06em; }
.projects-heading h2 span { color: #f2554c; }
.projects-heading > p { max-width: 26rem; justify-self: end; margin: 0; color: #8f8883; font-size: .9rem; line-height: 1.65; }
.case-study-enter-active,.case-study-leave-active { transition: opacity 220ms ease, transform 300ms cubic-bezier(.2,.78,.2,1); }
.case-study-enter-from { opacity: 0; transform: translate3d(0,.65rem,0); }
.case-study-leave-to { opacity: 0; transform: translate3d(0,-.3rem,0); }
@media (max-width:720px) { .projects-section { width:calc(100% - 2.5rem); } .projects-heading { grid-template-columns:1fr; gap:1rem; } .projects-heading > p { justify-self:start; } }
@media (max-width:370px) { .projects-section { width:calc(100% - 2rem); } }
@media (prefers-reduced-motion:reduce) { .case-study-enter-active,.case-study-leave-active { transition:none; } }
</style>
