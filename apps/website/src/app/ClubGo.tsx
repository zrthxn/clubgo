import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import './Global.scss'

import { AppContext } from './AppContext'
import { Button } from '@clubgo/website/components'
import { Textbox } from '@clubgo/website/components'

export class ClubGo extends Component {
  static contextType = AppContext

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <article>
        <h1>Hello</h1>

        <Button>
          Button
        </Button>

        <Textbox/>
        <Textbox/>
        <Textbox/>
        <Textbox/>
      </article>
    )
  }
}

export default ClubGo
