import React, { Component } from 'react'
import { Paper, Grid } from '@material-ui/core'

export class EventListing extends Component {
  render() {
    return (
      <div>
        <Grid container xs={12} spacing={1}>
          <Grid item xs={12}>
            <Paper>
              <p>Item 1</p>
            </Paper>
          </Grid>
          
          <Grid item xs={12}>
            <Paper>
              <p>Item 1</p>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper>
              <p>Item 1</p>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default EventListing