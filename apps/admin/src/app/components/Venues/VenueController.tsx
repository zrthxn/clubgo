import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { Nav, NavItem } from 'reactstrap'

import '../scss/Create.scss'

import { VenueEditor } from './VenueEditor'
import { VenueListing } from './VenueListing'
import { VenueContext } from './VenueContext'

export class VenueController extends Component {
  interfaceBuilder = ( contextState ) => {
    const { uiType } = contextState
    if(uiType==='create')
      return (
        <VenueEditor intent={'create'}/>
      )
    else if(uiType==='list')
      return (
        <VenueListing/>
      )
    else if(uiType==='edit')
      return (
        <VenueEditor 
          intent={'update'}
          populateData={ contextState.venueData }
        />
      )
    else
      return (
        <section>
          <div>Venues Page</div>
          <p>{ uiType }</p>
        </section>
      )
  }

  render() {
    return (
      <VenueContext.Consumer>
        {
          venueContext => (
            <div>
              <div className="section-nav">
                <Nav tabs>
                  <NavItem>
                    <button className="nav-link" onClick={() => venueContext.actions.createVenue()}>
                      Create
                    </button>
                  </NavItem>
                  
                  <NavItem>
                    <button className="nav-link" onClick={() => venueContext.actions.listVenue()}>
                      List
                    </button>
                  </NavItem>
                </Nav>
              </div>

              <section className="section-content">
                {
                  this.interfaceBuilder( venueContext.state )
                }
              </section>
            </div>
          )
        }
      </VenueContext.Consumer>
    )
  }
}

export default VenueController
