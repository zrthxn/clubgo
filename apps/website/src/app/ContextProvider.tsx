import React, { Component } from 'react'
import { Route } from 'react-router-dom'

// Initial State
const _istate = {
  browserRouterLocation: '/',
  city: null,
  locality: null,
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
      },
      {
        imageURL: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/trivia-night-blue-poster-design-template-1a030c6c27293628028546c98cb525ed.jpg"
      },
      {
        imageURL: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/trivia-night-blue-poster-design-template-1a030c6c27293628028546c98cb525ed.jpg"
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
      closeStory: this.closeStory,
      getUserContext: this.getUserContext,
      setUserContext: this.setUserContext
    }
  }

  componentDidMount() {
    this.getUserContext()
  }  

  openStory = (img, index) => {
    this.setState(()=>{
      let { story } = this.state
      
      story.isOpen = true
      story.image = img
      
      // console.log(story.stories);
      // story.stories.push( story.stories.splice(index, 1)[0] )
      // console.log(story.stories);

      return {
        story
      }
    })
  }

  closeStory = () => {
    this.setState(()=>{
      let { story } = this.state
      story.isOpen = false
      return {
        story
      }
    })
  }

  getUserContext = () => {
    if(localStorage.getItem('cg::context')===null)
      return {
        city: undefined
      }
      
    let usercontext = JSON.parse(atob(localStorage.getItem('cg::context')))
    this.setState({ ...usercontext })
    return usercontext
  }

  setUserContext = (setcontext) => {
    let usercontext = this.getUserContext()
    for (const key in setcontext)
      if (setcontext.hasOwnProperty(key))
        usercontext[key] = setcontext[key]

    localStorage.setItem('cg::context', btoa(JSON.stringify(usercontext)))
    this.getUserContext()
  }

  render() {
    return (
      <Route render={({ history })=>{
        return (
          <Context.Provider
            value={{
              state: this.state,
              actions: _iactions,
              router: (path) => {
                history.push(path)
              }
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
