import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { Nav, NavItem } from 'reactstrap'

import '../scss/Create.scss'

import { VenueEditor } from './VenueEditor'
import { VenueListing } from './VenueListing'
import { VenueContext } from './VenueContext'

export class VenueController extends Component {
  static contextType = VenueContext

  interfaceBuilder = ( contextState ) => {
    const { uiType } = contextState
    if(uiType==='create')
      return (
        <VenueEditor intent={'create'}
          onFinalize={()=>{

          }}
        />
      )
    else if(uiType==='list')
      return (
        <VenueListing/>
      )
    else if(uiType==='edit')
      return (
        <VenueEditor intent={'update'}
          populateData={ contextState.venueData }
          onFinalize={()=>{
            
          }}
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
                    <button className="nav-link" onClick={() => venueContext.actions.openVenueEditor('create')}>
                      Create
                    </button>
                  </NavItem>
                  
                  <NavItem>
                    <button className="nav-link" onClick={() => venueContext.actions.openVenueListing()}>
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
