import React from 'react'

export function confirmDelete(props) {
  return (
    <div>
      Delete?
      <button onClick={ props.confirm }>Yes</button>
      <button onClick={ props.reject }>No</button>
    </div>
  )
}

export default confirmDelete
