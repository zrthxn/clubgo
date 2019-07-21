import React, { Component } from 'react'
import { Label, DropdownItem } from 'reactstrap'
import { Grid, Paper, TextField, Button, Fab, Modal } from '@material-ui/core'
import { FormControl, MenuItem, InputLabel, OutlinedInput } from '@material-ui/core'
import Select from 'react-select'
import { Add, Delete } from '@material-ui/icons'

import { handleChangeById as inputHandler } from '@clubgo/util'
import { stat } from 'fs';

export class EventDetails extends Component {
  state = {
    openArtistModal: false,
    openMusicModal: false,
    suggestions: {
      dressCode: [
        { label: '101 Formal' }
      ].map(item=>({
        label: item.label, value: item.label
      })),
      category: [
        { label: 'EDM' },
        { label: 'Clubbing' },
        { label: 'Comedy' },
        { label: 'General' },
      ].map(item=>({
        label: item.label, value: item.label
      })),
    },
    selectDressCode: null,
    selectCategory: null,
    data: {
      eventTitle: String,
      description: String,
      categories: [ ], // handled internally
      tagline: String,
      flashText: String,
      artists: [ ], // handled internally ## TODO
      music: [ ], // handled internally ## TODO
      dressCode: {
        title: String,
        images: [ ] // handled internally ## TODO
      },
      tags: [ ], // handled internally
      hasCutomDetails: false,
      customDetails: [ ],
    },
    requiredFulfilled: false,
    required: [
      'eventTitle', 'description', 'categories'
    ],
    itratableMembers: [
      'customDetails'
    ]
  }

  handleChangeById = (event) => {
    const result = inputHandler(event, this.state)
    this.setState((prevState, props)=>(
      result
    ))
  }

  render() {
    // Event Details Section  ----------------------------------------------  Event Details Section
    // ============================================================================================
    return (
      <div>
        <Paper className="create-block">
          <h3 className="title">Event</h3>
          
          <Grid item container xs={12} spacing={3}>                
            <Grid item xs={12}>
              <Label>Details</Label>
              <TextField id="eventTitle" required fullWidth label="Event Name" 
                variant="outlined" onChange={this.handleChangeById}/>
              <TextField id="description" required multiline fullWidth label="Description" 
                variant="outlined" margin="dense" onChange={this.handleChangeById}/>
              
              <Select
                inputId="category"
                placeholder="Category"
                value={this.state.selectCategory}
                options={this.state.suggestions.category}
                isMulti
                onChange={ selected => {
                  let { data } = this.state
                  data.categories = []
                  for(let item of selected)
                    data.categories.push(item.value)
                  this.setState((prevState, props)=>({
                    data,
                    selectCategory: selected
                  }))
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <Label>Tagline</Label>
              <TextField id="tagline" fullWidth label="Tagline" 
                variant="outlined" margin="dense" onChange={this.handleChangeById}/>
              <TextField id="flashText" fullWidth label="Flash Text" 
                variant="outlined" margin="dense" onChange={this.handleChangeById}/>
            </Grid>

            <Grid item xs={6}>
              <Label>Performers</Label>
              <div style={{padding: '0.5em'}}>
                <Button variant="contained" color="primary"
                  onClick={()=>{
                    this.setState(()=>({
                      openArtistModal: true
                    }))
                  }}
                >
                  Select Artist
                </Button>
              </div>
              <div style={{padding: '0.5em'}}>
                <Button variant="contained" color="primary"
                  onClick={()=>{
                    this.setState(()=>({
                      openMusicModal: true
                    }))
                  }}
                >
                  Select Music
                </Button>
              </div>
            </Grid>

            <Grid item xs={4}>
              <Label>Dress Code</Label>
              <div style={{ margin: '0.5em' }}>
                <Select
                  inputId="dressCode"
                  placeholder="Dress Code"
                  value={this.state.selectDressCode}
                  options={this.state.suggestions.dressCode}
                  onChange={ selected => {
                    let { data } = this.state
                    data.dressCode.title = selected.value
                    this.setState((prevState, props)=>({
                      data,
                      selectDressCode: selected
                    }))
                  }}
                />
              </div>              
            </Grid>

            <Grid item xs={8}>
              <Label>Tags</Label>
              <TextField id="tags" fullWidth label="Tags (chips)" 
                variant="outlined" margin="dense" onChange={(e)=>{
                  console.log(e.target.value)
                }}/>
            </Grid>
          </Grid>
        </Paper>
        
        <div>
          <h5 className="title">
            Custom Details
            <Fab style={{ margin: '1em' }} color="primary"
              onClick={()=>{
                let { data } = this.state
                data.hasCutomDetails = true
                data.customDetails.push({
                  detailName: String,
                  detailData: String
                })
                this.setState(()=>({
                  data
                }))
              }}
            >
              <Add/>
            </Fab>
          </h5>

          <Grid item container xs={12} spacing={1}>
          {
            this.state.data.customDetails.map((item, index)=>{
              return (
                <Grid key={'customDetail_'+index} item xs={6}>
                  <Paper className="create-block">
                    <Grid item container xs={12}>
                      <div style={{ width: '100%' }} className="clearfix">
                        Custom Detail
                        <span style={{ float: 'right' }}>
                          <Button color="default"
                            onClick={()=>{
                              let { data } = this.state
                              data.customDetails.splice(index, 1)
                              if(data.customDetails.length===0)
                                data.hasCutomDetails = false
                              this.setState(()=>({
                                data
                              }))
                            }}
                          >
                            <Delete/>
                          </Button>
                        </span>
                      </div>
                      
                      <Grid item xs={12}>
                        <TextField id={'customDetails#'+index+'/detailName'} fullWidth label="Custom Name" 
                          variant="outlined" margin="dense" onChange={this.handleChangeById}/>
                        <TextField id={'customDetails#'+index+'/detailData'} fullWidth label="Custom Data" 
                          variant="outlined" margin="dense" onChange={this.handleChangeById}/>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              )
            })
          }
          </Grid>
        </div>

        <Modal open={this.state.openArtistModal}>
          <Paper>
            <h1>Artist</h1>
          </Paper>
        </Modal>

        <Modal open={this.state.openMusicModal}>
          <Paper>
            <h1>Music</h1>
          </Paper>
        </Modal>
      </div>
    )
  }
}

export default EventDetails 