import React, { Component } from 'react'
import { Route } from 'react-router-dom'

// Initial State
const _istate = {
  story: {
    isOpen: false,
    image: String(),
    stories: [
      { 
        imageURL: "https://about.canva.com/wp-content/uploads/sites/3/2015/01/concert_poster.png"
      },
      {
        imageURL: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/trivia-night-blue-poster-design-template-1a030c6c27293628028546c98cb525ed.jpg"
      },
      { 
        imageURL: "https://about.canva.com/wp-content/uploads/sites/3/2015/01/concert_poster.png"
      }
    ],
  }
}

var _iactions = Object()

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

  openStory = (img) => {
    this.setState(()=>{
      let { story } = this.state
      story.isOpen = true
      story.image = img
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
      <Route render={({ history })=>{
        return (
          <Context.Provider
            value={{
              state: this.state,
              actions: _iactions,
              router: (path) => history.push(path),
            }}
          >
            {
              this.props.children
            }
          </Context.Provider>
        )
      }}/>
    )
  }
}

export const Context = React.createContext({
  state: _istate,
  router: Function(),
  actions: (()=>{
    const _Context = new ContextProvider({})
    return _iactions
  })()
})

export default Context
