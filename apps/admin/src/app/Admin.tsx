import React, { Component } from 'react'
import { Nav, Navbar, NavItem } from 'reactstrap'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { version } from '@clubgo/util'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { 
  blue as primaryThemeColor, 
  blueGrey as secondaryThemeColor,
  red as errorThemeColor
   
} from '@material-ui/core/colors'

import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from '@material-ui/core'
import { AccountCircle, MenuRounded, MessageRounded, Notifications } from '@material-ui/icons'

import './Admin.scss'

import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import EventsPage from './pages/EventsPage'
import VenuesPage from './pages/VenuesPage'
import TicketsPage from './pages/TicketsPage'
import OffersPage from './pages/OffersPage'
import SettingsPage from './pages/SettingsPage'

const theme = createMuiTheme({
  palette: {
    primary: primaryThemeColor,
    secondary: secondaryThemeColor,
    error: errorThemeColor,
    type: 'light'
  }
})

export class Admin extends Component {
  state = {
    authenticated: false,
    notificationsOpen: false,
    messagesOpen: false,
    userAccountMenuOpen: false
  }

  openMessages = () => {
    this.setState({
      messagesOpen: true
    })
  }

  openNotifications = () => {
    this.setState({
      notificationsOpen: true
    })
  }

  openUserAccountMenu = () => {
    this.setState({
      userAccountMenuOpen: true
    })
  }

  onAuthenticate = () => {
    return (
      <div id="admin-panel-root">
        <section id="panel">          
          <Router>
            <input type="checkbox" id="sidebar-toggle" hidden/>

            <div id="sidebar">
              <div className="title">
                <h3>ClubGo</h3>
                <h4>Admin</h4>
                <p id="version">Version { version }</p>
                <hr/>
              </div>

              <Link to="/dashboard"> Dashboard </Link>
              <Link to="/events"> Events </Link>
              <Link to="/venues"> Venues </Link>
              <Link to="/tickets"> Tickets </Link>
              <Link to="/offers"> Offers </Link>
              <Link to="/users"> Users </Link>
              <Link to="/artists"> Artists </Link>
              <Link to="/locations"> Locations </Link>
              <Link to="/settings"> Settings </Link>
            </div>

            <div id="section-root">
              <AppBar position="static">
                <Toolbar>
                  <IconButton edge="start" color="inherit" aria-label="Menu" style={{ zIndex: 11 }}
                    onClick={()=>{
                      document.getElementById("sidebar-toggle")['checked'] = !document.getElementById("sidebar-toggle")['checked']
                    }}
                  >
                    <MenuRounded />
                  </IconButton>

                  <Typography variant="h6" style={{ flexGrow: 1 }}>Admin</Typography>

                  <IconButton color="inherit" onClick={this.openMessages}>
                    <MessageRounded />
                  </IconButton>
                  
                  <IconButton color="inherit" onClick={this.openNotifications}>
                    <Notifications />
                  </IconButton>

                  <IconButton color="inherit" onClick={this.openUserAccountMenu}>
                    <AccountCircle />
                    {/* <Menu id="appbarUserAccountMenu" keepMounted
                      // anchorEl={}
                      open={ this.state.userAccountMenuOpen }
                      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                      onClose={()=>{
                        this.setState({
                          userAccountMenuOpen: false
                        })
                      }}
                    >
                      <MenuItem>Profile</MenuItem>
                      <MenuItem>My account</MenuItem>
                    </Menu> */}
                  </IconButton>
                </Toolbar>
              </AppBar>

              <section id="content">
                <Switch>
                  <Route exact path="/" component={ Dashboard } />
                  <Route path="/dashboard" component={ Dashboard } />
                  <Route path="/events" component={ EventsPage } />
                  <Route path="/venues" component={ VenuesPage } />
                  <Route path="/tickets" component={ TicketsPage } />
                  <Route path="/offers" component={ OffersPage } />
                  <Route path="/users" component={ TicketsPage } />
                  <Route path="/artists" component={ TicketsPage } />
                  <Route path="/locations" component={ TicketsPage } />
                  <Route path="/settings" component={ SettingsPage } />
                </Switch>
              </section>
            </div>
          </Router>
        </section>
      </div>
    )
  }

  render() {
    return (
      <ThemeProvider theme={ theme }>
        <div className="admin-root">
          {
            this.state.authenticated ? (
              this.onAuthenticate()
            ) : (
              <LoginPage onAuthenticate={()=>{
                this.setState({
                  authenticated: true
                })
              }} />
            )
          }
        </div>
      </ThemeProvider>      
    )
  }
}

export default Admin