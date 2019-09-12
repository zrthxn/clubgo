import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './Global.scss'

import { LoginService } from '@clubgo/features/api'
import { ContextProvider } from './ContextProvider'
import Context from './ContextProvider'

import Home from './views/Home/Home'
import Events from './views/Events/Events'
import Details from './views/Events/Details'

import Header from './partials/Header/Header'
import Footer from './partials/Footer/Footer'
import NotFound from './partials/Errors/NotFound'
import Booking from './views/Bookings/Booking'

export default class WebsiteController extends Component {
  static contextType = Context
  context!: React.ContextType<typeof Context>

  state = {
    appValidationFinished: false
  }

  componentDidMount() {
    this.validateApplication().then(()=>{
      this.setState({
        appValidationFinished: true
      })
    }).catch((error)=>{
      console.error(error)
    })
  }

  async validateApplication() {
    const appAuthentication = new LoginService('auth')
    try {
      await appAuthentication.authenticate()
    } catch (error) {
      return Promise.reject(error)
    } finally {
      return
    }
  }

  render() {
    if(this.state.appValidationFinished)
      return (
        <Router>
          <ContextProvider>
            <Header/>

            <Context.Consumer>
              {
                appContext => (
                  <div>
                    <Switch>
                      <Route exact path="/" component={Home}/>
                      <Route exact path="/events" component={Events}/>

                      <Route exact path="/404" component={NotFound}/>

                      <Route exact path="/:city" render={(routeProps)=>{
                        let { city } = routeProps.match.params
                        if(city==='delhi' || city==='mumbai')
                          return (
                            <Home { ...routeProps }/>
                          )
                        else
                          appContext.router('/404')
                      }}/>

                      <Route exact path="/events/:city" render={(routeProps)=>{
                        let { city } = routeProps.match.params
                        if(city==='delhi' || city==='mumbai')
                          return (
                            <Events { ...routeProps }/>
                          )
                        else
                          appContext.router('/404')
                      }}/>

                      <Route path="/event/details/:eventRef" render={(routeProps)=>{
                        return (
                          <Details { ...routeProps }/>
                        )
                      }}/>

                      <Route path="/event/booking/:eventRef" render={(routeProps)=>{
                        return (
                          <Booking { ...routeProps }/>
                        )
                      }}/>

                      <Route component={NotFound}/>
                    </Switch>
                  </div>
                )
              }
            </Context.Consumer>
            
            <Footer/>
          </ContextProvider>
        </Router>
      )
    else
      return (
        <div style={{
          height: '100vh',
          padding: '4em',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h1 style={{ 
            textAlign: 'center',
            margin: 'auto'
          }}>
            Loading...
          </h1>
        </div>
      )
  }
}
