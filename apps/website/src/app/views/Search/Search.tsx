import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { parse as QueryParser } from 'query-string'

import RootContext from '../../RootContext'
import { IEventModel } from '@clubgo/database'

import { DatabaseService } from '@clubgo/api'
import { Event, Textbox, StoriesContainer, Flexbox, FlexContainer, Recommender } from '@clubgo/website/components'

export default class Search extends Component<RouteComponentProps> {
  static contextType = RootContext
  context!: React.ContextType<typeof RootContext>

  eventService = new DatabaseService('/event')
  venueService = new DatabaseService('/venue')

  state = {
    loading: true,
    searchQuery: null,
    recommendations: {
      nearby: [
        
      ]
    },
    searchResults: {
      events: [
      
      ],
      venues: [
        
      ]
    }
  }

  componentDidMount() {
    this.queryParamSearch()

    let { city } = this.context.actions.getUserContext()
    this.eventService.searchBy({
      venue: {
        city
      }
    }).then(({ data })=>{
      this.setState({
        recommendations: {
          nearby: data.results
        }
      })
    })
  }

  queryParamSearch = async () => {
    let queryParams = QueryParser(this.props.location.search)
    if(queryParams.q!==null && queryParams.q!==undefined) {

      if(queryParams.city===undefined)
        queryParams.city = this.context.actions.getUserContext().city

      this.eventService.searchBy({
        venue: {
          city: queryParams.city
        },
        $text: {
          $search: queryParams.q.replace(/-/g, ' ')
        }
      }).then(({ data })=>{
        this.setState({
          loading: false,
          searchResults: {
            events: data.results
          }
        })
      })
    }
  }

  search = async () => {
    let { searchQuery } = this.state
    if(searchQuery!==null && searchQuery.q!==undefined) {
      if(searchQuery.city===undefined)
        searchQuery.city = this.context.actions.getUserContext().city

      this.eventService.searchBy({
        venue: {
          city: searchQuery.city
        },
        $text: {
          $search: searchQuery.q
        }
      }).then(({ data })=>{
        this.setState({
          loading: false,
          searchResults: {
            events: data.results
          }
        })
      })
    }
  }
  
  render() {
    return (
      <article>
        <section className="center">
          <h1 className="light">Search</h1>
          <Textbox unconstrained placeholder="Find events near you" margins="normal"
            spellCheck={false} 
            style={{ textAlign: 'center' }}
            onChange={({ target })=>{
              this.setState(()=>{
                if(target.value!=='')
                  return {
                    searchQuery: {
                      q: target.value
                    }
                  }
                else
                  return {
                    searchQuery: null
                  }
              })
            }}
            onKeyDown={(event)=>{
              if(event.key==='Enter' && this.state.searchQuery.q.length>=3) {
                this.context.router(`/search?q=${this.state.searchQuery.q.replace(/ /g, '-')}`)
                this.search()
              }
            }}
          />
        </section>
        
        {
          !this.state.loading ? (
            <RootContext.Consumer>
              {
                appContext => (
                  <section>
                    <h2>
                      Events in {
                        appContext.state.city.substr(0,1).toUpperCase() + appContext.state.city.substr(1)
                      }
                    </h2>
                    <h3>Found { this.state.searchResults.events.length } events matching your search</h3>
                    
                    <section>
                      <FlexContainer>
                        <Flexbox>
                          {
                            this.state.searchResults.events.map((event, index)=>{
                              return (
                                <Event key={`search-event-${index}`} data={event}/>
                              )
                            })
                          }
                        </Flexbox>
                      </FlexContainer>
                    </section>
                  </section>
                )
              }
            </RootContext.Consumer>
          ) : (
            <section className="container"> 
              <StoriesContainer/>
            </section>
          )
        }

        <section className="container">
          <h2>Recommended Events</h2>
          <h4>Selected Events for you</h4>
          <Recommender path="/event" query={{
            venue: {
              city: this.props.city
            }
          }}
            render={(eventProps:IEventModel)=>(
              <Event key={eventProps._id} data={eventProps} />
            )}
          />
        </section>
      </article>
    )
  }
}
