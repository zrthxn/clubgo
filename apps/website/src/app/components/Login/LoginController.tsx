import React, { Component } from 'react'
import Details from './Details'

interface LoginControllerProps {
  onComplete: Function
  type: 'details' | 'basic'
}

export class LoginController extends Component<LoginControllerProps> {
  render() {
    if(this.props.type==='basic')
      return (
        <div></div>
      )
    else if(this.props.type==='details')
      return (
        <Details 
          onComplete={(data)=>{
            this.props.onComplete(data)
          }}
        />
      )
  }
}

export default LoginController
