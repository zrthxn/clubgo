import * as express from 'express'
import * as path from 'path'

export const Content = express()
export const ContentRouter = express.Router()

import { SectorRouter } from './routes/SectorRouter'

const config = require('../assets/config.json')
const { __storagedir } = config

Content.use( '/static/root', express.static( path.join(__storagedir, 'root', 'static') ) )

Content.use('/:sectorName', (req, res, next)=>{
  const { sectorName } = req.params
  if(sectorName===config.localSectorName) {
    SectorRouter(req, res, next)
  }
  else {
    if(config.sectors.hasOwnProperty(sectorName)) {
      const sector = config.sectors[sectorName]
      res.redirect(sector.ip + ':' + sector.port + '/' + sectorName)
    }
    else {
      return res.status(404).send({
        message: 'Invalid Sector Name'
      })
    }
  }
})
