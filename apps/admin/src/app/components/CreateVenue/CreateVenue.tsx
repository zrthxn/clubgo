import React, { Component } from 'react'

import { Form, Button } from 'reactstrap'
import { Grid } from '@material-ui/core'

import '../../../assets/scss/Create.scss'

import { ImageSelect } from './ui/ImageSelect'
import { VenueDetails } from './ui/VenueDetails'
import { VenueHours } from './ui/VenueHours'

export class CreateVenue extends Component {
  render() {
    return (
      <div className="create-root">
        <Form>
          <div className="clearfix" style={{ padding: '1em' }}>
            <span className="form-title">Create New Venue</span>
            <Button color="primary" size="lg" className="float-right">Publish</Button>
            <span className="float-right spacer"></span>
            <Button outline color="secondary" size="lg" className="float-right">Save</Button>
          </div>

          <Grid container xs={12}>
            {/* <Grid item xs={1}/> */}

            <Grid item xs={12}>
              <Grid container xs={12} spacing={3}>
                <Grid item xs={6}><VenueDetails/></Grid>

                <Grid item xs={6}><ImageSelect/></Grid>

                <Grid item xs={4}><ImageSelect/></Grid>

                <Grid item xs={4}><ImageSelect/></Grid>

                <Grid item xs={4}><ImageSelect/></Grid>

                <Grid item xs={12}><VenueHours/></Grid>
              </Grid>
            </Grid>
            
            {/* <Grid item xs={1}/> */}
          </Grid>
        </Form>
      </div>
    )
  }
}

export default CreateVenue