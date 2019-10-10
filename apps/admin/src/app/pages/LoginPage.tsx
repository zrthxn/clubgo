import React, { Component } from 'react'
import { Input, InputGroup, InputGroupAddon, Button } from 'reactstrap'
// import { Paper, Grid, TextField, Button } from '@material-ui/core'

import './scss/LoginPage.scss'

import { LoginService } from '@clubgo/features/api'

interface LoginPageProps {
  onAuthenticate: Function
}

export class LoginPage extends Component<LoginPageProps> {
  state = {
    username: null,
    password: null,
    showForgotPassword: false,
    showPasswordReset: false,
    showPasswordResetValidation: true,
  }

  loginService = new LoginService('webmaster')

  componentDidMount() {
    this.loginService.authenticate()
  }

  loginWithCredentials = async () => {
    try {
      let { data } = await this.loginService.webmasterLogin('admin', 'admin')
      this.props.onAuthenticate(data)
    } catch (error) {
      alert('Invalid Login')
    }
  }

  startPasswordReset = async () => {
    this.setState({
      showPasswordReset: true
    })
  }

  loginWithOTP = () => {
    this.setState({
      showPasswordResetValidation: false
    })
  }

  attemptPasswordReset = async () => {

  }

  render() {
    return (
      <div className="login-page">
        <div className="login">
          <h2 className="title">ClubGo Admin</h2>
          
          {
            !this.state.showForgotPassword ? (
              <div className="creds clearfix">
                <div className="title">
                  <h3>Sign In</h3>
                  <p>Please enter your username and password to sign in.</p>
                </div>

                <InputGroup>
                  <Input type="text" placeholder="Username" required onChange={({target})=>{ this.setState({ username: target.value }) }}/>
                </InputGroup>

                <InputGroup>
                  <Input type="password" placeholder="Password" required onChange={({target})=>{ this.setState({ password: target.value }) }}/>
                </InputGroup>

                <Button color="link" className="forgot-pw float-left" onClick={()=>{
                  this.setState({
                    showForgotPassword: true
                  })
                }}>
                  Forgot Password?
                </Button>

                <Button color="primary" className="float-right" onClick={this.loginWithCredentials}>
                  Sign In
                </Button>
              </div>
            ) : (
              <div className="creds clearfix">
                {
                  !this.state.showPasswordReset ? (
                    <div>
                      <div className="title">
                        <h3>Forgot Password</h3>
                        <p>
                          Please enter your username. We will send a one-time password 
                          to your registered email address.
                        </p>
                      </div>
                      
                      <InputGroup>
                        <Input type="text" placeholder="Username" required onChange={({target})=>{ this.setState({ username: target.value }) }}/>
                      </InputGroup>

                      <Button color="primary" onClick={this.startPasswordReset}>
                        Confirm
                      </Button>
                    </div>
                  ) : (
                    this.state.showPasswordResetValidation ? (
                      <div>
                        <div className="title">
                          <h3>Forgot Password</h3>
                          <p>
                            Please enter the OTP sent to ab***@gmail.com
                          </p>
                        </div>
                        
                        <InputGroup>
                          <Input type="text" placeholder="One-Time Password" required onChange={({target})=>{ 
                            this.setState({ username: target.value }) 
                          }}/>
                        </InputGroup>

                        <Button color="primary" onClick={this.loginWithOTP}>
                          Confirm
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <div className="title">
                          <h3>Reset Password</h3>
                          <p>
                            Please reset your password.
                          </p>
                        </div>
                        
                        <InputGroup>
                          <Input type="text" placeholder="New Password" required/>
                        </InputGroup>

                        <Button color="primary" onClick={this.attemptPasswordReset}>
                          Confirm
                        </Button>
                      </div>
                    )
                  )
                }
              </div>
            )
          }

          <div>
            <p className="copyright">&copy; 2019 <strong>CLUBGO</strong> | All rights reserved</p>
          </div>
        </div>

        <div style={{
          textAlign: 'center',
          opacity: 0.25
        }}>
          <p>
            Built and Secured by 
            <a href="https://github.com/zrthxn" style={{ textDecoration: 'none', color: 'inherit', margin: '0 0.25em' }}>
              <b>ZRTHXN</b>
            </a>
          </p>
        </div>
      </div>
    )
  }
}

export default LoginPage