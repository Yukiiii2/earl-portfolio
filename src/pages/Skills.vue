<script setup>
import { onMounted } from 'vue'
import { DATA } from './portfolio/data.js'

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
    <h3 data-aos="fade-up" class="text-3xl font-black text-white mb-8 border-b border-[#2A2A2A] pb-4">Tech Stack</h3>
    
    <div class="grid md:grid-cols-2 gap-8">
      <!-- Frontend -->
      <div data-aos="fade-up" data-aos-delay="100" class="spotlight bg-white/[0.02] border border-white/5 p-6 rounded-2xl hover:border-[#FF3B30]/30 transition-all duration-300">
        <h4 class="text-white font-bold mb-4 relative z-20">Frontend</h4>
        <div class="flex flex-wrap gap-2 relative z-20">
          <span v-for="skill in DATA.skills.frontend" :key="skill" class="bg-[#FF3B30]/10 border border-[#FF3B30]/30 text-white text-sm font-bold px-4 py-1.5 rounded-full">{{ skill }}</span>
        </div>
      </div>
      
      <!-- Backend -->
      <div data-aos="fade-up" data-aos-delay="200" class="spotlight bg-white/[0.02] border border-white/5 p-6 rounded-2xl hover:border-[#FF3B30]/30 transition-all duration-300">
        <h4 class="text-white font-bold mb-4 relative z-20">Backend & Database</h4>
        <div class="flex flex-wrap gap-2 relative z-20">
          <span v-for="skill in DATA.skills.backend" :key="skill" class="bg-[#FF3B30]/10 border border-[#FF3B30]/30 text-white text-sm font-bold px-4 py-1.5 rounded-full">{{ skill }}</span>
        </div>
      </div>

      <!-- Tools -->
      <div data-aos="fade-up" data-aos-delay="300" class="spotlight bg-white/[0.02] border border-white/5 p-6 rounded-2xl hover:border-[#FF3B30]/30 transition-all duration-300">
        <h4 class="text-white font-bold mb-4 relative z-20">Tools & Cloud</h4>
        <div class="flex flex-wrap gap-2 relative z-20">
          <span v-for="skill in DATA.skills.tools" :key="skill" class="bg-[#FF3B30]/10 border border-[#FF3B30]/30 text-white text-sm font-bold px-4 py-1.5 rounded-full">{{ skill }}</span>
        </div>
      </div>

      <!-- Familiar With -->
      <div data-aos="fade-up" data-aos-delay="400" class="spotlight bg-white/[0.02] border border-white/5 p-6 rounded-2xl hover:border-[#FF3B30]/30 transition-all duration-300">
        <h4 class="text-white font-bold mb-4 relative z-20">Familiar With</h4>
        <div class="flex flex-wrap gap-2 relative z-20">
          <span v-for="skill in DATA.skills.familiarWith" :key="skill" class="bg-[#FF3B30]/10 border border-[#FF3B30]/30 text-white text-sm font-bold px-4 py-1.5 rounded-full">{{ skill }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
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