import React, { Component } from 'react'
import { Button, Paper, Modal } from '@material-ui/core'
import { Add, Delete } from '@material-ui/icons'
import '../scss/ImageUploader.scss'

import { UploadService, IUploadFile } from '@clubgo/api'
import { extractImageFileExtensionFromBase64 } from '@clubgo/util'
import ImageCrop from './ImageCrop'

interface ImageUploaderProps{
  open: boolean
  onUploadComplete: Function
  onUploadError?: Function
  onClose: Function
  type: 'single' | 'multiple'
  collection: string
}

interface ImageProps {
  index: number
  onSelect: Function
  onClear: Function
  onDelete: Function
  filename?: string
  injectFileData?: {
    imgData: string
    imgSrcExt: string
  }
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
      <Modal open={this.props.open} style={{
        textAlign: 'center',
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column'
      }}>
        <Paper style={{ 
          marginTop: '5em',
          marginLeft: '50%',
          left: '-24em',
          padding: '2em',
          width: '48em',
          position: 'absolute' 
        }}>
          {
            !this.state.uploadStarted ? (
              <div className="Uploader">
                <div className="uploader-controls">
                  <div style={{
                    display: 'flex',
                    flexDirection: 'row'
                  }}>
                    <h3 style={{ 
                      width: '60%', textAlign: 'left', 
                      fontWeight: 600, flexGrow: 1 
                    }}>
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
                        <Image key={`imgUpload-${index}`}
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
                              filename: files[index].filename + '.' + imgSrcExt
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
              <div style={{ padding: '5em', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
                <div style={{ margin: '1em auto' }}>
                  <span className="spinner"/>
                </div>
                <p>
                  Uploading { this.state.uploadFileNumber } of { this.state.files.length - 1 }
                </p>
              </div>
            )
          }
        </Paper>
      </Modal>
    )
  }
}

export default ImageUploader

// --------------------------------------------------------
// Image container for Upload
class Image extends Component<ImageProps> {
  state = {
    imgSrc: null,
    imgSrcExt: null,
    selectedImage: null,
    selectedImageType: null,
    openImageCrop: false
  }

  imagePreviewCanvasRef = React.createRef<HTMLCanvasElement>()
  fileInputRef = React.createRef<HTMLInputElement>()

  imageMaxSize = 25 * 1024 * 1024 // MB
  
  acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif, image/webp'
  acceptedFileTypesArray = this.acceptedFileTypes.split(',').map(item => item.trim())
  
  componentDidUpdate() {
    if(this.state.imgSrc!==this.props.injectFileData.imgData)
      this.setState({
        imgSrc: this.props.injectFileData.imgData,
        imgSrcExt: this.props.injectFileData.imgSrcExt
      })
  }

  verifyFile = (files) => {
    if (files && files.length > 0){
      const currentFile = files[0]
      const currentFileType = currentFile.type
      const currentFileSize = currentFile.size
      if(currentFileSize > this.imageMaxSize) {
        alert("This file is not allowed. " + currentFileSize + " bytes is too large")
        return false
      }
      if (!this.acceptedFileTypesArray.includes(currentFileType)){
        alert("This file is not allowed. Only images are allowed.")
        return false
      }
      return true
    }
  }

  handleFileSelect = (event) => {
    const { files } = event.target
    if (files && files.length > 0){
      const isVerified = this.verifyFile(files)
      if (isVerified){
        const currentFile = files[0]
        const fileItemReader = new FileReader()
        fileItemReader.addEventListener('load', ()=>{
          const { result } = fileItemReader
          this.setState({
            selectedImage: result,
            selectedImageType: currentFile.type,
            openImageCrop: true
          })
        }, false)
        
        fileItemReader.readAsDataURL(currentFile)
      }
    }
  }

  render() {
    return (
      <div className="Image">
        {
          this.state.imgSrc!==null ? (
            <div className="image-container">
              <img src={this.state.imgSrc}/>

              <div className="image-delete">
                <Button
                  onClick={()=>{                    
                    this.setState(()=>{
                      this.props.onClear()
                      return {
                        imgSrc: null,
                        imgSrcExt: null
                      }
                    })
                  }}
                >
                  CLEAR
                </Button>
              </div>
            </div>
          ) : (
            <div className="no-image-container">
              <div className="no-image-view">
                <label htmlFor={'imageSelect-' + this.props.index}>
                  Select an Image<br/>
                  <Add/><br/>
                  <Button color="default"
                    onClick={this.props.onDelete.bind(this)}
                  >
                    <Delete/>
                  </Button>
                </label>
              </div>
              <input id={'imageSelect-' + this.props.index} ref={this.fileInputRef}
                type="file" accept={this.acceptedFileTypes} multiple={false} 
                onChange={this.handleFileSelect} 
              />
              
              {
                this.state.openImageCrop ? (
                  <ImageCrop open={this.state.openImageCrop}
                    src={this.state.selectedImage}
                    mimeType={this.state.selectedImageType}
                    onComplete={(result)=>{
                      this.setState(()=>{
                        this.props.onSelect( result, extractImageFileExtensionFromBase64(result), this.state.selectedImageType )
                        return {
                          imgSrc: result,
                          imgSrcExt: extractImageFileExtensionFromBase64(result),
                          openImageCrop: false
                        }
                      })
                    }}
                    onClose={()=>{
                      this.setState(()=>{
                        this.props.onSelect( this.state.selectedImage, 
                          extractImageFileExtensionFromBase64(this.state.selectedImage), 
                          this.state.selectedImageType
                        )
                        return {
                          imgSrc: this.state.selectedImage,
                          imgSrcExt: extractImageFileExtensionFromBase64(this.state.selectedImage),
                          openImageCrop: false
                        }
                      })
                    }}
                  />
                ) : null
              }
            </div>
          )
        }
      </div>
    )
  }
}
