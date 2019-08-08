import React, { Component } from 'react'
import { Grid, Button, Fab } from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import { Edit, Delete } from '@material-ui/icons'
import { IVenueModel } from '@clubgo/database'

import '../../scss/Listing.scss'

import { VenueContext } from '../VenueContext'

export interface VenueListItemProps {
  data?: IVenueModel
}
export class VenueListItem extends Component<VenueListItemProps> {
  state = {
    openModal: false
  }

  render() {
    return (
      <VenueContext.Consumer>
        {
          venueContext => (
            <div className="list-item">
              <Grid container spacing={1}>
                <Grid item md={8} xs={12}>
                  <span>{ this.props.data.venueTitle }</span>
                </Grid>

                <Grid item md={4} xs={12}>
                  <div className="action">
                    <Fab color="primary" size="small"
                      onClick={()=>venueContext.actions.openVenueEditor('edit', this.props.data)}
                    >
                      <Edit/>
                    </Fab>
                    
                    <Fab color="secondary" size="small"
                      onClick={()=>{
                          // open confirmation modal
                          // on yes =>
                          // venueContext.actions.deleteVenue(this.props.data._id)
                      }}
                    >
                      <Delete/> 
                    </Fab>
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
