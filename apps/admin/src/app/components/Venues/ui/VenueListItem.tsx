import React, { Component } from 'react'
import { Grid, Button, IconButton, Modal, Paper, Tooltip } from '@material-ui/core'
import { red, blue, green } from '@material-ui/core/colors'
import { Edit, Delete } from '@material-ui/icons'
import { IVenueModel } from '@clubgo/database'

import '../../scss/Listing.scss'

import { VenueContext } from '../VenueContext'
import { ConfirmDelete } from '../../Modals/ConfirmDelete'

export interface VenueListItemProps {
  data?: IVenueModel,
  onDelete?: Function
}
export class VenueListItem extends Component<VenueListItemProps> {
  state = {
    openDeleteModal: false
  }

  render() {
    return (
      <VenueContext.Consumer>
        {
          venueContext => (
            <div className="list-item">
              <Grid container spacing={1}>
                <Grid item md={6} xs={12} style={{ display: 'flex', flexDirection: 'row' }}>
                  <div>
                    <h4>{ this.props.data.venueTitle }</h4>
                    <span>{ this.props.data.locality }, { this.props.data.city }</span>
                  </div>
                </Grid>

                <Grid item xs={2} style={{ display: 'flex', flexDirection: 'row' }}>
                  {
                    this.props.data.settings.isPublished ? (
                      <span style={{ margin: 'auto 1em', color: green[400] }}><b>Published</b></span>
                    ) : (
                      <span style={{ margin: 'auto 1em', color: '#1c1c1c' }}>Unpublished</span>
                    )
                  }
                </Grid>

                <Grid item md={4} xs={12}>
                  <div className="action clearfix">
                    <Tooltip title="Delete">
                      <IconButton className="float-right" onClick={()=>{
                        this.setState({
                          openDeleteModal: true
                        })
                      }}>
                        <Delete/> 
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Edit">
                      <IconButton className="float-right" onClick={()=>{
                        venueContext.actions.openVenueEditor('edit', this.props.data)
                      }}>
                        <Edit/>
                      </IconButton>
                    </Tooltip>

                    <ConfirmDelete isOpen={this.state.openDeleteModal}
                      confirm={()=>{
                        this.setState({ openDeleteModal: false })
                        this.props.onDelete()
                      }}
                      close={()=>{
                        this.setState({ openDeleteModal: false })
                      }}
                    >
                      <h3>Delete Venue</h3>
                      <p>
                        Are you sure you want to delete this venue? <br/>
                        This action is irreversible.
                      </p>
                    </ConfirmDelete>
                  </div>
                </Grid>
              </Grid>
            </div>
          )
        }
      </VenueContext.Consumer>
    )
  }
}

export default VenueListItem
