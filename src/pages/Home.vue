<script setup>
import Scene3D from '../components/Scene3D.vue'
import Marquee from '../components/Marquee.vue'
import About from './About.vue'
import Skills from './Skills.vue'
import Projects from './Projects.vue'
import Experience from './Experience.vue'
import Contact from './Contact.vue'
import { DATA } from './portfolio/data.js'

</script>

<template>
  <div>
    
    <!-- 1. HERO SECTION -->
    <header class="relative max-w-6xl mx-auto px-6 min-h-[80vh] flex flex-col md:flex-row items-center justify-between gap-12 pt-8">
      
      <!-- LEFT COLUMN: Text -->
      <div class="flex-1 text-center md:text-left relative z-10">
        <p data-aos="fade-right" class="text-xs md:text-sm font-bold tracking-widest text-[#C9C9C9] mb-6 uppercase flex items-center justify-center md:justify-start gap-2">
          <svg class="w-4 h-4 text-[#FF3B30]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          Davao City, Philippines • Open to Work
        </p>
        
        <!-- Upgraded Headline with Gradient -->
        <h1 data-aos="fade-up" data-aos-delay="100" class="text-6xl md:text-8xl font-black text-white tracking-tight mb-6 leading-tight">
          Meet<br />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3B30] to-[#ff8b85]">
            Earl Ang.
          </span>
        </h1>
        
        <p data-aos="fade-up" data-aos-delay="200" class="text-base md:text-lg max-w-xl leading-relaxed mb-10 drop-shadow-md mx-auto md:mx-0 text-[#C9C9C9]">
          {{ DATA.heroShort }}
        </p>
        
        <!-- Upgraded Buttons -->
        <div data-aos="fade-up" data-aos-delay="300" class="flex flex-wrap items-center justify-center md:justify-start gap-4">
          <a href="#contact" class="relative group bg-[#FF3B30] text-white px-8 py-3 rounded-full font-bold transition-all duration-300 hover:-translate-y-1">
  <div class="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
  <div class="absolute -inset-1 bg-[#FF3B30] rounded-full blur-md opacity-40 group-hover:opacity-70 transition-opacity z-[-1]"></div>
  <span class="relative z-10">Email Me</span>
</a>
          
          <a href="/Earl_Ang_Resume.pdf" download="Earl_Ang_Resume.pdf" target="_blank" rel="noreferrer" class="border border-white/10 text-white px-8 py-3 rounded-full font-bold hover:bg-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm">
            Download Resume
          </a>
        </div>
      </div>

      <!-- RIGHT COLUMN: 3D Scene -->
      <div data-aos="zoom-in" data-aos-delay="400" class="w-[320px] h-[320px] md:w-[500px] md:h-[500px] relative z-0 mix-blend-screen flex-shrink-0">
        <Scene3D />
      </div>
      
    </header> <!-- The layout fix is here: properly closing the header -->

    <!-- 2. ABOUT SECTION -->
    <div id="about" class="scroll-mt-24">
      <About />
    </div>

    <!-- 2. INFINITE MARQUEE -->
    <Marquee />

    <!-- 3. SKILLS SECTION -->
    <div id="skills" class="scroll-mt-24">
      <Skills />
    </div>

    <div id="projects" class="scroll-mt-24">
      <Projects />
    </div>

    <!-- 5. EXPERIENCE SECTION -->
    <div id="experience" class="scroll-mt-24">
      <Experience />
    </div>

    <!-- 6. CONTACT CTA -->
    <div id="contact">
      <Contact />
    </div>

  </div>
</template>