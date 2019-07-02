import React, { Component } from 'react'
import { Label, DropdownItem } from 'reactstrap'
import { Grid, Paper } from '@material-ui/core'
import { TextField, Button, InputLabel, OutlinedInput } from '@material-ui/core'
import { FormControl, Select, MenuItem } from '@material-ui/core'

export class VenueDetails extends Component {
  render() {
    return (
      <Paper className="create-block">
        <h3 className="title">Venue</h3>

        <Grid container xs={12} spacing={3}>
          <Grid item xs={12}>
            <TextField required fullWidth label="Event Name" variant="outlined"/>
            <TextField required multiline fullWidth label="Description" variant="outlined" margin="dense"/>
            <TextField required fullWidth label="Category (chips)" variant="outlined" margin="dense"/>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

export default VenueDetails