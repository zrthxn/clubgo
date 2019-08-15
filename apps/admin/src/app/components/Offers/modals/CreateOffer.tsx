import React, { Component } from 'react'
import { Paper, Grid, TextField, Button } from '@material-ui/core'

import '../../scss/Offers.scss'

export interface CreateOfferProps {
  onConfirm: Function,
  onCancel: Function
}
export default class CreateOffer extends Component<CreateOfferProps> {
  state = {
    data: {

    }
  }

  render() {
    return (
      <Paper className="create-offer-modal">
        <Grid container spacing={3}>

          <Grid item xs={6}>
            <Button onClick={(e)=>{
              this.props.onCancel()
            }}>
              Close
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button onClick={(e)=>{
              this.props.onConfirm(this.state.data)
            }}>
              Create
            </Button>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}
