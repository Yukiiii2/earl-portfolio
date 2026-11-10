import { describe, expect, it } from 'vitest'

import { visibleProjectLinks } from './project-links.js'

describe('visibleProjectLinks', () => {
  it('returns verified live and source actions', () => {
    expect(visibleProjectLinks({
      live: 'https://projectflow-s6xo.onrender.com/',
      liveLabel: 'Try Live Demo',
      source: 'https://github.com/Yukiiii2/projectflow',
    })).toEqual([
      {
        href: 'https://projectflow-s6xo.onrender.com/',
        label: 'Try Live Demo',
        kind: 'primary',
      },
      {
        href: 'https://github.com/Yukiiii2/projectflow',
        label: 'View Source',
        kind: 'secondary',
      },
    ])
  })

  it.each(['', '#', 'https://linkedin.com/in/yourhandle'])('omits placeholder destination %s', (destination) => {
    expect(visibleProjectLinks({ live: destination, source: destination })).toEqual([])
  })
})
