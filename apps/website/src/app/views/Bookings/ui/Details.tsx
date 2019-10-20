import React, { Component } from 'react'
import QueryString from 'query-string'

import { handleChangeById as inputHandler, verifyRequirements } from '@clubgo/util'
import { Textbox, Button } from '@clubgo/website/components'
import RootContext from '../../../RootContext'

interface DetailsProps {
  onComplete: Function
}

export class Details extends Component<DetailsProps> {
  static contextType = RootContext
  context!: React.Context<typeof RootContext>
  
  state = {
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

  handleChangeById = (event) => {
    this.setState((prevState, props)=>({
      data: inputHandler(event, this.state).data,
      requiredFulfilled: verifyRequirements(event, this.state)
    }))
  }

  finalize = () => {

  }

  render() {
    return (
      <article>
        <section className="center">
          <h1 className="center">Details</h1>

          <p>We need the following details to take your booking</p>

          <section>
            <Textbox id="name" placeholder="Name" onChange={this.handleChangeById}/>
            <Textbox id="email" placeholder="Email" onChange={this.handleChangeById}/>
            <Textbox id="phone" placeholder="Phone" onChange={this.handleChangeById}/>
          </section>

          <section>
            <RootContext.Consumer>
              {
                appContext => (
                  <Button size="large" onClick={()=>{
                    appContext.actions.setUserLogin(this.state.data)
                    this.props.onComplete()
                  }}>
                    Submit
                  </Button>
                )
              }
            </RootContext.Consumer>
          </section>
        </section>
      </article>
    )
  }
}

export default Details
