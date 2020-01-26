import { conf } from '@clubgo/util'
import * as crypto from 'crypto'
import * as ENV from '@clubgo/env'

export var GENERATOR, SECRET

/**
 * @todo CSRF token generation from API Key
 */
export function generateRequestAuthentication(req, res) {
  const { apiKey } = req.body

  try {
    if (apiKey !== undefined) {
      if (apiKey !== ENV.API_KEY) //decrypt(apiKey, 'base64'))
        return res.status(403).send('ERR_INVALID_APIKEY')
    }
    else
      throw new Error('ERR_NO_APIKEY')

    const random = crypto.randomBytes(32).toString('base64')
    const authToken = crypto.createHmac('sha512', SECRET).update(GENERATOR).update(random).digest('base64')

    res.send({
      key: random,
      token: authToken
    })
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

/**
 * @todo
 * CSRF Secret generation on server restart
 * using fixed generator and random prime
 */
export function recalculateSecurityValues() {
  console.log(conf.Blue('Recalculating Security Values'))
  GENERATOR = crypto.randomBytes(64).toString('base64')
  SECRET = crypto.randomBytes(256).toString('base64')
}

/** 
 * @todo
 * CSRF according to access level
 */

/** 
 * @todo
 * Access token generation according to access level
 */

/** 
 * @todo
 * Unique Login token generation according to access level
 */