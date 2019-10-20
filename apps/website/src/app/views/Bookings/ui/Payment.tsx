import React, { Component } from 'react'
import { IEventModel } from '@clubgo/database'
import { Grid } from '@material-ui/core'
import { Button } from '@clubgo/website/components'

interface PaymentProps {
  onComplete: Function
  payment: any
  options?: any
}

export class Payment extends Component<PaymentProps> {
  state = {
    transactionId: Date.now().toString(36),
    bookingAmountPaid: false,
    amount: this.props.payment.subtotal,
    processingFee: this.props.payment.processingFee,
    tax: this.props.payment.tax,
    totalBookingAmount: this.props.payment.total
  }

  render() {
    return (
      <article>
        <section>
          <Grid container spacing={3}>
            <Grid>
              <Button onClick={()=>{
                this.props.onComplete(this.state)
              }}>
                Confirm
              </Button>
            </Grid>
          </Grid>
        </section>
      </article>
    )
  }
}

export default Payment
