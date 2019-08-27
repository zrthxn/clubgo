import React, { Component } from 'react'

var _iactions = Object()

// Initial State
const _istate = {
  story: {
    isOpen: false,
    imageURL: String()
  }
}

export class ContextProvider extends Component {
  state = _istate

  constructor(props) {
    super(props)

    // Register new actions here
    _iactions = {
      openStory: this.openStory,
      closeStory: this.closeStory
    }
  }

  componentDidMount() {
    
  }  

  openStory = (img) => {
    this.setState(()=>{
      let { story } = this.state
      story.isOpen = true
      story.imageURL = img
      return {
        story
      }
    })
  }

  closeStory = (img) => {
    this.setState(()=>{
      let { story } = this.state
      story.isOpen = false
      return {
        story
      }
    })
  }

  render() {
    return (
      <Context.Provider
        value={{
          state: this.state,
          actions: _iactions
        }}
      >
        {
          this.props.children
        }
      </Context.Provider>
    )
  }
}

export const Context = React.createContext({
  state: _istate,
  actions: (()=>{
    new ContextProvider({})
    return _iactions
  })()
})

export default Context
