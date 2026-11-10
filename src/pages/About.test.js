import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import About from './About.vue'

describe('About', () => {
  it('lets keyboard and touch users reveal the alternate avatar', async () => {
    const wrapper = mount(About)
    const avatar = wrapper.get('button[aria-controls="alternate-avatar"]')

    expect(avatar.attributes('aria-pressed')).toBe('false')
    await avatar.trigger('click')
    expect(avatar.attributes('aria-pressed')).toBe('true')
    expect(wrapper.get('#alternate-avatar').classes()).toContain('about-avatar-hover--visible')
  })

  it('keeps the verified education and practicum facts visible', () => {
    const wrapper = mount(About)
    expect(wrapper.text()).toContain('BSIT Graduate')
    expect(wrapper.text()).toContain('481 hours')
  })

  it('defers both below-fold portraits while preserving intrinsic dimensions', () => {
    const wrapper = mount(About)
    const portraits = wrapper.findAll('.about-avatar img')

    expect(portraits).toHaveLength(2)
    portraits.forEach((portrait) => {
      expect(portrait.attributes('loading')).toBe('lazy')
      expect(portrait.attributes('decoding')).toBe('async')
      expect(portrait.attributes('width')).toBe('128')
      expect(portrait.attributes('height')).toBe('128')
    })
  })
})
