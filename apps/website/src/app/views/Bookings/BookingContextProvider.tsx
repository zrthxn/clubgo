import React, { Component } from 'react'

// Initial State
const _istate = {
  loginExists: false,
  ticketSelectionDone: false,
  ticket: {

  }
}

var _iactions = Object()

export class BookingContextProvider extends Component {
  state = _istate

  constructor(props) {
    super(props)

    // Register new actions here
    _iactions = {
      getTicket: this.getTicket,
      setTicket: this.setTicket
    }
  }

  componentDidMount() {
    this.getTicket()
  }

  getTicket = () => {
    if(localStorage.getItem('cg::ticket:dump')===null) return undefined
      
    let ticket
    try {
      ticket = JSON.parse(atob(localStorage.getItem('cg::ticket:dump')))
    } catch (error) {
      return undefined
    }
    
    this.setState({ loginExists: true, ticket })
    return ticket
  }

  setTicket = (_setTicket) => {
    let ticket = this.getTicket()
    for (const key in _setTicket)
      if (_setTicket.hasOwnProperty(key))
        ticket[key] = _setTicket[key]

    localStorage.setItem('cg::ticket:dump', btoa(JSON.stringify(ticket)))
    this.getTicket()
  }

  // getTicket = () => this.state.ticket
  
  // setTicket = (ticket) => {
  //   this.setState({
  //     ticket
  //   })
  // }

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
