import React, { Component } from 'react'

// Initial State
const _istate = {
  user: {

  }
}

var _iactions = Object()

export class BookingContextProvider extends Component {
  state = _istate

  constructor(props) {
    super(props)

    // Register new actions here
    _iactions = {
      
    }
  }

  componentDidMount() {
    
  }  

  render() {
    return (
      <BookingContext.Provider
        value={{
          state: this.state,
          actions: _iactions
        }}
      >
        {
          this.props.children
        }
      </BookingContext.Provider>
    )
  }
}

export const BookingContext = React.createContext({
  state: _istate,
  actions: (()=>{
    const _Context = new BookingContextProvider({})
    return _iactions
  })()
})

export default BookingContext
