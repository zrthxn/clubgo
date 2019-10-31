import React, { Component } from 'react'
import { IEventModel } from '@clubgo/database'
import { Grid } from '@material-ui/core'
import './Checkout.scss'

import { Button } from '../Button/Button'
import LoginManager from '../Login/LoginManager'
import RootContext from '../../RootContext'

interface CheckoutProps {
  onComplete: Function
  payment: any
  options?: any
}

export class Checkout extends Component<CheckoutProps> {
  state = {
    loginValidated: false,
    user: {
      name: null,
      email: null,
      phone: null
    },
    payment: {
      transactionId: Date.now().toString(36),
      isBookingAmountPaid: false,
      amount: this.props.payment,
      processingFee: 0,
      tax: 0,
      total: 0
    }
  }

  componentDidMount() {
    this.calculatetax(this.state.payment.amount)
  }
  
  calculatetax = (amount) => {
    let total = 0, { payment } = this.state
    let processingFee = amount * (this.props.options.processingFeePercent/100)
    let tax = processingFee * (this.props.options.taxPercent/100)

    total = amount + processingFee + tax

    payment.total = total
    payment.processingFee = processingFee
    payment.tax = tax
    this.setState({
      payment
    })
  }

  onConfirm = () => {
    this.props.onComplete(this.state.user, this.state.payment)
  }

  render() {
    if(this.state.loginValidated)
      return (
        <RootContext.Consumer>
          {
            appContext => (
              <article className="checkout">
                <section className="container center">
                  <div className="head">
                    <h1 className="light">Review Payment</h1>
                    <h3>Please confirm your Booking</h3>
                  </div>
                </section>

                <section className="container">
                  <div className="payment-details">
                    <div style={{ textAlign: 'left', flexGrow: 1 }}>
                      <b><span>Entry Fee</span></b><br/>
                      <p>Processing Fee</p>
                      <p>Taxes</p>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <b><span>&#x20B9; { this.state.payment.amount.toFixed(2) }</span></b><br/>
                      <p>&#x20B9; { this.state.payment.processingFee.toFixed(2) }</p>
                      <p>&#x20B9; { this.state.payment.tax.toFixed(2) }</p>
                    </div>
                  </div>

                  <div className="totals">
                    <h3>Total</h3>
                    <h2>&#x20B9; { this.state.payment.total.toFixed(2) }</h2>
                  </div>
                </section>

                <section className="center">
                  <Button size="medium" onClick={this.onConfirm}>
                    Confirm
                  </Button>
                </section>
              </article>
            )
          }
        </RootContext.Consumer>
      )
    else
      return (
        <LoginManager type="details"
          onComplete={(user)=>{
            this.setState({
              loginValidated: true,
              user
            })
          }}
        />
      )
  }
}

export default Checkout
