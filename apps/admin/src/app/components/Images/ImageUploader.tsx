import React, { Component } from 'react'
import { Button, Fab } from '@material-ui/core'
import { Add } from '@material-ui/icons'

import '../scss/ImageUploader.scss'

import { Image } from './ui/Image'
import { UploadService } from '@clubgo/features/api'

export interface ImageUploaderProps{
  onUploadComplete: Function
}
export class ImageUploader extends Component<ImageUploaderProps> {
  state = {
    files: [ ]
  }

  uploader = null

  constructor(props) {
    super(props)
    this.uploader = new UploadService()
    this.uploader.addPathRoute('/api/_upload/multiple/root')
  }

  upload = async () => {
    let results = await this.uploader.multiple([ 
      ...this.state.files
    ])
    let { refs } = results.data
    
    console.log( refs )
  }

  render() {
    return (
      <div className="Uploader">
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
        
        <br/>
        
        <div>
          
        </div>
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
    )
  }
}

export default ImageUploader
