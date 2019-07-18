import express from 'express'
import mongoose from 'mongoose'
import { conf } from '@clubgo/util'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'

export const ClubgoServer = express()
export default ClubgoServer

ClubgoServer.use(cookieParser())
ClubgoServer.use(bodyParser.json())
ClubgoServer.use(bodyParser.urlencoded({ extended: true }))
ClubgoServer.use(express.json())
ClubgoServer.use(express.urlencoded({ extended: true }))

import AdminRouter from './AdminRouter/AdminRouter'
import WebRouter from './WebsiteRouter/WebsiteRouter'
import { database as Database } from '@clubgo/database'

Database.connect({ db: 'clubgo' })
  .then(() => console.log(conf.Magenta('Ready')))
  .catch((e) => console.log(conf.Red(e)) )

ClubgoServer.get('/', (req, res)=>{
  res.send({ message: 'clubgo' })
})

ClubgoServer.use('/api', WebRouter)

ClubgoServer.use('/admin', AdminRouter)
