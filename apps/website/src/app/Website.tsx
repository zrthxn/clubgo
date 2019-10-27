import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { 
  blue as primaryThemeColor, 
  blueGrey as secondaryThemeColor,
  red as errorThemeColor
} from '@material-ui/core/colors'

import './Global.scss'

import { LoginService } from '@clubgo/api'
import { RootContextProvider, RootContext } from './RootContext'
import { LoginController } from '@clubgo/website/components'

import Home from './views/Home/Home'

import EventListing from './views/Events/EventListing'
import EventDetails from './views/Events/EventDetails'

import VenueListing from './views/Venues/VenueListing'
import VenueDetails from './views/Venues/VenueDetails'

import BookingController from './views/Bookings/BookingController'
import Search from './views/Search/Search'

import Header from './partials/Header/Header'
import Footer from './partials/Footer/Footer'
import NotFound from './partials/Errors/NotFound'

const MaterialUITheme = createMuiTheme({
  palette: {
    primary: primaryThemeColor,
    secondary: secondaryThemeColor,
    error: errorThemeColor,
    type: 'light'
  }
})

export default class WebsiteController extends Component {
  static contextType = RootContext
  context!: React.ContextType<typeof RootContext>

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
    const appAuthentication = new LoginService('user')
    try {
      await appAuthentication.authenticate()
    } catch (error) {
      return Promise.reject(error)
    } finally {
      return
    }
  }

  render() {
    return (
      <Router>
        <ThemeProvider theme={MaterialUITheme}>
          <RootContextProvider>
            <Header/>

            <RootContext.Consumer>
              {
                appContext => (
                  <Switch>
                    <Route exact path="/" render={(routeProps)=>{
                      let { city } = this.context.actions.getUserContext()
                      if(city!==undefined)
                        this.context.router(`/in/${city}`)
                      else
                        return <Home/>
                    }}/>
                    <Route path="/in/:city" render={(routeProps)=>{
                      let { city } = routeProps.match.params                      
                      if(city===undefined) {
                        city = this.context.actions.getUserContext().city
                        if(city===undefined)
                          this.context.router(`/in/${city}`)
                      }
                      
                      city = city.substr(0,1).toUpperCase() + city.substr(1).toLowerCase()
                      return (
                        <Home city={city} { ...routeProps }/>
                      )
                    }}/>
                    
                    <Route exact path="/event/:id" render={(routeProps)=>(
                      <EventDetails { ...routeProps }/>
                    )}/>

                    <Route exact path="/events" component={EventListing} />
                    <Route path="/events/in/:city/on/:when" render={(routeProps)=>(
                      <EventListing { ...routeProps }/>
                    )}/>
                    <Route path="/events/in/:city/:search" render={(routeProps)=>(
                      <EventListing { ...routeProps }/>
                    )}/>
                    <Route path="/events/in/:city" render={(routeProps)=>(
                      <EventListing { ...routeProps }/>
                    )}/>
                    
                    <Route exact path="/venue/:id" render={(routeProps)=>(
                      <VenueDetails { ...routeProps }/> 
                    )}/>
                    
                    <Route exact path="/venues" component={VenueListing} />
                    <Route path="/venues/in/:city" render={(routeProps)=>( 
                      <VenueListing { ...routeProps }/>
                    )}/>

                    <Route path="/bookings/:id" render={(routeProps)=>(
                      <BookingController { ...routeProps }/>
                    )}/>

                    <Route path="/search" render={(routeProps)=>(
                      <Search { ...routeProps }/>
                    )}/>

                    <Route path="/login" render={(routeProps)=>(
                      <LoginController { ...routeProps }/>
                    )}/>

                    <Route component={NotFound}/>
                  </Switch>
                )
              }
            </RootContext.Consumer>
            
            <Footer/>
          </RootContextProvider>
        </ThemeProvider>
      </Router>
    )
  }
}
