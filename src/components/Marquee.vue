<template>
  <div class="relative w-full overflow-hidden border-y border-white/10 py-4" aria-hidden="true">
    <div class="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#050505] to-transparent sm:w-20"></div>
    <div class="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#050505] to-transparent sm:w-20"></div>

    <div class="animate-marquee flex w-max items-center whitespace-nowrap">
      <!-- Group 1 -->
      <div class="flex items-center gap-7 px-5 text-[#aaa5a1] text-[0.62rem] font-medium tracking-[0.17em] uppercase sm:gap-10 sm:px-7 sm:text-xs">
        <span>React</span><span class="text-[#FF3B30]">/</span>
        <span>Vue.js</span><span class="text-[#FF3B30]">/</span>
        <span>Supabase</span><span class="text-[#FF3B30]">/</span>
        <span>Tailwind CSS</span><span class="text-[#FF3B30]">/</span>
        <span>PostgreSQL</span><span class="text-[#FF3B30]">/</span>
        <span>AWS Cloud</span><span class="text-[#FF3B30]">/</span>
      </div>
      <!-- Group 2 (Exact Duplicate to make the infinite loop seamless) -->
      <div class="flex items-center gap-7 px-5 text-[#aaa5a1] text-[0.62rem] font-medium tracking-[0.17em] uppercase sm:gap-10 sm:px-7 sm:text-xs" aria-hidden="true">
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
  animation: marquee 32s linear infinite;
}
.animate-marquee:hover {
  animation-play-state: paused;
}
@media (prefers-reduced-motion: reduce) {
  .animate-marquee {
    animation: none;
    transform: translateX(0);
  }
}
</style>
