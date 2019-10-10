import React, { Component } from 'react'
import { Paper, Grid, Button, Modal, TextField } from '@material-ui/core'

import { Map } from '@clubgo/components'

interface LocalityEditorProps {
  open: boolean
  close: Function
  onComplete: Function
  city?: string
  initCoordinates?: {
    _lat: number
    _lon: number
  }
}

export default class LocalityEditor extends Component<LocalityEditorProps> {
  state = {
    name: null
  }

  render() {
    return (
      <Modal open={this.props.open} style={{
        textAlign: 'center',
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column'
      }}>
        <Paper style={{ 
          marginTop: '4em',
          marginLeft: '50%',
          left: '-18em',
          padding: '2em',
          width: '36em',
          position: 'absolute' 
        }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <h3>Add locality in</h3>
              <h2>{ this.props.city }</h2>
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth margin="dense" variant="outlined" label="Name of Locality" onChange={({ target })=>{
                this.setState({
                  name: target.value
                })
              }}/>
            </Grid>

            <Grid item xs={12}>
              <Map/>
            </Grid>

            <Grid item md={6} xs={12}>
              <Button variant="outlined" color="primary" onClick={()=>{this.props.close()}}>Close</Button>
            </Grid>
            <Grid item md={6} xs={12}>
              <Button variant="contained" color="primary" onClick={()=>{this.props.onComplete({
                name: this.state.name
              })}}>Confirm</Button>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    )
  }
}
