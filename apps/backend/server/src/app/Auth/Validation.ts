import * as crypto from 'crypto'
import { API_KEY, ENCRYPTOR } from '@clubgo/env'
import { NextFunction } from 'express'

import { GENERATOR, SECRET } from './Authentication'

/**
 * Validate CSRF
 */
export function requestValidation(req, res, next) {
  if(req.method==='OPTIONS') return res.sendStatus(200)

  const random = req.headers['x-request-validation']
  const token = req.headers['authorization']

  try {
    const hash = crypto.createHmac('sha512', SECRET).update(GENERATOR).update(random).digest('base64')
    if (hash === token)
      next()
    else
      throw new Error('Request Authentication Failed')
  } catch (error) {
    return res.status(401).send(error)
  }
}

export function ALLOW(key) {
  return function (req, res, next:NextFunction) {
    next()
  }
}

export function REJECT(key) {
  return function (req, res, next:NextFunction) {
    next()
  }
}

/** 
 * @todo
 * validate login token
 */