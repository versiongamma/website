import 'dotenv/config';
import express, { Request as ExpressRequest } from 'express';
import { readFile } from 'fs';
import path from 'path';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import {
  StaticHandlerContext,
  StaticRouterProvider,
  createStaticHandler,
  createStaticRouter,
} from 'react-router-dom/server';

import { routes } from './pages/routes';
import videoRouter from './api/routes/video/video';
import photosRouter from './api/routes/photos/photos';
import { logRequest } from './api/utils/logger';

const createFetchRequest = (req: ExpressRequest) => {
  const origin = `${req.protocol}://${req.get('host')}`;
  const url = new URL(req.originalUrl || req.url, origin);

  const controller = new AbortController();
  req.on('close', () => controller.abort());

  const headers = new Headers();

  for (const [key, values] of Object.entries(req.headers)) {
    if (values) {
      if (Array.isArray(values)) {
        for (const value of values) {
          headers.append(key, value);
        }
      } else {
        headers.set(key, values);
      }
    }
  }

  const init: RequestInit = {
    method: req.method,
    headers,
    signal: controller.signal,
  };

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = req.body;
  }

  return new Request(url.href, init);
};

const app = express();
const handler = createStaticHandler(routes);

app.set('trust proxy', true);

app.use(videoRouter);
app.use(photosRouter);

// Serve static files (any request for a path with a file extension)
app.get(/.*\..*/, async (req, res) => {
  logRequest(req);

  const requestedFilePath =
    req.path[req.path.length - 1] === '/' ? req.path.slice(0, -1) : req.path;
  const filePath = path.join(__dirname, `public/${requestedFilePath}`);

  res.sendFile(filePath);
});

// Serve site pages
app.get('*', async (req, res) => {
  logRequest(req);
  
  const fetchRequest = createFetchRequest(req);
  const context = (await handler.query(fetchRequest)) as StaticHandlerContext;

  if (context.statusCode === 404) {
    return res.redirect('/');
  }

  const router = createStaticRouter(handler.dataRoutes, context);

  const app = renderToString(
    createElement(StaticRouterProvider, { router, context })
  );

  const indexFile = path.join(__dirname, 'public/index.html');

  readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong: ', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    console.log(`Serving [${req.url}]`);
    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  });
});

const {PORT, HOST_IP} = process.env;

app.listen(PORT, HOST_IP, () =>
  console.log(
    `⚡️ Site is now live, server listening on ${HOST_IP}:${process.env.PORT}`
  )
);
