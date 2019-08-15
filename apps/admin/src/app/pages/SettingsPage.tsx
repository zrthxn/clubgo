import React, { Component } from 'react'
import { Grid, Paper } from '@material-ui/core'

import './scss/Pages.scss'

export default class SettingsPage extends Component {
  render() {
    return (
      <div className="page">
        <article className="page-header">
          <h2 className="title">Settings</h2>

          <p>hg</p>
        </article>

        <article className="page-content">
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Paper>
                <h3>Categories</h3>
              </Paper>
            </Grid>
            
            <Grid item xs={6}>
              <Paper>
                <h3>Tags</h3>
              </Paper>
            </Grid>
            
            <Grid item xs={6}>
              <Paper>
                <h3>Localities</h3>
              </Paper>
            </Grid>
          </Grid>
        </article>
      </div>
    )
  }
}
