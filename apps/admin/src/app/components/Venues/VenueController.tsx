import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { Nav, NavItem } from 'reactstrap'
import { Grid, Snackbar, SnackbarContent, IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { green, red } from '@material-ui/core/colors'

import '../scss/Create.scss'

import { VenueEditor } from './VenueEditor'
import { VenueListing } from './VenueListing'
import { VenueContext } from './VenueContext'

export class VenueController extends Component {
  static contextType = VenueContext

  interfaceBuilder = ( contextState ) => {
    const { uiType } = contextState
    if(uiType==='create')
      return (
        <VenueEditor intent={'create'}
          onFinalize={(res)=>{
            this.context.actions.openSuccessFeedback(res)
            this.context.actions.openVenueListing()
          }}
          onError={(err)=>{
            this.context.actions.openErrorFeedback('Failed. ' + err)
          }}
        />
      )
    else if(uiType==='list')
      return (
        <VenueListing/>
      )
    else if(uiType==='edit')
      return (
        <VenueEditor intent={'update'}
          populateData={ contextState.venueData }
          onFinalize={()=>{
            this.context.actions.openSuccessFeedback('Venue Updated')
            this.context.actions.openVenueListing()
          }}
          onError={(err)=>{
            this.context.actions.openErrorFeedback('Failed. ' + err)
          }}
        />
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
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                autoHideDuration={5000}
                onClose={()=>{
                  this.setState({
                    successFeedback: false
                  })
                }}
              >
                <SnackbarContent
                  style={{ backgroundColor: green[600] }}
                  message={ <span>{ venueContext.state.feedbackMessage }</span> }
                  action={[
                    <IconButton key="close" color="inherit" onClick={venueContext.actions.closeSuccessFeedback}>
                      <Close/>
                    </IconButton>,
                  ]}
                />
              </Snackbar>

              <Snackbar open={ venueContext.state.openErrorFeedback }
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                autoHideDuration={5000}
                onClose={()=>{
                  this.setState({
                    successFeedback: false
                  })
                }}
              >
                <SnackbarContent
                  style={{ backgroundColor: red[600] }}
                  message={ <span>{ venueContext.state.feedbackMessage }</span> }
                  action={[
                    <IconButton key="close" color="inherit" onClick={venueContext.actions.closeErrorFeedback}>
                      <Close/>
                    </IconButton>,
                  ]}
                />
              </Snackbar>

              <section className="section-content">
                {
                  this.interfaceBuilder( venueContext.state )
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
