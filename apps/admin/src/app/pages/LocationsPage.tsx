import React, { Component } from 'react'
import { Nav, NavItem, NavLink, Button } from 'reactstrap'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

import './scss/Pages.scss'

export class LocationsPage extends Component {
  render() {
    return (
      <div className="page">
        <article className="page-header">
          <h1 className="title">Locations</h1>

          <div className="page-nav clearfix">
            <p>
              Select one of the options. <br/>
              Other details will come here.
            </p>

            <Button color="primary" size="lg" onClick={()=>{
              // eventContext.actions.openEventEditor('create')
            }}>
              Create New Location
            </Button>
          </div>
        </article>

        <article className="page-content">
          {/* <Location/> */}
          fcghjbklm
        </article>
      </div>
    )
  }
}

export default LocationsPage