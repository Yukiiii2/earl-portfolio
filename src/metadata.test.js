import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const documentFromIndex = () => {
  const source = readFileSync(resolve(process.cwd(), 'index.html'), 'utf8')
  return new DOMParser().parseFromString(source, 'text/html')
}

describe('portfolio document metadata', () => {
  it('publishes crawl instructions as a real text asset', () => {
    const robots = readFileSync(resolve(process.cwd(), 'public', 'robots.txt'), 'utf8')
    const sitemap = readFileSync(resolve(process.cwd(), 'public', 'sitemap.xml'), 'utf8')

    expect(robots).toMatch(/^User-agent:\s*\*$/m)
    expect(robots).toMatch(/^Allow:\s*\/$/m)
    expect(robots).toMatch(/^Sitemap:\s*https:\/\/earl-portfolio-ten\.vercel\.app\/sitemap\.xml$/m)
    expect(sitemap).toContain('<loc>https://earl-portfolio-ten.vercel.app/</loc>')
  })

  it('describes Earl and the portfolio to search and social clients', () => {
    const page = documentFromIndex()
    const meta = (selector) => page.querySelector(selector)?.getAttribute('content')

    expect(page.title).toBe('Earl Ang — Frontend & Full-Stack Web Developer')
    expect(meta('meta[name="description"]')).toContain('responsive web applications')
    expect(page.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe('https://earl-portfolio-ten.vercel.app/')
    expect(meta('meta[property="og:title"]')).toBe('Earl Ang — Frontend & Full-Stack Web Developer')
    expect(meta('meta[property="og:description"]')).toContain('Vue, React, and full-stack')
    expect(meta('meta[property="og:image"]')).toBe('https://earl-portfolio-ten.vercel.app/Avatar.png')
    expect(meta('meta[name="twitter:card"]')).toBe('summary')
    expect(meta('meta[name="theme-color"]')).toBe('#070707')
  })

  it('discovers the mobile hero image early without a render-blocking font provider', () => {
    const page = documentFromIndex()
    const heroPreload = page.querySelector('link[rel="preload"][as="image"][href="/hero-sculpture-still.webp"]')

    expect(heroPreload?.getAttribute('media')).toBe('(max-width: 767px)')
    expect(page.querySelector('link[href*="fonts.googleapis.com"]')).toBeNull()
    expect(existsSync(resolve(process.cwd(), 'public', 'fonts', 'outfit-latin.woff2'))).toBe(true)
    expect(existsSync(resolve(process.cwd(), 'public', 'fonts', 'dm-mono-400-latin.woff2'))).toBe(true)
    expect(existsSync(resolve(process.cwd(), 'public', 'fonts', 'dm-mono-500-latin.woff2'))).toBe(true)
  })

  it('publishes the approved transparent portfolio mark at browser icon sizes', () => {
    const page = documentFromIndex()
    const iconHref = (selector) => page.querySelector(selector)?.getAttribute('href')

    expect(iconHref('link[rel="icon"][sizes="16x16"]')).toBe('/brand/earl-mark-16.png')
    expect(iconHref('link[rel="icon"][sizes="32x32"]')).toBe('/brand/earl-mark-32.png')
    expect(iconHref('link[rel="icon"][sizes="48x48"]')).toBe('/brand/earl-mark-48.png')
    expect(iconHref('link[rel="apple-touch-icon"]')).toBe('/brand/earl-mark-180.png')
    expect(iconHref('link[rel="manifest"]')).toBe('/site.webmanifest')
  })
})
