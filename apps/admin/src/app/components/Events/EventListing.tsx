import React, { Component } from 'react'
import { Grid, Paper } from '@material-ui/core'

import '../scss/Listing.scss'

import { EventListItem } from './ui/EventListItem'
import { EventContext } from './EventContext'
import { EventService } from '@clubgo/features/api'

export interface EventListingProps {
  onDelete: Function
}
export class EventListing extends Component<EventListingProps> {
  static contextType = EventContext
  eventService = new EventService('admin')

  state = {
    loading: true,
    query: {
      findBy: null,
      params: [],
      maxRecords: 0,
      lazyLoad: true
    },
    listing: []
  }

  componentDidMount() {
    this.loadVenueListings()
  }

  loadVenueListings = async () => {
    try {
      let { data } = await this.eventService.listEvents()
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

  deleteEvent = async (eventId:string) => {
    await this.props.onDelete(eventId)
    let { listing } = this.state
    listing = listing.filter(listItem => {
      return listItem._id!==eventId
    })
    this.setState({
      listing
    })
  }

  render() {
    return (
      <div className="listings">
        <span className="table-title">Events Listing</span>
        {
          this.state.loading ? <p>Loading...</p> : null
        }

        <div className="listing-table">
          {
            !this.state.loading && this.state.listing.map((item, index)=>{
              return (
                <EventListItem data={ item } key={ `eventListing_${index}` }
                  onDelete={()=>{
                    this.deleteEvent(item._id)
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

export default EventListing
