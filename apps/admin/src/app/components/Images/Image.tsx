import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import { Add, Delete } from '@material-ui/icons'
import { extractImageFileExtensionFromBase64 } from '@clubgo/util'
import ImageCrop from './ImageCrop'

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

export class Image extends Component<ImageProps> {
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

export default Image
