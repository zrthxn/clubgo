import React, { Component } from 'react'
import Cropper from 'react-cropper';

import { extractImageFileExtensionFromBase64 } from '@clubgo/util'

export class ImageCrop extends Component {
  state = {
    imgSrc: null
  }

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
    return (
      <div>
        {
          this.state.imgSrc!==null ? (
            <Cropper
              ref="cropper"
              src={this.state.imgSrc}
              style={{height: 400, width: '100%'}}
              // Cropper.js options
              aspectRatio={16 / 9}
              responsive={true}
              guides={true}
              modal={true}
              crop={this._crop.bind(this)}
            />
          ) : (
            <input
              ref={this.fileInputRef}
              type="file"
              accept={this.acceptedFileTypes} 
              multiple={false} 
              onChange={this.handleFileSelect} 
            />
          )
        }        
      </div>
    )
  }
}

export default ImageCrop
