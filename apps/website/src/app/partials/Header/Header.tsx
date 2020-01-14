import React, { Component, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { IconButton } from '@material-ui/core'
import { Search, AccountCircle } from '@material-ui/icons'
import { stringify as QueryBuilder } from 'query-string'
import { observer, inject  } from 'mobx-react'

import './Header.scss'

import RootContext from '../../RootContext'
import Context, { ContextProps } from '../../Context'
import ContextStore, { StoreContext } from '../../ContextStore'
import { SelectCity } from '@clubgo/website/components'
import { DatabaseService } from '@clubgo/api'
import { ICategoryModel } from '@clubgo/database'

export class Header extends Component {
  state = {
    openSidebar: false
  }

  toggleSidebar = () => {
    this.setState({
      openSidebar: !this.state.openSidebar
    })
  }

  render() {  
    return (
      <RootContext.Consumer>
        {
          appContext => (
            <header>
              <SelectCity 
                onComplete={()=>{
                  appContext.actions.toggleCityLightbox()
                }}
              />
              
              <section className="container">
                <input type="checkbox" checked={this.state.openSidebar} id="sidebar-toggle" hidden readOnly/>
                <label htmlFor="sidebar-toggle" className="hamburger" onClick={this.toggleSidebar}><span></span></label>
                
                <div className="sidebar-shadow" id="sidebar-shadow" onClick={this.toggleSidebar}/>

                {
                  this.state.openSidebar ? (
                    <div className="sidebar">
                      <nav className="sidebar-nav">
                        <Link onClick={this.toggleSidebar} to={
                          appContext.state.city!==undefined ? (
                            `/events/in/${appContext.state.city.toLowerCase()}`
                          ) : '/events'
                        }>
                          Events
                        </Link>

                        <Link onClick={this.toggleSidebar} to={
                          appContext.state.city!==undefined ? (
                            `/venues/in/${appContext.state.city.toLowerCase()}`
                          ) : '/venues'
                        }>
                          Venues
                        </Link>

                        <span style={{ margin: '1.5em 1em 1em 1em', fontSize: '0.85em', fontWeight: 600 }}>CATEGORIES</span>

                        <Context.Consumer>
                          { context => (
                            context.store.categories.map((category:ICategoryModel, index)=>(
                              appContext.state.city!==undefined ? (
                                <a className="no-decor category-link" 
                                  href={`/events/in/${appContext.state.city.toLowerCase()}/${category.name.toLowerCase().trim().replace(/ /g, '-')}`}>
                                  <h4>{ category.name }</h4>
                                </a>
                              ) : (
                                <a className="no-decor category-link" 
                                  href={`/events/${category.name.toLowerCase().trim().replace(/ /g, '-')}`}>
                                  <h4>{ category.name }</h4>
                                </a>
                              )
                            ))
                          )}
                        </Context.Consumer>
                        
                      </nav>
                    </div>
                  ) : null
                }

                {
                  appContext.state.city!==undefined ? (
                    <Link className="no-decor" to={`/in/${appContext.state.city.toLowerCase()}`} style={{ padding: '1rem' }}>
                      <h1 id="site-title">ClubGo</h1>
                    </Link>
                  ) : (
                    <Link className="no-decor" to="/" style={{ padding: '1rem' }}>
                      <h1 id="site-title">ClubGo</h1>
                    </Link>
                  )
                }

                {/* =================== Desktop Nav ==================== */}
                <div className="desktop-nav">
                  <Link className="no-decor" to={
                    appContext.state.city!==undefined ? (
                      `/events/in/${appContext.state.city.toLowerCase()}`
                    ) : '/events'
                  }>
                    <h4>Events</h4>
                  </Link>
                  
                  <Link className="no-decor" to={
                    appContext.state.city!==undefined ? (
                      `/venues/in/${appContext.state.city.toLowerCase()}`
                    ) : '/venues'
                  }>
                    <h4>Venues</h4>
                  </Link>

                  <Context.Consumer>
                    { context => (
                      context.store.categories.sort(() => Math.random() - 0.5).filter((category:ICategoryModel)=>{
                        return category.categoryType === 'event'
                      })
                      .slice(0, 6)
                      .map((category, index)=>(
                        appContext.state.city!==undefined ? (
                          <a className="no-decor category-link" 
                            href={`/events/in/${appContext.state.city.toLowerCase()}/${category.name.toLowerCase().trim().replace(/ /g, '-')}`}>
                            <h4>{ category.name }</h4>
                          </a>
                        ) : (
                          <a className="no-decor category-link" 
                            href={`/events/${category.name.toLowerCase().trim().replace(/ /g, '-')}`}>
                            <h4>{ category.name }</h4>
                          </a>
                        )
                      ))
                    )}
                  </Context.Consumer>
                </div>

                <div style={{ margin: 'auto 0 auto auto' }}>
                  <div className="set-city" 
                    onClick={()=>{
                      appContext.actions.toggleCityLightbox()
                    }}
                  >
                    <img src="/assets/icons/location.svg" width="15px" alt=""/>
                    {/* <span style={{ margin: '0 1em 0 0.25em' }}>
                      { appContext.state.city }
                    </span> */}
                  </div>

                  <IconButton onClick={()=>{ appContext.router('/search') }}>
                    <Search/>
                  </IconButton>
                  
                  <IconButton onClick={()=>{ appContext.router('/account') }}>
                    <AccountCircle/>
                  </IconButton>
                </div>
              </section>
            </header>
          )
        }
      </RootContext.Consumer>
    )
  }
}

// export const Header = observer(() => {
//   const [openSidebar, setOpenSidebar] = useState(false)
//   const toggleSidebar = () => {
//     setOpenSidebar(!openSidebar)
//   }

//   const context = useContext(StoreContext)
  
//   return (
//     <RootContext.Consumer>
//       {
//         appContext => (
//           <header>
//             <SelectCity 
//               onComplete={()=>{
//                 appContext.actions.toggleCityLightbox()
//               }}
//             />
            
//             <section className="container">
//               <input type="checkbox" checked={openSidebar} id="sidebar-toggle" hidden readOnly/>
//               <label htmlFor="sidebar-toggle" className="hamburger" onClick={toggleSidebar}><span></span></label>
              
//               <div className="sidebar-shadow" id="sidebar-shadow" onClick={toggleSidebar}/>

//               {
//                 openSidebar ? (
//                   <div className="sidebar">
//                     <nav className="sidebar-nav">
//                       <Link onClick={toggleSidebar} to={
//                         appContext.state.city!==undefined ? (
//                           `/events/in/${appContext.state.city.toLowerCase()}`
//                         ) : '/events'
//                       }>
//                         Events
//                       </Link>

//                       <Link onClick={toggleSidebar} to={
//                         appContext.state.city!==undefined ? (
//                           `/venues/in/${appContext.state.city.toLowerCase()}`
//                         ) : '/venues'
//                       }>
//                         Venues
//                       </Link>

//                       <span style={{ margin: '1.5em 1em 1em 1em', fontSize: '0.85em', fontWeight: 600 }}>CATEGORIES</span>

//                       {/* {
//                         ContextStore.categories.map((category:ICategoryModel, index)=>(
//                           appContext.state.city!==undefined ? (
//                             <a className="no-decor category-link" 
//                               href={`/events/in/${appContext.state.city.toLowerCase()}/${category.name.toLowerCase().trim().replace(/ /g, '-')}`}>
//                               <h4>{ category.name }</h4>
//                             </a>
//                           ) : (
//                             <a className="no-decor category-link" 
//                               href={`/events/${category.name.toLowerCase().trim().replace(/ /g, '-')}`}>
//                               <h4>{ category.name }</h4>
//                             </a>
//                           )
//                         ))
//                       } */}
//                     </nav>
//                   </div>
//                 ) : null
//               }

//               {
//                 appContext.state.city!==undefined ? (
//                   <Link className="no-decor" to={`/in/${appContext.state.city.toLowerCase()}`} style={{ padding: '1rem' }}>
//                     <h1 id="site-title">ClubGo</h1>
//                   </Link>
//                 ) : (
//                   <Link className="no-decor" to="/" style={{ padding: '1rem' }}>
//                     <h1 id="site-title">ClubGo</h1>
//                   </Link>
//                 )
//               }

//               {/* =================== Desktop Nav ==================== */}
//               <div className="desktop-nav">
//                 <Link className="no-decor" to={
//                   appContext.state.city!==undefined ? (
//                     `/events/in/${appContext.state.city.toLowerCase()}`
//                   ) : '/events'
//                 }>
//                   <h4>Events</h4>
//                 </Link>
                
//                 <Link className="no-decor" to={
//                   appContext.state.city!==undefined ? (
//                     `/venues/in/${appContext.state.city.toLowerCase()}`
//                   ) : '/venues'
//                 }>
//                   <h4>Venues</h4>
//                 </Link>

//                 <Context.Consumer>
//                   { context => (
//                     context.store.categories.filter((category:ICategoryModel)=>{
//                       return category.categoryType === 'event'
//                     })
//                     .slice(0, 6)
//                     .map((category, index)=>(
//                       appContext.state.city!==undefined ? (
//                         <a className="no-decor category-link" 
//                           href={`/events/in/${appContext.state.city.toLowerCase()}/${category.name.toLowerCase().trim().replace(/ /g, '-')}`}>
//                           <h4>{ category.name }</h4>
//                         </a>
//                       ) : (
//                         <a className="no-decor category-link" 
//                           href={`/events/${category.name.toLowerCase().trim().replace(/ /g, '-')}`}>
//                           <h4>{ category.name }</h4>
//                         </a>
//                       )
//                     ))
//                   )}
//                 </Context.Consumer>
//               </div>

//               <div style={{ margin: 'auto 0 auto auto' }}>
//                 <div className="set-city" 
//                   onClick={()=>{
//                     appContext.actions.toggleCityLightbox()
//                   }}
//                 >
//                   <img src="/assets/icons/location.svg" width="15px" alt=""/>
//                   {/* <span style={{ margin: '0 1em 0 0.25em' }}>
//                     { appContext.state.city }
//                   </span> */}
//                 </div>

//                 <IconButton onClick={()=>{ appContext.router('/search') }}>
//                   <Search/>
//                 </IconButton>
                
//                 <IconButton onClick={()=>{ appContext.router('/account') }}>
//                   <AccountCircle/>
//                 </IconButton>
//               </div>
//             </section>
//           </header>
//         )
//       }
//     </RootContext.Consumer>
//   )
// })

export default Header