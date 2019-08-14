import React, { Component } from 'react'
import { Label, DropdownItem } from 'reactstrap'
import { Grid, Paper, TextField, Button, Fab, Modal } from '@material-ui/core'
import { FormControl, MenuItem, InputLabel, OutlinedInput } from '@material-ui/core'
import Select from 'react-select'
import CreateableSelect from 'react-select/creatable'
import { Add, Delete } from '@material-ui/icons'

import { handleChangeById as inputHandler } from '@clubgo/util'

export interface EventDetailsProps {
  syncParentData?: Function
  populate?: boolean,
  data?: any
}
export class EventDetails extends Component<EventDetailsProps> {
  state = {
    loading: true,
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
    selectCategories: [],
    data: {
      eventTitle: undefined,
      description: undefined,
      categories: [ ],
      tagline: undefined,
      flashText: undefined,
      artists: [ ],
      music: [ ],
      dressCode: {
        title: undefined,
        images: [ ]
      },
      tags: [ ],
      hasCutomDetails: false,
      customDetails: [ ],
    },
    requiredFulfilled: false,
    required: [
      'eventTitle', 'description', 'categories'
    ],
    iterableMembers: [
      'customDetails'
    ]
  }

  componentDidMount() {
    this.setState(()=>{
      if(this.props.populate) {
        let { selectCategories } = this.state
        this.props.data.categories.forEach(cat => selectCategories.push({
          label: cat, value: cat
        }))

        return {
          selectCategories,
          selectDressCode: { 
            label: this.props.data.dressCode.title, 
            value: this.props.data.dressCode.title 
          },
    
          data: this.props.data,
          loading: false,
        }
      }
      else
        return {
          loading: false,
        }
    }) 
  }
  
  handleChangeById = (event) => {
    const result = inputHandler(event, this.state)
    this.props.syncParentData(this.state.data, 'root')
    this.setState((prevState, props)=>(
      result
    ))
  }

  render() {
    // Event Details Section  ----------------------------------------------  Event Details Section
    // ============================================================================================
    if(!this.state.loading) return (
      <div>
        <Paper className="create-block">
          <h3 className="title">Event</h3>
          
          <Grid item container spacing={3}>                
            <Grid item xs={12}>
              <Label>Details</Label>
              <TextField id="eventTitle" required fullWidth label="Event Name" 
                variant="outlined" onChange={this.handleChangeById}/>
              <TextField id="description" required multiline fullWidth label="Description" 
                variant="outlined" margin="dense" onChange={this.handleChangeById}/>
              
              <Select
                inputId="category"
                placeholder="Category"
                value={this.state.selectCategories}
                options={this.state.suggestions.category}
                isMulti
                onChange={ selected => {
                  let { data } = this.state
                  data.categories = []
                  for(let item of selected)
                    data.categories.push(item.value)
                  
                  this.setState((prevState, props)=>{
                    this.props.syncParentData(data, 'root')
                    return {
                      data,
                      selectCategories: selected
                    }
                  })
                }}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <Label>Tagline</Label>
              <TextField id="tagline" fullWidth label="Tagline" 
                variant="outlined" margin="dense" onChange={this.handleChangeById}/>
              <TextField id="flashText" fullWidth label="Flash Text" 
                variant="outlined" margin="dense" onChange={this.handleChangeById}/>
            </Grid>

            <Grid item md={6} xs={12}>
              <Label>Performers</Label>
              <div style={{ padding: '0.5em' }}>
                <Button variant="contained" color="primary"
                  onClick={()=>{
                    this.setState({
                      openArtistModal: true
                    })
                  }}
                >
                  Select Artist
                </Button>
              </div>

              <div style={{ padding: '0.5em' }}>
                <Button variant="contained" color="primary"
                  onClick={()=>{
                    this.setState({
                      openMusicModal: true
                    })
                  }}
                >
                  Select Music
                </Button>
              </div>
            </Grid>

            <Grid item md={4} xs={12}>
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
                    this.setState((prevState, props)=>{
                      this.props.syncParentData(data, 'root')
                      return {
                        data,
                        selectDressCode: selected
                      }
                    })
                  }}
                />
              </div>
            </Grid>

            <Grid item md={8} xs={12}>
              <Label>Tags</Label>
              <div style={{ padding: '0.5em' }}>
                <CreateableSelect
                  isMulti
                  isClearable
                  onChange={(value:any) => {
                    let { tags } = this.state.data, { data } = this.state
                    tags = [ ...value ]
                    data.tags = tags
                    this.setState((prevState, props)=>{
                      this.props.syncParentData(data, 'root')
                      return {
                        data
                      }
                    })
                  }}
                />
              </div>              
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
                this.setState((prevState, props)=>{
                  this.props.syncParentData(data, 'root')
                  return { data }
                })
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
                              
                              this.setState((prevState, props)=>{
                                this.props.syncParentData(data, 'root')
                                return { data }
                              })
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

        <Modal 
          style={{
            width: '50%',
            margin: 'auto',
            padding: '2em'
          }}
          open={this.state.openArtistModal}>
          <Paper>
            <h1>Artist</h1>
          </Paper>
        </Modal>

        <Modal
          style={{
            width: '50%',
            margin: 'auto',
            padding: '2em'
          }}
          open={this.state.openMusicModal}>
          <Paper>
            <h1>Music</h1>
          </Paper>
        </Modal>
      </div>
    )
    else return (
      <h3>Loading...</h3>
    )
  }
}

export default EventDetails 