import React, { Component } from 'react'
import { Button } from 'reactstrap'

import './scss/Pages.scss'

import { Tickets } from '../components/Tickets/Tickets'

export class TicketsPage extends Component {
  state = {

  }

  render() {
    return (
      <div className="page">
        <article className="page-header">
          <h2 className="title">Tickets</h2>

          <div className="page-nav clearfix">
            <p>
              Select one of the options. <br/>
              Other details will come here.
            </p>
          </div>
        </article>

        <article className="page-content">
          <Tickets/>
        </article>
      </div>
    )
  }
}

export default TicketsPage