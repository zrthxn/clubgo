import React, { Component } from 'react'
import { Paper } from '@material-ui/core'

import '../scss/Listing.scss'

import { VenueListItem } from './ui/VenueListItem'
import { IVenueModel } from '@clubgo/database'
import { VenueService } from '@clubgo/features/api'
import { VenueContext } from './VenueContext'

export interface VenueListingProps {
  onDelete: Function
}
export class VenueListing extends Component<VenueListingProps> {
  static contextType = VenueContext
  venueService = new VenueService('api')

  state = {
    loading: true,
    listing: []
  }

  componentDidMount() {
    this.loadVenueListings()
  }

  loadVenueListings = async () => {
    try {
      let { data } = await this.venueService.listVenues()
      let { listing } = this.state

      if(data.results!==undefined)
        listing = data.results

      this.setState({
        listing,
        loading: false
      })
    } catch (err) {
      this.context.actions.openErrorFeedback(err.toString())
    }
  }

  deleteVenue = async (venueId:string) => {
    await this.props.onDelete(venueId)
    let { listing } = this.state
    listing = listing.filter(listItem => {
      return listItem._id!==venueId
    })
    this.setState({
      listing
    })
  }

  render() {
    return (
      <div className="listings">
        <span className="table-title">Venues Listing</span>
          {
            this.state.loading ? <p>Loading...</p> : null
          }

          <div className="listing-table">
            {
              !this.state.loading && this.state.listing.map((item, index)=>{
                return (
                  <VenueListItem data={ item } key={ `venueListing_${index}` }
                    onDelete={()=>{
                      this.deleteVenue(item._id)
                    }}
                  />
                )
              })
            }    
          </div>
      </div>
    )
  }
}

export default VenueListing
