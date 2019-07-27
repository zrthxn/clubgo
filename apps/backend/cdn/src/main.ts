import { Content as cdn } from './app/Content'
import { conf } from '@clubgo/util'

const port = process.env.port || 4444

cdn.listen(port, () => {
  console.log(conf.Yellow(`CDN Listening at ${port}`))
})

cdn.on('error', console.error)
