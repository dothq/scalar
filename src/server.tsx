import express from 'express'
import React from 'react'
import bodyParser from 'body-parser'
import cors from 'cors'

import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

import App from './components/App'

import signup from './routes/signup'
import weather from './routes/ntp/weather'
import news from './routes/ntp/news'
import download from './routes/download'

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
  if(process.env.NODE_ENV === "development") {
    res.header('Access-Control-Allow-Origin', "*");
    return next();
  }
  if (!req.path.startsWith('/api')) return next()

  if (!req.headers.origin || whitelist.includes(req.headers.origin)) {
    res.header('Access-Control-Allow-Origin', req.headers.origin)
    next()
  } else res.json({ ok: false, code: 'ORIGIN_BLOCKED_BY_CORS' })
})

server.use((req: express.Request, res: express.Response, next) => {
  if (req.path.startsWith('/api')) return next()

  const context = {}

  const markup = renderToString(
    <StaticRouter context={context} location={req.url}>
      <App />
    </StaticRouter>
  )

  if(req.headers['user-agent']?.includes("Trident/")) {
    return res.send(`
      <!doctype html>
      <html lang="">
      <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <title>Dot HQ</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="shortcut icon" href="/favicon.png" />
      </head>
      <body>
        <h1>Dot HQ</h1>
        <hr />
        <br />
        <i>Bravo.</i> You're probably the only person on earth that is still using Internet Explorer.
        <br />
        Unfortunately, our super-duper modern website does not support this relic.
        <br /><br />
        If you're using Internet Explorer to download Dot Browser, we're making it easy for you to download with zero pain.
        <br /><br />
        <a href="/api/downloads?product=browser&os=windows&language=${req.headers['accept-language']?.split(",")[0].replace(/-/g, "_")}">Download Dot Browser for Windows</a>
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
        </footer>
      </body>
    `)
  }

  res.send(
    `<!doctype html>
		<html lang="">
		<head>
			<meta http-equiv="X-UA-Compatible" content="IE=edge" />
			<meta charSet='utf-8' />
			<title>Dot HQ</title>
			<meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="shortcut icon" href="/favicon.png" />
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
		<body>
			<div id="app">${markup}</div>
		</body>
		</html>`
  )
})

server.use(signup)
server.use(weather)
server.use(news)
server.use(download)

export default server
