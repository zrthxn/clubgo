import React, { Component } from 'react'
import { Paper, Grid, Button, Modal, TextField } from '@material-ui/core'

import { Map } from '@clubgo/components'

import LocalityEditor from './LocalityEditor'

interface LocationEditorProps {
  open: boolean
  close: Function
  onComplete: Function
  data?: any
}

export default class LocationEditor extends Component<LocationEditorProps> {
  state = {
    openLocalityEditor: false,
    data: {
      city: null
    },
    localities: [
      
    ]
  }

  componentDidMount() {
    this.setState(()=>{
      if(this.props.data!==undefined)
        return {
          data: this.props.data
        }
    })
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
          left: '-24em',
          padding: '2em',
          width: '48em',
          position: 'absolute' 
        }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <h2>New City</h2>
              <p>Add a new city or location here</p>
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth variant="outlined" label="Name of City" 
                defaultValue={this.state.data.city}
                onChange={({ target })=>{
                  let { data } = this.state
                  data.city = target.value
                  this.setState(()=>{
                    return {
                      data
                    }
                  })
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Map/>
            </Grid>

            <Grid item xs={12}>
              {
                this.state.localities.map((loc, index)=>(
                  <div style={{ 
                    display: 'inline', border: '1px solid #1c1c1c80', borderRadius: '5px', 
                    padding: '0.5em 1em', margin: '0.5em' 
                  }}>
                    { loc.name }
                  </div>
                ))
              }
              
              <Button variant="contained" color="primary" onClick={()=>{
                this.setState({
                  openLocalityEditor: true
                })
              }}>
                Add Locality
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Button onClick={()=>{
                this.props.close()
              }}>
                Close
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Button color="primary" onClick={()=>{
                this.props.onComplete(this.state.data)
              }}>
                Confirm
              </Button>
            </Grid>
          </Grid>
          
          <LocalityEditor open={this.state.openLocalityEditor}
            city="Delhi"
            initCoordinates={{
              _lat: 0,
              _lon: 0
            }}
            close={()=>{
              this.setState({
                openLocalityEditor: false
              })
            }}
            onComplete={(loc)=>{
              let { localities } = this.state
              localities.push(loc)
              this.setState({
                openLocalityEditor: false,
                localities
              })
            }}
          />
        </Paper>
      </Modal>
    )
  }
}
