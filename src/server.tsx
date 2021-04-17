import express from 'express'
import React from 'react'
import bodyParser from 'body-parser'
import cors from 'cors'

import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

import App from './components/App'

import redirects from './redirects'
import ssrData from './ssr-data'

import signup from './routes/signup'
import weather from './routes/ntp/weather'
import news from './routes/ntp/news'
import download from './routes/download'

import images from './assets'

let assets: any

const whitelist = [
  'https://dothq.co/',
  'https://ntp.dothq.co/',
  'https://compass.dothq.co/',
]

const syncLoadAssets = () => {
  assets = require(process.env.RAZZLE_ASSETS_MANIFEST!)
}
syncLoadAssets()

const server = express()

server.use(bodyParser.json())

server.use((req: express.Request, res: express.Response, next) => {
  res.header('X-Powered-By', 'me lon')
  res.header('Server', 'me lon')
  next()
})
server.use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
server.use((req: express.Request, res: express.Response, next) => {
  if (process.env.NODE_ENV === 'development') {
    res.header('Access-Control-Allow-Origin', '*')
    return next()
  }
  if (!req.path.startsWith('/api')) return next()

  if (!req.headers.origin || whitelist.includes(req.headers.origin)) {
    res.header('Access-Control-Allow-Origin', req.headers.origin)
    next()
  } else res.json({ ok: false, code: 'ORIGIN_BLOCKED_BY_CORS' })
})

// Implements redirects in a nice file format
// If you want to add a redirect, check the redirects.ts file
redirects.forEach((redirect) =>
  server.get(redirect.from, (_, res) => res.redirect(redirect.to))
)

server.use(async (req: express.Request, res: express.Response, next) => {
  if (req.path.startsWith('/api')) return next()

  const context = {}

  const markup = renderToString(
    <StaticRouter context={context} location={req.url}>
      <App />
    </StaticRouter>
  )
  const fullUrl = 'https://' + req.get('host') + req.originalUrl

  if (req.get('host') === 'new.dothq.co') {
    res.redirect(fullUrl.replace(/new.dothq.co/, 'www.dothq.co'))
  }

  const meta = `
  <meta name="author" content="Dot HQ">
  <meta name="description" content="Dot Browser is a privacy-conscious web browser with smarts built-in for protection against trackers and advertisements online.">
  <meta name="theme-color" content="#FFFFFE">
  <meta property="og:site_name" content="Dot HQ">
  <meta property="og:title" content="Get the browser that fights for your privacy.">
  <meta property="og:type" content="website">
  <meta property="og:image" content="${images.metaThumb}">
  <meta property="og:url" content="${fullUrl}">

  <meta name="twitter:card" content="summary">
  <meta name="twitter:site" content="@DotBrowser">
  <meta name="twitter:creator" content="@DotBrowser">
  <meta name="twitter:title" content="Get the browser that fights for your privacy.">
  <meta name="twitter:description" content="Dot Browser is a privacy-conscious web browser with smarts built-in for protection against trackers and advertisements online.">
  <meta name="twitter:image" content="${images.metaThumb}">
  <meta name="twitter:url" content="${fullUrl}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  `

  // TODO update meta image
  if (req.headers['user-agent']?.includes('Trident/')) {
    return res.send(`
      <!doctype html>
      <html lang="">
      <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <title>Dot HQ</title>
        ${meta}
        <link rel="shortcut icon" href="/favicon.png" />
      </head>
      <body>
        <marquee direction="right" width="200"><h1>Dot HQ</h1></marquee>
        <hr />
        <br />
        <i>Bravo.</i> You're probably the only person on earth that is still using Internet Explorer.
        <br />
        Unfortunately, our super-duper modern website does not support this relic.
        <br /><br />
        If you're using Internet Explorer to download Dot Browser, we're making it easy for you to download with zero pain.
        <br /><br />
        <a href="/api/downloads?product=browser&os=windows&language=${
          req.headers['accept-language']
            ? req.headers['accept-language']?.split(',')[0].replace(/-/g, '_')
            : 'en-US'
        }">Download Dot Browser for Windows</a>
        <br /><br />
        You could even browse our real site from <a href="https://web.archive.org/web/https://dothq.co/">The Wayback Machine</a>.
        <br /><br />
        <hr />
        <br />
        Some useful links:
        <ul>
          <li>
            <a href="https://twitter.com/DotBrowser">Twitter</a>
          </li>
          <li>
            <a href="https://discord.gg/wAh7thM">Discord</a>
          </li>
          <li>
            <a href="https://github.com/dothq">GitHub</a>
          </li>
        </ul>
        <br />
        <footer>
          <b>Last updated:</b> 1st April 1999 17:32
          <br />
          <hr />
          © Dot HQ
        </footer>
      </body>
    `)
  }

  res.send(
    `<!doctype html>
		<html lang="${req.headers['accept-language'] || 'en-GB'}">
		<head>
			<meta http-equiv="X-UA-Compatible" content="IE=edge" />
			<meta charSet='utf-8' />
			<title>Dot HQ</title>
			<meta name="viewport" content="width=device-width, initial-scale=1">
			${meta}
      <link rel="shortcut icon" href="/favicon.png" />
      <link rel="prerender" href="/" />
			${
        assets.client.css
          ? `<link rel="stylesheet" href="${assets.client.css}">`
          : ``
      }
			${
        process.env.NODE_ENV === 'production'
          ? `<script src="${assets.client.js}" defer></script>`
          : `<script src="${assets.client.js}" defer crossorigin></script>`
      }
		</head>
		<body class="${req.path === '/' ? 'dothq-is-home' : ''}">
      <div id="app">${markup}</div>
      <script id="__PAGE_DATA__" type="application/json">${JSON.stringify(
        ssrData[req.path] || {}
      )}</script>
		</body>
		</html>`
  )
})

server.use(signup)
server.use(weather)
server.use(news)
server.use(download)

export default server
