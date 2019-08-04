import React, { Component } from 'react'
import { Paper } from '@material-ui/core'

import '../scss/Listing.scss'

import { VenueListItem } from './ui/VenueListItem'

export class VenueListing extends Component {
  state = {
    listing: [
      {
        _id: 'abcdef',
        venueTitle: 'Editing 1'
      },
      {
        _id: 'bcdef1',
        venueTitle: 'Editing 2'
      },
      {
        _id: 'cdef12',
        venueTitle: 'Editing 3'
      },
      {
        _id: 'def123',
        venueTitle: 'Editing 4'
      }
    ]
  }

  componentDidMount() {
    // const provider = new ListingProvider
    // const x = provider.fetch('venues').toString()
    // console.log(x)

    // provider.fetch().subscribe()
  }

  render() {
    return (
      <div className="listings">
        <span className="table-title">Venues Listing</span>

        <Paper className="listing-table">
          <div>
            {
              this.state.listing.map((item, index)=>{
                return (
                  <div key={ `venueListing_${index}` }>
                    <VenueListItem data={ item }/>

                    {
                      index!==(this.state.listing.length-1) ? <hr/> : <span/>
                    }
                  </div>
                )
              })
            }    
          </div>    
        </Paper>
      </div>
    )
  }
}

export default VenueListing
