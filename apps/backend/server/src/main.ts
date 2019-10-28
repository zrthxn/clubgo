import { _Server as server } from './app/Server'
import { conf } from '@clubgo/util'

import Gmailer from './app/Services/Gmailer'
import Sheets from './app/Services/Sheets'

const port = process.env.port || 3333

server.listen(port, () => {
  console.log(conf.Yellow(`Backend API Server`))
  console.log(conf.Green(`Listening at ${port}`))

  const Mailer = new Gmailer()
  Mailer.TestGmailer().then(()=>{
    const GSheets = new Sheets()
    GSheets.TestGSheets()
  })
})

server.on('error', console.error)
