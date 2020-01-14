import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { parse as QueryParser } from 'query-string'

import RootContext from '../../RootContext'
import { IEventModel } from '@clubgo/database'

import { DatabaseService } from '@clubgo/api'
import { Event, Textbox, Flexbox, FlexContainer, Recommender } from '@clubgo/website/components'

export default class Search extends Component<RouteComponentProps> {
  static contextType = RootContext
  context!: React.ContextType<typeof RootContext>

  eventService = new DatabaseService('/event')
  venueService = new DatabaseService('/venue')

  state = {
    loading: true,
    searchQuery: null,
    searchResults: {
      events: [
      
      ],
      venues: [
        
      ]
    }
  }

  componentDidMount() {
    this.queryParamSearch()

    let { city } = this.context.actions.getUserContext().city
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
      <RootContext.Consumer>
        {
          appContext => (
            <article>
              <section className="center container">
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

                <br/>
              
                {
                  !this.state.loading ? (
                    <div>
                      <h2>
                        Events in {
                          appContext.state.city.substr(0,1).toUpperCase() + appContext.state.city.substr(1)
                        }
                      </h2>
                      <h3>Found { this.state.searchResults.events.length } events matching your search</h3>
                      <br/>
                      
                      <div>
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
                      </div>
                    </div>
                  ) : null
                }
              </section>

              <section className="container">
                <Recommender path="/event" 
                  title="Trending Events"
                  query={{
                    venue: {
                      // city: appContext.actions.getUserContext().city
                    }
                  }}
                  render={(eventProps:IEventModel)=>(
                    <Event key={eventProps._id} data={eventProps} />
                  )}
                />
              </section>

              <section className="container">
                <Recommender path="/event" 
                  title="Recommended Events"
                  query={{
                    venue: {
                      // city: appContext.actions.getUserContext().city
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
      </RootContext.Consumer>
    )
  }
}
