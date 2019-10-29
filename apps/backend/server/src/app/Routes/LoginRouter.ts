import express from 'express'
import path from 'path'
import { User, Webmaster } from '@clubgo/database'
import { conf } from '@clubgo/util'
import SendSMS from '../Services/SMSWorker'

export const LoginRouter = express.Router()
export default LoginRouter
// ========================================================

// Security Functions
// --------------------------------------------------------
LoginRouter.use((req, res, next)=>{
  next()
})

// --------------------------------------------------------
LoginRouter.post('/otp', async (req, res)=>{
  let { user } = req.body
  let { name, phone } = user

  let otp = ''
  for(let i=0; i<6; i++)
    otp += Math.floor( Math.random() * 10 ).toString()

  await SendSMS(phone, 'otp', `Your ClubGo verification OTP is ${otp}.`)

  res.json({
    otp
  })
})

LoginRouter.post('/webmaster', async (req, res)=>{
  let { login } = req.body

  const LoginWebmaster = await Webmaster.findOne({ username: login.username })
})

LoginRouter.post('/user', async (req, res)=>{
  let { login } = req.body
  
  const LoginUser = await User.findOne({ username: login.username })
})

// STOP ============================================== STOP
