<script setup>
import { DATA } from './portfolio/data.js'
</script>

<template>
  <section class="max-w-5xl mx-auto px-6 py-12">
    <div class="grid md:grid-cols-2 gap-12">
      
      <!-- Experience Column -->
      <div data-aos="fade-right">
        <h3 class="text-2xl font-black text-white mb-6 border-b border-[#2A2A2A] pb-2">Experience</h3>
        
        <div class="space-y-8">
          <div v-for="job in DATA.experience" :key="job.company" class="relative border-l border-[#2A2A2A] pl-6 ml-2">
            <!-- Timeline Dot -->
            <div class="absolute w-3 h-3 bg-[#FF3B30] rounded-full -left-[6.5px] top-2 shadow-[0_0_10px_rgba(255,59,48,0.8)]"></div>
            
            <h4 class="text-lg font-bold text-white">{{ job.role }}</h4>
            <p class="text-[#FF3B30] text-sm font-bold mb-2">{{ job.company }} • {{ job.period }}</p>
            <p class="text-[#C9C9C9] text-sm leading-relaxed">
              {{ job.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Certifications Column -->
      <div data-aos="fade-left" data-aos-delay="200">
        <h3 class="text-2xl font-black text-white mb-6 border-b border-[#2A2A2A] pb-2">Certifications</h3>
        
        <ul class="space-y-4">
          <li v-for="cert in DATA.certifications" :key="cert.title" class="bg-[#111111] border border-[#2A2A2A] p-4 rounded-xl flex items-start gap-4 hover:border-[#FF3B30]/30 transition-colors">
            <!-- Badge Icon -->
            <div class="w-12 h-12 rounded bg-[#FF3B30]/10 flex items-center justify-center flex-shrink-0 text-[#FF3B30] font-bold text-xs tracking-wider">
              {{ cert.icon }}
            </div>
            
            <!-- Text Content -->
            <div>
              <h4 class="text-white font-bold text-sm">{{ cert.title }}</h4>
              <p class="text-xs text-[#C9C9C9]">{{ cert.issuer }}</p>
            </div>
          </li>
        </ul>
      </div>

    </div>
  </section>
</template>