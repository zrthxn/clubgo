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
import Offers from './ui/Offers'

import { EventContext } from './EventContext'

export interface EventEditorProps {
  intent: string,
  onFinalize: Function,
  populateData?: IEventModel
}
export class EventEditor extends Component<EventEditorProps> {
  static contextType = EventContext
  context!: React.ContextType<typeof EventContext>

  ongoingStateTransition = false

  state = {
    loading: true,
    populateDataFromParent: false,
    collectChildData: false,
    data: {
      ref: Date.now().toString(36),
      owner: 'admin',
      settings: {
        isPublished: true
      },
      venue: {

      },
      bookings: {

      },
      offers: {
        
      },
      scheduling: {

      },
      media: {

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
    let transition = setInterval(()=>{
      if(this.ongoingStateTransition)
        return

      this.ongoingStateTransition = true
      
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

      clearInterval(transition)
      
      if(key==="media")
        console.log(data)

      this.ongoingStateTransition = false
      this.setState({
        data,
        syncData: false
      })  
    }, 100)    
  }

  collectChildData = () => {
    return new Promise((resolve, reject)=>{
      if(this.state.collectChildData) 
        resolve()
      this.setState({
        collectChildData: true
      })

      setTimeout(()=>{
        let waiting = setInterval(()=>{
          if(this.state.collectChildData && !this.ongoingStateTransition) {
            clearInterval(waiting)
            resolve()
          }
        }, 100)
      }, 100)
    })
  }

  saveEvent = async (publish?:boolean) => {
    await this.collectChildData()

    let createBody = this.state.data
    this.setState({
      collectChildData: false
    })

    if(publish)
      createBody.settings.isPublished = true
    this.props.onFinalize(createBody)
  }

  render() {
    if(!this.state.loading) return (
      <div className="create-form">
        <div>
          <div className="clearfix">
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
              this.saveEvent(true)
            }}>
              Publish
            </Button>

            <span className="float-right spacer"></span>

            <Button outline color="secondary" size="lg" className="float-right" onClick={()=>{
              this.saveEvent(false)
            }}>
              Save
            </Button>

            <span className="float-right spacer"></span>

            <Button outline color="error" size="lg" className="float-right" onClick={()=>{
              this.context.actions.openEventListing()
            }}>
              Cancel
            </Button>
          </div>

          {
            !this.state.loading ? (
              <Grid item container spacing={3}>
                <Grid item md={7} xs={12}>
                  <EventDetails populate={this.state.populateDataFromParent} data={this.state.data}
                    syncData={this.state.collectChildData} syncParentData={this.syncDataChanges} />
                </Grid>

                <Grid item md={5} xs={12}>
                  <Settings populate={this.state.populateDataFromParent} data={this.state.data.settings}
                    syncData={this.state.collectChildData} syncParentData={this.syncDataChanges} />

                  <Offers populate={this.state.populateDataFromParent} data={this.state.data.offers}
                    syncData={this.state.collectChildData} syncParentData={this.syncDataChanges} />
                </Grid>

                <Grid item md={12} xs={12}><hr/></Grid>

                <Grid item md={6} xs={12}>
                  <Venue populate={this.state.populateDataFromParent} data={this.state.data.venue}
                    syncData={this.state.collectChildData} syncParentData={this.syncDataChanges} />
                </Grid>

                <Grid item md={6} xs={12}>
                  <MediaCard populate={this.state.populateDataFromParent} data={this.state.data.media}
                    tag="event" includeVideoURL={true}
                    syncData={this.state.collectChildData} syncParentData={(data)=>{
                      this.syncDataChanges(data, 'media')
                    }} />
                </Grid>
                
                <Grid item md={6} xs={12}>
                  <Booking populate={this.state.populateDataFromParent} data={this.state.data.bookings}
                    syncData={this.state.collectChildData} syncParentData={this.syncDataChanges} />
                </Grid>

                <Grid item md={6} xs={12}>
                  <Scheduling populate={this.state.populateDataFromParent} data={this.state.data.scheduling}
                    syncData={this.state.collectChildData} syncParentData={this.syncDataChanges} />
                </Grid>                
              </Grid>
            ) : (
              <div>
                <p>Please Wait</p>
              </div>
            )
          } 
          
          <div className="clearfix" style={{ padding: '1em' }}>
            <Button color="primary" size="lg" className="float-right" onClick={()=>{
              this.saveEvent(true)
            }}>
              Publish
            </Button>

            <span className="float-right spacer"></span>

            <Button outline color="secondary" size="lg" className="float-right" onClick={()=>{
              this.saveEvent(false)
            }}>
              Save
            </Button>
          </div>        
        </div>
      </div>
    )
    else 
      return (
        <div>Loading...</div>
      )
  }
}

export default EventEditor