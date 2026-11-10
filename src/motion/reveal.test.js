import { describe, expect, it, vi } from 'vitest'
import { createRevealDirective } from './reveal.js'

const binding = (value = {}) => ({ value })

describe('reveal directive', () => {
  it('reveals an observed element once it enters the viewport', () => {
    const unobserve = vi.fn()
    let observerCallback
    const Observer = vi.fn(function (callback) {
      observerCallback = callback
      this.observe = vi.fn()
      this.unobserve = unobserve
      this.disconnect = vi.fn()
    })
    const directive = createRevealDirective({
      Observer,
      prefersReducedMotion: () => false,
    })
    const element = document.createElement('section')

    directive.mounted(element, binding({ delay: 80, variant: 'left' }))

    expect(element.dataset.revealState).toBe('pending')
    expect(element.dataset.revealVariant).toBe('left')
    expect(element.style.getPropertyValue('--reveal-delay')).toBe('80ms')

    observerCallback([{ target: element, isIntersecting: true }])

    expect(element.dataset.revealState).toBe('visible')
    expect(unobserve).toHaveBeenCalledWith(element)
  })

  it('keeps content visible when IntersectionObserver is unavailable', () => {
    const directive = createRevealDirective({
      Observer: undefined,
      prefersReducedMotion: () => false,
    })
    const element = document.createElement('section')

    directive.mounted(element, binding())

    expect(element.dataset.revealState).toBe('visible')
  })

  it('keeps content visible when observer initialization fails', () => {
    const directive = createRevealDirective({
      Observer: function BrokenObserver() { throw new Error('observer unavailable') },
      prefersReducedMotion: () => false,
    })
    const element = document.createElement('section')

    directive.mounted(element, binding())

    expect(element.dataset.revealState).toBe('visible')
  })

  it('skips observation when reduced motion is requested', () => {
    const Observer = vi.fn()
    const directive = createRevealDirective({
      Observer,
      prefersReducedMotion: () => true,
    })
    const element = document.createElement('section')

    directive.mounted(element, binding())

    expect(element.dataset.revealState).toBe('visible')
    expect(Observer).not.toHaveBeenCalled()
  })

  it('stops observing an element when it unmounts before reveal', () => {
    const unobserve = vi.fn()
    const Observer = vi.fn(function () {
      this.observe = vi.fn()
      this.unobserve = unobserve
      this.disconnect = vi.fn()
    })
    const directive = createRevealDirective({
      Observer,
      prefersReducedMotion: () => false,
    })
    const element = document.createElement('section')

    directive.mounted(element, binding())
    directive.unmounted(element)

    expect(unobserve).toHaveBeenCalledWith(element)
  })
})
