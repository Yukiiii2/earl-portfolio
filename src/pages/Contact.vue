<script setup>
import { DATA } from './portfolio/data.js'
</script>

<template>
  <section class="max-w-6xl mx-auto px-6 py-24">
    <div class="grid lg:grid-cols-2 gap-16 items-start">
      
      <!-- LEFT COLUMN: Personalized Text & Value Props -->
      <div data-aos="fade-right">
        <h2 class="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
          Ready to start<br />a project?
        </h2>
        <p class="text-[#C9C9C9] text-lg mb-12 leading-relaxed max-w-md">
          Whether you have a specific idea in mind, need help scaling an existing web application, or just want to explore opportunities, I'm ready to help bring your vision to life.
        </p>

        <!-- Custom Value Props -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-1 gap-8">
          <!-- Item 1 -->
          <div class="flex gap-4">
            <div class="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#FF3B30] flex-shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </div>
            <div>
              <h4 class="text-white font-bold text-sm mb-1">Direct Communication</h4>
              <p class="text-sm text-[#C9C9C9]">Your message goes straight to my inbox. I aim to respond within 24 hours.</p>
            </div>
          </div>
          <!-- Item 2 -->
          <div class="flex gap-4">
            <div class="w-10 h-10 rounded-lg bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#FF3B30] flex-shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
            </div>
            <div>
              <h4 class="text-white font-bold text-sm mb-1">Full-Stack Execution</h4>
              <p class="text-sm text-[#C9C9C9]">From clean UI design to secure backend database integrations.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT COLUMN: Form Card -->
      <div data-aos="fade-left" class="bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
        
        <!-- Subtle Ambient Glow inside the card -->
        <div class="absolute -top-20 -right-20 w-64 h-64 bg-[#FF3B30]/10 rounded-full blur-[80px] pointer-events-none z-0"></div>

        <div class="relative z-10 flex items-center justify-between mb-8">
          <div>
            <h3 class="text-xl font-bold text-white">Send an inquiry</h3>
            <p class="text-sm text-[#C9C9C9] mt-1">Fill out the details below and I'll get back to you.</p>
          </div>
          <div class="w-10 h-10 rounded-full bg-[#FF3B30]/10 flex items-center justify-center text-[#FF3B30]">
            <svg class="w-4 h-4 translate-x-[1px] translate-y-[-1px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
          </div>
        </div>

        <!-- Form: Remember to replace YOUR_FORMSPREE_ENDPOINT later -->
        <form action="YOUR_FORMSPREE_ENDPOINT" method="POST" class="relative z-10 space-y-5">
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label class="block text-xs font-bold text-[#C9C9C9] mb-2">Name</label>
              <input type="text" name="name" placeholder="Your name" required class="w-full bg-[#050505]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF3B30]/50 transition-colors placeholder:text-white/20">
            </div>
            <div>
              <label class="block text-xs font-bold text-[#C9C9C9] mb-2">Email</label>
              <input type="email" name="email" placeholder="you@company.com" required class="w-full bg-[#050505]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF3B30]/50 transition-colors placeholder:text-white/20">
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-[#C9C9C9] mb-2">How can I help?</label>
            <div class="relative">
              <select name="project_type" class="w-full bg-[#050505]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF3B30]/50 transition-colors appearance-none">
                <option value="frontend">Frontend Web Development</option>
                <option value="fullstack">Full-Stack Application</option>
                <option value="freelance">Freelance / Contract Work</option>
                <option value="other">General Inquiry</option>
              </select>
              <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-white/50">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold text-[#C9C9C9] mb-2">Message details</label>
            <textarea name="message" rows="4" placeholder="Tell me a bit about your project or inquiry..." required class="w-full bg-[#050505]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF3B30]/50 transition-colors placeholder:text-white/20 resize-none"></textarea>
          </div>

          <button type="submit" class="w-full bg-[#FF3B30] text-white font-bold py-4 rounded-xl hover:bg-red-600 transition-colors shadow-[0_4px_20px_rgba(255,59,48,0.3)] hover:-translate-y-0.5 transform duration-200 flex items-center justify-center gap-2">
            Send Message 
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </form>

      </div>
    </div>
  </section>
</template>