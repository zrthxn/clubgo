import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { Nav, NavItem, Button } from 'reactstrap'
import { Grid, Snackbar, SnackbarContent, IconButton, Tooltip } from '@material-ui/core'
import { Close, Help } from '@material-ui/icons'
import { green, red } from '@material-ui/core/colors'

import '../scss/Create.scss'

import { EventEditor } from './EventEditor'
import { EventListing } from './EventListing'
import { EventContext } from './EventContext'
import { EventService } from '@clubgo/features/api'

export class EventController extends Component {
  static contextType = EventContext
  eventService = new EventService('admin')

  interfaceBuilder = ( uiType, context ) => {
    if(uiType==='create')
      return (
        <EventEditor intent={'create'} onFinalize={ async (createBody)=>{
          this.eventService.createEvent(createBody).then((result) => {
            if(result.status===201) {
              this.context.actions.openSuccessFeedback('Event Created')
              this.context.actions.openEventListing()
            }
            else throw result
          }).catch((EventServiceError) => {
            this.context.actions.openErrorFeedback(EventServiceError.data._message, EventServiceError.data.message)
          })
        }}/>
      )


    else if(uiType==='list')
      return (
        <EventListing onDelete={ async (eventId)=>{
          try {
            await this.eventService.deleteEvent(eventId)
            this.context.actions.openSuccessFeedback('Event Deleted')
            return
          } catch(EventServiceError) {
            this.context.actions.openErrorFeedback(EventServiceError.data._message)
          }
        }}/>
      )

      
    else if(uiType==='edit')
      return (
        <EventEditor intent={'update'} populateData={ context.state.eventData } onFinalize={ async (updateBody)=>{
          this.eventService.updateEvent(context.state.eventData._id, updateBody).then((result) => {
            if(result.status===200) {
              this.context.actions.openSuccessFeedback('Event Updated')  
              this.context.actions.openEventListing()
            }
            else throw result
          }).catch((EventServiceError) => {
            this.context.actions.openErrorFeedback(EventServiceError.data._message, EventServiceError.data.message)
          })
        }}/>
      )
    else
      return (
        <section>
          <div>Events Page</div>
          <p>{ uiType }</p>
        </section>
      )
  }

  render() {
    return (
      <EventContext.Consumer>
        {
          eventContext => (
            <div>
              <section className="section-content">
                {
                  this.interfaceBuilder(eventContext.state.uiType, eventContext)
                }
              </section>

              <Snackbar open={ eventContext.state.openSuccessFeedback }
                // SUCCESS
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                autoHideDuration={5000}
                onClose={eventContext.actions.closeSuccessFeedback}
              >
                <SnackbarContent
                  style={{ backgroundColor: green[600] }}
                  message={ <span>{ eventContext.state.feedbackMessage.message }</span> }
                  action={[
                    <IconButton key="close" color="inherit" onClick={eventContext.actions.closeSuccessFeedback}>
                      <Close/>
                    </IconButton>,
                  ]}
                />
              </Snackbar>

              <Snackbar open={ eventContext.state.openErrorFeedback }
                // ERROR
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                autoHideDuration={5000}
                onClose={eventContext.actions.closeErrorFeedback}
              >
                <SnackbarContent
                  style={{ backgroundColor: red[600] }}
                  message={ <span>{ eventContext.state.feedbackMessage.message }</span> }
                  action={[
                    <Tooltip title={eventContext.state.feedbackMessage.details} style={{ maxWidth: 500, fontSize: '2em' }}>
                      <IconButton key="close" color="inherit" onClick={eventContext.actions.closeErrorFeedback}>
                        <Help/>
                      </IconButton>
                    </Tooltip>,

                    <IconButton key="close" color="inherit" onClick={eventContext.actions.closeErrorFeedback}>
                      <Close/>
                    </IconButton>,
                  ]}
                />
              </Snackbar>
            </div>
          )
        }
      </EventContext.Consumer>
    )
  }
}

export default EventController
