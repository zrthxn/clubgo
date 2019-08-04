import React, { Component } from 'react'
import { Form, Button } from 'reactstrap'
import { Grid } from '@material-ui/core'
import { IEventModel } from '@clubgo/database'

import EventDetails from './ui/EventDetails'
import Venue from './ui/Venue'
import MediaCard from '../Images/MediaCard'
import Scheduling from './ui/Scheduling'
import Booking from './ui/Booking'
import Settings from './ui/Settings'

export interface EventEditorProps {
  intent: string,
  focusEventId?: string,
  populateData?: IEventModel
}
export class EventEditor extends Component<EventEditorProps> {
  state = {
    data: {}
  }

  componentDidMount() {
    if(this.props.intent==='update')
      console.log('Updating event with props', this.props.focusEventId, this.props.populateData)
  }
  
  syncChanges = (childData, key) => {
    let { data } = this.state
    if(key==='root')
      data = { ...childData }
    else
      data[key] = { ...childData }

    this.setState({
      data
    })
  }

  onFinalize = () => {
    // TODO
  }

  render() {
    return (
      <div className="create-form">
        <div>
          <div className="clearfix" style={{ padding: '1em' }}>            
            {
              this.props.intent==='create' ? (
                <span className="form-title">Create Event</span>
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

          <Grid item container spacing={3}>
            <Grid item md={7} xs={12}>
              <EventDetails syncParentData={this.syncChanges}/>
            </Grid>

            <Grid item md={5} xs={12}>
              <Settings syncParentData={this.syncChanges}/>
            </Grid>

            <Grid item md={12} xs={12}><hr/></Grid>

            <Grid item md={6} xs={12}>
              <Venue/>
            </Grid>

            <Grid item md={6} xs={12}>
              <MediaCard tag="event" name="event" syncParentData={this.syncChanges} includeVideoURL={true}/>
            </Grid>
            
            <Grid item md={6} xs={12}>
              <Booking syncParentData={this.syncChanges}/>
            </Grid>

            <Grid item md={6} xs={12}>
              <Scheduling/>
            </Grid>                
          </Grid>
        </div>
      </div>
    )
  }
}

export default EventEditor