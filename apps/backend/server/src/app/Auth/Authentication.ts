import * as crypto from 'crypto'
import { CLIENT_KEY, ENCRYPTOR } from '@clubgo/env'

// const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY
// const IV = 'IV'

/**
 * @todo CSRF token generation from API Key
 */
export function generateRequestAuthentication(req, res) {
  const { shared } = req.body
  try {
    if(shared===CLIENT_KEY)
      res.send({ 
        message: 'AUTHENTICATED',
        token: crypto.createHmac('sha512', CLIENT_KEY).update(ENCRYPTOR).digest('base64')
      })
    else
      res.send({ message: 'INVALID_KEY' })
  } catch (error) {
    res.send({ message: 'ERROR' })
  }
}

/**
 * @todo
 * CSRF Secret generation on server restart
 * using fixed generator and random prime
 */
export function s() {

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
 * Unique Login token generation acc. to access level
 */