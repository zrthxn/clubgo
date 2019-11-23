import React, { Component } from 'react'
import { Grid, Paper, Switch } from '@material-ui/core'
import Select from 'react-select'
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

    filterSuggestions: {
      cities: []
    },
    search: {
      maxRecords: 0,
      lazyLoad: true,
      options: {
        when: null,
        includePastEvents: false,
        includeUnpublishedEvents: false
      },
      query: {

      }
    },
  }

  locationService = new DatabaseService('/location')

  componentDidMount() {
    this.loadListings(this.state.search.query)
    this.fetchCities().then((cities)=>{
      let { filterSuggestions } = this.state
      filterSuggestions.cities = []
      for (let city of cities) {
        filterSuggestions.cities.push({
          label: city.city, value: city.city
        })
      }
      this.setState({
        filterSuggestions
      })
    })
  }

  fetchCities = async () => {
    let { data } = await this.locationService.list()
    return data.results
  }

  loadListings = async (query) => {
    this.setState({ loading: true })
    let { search } = this.state, listing, errorText
    try {
      let { data } = await this.service.recommend(query, search.options)
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
              suggestions: this.state.filterSuggestions.cities
            }
          ]}
          onChange={(filters)=>{
            this.loadListings(filters)
          }}
        />

        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Select 
              options={[
                'Today', 'Tomorrow', 'Later'
              ].map((item)=>({
                label: item, value: item.toLowerCase()
              }))}
              placeholder="Event Day"
              isClearable
              onChange={(selected)=>{
                let { search } = this.state
                search.options.when = selected.value
                this.setState({
                  search
                })
              }}
            />
          </Grid>

          <Grid item xs={3}>
            <label>Include Past Events</label>
            <Switch 
              onChange={({ target })=>{
                let { search } = this.state
                search.options.includePastEvents = target.checked
                this.setState({
                  search
                })
              }}
            />
          </Grid>

          <Grid item xs={3}>
            <label>Include Unpublished Events</label>
            <Switch 
              onChange={({ target })=>{
                let { search } = this.state
                search.options.includeUnpublishedEvents = target.checked
                this.setState({
                  search
                })
              }}
            />
          </Grid>
        </Grid>

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
