import React, { Component } from 'react'
import { Button, Fab, Paper } from '@material-ui/core'
import { Add } from '@material-ui/icons'

import '../scss/ImageUploader.scss'

import { Image } from './ui/Image'
import { UploadService, IUploadFile } from '@clubgo/features/api'

export interface ImageUploaderProps{
  type: 'single' | 'multiple',
  onUploadComplete: Function,
  env?: 'dev' | 'prod'
}
export class ImageUploader extends Component<ImageUploaderProps> {
  state = {
    files: Array<IUploadFile>()
  }

  uploader = null

  constructor(props) {
    super(props)
    this.uploader = new UploadService({
      uploadType: 'multiple',
      collection: 'images'
    })
  }

  upload = async () => {
    if(this.props.env!=='dev') {
      let result = await this.uploader.multiple(this.state.files)
      let { refs } = result.data
      this.props.onUploadComplete(refs)
    }
    else {
      this.props.onUploadComplete([
        { ref: 'abcd' },
        { ref: 'efgh' }
      ])
    }
  }

  render() {
    return (
      <div className="Uploader">
        <div className="uploader-controls">
          <div style={{
            display: 'flex',
            flexDirection: 'row'
          }}>
            <h3 style={{ width: '60%', textAlign: 'left' }}>Upload Images</h3>
          
            <div>
              <Fab style={{ margin: '1em' }} color="primary"
                onClick={()=>{
                  let { files } = this.state
                  files.push({
                    data: null,
                    ext: null,
                    contentType: null,
                    filename: 'upload_' + Date.now().toString()
                  })
                  this.setState({
                    files
                  })
                }}
              >
                <Add/>
              </Fab>

              <Button color="primary" onClick={this.upload}>
                Upload
              </Button>
            </div>
          </div>
          
        </div>

        <div className="uploader-images-holder">
          {
            this.state.files.length===0 ? (
              <p>No Files Added</p>
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
                      data: imgData,
                      ext: imgSrcExt,
                      contentType,
                      filename: files[index].filename + `.${imgSrcExt}`
                    }
                    this.setState({
                      files
                    })
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
    )
  }
}

export default ImageUploader
