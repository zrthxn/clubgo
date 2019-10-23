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
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {
        props.children
      }
    </div>
  )
}

export function FlexScroll(props) {
  return (
    <div className="flexscroll">
      <div className="flexscroll-content">
        {
          props.children
        }
      </div>
    </div>
  )
}


export default Flexbox