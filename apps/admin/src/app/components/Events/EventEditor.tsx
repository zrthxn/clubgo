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

import { EventContext } from './EventContext'

export interface EventEditorProps {
  intent: string,
  onFinalize: Function,
  populateData?: object //IEventModel
}
export class EventEditor extends Component<EventEditorProps> {
  static contextType = EventContext

  state = {
    loading: true,
    populateDataFromParent: false,
    data: {
      eventTitle: undefined,
      description: undefined,
      categories: [],
      tagline: undefined,
      flashText: undefined,
      artists: [],
      music: [],
      dressCode: {
        title: undefined,
        images: [],
      },
      tags: [],
      hasCutomDetails: false,
      customDetails: [],
      settings: {
        isPublished: false,
        eventPriority: undefined,
        isFeatured: false,
        featured: {
          featuredText: undefined,
          featuredPriority: undefined
        }
      },
      venue: {
        city: undefined,
        venueId: undefined,
        title: undefined,
        address: undefined, 
        isCustomVenue: false,
        customVenueDetails: {
          locality: undefined,
          coordinates: {
            _lat: 0,
            _lon: 0
          }
        }
      },
      scheduling: {
        startTime: undefined,
        endTime: undefined,
        isRecurring: false,
        recurringType: undefined,
        isCustomRecurring: false,
        customRecurring: {
          initial: undefined,
          final: undefined,
          dates: []
        }
      },
      bookings: {
        tickets: [],
        isTakingOnsiteBookings: true,
        isTakingOnsitePayments: false,
        registrationURL: undefined,
        registrationPhone: undefined
      },
      media: {
        images: [],
        videoURL: undefined
      }
    }
  }

  componentDidMount() {
    this.setState(()=>{
      if(this.props.intent==='update')
        return {
          data: this.props.populateData,
          populateDataFromParent: true,
          loading: false,
        }
      else
        return {
          loading: false
        }
    })
  }
  
  syncDataChanges = (childData:object, key:string) => {
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

    this.setState((prevState, props)=>{
      return {
        data
      }
    })
  }

  saveEvent = (data, publish?:boolean) => {
    if(publish) data.settings.isPublished = true
    this.props.onFinalize(data)
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
            
            <Button color="primary" size="lg" className="float-right" onClick={()=>{
              this.saveEvent(this.state.data, true)
            }}>
              Publish
            </Button>

            <span className="float-right spacer"></span>

            <Button outline color="secondary" size="lg" className="float-right" onClick={()=>{
              this.saveEvent(this.state.data, false)
            }}>
              Save
            </Button>
          </div>

          {
            !this.state.loading ? (
              <Grid item container spacing={3}>
                <Grid item md={7} xs={12}>
                  <EventDetails populate={this.state.populateDataFromParent} data={this.state.data}
                    syncParentData={this.syncDataChanges}
                  />
                </Grid>

                <Grid item md={5} xs={12}>
                  <Settings populate={this.state.populateDataFromParent} data={this.state.data}
                    syncParentData={this.syncDataChanges}
                  />
                </Grid>

                <Grid item md={12} xs={12}><hr/></Grid>

                <Grid item md={6} xs={12}>
                  <Venue populate={this.state.populateDataFromParent} data={this.state.data}
                    syncParentData={this.syncDataChanges}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <MediaCard populate={this.state.populateDataFromParent} data={this.state.data}
                    syncParentData={this.syncDataChanges} tag="event" name="event" includeVideoURL={true}
                  />
                </Grid>
                
                <Grid item md={6} xs={12}>
                  <Booking populate={this.state.populateDataFromParent} data={this.state.data}
                    syncParentData={this.syncDataChanges}
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <Scheduling populate={this.state.populateDataFromParent} data={this.state.data}
                    syncParentData={this.syncDataChanges}
                  />
                </Grid>                
              </Grid>
            ) : (
              <div>
                <p>Please Wait</p>
              </div>
            )
          }          
        </div>
      </div>
    )
  }
}

export default EventEditor