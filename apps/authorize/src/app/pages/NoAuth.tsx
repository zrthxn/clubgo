import React, { Component } from 'react'

export default class NoAuth extends Component {
  state = {
    n: 5
  }

  render() {
    return (
      <div>
        <h1>No Auth</h1>
        <button onClick={
          ()=>{
            if(this.state.n===0) // window.location = '/authorize'
            this.setState(()=>({
              n: --this.state.n
            }))
          }
        }>CLICK</button>
      </div>
    )
  }
}
