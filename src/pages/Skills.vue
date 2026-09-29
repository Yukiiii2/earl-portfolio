<script setup>
import { DATA } from './portfolio/data.js'

const groups = [
  { label: 'Primary Frontend', index: '01', items: DATA.skills.frontend },
  { label: 'Backend & Database', index: '02', items: DATA.skills.backend },
  { label: 'Tools & Cloud', index: '03', items: DATA.skills.tools },
  { label: 'Currently Learning', index: '04', items: DATA.skills.currentlyLearning },
]
</script>

<template>
  <section class="mx-auto max-w-6xl px-6 py-16 md:py-24">
    <header data-aos="fade-up" class="mb-9 flex flex-wrap items-end justify-between gap-4 border-b border-white/15 pb-5">
      <div>
        <p class="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-[#ff766d]">Toolkit / 02</p>
        <h2 class="text-3xl font-medium tracking-[-0.045em] text-[#f1eeeb] sm:text-4xl">Tech stack<span class="text-[#ff574e]">.</span></h2>
      </div>
      <p class="max-w-xs text-sm leading-6 text-[#817a75]">Technologies and tools used across my work.</p>
    </header>

    <div>
      <section v-for="group in groups" :key="group.index" data-aos="fade-up" class="grid gap-4 border-b border-white/10 py-6 sm:grid-cols-[minmax(10rem,0.7fr)_1.3fr] sm:gap-8 md:py-7">
        <h3 class="flex items-baseline gap-3 text-sm font-medium text-[#d2cdca]">
          <span class="text-[0.62rem] tracking-[0.12em] text-[#ff766d]">{{ group.index }}</span>
          {{ group.label }}
        </h3>
        <ul class="flex flex-wrap gap-x-2 gap-y-2.5" :aria-label="group.label">
          <li v-for="skill in group.items" :key="skill" class="border-b border-white/15 px-0.5 pb-1 text-sm leading-6 text-[#aaa5a1] transition-colors duration-200 hover:border-[#ff766d] hover:text-[#f1eeeb] motion-reduce:transition-none">
            {{ skill }}
          </li>
        </ul>
      </section>
    </div>
  </section>
</template>
