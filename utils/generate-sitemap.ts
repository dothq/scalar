import { spawn } from 'child_process'
import Crawler from 'crawler'
import { writeFileSync } from 'fs'
import { resolve } from 'path'

// const port = Math.floor(1000 + Math.random() * 9000);

spawn(`node`, ['build/server.js'], { stdio: 'pipe' })

const links = new Set()

const c = new Crawler({
  maxConnections: 10,
  callback: (err, res, done) => {
    if (err) throw err

    const { $ } = res

    $('a[href]').each((i, e: any) => {
      let { href } = e.attribs

      if (href.length == 0) return
      if (href.startsWith('#')) return
      if (!href.startsWith('/')) return

      href = href.split('#')[0]

      links.add(href)

      console.log(href)
    })

    done()
  },
})

setTimeout(() => {
  c.queue(`http://localhost:3000?t=${Date.now()}`)
}, 1500)

c.on('drain', () => {
  console.log('Drained')

  const sitemap = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
  ]

  Array.from(links).forEach((link) => {
    const d = new Date()

    sitemap.push(
      `   <url>
        <loc>https://new.dothq.co${link}</loc>
        <lastmod>${d.getFullYear()}-${(d.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1</priority>
    </url>`
    )
  })

  sitemap.push('</urlset>')

  writeFileSync(
    resolve(process.cwd(), 'public', 'sitemap.xml'),
    sitemap.join('\n')
  )

  console.log('Done generating sitemap.')
  process.exit(0)
})
