import React, { Component } from 'react'
import { Nav, Navbar, NavItem } from 'reactstrap'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { version } from '@clubgo/util'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { 
  blue as primaryThemeColor, 
  blueGrey as secondaryThemeColor,
  red as errorThemeColor,
  green, red
} from '@material-ui/core/colors'

import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Snackbar, SnackbarContent, Tooltip, Button } from '@material-ui/core'
import { AccountCircle, MenuRounded, MessageRounded, Notifications, Close, Help } from '@material-ui/icons'

import { Interface } from '@clubgo/api'

import './Admin.scss'

import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import EventsPage from './pages/EventsPage'
import VenuesPage from './pages/VenuesPage'
import TicketsPage from './pages/TicketsPage'
import OffersPage from './pages/OffersPage'
import LocationsPage from './pages/LocationsPage'
import SettingsPage from './pages/SettingsPage'

import AdminContextProvider from './AdminContextProvider'
import AdminContext from './AdminContext'

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
    validatedApplication: false,
    sidebarOpen: false,
    notificationsOpen: false,
    messagesOpen: false,
    userAccountMenuOpen: false
  }

  authService = new Interface({ endpoint: 'api' })

  constructor(props) {
    super(props)

    if(process.env.NODE_ENV!=='production')
      this.state.validatedApplication = true
  }

  componentDidMount() {
    this.validateApplication().then(()=>{
      this.setState({
        validatedApplication: true
      })
    })
  }

  async validateApplication() {
    try {
      await this.authService.authenticate()
      return
    } catch (error) {
      console.error(error)
      return Promise.reject(error)
    }
  }

  toggleMessages = () => {
    this.setState({
      messagesOpen: !this.state.messagesOpen
    })
  }

  toggleNotifications = () => {
    this.setState({
      notificationsOpen: !this.state.notificationsOpen
    })
  }

  toggleUserAccountMenu = () => {
    this.setState({
      userAccountMenuOpen: !this.state.userAccountMenuOpen
    })
  }

  toggleSidebar = () => {
    this.setState({
      sidebarOpen: !this.state.sidebarOpen
    })
  }

  onAuthenticate = (adminContext) => {
    return (
      <div id="admin-panel-root">
        <section id="panel">
          <Router>
            <input type="checkbox" checked={this.state.sidebarOpen} id="sidebar-toggle" hidden readOnly/>

            <div id="sidebar">
              <div className="title">
                <h3>ClubGo</h3>
                <h4>Admin</h4>
                <p id="version">Version { version }</p>
                <hr/>
              </div>

              <Link onClick={this.toggleSidebar} to="/dashboard"> Dashboard </Link>
              <Link onClick={this.toggleSidebar} to="/events"> Events </Link>
              <Link onClick={this.toggleSidebar} to="/venues"> Venues </Link>
              <Link onClick={this.toggleSidebar} to="/tickets"> Tickets </Link>
              <Link onClick={this.toggleSidebar} to="/offers"> Offers </Link>
              <Link onClick={this.toggleSidebar} to="/users"> Users </Link>
              <Link onClick={this.toggleSidebar} to="/artists"> Artists </Link>
              <Link onClick={this.toggleSidebar} to="/locations"> Locations </Link>
              <Link onClick={this.toggleSidebar} to="/settings"> Settings </Link>
            </div>

            <div id="sidebar-shadow" onClick={this.toggleSidebar}/>

            <div id="section-root">
              <AppBar position="static">
                <Toolbar>
                  <IconButton edge="start" color="inherit" aria-label="Menu" style={{ zIndex: 11 }} onClick={this.toggleSidebar}>
                    <MenuRounded />
                  </IconButton>

                  <Typography variant="h6" style={{ flexGrow: 1 }}>Admin</Typography>

                  <IconButton color="inherit" onClick={this.toggleMessages}>
                    <MessageRounded />
                  </IconButton>
                  
                  <IconButton color="inherit" onClick={this.toggleNotifications}>
                    <Notifications />
                  </IconButton>

                  <IconButton color="inherit" onClick={this.toggleUserAccountMenu}>
                    <AccountCircle />
                    <Menu id="appbarUserAccountMenu" keepMounted
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
                    </Menu>
                  </IconButton>

                  <Button variant="text" color="inherit" onClick={()=>{
                    adminContext.actions.logout()
                  }}>
                    Logout
                  </Button>
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
                  <Route path="/users" component={ Dashboard } />
                  <Route path="/artists" component={ Dashboard } />
                  <Route path="/locations" component={ LocationsPage } />
                  <Route path="/settings" component={ SettingsPage } />
                </Switch>

                <Snackbar open={ adminContext.state.openSuccessFeedback }
                    // SUCCESS
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    autoHideDuration={5000}
                    onClose={adminContext.actions.closeSuccessFeedback}
                  >
                    <SnackbarContent
                      style={{ backgroundColor: green[600] }}
                      message={ <span>{ adminContext.state.feedbackMessage.message }</span> }
                      action={[
                        <IconButton key="close" color="inherit" onClick={adminContext.actions.closeSuccessFeedback}>
                          <Close/>
                        </IconButton>,
                      ]}
                    />
                  </Snackbar>

                  <Snackbar open={ adminContext.state.openErrorFeedback }
                    // ERROR
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    autoHideDuration={5000}
                    onClose={adminContext.actions.closeErrorFeedback}
                  >
                    <SnackbarContent
                      style={{ backgroundColor: red[600] }}
                      message={ <span>{ adminContext.state.feedbackMessage.message }</span> }
                      action={[
                        <Tooltip title={adminContext.state.feedbackMessage.details} style={{ maxWidth: 500, fontSize: '2em' }}>
                          <IconButton key="close" color="inherit" onClick={adminContext.actions.closeErrorFeedback}>
                            <Help/>
                          </IconButton>
                        </Tooltip>,

                        <IconButton key="close" color="inherit" onClick={adminContext.actions.closeErrorFeedback}>
                          <Close/>
                        </IconButton>
                      ]}
                    />
                  </Snackbar>
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
        <AdminContextProvider>
          {
            this.state.validatedApplication ? (
              <AdminContext.Consumer>
                {
                  adminContext => (
                    <div className="admin-root">
                      {
                        adminContext.state.authenticated ? (
                          this.onAuthenticate(adminContext)
                        ) : (
                          <LoginPage 
                            onAuthenticate={()=>{
                              adminContext.actions.authenticateLogin({})
                              this.setState({
                                authenticated: true
                              })
                            }} 
                          />
                        )
                      }
                    </div>
                  )
                }
              </AdminContext.Consumer>
            ) : (
              <article style={{ width: '100%', height: '100%', padding: '5em' }}>
                <section style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                  <div style={{ maxWidth: '50%', margin: 'auto' }}>
                    <span className="spinner large"/><br/><br/><br/>
                  </div>
                  <h2>Loading</h2>
                  <h4>Authenticating Application</h4>
                  <p style={{ opacity: 0.5 }}>
                    Verifying that this app is a genuine version of <br/>
                    the ClubGo<sup>TM</sup> Admin Panel
                  </p>
                </section>
              </article>
            )
          }
        </AdminContextProvider>
      </ThemeProvider>      
    )
  }
}

export default Admin