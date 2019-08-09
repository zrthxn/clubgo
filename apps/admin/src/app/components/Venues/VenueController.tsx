import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { Nav, NavItem } from 'reactstrap'
import { Grid, Snackbar, SnackbarContent, IconButton, Tooltip } from '@material-ui/core'
import { Close, Help } from '@material-ui/icons'
import { green, red } from '@material-ui/core/colors'

import '../scss/Create.scss'

import { VenueEditor } from './VenueEditor'
import { VenueListing } from './VenueListing'
import { VenueContext } from './VenueContext'

export class VenueController extends Component {
  interfaceBuilder = ( uiType, context ) => {
    if(uiType==='create')
      return (
        <VenueEditor intent={'create'}/>
      )
    else if(uiType==='list')
      return (
        <VenueListing/>
      )
    else if(uiType==='edit')
      return (
        <VenueEditor intent={'update'} populateData={context.state.venueData}/>
      )
    else
      return (
        <section>
          <div>Venues Page</div>
          <p>{ uiType }</p>
        </section>
      )
  }

  render() {
    return (
      <VenueContext.Consumer>
        {
          venueContext => (
            <div>
              <div className="section-nav">
                <Nav tabs>
                  <NavItem>
                    <button className="nav-link" onClick={() => venueContext.actions.openVenueEditor('create')}>
                      Create
                    </button>
                  </NavItem>
                  
                  <NavItem>
                    <button className="nav-link" onClick={venueContext.actions.openVenueListing}>
                      List
                    </button>
                  </NavItem>
                </Nav>
              </div>

              <Snackbar open={ venueContext.state.openSuccessFeedback }
                // SUCCESS
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                autoHideDuration={5000}
                onClose={venueContext.actions.closeSuccessFeedback}
              >
                <SnackbarContent
                  style={{ backgroundColor: green[600] }}
                  message={ <span>{ venueContext.state.feedbackMessage.message }</span> }
                  action={[
                    <IconButton key="close" color="inherit" onClick={venueContext.actions.closeSuccessFeedback}>
                      <Close/>
                    </IconButton>,
                  ]}
                />
              </Snackbar>

              <Snackbar open={ venueContext.state.openErrorFeedback }
                // ERROR
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                autoHideDuration={5000}
                onClose={venueContext.actions.closeErrorFeedback}
              >
                <SnackbarContent
                  style={{ backgroundColor: red[600] }}
                  message={ <span>{ venueContext.state.feedbackMessage.message }</span> }
                  action={[
                    <Tooltip title={venueContext.state.feedbackMessage.details} style={{ maxWidth: 500, fontSize: '2em' }}>
                      <IconButton key="close" color="inherit" onClick={venueContext.actions.closeErrorFeedback}>
                        <Help/>
                      </IconButton>
                    </Tooltip>,

                    <IconButton key="close" color="inherit" onClick={venueContext.actions.closeErrorFeedback}>
                      <Close/>
                    </IconButton>
                  ]}
                />
              </Snackbar>

              <section className="section-content">
                {
                  this.interfaceBuilder(venueContext.state.uiType, venueContext)
                }
              </section>
            </div>
          )
        }
      </VenueContext.Consumer>
    )
  }
}

export default VenueController
