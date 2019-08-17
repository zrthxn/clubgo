import React, { Component } from 'react'
import { Input, InputGroup, InputGroupAddon, Button } from 'reactstrap'

import './scss/LoginPage.scss'

import { LoginService } from '@clubgo/features/api'

export interface LoginPageProps {
  onAuthenticate: Function
}
export class LoginPage extends Component<LoginPageProps> {
  state = {
    username: null,
    password: null
  }

  loginService = new LoginService('admin')

  render() {
    return (
      <div className="login-page">
        <div className="login">
          <h2 className="title">ClubGo Admin</h2>
          
          <div className="creds clearfix">
            <div className="title">
              <h3>Sign In</h3>
              <p>Please enter your username and password to sign in.</p>
            </div>

            <InputGroup>
              <Input type="text" placeholder="Username" required onChange={({target})=>{ this.setState({ username: target.value }) }}/>
            </InputGroup>

            <InputGroup>`
              <Input type="password" placeholder="Password" required onChange={({target})=>{ this.setState({ password: target.value }) }}/>
            </InputGroup>

            <Button color="link" className="forgot-pw float-left">Forgot Password?</Button>

            <Button color="primary" className="float-right" onClick={()=>{
              this.loginService.login('admin', 'admin').then(()=>{
                this.props.onAuthenticate()
              }).catch(()=>{
                alert('Invalid Login')
              })                
            }}>Sign In</Button>
          </div>

          <div>
            <p className="copyright">&copy; 2019 <strong>CLUBGO</strong> | All rights reserved</p>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginPage