import React, { Component } from 'react'
import { Grid, Paper } from '@material-ui/core'

import './scss/Pages.scss'

import { Offer } from '../components/Offers/Offer'

export default class OffersPage extends Component {
  render() {
    return (
      <div className="page">
        <article className="page-header">
          <h1 className="title">Offers</h1>
        </article>

        <article className="page-content">
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Offer/>
            </Grid>
          </Grid>
        </article>
      </div>
    )
  }
}
