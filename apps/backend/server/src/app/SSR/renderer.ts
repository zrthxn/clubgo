import React from 'react'
import ReactDOMServer from 'react-dom/server'
import path from 'path'
import fs from 'fs'

// tslint:disable-next-line: nx-enforce-module-boundaries
import { Application, BUILD_PATH } from './application'

const Factory = React.createFactory(Application)
const isProd = process.env.NODE_ENV === 'production'

import { initProps } from './props'
import { lookup } from './mime'
import { control } from './cache'

/**
 * React Server Side Rendering Middleware
 * @param req Request Object
 * @param res Response Object
 * @param next Next Function
 */
export function Renderer(req, res, next) {
  const file = path.resolve(BUILD_PATH, 'index.html')
  fs.readFile(file, 'utf8', (err, html) => {
    if (err) return res.status(404).send(err)

    res.setHeader('Content-Type', lookup(req.url))
    res.setHeader('Cache-Control', control(isProd, 1))

    const render = ReactDOMServer.renderToString(Factory(initProps()))

    return res.send(
      html.replace('<div id="root"></div>', `<div id="root">${render}</div>`)
    )
  })
}