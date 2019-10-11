import React, { Component } from 'react'
import { Grid, Paper } from '@material-ui/core'
import Dropzone from 'react-dropzone'
import ReactCrop from 'react-image-crop'

import {
  base64StringtoFile,
  downloadBase64File,
  extractImageFileExtensionFromBase64,
  image64toCanvasRef,
  image64toCanvasRefCrop
} from '@clubgo/util'

import '../scss/ImageUpload.scss'
import 'react-image-crop/dist/ReactCrop.css'

export class ImageUpload extends Component {
  state = {
    imgSrc: null,
    imgSrcExt: null,
    crop: {
      aspect: 1/1
    },
    files: [ ]
  }

  imagePreviewCanvasRef = React.createRef<HTMLCanvasElement>()
  fileInputRef = React.createRef<HTMLInputElement>()
  imageMaxSize = 1000000000 // bytes
  
  acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif, image/webp'
  acceptedFileTypesArray = this.acceptedFileTypes.split(',').map(item => item.trim())

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

  handleOnDrop = (files, rejectedFiles) => {
    if (rejectedFiles && rejectedFiles.length > 0){
      this.verifyFile(rejectedFiles)
    }

    if (files && files.length > 0){
      const isVerified = this.verifyFile(files)
      if (isVerified){
        // imageBase64Data 
        const currentFile = files[0]
        const myFileItemReader = new FileReader()
        myFileItemReader.addEventListener("load", ()=>{
          const myResult = myFileItemReader.result
          this.setState({
            imgSrc: myResult,
            imgSrcExt: extractImageFileExtensionFromBase64(myResult)
          })
        }, false)

        myFileItemReader.readAsDataURL(currentFile)
      }
    }
  }

  handleImageLoaded = (image) => {
    //console.log(image)
  }

  onCropChange = (crop) => {
    this.setState({crop:crop})
  }

  onCropComplete = (crop, pixelCrop) =>{
    //console.log(crop, pixelCrop)
    const canvasRef = this.imagePreviewCanvasRef.current
    const {imgSrc}  = this.state
    image64toCanvasRefCrop(canvasRef, imgSrc, pixelCrop)
  }

  handleDownloadClick = (event) => {
    event.preventDefault()
    const {imgSrc}  = this.state
    if (imgSrc) {
      const canvasRef = this.imagePreviewCanvasRef.current
      const { imgSrcExt } =  this.state
      const imageData64 = canvasRef.toDataURL('image/' + imgSrcExt)

      const myFilename = "previewFile." + imgSrcExt

      // file to be uploaded
      const myNewCroppedFile = base64StringtoFile(imageData64, myFilename)
      console.log(myNewCroppedFile)
      // download file
      downloadBase64File(imageData64, myFilename)
      this.clearToDefault()
    }
  }

  clearToDefault = (event?) =>{
    if (event) event.preventDefault()
    const canvas = this.imagePreviewCanvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    this.fileInputRef.current.value = null

    this.setState({
      imgSrc: null,
      imgSrcExt: null
    })
  }

  handleFileSelect = event => {
    // console.log(event)
    const files = event.target.files
    if (files && files.length > 0){
      const isVerified = this.verifyFile(files)
      if (isVerified){
        // imageBase64Data 
        const currentFile = files[0]
        const myFileItemReader = new FileReader()
        myFileItemReader.addEventListener("load", ()=>{
          // console.log(myFileItemReader.result)
          const myResult = myFileItemReader.result
          this.setState({
            imgSrc: myResult,
            imgSrcExt: extractImageFileExtensionFromBase64(myResult)
          })
        }, false)

        myFileItemReader.readAsDataURL(currentFile)
      }
    }
  }

  render() {
    const files = this.state.files.map(
      file => (
        <li key={file.name}>
          {file.name} - {file.size} bytes
        </li>
      )
    )

    return (
      <Paper className="create-block">
        <div>
          <h1>Drop and Crop</h1>

          <aside>
            <h4>Files</h4>
            <ul>{ files }</ul>
          </aside>

          {
            this.state.imgSrc !== null ? (
              <div>
                <ReactCrop 
                  src={this.state.imgSrc} 
                  crop={this.state.crop} 
                  onImageLoaded={this.handleImageLoaded}
                  onComplete = {this.onCropComplete}
                  onChange={this.onCropChange}
                />

                <p>Preview Canvas Crop </p>
                
                <canvas 
                  ref={this.imagePreviewCanvasRef}
                />

                <button onClick={this.handleDownloadClick}>Download</button>
                <button onClick={this.clearToDefault}>Clear</button>
              </div>
            ) : (
              <Dropzone 
                onDrop={this.handleOnDrop} 
                accept={this.acceptedFileTypesArray} 
                multiple={false} 
                maxSize={this.imageMaxSize}
              >
                {
                  ({ getRootProps, getInputProps }) => (
                    <section className="container">
                      <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()}
                          // ref={this.fileInputRef}
                          accept={this.acceptedFileTypes} 
                          multiple={false} 
                          onChange={this.handleFileSelect} 
                        />
                        <p>Drop image here or click to upload</p>
                      </div>
                    </section>
                  )
                }
              </Dropzone>
            )
          }
        </div>
      </Paper>
    )
  }
}

export default ImageUpload
