import React, { Component } from 'react'
import './scss/Pages.scss'

import { DatabaseService, LoginService } from '@clubgo/api'
import { Grid, Fab, IconButton, Button, TextField } from '@material-ui/core'
import { Add, Delete } from '@material-ui/icons'

export default class DressCodePage extends Component {
  render() {
    return (
      <div className="page">
        <article className="page-header">
          <h1 className="title">Dress Codes</h1>

          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>

            </Grid>
          </Grid>
        </article>

        <article className="page-content">

        </article>
      </div>
    )
  }
}
