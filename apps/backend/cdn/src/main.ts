import { Content as cdn } from './app/Content'
import { conf } from '@clubgo/util'

const port = process.env.port || 4444

cdn.listen(port, () => {
  console.log(conf.Yellow(`Content Delivery Server`))
  console.log(conf.Green(`Listening at ${port}`))
})

cdn.on('error', console.error)
