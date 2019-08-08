import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { Nav, NavItem } from 'reactstrap'
import { Grid, Snackbar, SnackbarContent, IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { green, red } from '@material-ui/core/colors'

import '../scss/Create.scss'

import { EventEditor } from './EventEditor'
import { EventListing } from './EventListing'
import { EventContext } from './EventContext';

export class EventController extends Component {
  static contextType = EventContext

  interfaceBuilder = ( contextState ) => {
    const { uiType } = contextState
    if(uiType==='create')
      return (
        <EventEditor intent={'create'}
          onFinalize={(res)=>{
            this.context.actions.openSuccessFeedback(res)
            this.context.actions.openEventListing()
          }}
          onError={(err)=>{
            this.context.actions.openErrorFeedback('Failed. ' + err)
          }}
        />
      )
    else if(uiType==='list')
      return (
        <EventListing/>
      )
    else if(uiType==='edit')
      return (
        <EventEditor intent={'update'}
          populateData={ contextState.eventData }
          onFinalize={(res)=>{
            this.context.actions.openSuccessFeedback(res)
            this.context.actions.openEventListing()
          }}
          onError={(err)=>{
            this.context.actions.openErrorFeedback('Failed. ' + err)
          }}
        />
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
              <div className="section-nav">
                <Nav tabs>
                  <NavItem>
                    <button className="nav-link" onClick={() => eventContext.actions.openEventEditor('create')}>
                      Create
                    </button>
                  </NavItem>
                  
                  <NavItem>
                    <button className="nav-link" onClick={eventContext.actions.openEventListing}>
                      List
                    </button>
                  </NavItem>
                </Nav>
              </div>

              <Snackbar open={ eventContext.state.openSuccessFeedback }
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                autoHideDuration={5000}
                onClose={()=>{
                  this.setState({
                    successFeedback: false
                  })
                }}
              >
                <SnackbarContent
                  style={{ backgroundColor: green[600] }}
                  message={ <span>{ eventContext.state.feedbackMessage }</span> }
                  action={[
                    <IconButton key="close" color="inherit" onClick={eventContext.actions.closeSuccessFeedback}>
                      <Close/>
                    </IconButton>,
                  ]}
                />
              </Snackbar>

              <Snackbar open={ eventContext.state.openErrorFeedback }
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                autoHideDuration={5000}
                onClose={()=>{
                  this.setState({
                    successFeedback: false
                  })
                }}
              >
                <SnackbarContent
                  style={{ backgroundColor: red[600] }}
                  message={ <span>{ eventContext.state.feedbackMessage }</span> }
                  action={[
                    <IconButton key="close" color="inherit" onClick={eventContext.actions.closeErrorFeedback}>
                      <Close/>
                    </IconButton>,
                  ]}
                />
              </Snackbar>

              <section className="section-content">
                {
                  this.interfaceBuilder( eventContext.state )
                }
              </section>
            </div>
          )
        }
      </EventContext.Consumer>
    )
  }
}

export default EventController
