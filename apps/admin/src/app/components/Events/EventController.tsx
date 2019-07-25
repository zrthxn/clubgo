import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { Nav, NavItem } from 'reactstrap'

import '../scss/Create.scss'

import { EventEditor } from './EventEditor'
import { EventListing } from './EventListing'
import { EventContext } from './EventContext';

export class EventController extends Component {
  interfaceBuilder = ( contextState ) => {
    const { uiType } = contextState
    if(uiType==='create')
      return (
        <EventEditor intent={'create'}/>
      )
    else if(uiType==='list')
      return (
        <EventListing/>
      )
    else if(uiType==='edit')
      return (
        <EventEditor 
          intent={'update'}
          focusEventId={ contextState.focusEventId }
          populateData={ contextState.eventData }
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
                    <button className="nav-link" onClick={eventContext.actions.createEvent}>
                      Create
                    </button>
                  </NavItem>
                  
                  <NavItem>
                    <button className="nav-link" onClick={eventContext.actions.listEvents}>
                      List
                    </button>
                  </NavItem>
                </Nav>
              </div>

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
