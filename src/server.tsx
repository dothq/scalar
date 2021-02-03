import express from 'express';
import React from 'react';
import bodyParser from 'body-parser';
import cors from 'cors';

import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import App from './components/App';

import signup from './routes/signup';
import weather from './routes/ntp/weather';

let assets: any;

const whitelist = [
	"https://dothq.co/",
	"https://ntp.dothq.co/",
	"https://compass.dothq.co/"
]

const syncLoadAssets = () => {
	assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
};
syncLoadAssets();

const server = express()

server.use(bodyParser.json());

server.disable('x-powered-by')
server.use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
server.use((req: express.Request, res: express.Response, next) => {
	if(!req.path.startsWith("/api")) return next();

	if(!req.headers.origin || whitelist.includes(req.headers.origin)) {
		next();
	} else res.json({ ok: false, code: "ORIGIN_BLOCKED_BY_CORS" })
})

server.use((req: express.Request, res: express.Response, next) => {
	if(req.path.startsWith("/api")) return next();

	const context = {};

	const markup = renderToString(
		<StaticRouter context={context} location={req.url}>
			<App />
		</StaticRouter>
	);

	res.send(
		`<!doctype html>
		<html lang="">
		<head>
			<meta http-equiv="X-UA-Compatible" content="IE=edge" />
			<meta charSet='utf-8' />
			<title>Dot HQ</title>
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<link rel="shortcut icon" href="favicon.png" />
			${assets.client.css ? `<link rel="stylesheet" href="${assets.client.css}">` : ``}
			${process.env.NODE_ENV === 'production'
				? `<script src="${assets.client.js}" defer></script>`
				: `<script src="${assets.client.js}" defer crossorigin></script>`
			}
		</head>
		<body>
			<div id="app">${markup}</div>
		</body>
		</html>`
	);
});

server.use(signup);
server.use(weather);

export default server;
