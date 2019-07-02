import React, { Component } from 'react'
import * as Rs from 'reactstrap'

import { Grid, Paper, InputAdornment } from '@material-ui/core'
import { TextField, Button, Switch, Checkbox, Chip } from '@material-ui/core'

export class Venue extends Component {
  state = {
    selectedArtist: null,
    loadedArtists: [
      1, 2
    ],
    isCustom: false
  }

  artistMenuBuilder() {
    return this.state.loadedArtists.map((ar, i)=>{
      return (
        <Rs.DropdownItem key={`artist-${i}`}>Action</Rs.DropdownItem>
      )
    })
  }

  handleDelete(i) {
    // console.log(this.state.loadedArtists.filter(
    //   item => item !== i
    // ))
    this.setState((pS, pr)=>({
      loadedArtists: this.state.loadedArtists.filter(
        item => item !== i
      )
    }))
  }

  renderChips(arr, deleter) {
    return arr.map((a,i)=>{
      return (
        <span key={i} className="chips-container">
          <Chip
            label={'data ' + a}
            onDelete={
              () => deleter(a)
            }
          />
        </span>
      )
    })
  }

  render() {
    // Venue Details Section  ----------------------------------------------  Venue Details Section
    // ============================================================================================
    return (
      <Paper className="create-block">
        <h3 className="title clearfix">
          Venue
          <div className="float-right">
            <span className="inline-text-label">Custom</span>
            <Switch color="primary"
              onChange={()=>{
                this.setState(()=>({
                  isCustom: !this.state.isCustom
                }))
              }}
            />
          </div>
        </h3>
        
        {
          !this.state.isCustom ? (
            <Grid container xs={12} spacing={3}>
              <Grid item xs={12}>
                <TextField required fullWidth label="Select City (select)" variant="outlined" margin="dense"/>
                <TextField fullWidth label="Venue Category (select)" variant="outlined" margin="dense"/>
              </Grid>

              <Grid item xs={12}>
                <TextField required fullWidth label="Venue Name" variant="outlined"/>
              </Grid>
            </Grid>              
          ) : (
            <Grid container xs={12} spacing={3}>
              <Grid item xs={12}>
                <TextField required fullWidth label="Select City (select)" variant="outlined" margin="dense"/>
                <TextField fullWidth label="Venue Category (select)" variant="outlined" margin="dense"/>
                <TextField fullWidth label="Select Locality (select)" variant="outlined" margin="dense"/>
              </Grid>

              <Grid item xs={12}>
                <TextField required fullWidth label="Venue Name" variant="outlined"/>
                <TextField multiline fullWidth label="Address" variant="outlined" margin="dense"/>
                <TextField multiline fullWidth label="Coordinates (map)" variant="outlined" margin="dense"/>
              </Grid>
            </Grid>
          )
        }
      </Paper>
    )
  }
}

export default Venue