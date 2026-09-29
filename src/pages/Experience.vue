<script setup>
import { DATA } from './portfolio/data.js'
</script>

<template>
  <div class="mx-auto max-w-6xl px-6">
    <section class="pt-12 pb-10 md:pt-16 md:pb-12" aria-labelledby="experience-heading">
      <header data-aos="fade-up" class="mb-7 border-b border-white/15 pb-5">
        <p class="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-[#ff766d]">Work history / 03</p>
        <h2 id="experience-heading" class="text-3xl font-medium tracking-[-0.045em] text-[#f1eeeb] sm:text-4xl">Experience<span class="text-[#ff574e]">.</span></h2>
      </header>

      <ol class="divide-y divide-white/10">
        <li v-for="job in DATA.experience" :key="job.company" data-aos="fade-up" class="grid gap-3 py-5 sm:grid-cols-[minmax(11rem,0.72fr)_1.28fr] sm:gap-8 md:py-6">
          <div class="space-y-1.5 sm:pr-3">
            <p class="text-xs font-medium tracking-wide text-[#d2cdca]">{{ job.period }}</p>
            <p class="text-sm leading-6 text-[#817a75]">{{ job.company }}</p>
          </div>
          <div class="relative pl-6">
            <span class="absolute left-0 top-2.5 h-1.5 w-1.5 rounded-full bg-[#ff766d]" aria-hidden="true"></span>
            <span class="absolute left-[0.1875rem] top-5 bottom-0 w-px bg-white/10" aria-hidden="true"></span>
            <h3 class="text-xl font-semibold tracking-tight text-[#f1eeeb]">{{ job.role }}</h3>
            <p class="mt-2 max-w-2xl text-sm leading-7 text-[#aaa5a1] md:text-base">{{ job.description }}</p>
          </div>
        </li>
      </ol>
    </section>

    <section id="certifications" class="scroll-mt-24 border-t border-white/10 pt-10 pb-12 md:pt-12 md:pb-16" aria-labelledby="certifications-heading">
      <header data-aos="fade-up" class="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-white/15 pb-5">
        <div>
          <p class="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-[#ff766d]">Credentials / 04</p>
          <h2 id="certifications-heading" class="text-3xl font-medium tracking-[-0.045em] text-[#f1eeeb] sm:text-4xl">Certifications<span class="text-[#ff574e]">.</span></h2>
        </div>
        <p class="text-sm text-[#817a75]">{{ DATA.certifications.length }} credentials</p>
      </header>

      <ol class="grid sm:grid-cols-2 sm:gap-x-10">
        <li v-for="(cert, index) in DATA.certifications" :key="cert.title" data-aos="fade-up" class="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-3 border-b border-white/10 py-4 md:py-5">
          <span class="pt-0.5 text-[0.62rem] tracking-[0.12em] text-[#ff766d]">{{ String(index + 1).padStart(2, '0') }}</span>
          <div class="min-w-0">
            <p class="mb-2 text-[0.6rem] font-medium uppercase tracking-[0.16em] text-[#817a75]">{{ cert.icon }}</p>
            <h3 class="text-sm font-semibold leading-6 text-[#f1eeeb] sm:text-base">{{ cert.title }}</h3>
            <p class="mt-1 text-xs leading-5 text-[#817a75] sm:text-sm">{{ cert.issuer }}</p>
          </div>
        </li>
      </ol>
    </section>
  </div>
</template>

<style scoped>
@media (prefers-reduced-motion: reduce) {
  :deep([data-aos]) {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
</style>
