import React, { Component } from 'react'
import { Grid, Paper } from '@material-ui/core'

import '../scss/Listing.scss'

import { DatabaseService } from '@clubgo/api'

import { Filters } from '../Filters/Filters'
import { EventListItem } from './ui/EventListItem'
import { EventContext } from './EventContext'
import { IEventModel } from '@clubgo/database'

interface EventListingProps {
  onDelete: Function
}

export class EventListing extends Component<EventListingProps> {
  static contextType = EventContext
  context!: React.ContextType<typeof EventContext>

  service = new DatabaseService('/event')

  state = {
    loading: true,
    listing: Array<IEventModel>(),
    errorText: undefined,

    search: {
      maxRecords: 0,
      lazyLoad: true,
      query: {

      }
    },
  }

  componentDidMount() {
    this.loadListings(this.state.search)
  }

  loadListings = async (search) => {
    this.setState({ loading: true })
    let { query } = search, listing, errorText
    try {
      let { data } = await this.service.searchBy(query)
      errorText = undefined
      if(data.results.length > 0) 
        listing = data.results
      else
        errorText = 'No results found for this query!'
    } catch (err) {
      if(!err)
        err = 'Connection error to the API'
      this.context.actions.openErrorFeedback(err, 'Check your internet connection')
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
        <p className="table-title">Events Listing</p>

        <Filters 
          filters={[
            {
              key: 'settings.isPublished',
              placeholder: 'Published',
              suggestions: [
                { label: 'Published', value: true },
                { label: 'Unpublished', value: false }
              ]
            },
            {
              key: 'venue.city',
              placeholder: 'City',
              suggestions: [
                { label: 'Delhi', value: 'Delhi' },
                { label: 'Mumbai', value: 'Mumbai' },
                { label: 'Gurgaon', value: 'Gurgaon' },
                { label: 'Bangalore', value: 'Bangalore' }
              ]
            }
          ]}
          onChange={(filters)=>{
            this.loadListings({
              query: filters
            })
          }}
        />

        { 
          this.state.loading ? (
            <div>
              <div className="spinner"></div>
              <p>Loading</p>
            </div>
          ) : null 
        }

        <p style={{ color: '#ff0000', margin: '1em 0' }}>{ this.state.errorText }</p>

        <div className="listing-table">
          {
            !this.state.loading && this.state.listing!==undefined ? (
              this.state.listing.map((item, index)=>{
                return (
                  <EventListItem data={ item } key={ `eventListing_${index}` }
                    onDelete={()=>{
                      this.deleteEvent(item._id)
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

export default EventListing
