import React, { Component } from 'react'
import { Grid, Paper, Modal } from '@material-ui/core'
import { TextField, Button } from '@material-ui/core'
import Select from 'react-select'

export interface OffersProps {
  syncParentData?: Function
}
export class Offers extends Component {
  render() {
    return (
      <Grid item container spacing={3}>
        <Grid item xs={12}>
          <Paper className="create-block">
            <div className="title">Offers</div>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default Offers
