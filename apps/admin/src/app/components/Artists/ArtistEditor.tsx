import React, { Component } from 'react'
import { Paper, Grid, TextField, Button, Modal } from '@material-ui/core'
import Select from 'react-select'
import CreateableSelect from 'react-select/creatable'

import '../scss/Artists.scss'

import { handleChangeById as inputHandler, verifyRequirements } from '@clubgo/util'
import AdminContext from '../../AdminContext'
import MediaCard from '../Images/MediaCard'

interface ArtistEditorProps {
  open: boolean
  onFinalize: Function
  onCancel: Function
  populate?: boolean
  data?: any
}

export class ArtistEditor extends Component<ArtistEditorProps> {
  static contextType = AdminContext
  context!: React.ContextType<typeof AdminContext>

  state = {
    selectCategory: null,
    data: {
      owner: 'admin',
      artistTitle: null,
      description: null,
      category: null,
      music: null,
      social: [],
      images: []
    }
  }

  handleChangeById = (event) => {
    const result = inputHandler(event, this.state)
    this.setState((prevState, props)=>(
      result
    ))
  }

  componentDidMount() {
    this.setState(()=>{
      let { data } = this.props
      if(this.props.populate) {
        return {    
          data,
          selectCategory: {
            label: data.category.toUpperCase(), value: data.category
          },
          loading: false
        }
      }
      else
        return {
          loading: false
        }
    }) 
  }

  render() {
    return (
      <Modal open={this.props.open} style={{
        textAlign: 'center',
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column'
      }}>
        <Paper style={{ 
          marginTop: '5em',
          marginLeft: '50%',
          left: '-24em',
          padding: '2em 4em',
          width: '48em',
          position: 'absolute' 
        }}>
          <Grid container spacing={1}>
            <h2 style={{ margin: '1em 0.25em' }}>Create Artist</h2>

            <Grid item xs={12}>
              <TextField fullWidth id="artistTitle" label="Artist Title" defaultValue={this.state.data.artistTitle}
                variant="outlined" onChange={this.handleChangeById}/>
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth id="description" multiline label="Description" defaultValue={this.state.data.description}
                variant="outlined" margin="dense" onChange={this.handleChangeById}/>
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth id="category" multiline label="Category" defaultValue={this.state.data.description}
                variant="outlined" margin="dense" onChange={this.handleChangeById}/>
            </Grid>

            <Grid item xs={12}>
              <CreateableSelect
                isMulti
                isClearable
                placeholder="Music"
                onChange={(values:any) => {
                  let { data } = this.state
                  let music = []
                  for (const mus of values)
                    music = [ ...music, mus.value ]

                  data.music = music
                  this.setState((prevState, props)=>{
                    return {
                      data
                    }
                  })
                }}
              />
            </Grid>

            <Grid>
              <MediaCard/>
            </Grid>
            
            <Grid item xs={12}></Grid>
            <Grid item xs={12}></Grid>

            <Grid item xs={6}>
              <Button onClick={(e)=>{
                this.props.onCancel()
              }}>
                Close
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Button color="primary"  onClick={(e)=>{
                this.props.onFinalize(this.state.data)
              }}>
                Confirm
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Modal>      
    )
  }
}
