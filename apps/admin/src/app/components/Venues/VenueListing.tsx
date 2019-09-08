import React, { Component } from 'react'
import { Paper } from '@material-ui/core'

import '../scss/Listing.scss'

import { DatabaseService } from '@clubgo/features/api'

import { Filters } from '../Filters/Filters'
import { VenueListItem } from './ui/VenueListItem'
import { VenueContext } from './VenueContext'
import { IVenueModel } from '@clubgo/database'

interface VenueListingProps {
  onDelete: Function
}

export class VenueListing extends Component<VenueListingProps> {
  static contextType = VenueContext
  context!: React.ContextType<typeof VenueContext>

  service = new DatabaseService('/venue')

  state = {
    loading: true,
    errorText: undefined,
    listing: Array<IVenueModel>(),

    search: {
      maxRecords: 0,
      lazyLoad: true,
      query: {

      }
    }
  }

  componentDidMount() {
    this.loadListings(this.state.search)
  }

  async loadListings(search) {
    let { query } = search, listing, errorText
    try {
      let { data } = await this.service.searchBy(query)
      errorText = undefined
      if(data.results.length > 0) 
        listing = data.results
      else
        errorText = 'No results found for this query!'
    } catch (err) {
      this.context.actions.openErrorFeedback(err)
      errorText = err
    }

    this.setState(()=>{
      return {
        listing,
        errorText,
        loading: false
      }
    })

    return
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

          <Filters 
            filters={[
              {
                key: 'city',
                placeholder: 'City',
                suggestions: [
                  {
                    label: 'Delhi',
                    value: 'Delhi'
                  },
                  {
                    label: 'Mumbai',
                    value: 'Mumbai'
                  }
                ]
              }
            ]}
            onChange={(filters)=>{
              this.loadListings({
                query: filters
              })
            }}
          />

          <p style={{ color: '#ff0000', margin: '1em' }}>{ this.state.errorText }</p>

          <div className="listing-table">
            {
              !this.state.loading && this.state.listing!==undefined ? (
                this.state.listing.map((item, index)=>{
                  return (
                    <VenueListItem data={ item } key={ `venueListing_${index}` }
                      onDelete={()=>{
                        this.deleteVenue(item._id)
                      }}
                    />
                  )
                })
              ) : (
                null
              )
            }    
          </div>
      </div>
    )
  }
}

export default VenueListing
