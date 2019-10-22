import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { IconButton } from '@material-ui/core'
import { Search, AccountCircle } from '@material-ui/icons'
import { stringify as QueryBuilder } from 'query-string'

import './Header.scss'

import RootContext from '../../RootContext'
import { SelectCity } from '@clubgo/website/components'

export default class Header extends Component {
  static contextType = RootContext
  context!: React.ContextType<typeof RootContext>

  state = {
    openSidebar: false
  }

  toggleSidebar = () => {
    this.setState(()=>({
      openSidebar: !this.state.openSidebar
    }))
  }

  render() {
    return (
      <RootContext.Consumer>
        {
          appContext => (
            <header>
              <SelectCity onComplete={()=>{
                  this.context.actions.toggleCityLightbox()
                }}
              />
              
              <section className="container">
                <input type="checkbox" checked={this.state.openSidebar} id="sidebar-toggle" hidden readOnly/>
                <label htmlFor="sidebar-toggle" className="hamburger" onClick={this.toggleSidebar}><span></span></label>
                
                <div className="sidebar-shadow" id="sidebar-shadow" onClick={this.toggleSidebar}/>

                {
                  this.state.openSidebar ? (
                    <div className="sidebar">
                      <nav className="sidebar-nav">
                        <Link onClick={this.toggleSidebar} to={
                          appContext.state.city!==undefined ? (
                            `/events/in/${appContext.state.city.toLowerCase()}`
                          ) : '/events/in/delhi'
                        }>
                          Events
                        </Link>

                        <Link onClick={this.toggleSidebar} to={
                          appContext.state.city!==undefined ? (
                            `/venues/in/${appContext.state.city.toLowerCase()}`
                          ) : '/venues/in/delhi'
                        }>
                          Venues
                        </Link>
                      </nav>
                    </div>
                  ) : null
                }

                <Link className="no-decor" to="/" style={{ padding: '1rem' }}>
                  <h1 id="site-title">ClubGo</h1>
                </Link>

                <div className="desktop-nav">
                  <Link className="no-decor" to={
                    appContext.state.city!==undefined ? (
                      `/events/in/${appContext.state.city.toLowerCase()}`
                    ) : '/events/in/delhi'
                  }>
                    <h4>Events</h4>
                  </Link>
                  
                  <Link className="no-decor" to={
                    appContext.state.city!==undefined ? (
                      `/venues/in/${appContext.state.city.toLowerCase()}`
                    ) : '/venues/in/delhi'
                  }>
                    <h4>Venues</h4>
                  </Link>
                </div>

                <div style={{ margin: 'auto 0 auto auto' }}>
                  <div className="set-city" onClick={()=>{
                    appContext.actions.toggleCityLightbox()
                  }}>
                    { appContext.state.city } <label htmlFor=""/>
                  </div>

                  <IconButton onClick={()=>{ this.context.router('/search') }}>
                    <Search/>
                  </IconButton>
                  
                  <IconButton onClick={()=>{ this.context.router('/account') }}>
                    <AccountCircle/>
                  </IconButton>
                </div>
              </section>
            </header>
          )
        }
      </RootContext.Consumer>
    )
  }
}

