import { flushPromises, mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('three', async (importOriginal) => {
  const original = await importOriginal()
  return {
    ...original,
    WebGLRenderer: class {
      constructor() {
        throw new Error('WebGL unavailable')
      }
    },
  }
})

import Scene3D from './Scene3D.vue'

describe('Scene3D', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1024 })
    Object.defineProperty(navigator, 'hardwareConcurrency', { configurable: true, value: 8 })
    Object.defineProperty(navigator, 'deviceMemory', { configurable: true, value: 8 })
    Object.defineProperty(navigator, 'connection', { configurable: true, value: { saveData: false } })
    window.matchMedia = vi.fn().mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })
  })

  it.each([
    ['phone viewport', { width: 390 }],
    ['reduced-motion preference', { reducedMotion: true }],
    ['Save-Data preference', { saveData: true }],
    ['constrained desktop hardware', { hardwareConcurrency: 4 }],
  ])('uses the authentic static sculpture for a %s', async (_label, environment) => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: environment.width ?? 1024 })
    Object.defineProperty(navigator, 'hardwareConcurrency', { configurable: true, value: environment.hardwareConcurrency ?? 8 })
    Object.defineProperty(navigator, 'connection', { configurable: true, value: { saveData: environment.saveData ?? false } })
    window.matchMedia = vi.fn().mockReturnValue({
      matches: environment.reducedMotion ?? false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })

    const wrapper = mount(Scene3D)
    await flushPromises()
    await nextTick()

    expect(wrapper.attributes('data-render-state')).toBe('static')
    expect(wrapper.get('img').attributes('src')).toBe('/hero-sculpture-still.webp')
    expect(wrapper.find('canvas').exists()).toBe(false)
  })

  it('shows a composed fallback when WebGL cannot initialize', async () => {
    const wrapper = mount(Scene3D)
    await flushPromises()
    await nextTick()

    await vi.waitFor(() => {
      expect(wrapper.attributes('data-render-state')).toBe('fallback')
    })
    expect(wrapper.get('[role="img"]').attributes('aria-label')).toMatch(/abstract Möbius sculpture/i)
    expect(wrapper.get('img').attributes('src')).toBe('/hero-sculpture-still.webp')
  })
})
