import React, { Component } from 'react'
import { Button, Fab, Paper, Modal } from '@material-ui/core'
import { Add } from '@material-ui/icons'

import '../scss/ImageUploader.scss'

import { Image } from './ui/Image'
import { UploadService, IUploadFile } from '@clubgo/features/api'

interface ImageUploaderProps{
  open: boolean
  onUploadComplete: Function
  onUploadError?: Function
  onClose: Function
  type: 'single' | 'multiple'
  collection: string
}

export class ImageUploader extends Component<ImageUploaderProps> {
  state = {
    uploadStarted: false,
    uploadFileNumber: null,
    files: Array<IUploadFile>(),
    errors: Array<any>()
  }

  uploader = null

  constructor(props) {
    super(props)
    this.uploader = new UploadService({
      uploadType: this.props.type,
      collection: this.props.collection
    })
  }

  componentDidMount() {
    this.addFile()
  }

  reset = () => {
    this.setState({
      uploadStarted: false, 
      uploadFileNumber: null,
      files: Array<IUploadFile>()
    })
  }
  
  addFile = () => {
    let { files } = this.state
    files.push({
      data: null, ext: null, contentType: null,
      filename: 'upload_' + Date.now().toString()
    })
    this.setState({ files })
  }

  upload = async () => {
    this.setState({ uploadStarted: true, uploadFileNumber: 1 })
    let { files } = this.state, refs = []

    for (const file of files) {
      if(file.data!==null && file.filename!==null) {
        try {
          let result = await this.uploader.single(file)
          this.setState({ uploadFileNumber: this.state.uploadFileNumber + 1 })
          refs.push(result.data.ref)
        } catch (error) {
          this.props.onUploadError(error)
          console.error(error)
        }
      }
    }
    
    this.props.onUploadComplete(refs)
    this.reset()
  }

  render() {
    return (
      <Modal open={this.props.open} 
        style={{ 
          margin: 'auto',
          padding: '2em 0',
          position: 'absolute',
          width: 600
        }}
      >
        <Paper style={{ width: '50em', padding: '2em' }}>
          {
            !this.state.uploadStarted ? (
              <div className="Uploader">
                <div className="uploader-controls">
                  <div style={{
                    display: 'flex',
                    flexDirection: 'row'
                  }}>
                    <h3 style={{ width: '60%', textAlign: 'left', fontWeight: 600, flexGrow: 1 }}>
                      Upload Images
                    </h3>
                  
                    <Button variant="contained" size="large" color="primary" style={{ margin: '0 1em' }} onClick={this.upload}>
                      Upload
                    </Button>

                    <Button variant="outlined" size="large" color="primary" style={{ margin: 0 }} onClick={()=>{
                      this.props.onClose()
                    }}>
                      Close
                    </Button>
                  </div>
                  
                </div>

                <div className="uploader-images-holder">
                  {
                    this.state.files.length===0 ? (
                      <p onClick={this.addFile}>No Files Added. Click here to add.</p>
                    ) : (
                      null
                    )
                  }

                  {
                    this.state.files.map((file, index)=>{
                      return (
                        <Image key={'imgUpload'+index}
                          index={index}
                          filename={file.filename}
                          injectFileData={{
                            imgData: file.data,
                            imgSrcExt: file.ext
                          }}
                          onSelect={(imgData, imgSrcExt, contentType)=>{
                            let { files } = this.state
                            files[index] = {
                              data: imgData, ext: imgSrcExt, contentType,
                              filename: files[index].filename + `.${imgSrcExt}`
                            }
                            this.setState({ files })
                            this.addFile()
                          }}
                          onClear={()=>{
                            let { files } = this.state
                            files[index] = {
                              data: null,
                              ext: null,
                              contentType: null,
                              filename: null
                            }
                            this.setState({
                              files
                            })
                          }}
                          onDelete={()=>{
                            let { files } = this.state
                            files.splice(index, 1)
                            this.setState((prevState, props)=>({
                              files
                            }))
                          }}
                        />
                      )
                    })
                  }
                </div>
              </div>
            ) : (
              <div style={{ padding: '5em', textAlign: 'center' }}>
                Uploading { this.state.uploadFileNumber } of { this.state.files.length - 1 }
              </div>
            )
          }
        </Paper>
      </Modal>
    )
  }
}

export default ImageUploader
