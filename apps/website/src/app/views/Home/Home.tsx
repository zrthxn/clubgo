import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'

type URLParams = { 
  whatever: string
}

interface IComponentProps {
  
}

export default class Home extends Component<RouteComponentProps<URLParams> & IComponentProps> {
  render() {
    return (
      <div>
        <h1>ClubGo</h1>
        <h2>{ this.props.match.params.whatever }</h2>
      </div>
    )
  }
}
