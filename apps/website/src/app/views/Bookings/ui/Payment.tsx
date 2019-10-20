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
        <section className="center" style={{ display: 'flex', flexDirection: 'column' }}>
          <h1>Review Payment</h1>
          <h3>Please confirm your Booking</h3>

          <div style={{
            display: 'flex', flexDirection: 'row',
            width: '75%', margin: 'auto',
            fontSize: '1.5em'
          }}>
            <div style={{
              textAlign: 'left', flexGrow: 1
            }}>
              <p>Entry Fee</p>
              <p>Processing Fee</p>
              <p>Taxes</p>

              <h3>Total</h3>
            </div>

            <div style={{ textAlign: 'right' }}>
              <p>{ '\u20B9' + this.state.amount }</p>
              <p>{ '\u20B9' + this.state.processingFee.toFixed(2) }</p>
              <p>{ '\u20B9' + this.state.tax.toFixed(2) }</p>

              <h3>{ '\u20B9' + this.state.totalBookingAmount.toFixed(2) }</h3>
            </div>
          </div>

          <Button size="large" style={{ margin: '2em auto' }} onClick={()=>{
            this.props.onComplete(this.state)
          }}>
            Confirm
          </Button>
        </section>
      </article>
    )
  }
}

export default Payment
