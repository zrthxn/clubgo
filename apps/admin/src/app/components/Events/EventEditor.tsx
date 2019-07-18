import React, { Component } from 'react'
import { Form, Button } from 'reactstrap'
import { Grid } from '@material-ui/core'

import { IEventModel } from '@clubgo/database'

import EventDetails from './ui/EventDetails'
import Venue from './ui/Venue'
import Images from './ui/Images'
import Scheduling from './ui/Scheduling'
import Booking from './ui/Booking'
import Settings from './ui/Settings'

export interface EventEditorProps {
  intent: string,
  focusEventId?: string,
  populateData?: any
}
export class EventEditor extends Component<EventEditorProps> {
  state = {
    
  }

  componentDidMount() {
    if(this.props.intent==='update')
      console.log('Updating event with props', this.props.focusEventId, this.props.populateData)
  }

  render() {
    return (
      <div className="create-form">
        <div>
          <div className="clearfix" style={{ padding: '1em' }}>            
            {
              this.props.intent==='create' ? (
                <span className="form-title">Create New Event</span>
              ) : (
                this.props.intent==='update' ? (
                  <span className="form-title">Update Event</span>
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
            <Grid item xs={7}>
              <EventDetails/>
            </Grid>

            <Grid item xs={5}>
              <Settings/>
            </Grid>

            <Grid item xs={12}><hr/></Grid>

            <Grid item xs={6}>
              <Venue/>
            </Grid>

            <Grid item xs={6}>
              <Images/>
            </Grid>
            
            <Grid item xs={6}>
              <Booking/>
            </Grid>

            <Grid item xs={6}>
              <Scheduling/>
            </Grid>                
          </Grid>
        </div>
      </div>
    )
  }
}

export default EventEditor