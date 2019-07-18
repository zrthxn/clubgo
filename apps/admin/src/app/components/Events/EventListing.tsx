import React, { Component } from 'react'
import { Paper } from '@material-ui/core'
import { ListingProvider } from '@clubgo/features/api'

import '../scss/Listing.scss'

import { EventListItem } from './ui/EventListItem'

export class EventListing extends Component {
  state = {
    listing: [
      {
        _id: 'abcdef',
        eventTitle: 'Editing 1'
      },
      {
        _id: 'bcdef1',
        eventTitle: 'Editing 2'
      },
      {
        _id: 'cdef12',
        eventTitle: 'Editing 3'
      },
      {
        _id: 'def123',
        eventTitle: 'Editing 4'
      }
    ]  
  }

  componentDidMount() {
    const provider = new ListingProvider
    const x = provider.fetch('events').toString()
    console.log(x)

    // provider.fetch().subscribe()
  }

  render() {
    return (
      <div className="listings">
        <span className="table-title">Events Listing</span>

        <Paper className="listing-table">
          <div>
            {
              this.state.listing.map((item, index)=>{
                return (
                  <div>
                    <EventListItem key={ item._id }
                      data={ item }
                    />

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

export default EventListing
