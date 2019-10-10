import React, { Component } from 'react'
import { Grid, Paper, TextField } from '@material-ui/core'

import './scss/Pages.scss'

export default class SettingsPage extends Component {
  render() {
    return (
      <div className="page">
        <article className="page-header">
          <h1 className="title">Settings</h1>
        </article>

        <article className="page-content">
          <Grid container spacing={3}>
            <Grid item xs={6}>
              
            </Grid>
          </Grid>
        </article>
      </div>
    )
  }
}
