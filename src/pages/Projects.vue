<script setup>
import { onMounted } from 'vue'
import { DATA } from './portfolio/data.js'

// This tracks the mouse movement over any element with the 'spotlight' class
onMounted(() => {
  const cards = document.querySelectorAll('.spotlight')
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      card.style.setProperty('--x', `${x}px`)
      card.style.setProperty('--y', `${y}px`)
    })
  })
})
</script>

<template>
  <section class="max-w-5xl mx-auto px-6 py-12">
    <h3 data-aos="fade-up" class="text-3xl font-black text-white mb-8 border-b border-[#2A2A2A] pb-4">Featured Projects</h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Added the 'spotlight' class here -->
      <div v-for="(project, index) in DATA.projects" :key="project.title" 
           data-aos="fade-up" :data-aos-delay="100 * (index + 1)"
           class="spotlight bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col overflow-hidden hover:border-[#FF3B30]/40 hover:-translate-y-2 transition-all duration-500 group">
        
        <div class="h-48 bg-[#1a1a1a] relative overflow-hidden z-20">
          <div class="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent z-10 pointer-events-none"></div>
          <img v-if="project.image" :src="project.image" :alt="project.title" :class="['w-full h-full group-hover:scale-110 transition-transform duration-500', project.imageStyle]" />
          <div v-else class="absolute inset-0 flex items-center justify-center text-[#2A2A2A] group-hover:scale-105 transition-transform duration-500">
            <span class="font-black text-3xl opacity-20">{{ project.title }}</span>
          </div>
        </div>

        <div class="p-6 flex-1 flex flex-col justify-between -mt-6 z-20 relative">
          <div>
            <h4 class="text-xl font-bold text-white mb-2">{{ project.title }}</h4>
            <p class="text-sm text-[#C9C9C9] mb-6">{{ project.blurb }}</p>
          </div>
          <div>
            <div class="flex flex-wrap gap-2 mb-6">
              <span v-for="tag in project.tags" :key="tag" class="bg-white/[0.05] text-xs font-bold px-2 py-1 rounded text-[#C9C9C9]">{{ tag }}</span>
            </div>
            <div class="flex items-center gap-3">
              <a :href="project.github" target="_blank" rel="noreferrer" class="text-sm font-bold text-white bg-white/10 px-4 py-2 rounded-full hover:bg-[#FF3B30] transition-colors">Code</a>
              <a v-if="project.live !== '#'" :href="project.live" target="_blank" rel="noreferrer" class="text-sm font-bold text-[#FF3B30] border border-[#FF3B30]/30 px-4 py-2 rounded-full hover:bg-[#FF3B30]/10 transition-colors">
                {{ project.liveLabel || "Live App" }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* The Spotlight CSS Effect */
.spotlight {
  position: relative;
}
.spotlight::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(400px circle at var(--x, 50%) var(--y, 50%), rgba(255, 59, 48, 0.15), transparent 40%);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 10; 
}
.spotlight:hover::before {
  opacity: 1;
}
</style>