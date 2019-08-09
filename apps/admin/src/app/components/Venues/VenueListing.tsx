import React, { Component } from 'react'
import { Paper } from '@material-ui/core'

import '../scss/Listing.scss'

import { VenueListItem } from './ui/VenueListItem'
import { IVenueModel } from '@clubgo/database'
import { VenueService } from '@clubgo/features/api'
import { VenueContext } from './VenueContext'

export class VenueListing extends Component {
  static contextType = VenueContext

  state = {
    loading: true,
    listing: []
  }

  componentDidMount() {
    this.loadVenueListings()
  }

  loadVenueListings = () => {
    this.context.actions.list().then(({ data })=>{
      let { listing } = this.state
      listing = data.results
      this.setState({
        listing,
        loading: false
      })
    }).catch((err)=>{
      this.context.actions.openErrorFeedback(err.toString())
      this.setState({
        loading: false
      })
    })
  }

  deleteVenue = async (venueId:string) => {
    try {
      await this.context.actions.delete(venueId)
      this.context.actions.openSuccessFeedback('Venue Deleted')
      let { listing } = this.state
      listing = listing.filter(listItem => {
        if(listItem._id!==venueId) return true
        else return false
      })
      this.setState({
        listing
      })
    } catch(err) {
      this.context.actions.openErrorFeedback(err.data._message)
    }
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
