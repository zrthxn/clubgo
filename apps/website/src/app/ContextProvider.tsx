import React, { Component } from 'react'
import { Route } from 'react-router-dom'

// Initial State
const _istate = {
  browserRouterLocation: '/',
  city: null,
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
      setCity: this.setCity
    }
  }

  componentDidMount() {
    this.setCity()
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

  closeStory = () => {
    this.setState(()=>{
      let { story } = this.state
      story.isOpen = false
      return {
        story
      }
    })
  }

  setCity = async (city?:string) => {
    if((city===undefined || city===null) && localStorage.getItem('clubgo:city')!==null)
      city = localStorage.getItem('clubgo:city')
      
    localStorage.setItem('clubgo:city', city)
    this.setState({
      city
    })
    return
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
                window.scrollTo(0, 0)
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
