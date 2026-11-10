<script setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { DATA } from './pages/portfolio/data.js'

const route = useRoute()
const router = useRouter()
const isMenuOpen = ref(false)
const isScrolled = ref(false)
const activeSection = ref('')
const PORTFOLIO_MARK = '/brand/earl-mark-48.png'

const navigation = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Experience', id: 'experience' },
]

let sectionObserver
const menuTrigger = ref(null)

const updateScrollState = () => {
  isScrolled.value = window.scrollY > 12
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const handleGlobalKeydown = (event) => {
  if (!isMenuOpen.value) return

  if (event.key === 'Escape') {
    closeMenu()
    menuTrigger.value?.focus()
    return
  }

  if (event.key === 'Tab') {
    const menuLinks = [...document.querySelectorAll('#mobile-navigation a')]
    const focusableItems = [menuTrigger.value, ...menuLinks].filter(Boolean)
    if (!focusableItems.length) return

    event.preventDefault()
    const currentIndex = focusableItems.indexOf(document.activeElement)
    const nextIndex = event.shiftKey
      ? (currentIndex <= 0 ? focusableItems.length - 1 : currentIndex - 1)
      : (currentIndex + 1) % focusableItems.length
    focusableItems[nextIndex].focus()
  }
}

const sectionHref = (id) => route.name === 'home'
  ? `#${id}`
  : router.resolve({ name: 'home', hash: `#${id}` }).href

onMounted(() => {
  updateScrollState()
  window.addEventListener('scroll', updateScrollState, { passive: true })
  window.addEventListener('keydown', handleGlobalKeydown)

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
  window.removeEventListener('keydown', handleGlobalKeydown)
  sectionObserver?.disconnect()
  document.body.style.overflow = ''
  document.documentElement.style.overflow = ''
})

watch(isMenuOpen, async (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
  document.documentElement.style.overflow = open ? 'hidden' : ''
  if (open) {
    await nextTick()
    document.querySelector('#mobile-navigation a')?.focus()
  }
})
</script>

<template>
  <a class="skip-link" href="#main-content">Skip to main content</a>
  <div class="site-shell min-h-screen relative overflow-hidden z-10 pb-10">
    <div aria-hidden="true" class="ambient-light"></div>

    <nav
      aria-label="Main navigation"
      class="site-nav fixed top-0 inset-x-0 z-50 transition-colors duration-300"
      :class="{ 'site-nav--scrolled': isScrolled }"
    >
      <div class="nav-inner">
        <a :href="sectionHref('top')" class="brand-mark" aria-label="Earl Ang, home" @click="closeMenu">
          <img :src="PORTFOLIO_MARK" alt="" width="48" height="48">
        </a>

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
            ref="menuTrigger"
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

      <Transition name="mobile-menu">
        <div v-show="isMenuOpen" id="mobile-navigation" class="mobile-nav" role="dialog" aria-modal="true" aria-label="Mobile navigation">
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
      </Transition>
    </nav>

    <main id="main-content" class="page-content pt-20 min-h-[80vh]" tabindex="-1">
      <router-view />
    </main>

    <footer class="mx-auto flex w-full max-w-6xl flex-col items-start gap-y-3 border-t border-white/10 px-6 py-5 text-xs text-[#817a75] sm:flex-row sm:items-center sm:justify-between sm:gap-x-6 sm:py-4">
      <div class="footer-brand">
        <img :src="PORTFOLIO_MARK" alt="" width="38" height="38" loading="lazy" decoding="async">
        <div>
          <strong>Earl Ang</strong>
          <p>© {{ new Date().getFullYear() }} {{ DATA.name }} {{ DATA.lastName }}. Designed and built with care.</p>
        </div>
      </div>
      <nav aria-label="Social links" class="flex flex-wrap gap-x-5">
        <a :href="DATA.links.github" target="_blank" rel="noopener noreferrer" class="footer-link">GitHub</a>
        <a v-if="DATA.links.linkedin && !DATA.links.linkedin.endsWith('/yourhandle')" :href="DATA.links.linkedin" target="_blank" rel="noopener noreferrer" class="footer-link">LinkedIn</a>
        <a :href="DATA.links.twitter" target="_blank" rel="noopener noreferrer" class="footer-link">Twitter / X</a>
      </nav>
    </footer>
  </div>
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
  transition:border-color 220ms ease,background-color 220ms ease;
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
  width: 2.7rem;
  height: 2.7rem;
  display: grid;
  place-items: center;
  justify-self: start;
  border-radius: .55rem;
  transition: transform 180ms ease, background 180ms ease;
}

.brand-mark img { width: 2.55rem; height: 2.55rem; display: block; object-fit: contain; filter: drop-shadow(0 .3rem .5rem rgba(0,0,0,.32)); }
.brand-mark:hover { transform: translateY(-1px); background: rgba(255,255,255,.035); }
.brand-mark:active { transform:translateY(0) scale(.97); }
.brand-mark:focus-visible { outline: 2px solid #ff8178; outline-offset: 3px; }

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
  transition: color 180ms ease, border-color 180ms ease, background 180ms ease, transform 180ms ease;
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
.nav-contact:hover { border-color: #ff8178; background: rgba(255, 81, 72, 0.09); color: #fff; transform:translateY(-1px); }
.nav-contact:active { transform:translateY(0); }
.menu-toggle { display: none; }
.mobile-nav { display: none; }

.footer-brand { display: flex; align-items: center; gap: .75rem; }
.footer-brand img { width: 2.2rem; height: 2.2rem; display: block; object-fit: contain; }
.footer-brand strong { display: block; color: #d9d3cf; font-size: .72rem; font-weight: 600; letter-spacing: .025em; }
.footer-brand p { margin: .13rem 0 0; color: #77716d; font-size: .65rem; }
.footer-link { min-width: 2.75rem; min-height: 2.75rem; display: inline-flex; align-items: center; justify-content: center; color: #aaa5a1; transition: color 160ms ease,transform 160ms ease; }
.footer-link:hover { color: #ff8178; transform:translateY(-1px); }
.footer-link:focus-visible { outline: 2px solid #ff8178; outline-offset: 3px; }

@media (max-width: 767px) {
  .site-nav { padding-top: env(safe-area-inset-top); }
  .nav-inner { width: 100%; height: 4.25rem; grid-template-columns: 1fr auto; padding-inline: max(1.25rem, env(safe-area-inset-left)) max(1.25rem, env(safe-area-inset-right)); }
  .brand-mark { width: 2.75rem; height: 2.75rem; }
  .brand-mark img { width: 2.4rem; height: 2.4rem; }
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
  .menu-toggle { transition:border-color 180ms ease,background 180ms ease,transform 180ms ease; }
  .menu-toggle:hover { border-color:rgba(255,255,255,.28); background:rgba(255,255,255,.05); }
  .menu-toggle:active { transform:scale(.96); }
  .menu-toggle[aria-expanded="true"] span:first-child { transform: translateY(0.2rem) rotate(45deg); }
  .menu-toggle[aria-expanded="true"] span:last-child { transform: translateY(-0.2rem) rotate(-45deg); }
  .mobile-nav {
    display: flex;
    position: fixed;
    inset: calc(4.25rem + env(safe-area-inset-top)) 0 0;
    flex-direction: column;
    overflow-y: auto;
    overscroll-behavior: contain;
    padding: 0.75rem max(1.25rem, env(safe-area-inset-right)) max(1.25rem, env(safe-area-inset-bottom)) max(1.25rem, env(safe-area-inset-left));
    border-top: 1px solid rgba(255,255,255,0.06);
    background: radial-gradient(circle at 85% 12%, rgba(242,85,76,.09), transparent 34%), rgba(8,8,8,.985);
    box-shadow: 0 1.5rem 3rem rgba(0,0,0,.38);
  }
  .mobile-nav a {
    min-height: 3.5rem;
    display: flex;
    align-items: center;
    gap: 0.85rem;
    border-bottom: 1px solid rgba(255,255,255,0.055);
    color: #d8d5d2;
    font-size: 0.95rem;
    transition:color 180ms ease,background 180ms ease;
  }
  .mobile-nav a:hover { background:rgba(255,255,255,.025); color:#fff; }
  .mobile-nav a:last-child { border-bottom: 0; }
  .mobile-nav a.nav-link--active { color: #ff8178; }
  .mobile-nav-index { width: 1.2rem; color: #706b68; font-size: 0.67rem; letter-spacing: 0.08em; }
  .mobile-nav-contact { justify-content: space-between; color: #ff8178 !important; }
  .page-content { padding-top: calc(4.25rem + env(safe-area-inset-top)); }
}

.mobile-menu-enter-active,.mobile-menu-leave-active { transition:opacity 220ms ease,transform 280ms cubic-bezier(.2,.78,.2,1); }
.mobile-menu-enter-from,.mobile-menu-leave-to { opacity:0; transform:translate3d(0,-.45rem,0); }

@media (prefers-reduced-motion: reduce) {
  .site-nav, .brand-mark, .desktop-nav a, .desktop-nav a::after, .nav-contact, .menu-toggle, .menu-toggle span, .mobile-nav a, .footer-link, .mobile-menu-enter-active, .mobile-menu-leave-active { transition-duration: 0.01ms !important; }
}
</style>
