import React, { Component } from 'react'
import { Label, DropdownItem } from 'reactstrap'
import { Grid, Paper } from '@material-ui/core'
import { TextField, Button, InputLabel, OutlinedInput } from '@material-ui/core'
import { FormControl, Select, MenuItem } from '@material-ui/core'

export class EventDetails extends Component {
  state = {
    selectedArtist: null,
    loadedArtists: [
      1,2,3,4,5
    ]
  }

  artistMenuBuilder() {
    return this.state.loadedArtists.map((ar, i)=>{
      return (
        <DropdownItem key={`artist-${i}`}>Action</DropdownItem>
      )
    })
  }

  render() {
    // Event Details Section  ----------------------------------------------  Event Details Section
    // ============================================================================================
    return (
      <Paper className="create-block">
        <h3 className="title">Event</h3>
        
        <Grid container xs={12} spacing={3}>                
          <Grid item xs={12}>
            <Label>Details</Label>
            <TextField required fullWidth label="Event Name" variant="outlined"/>
            <TextField required multiline fullWidth label="Description" variant="outlined" margin="dense"/>
            <TextField required fullWidth label="Category (chips)" variant="outlined" margin="dense"/>
          </Grid>

          <Grid item xs={6}>
            <Label>Tagline</Label>
            <TextField fullWidth label="Tagline" variant="outlined" margin="dense"/>
            <TextField fullWidth label="Flash Text" variant="outlined" margin="dense"/>
          </Grid>

          <Grid item xs={6}>
            <Label>Performers</Label>
            <div style={{padding: '0.5em'}}><Button variant="contained" color="primary">Select Artist</Button></div>
            <div style={{padding: '0.5em'}}><Button variant="contained" color="primary">Select Music</Button></div>
          </Grid>

          <Grid item xs={3}>
            <Label>Dress Code</Label>
            {/* <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-age-simple">Age</InputLabel>
              <Select input={
                <OutlinedInput labelWidth={12} name="age" id="outlined-age-simple" 
                />
              }>
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl> */}
            <TextField fullWidth label="Dress Code" variant="outlined" margin="dense"/>
          </Grid>

          <Grid item xs={9}>
            <Label>Tags</Label>
            <TextField fullWidth label="Tags (chips)" variant="outlined" margin="dense"/>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

export default EventDetails 