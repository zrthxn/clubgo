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

import { LoginService } from '@clubgo/features/api'
import { ContextProvider, Context } from './ContextProvider'

import Home from './views/Home/Home'
import EventListing from './views/Events/Events'
import EventDetails from './views/Events/Details'
import VenueDetails from './views/Venues/Details'
import Search from './views/Search/Search'

import Header from './partials/Header/Header'
import Footer from './partials/Footer/Footer'
import NotFound from './partials/Errors/NotFound'
import Booking from './views/Bookings/Booking'

const MaterialUITheme = createMuiTheme({
  palette: {
    primary: primaryThemeColor,
    secondary: secondaryThemeColor,
    error: errorThemeColor,
    type: 'light'
  }
})

export default class WebsiteController extends Component {
  static contextType = Context
  context!: React.ContextType<typeof Context>

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
          <ThemeProvider theme={MaterialUITheme}>
            <ContextProvider>
              <Header/>

              <Context.Consumer>
                {
                  appContext => (
                    <Switch>
                      <Route exact path="/" component={Home}/>
                      <Route path="/in/:city" render={(routeProps)=>{
                        let { city, locality } = routeProps.match.params
                        if(city==='delhi' || city==='mumbai') {
                          city = city.substr(0,1).toUpperCase() + city.substr(1).toLowerCase()
                          return (
                            <Home city={city} { ...routeProps }/>
                          )
                        }
                        else
                          appContext.router('/notfound')
                      }}/>

                      <Route path="/events/in/:city" render={(routeProps)=>(
                        <EventListing { ...routeProps }/>
                      )}/>
                      <Route exact path="/events/detail/:id" render={(routeProps)=>(
                        <EventDetails { ...routeProps }/>
                      )}/>
                      
                      <Route path="/venues/in/:city" render={(routeProps)=>( 
                        <EventListing { ...routeProps }/>
                      )}/>
                      <Route exact path="/venues/detail/:id" render={(routeProps)=>(
                        <VenueDetails { ...routeProps }/> 
                      )}/>

                      <Route path="/bookings/:id" render={(routeProps)=>(
                        <Booking { ...routeProps }/>
                      )}/>

                      <Route path="/search" render={(routeProps)=>(
                        <Search { ...routeProps }/>
                      )}/>

                      <Route component={NotFound}/>
                    </Switch>
                  )
                }
              </Context.Consumer>
              
              <Footer/>
            </ContextProvider>
          </ThemeProvider>
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
