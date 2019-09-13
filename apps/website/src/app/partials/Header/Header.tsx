import React, { Component } from 'react'
import { Banner, Textbox, Recommender } from '@clubgo/website/components'
import { stringify as QueryBuilder } from 'query-string'

import './Header.scss'

import Context from '../../ContextProvider'
import { Link } from 'react-router-dom'

export default class Header extends Component {
  static contextType = Context
  context!: React.ContextType<typeof Context>

  state = {
    searchQuery: null
  }

  render() {
    return (
      <header>
        <section className="container">
          <Link to="/"><h1 id="site-title">ClubGo</h1></Link>

          <div style={{ margin: 'auto 0.5em auto auto' }}>
            <Textbox spellCheck={false} placeholder="Search" margins="dense"
              onChange={({ target })=>{
                this.setState(()=>{
                  if(target.value!=='')
                    return {
                      searchQuery: target.value.toLowerCase().replace(/ /g, '-')
                    }
                  else
                    return {
                      searchQuery: null
                    }
                })
              }}
              onKeyDown={(event)=>{
                if(event.key==='Enter' && this.state.searchQuery!==null)
                  this.context.router(`/search?q=${this.state.searchQuery}`)
              }}
            />
          </div>
        </section>
      </header>
    )
  }
}

