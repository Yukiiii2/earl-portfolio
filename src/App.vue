<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { DATA } from './pages/portfolio/data.js'

const route = useRoute()
const router = useRouter()
const isMenuOpen = ref(false)
const isScrolled = ref(false)
const activeSection = ref('')

const navigation = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Experience', id: 'experience' },
]

let sectionObserver

const updateScrollState = () => {
  isScrolled.value = window.scrollY > 12
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const sectionHref = (id) => route.name === 'home'
  ? `#${id}`
  : router.resolve({ name: 'home', hash: `#${id}` }).href

onMounted(() => {
  updateScrollState()
  window.addEventListener('scroll', updateScrollState, { passive: true })

  sectionObserver = new IntersectionObserver((entries) => {
    const visibleSections = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

    if (visibleSections[0]) activeSection.value = visibleSections[0].target.id
  }, { rootMargin: '-22% 0px -58% 0px', threshold: [0, 0.15, 0.35, 0.6] })

  navigation.forEach(({ id }) => {
    const section = document.getElementById(id)
    if (section) sectionObserver.observe(section)
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollState)
  sectionObserver?.disconnect()
})
</script>

<template>
  <main class="site-shell min-h-screen relative overflow-hidden z-10 pb-10">
    <div aria-hidden="true" class="ambient-light"></div>

    <nav
      aria-label="Main navigation"
      class="site-nav fixed top-0 inset-x-0 z-50 transition-colors duration-300"
      :class="{ 'site-nav--scrolled': isScrolled }"
    >
      <div class="nav-inner">
        <a :href="sectionHref('top')" class="brand-mark" aria-label="Earl Ang, home" @click="closeMenu">EA<span>.</span></a>

        <div class="desktop-nav" aria-label="Primary">
          <a
            v-for="item in navigation"
            :key="item.id"
            :href="sectionHref(item.id)"
            :aria-current="activeSection === item.id ? 'location' : undefined"
            :class="{ 'nav-link--active': activeSection === item.id }"
          >{{ item.label }}</a>
        </div>

        <div class="nav-actions">
          <a :href="sectionHref('contact')" class="nav-contact">Contact <span aria-hidden="true">↗</span></a>
          <button
            class="menu-toggle"
            type="button"
            :aria-expanded="isMenuOpen"
            aria-controls="mobile-navigation"
            :aria-label="isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'"
            @click="isMenuOpen = !isMenuOpen"
            @keydown.esc="closeMenu"
          >
            <span></span><span></span>
          </button>
        </div>
      </div>

      <div v-show="isMenuOpen" id="mobile-navigation" class="mobile-nav">
        <a
          v-for="(item, index) in navigation"
          :key="item.id"
          :href="sectionHref(item.id)"
          :aria-current="activeSection === item.id ? 'location' : undefined"
          :class="{ 'nav-link--active': activeSection === item.id }"
          @click="closeMenu"
        ><span class="mobile-nav-index">0{{ index + 1 }}</span>{{ item.label }}</a>
        <a :href="sectionHref('contact')" class="mobile-nav-contact" @click="closeMenu">Contact <span aria-hidden="true">↗</span></a>
      </div>
    </nav>

    <div class="page-content pt-20 min-h-[80vh]">
      <router-view />
    </div>

    <footer class="mx-auto flex w-full max-w-6xl flex-col items-start gap-y-2 border-t border-white/10 px-6 py-5 text-xs text-[#817a75] sm:flex-row sm:items-center sm:justify-between sm:gap-x-6 sm:py-4">
      <p>© {{ new Date().getFullYear() }} {{ DATA.name }} {{ DATA.lastName }}. All Rights Reserved.</p>
      <nav aria-label="Social links" class="flex flex-wrap gap-x-5">
        <a :href="DATA.links.github" target="_blank" rel="noopener noreferrer" class="footer-link">GitHub</a>
        <a v-if="DATA.links.linkedin && !DATA.links.linkedin.endsWith('/yourhandle')" :href="DATA.links.linkedin" target="_blank" rel="noopener noreferrer" class="footer-link">LinkedIn</a>
        <a :href="DATA.links.twitter" target="_blank" rel="noopener noreferrer" class="footer-link">Twitter / X</a>
      </nav>
    </footer>
  </main>
</template>

<style scoped>
.ambient-light {
  position: absolute;
  z-index: -1;
  top: -23rem;
  right: -12rem;
  width: min(70vw, 68rem);
  height: min(70vw, 68rem);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 59, 48, 0.095), rgba(255, 59, 48, 0.025) 38%, transparent 70%);
  pointer-events: none;
}

.site-nav {
  border-bottom: 1px solid transparent;
  background: linear-gradient(to bottom, rgba(7, 7, 7, 0.68), rgba(7, 7, 7, 0));
}

.site-nav--scrolled {
  border-color: rgba(255, 255, 255, 0.09);
  background: rgba(8, 8, 8, 0.94);
}

.nav-inner {
  width: min(100% - 3rem, 76rem);
  height: 4.75rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}

.brand-mark {
  justify-self: start;
  color: #f5f1ed;
  font-size: 1.28rem;
  line-height: 1;
  font-weight: 800;
  letter-spacing: -0.075em;
}

.brand-mark span { color: #ff5148; }

.desktop-nav {
  display: flex;
  align-items: center;
  gap: clamp(1.15rem, 2.4vw, 2.25rem);
}

.desktop-nav a, .nav-contact {
  color: #aaa7a4;
  font-size: 0.79rem;
  font-weight: 550;
  letter-spacing: 0.015em;
  transition: color 180ms ease, border-color 180ms ease, background 180ms ease;
}

.desktop-nav a { position: relative; padding: 0.65rem 0; }
.desktop-nav a::after {
  position: absolute;
  right: 0;
  bottom: 0.25rem;
  left: 0;
  height: 1px;
  background: #ff5148;
  content: '';
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 180ms ease;
}
.desktop-nav a:hover, .desktop-nav a.nav-link--active { color: #fff; }
.desktop-nav a:hover::after, .desktop-nav a.nav-link--active::after { transform: scaleX(1); }

.nav-actions { justify-self: end; display: flex; align-items: center; gap: 0.75rem; }
.nav-contact {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.6rem 0.9rem;
  border: 1px solid rgba(255, 111, 101, 0.48);
  color: #ff8178;
}
.nav-contact:hover { border-color: #ff8178; background: rgba(255, 81, 72, 0.09); color: #fff; }
.menu-toggle { display: none; }
.mobile-nav { display: none; }

.footer-link { min-height: 2.75rem; display: inline-flex; align-items: center; color: #aaa5a1; transition: color 160ms ease; }
.footer-link:hover { color: #ff8178; }
.footer-link:focus-visible { outline: 2px solid #ff8178; outline-offset: 3px; }

@media (max-width: 767px) {
  .nav-inner { width: calc(100% - 2.5rem); height: 4.25rem; grid-template-columns: 1fr auto; }
  .desktop-nav, .nav-contact { display: none; }
  .menu-toggle {
    width: 2.75rem;
    height: 2.75rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.38rem;
    border: 1px solid rgba(255,255,255,0.14);
    background: rgba(255,255,255,0.025);
    color: #fff;
    cursor: pointer;
  }
  .menu-toggle span { width: 1rem; height: 1px; background: currentColor; transition: transform 180ms ease; }
  .menu-toggle[aria-expanded="true"] span:first-child { transform: translateY(0.2rem) rotate(45deg); }
  .menu-toggle[aria-expanded="true"] span:last-child { transform: translateY(-0.2rem) rotate(-45deg); }
  .mobile-nav {
    display: flex;
    flex-direction: column;
    padding: 0.5rem 1.25rem 1.2rem;
    border-top: 1px solid rgba(255,255,255,0.06);
    border-bottom: 1px solid rgba(255,255,255,0.1);
    background: #090909;
  }
  .mobile-nav a {
    min-height: 3.25rem;
    display: flex;
    align-items: center;
    gap: 0.85rem;
    border-bottom: 1px solid rgba(255,255,255,0.055);
    color: #d8d5d2;
    font-size: 0.95rem;
  }
  .mobile-nav a:last-child { border-bottom: 0; }
  .mobile-nav a.nav-link--active { color: #ff8178; }
  .mobile-nav-index { width: 1.2rem; color: #706b68; font-size: 0.67rem; letter-spacing: 0.08em; }
  .mobile-nav-contact { justify-content: space-between; color: #ff8178 !important; }
  .page-content { padding-top: 4.25rem; }
}

@media (prefers-reduced-motion: reduce) {
  .site-nav, .desktop-nav a, .desktop-nav a::after, .nav-contact, .menu-toggle span, .footer-link { transition-duration: 0.01ms !important; }
}
</style>
