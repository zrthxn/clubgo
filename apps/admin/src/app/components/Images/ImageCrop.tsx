import React, { PureComponent } from 'react'
import { Grid, Paper, Button, Modal } from '@material-ui/core'
import Select from 'react-select'
import Cropper from 'react-easy-crop'
import getCroppedImg from './crop'
import { Slider } from '@material-ui/lab'

interface ImageCropProps {
  open: boolean
  src: any
  onComplete: Function
  onClose?: Function
}

export class ImageCrop extends PureComponent<ImageCropProps> {
  state = {
    croppedImage: null,
    croppedAreaPixels: null,
    aspectRatio: 1,
    rotation: 0,
    zoom: 1,
    crop: {
      x: 0,
      y: 0
    }
  }

  onCropComplete = (croppedArea, croppedAreaPixels) => {
    this.setState({ croppedAreaPixels })
  }

  showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(
        this.props.src,
        this.state.croppedAreaPixels,
        this.state.rotation
      )
      this.props.onComplete(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }

  onClose = () => {
    this.setState({
      croppedImage: null
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
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <h3 style={{ textAlign: 'left' }}>Crop Image</h3>
            </Grid>

            <Grid item xs={6}>
              <Select 
                options={[
                  { label: 'Square (1:1)', value: 1 },
                  { label: '16:9', value: 16/9 },
                  { label: '4:3', value: 4/3 }
                ].map((item, index)=>({
                  label: item.label, value: item.value
                }))}
                placeholder="Aspect Ratio"
                onChange={(selected)=>{
                  this.setState(()=>{
                    let { aspectRatio } = this.state
                    if(selected!==null)
                      aspectRatio = selected.value
                    return {
                      aspectRatio
                    }
                  })
                }}
              />
            </Grid>

            <Grid item xs={12} style={{
              position: 'relative',
              width: '100%',
              height: 400,
              background: '#eee'
            }}>
              <Cropper
                image={this.props.src}
                crop={this.state.crop}
                rotation={this.state.rotation}
                zoom={this.state.zoom}
                aspect={this.state.aspectRatio}
                onCropComplete={this.onCropComplete}
                onCropChange={(crop)=>{
                  this.setState({ crop })
                }}
                onRotationChange={(rotation)=>{
                  this.setState({ rotation })
                }}
                onZoomChange={(zoom)=>{
                  this.setState({ zoom })
                }}
              />
            </Grid>

            {/* <Grid item md={6} xs={12} style={{
              display: 'flex',
              flex: '1',
              alignItems: 'center',
            }}>
              <Slider style={{
                  padding: '22px 0px',
                  marginLeft: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                  margin: '0 16px',
                }}
                value={this.state.zoom}
                min={1}
                max={3}
                step={0.1}
                onChange={(e, zoom) => {
                  this.setState({ zoom })
                }}
              />
            </Grid>

            <Grid item md={6} xs={12} style={{
              display: 'flex',
              flex: '1',
              alignItems: 'center',
            }}>
              <Slider style={{
                  padding: '22px 0px',
                  marginLeft: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                  margin: '0 16px',
                }}
                value={this.state.rotation}
                min={0}
                max={360}
                step={1}
                aria-labelledby="Rotation"
                onChange={(e, rotation) => {
                  this.setState({ rotation })
                }}
              />
            </Grid> */}


            <Grid item xs={12}></Grid>
            <Grid item xs={12}></Grid>

            <Grid item xs={6}>
              <Button variant="outlined" color="primary" onClick={()=>{
                if(this.props.onClose)
                  this.props.onClose()
              }}>
                Cancel
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Button variant="contained" color="primary" onClick={this.showCroppedImage}>
                Done
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    )
  }
}

export default ImageCrop
