import React, { Component } from 'react'
import { Paper } from '@material-ui/core'

import '../scss/Listing.scss'

import { VenueListItem } from './ui/VenueListItem'
import { IVenueModel } from '@clubgo/database'
import { VenueService } from '@clubgo/features/api'

export class VenueListing extends Component {
  venueSerice = new VenueService('admin')

  state = {
    loading: true,
    listing: []
  }

  componentDidMount() {
    this.venueSerice.listVenues().then(({ data })=>{
      let { listing } = this.state
      listing = data.results
      this.setState({
        listing,
        loading: false
      })
    }).catch(()=>{

    })
  }

  render() {
    return (
      <div className="listings">
        <span className="table-title">Venues Listing</span>

          <div className="listing-table">
            {
              !this.state.loading && this.state.listing.map((item, index)=>{
                return (
                  <VenueListItem data={ item } key={ `venueListing_${index}` }/>
                )
              })
            }    
          </div>
      </div>
    )
  }
}

export default VenueListing
