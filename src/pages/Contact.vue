<script setup>
import { ref } from 'vue'
import { DATA } from './portfolio/data.js'

const formspreeEndpoint = 'https://formspree.io/f/xqpawldp'
const isSubmitting = ref(false)
const submissionStatus = ref('')

const submitForm = async (event) => {
  if (isSubmitting.value) return

  const form = event.currentTarget
  isSubmitting.value = true
  submissionStatus.value = ''

  try {
    const response = await fetch(formspreeEndpoint, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    })
    const result = await response.json().catch(() => null)

    if (!response.ok || result?.ok === false || result?.errors?.length) {
      throw new Error('Formspree rejected the submission.')
    }

    form.reset()
    submissionStatus.value = 'success'
  } catch {
    submissionStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section class="mx-auto max-w-6xl px-6 py-16 md:py-20 lg:py-24" aria-labelledby="contact-heading">
    <div class="mb-10 border-t border-white/15 pt-5">
      <p class="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-[#ff766d]">Contact / 05</p>
    </div>

    <div class="grid items-start gap-12 md:grid-cols-[0.92fr_1.08fr] md:gap-10 lg:gap-16">
      <div data-aos="fade-up">
        <h2 id="contact-heading" class="max-w-xl text-4xl font-medium leading-[1.04] tracking-[-0.055em] text-[#f1eeeb] sm:text-5xl lg:text-[3.5rem]">
          Ready to start<br class="hidden sm:block" /> a project<span class="text-[#ff574e]">?</span>
        </h2>
        <p class="mt-6 max-w-lg text-base leading-7 text-[#aaa5a1]">
          Whether you have a specific idea in mind, need help scaling an existing web application, or just want to explore opportunities, I'm ready to help bring your vision to life.
        </p>

        <div class="mt-9 max-w-lg divide-y divide-white/10 border-y border-white/10">
          <div data-aos="fade-up" data-aos-delay="50" class="flex gap-4 py-4">
            <svg class="mt-0.5 h-4 w-4 shrink-0 text-[#ff766d]" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            <div>
              <h3 class="text-sm font-medium text-[#f1eeeb]">Direct Communication</h3>
              <p class="mt-1 text-sm leading-6 text-[#817a75]">Your message goes straight to my inbox. I aim to respond within 24 hours.</p>
            </div>
          </div>
          <div data-aos="fade-up" data-aos-delay="100" class="flex gap-4 py-4">
            <svg class="mt-0.5 h-4 w-4 shrink-0 text-[#ff766d]" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
            <div>
              <h3 class="text-sm font-medium text-[#f1eeeb]">Full-Stack Execution</h3>
              <p class="mt-1 text-sm leading-6 text-[#817a75]">From clean UI design to secure backend database integrations.</p>
            </div>
          </div>
        </div>
      </div>

      <div data-aos="fade-up" class="border-t border-white/15 pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0 lg:pl-10">
        <div class="mb-7">
          <h3 class="text-lg font-medium tracking-tight text-[#f1eeeb]">Send an inquiry</h3>
          <p class="mt-1 text-sm leading-6 text-[#817a75]">Fill out the details below and I'll get back to you.</p>
        </div>

        <form :action="formspreeEndpoint" method="POST" class="space-y-5" :aria-busy="isSubmitting" @submit.prevent="submitForm">
          <div class="grid gap-5 lg:grid-cols-2">
            <div>
              <label for="contact-name" class="mb-2 block text-xs font-medium text-[#d2cdca]">Name</label>
              <input id="contact-name" type="text" name="name" autocomplete="name" placeholder="Your name" required class="contact-field">
            </div>
            <div>
              <label for="contact-email" class="mb-2 block text-xs font-medium text-[#d2cdca]">Email</label>
              <input id="contact-email" type="email" name="email" autocomplete="email" placeholder="you@company.com" required class="contact-field">
            </div>
          </div>

          <div>
            <label for="contact-type" class="mb-2 block text-xs font-medium text-[#d2cdca]">How can I help?</label>
            <div class="relative">
              <select id="contact-type" name="project_type" class="contact-field appearance-none pr-10">
                <option value="frontend">Frontend Web Development</option>
                <option value="fullstack">Full-Stack Application</option>
                <option value="freelance">Freelance / Contract Work</option>
                <option value="other">General Inquiry</option>
              </select>
              <svg class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#817a75]" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m7 10 5 5 5-5" /></svg>
            </div>
          </div>

          <div>
            <label for="contact-message" class="mb-2 block text-xs font-medium text-[#d2cdca]">Message details</label>
            <textarea id="contact-message" name="message" rows="4" placeholder="Tell me a bit about your project or inquiry..." required class="contact-field min-h-32 resize-y"></textarea>
          </div>

          <button type="submit" :disabled="isSubmitting" class="inline-flex min-h-12 w-full items-center justify-center gap-3 bg-[#ee5149] px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#ff6359] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff8178] disabled:cursor-wait disabled:opacity-70 motion-reduce:transition-none sm:w-auto">
            {{ isSubmitting ? 'Sending...' : 'Send Message' }}
            <svg v-if="!isSubmitting" class="h-4 w-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 20 20"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.5 10h12m-5-5 5 5-5 5" /></svg>
          </button>
          <p v-if="submissionStatus === 'success'" class="text-sm leading-6 text-[#a9d6b3]" role="status" aria-live="polite" aria-atomic="true">
            Thanks, your message was sent.
          </p>
          <p v-else-if="submissionStatus === 'error'" class="text-sm leading-6 text-[#ff8178]" role="alert" aria-atomic="true">
            Your message could not be sent. Please try again.
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-field {
  display: block;
  width: 100%;
  min-height: 2.9rem;
  border: 1px solid rgba(255,255,255,.14);
  border-radius: 0.2rem;
  background: rgba(255,255,255,.025);
  padding: 0.7rem 0.85rem;
  color: #f1eeeb;
  font: inherit;
  font-size: 0.875rem;
  line-height: 1.5;
  transition: border-color 160ms ease, background-color 160ms ease;
}
.contact-field::placeholder { color: #817a75; opacity: 1; }
.contact-field:hover { border-color: rgba(255,255,255,.26); }
.contact-field:focus-visible { border-color: #ff766d; outline: 2px solid rgba(255,118,109,.24); outline-offset: 2px; }
.contact-field:user-invalid { border-color: #ff766d; }
.contact-field option { background: #111; color: #f1eeeb; }
textarea.contact-field { min-height: 8rem; }

@media (prefers-reduced-motion: reduce) {
  .contact-field { transition-duration: 0.01ms; }
  :deep([data-aos]) {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
</style>
