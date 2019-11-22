import * as crypto from 'crypto'
import { CLIENT_KEY, ENCRYPTOR } from '@clubgo/env'

// const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY
// const IV = 'IV'

/**
 * @todo
 * Validate CSRF
 */
export function requestValidation(req, res, next) {
  try {
    const token = req.headers['x-request-validation']
    const hash = crypto.createHmac('sha512', CLIENT_KEY).update(ENCRYPTOR).digest('base64')
    if(hash===token)
      next()
    else
      res.sendStatus(200)
  } catch (error) {
    res.sendStatus(500)
  }
}

/**
 * @todo
 * Validate access token 
 */

/** 
 * @todo
 * validate login token
 */