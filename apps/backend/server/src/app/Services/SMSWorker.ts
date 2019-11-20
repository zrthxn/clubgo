import axios from 'axios'
import { stringify, parse } from 'querystring'
import { SMS_TXTLCL_APIKEY as APIKEY } from '@clubgo/env'

require('dotenv').config()

const SENDER = 'CLUBGO'

/**
 * Send an SMS
 * @param to Recipient
 * @param template Template Name
 * @param message Message
 */
export default async function SendSMS(to:string, template:string, message:string) {
  const URI = 'https://api.textlocal.in/send/'
  const params = stringify({
    apiKey: APIKEY,
    sender: SENDER,
    numbers: to,
    template, message
  })

  try {
    let { data } = await axios.post(URI + '?' + params)
    if(data.status==='success')
      return data
    else
      throw data
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}

export async function SendTemplateSMS(to:string, templateId:string, content:string) {

}

export async function SendBulkTemplateSMS(to:string[], templateId:string, content:string[]|string) {
  let template = await FetchTemplate(templateId)
}

/**
 * Send a series of messages to list of recipients
 * @param to Recipient
 * @param template Template Name
 * @param message Message
 */
export async function SendBulkSMS(to:string[], template:string, message:string) {
  for (const recipient of to) {
    await SendSMS(recipient, template, message)
  }
}

/**
 * Find a template by title or ID
 * @param template Template title or ID
 */
export async function FetchTemplate(template?:string) {
  const URI = 'https://api.textlocal.in/get_templates/'
  const params = stringify({
    apiKey: APIKEY
  })

  try {
    let { data } = await axios.post(URI + '?' + params)
    for (const item of data.templates) {
      if(item.title===template || item.id===template)
        return item
    }
  } catch (error) {
    console.error(error)
    return Promise.reject(error)
  }
}
