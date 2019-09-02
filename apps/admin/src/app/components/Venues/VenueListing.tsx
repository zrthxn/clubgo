import React, { Component } from 'react'
import { Paper } from '@material-ui/core'

import '../scss/Listing.scss'

import { VenueListItem } from './ui/VenueListItem'
import { VenueContext } from './VenueContext'
import { IVenueModel } from '@clubgo/database'
import { DatabaseService } from '@clubgo/features/api'

export interface VenueListingProps {
  onDelete: Function
}
export class VenueListing extends Component<VenueListingProps> {
  static contextType = VenueContext
  venueService = new DatabaseService({ endpoint: 'api', path: '/venue' })

  state = {
    loading: true,
    errorText: undefined,
    query: {
      findBy: null,
      params: [],
      maxRecords: 0,
      lazyLoad: true
    },
    listing: Array<IVenueModel>()
  }

  componentDidMount() {
    this.loadVenueListings()
  }

  loadVenueListings = async () => {
    try {
      let { data } = await this.venueService.list()
      let { listing } = this.state

      if(data.results!==undefined)
        listing = data.results

      this.setState({
        listing,
        loading: false
      })
    } catch (err) {
      this.setState(()=>{
        this.context.actions.openErrorFeedback(err.toString())
        return {
          loading: false,
          errorText: err.toString()
        }
      })
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

          <p style={{ color: '#ff0000' }}>{ this.state.errorText }</p>

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
