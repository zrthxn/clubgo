import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { Nav, NavItem } from 'reactstrap'

import '../../assets/scss/Pages.scss'

import { VenueController } from '../components/Venues/VenueController'
import { VenueContextProvider } from '../components/Venues/VenueContextProvider'

export class VenuesPage extends Component {
  render() {
    return (
      <VenueContextProvider>
        <div className="page">
          <article className="page-header">
            <h2 className="title">Venues</h2>
            
            <div>
              Select one of the options above. <br/>
              Other details will come here
            </div>
          </article>

          <article className="main-content">
            <VenueController/>
          </article>
        </div>
      </VenueContextProvider>
    )
  }
}

export default VenuesPage