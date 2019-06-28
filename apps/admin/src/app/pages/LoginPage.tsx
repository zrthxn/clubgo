import React, { Component } from 'react'
import { Input, InputGroup, InputGroupAddon, Button } from 'reactstrap'

import '../../assets/scss/LoginPage.scss'

// import { adminLogin } from '@clubgo/features/api'

export interface LoginPageProps {
  loginHandler: Function
}
export class LoginPage extends Component<LoginPageProps> {
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
              {/* <InputGroupAddon addonType="prepend">@</InputGroupAddon> */}
              <Input type="text" placeholder="Username" required />
            </InputGroup>

            <InputGroup>
              {/* <InputGroupAddon addonType="prepend">#</InputGroupAddon> */}
              <Input type="password" placeholder="Password" required />
            </InputGroup>

            <Button color="link" className="forgot-pw float-left">Forgot Password?</Button>

            <Button color="primary" className="float-right" onClick={ this.props.loginHandler }>Sign In</Button>
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