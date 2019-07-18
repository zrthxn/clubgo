import React, { Component } from 'react'

import { Grid, Paper } from '@material-ui/core'
import { TextField, Button, InputLabel, OutlinedInput } from '@material-ui/core'

export class VenueHours extends Component {
  render() {
    return (
      <Paper className="create-block">
        <h3 className="title">Opening Hours</h3>

        <Grid container xs={12} spacing={3}>
          <Grid item xs={12}>

          </Grid>
        </Grid>
      </Paper>
    )
  }
}

export default VenueHours