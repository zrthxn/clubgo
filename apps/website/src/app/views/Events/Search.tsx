import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { parse as QueryParser } from 'query-string'

import Context from '../../ContextProvider'
import { IEventModel } from '@clubgo/database'

import { DatabaseService } from '@clubgo/features/api'

export default class Search extends Component<RouteComponentProps> {
  static contextType = Context
  context!: React.ContextType<typeof Context>

  eventService = new DatabaseService('/event')

  state = {
    loading: true,
    events: []
  }

  componentDidMount() {
    let query = QueryParser(this.props.location.search)
    this.eventService.searchBy({
      venue: {
        city: query.city
      },
      // $text: {
      //   $search: query.q
      // }
    }).then(({ data })=>{
      this.setState({
        loading: false,
        events: data.results
      })
    })
  }
  
  render() {
    if(!this.state.loading)
      return (
        <div>
          <p>
            Found { this.state.events.length } events matching your search
          </p>
        </div>
      )
    else
      return (
        <article>
          <section style={{ height: '100vh' }} className="center">
            <h1 style={{ margin: '5em' }}>Loading</h1>
          </section>
        </article>
      )
  }
}
