import { describe, expect, it } from 'vitest'
import { validateContact } from './contact-validation.js'

describe('validateContact', () => {
  it('returns focused guidance for invalid contact details', () => {
    expect(validateContact({ name: '', email: 'earl@invalid', message: 'Too short' })).toEqual({
      name: 'Please enter your name.',
      email: 'Enter a valid email address.',
      message: 'Please add a little more detail (at least 20 characters).',
    })
  })

  it('accepts a realistic inquiry', () => {
    expect(validateContact({
      name: 'Alex Rivera',
      email: 'alex@example.com',
      message: 'I would like to discuss a responsive web application.',
    })).toEqual({})
  })

  it('rejects the hidden honeypot field', () => {
    expect(validateContact({
      name: 'Alex', email: 'alex@example.com', message: 'This is a sufficiently detailed inquiry.', company: 'spam',
    })).toHaveProperty('company')
  })
})
