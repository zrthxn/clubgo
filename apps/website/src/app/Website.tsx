import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import './Global.scss'

import { Context } from './Context'
import { Button } from '@clubgo/website/components'
import { Textbox } from '@clubgo/website/components'
import ContextProvider from './ContextProvider'

export default class WebsiteController extends Component {
  static contextType = Context

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <Router>
        <Switch>
          
        </Switch>
      </Router>
    )
  }
}
