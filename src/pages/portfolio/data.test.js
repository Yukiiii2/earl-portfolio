import { describe, expect, it } from 'vitest'

import { DATA } from './data.js'

describe('portfolio project order', () => {
  it('opens the project experience with ProjectFlow', () => {
    expect(DATA.projects[0]?.title).toBe('ProjectFlow')
  })

  it('keeps every verified project in the approved volume order', () => {
    expect(DATA.projects.map(({ title }) => title)).toEqual([
      'ProjectFlow',
      'Voclaria',
      'MarianTBI Connect',
      'BrightMinds',
    ])
  })

  it('uses the verified ProjectFlow stack and real application captures', () => {
    const projectFlow = DATA.projects[0]

    expect(projectFlow.tags).toEqual([
      'React',
      'TypeScript',
      'Express',
      'PostgreSQL',
      'Neon',
      'Render',
    ])
    expect(projectFlow.images.map(({ src }) => src)).toEqual([
      '/projects/projectflow-dashboard-1280.jpg',
      '/projects/projectflow-kanban-1280.jpg',
    ])
  })

  it('does not expose unverified live destinations', () => {
    const marian = DATA.projects.find(({ id }) => id === 'marian-tbi')
    const brightMinds = DATA.projects.find(({ id }) => id === 'brightminds')

    expect(marian.live).toBeFalsy()
    expect(brightMinds.live).toBeFalsy()
  })

  it('describes the verified BrightMinds application stack', () => {
    const brightMinds = DATA.projects.find(({ id }) => id === 'brightminds')

    expect(brightMinds.tags).toEqual(['Vue.js', 'Supabase', 'FastAPI', 'Vite'])
  })

  it('provides a traceable cover brand for every archive volume', () => {
    expect(DATA.projects.map(({ id, brand }) => ({
      id,
      src: brand?.src,
      name: brand?.name,
      source: brand?.source,
    }))).toEqual([
      {
        id: 'projectflow',
        src: '/projects/brands/projectflow-mark.svg',
        name: 'ProjectFlow linked-chain mark',
        source: 'Yukiiii2/projectflow public/favicon.svg',
      },
      {
        id: 'voclaria',
        src: '/Speaksy.png',
        name: 'Voclaria Speaksy product mark',
        source: 'Yukiiii2/Voclaria assets/Speaksy.png',
      },
      {
        id: 'marian-tbi',
        src: '/MarianTBI.jpg',
        name: 'MarianTBI Connect project artwork',
        source: 'Original portfolio asset public/MarianTBI.jpg',
      },
      {
        id: 'brightminds',
        src: '/BrightMinds.svg',
        name: 'BrightMinds graduation-cap mark',
        source: 'Portfolio public/BrightMinds.svg',
      },
    ])
  })

  it('uses genuine screens when available and explicit fallbacks otherwise', () => {
    const voclaria = DATA.projects.find(({ id }) => id === 'voclaria')
    const marian = DATA.projects.find(({ id }) => id === 'marian-tbi')
    const brightMinds = DATA.projects.find(({ id }) => id === 'brightminds')

    expect(voclaria.images).toEqual([])
    expect(voclaria.galleryFallback).toMatchObject({ type: 'mobile', logo: '/Speaksy.png' })
    expect(marian.images).toEqual([])
    expect(marian.galleryFallback).toMatchObject({ type: 'desktop', logo: '/MarianTBI.jpg' })
    expect(brightMinds.images.map(({ src }) => src)).toEqual([
      '/projects/brightminds-home-1280.jpg',
      '/projects/brightminds-login-1280.jpg',
      '/projects/brightminds-roles-1280.jpg',
    ])
  })
})
