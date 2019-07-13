import React, { Component } from 'react'
import { Label } from 'reactstrap'
import { Grid, Paper } from '@material-ui/core'
import { TextField, Button, Switch, Checkbox } from '@material-ui/core'

export class Settings extends Component {
  state = {
    isFeatured: false
  }

  render() {
    return (
      <Grid container xs={12}>
        <Grid item xs={12}>
          <Paper className="create-block">
            <h3 className="title">Settings</h3>

            <Grid container xs={12} spacing={3}>
              <Grid item xs={6}>
                <Switch defaultChecked color="primary"/>                
                <Label>Published</Label>
              </Grid>

              <Grid item xs={6}>
                <Switch color="primary" onChange={()=>{
                  this.setState((prevState, props)=>({
                    isFeatured: !this.state.isFeatured
                  }))
                }}/>
                <Label>Featured</Label>
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
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className="create-block">
            <h3 className="title">Priority</h3>

            <Grid container xs={12} spacing={3}>
              <Grid item xs={12}>
                <TextField fullWidth label="Event Priority (homepage) (num)" variant="outlined" margin="dense"/>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

      </Grid>
    )
  }
}

export default Settings