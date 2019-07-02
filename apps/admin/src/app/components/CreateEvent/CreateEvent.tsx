import React, { Component } from 'react'

import { Form, Button } from 'reactstrap'
import { Grid } from '@material-ui/core'

import '../../../assets/scss/Create.scss'

import EventDetails from './ui/EventDetails'
import Venue from './ui/Venue'
import Images from './ui/Images'
import Scheduling from './ui/Scheduling'
import Booking from './ui/Booking'
import Settings from './ui/Settings'

export class CreateEvent extends Component {
  state = {
    
  }

  render() {
    return (
      <div className="create-root">
        <Form>
          <div className="clearfix" style={{ padding: '1em' }}>
            <span className="form-title">Create New Event</span>
            <Button color="primary" size="lg" className="float-right">Publish</Button>
            <span className="float-right spacer"></span>
            <Button outline color="secondary" size="lg" className="float-right">Save</Button>
          </div>

          <Grid container xs={12}>
            <Grid item xs={1}/>
            
            <Grid item xs={10}>
              <Grid container xs={12} spacing={3}>
                <Grid item xs={12}><EventDetails/></Grid>

                <Grid item xs={6}><Venue/></Grid>

                <Grid item xs={6}><Images/></Grid>

                <Grid item xs={12}><Scheduling/></Grid>

                <Grid item xs={6}><Booking/></Grid>

                <Grid item xs={6}><Settings/></Grid>
              </Grid>              
            </Grid>

            <Grid item xs={1}/>
          </Grid>
        </Form>
      </div>
    )
  }
}

export default CreateEvent