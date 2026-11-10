import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App.vue'

vi.mock('vue-router', () => ({
  useRoute: () => ({ name: 'home' }),
  useRouter: () => ({ resolve: ({ hash }) => ({ href: hash }) }),
}))

class IntersectionObserverStub {
  observe() {}
  disconnect() {}
}

describe('portfolio identity', () => {
  beforeEach(() => {
    vi.stubGlobal('IntersectionObserver', IntersectionObserverStub)
  })

  it('uses the same approved symbol in navigation and footer while naming Earl Ang', () => {
    const wrapper = mount(App, {
      global: {
        stubs: { RouterView: true },
      },
    })

    const navigationBrand = wrapper.get('.brand-mark')
    const footerBrand = wrapper.get('.footer-brand')

    expect(navigationBrand.attributes('aria-label')).toBe('Earl Ang, home')
    expect(navigationBrand.get('img').attributes('src')).toBe('/brand/earl-mark-48.png')
    expect(navigationBrand.get('img').attributes('alt')).toBe('')
    expect(footerBrand.get('img').attributes('src')).toBe('/brand/earl-mark-48.png')
    expect(footerBrand.text()).toContain('Earl Ang')
  })

  it('contains keyboard focus in the open mobile navigation and releases page scrolling', async () => {
    const wrapper = mount(App, {
      attachTo: document.body,
      global: { stubs: { RouterView: true } },
    })
    const trigger = wrapper.get('.menu-toggle')

    await trigger.trigger('click')
    await nextTick()

    const menuLinks = wrapper.findAll('#mobile-navigation a')
    expect(document.activeElement).toBe(menuLinks[0].element)
    expect(document.body.style.overflow).toBe('hidden')
    expect(document.documentElement.style.overflow).toBe('hidden')

    menuLinks.at(-1).element.focus()
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }))
    expect(document.activeElement).toBe(trigger.element)

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true }))
    expect(document.activeElement).toBe(menuLinks.at(-1).element)

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await nextTick()
    expect(trigger.attributes('aria-expanded')).toBe('false')
    expect(document.activeElement).toBe(trigger.element)
    expect(document.body.style.overflow).toBe('')
    expect(document.documentElement.style.overflow).toBe('')

    wrapper.unmount()
  })

  it('clears the mobile scroll lock when the app unmounts', async () => {
    const wrapper = mount(App, {
      attachTo: document.body,
      global: { stubs: { RouterView: true } },
    })

    await wrapper.get('.menu-toggle').trigger('click')
    await nextTick()
    wrapper.unmount()

    expect(document.body.style.overflow).toBe('')
    expect(document.documentElement.style.overflow).toBe('')
  })
})
