import React, { Component } from 'react'

import './Button.scss'

export class Button extends Component {
  render() {
    return (
      <div className="button">
        <button>
          {
            this.props.children
          }
        </button>
      </div>
    )
  }
}

export default Button
