import { clubgoServer as server } from './app/Server'
const port = process.env.port || 3333

server.listen(port, () => {
  console.log(`Listening at ${port}`)
})

server.on('error', console.error)
