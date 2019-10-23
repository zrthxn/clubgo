import React, { Component } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import ScrollArea from 'react-scrollbar'

import './Home.scss'

import { Story, StoriesContainer, Carousel, Venue, FlexScroll } from '@clubgo/website/components'
import { Banner, Textbox, Recommender } from '@clubgo/website/components'
import { Event, Flexbox, FlexContainer } from '@clubgo/website/components'
import RootContext from '../..//RootContext'

import { DatabaseService } from '@clubgo/api'
import { getFormattedDate } from '@clubgo/util'
import { IEventModel, IVenueModel } from '@clubgo/database'
import { SelectCity } from '@clubgo/website/components'

type URLParams = { 
  city: string
}

interface HomeProps {
  city: string
  locality: string
}

export default class Home extends Component<HomeProps & RouteComponentProps<URLParams>> {
  static contextType = RootContext
  context!: React.ContextType<typeof RootContext>

  eventService = new DatabaseService('/event')
  auxCategoryService = new DatabaseService('/category')

  state = {
    searchQuery: null,
    events: {
      nearby: [

      ]
    },
    categories: [

    ]
  }

  componentDidMount() {
    let { city } = this.props
    if(city===undefined) {
      city = this.context.actions.getUserContext().city
      if(city!==undefined)
        this.context.router(`/in/${city}`)
      else
        this.context.router('/')
    }

    // Find events
    this.eventService.searchBy({
      venue: {
        city
      }
    }).then(({ data })=>{
      let { events } = this.state
      events.nearby = data.results
      this.setState({
        events
      })
    })

    // Categories
    this.auxCategoryService.searchBy({
      categoryType: 'event'
    }).then(({ data })=>{
      this.setState({
        categories: data.results
      })
    })
  }
  
  render() {
    return (
      <article>
        <section className="container">
          <Carousel items={[
            {
              src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'
            },
            {
              src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'
            },
            {
              src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'
            }
          ]}/>
        </section>

        <section className="container">
          <h1>Featured Events</h1>
          <Recommender path="/event" maxItemCount={6}
            query={{
              settings: {
                isFeatured: true
              },
              venue: {
                city: this.props.city
              }
            }}
            render={(eventProps:IEventModel)=>(
              <Event key={eventProps._id} size="large" color="white" data={eventProps} />
            )}
          />
        </section>

        <section className="container">
          <h2>Events Near You</h2>
          <Recommender path="/event"
            query={{
              venue: {
                city: this.props.city,
                locality: undefined
              }
            }}
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
                <Link className="no-decor" to="/">
                  <div className="category-item">
                    <h3>{ category.name }</h3>
                  </div>
                </Link>
              ))
            }
          </FlexScroll>
        </section>

        <section className="container">
          <h2>Recommended</h2>
          <Recommender path="/event" maxItemCount={10} 
            query={{
              venue: {
                city: this.props.city
              }
            }}
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
                <Link className="no-decor" to="/">
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
          <h1>Venues</h1>
          <Recommender path="/venue" maxItemCount={4} 
            query={{ city: this.props.city }}
            render={(venueProps:IVenueModel)=>(
              <Venue key={venueProps._id} data={venueProps} />
            )}
          />
        </section>
      </article>      
    )
  }
}
