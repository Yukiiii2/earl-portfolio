const VISIBLE_STATE = 'visible'
const PENDING_STATE = 'pending'
const VALID_VARIANTS = new Set(['up', 'left', 'right', 'scale'])

const markVisible = (element) => {
  element.dataset.revealState = VISIBLE_STATE
}

export const createRevealDirective = (options = {}) => {
  const Observer = Object.hasOwn(options, 'Observer')
    ? options.Observer
    : (typeof window !== 'undefined' ? window.IntersectionObserver : undefined)
  const prefersReducedMotion = options.prefersReducedMotion ?? (() => (
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  ))

  let observer = null
  let observerUnavailable = false
  const observedElements = new Set()

  const stopObserving = (element) => {
    if (!observedElements.has(element)) return
    observer?.unobserve(element)
    observedElements.delete(element)
  }

  const reveal = (element) => {
    markVisible(element)
    stopObserving(element)
  }

  const getObserver = () => {
    if (observer || observerUnavailable || !Observer) return observer

    try {
      observer = new Observer((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) reveal(entry.target)
        })
      }, {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.12,
      })
    } catch {
      observerUnavailable = true
    }

    return observer
  }

  return {
    mounted(element, binding = {}) {
      const settings = binding.value && typeof binding.value === 'object' ? binding.value : {}
      const delay = Math.min(Math.max(Number(settings.delay) || 0, 0), 240)
      const variant = VALID_VARIANTS.has(settings.variant) ? settings.variant : 'up'

      element.dataset.revealVariant = variant
      element.style.setProperty('--reveal-delay', `${delay}ms`)

      if (prefersReducedMotion() || !Observer) {
        markVisible(element)
        return
      }

      const activeObserver = getObserver()
      if (!activeObserver) {
        markVisible(element)
        return
      }

      element.dataset.revealState = PENDING_STATE
      observedElements.add(element)

      try {
        activeObserver.observe(element)
      } catch {
        reveal(element)
      }
    },

    unmounted(element) {
      stopObserving(element)
    },
  }
}
