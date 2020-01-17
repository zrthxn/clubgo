import { createClient } from 'redis'

const REDIS_PORT = 6379
const client = createClient(REDIS_PORT)

/**
 * Perform key lookup on cache
 */
export function cacheLookup(key:string):Promise<any> {
  return new Promise((resolve, reject)=>{
    client.get(key, (err, data)=>{
      try {
        if(err) throw err
        if(data)
          resolve(JSON.parse(data))
        else 
          resolve(null)
      } catch (error) {
        reject(error)
      }
    })
  })
}

/**
 * Write or update cache item
 */
export async function cacheWrite(key:string, value:any, expiry?:number) {
  if(!expiry) expiry = 3600
  client.setex(key, expiry, JSON.stringify(value))
  return
}

/**
 * Expire a cache item
 */
export function cacheDelete(key:string) {
  client.expire(key, 1)
}