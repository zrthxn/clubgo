import express from 'express'
import path from 'path'
import { User, Webmaster } from '@clubgo/database'
import { conf } from '@clubgo/util'

export const LoginRouter = express.Router()
export default LoginRouter
// ========================================================

// Security Functions
// --------------------------------------------------------

LoginRouter.post('/_login/webmaster', async (req, res)=>{
  let { login } = req.body

  const LoginWebmaster = await Webmaster.findOne({ username: login.username })
})

LoginRouter.post('/_login/user', async (req, res)=>{
  let { login } = req.body
  
  const LoginUser = await User.findOne({ username: login.username })
})

// STOP ============================================== STOP
