import React, { Component } from 'react'
import { Nav, Navbar, NavItem } from 'reactstrap'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { version } from '@clubgo/util'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import blue from '@material-ui/core/colors/blue';

import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from '@material-ui/core'
import { AccountCircle, MenuRounded, MessageRounded, Notifications } from '@material-ui/icons'

import '../assets/scss/Admin.scss'

import { LoginPage } from './pages/LoginPage'
import { Dashboard } from './pages/Dashboard'
import { EventsPage } from './pages/EventsPage'
import { VenuesPage } from './pages/VenuesPage'
import { TicketsPage } from './pages/TicketsPage'

const theme = createMuiTheme({
  palette: {
    primary: blue,
    // secondary: {
    //   light: '#ffffff',
    //   main: '#ffffff',
    //   dark: '#ffffff'
    // },
    error: {
      main: '#ff0000'
    }
  }
})

export class Admin extends Component {
  state = {
    authenticated: false,
    userAccountMenuOpen: false
  }

  onExecute = () => {
    this.setState({
      authenticated: true
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
              <Link to="/dashboard"> Users </Link>
              <Link to="/events"> Events </Link>
              <Link to="/venues"> Venues </Link>
              <Link to="/tickets"> Tickets </Link>
              <Link to="/dashboard"> Artists </Link>
              <Link to="/dashboard"> Locations </Link>
              <Link to="/dashboard"> Coupons </Link>
              <Link to="/dashboard"> Settings </Link>
            </div>

            <div id="section-root">
              <AppBar position="static">
                <Toolbar>
                  <IconButton edge="start" color="inherit" aria-label="Menu"
                    onClick={
                      ()=>{
                        document.getElementById("sidebar-toggle")['checked'] = !document.getElementById("sidebar-toggle")['checked']
                      }
                  }>
                    <MenuRounded />
                  </IconButton>

                  <Typography variant="h6" style={{ flexGrow: 1 }}>Admin</Typography>

                  <IconButton color="inherit" onClick={()=>{}}>
                    <MessageRounded />
                  </IconButton>
                  
                  <IconButton color="inherit" onClick={()=>{}}>
                    <Notifications />
                  </IconButton>

                  <IconButton color="inherit" onClick={()=>{}}>
                    <AccountCircle />
                  </IconButton>

                  {/* <Menu id="menu-appbar" keepMounted
                    open={ this.state.userAccountMenuOpen }
                    // anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    onClose={()=>{}
                  }>
                    <MenuItem>Profile</MenuItem>
                    <MenuItem>My account</MenuItem>
                  </Menu> */}
                </Toolbar>
              </AppBar>

              <section id="content">
                <Switch>
                  <Route exact path="/" component={ Dashboard } />
                  <Route path="/dashboard" component={ Dashboard } />
                  <Route path="/events" component={ EventsPage } />
                  <Route path="/venues" component={ VenuesPage } />
                  <Route path="/tickets" component={ TicketsPage } />
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
              <LoginPage loginHandler={ this.onExecute } />
            )
          }
        </div>
      </ThemeProvider>      
    )
  }
}

export default Admin