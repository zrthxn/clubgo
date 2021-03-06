import React, { Component } from 'react'
import { Label } from 'reactstrap'
import { Grid, Paper, Modal, Fab } from '@material-ui/core'
import { TextField, Button, Switch, Checkbox } from '@material-ui/core'
import { InputAdornment } from '@material-ui/core'
import { Link, Delete } from '@material-ui/icons'

import '../scss/ImageUploader.scss'
import '../scss/Create.scss'

import { ImageUploader } from './ImageUploader'
import { APIEndpoints } from '@clubgo/api'
import { handleChangeById as inputHandler } from '@clubgo/util'

interface MediaCardProps {
  syncParentData?: Function
  syncData?: boolean
  includeVideoURL?: boolean
  tag?: string
  populate?: boolean
  data?: any
}

export class MediaCard extends Component<MediaCardProps> {
  state = {
    openImageUploadModal: false,
    synchronized: false,
    data: {
      images: [],
      videoURL: null
    }
  }

  componentDidMount() {
    this.setState(()=>{
      if(this.props.populate) {
        return {
          data: this.props.data
        }
      }
    })
  }

  handleChangeById = (event) => {
    const result = inputHandler(event, this.state)
    this.setState((prevState, props)=>(
      result
    ))
  }

  // componentDidUpdate() {
  //   if(this.props.syncData!==this.state.synchronized) { 
  //     if(this.props.syncData) {
  //       this.props.syncParentData(this.state.data)
  //       this.setState({
  //         synchronized: this.props.syncData
  //       })
  //     }
  //   }
  // }

  render() {
    return (
      <Paper className="create-block">
        <h3 className="title">
          {
            this.props.tag + ' Images'
          }
        </h3>

        <Grid item container spacing={3}>
          <Grid item xs={12}>
            {
              this.state.data.images.length===0 ? (
                <p style={{ margin: 0 }}>No Images</p>
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
                    <UploadedImage key={index} src={image.url} 
                      onDelete={(src)=>{
                        let { images } = this.state.data
                        images = images.filter((img)=>{
                          if(img.url===src) return false
                          return true
                        })
                        let { data } = this.state
                        data.images = images
                        this.setState({
                          data
                        })
                      }}
                    /> 
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

            <ImageUploader open={this.state.openImageUploadModal}
              type="single" collection="images"
              onUploadComplete={(uploadData)=>{
                let { images } = this.state.data
                for (const img of uploadData)
                  images.push({
                    url: img,
                    tags: [ this.props.tag ]
                  })
                
                let { data } = this.state
                data.images = images
                
                this.setState((prevState, props)=>{
                  return {
                    openImageUploadModal: false,
                    data
                  }
                })
                this.props.syncParentData(data)
              }}
              onUploadError={()=>{
                alert('Error in uploading image')                
              }}
              onClose={()=>{
                this.setState({
                  openImageUploadModal: false
                })
              }}
            />
          </Grid>

          {
            this.props.includeVideoURL!==null && this.props.includeVideoURL ? (
              <Grid item xs={12}>
                <Label>Video URL</Label>
                <TextField id="videoURL" fullWidth variant="outlined" 
                  margin="dense" placeholder="https://example.com/video"
                  InputProps={{
                    startAdornment: 
                      <InputAdornment position="start">
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

interface UploadedImageProps {
  src: string,
  onDelete?: Function
}

export class UploadedImage extends Component<UploadedImageProps> {
  render() {
    return (
      <div style={{
        margin: '0.5em',
        width: 'fit-content',
        height: 'fit-content',
        maxHeight: '15em',
        borderRadius: '0.5em',
        boxShadow: '0 0 5px #1c1c1c80',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <img width="150px" style={{ borderRadius: '0.5em' }} src={this.props.src} alt="Image"/>

        <Fab color="default" size="small" 
          style={{ 
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
