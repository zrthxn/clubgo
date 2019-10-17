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
import { IVenueModel } from '@clubgo/database'
import { DatabaseService } from '@clubgo/api'

export interface VenueControllerProps {
  mount?: 'create' | 'list'
}
export class VenueController extends Component<VenueControllerProps> {
  static contextType = VenueContext
  context!: React.ContextType<typeof VenueContext>

  venueService = new DatabaseService('/venue')

  componentDidMount() {
    if(this.props.mount!==undefined) {
      if(this.props.mount==='create')
        this.context.actions.openVenueEditor('create')
      else if(this.props.mount==='list')
        this.context.actions.openVenueListing()
    }
  }

  interfaceBuilder = ( uiType, context ) => {
    if(uiType==='create')
      return (
        <VenueEditor intent={'create'} onFinalize={(createBody:IVenueModel)=>{
          this.venueService.create(createBody).then((result) => {
            if (result.status===201) {
              this.context.actions.openSuccessFeedback('Venue Created')
              this.context.actions.openVenueListing()
            }
            else throw result
          }).catch((VenueServiceError) => {
            this.handleVenueServiceError(VenueServiceError)
          })
        }}/>
      )
    else if(uiType==='list')
      return (
        <VenueListing onDelete={ async (venueId)=>{
          try {
            await this.venueService.delete(venueId)
            this.context.actions.openSuccessFeedback('Venue Deleted')
            return
          } catch(VenueServiceError) {
            this.handleVenueServiceError(VenueServiceError)
          }
        }}/>
      )
    else if(uiType==='edit')
      return (
        <VenueEditor intent={'update'} populateData={context.state.venueData} onFinalize={(updateBody)=>{
          this.venueService.update(context.state.venueData._id, updateBody).then((result) => {
            if(result.status===200) {
              this.context.actions.openSuccessFeedback('Venue Updated')  
              this.context.actions.openVenueListing()
            }
            else throw result
          }).catch((VenueServiceError) => {
            this.handleVenueServiceError(VenueServiceError)
          })
        }}/>
      )
    else
      return (
        <section>
          <div>Venues Page</div>
          <p>{ uiType }</p>
        </section>
      )
  }

  handleVenueServiceError = (VenueServiceError) => {
    console.error(VenueServiceError)
    
    this.context.actions.openErrorFeedback(
      VenueServiceError.data.error._message, 
      VenueServiceError.data.error.message
    )
  }

  render() {
    return (
      <VenueContext.Consumer>
        {
          venueContext => (
            <div>
              <section className="section-content">
                {
                  this.interfaceBuilder(venueContext.state.uiType, venueContext)
                }
              </section>

              <Snackbar open={ venueContext.state.openSuccessFeedback }
                // SUCCESS
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
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
                      <IconButton key="help" color="inherit" onClick={venueContext.actions.closeErrorFeedback}>
                        <Help/>
                      </IconButton>
                    </Tooltip>,

                    <IconButton key="close" color="inherit" onClick={venueContext.actions.closeErrorFeedback}>
                      <Close/>
                    </IconButton>
                  ]}
                />
              </Snackbar>
            </div>
          )
        }
      </VenueContext.Consumer>
    )
  }
}

export default VenueController
