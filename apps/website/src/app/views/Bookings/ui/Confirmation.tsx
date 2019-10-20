import React, { Component } from 'react'
import { IBookingModel } from '@clubgo/database'

interface ConfirmationProps {
  booking: IBookingModel
}

export default class Confirmation extends Component<ConfirmationProps> {
  render() {
    return (
      <div>
        <h1>Confirmation</h1>
      </div>
    )
  }
}
