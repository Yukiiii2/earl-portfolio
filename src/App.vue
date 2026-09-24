<script setup>
import { ref } from 'vue'
import { DATA } from './pages/portfolio/data.js'

// This variable tracks if the mobile menu is open (true) or closed (false)
const isMenuOpen = ref(false)
</script>

<template>
  <main class="min-h-screen bg-[#050505] text-[#C9C9C9] font-sans selection:bg-[#FF3B30] selection:text-white pb-10 relative overflow-hidden z-10">

    <!-- Premium Film Grain Overlay -->
    <div class="fixed inset-0 z-50 pointer-events-none opacity-[0.04]" style="background-image: url(&quot;data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E&quot;);"></div>
    
    <!-- Ambient Background Glows -->
    <div class="fixed top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#FF3B30]/5 blur-[120px] pointer-events-none z-0"></div>
    <div class="fixed bottom-[-10%] right-[-5%] w-[30vw] h-[30vw] rounded-full bg-[#FF3B30]/5 blur-[100px] pointer-events-none z-0"></div>

    <!-- Ambient Background Glows -->
    <div class="fixed top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#FF3B30]/5 blur-[120px] pointer-events-none z-0"></div>
    <div class="fixed bottom-[-10%] right-[-5%] w-[30vw] h-[30vw] rounded-full bg-[#FF3B30]/5 blur-[100px] pointer-events-none z-0"></div>

    <!-- Sticky Glass Navbar (Updated with tighter blur) -->
    <nav class="fixed top-0 w-full z-50 bg-[#050505]/70 backdrop-blur-xl border-b border-white/5 transition-all duration-300"></nav>

    <!-- Sticky Glass Navbar -->
    <nav class="fixed top-0 w-full z-50 bg-[#0b0b0b]/80 backdrop-blur-md border-b border-[#2A2A2A]">
      <div class="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" class="text-[#FF3B30] font-black text-xl tracking-wider">EA</a>

        <!-- Desktop Links -->
        <div class="hidden md:flex gap-6 text-sm font-bold text-white">
          <a href="#about" class="hover:text-[#FF3B30] transition-colors">About</a>
          <a href="#skills" class="hover:text-[#FF3B30] transition-colors">Skills</a>
          <a href="#projects" class="hover:text-[#FF3B30] transition-colors">Projects</a>
          <a href="#experience" class="hover:text-[#FF3B30] transition-colors">Experience</a>
        </div>

        <!-- Contact Button & Mobile Toggle Container -->
        <div class="flex items-center gap-4">
          <a href="#contact" class="hidden md:inline-block text-sm font-bold text-[#FF3B30] border border-[#FF3B30] px-4 py-1.5 rounded-full hover:bg-[#FF3B30]/10 transition-colors">
  Contact
</a>
          
          <!-- Hamburger Button (Only visible on mobile) -->
          <button @click="isMenuOpen = !isMenuOpen" class="md:hidden text-white hover:text-[#FF3B30] transition-colors p-2 -mr-2 focus:outline-none">
            <!-- Icon when closed -->
            <svg v-if="!isMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            <!-- Icon when open -->
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Dropdown Menu -->
      <div v-show="isMenuOpen" class="md:hidden bg-[#0b0b0b] border-b border-[#2A2A2A] px-6 py-4 flex flex-col gap-4 shadow-2xl absolute w-full left-0 top-16">
        <!-- @click="isMenuOpen = false" ensures the menu closes after clicking a link -->
        <a href="#about" @click="isMenuOpen = false" class="text-white font-bold hover:text-[#FF3B30] transition-colors">About</a>
        <a href="#skills" @click="isMenuOpen = false" class="text-white font-bold hover:text-[#FF3B30] transition-colors">Skills</a>
        <a href="#projects" @click="isMenuOpen = false" class="text-white font-bold hover:text-[#FF3B30] transition-colors">Projects</a>
        <a href="#experience" @click="isMenuOpen = false" class="text-white font-bold hover:text-[#FF3B30] transition-colors">Experience</a>
        <a href="#contact" @click="isMenuOpen = false" class="text-[#FF3B30] font-bold py-2 border-t border-[#2A2A2A] mt-2 flex items-center gap-2">
  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
  Email Me
</a>
      </div>
    </nav>

    <!-- Dynamic Page Content Injects Here -->
    <div class="pt-24 min-h-[80vh]">
      <router-view />
    </div>

    <!-- Persistent Footer -->
    <footer class="max-w-5xl mx-auto px-6 py-8 mt-12 border-t border-[#2A2A2A] flex flex-col md:flex-row items-center justify-between text-sm text-[#C9C9C9]">
      <p>© {{ new Date().getFullYear() }} {{ DATA.name }} {{ DATA.lastName }}. All Rights Reserved.</p>
      <div class="flex gap-6 mt-4 md:mt-0">
        <a :href="DATA.links.github" target="_blank" rel="noreferrer" class="hover:text-[#FF3B30] transition-colors">GitHub</a>
        <a :href="DATA.links.linkedin" target="_blank" rel="noreferrer" class="hover:text-[#FF3B30] transition-colors">LinkedIn</a>
        <a :href="DATA.links.twitter" target="_blank" rel="noreferrer" class="hover:text-[#FF3B30] transition-colors">Twitter / X</a>
      </div>
    </footer>

  </main>
</template>