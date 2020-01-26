import { _Server as server } from './app/Server'
import { conf } from '@clubgo/util'

import * as Auth from './app/Auth/Authentication'

import Gmailer from './app/Services/Gmailer'
import Sheets from './app/Services/Sheets'

const port = process.env.port || 3333

server.listen(port, async () => {
  console.log(conf.Yellow(`Backend API Server`))
  console.log(conf.Green(`Listening at ${port}`))

  Auth.recalculateSecurityValues() 
  
  await (new Gmailer()).TestGmailer()
  await (new Sheets()).TestGSheets()
})

server.on('error', console.error)
