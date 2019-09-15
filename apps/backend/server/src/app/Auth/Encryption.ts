import crypto, { Cipher } from 'crypto'

require('dotenv').config()

const ENCRYPTION_KEY = process.env.CLIENT_KEY
const IV_LENGTH = 16
const ALGO = 'aes-256-cbc'

type ISupportedEncodings = 'base64' | 'ascii' | 'hex'

/**
 * Encrypts the given string with the client key stored in the 
 * environment variables
 * @param text Text to be encrypted
 * @param encoding Output encoding `optional`
 */
export function encrypt(text:string, encoding?:ISupportedEncodings) {
  if(encoding===undefined)
    encoding = 'hex'

  const iv = crypto.randomBytes(IV_LENGTH)
  const cipher = crypto.createCipheriv(ALGO, Buffer.from(ENCRYPTION_KEY), iv)
  
  let encrypted = cipher.update(Buffer.from(text))
  encrypted = Buffer.concat([encrypted, cipher.final()])

  return iv.toString(encoding) + ':' + encrypted.toString(encoding)
}

/**
 * Decrypts the given string which was encrypted by `encrypt`
 * @param text Text to be decrypted
 * @param encoding Input encoding
 */
export function decrypt(text:string, encoding?:ISupportedEncodings) {
  if(encoding===undefined)
    encoding = 'hex'

  const textParts = text.split(':')
  const iv = Buffer.from(textParts.shift(), encoding)

  const encryptedText = Buffer.from(textParts.join(':'), encoding)
  const decipher = crypto.createDecipheriv(ALGO, Buffer.from(ENCRYPTION_KEY), iv)
  
  let decrypted = decipher.update(encryptedText)
  decrypted = Buffer.concat([decrypted, decipher.final()])

  return decrypted.toString()
}
