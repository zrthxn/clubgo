import { _Server as server } from './app/Server'
import { conf } from '@clubgo/util'

const port = process.env.port || 3333

server.listen(port, () => {
  console.log(conf.Yellow(`Backend API Server`))
  console.log(conf.Green(`Listening at ${port}`))
})

server.on('error', console.error)
