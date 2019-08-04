import React, { Component } from 'react'

import './Textbox.scss'

export class Textbox extends Component {
  render() {
    return (
      <div className="textbox">
        <input type="text" placeholder="Textbox"/>
      </div>
    )
  }
}

export default Textbox
