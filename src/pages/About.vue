<script setup>
import { DATA } from './portfolio/data.js'
</script>

<template>
  <section class="max-w-5xl mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row items-center gap-12 md:gap-20">
    
    <!-- Circular Avatar with Glow Effect -->
    <div data-aos="fade-right" class="w-48 h-48 md:w-64 md:h-64 rounded-full border-2 border-[#2A2A2A] bg-[#111111] shadow-[0_0_40px_rgba(255,59,48,0.2)] flex-shrink-0 flex items-center justify-center overflow-hidden relative group z-10">
      <div class="absolute inset-0 bg-gradient-to-br from-[#FF3B30]/20 to-transparent z-10 pointer-events-none group-hover:opacity-75 transition-opacity"></div>
      <img :src="DATA.avatar" :alt="DATA.name" class="object-cover w-full h-full" />
    </div>

    <!-- About Text -->
    <div data-aos="fade-left" data-aos-delay="200" class="flex-1 text-center md:text-left">
      <h3 class="text-4xl font-black text-white mb-6 border-b border-[#2A2A2A] pb-4 inline-block md:block">About Me</h3>
      <p class="text-base md:text-lg text-[#C9C9C9] leading-relaxed mb-6">
        {{ DATA.aboutFull }}
      </p>
      
      <!-- Quick Stats / Highlights -->
      <div class="grid grid-cols-2 gap-4 mt-8">
        <div class="bg-[#111111] border border-[#2A2A2A] p-4 rounded-xl">
          <p class="text-xs text-[#C9C9C9] uppercase tracking-widest mb-1">Status</p>
          <p class="text-white font-bold">BSIT Graduate</p>
        </div>
        <div class="bg-[#111111] border border-[#2A2A2A] p-4 rounded-xl">
          <p class="text-xs text-[#C9C9C9] uppercase tracking-widest mb-1">Focus</p>
          <p class="text-white font-bold">Developer</p>
        </div>
      </div>
    </div>

  </section>
</template>