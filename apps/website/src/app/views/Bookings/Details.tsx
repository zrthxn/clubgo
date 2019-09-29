import React, { Component } from 'react'

import { handleChangeById as inputHandler, verifyRequirements } from '@clubgo/util'
import { Textbox, Button } from '@clubgo/website/components'

interface DetailsProps {
  onComplete: Function
}

export class Details extends Component<DetailsProps> {
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

  render() {
    return (
      <article>
        <section className="center">
          <h1 className="center">Details</h1>

          <p>We need the following details to take your booking</p>

          <section>
            <Textbox id="name" placeholder="Name" onChange={this.handleChangeById}/>
            <Textbox id="email" placeholder="Email" onChange={this.handleChangeById}/>
            <Textbox id="phone" placeholder="phone" onChange={this.handleChangeById}/>
          </section>

          <section>
            <Button size="large" onClick={()=>{
              // if(this.state.requiredFulfilled)
                this.props.onComplete()
            }}>
              Submit
            </Button>
          </section>
        </section>
      </article>
    )
  }
}

export default Details
