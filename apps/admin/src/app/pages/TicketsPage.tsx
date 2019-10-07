import React, { Component } from 'react'
import { Button } from 'reactstrap'

import './scss/Pages.scss'

import { TicketListing } from '../components/Tickets/TicketListing'

export class TicketsPage extends Component {
  state = {

  }

  render() {
    return (
      <div className="page">
        <article className="page-header">
          <h1 className="title">Tickets</h1>

          <div className="page-nav clearfix">
            <p>
              Select one of the options. <br/>
              Other details will come here.
            </p>
          </div>
        </article>

        <article className="page-content">
          <TicketListing/>
        </article>
      </div>
    )
  }
}

export default TicketsPage