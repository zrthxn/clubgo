import React, { Component } from 'react'
import { Form, Button } from 'reactstrap'
import { Grid } from '@material-ui/core'

import { Images } from './ui/Images'
import { VenueDetails } from './ui/VenueDetails'
import { VenueHours } from './ui/VenueHours'

export interface VenueEditorProps {
  intent: string,
  populateData?: any
}
export class VenueEditor extends Component<VenueEditorProps> {
  render() {
    return (
      <div className="create-form">
        <div>
          <div className="clearfix" style={{ padding: '1em' }}>
            {
              this.props.intent==='create' ? (
                <span className="form-title">Create New Venue</span>
              ) : (
                this.props.intent==='update' ? (
                  <span className="form-title">Update Venue</span>
                ) : (
                  console.log()
                )
              )
            }
            
            <Button color="primary" size="lg" className="float-right">Publish</Button>
            <span className="float-right spacer"></span>
            <Button outline color="secondary" size="lg" className="float-right">Save</Button>
          </div>

          <Grid container xs={12} spacing={3}>
            <Grid item xs={6}>
              <VenueDetails/>
            </Grid>

            <Grid item xs={6}>
              <Images/>
            </Grid>

            <Grid item xs={4}>
              <Images/>
            </Grid>

            <Grid item xs={4}>
              <Images/>
            </Grid>

            <Grid item xs={4}>
              <Images/>
            </Grid>

            <Grid item xs={12}>
              <VenueHours/>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

export default VenueEditor