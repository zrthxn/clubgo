import React, { Component } from 'react'
import * as Rs from 'reactstrap'

import { Grid, Paper } from '@material-ui/core'
import { TextField, Button, Switch, Checkbox } from '@material-ui/core'

export class Settings extends Component {
  state = {
    isFeatured: false
  }

  render() {
    return (
      <Paper className="create-block">
        <h3 className="title">Settings</h3>

        <Grid container xs={12} spacing={3}>
          <Grid item xs={12}>
            <TextField fullWidth label="Event Priority (homepage) (num)" variant="outlined" margin="dense"/>
          </Grid>

          <Grid item xs={12}>
            <hr/>
            <Rs.Label>Featured Event</Rs.Label>
            <Checkbox color="primary" onChange={()=>{
              this.setState((prevState, props)=>({
                isFeatured: !this.state.isFeatured
              }))
            }}/>
          </Grid>

          {
            !this.state.isFeatured ? (
              <div></div>
            ) : (
              <Grid item xs={12}>
                <TextField fullWidth label="Featured Text" variant="outlined" margin="dense"/>
                <TextField fullWidth label="Priority (num)" variant="outlined" margin="dense"/>
              </Grid>
            )
          }

          <Grid item xs={12}>
            <hr/>
            <Rs.Label>Published</Rs.Label>
            <Switch defaultChecked color="primary"/>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

export default Settings