import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { IEventModel } from '@clubgo/database'

// Initial State
const _istate = {
  city: undefined,
  locality: undefined,
  openCityLightbox: false,
  isUserLoggedIn: false,
  story: {
    isOpen: false,
    image: String(),
    stories: [
      { imageURL: '' }, 
      { imageURL: '' }, 
      { imageURL: '' }, 
      { imageURL: '' }, 
      { imageURL: '' }, 
    ],
  },
  objectPreload: {
    event: null,
    venue: null
  }
}

var _iactions = Object()

export class RootContextProvider extends Component {
  state = _istate

  constructor(props) {
    super(props)

    // Register new actions here
    _iactions = {
      openStory: this.openStory,
      closeStory: this.closeStory,
      getUserContext: this.getUserContext,
      setUserContext: this.setUserContext,
      setUserLogin: this.setUserLogin,
      toggleCityLightbox: this.toggleCityLightbox,
      putObjectPreload: this.putObjectPreload,
      fetchObjectPreload: this.fetchObjectPreload
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
      
      story.stories.push( story.stories.splice(index, 1)[0] )

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
      return { city: undefined }
      
    try {
      let usercontext = JSON.parse(atob(localStorage.getItem('cg::context')))
      this.setState({ ...usercontext })
      return usercontext 
    } catch (error) {
      return { city: undefined }
    }
  }

  setUserContext = (setcontext) => {
    let usercontext = this.getUserContext()
    for (const key in setcontext)
      if (setcontext.hasOwnProperty(key))
        usercontext[key] = setcontext[key]

    localStorage.setItem('cg::context', btoa(JSON.stringify(usercontext)))
    this.getUserContext()
  }

  setUserLogin = () => {
    this.setState({
      isUserLoggedIn: true
    })
  }

  toggleCityLightbox = () => {
    this.setState({
      openCityLightbox: !this.state.openCityLightbox
    })
  }

  putObjectPreload = (preload) => {
    this.setState({
      objectPreload: preload
    })
  }

  fetchObjectPreload = () => this.state.objectPreload

  render() {
    return (
      <Route render={({ history })=>{
        return (
          <RootContext.Provider
            value={{
              state: this.state,
              actions: _iactions,
              router: (path) => {
                window.scrollTo({ top: window.screenTop })
                history.push(path)
              }
            }}
          >
            {
              this.props.children
            }
          </RootContext.Provider>
        )
      }}/>
    )
  }
}

export const RootContext = React.createContext({
  state: _istate,
  router: Function(),
  actions: (()=>{
    const _Context = new RootContextProvider({})
    return _iactions
  })()
})

export default RootContext
