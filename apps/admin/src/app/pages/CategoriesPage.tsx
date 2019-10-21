import React, { Component } from 'react'
import Select from 'react-select'
import './scss/Pages.scss'

import { DatabaseService } from '@clubgo/api'
import { Grid, Fab, IconButton, Button, TextField } from '@material-ui/core'
import { Add, Delete } from '@material-ui/icons'

export default class CategoriesPage extends Component {
  state = {
    name: null,
    categoryType: null,
    categories: [

    ]
  }

  auxService = new DatabaseService('/category')

  componentDidMount() {
    this.auxService.list().then(({ data })=>{
      if(data.results)
        this.setState({
          categories: data.results
        })
    })
  }
  
  render() {
    return (
      <div className="page">
        <article className="page-header">
          <h1 className="title">
            Categories
          </h1>

          <Grid container spacing={3}>
            <Grid item xs={4}>
              <TextField required fullWidth margin="dense" label="Category Name" 
                variant="outlined" onChange={({ target })=>{
                  this.setState({
                    name: target.value
                  })
                }} 
              />
            </Grid>

            <Grid item xs={4}>
              <Select
                placeholder="Category Type"
                backspaceRemovesValue
                options={[
                  'Event', 'Venue'
                ].map((item)=>({
                  label: item, value: item.toLowerCase()
                }))}
                onChange={(selected)=>{
                  this.setState({
                    categoryType: selected.value
                  })
                }}
              />
            </Grid>

            <Grid item xs={4}>
              <Button variant="contained" color="primary" onClick={()=>{
                this.auxService.create({
                  name: this.state.name, categoryType: this.state.categoryType
                }).then(()=>{
                  let { categories } = this.state
                  categories.push({ name: this.state.name, categoryType: this.state.categoryType })
                  this.setState({
                    categories
                  })
                })
              }}>
                Create
              </Button>
            </Grid>
          </Grid>
        </article>

        <article className="page-content">
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <h2>Event Categories</h2><br/>
              <Grid container spacing={3}>
                {
                  this.state.categories.map((category, index)=>{
                    if(category.categoryType==='event')
                      return (
                        <Grid item xs={4} className="clearfix" style={{
                          border: '1px solid #1c1c1c40', borderRadius: '0.5em', padding: '0.5em',
                          display: 'flex', flexDirection: 'row', margin: '0.5em'
                        }}>
                          <p style={{ margin: 'auto', width: 'fit-content', flexGrow: 1 }}>{ category.name }</p>
                          <IconButton size="small" onClick={()=>{
                            this.auxService.delete(category._id).then(()=>{
                              let { categories } = this.state
                              categories.splice(index, 1)
                              this.setState(()=>({
                                categories
                              }))
                            })
                          }}>
                            <Delete/>
                          </IconButton>
                        </Grid>
                      )
                  })
                }
              </Grid>
            </Grid>

            <Grid item md={6} xs={12}>
              <h2>Venue Categories</h2><br/>
              <Grid container spacing={3}>
                {
                  this.state.categories.map((category, index)=>{
                    if(category.categoryType==='venue')
                      return (
                        <Grid item xs={4} style={{
                          border: '1px solid #1c1c1c40', borderRadius: '0.5em', padding: '0.5em',
                          display: 'flex', flexDirection: 'row', margin: '0.5em'
                        }}>
                          <p style={{ margin: 'auto', width: 'fit-content', flexGrow: 1 }}>{ category.name }</p>
                          <IconButton size="small" onClick={()=>{
                            let { categories } = this.state
                            categories.splice(index, 1)
                            this.setState(()=>({
                              categories
                            }))
                          }}>
                            <Delete/>
                          </IconButton>
                        </Grid>
                      )
                  })
                }
              </Grid>
            </Grid>
          </Grid>
        </article>
      </div>
    )
  }
}
