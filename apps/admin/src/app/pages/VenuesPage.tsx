import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { Nav, NavItem, Button } from 'reactstrap'

import './scss/Pages.scss'

import { VenueController } from '../components/Venues/VenueController'
import { VenueContext } from '../components/Venues/VenueContext'
import { VenueContextProvider } from '../components/Venues/VenueContextProvider'

export class VenuesPage extends Component {
  render() {
    return (
      <VenueContextProvider>
        <div className="page">
          <article className="page-header">
            <h2 className="title">Venues</h2>
            
            <VenueContext.Consumer>
              {
                venueContext => (
                  <div className="page-nav clearfix">
                    <p>
                      Select one of the options. <br/>
                      Other details will come here.
                    </p>

                    {
                      venueContext.state.uiType==='create' ? null : (
                        <Button color="primary" size="lg" onClick={()=>{
                          venueContext.actions.openVenueEditor('create')
                        }}>
                          Create Venue
                        </Button>
                      )
                    }
                  </div>
                )
              }
            </VenueContext.Consumer>
          </article>

          <article className="page-content">
            <VenueController/>
          </article>
        </div>
      </VenueContextProvider>
    )
  }
}

export default VenuesPage