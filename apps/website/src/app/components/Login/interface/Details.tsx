import React, { Component } from 'react'
import QueryString from 'query-string'

import { DatabaseService, LoginService } from '@clubgo/api'
import { handleChangeById as inputHandler, verifyRequirements } from '@clubgo/util'
import { Textbox } from '../../Textbox/Textbox'
import { Button } from '../../Button/Button'

interface DetailsProps {
  onComplete: Function
}

export class Details extends Component<DetailsProps> {  
  state = {
    isPhoneVerified: null,
    verifyEntries: false,
    verificationOTP: null,
    data: {
      name: null,
      email: null,
      phone: null
    },
    requiredFulfilled: false,
    required: [
      'name', 'email', 'phone'
    ],
    iterableMembers: []
  }

  loginService = new LoginService('user')

  handleChangeById = (event) => {
    this.setState((prevState, props)=>({
      data: inputHandler(event, this.state).data,
      requiredFulfilled: verifyRequirements(event, this.state)
    }))
  }

  verifyPhone = () => {
    this.loginService.getOTP(this.state.data.name, this.state.data.phone).then(({ data })=>{
      this.setState({
        verificationOTP: data.otp
      })
    })
  }

  finalize = () => {
    this.props.onComplete(this.state.data)
  }

  render() {
    if(!this.state.verifyEntries)
      return (
        <article>
          <section className="center">
            <h1 className="center light"><b>Details</b></h1>

            <p style={{ margin: 0 }}>We need the following details to take your booking</p>

            <section>
              <Textbox id="name" placeholder="Name" onChange={this.handleChangeById}/>
              <Textbox id="email" placeholder="Email" onChange={this.handleChangeById}/>
              <Textbox id="phone" placeholder="Phone" onChange={this.handleChangeById}/>
            </section>

            <section>
              <Button size="medium" onClick={()=>{
                if(this.state.requiredFulfilled) {
                  this.verifyPhone()
                  this.setState({
                    verifyEntries: true
                  })
                }
              }}>
                Submit
              </Button>
            </section>
          </section>
        </article>
      )
    else if(this.state.verifyEntries)
      return (
        <article>
          <section className="center">
            <h3>Verification</h3>
            <p>
              A One-Time Password (OTP) has been send to the phone number you entered. 
              Please enter that code here to verify your phone number.
            </p>

            <Textbox id="verificationOTP" placeholder="One-Time Password" 
              style={{ textAlign: 'center' }}
              onChange={({ target })=>{
                if(target.value===this.state.verificationOTP)
                  this.setState({
                    isPhoneVerified: true
                  })

                if(target.value.length===6 && target.value!==this.state.verificationOTP)
                  this.setState({
                    isPhoneVerified: false
                  })
              }}
            />

            {
              this.state.isPhoneVerified===true ? (
                <p><b>Phone Number Verified</b></p>
              ) : null
            }

            {
              this.state.isPhoneVerified===false ? (
                <p>Incorrect OTP</p>
              ) : null
            }

            <section>
              {
                this.state.isPhoneVerified===true ? (
                  <Button size="medium" onClick={()=>{
                    this.finalize()
                  }}>
                    Proceed
                  </Button>
                ) : null
              }
            </section>
          </section>
        </article>
      )
  }
}

export default Details
