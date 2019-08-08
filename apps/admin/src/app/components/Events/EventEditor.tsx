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

import { EventService } from '@clubgo/features/api'

export interface EventEditorProps {
  intent: string,
  onFinalize: Function,
  onError: Function,
  focusEventId?: string,
  populateData?: IEventModel
}
export class EventEditor extends Component<EventEditorProps> {
  state = {
    data: {
      eventTitle: null,
      description: null,
      categories: [],
      tagline: null,
      flashText: null,
      artists: [],
      music: [],
      dressCode: {
        title: null,
        images: [],
      },
      tags: [],
      hasCutomDetails: false,
      customDetails: [],
      settings: {
        isPublished: false,
        eventPriority: null,
        isFeatured: false,
        featured: {
          featuredText: null,
          featuredPriority: null
        }
      },
      venue: {
        city: null,
        venueId: null,
        title: null,
        address: null, 
        isCustomVenue: false,
        customVenueDetails: {
          locality: null,
          coordinates: {
            _lat: 0,
            _lon: 0
          }
        }
      },
      scheduling: {
        startTime: null,
        endTime: null,
        isRecurring: false,
        recurringType: null,
        isCustomRecurring: false,
        customRecurring: {
          initial: null,
          final: null,
          dates: []
        }
      },
      bookings: {
        isTakingOnsiteBookings: true,
        isTakingOnsitePayments: false,
        tickets: [],
        registrationURL: null,
        registrationPhone: null
      },
      media: {
        images: [],
        videoURL: null
      }
    }
  }

  eventService = new EventService('admin')

  componentDidMount() {
    if(this.props.intent==='update') { 
      console.log('Updating event with props', this.props.focusEventId, this.props.populateData)
      // this.state.data = this.props.populateData
      this.populate(this.props.populateData)
    }
  }
  
  syncChanges = (childData, key) => {
    let { data } = this.state
    if(key==='root') {
      data = { ...data, ...childData }
    }
    else {
      if(Array.isArray(childData)) {
        let iterable = data
        iterable[key] = childData
        data = { ...iterable }
      }
      else {
        data[key] = { ...childData }
      }
    }
    
    this.setState({
      data
    })
  }
  
  populate = (data) => {
    console.log(data)
  }

  create = async (publish?) => {
    let { data } = this.state
    if(publish)
      data.settings.isPublished = true

    let result
    try {
      result = await this.eventService.createEvent(data)
    } catch(e) {
      result = e
    }
    
    if(result.status===201)
      this.props.onFinalize('Event Created')
    else
      this.props.onError(result)
  }

  save = () => {
    
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
            
            <Button color="primary" size="lg" className="float-right"
              onClick={()=>{
                this.create(true)
              }}
            >
              Publish
            </Button>

            <span className="float-right spacer"></span>

            <Button outline color="secondary" size="lg" className="float-right" onClick={this.save}>
              Save
            </Button>
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