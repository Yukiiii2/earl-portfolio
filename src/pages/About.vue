<script setup>
import { DATA } from './portfolio/data.js'
</script>

<template>
  <section class="mx-auto grid max-w-6xl gap-10 px-6 pt-12 pb-16 md:grid-cols-[0.72fr_1.28fr] md:gap-16 md:pt-[4.5rem] md:pb-24">
    <aside data-aos="fade-up" class="flex flex-col justify-between border-t border-white/15 pt-5 md:min-h-[25rem]">
      <div>
        <p class="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-[#ff766d]">About / 01</p>
        <div class="mt-8 flex items-center gap-5">
          <div class="about-avatar">
            <img src="/dumbavatar.jpg" alt="Portrait of Earl D. Ang" />
            <img src="/Avatar.png" alt="" class="about-avatar-hover" />
          </div>
          <div>
            <p class="text-lg font-medium tracking-tight text-[#f1eeeb]">{{ DATA.name }}</p>
            <p class="mt-1 text-sm text-[#aaa5a1]">Developer</p>
          </div>
        </div>
      </div>
      <dl class="mt-10 grid grid-cols-2 gap-5 border-t border-white/10 pt-5 md:mt-0">
        <div>
          <dt class="text-[0.62rem] uppercase tracking-[0.16em] text-[#817a75]">Education</dt>
          <dd class="mt-2 text-sm leading-6 text-[#d2cdca]">BSIT Graduate</dd>
        </div>
        <div>
          <dt class="text-[0.62rem] uppercase tracking-[0.16em] text-[#817a75]">Practicum</dt>
          <dd class="mt-2 text-sm leading-6 text-[#d2cdca]">481 hours</dd>
        </div>
      </dl>
    </aside>

    <div data-aos="fade-up" data-aos-delay="100" class="border-t border-white/15 pt-5">
      <h2 class="text-3xl font-medium tracking-[-0.045em] text-[#f1eeeb] sm:text-4xl">About me<span class="text-[#ff574e]">.</span></h2>
      <p class="mt-7 max-w-2xl text-base leading-8 text-[#aaa5a1] md:text-lg md:leading-9">
        {{ DATA.aboutFull }}
      </p>
      <div class="mt-9 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-white/10 pt-5 text-[0.68rem] uppercase tracking-[0.15em] text-[#817a75]">
        <span>Software development</span><span aria-hidden="true" class="text-[#ff766d]">/</span>
        <span>Web applications</span><span aria-hidden="true" class="text-[#ff766d]">/</span>
        <span>React · Vue · Supabase</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-avatar {
  position: relative;
  width: 6rem;
  height: 6rem;
  flex: 0 0 auto;
  overflow: hidden;
  border: 1px solid rgba(255, 118, 109, 0.35);
  border-radius: 50%;
}

.about-avatar img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 35%;
}

.about-avatar .about-avatar-hover {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 240ms ease;
}

@media (min-width: 640px) {
  .about-avatar {
    width: 7rem;
    height: 7rem;
  }
}

@media (min-width: 1024px) {
  .about-avatar {
    width: 8rem;
    height: 8rem;
  }
}

@media (hover: hover) and (pointer: fine) {
  .about-avatar:hover .about-avatar-hover {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .about-avatar .about-avatar-hover {
    transition-duration: 0.01ms;
  }
}
</style>
