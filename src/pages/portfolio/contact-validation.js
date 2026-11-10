const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const validateContact = ({ name = '', email = '', message = '', company = '' }) => {
  const errors = {}
  const normalizedName = name.trim()
  const normalizedEmail = email.trim()
  const normalizedMessage = message.trim()

  if (!normalizedName) errors.name = 'Please enter your name.'
  else if (normalizedName.length > 80) errors.name = 'Please keep your name under 80 characters.'

  if (!normalizedEmail) errors.email = 'Please enter your email.'
  else if (!emailPattern.test(normalizedEmail)) errors.email = 'Enter a valid email address.'

  if (!normalizedMessage) errors.message = 'Please tell me a little about your inquiry.'
  else if (normalizedMessage.length < 20) errors.message = 'Please add a little more detail (at least 20 characters).'
  else if (normalizedMessage.length > 3000) errors.message = 'Please keep your message under 3,000 characters.'

  if (company.trim()) errors.company = 'Unable to submit this form.'
  return errors
}
