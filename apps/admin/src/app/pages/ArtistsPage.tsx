import React, { Component } from 'react'
import { Nav, NavItem, NavLink, Button } from 'reactstrap'
import { Grid, Paper } from '@material-ui/core'

import './scss/Pages.scss'

import { Artist } from '../components/Artists/Artist'
import { ArtistEditor } from '../components/Artists/ArtistEditor'
import { DatabaseService } from '@clubgo/api'

import AdminContext from '../AdminContext'
import { IArtistModel } from '@clubgo/database'

export default class ArtistsPage extends Component {
  static contextType = AdminContext
  context!: React.ContextType<typeof AdminContext>
  
  state = {
    loading: true,
    openCreateModal: false,
    artists: [

    ]
  }

  artistService = new DatabaseService('/artist')

  componentDidMount() {
    this.artistService.searchBy({}).then(({ data })=>{
      let { artists } = this.state
      artists = data.results
      this.setState({
        loading: false,
        artists
      })
    })
  }  

  render() {
    return (
      <div className="page">
        <article className="page-header">
          <h1 className="title">Artists and Music</h1>
          
          <div>
            <Button color="primary" size="lg" onClick={()=>{
              this.setState({
                openCreateModal: true
              })
            }}>
              Create New Artist
            </Button>
          </div>
        </article>

        <article className="page-content">
          <Grid container spacing={3}>
            {
              !this.state.loading ? (
                this.state.artists.map((offer, index)=>(
                  <Grid item xs={12} md={4} key={`offerList-${index}`}>
                    <Artist data={offer}
                      onEdit={(editedOffer:IArtistModel)=>{
                        let { artists } = this.state
                        artists[index] = editedOffer
                        this.setState({
                          artists
                        })
                      }}
                      onDelete={()=>{
                        this.artistService.delete(offer._id).then(()=>{  
                          let { artists } = this.state
                          artists.splice(index, 1)
                          this.setState({ artists })
                        })
                      }}
                    />
                  </Grid>
                ))
              ) : (
                <div>
                  <span className="spinner"/> Loading
                </div>
              )
            }
          </Grid>
        </article>

        {
          this.state.openCreateModal ? (
            <ArtistEditor open={this.state.openCreateModal}
              onCancel={()=>{
                this.setState({
                  openCreateModal: false
                })
              }}
              onFinalize={(createBody:IArtistModel)=>{
                this.artistService.create(createBody).then((res)=>{
                  let { artists } = this.state
                  createBody._id = res.data.results
                  artists.push(createBody)
                  this.setState({
                    loading: false,
                    openCreateModal: false,
                    artists
                  })
                })            
              }}
            />
          ) : null 
        }
      </div>
    )
  }
}
