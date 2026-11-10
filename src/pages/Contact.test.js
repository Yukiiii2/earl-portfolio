import { mount, flushPromises } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Contact from './Contact.vue'

describe('Contact', () => {
  beforeEach(() => { vi.stubGlobal('fetch', vi.fn()) })

  it('does not send invalid form data and exposes inline errors', async () => {
    const wrapper = mount(Contact)
    await wrapper.get('form').trigger('submit')

    expect(fetch).not.toHaveBeenCalled()
    expect(wrapper.get('#contact-name-error').text()).toBe('Please enter your name.')
  })

  it('keeps the verified Formspree endpoint and reports a successful submission', async () => {
    fetch.mockResolvedValue({ ok: true, json: async () => ({ ok: true }) })
    const wrapper = mount(Contact)
    await wrapper.get('#contact-name').setValue('Alex Rivera')
    await wrapper.get('#contact-email').setValue('alex@example.com')
    await wrapper.get('#contact-message').setValue('I would like to discuss a responsive web application.')
    await wrapper.get('form').trigger('submit')
    await flushPromises()

    expect(wrapper.get('form').attributes('action')).toBe('https://formspree.io/f/xqpawldp')
    expect(fetch).toHaveBeenCalledWith('https://formspree.io/f/xqpawldp', expect.objectContaining({ method: 'POST' }))
    expect(wrapper.get('[role="status"]').text()).toContain('message was sent')
  })
})
