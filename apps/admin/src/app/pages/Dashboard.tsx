import React, { Component } from 'react'
import { Grid } from '@material-ui/core'

import '../../assets/scss/Pages.scss'

import CreateableSelect from 'react-select/creatable'

export class Dashboard extends Component {
  state = {
    
  }

  render() {
    return (
      <div className="page">
        <article className="page-header">
          <h2 className="title">Dashboard</h2>
        </article>

        <article className="main-content">
          <Grid container spacing={3}>
            <Grid item xs={12} style={{ padding: '2em' }}>
              
            </Grid>
          </Grid>
        </article>
      </div>
    )
  }
}

export default Dashboard 