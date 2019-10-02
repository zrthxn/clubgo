import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { IconButton } from '@material-ui/core'
import { Search, AccountCircle } from '@material-ui/icons'
import { stringify as QueryBuilder } from 'query-string'

import './Header.scss'

import RootContext from '../../RootContextProvider'
import { SelectCity } from '@clubgo/website/components'

export default class Header extends Component {
  static contextType = RootContext
  context!: React.ContextType<typeof RootContext>

  state = {
    searchQuery: null
  }

  render() {
    return (
      <header>
        <SelectCity 
          onComplete={()=>{
            this.context.actions.toggleCityLightbox()
          }}
        />
        
        <section className="container">
          <Link className="no-decor" to="/" style={{ padding: '1rem' }}>
            <h1 id="site-title">ClubGo</h1>
          </Link>

          <div className="nav-links">
            <Link className="no-decor" to="/events/in/delhi"><h4>Events</h4></Link>
            <Link className="no-decor" to="/venues/in/delhi"><h4>Venues</h4></Link>
          </div>

          <div style={{ margin: 'auto 0 auto auto' }}>
            <RootContext.Consumer>
              {
                appContext => (
                  <div className="set-city"
                    onClick={()=>{
                      appContext.actions.toggleCityLightbox()
                    }}
                  >
                    { appContext.state.city }
                  </div>
                )
              }
            </RootContext.Consumer>

            <IconButton onClick={()=>{ this.context.router('/search') }}>
              <Search/>
            </IconButton>
            
            {/* <IconButton onClick={()=>{ this.context.router('/account') }}>
              <AccountCircle/>
            </IconButton> */}
          </div>
        </section>
      </header>
    )
  }
}

