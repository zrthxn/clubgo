import React from 'react'
import ReactDOMServer from 'react-dom/server'
import path from 'path'
import fs from 'fs'

import { BUILD_PATH } from './application'

const MIMETypes = {
  '.js': 'application/javascript',
  '.map': 'application/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.html': 'text/html',
  '.txt': 'text/plain',
}

const ENV = process.env.NODE_ENV === 'production'

/**
 * React Server Side Rendering Middleware
 * @param req Request Object
 * @param res Response Object
 * @param next Next Function
 */
export function render(app, req, res) {
  const file = path.resolve(BUILD_PATH, 'index.html')

  fs.readFile(file, 'utf8', (err, html) => {
    if (err) return res.status(404).send(err)

    res.setHeader('Content-Type', mimeLookup(req.url))
    res.setHeader('Cache-Control', cacheControl(ENV, 1))

    const rendered = ReactDOMServer.renderToString(app)

    return res.send(
      html.replace('<div id="root"></div>', `<div id="root">${rendered}</div>`)
    )
  })
}

function mimeLookup(_path: string): string {
  const ext = path.extname(_path)
  const mime = MIMETypes[ext]

  if(_path==='/')
    return 'text/html'
  else if (!mime)
    throw new Error(`No mime type for file: ${_path}`)

  return mime
}

function cacheControl(isProd: boolean, days: number): string {
  const sec = days * 24 * 60 * 60

  if (days === 0 || !isProd)
    return 'public, no-cache, no-store, must-revalidate'

  return `public, max-age=${sec}`
}