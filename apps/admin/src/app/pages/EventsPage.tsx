import React, { Component } from 'react'
import { Nav, NavItem, NavLink, Button } from 'reactstrap'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

import './scss/Pages.scss'

import { EventController } from '../components/Events/EventController'
import { EventContext } from '../components/Events/EventContext'
import { EventContextProvider } from '../components/Events/EventContextProvider'

export class EventsPage extends Component {
  componentDidMount() {
    
  }

  validateAccess = () => {
    
  }
  
  render() {
    return (
      <EventContextProvider>
        <div className="page">
          <article className="page-header">
            <h1 className="title">Events</h1>

            <EventContext.Consumer>
              {
                eventContext => (
                  <div className="page-nav clearfix">
                    <p>
                      Select one of the options. <br/>
                      Other details will come here.
                    </p>

                    {
                      eventContext.state.uiType==='create' ? null : (
                        <Button color="primary" size="lg" onClick={()=>{
                          eventContext.actions.openEventEditor('create')
                        }}>
                          Create New Event
                        </Button>
                      )
                    }
                  </div>
                )
              }
            </EventContext.Consumer>
          </article>

          <article className="page-content">
            <EventController/>
          </article>
        </div>
      </EventContextProvider>
    )
  }
}

export default EventsPage