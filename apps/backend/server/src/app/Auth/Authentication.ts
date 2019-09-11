import crypto from 'crypto'

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY
const IV = 'IV'

/**
 * @todo
 * CSRF token generation from API Key
 */
export function generateRequestVerification(req, res) {

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