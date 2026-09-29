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
    <header id="top" class="hero-section">
      <div class="hero-copy">
        <p class="hero-eyebrow" data-aos="fade-up" data-aos-duration="650">
          <span class="location-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.2"/></svg>
          </span>
          Davao City, Philippines <span class="eyebrow-divider">/</span>
          <span class="availability-dot" aria-hidden="true"></span> Open to Work
        </p>

        <h1 class="hero-title" data-aos="fade-up" data-aos-delay="70" data-aos-duration="700">
          <span>Meet</span>
          <span class="hero-title-name">Earl Ang<span class="hero-period">.</span></span>
        </h1>

        <p class="hero-intro" data-aos="fade-up" data-aos-delay="130" data-aos-duration="700">
          {{ DATA.heroShort }}
        </p>

        <div class="hero-actions" data-aos="fade-up" data-aos-delay="190" data-aos-duration="700">
          <a href="#contact" class="button-primary">
            Email Me
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="M4 10h11M10 5l5 5-5 5"/></svg>
          </a>
          <a href="/Earl_Ang_Resume.pdf" download="Earl_Ang_Resume.pdf" target="_blank" rel="noreferrer" class="button-secondary">
            Download Resume
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="M10 3v9m0 0 3.5-3.5M10 12 6.5 8.5M4 15.5v1h12v-1"/></svg>
          </a>
        </div>

        <p class="hero-index" aria-hidden="true"><span>00</span> — DEVELOPER PORTFOLIO</p>
      </div>

      <div class="hero-art" data-aos="fade-in" data-aos-delay="100" data-aos-duration="800">
        <div class="art-halo" aria-hidden="true"></div>
        <div class="art-ring art-ring--outer" aria-hidden="true"></div>
        <div class="art-ring art-ring--inner" aria-hidden="true"></div>
        <Scene3D />
        <div class="art-caption" aria-hidden="true"><span>FIG. 01</span><span>FORM / 001</span></div>
      </div>
    </header>

    <div id="about" class="scroll-mt-24"><About /></div>
    <Marquee />
    <div id="skills" class="scroll-mt-24"><Skills /></div>
    <div id="projects" class="scroll-mt-24"><Projects /></div>
    <div id="experience" class="scroll-mt-24"><Experience /></div>
    <div id="contact"><Contact /></div>
  </div>
</template>

<style scoped>
.hero-section {
  position: relative;
  isolation: isolate;
  width: min(100% - 3rem, 76rem);
  min-height: min(47rem, calc(100svh - 5rem));
  margin: 0 auto;
  padding: clamp(4.5rem, 10vh, 7rem) 0 clamp(4rem, 8vh, 6rem);
  display: grid;
  grid-template-columns: minmax(0, 1.02fr) minmax(20rem, 0.98fr);
  align-items: center;
  gap: clamp(1rem, 4vw, 4rem);
}

.hero-copy { position: relative; z-index: 2; padding: 1rem 0 0; }
.hero-eyebrow {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.58rem;
  margin: 0 0 clamp(1.8rem, 4.5vh, 3.1rem);
  color: #b7b1ad;
  font-size: 0.72rem;
  font-weight: 550;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}
.location-mark { display: inline-flex; width: 1rem; color: #ff766d; }
.location-mark svg { width: 100%; stroke: currentColor; stroke-width: 1.4; }
.eyebrow-divider { color: #635c58; }
.availability-dot { width: 0.38rem; height: 0.38rem; margin-left: 0.15rem; border-radius: 50%; background: #f2776d; box-shadow: 0 0 0 3px rgba(242,119,109,.11); }

.hero-title {
  display: flex;
  flex-direction: column;
  margin: 0;
  color: #f1eeeb;
  font-size: clamp(4.25rem, 8.3vw, 7.5rem);
  font-weight: 650;
  line-height: 0.88;
  letter-spacing: -0.078em;
}
.hero-title > span:first-child { color: #c8c2bd; font-size: 0.68em; font-weight: 450; letter-spacing: -0.065em; }
.hero-title-name { margin-top: 0.11em; white-space: nowrap; }
.hero-period { color: #ff574e; }

.hero-intro {
  max-width: 31rem;
  margin: clamp(1.6rem, 4vh, 2.45rem) 0 0;
  color: #aaa5a1;
  font-size: clamp(1rem, 1.35vw, 1.1rem);
  line-height: 1.8;
  text-wrap: pretty;
}
.hero-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem; margin-top: clamp(1.8rem, 4.5vh, 2.7rem); }
.button-primary, .button-secondary {
  min-height: 3.35rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  padding: 0 1.15rem;
  font-size: 0.83rem;
  font-weight: 650;
  transition: transform 180ms ease, background 180ms ease, border-color 180ms ease, color 180ms ease;
}
.button-primary { min-width: 9.25rem; background: #ee5149; color: #fff; }
.button-primary:hover { transform: translateY(-2px); background: #ff6359; }
.button-secondary { border: 1px solid rgba(255,255,255,.17); color: #e9e5e1; }
.button-secondary:hover { transform: translateY(-2px); border-color: rgba(255,255,255,.38); background: rgba(255,255,255,.045); }
.button-primary svg, .button-secondary svg { width: 1rem; height: 1rem; stroke: currentColor; stroke-width: 1.5; }
.hero-index { margin: clamp(3rem, 7vh, 5rem) 0 0; color: #716b67; font-size: 0.62rem; letter-spacing: 0.12em; }
.hero-index span { color: #e06b63; }

.hero-art { position: relative; width: min(100%, 39rem); aspect-ratio: 1; justify-self: end; display: grid; place-items: center; }
.hero-art :deep(.scene-canvas) { position: relative; z-index: 2; width: 100%; height: 100%; }
.art-halo { position: absolute; inset: 15%; border-radius: 50%; background: radial-gradient(circle, rgba(229,64,57,.19), rgba(161,36,32,.07) 38%, transparent 72%); filter: blur(18px); }
.art-ring { position: absolute; border: 1px solid rgba(235,211,202,.1); border-radius: 50%; transform: rotate(-25deg) scaleY(.72); }
.art-ring--outer { inset: 6%; }
.art-ring--inner { inset: 16%; transform: rotate(32deg) scaleY(.86); border-color: rgba(255,112,102,.13); }
.art-caption { position: absolute; right: 4%; bottom: 8%; left: 4%; z-index: 3; display: flex; justify-content: space-between; color: #77706b; font-size: 0.58rem; letter-spacing: 0.15em; }

@media (max-width: 1023px) {
  .hero-section { width: min(100% - 3rem, 70rem); grid-template-columns: minmax(0, 1fr) minmax(17rem, .86fr); gap: 0; }
  .hero-title { font-size: clamp(4rem, 9vw, 6.25rem); }
  .hero-art { width: 115%; margin-left: -8%; }
}

@media (max-width: 767px) {
  .hero-section {
    width: calc(100% - 2.5rem);
    min-height: 0;
    padding: 4.4rem 0 3.5rem;
    grid-template-columns: 1fr;
    gap: 0;
  }
  .hero-copy { padding-top: 0; }
  .hero-eyebrow { gap: 0.45rem; margin-bottom: 1.75rem; font-size: 0.61rem; letter-spacing: 0.08em; }
  .hero-title { font-size: clamp(4.1rem, 17vw, 6.3rem); }
  .hero-title-name { font-size: 0.92em; }
  .hero-intro { max-width: 29rem; margin-top: 1.5rem; font-size: 1rem; line-height: 1.7; }
  .hero-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; margin-top: 1.6rem; }
  .button-primary, .button-secondary { min-width: 0; min-height: 3.2rem; gap: 0.55rem; padding: 0 0.7rem; font-size: 0.73rem; }
  .button-primary { justify-content: space-around; }
  .button-secondary { justify-content: space-around; }
  .hero-index { margin-top: 2rem; }
  .hero-art { width: min(112%, 27rem); margin: -0.4rem auto -1.5rem; justify-self: center; }
  .art-caption { bottom: 7%; }
}

@media (max-width: 380px) {
  .hero-section { width: calc(100% - 2rem); }
  .hero-title { font-size: clamp(3.7rem, 16.7vw, 4.15rem); }
  .hero-eyebrow { font-size: 0.56rem; }
  .button-primary, .button-secondary { font-size: 0.68rem; padding-inline: 0.45rem; }
  .hero-art { width: 108%; }
}

@media (prefers-reduced-motion: reduce) {
  .button-primary, .button-secondary { transition-duration: 0.01ms !important; }
}
</style>
