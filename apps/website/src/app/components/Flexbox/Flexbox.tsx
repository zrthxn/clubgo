import React from 'react'

import './Flexbox.scss'

export function Flexbox(props) {
  return (
    <div className="flexbox">
      {
        props.children
      }
    </div>
  )
}

export function FlexContainer(props) {
  return (
    <div style={{
      width: '100%',
      margin: 'auto'
    }}>
      {
        props.children
      }
    </div>
  )
}

export default Flexbox