import React, { Component } from 'react'

import { LoginContextProvider, LoginContext } from './LoginContext'
import Details from './interface/Details'
import { LoginService } from '@clubgo/api'

interface LoginManagerProps {
  onComplete: Function
  type: 'basic' | 'details' | 'full'
}

export class LoginManager extends Component<LoginManagerProps> {
  state = {

  }

  loginService = new LoginService('user')

  componentDidMount() {
    
  }

  BasicLogin(loginContext?) {
    return (
      <div></div>
    )
  }

  DetailsLogin(loginContext?) {
    return (
      <Details 
        onComplete={(data)=>{
          this.props.onComplete(data)
        }}
      />
    )
  }

  FullLogin(loginContext?) {
    
  }

  interfaceBuilder(loginContext) {
    if(this.props.type==='basic')
      return this.BasicLogin(loginContext)
    else if(this.props.type==='details')
      return this.DetailsLogin(loginContext)
  }

  render() {

    return (
      <LoginContextProvider>
        <LoginContext.Consumer>
          {
            loginContext => this.interfaceBuilder(loginContext)
          }
        </LoginContext.Consumer>
      </LoginContextProvider>
    )
  }
}

export default LoginManager
