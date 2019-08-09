import React, { Component } from 'react'
import * as Rs from 'reactstrap'

import { Grid, Paper, Modal, Fab } from '@material-ui/core'
import { TextField, Button, Switch, Checkbox } from '@material-ui/core'
import { InputAdornment } from '@material-ui/core'
import { Link, Delete } from '@material-ui/icons'

import { ImageUploader } from './ImageUploader'
import { handleChangeById as inputHandler } from '@clubgo/util'

export interface MediaCardProps {
  name: string,
  syncParentData?: Function,
  includeVideoURL?: boolean,
  tag?: string,
  populate?: boolean,
  data?: any
}
export class MediaCard extends Component<MediaCardProps> {
  state = {
    openImageUploadModal: false,
    data: {
      images: [],
      videoURL: null
    },
    requiredFulfilled: false,
    required: [
      'images#1'
    ],
    iteratableMembers: [
      'images'
    ]
  }

  componentDidMount() {
    this.setState(()=>{
      if(this.props.populate) {
        let images = this.props.data
        let { data } = this.state
        
        if(images!==undefined)
          data.images = images
        else
          data.images = []

        return {
          data
        }
      }
    })
  }

  handleChangeById = (event) => {
    const result = inputHandler(event, this.state)
    this.props.syncParentData(this.state.data, this.props.name)
    this.setState((prevState, props)=>(
      result
    ))
  }

  render() {
    return (
      <Paper className="create-block">
        <h3 className="title">
          {
            this.props.name + ' Images'
          }
        </h3>

        <Grid item container spacing={3}>
          <Grid item xs={12}>
            {
              this.state.data.images.length===0 ? (
                <p>No Images</p>
              ) : null
            }
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap'
            }}>
              {
                this.state.data.images.map((image, index)=>{
                  return (
                    <Image key={index} src={image.url} onDelete={(src)=>{
                      let { images } = this.state.data
                      images = images.filter((img)=>{
                        if(img.url===src) return false
                        return true
                      })
                      let { data } = this.state
                      data.images = images
                      this.props.syncParentData(data, this.props.name)
                      this.setState({
                        data
                      })
                    }}/> 
                  )
                })
              }
            </div>
          </Grid>

          <Grid item xs={12}>
            <div>
              <Button variant="outlined" color="primary"
                onClick={()=>{
                  this.setState({
                    openImageUploadModal: true
                  })
                }}
              >
                Upload Images
              </Button>
            </div>

            <Modal style={{ 
              margin: 'auto',
              padding: '2em 0',
              position: 'absolute',
              width: 600
            }}
              open={this.state.openImageUploadModal}
            >
              <Paper style={{ width: '50em', padding: '2em' }}>
                <ImageUploader type="multiple" env="dev"
                  onUploadComplete={(uploadData)=>{
                    let { images } = this.state.data
                    for (const img of uploadData)
                      images.push({
                        url: img.ref,
                        tags: [ this.props.tag ]
                      })
                    
                    let { data } = this.state
                    data.images = images
                    
                    this.setState((prevState, props)=>{
                      this.props.syncParentData(data, this.props.name)
                      return {
                        openImageUploadModal: false,
                        data
                      }
                    })
                  }}
                />
                <Button color="secondary" variant="contained" 
                  onClick={()=>{
                    this.setState({
                      openImageUploadModal: false
                    })
                  }}
                >
                  Close
                </Button>
              </Paper>
            </Modal>
          </Grid>

          {
            this.props.includeVideoURL!==null && this.props.includeVideoURL ? (
              <Grid item xs={12}>
                <Rs.Label>Video URL</Rs.Label>
                <TextField id="videoURL" fullWidth variant="outlined" 
                  margin="dense" placeholder="https://example.com/video"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">
                      <Link/>
                    </InputAdornment>,
                  }}
                  onChange={this.handleChangeById}
                />
              </Grid>
            ) : null
          }
        </Grid>
      </Paper>
    )
  }
}

export interface ImageProps {
  src: string,
  onDelete?: Function
}
export class Image extends Component<ImageProps> {
  render() {
    return (
      <div style={{
        margin: '0.5em',
        width: 'fit-content',
        height: 'fit-content',
        borderRadius: '0.5em',
        boxShadow: '0 0 5px #1c1c1c80',
        position: 'relative'
      }}>
        <img width="150px" style={{ borderRadius: '0.5em' }} src={
          `http://localhost:4444/i/${this.props.src}`
        } alt="Image"/>

        <Fab color="default" size="small" style={{ 
          position: 'absolute',
          top: '0',
          right: '0',
          margin: '0.5em' 
        }}
          onClick={()=>{
            if(this.props.onDelete!==undefined)
              this.props.onDelete(this.props.src)
          }}
        >
          <Delete/>
        </Fab>
      </div>      
    )
  }
}

export default MediaCard
