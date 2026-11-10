import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Projects from './Projects.vue'

const projectSelector = (wrapper, title) => wrapper
  .findAll('.mobile-project-tabs button')
  .find((button) => button.text().includes(title))

describe('Projects', () => {
  it('opens with ProjectFlow as Volume 01 and exposes both verified actions', () => {
    const wrapper = mount(Projects)
    const showcase = wrapper.get('[data-project-showcase]')

    expect(showcase.get('h3').text()).toBe('ProjectFlow')
    expect(showcase.text()).toContain('Volume 01')
    const liveDemo = showcase.get('a[href="https://projectflow-s6xo.onrender.com/"]')
    expect(liveDemo.text()).toContain('Try Live Demo')
    expect(liveDemo.classes()).toContain('action-primary')
    expect(showcase.get('a[href="https://github.com/Yukiiii2/projectflow"]').text()).toContain('View Source')
    expect(showcase.get('img[alt*="ProjectFlow dashboard"]').attributes('loading')).toBe('lazy')
  })

  it('updates the case study when a different book is selected', async () => {
    const wrapper = mount(Projects)

    await projectSelector(wrapper, 'Voclaria').trigger('click')

    const showcase = wrapper.get('[data-project-showcase]')
    expect(showcase.get('h3').text()).toBe('Voclaria')
    expect(showcase.text()).toContain('Volume 02')
    expect(showcase.text()).toContain('student and teacher flows')
  })

  it('omits unavailable live actions instead of rendering placeholders', async () => {
    const wrapper = mount(Projects)

    await projectSelector(wrapper, 'MarianTBI Connect').trigger('click')

    const links = wrapper.findAll('[data-project-showcase] a').map((link) => link.attributes('href'))
    expect(links).toEqual(['https://github.com/BantawigP/TBI_marian'])
  })

  it('renders the four authentic brand marks on desktop covers and mobile selectors', () => {
    const wrapper = mount(Projects)
    const expectedSources = [
      '/projects/brands/projectflow-mark.svg',
      '/Speaksy.png',
      '/MarianTBI.jpg',
      '/BrightMinds.svg',
    ]

    const desktopMarks = wrapper.findAll('img[data-book-brand]')
    const mobileMarks = wrapper.findAll('img[data-mobile-brand]')

    expect(desktopMarks.map((image) => image.attributes('src'))).toEqual(expectedSources)
    expect(mobileMarks.map((image) => image.attributes('src'))).toEqual(expectedSources)
    expect([...desktopMarks, ...mobileMarks].every((image) => image.attributes('alt') === '')).toBe(true)
    expect([...desktopMarks, ...mobileMarks].every((image) => image.attributes('loading') === 'lazy')).toBe(true)
  })

  it('keeps visible project and gallery labels inside each accessible name', () => {
    const wrapper = mount(Projects)
    const selector = projectSelector(wrapper, 'ProjectFlow')
    const galleryButton = wrapper.findAll('.gallery-tabs button')[0]

    expect(selector.attributes('aria-label')).toBeUndefined()
    expect(selector.text()).toContain('Show project:')
    expect(selector.text()).toContain('ProjectFlow')
    expect(galleryButton.attributes('aria-label')).toBeUndefined()
    expect(galleryButton.text()).toContain('Show ProjectFlow image:')
    expect(galleryButton.text()).toContain('Dashboard')
  })

  it('keeps one clearly selected volume while switching the synchronized case study', async () => {
    const wrapper = mount(Projects)

    expect(wrapper.findAll('.project-book--selected')).toHaveLength(1)
    expect(wrapper.get('.project-book--selected').text()).toContain('ProjectFlow')

    await projectSelector(wrapper, 'BrightMinds').trigger('click')

    expect(wrapper.findAll('.project-book--selected')).toHaveLength(1)
    expect(wrapper.get('.project-book--selected').text()).toContain('BrightMinds')
    expect(wrapper.get('[data-project-showcase] h3').text()).toBe('BrightMinds')
  })

  it('connects every project selector to the labelled case-study region', () => {
    const wrapper = mount(Projects)
    const showcase = wrapper.get('#project-case-study')

    expect(showcase.attributes('aria-labelledby')).toBe('project-case-study-title')
    expect(showcase.get('#project-case-study-title').text()).toBe('ProjectFlow')
    expect(wrapper.findAll('button[aria-controls="project-case-study"]')).toHaveLength(8)
  })

  it('resets the screenshot gallery when the visitor returns to ProjectFlow', async () => {
    const wrapper = mount(Projects)

    await wrapper.findAll('.gallery-tabs button')[1].trigger('click')
    expect(wrapper.get('[data-project-showcase] img').attributes('src')).toContain('projectflow-kanban')

    await projectSelector(wrapper, 'Voclaria').trigger('click')
    await projectSelector(wrapper, 'ProjectFlow').trigger('click')

    expect(wrapper.get('[data-project-showcase] img').attributes('src')).toContain('projectflow-dashboard')
  })

  it('presents Voclaria as a branded mobile overview with capture limits kept secondary', async () => {
    const wrapper = mount(Projects)

    await projectSelector(wrapper, 'Voclaria').trigger('click')

    const overview = wrapper.get('[data-project-showcase] .project-overview--mobile')
    expect(overview.get('.overview-heading').text()).toBe('Mobile learning across student and teacher workflows')
    expect(overview.get('img').attributes('src')).toBe('/Speaksy.png')
    expect(overview.findAll('.overview-features li').map((item) => item.text())).toEqual([
      'Speaking and reading activities',
      'Class modules and teacher workflows',
      'Progress and results views',
      'Live and recorded learning experiences',
    ])
    expect(overview.get('.overview-evidence').text()).toContain('No genuine interface captures are committed')
    expect(overview.find('.fallback-note').exists()).toBe(false)
    expect(wrapper.find('[data-project-showcase] .image-frame').exists()).toBe(false)
  })

  it('presents MarianTBI Connect as a branded desktop overview without a dominant unavailable panel', async () => {
    const wrapper = mount(Projects)

    await projectSelector(wrapper, 'MarianTBI Connect').trigger('click')

    const overview = wrapper.get('[data-project-showcase] .project-overview--desktop')
    expect(overview.get('.overview-heading').text()).toBe('Program operations in one connected workspace')
    expect(overview.get('img').attributes('src')).toBe('/MarianTBI.jpg')
    expect(overview.findAll('.overview-features li').map((item) => item.text())).toEqual([
      'Contact and incubatee records',
      'Events and program coordination',
      'Team access and email verification',
      'Import and export workflows',
    ])
    expect(overview.get('.overview-evidence').text()).toContain('No genuine interface captures are committed')
    expect(overview.find('.fallback-note').exists()).toBe(false)
  })

  it('uses the genuine BrightMinds home, login, and role-selection screens in that order', async () => {
    const wrapper = mount(Projects)

    await projectSelector(wrapper, 'BrightMinds').trigger('click')

    expect(wrapper.get('[data-project-showcase] img').attributes('src')).toBe('/projects/brightminds-home-1280.jpg')
    expect(wrapper.get('[data-project-showcase] img').attributes('alt')).toContain('BrightMinds landing page')
    expect(wrapper.findAll('.gallery-tabs button').map((button) => button.text())).toEqual([
      'Show BrightMinds image: 01Home',
      'Show BrightMinds image: 02Login',
      'Show BrightMinds image: 03Role selection',
    ])
  })
})
