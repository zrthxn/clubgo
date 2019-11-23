import React, { Component } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import ScrollArea from 'react-scrollbar'
import { observer } from 'mobx-react'

import './Home.scss'

import { Story, StoriesContainer, Carousel, Venue, FlexScroll, EventPlaceholder, SlidingCarousel } from '@clubgo/website/components'
import { Banner, Textbox, Recommender } from '@clubgo/website/components'
import { Event, Flexbox, FlexContainer } from '@clubgo/website/components'
import RootContext from '../../RootContext'

import { DatabaseService } from '@clubgo/api'
import { getFormattedDate } from '@clubgo/util'
import { IEventModel, IVenueModel } from '@clubgo/database'
import { SelectCity } from '@clubgo/website/components'

import ContextStore from '../../ContextStore'

type URLParams = { 
  city: string
}

interface HomeProps {
  city: string
  locality: string
}

@observer
export default class Home extends Component<HomeProps & RouteComponentProps<URLParams>> {
  static contextType = RootContext
  context!: React.ContextType<typeof RootContext>

  eventService = new DatabaseService('/event')
  auxCategoryService = new DatabaseService('/category')
  adService = new DatabaseService('/ads')

  state = {
    searchQuery: null,
    events: {
      nearby: []
    },
    categories: [],
    ads: []
  }

  componentDidMount() {
    // let { city } = ContextStore
    let { city } = this.props
    this.setState({ city })

    // Categories
    this.auxCategoryService.searchBy({
      categoryType: 'event'
    }).then(({ data })=>{
      this.setState({
        categories: data.results
      })
    })

    // Advertising
    this.adService.searchBy({
      city
    }).then(({ data })=>{
      let ads = []
      for (const ad of data.results) {
        ads.push({
          src: ad.imageURL, link: ad.link, text: ad.advertTitle
        })
      }
      this.setState({
        ads
      })
    })
  }
  
  render() {
    return (
      <article>
        <Carousel items={this.state.ads}/>

        <section className="container">
          <h2 className="scroll-title">Featured Events</h2>
          <Recommender path="/event" maxItemCount={6}
            query={{
              settings: {
                isFeatured: true
              },
              venue: {
                city: this.props.city
              }
            }}
            placeholder={EventPlaceholder}
            render={(eventProps:IEventModel)=>(
              <Event key={eventProps._id} size="large" color="white" data={eventProps} />
            )}
          />
        </section>

        <section className="container">
          <h2 className="scroll-title">Events Near You</h2>
          <Recommender path="/event" maxItemCount={6} shuffle
            query={{
              venue: {
                city: this.props.city,
                locality: undefined
              }
            }}
            placeholder={EventPlaceholder}
            render={(eventProps:IEventModel)=>(
              <Event key={eventProps._id} data={eventProps} />
            )}
          />
        </section>

        <section className="container">
          <h2>Categories</h2>
          <FlexScroll>
            {
              this.state.categories.map((category, index)=>(
                <Link className="no-decor" to={'/events/in/' +
                  `${this.props.city!==undefined ? this.props.city.toLowerCase() : ''}/` +
                  `${category.name.toLowerCase().trim().replace(/ /g, '-')}`}>
                  <div className="category-item">
                    <h3>{ category.name }</h3>
                  </div>
                </Link>
              ))
            }
          </FlexScroll>
        </section>

        <section className="container">
          <h2 className="scroll-title">Recommended</h2>
          <Recommender path="/event" maxItemCount={10} shuffle
            query={{
              venue: {
                city: this.props.city
              }
            }}
            placeholder={EventPlaceholder}
            render={(eventProps:IEventModel)=>(
              <Event key={eventProps._id} data={eventProps} />
            )}
          />
        </section>

        <section className="container">
          <h2>Events this Week</h2>
          <FlexScroll>
            {
              [
                { label: 'Today', date: getFormattedDate(Date.now()).date + ' ' + getFormattedDate(Date.now()).month },
                { label: 'Tomorrow', date: getFormattedDate(Date.now() + 86400000).date + ' ' + getFormattedDate(Date.now() + 86400000).month },
                { label: 'Later', date: 'This Week' }
              ].map((date, index)=>(
                <Link className="no-decor" to={'/events/in/' +
                  `${this.props.city!==undefined ? this.props.city.toLowerCase() : ''}/on/` +
                  `${date.label.toLowerCase().trim().replace(/ /g, '-')}`}>
                  <div className="event-date-item">
                    <h3>{ date.label }</h3>
                    <p>{ date.date }</p>
                  </div>
                </Link>
              ))
            }
          </FlexScroll>
        </section>

        <section className="container">
          <h2 className="scroll-title">Venues</h2>
          <Recommender path="/venue" maxItemCount={6} 
            query={{ city: this.props.city }}
            placeholder={EventPlaceholder}
            render={(venueProps:IVenueModel)=>(
              <Venue key={venueProps._id} data={venueProps} />
            )}
          />
        </section>
      </article>      
    )
  }
}
