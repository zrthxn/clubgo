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
import { RootContextProvider, RootContext } from './RootContextProvider'

import Home from './views/Home/Home'
import EventListing from './views/Events/Events'
import EventDetails from './views/Events/Details'
import VenueListing from './views/Venues/Venues'
import VenueDetails from './views/Venues/Details'
import Search from './views/Search/Search'
import LoginManager from './views/Login/Login'

import Header from './partials/Header/Header'
import Footer from './partials/Footer/Footer'
import NotFound from './partials/Errors/NotFound'
import BookingController from './views/Bookings/Booking'

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
    this.validateApplication().then(async ()=>{
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
    if(this.state.appValidationFinished)
      return (
        <Router>
          <ThemeProvider theme={MaterialUITheme}>
            <RootContextProvider>
              <Header/>

              <RootContext.Consumer>
                {
                  appContext => (
                    <Switch>
                      <Route exact path="/" component={Home}/>
                      <Route path="/in/:city" render={(routeProps)=>{
                        let { city } = routeProps.match.params
                        city = city.substr(0,1).toUpperCase() + city.substr(1).toLowerCase()
                        return (
                          <Home city={city} { ...routeProps }/>
                        )
                      }}/>

                      <Route path="/events/in/:city" render={(routeProps)=>(
                        <EventListing { ...routeProps }/>
                      )}/>
                      <Route exact path="/events/detail/:id" render={(routeProps)=>(
                        <EventDetails { ...routeProps }/>
                      )}/>
                      
                      <Route path="/venues/in/:city" render={(routeProps)=>( 
                        <VenueListing { ...routeProps }/>
                      )}/>
                      <Route exact path="/venues/detail/:id" render={(routeProps)=>(
                        <VenueDetails { ...routeProps }/> 
                      )}/>

                      <Route path="/bookings/:id" render={(routeProps)=>(
                        <BookingController { ...routeProps }/>
                      )}/>

                      <Route path="/search" render={(routeProps)=>(
                        <Search { ...routeProps }/>
                      )}/>

                      <Route path="/login" render={(routeProps)=>(
                        <LoginManager { ...routeProps }/>
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
    else
      return (
        <div style={{ height: '100vh', padding: '4em', display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ textAlign: 'center', margin: 'auto' }}>
            Loading
          </h1>
        </div>
      )
  }
}
