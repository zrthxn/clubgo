import React, { Component } from 'react'
import { Button } from 'reactstrap'
import Select from 'react-select'
import { Grid, Paper, TextField, InputAdornment, IconButton, Fab } from '@material-ui/core'
import { Link, Delete } from '@material-ui/icons'
import './scss/Pages.scss'

import MediaCard from '../components/Images/MediaCard'
import { DatabaseService } from '@clubgo/api'
import { IAdvertModel } from '@clubgo/database'
import AdminContext from '../AdminContext'

export default class AdvertPage extends Component {
  state = {
    confirm: false,
    data: {
      advertTitle: null,
      link: null,
      city: null,
      imageURL: null
    },
    cities: [],
    ads: []
  }

  adService = new DatabaseService('/ads')
  auxLocationService = new DatabaseService('/location')

  componentDidMount() {
    this.adService.list().then(({ data })=>{
      this.setState({
        ads: data.results
      })
    })

    this.auxLocationService.list().then(({ data })=>{
      this.setState({
        cities: data.results
      })
    })
  }  

  render() {
    return (
      <div className="page">
        <article className="page-header">
          <h1 className="title">Advertising</h1>

          <div>
            Create an Ad by filling in the details.
          </div>
        </article>

        <article className="page-content">
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Grid container spacing={3}>
                <Grid item xs={12} style={{ padding: '1em' }}>
                  <TextField variant="outlined" margin="dense" fullWidth
                    placeholder="Advert Name"
                    onChange={({ target })=>{
                      let { data } = this.state
                      data.advertTitle = target.value
                      this.setState(()=>({
                        data
                      }))
                    }}
                  />
                </Grid>

                <Grid item xs={12} style={{ padding: '1em' }}>
                  <TextField variant="outlined" margin="dense" fullWidth
                    placeholder="https://example.com/link"
                    InputProps={{
                      startAdornment: 
                        <InputAdornment position="start">
                          <Link/>
                        </InputAdornment>,
                    }}
                    onChange={({ target })=>{
                      let { data } = this.state
                      data.link = target.value
                      this.setState(()=>({
                        data
                      }))
                    }}
                  />
                </Grid>

                <Grid item xs={12} style={{ padding: '1em' }}>
                  <Select
                    inputId="city"
                    placeholder="Select City"
                    backspaceRemovesValue
                    options={this.state.cities.map((city, index)=>({
                      label: city.city, value: city.city
                    }))}
                    onChange={ selected => {
                      let { data } = this.state
                      data.city = selected.value
                      this.setState({
                        data
                      })
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <MediaCard includeVideoURL={false} tag="ad"
                    syncData={this.state.confirm} syncParentData={({ images })=>{
                      if(images.length!==0) {
                        let { data } = this.state
                        data.imageURL = images[0].url
                        this.setState(()=>({
                          data
                        }))
                      }
                    }}
                  />
                </Grid>

                <AdminContext.Consumer>
                  {
                    adminContext => (
                      <Grid item xs={12} style={{ padding: '1em' }}>
                        <Button color="primary" size="lg" onClick={()=>{
                          this.setState({ confirm: true })
                          setTimeout(()=>{
                            this.adService.create(this.state.data).then(()=>{
                              adminContext.actions.openSuccessFeedback("Ad Created")

                              let { ads } = this.state
                              ads.push(this.state.data)
                              this.setState({
                                ads
                              })
                            })
                          }, 500)
                        }}>
                          Run Advertisement
                        </Button>
                      </Grid>
                    )
                  }
                </AdminContext.Consumer>
              </Grid>
            </Grid>

            <Grid item xs={8}>
              <Grid container spacing={3}>
                {
                  this.state.ads.map((advert:IAdvertModel, index)=>(
                    <Grid key={advert._id} item xs={12} className="clearfix" style={{ 
                      position: 'relative', padding: '1em', height: '10em', margin: '1em',
                      borderRadius: '10px', overflow: 'hidden', backgroundColor: '#000'
                    }}>
                      <img src={advert.imageURL} alt="" style={{ position: 'absolute', width: '100%', opacity: 0.85 }} />
                      <p style={{
                        position: 'absolute', width: '100%', bottom: '1em', margin: 0, color: '#fff'
                      }}>
                        { advert.advertTitle }
                      </p>

                      <Fab className="float-right" onClick={()=>{
                        this.adService.delete(advert._id).then(()=>{
                          let { ads } = this.state
                          ads.splice(index, 1)
                          this.setState({
                            ads
                          })
                        })
                      }}>
                        <Delete color="inherit"/>
                      </Fab>
                    </Grid>
                  ))
                }
              </Grid>
            </Grid>
          </Grid>
        </article>
      </div>
    )
  }
}
