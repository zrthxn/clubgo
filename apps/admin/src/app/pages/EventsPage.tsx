import React, { Component } from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

import '../../assets/scss/Pages.scss'

import { EventController } from '../components/Events/EventController'
import { EventContextProvider } from '../components/Events/EventContextProvider'

export class EventsPage extends Component {
  render() {
    return (
      <EventContextProvider>
        <div className="page">
          <article className="page-header">
            <h2 className="title">Events</h2>
            
            <div>
              Select one of the options above. <br/>
              Other details will come here
            </div>
          </article>

          <article className="main-content">
            <EventController/>
          </article>
        </div>
      </EventContextProvider>
    )
  }
}

export default EventsPage