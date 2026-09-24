<template>
  <div class="w-full overflow-hidden border-y border-white/5 py-6 relative bg-white/[0.01]">
    <!-- Gradient Masks for smooth edge fading -->
    <div class="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none"></div>
    <div class="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none"></div>
    
    <div class="flex animate-marquee whitespace-nowrap w-max items-center">
      <!-- Group 1 -->
      <div class="flex items-center gap-12 px-6 text-[#C9C9C9] font-black text-sm tracking-widest uppercase">
        <span>React</span><span class="text-[#FF3B30]">/</span>
        <span>Vue.js</span><span class="text-[#FF3B30]">/</span>
        <span>Supabase</span><span class="text-[#FF3B30]">/</span>
        <span>Tailwind CSS</span><span class="text-[#FF3B30]">/</span>
        <span>PostgreSQL</span><span class="text-[#FF3B30]">/</span>
        <span>AWS Cloud</span><span class="text-[#FF3B30]">/</span>
      </div>
      <!-- Group 2 (Exact Duplicate to make the infinite loop seamless) -->
      <div class="flex items-center gap-12 px-6 text-[#C9C9C9] font-black text-sm tracking-widest uppercase">
        <span>React</span><span class="text-[#FF3B30]">/</span>
        <span>Vue.js</span><span class="text-[#FF3B30]">/</span>
        <span>Supabase</span><span class="text-[#FF3B30]">/</span>
        <span>Tailwind CSS</span><span class="text-[#FF3B30]">/</span>
        <span>PostgreSQL</span><span class="text-[#FF3B30]">/</span>
        <span>AWS Cloud</span><span class="text-[#FF3B30]">/</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}
.animate-marquee {
  animation: marquee 15s linear infinite;
}
</style>