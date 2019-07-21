import React, { Component } from 'react'
import * as Rs from 'reactstrap'

import { Grid, Paper } from '@material-ui/core'
import { TextField, Button, Switch, Checkbox } from '@material-ui/core'
import { InputAdornment } from '@material-ui/core'
import { Link } from '@material-ui/icons'

export class Images extends Component {
  render() {
    return (
      <Paper className="create-block">
        <h3 className="title">Images</h3>

        <Grid item container xs={12} spacing={3}>
          <Grid item xs={12}>
            <div><Button variant="outlined" color="primary">Upload Image</Button></div>
          </Grid>

          <Grid item xs={12}>
            <Rs.Label>Video URL</Rs.Label>
            <TextField fullWidth variant="outlined" margin="dense" placeholder="https://example.com/video"
              InputProps={{
                startAdornment: <InputAdornment position="start">
                  <Link/>
                </InputAdornment>,
              }}
            />
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

export default Images