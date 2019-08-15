import React, { Component } from 'react'
import { Grid, Paper } from '@material-ui/core'

import '../scss/Offers.scss'

export class Offer extends Component {
  render() {
    return (
      <Paper className="offer-block">
        <h3>Offer Name</h3>
        <p>Offer description goes here</p>
        
        <span>
          <span className="offer-category-chip">Category</span>
          <span className="offer-category-chip">Category</span>
          <span className="offer-category-chip">Category</span>
        </span>
      </Paper>
    )
  }
}

export default Offer
