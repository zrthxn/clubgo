import React, { Component } from 'react'
import { IVenueModel } from '@clubgo/database'

import { VenueContext } from '../VenueContext'

export interface VenueListItemProps {
  data?: any, //IVenueModel
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
              <span>{ this.props.data.venueTitle }</span>
              
              <span>
                <button onClick={() => venueContext.actions.editVenue(this.props.data)}>
                  Edit
                </button>
                
                <button onClick={
                  () => {
                    // open confirmation modal
                    // on yes =>
                    venueContext.actions.deleteVenue(this.props.data._id)
                  }
                }>
                  Delete  
                </button>
              </span>

              {
                this.state.openModal ? (
                  <div></div>
                ) : (
                  <div></div>
                )
              }
            </div>
          )
        }
      </VenueContext.Consumer>
    )
  }
}

export default VenueListItem
