// A few JavaScript Functions for Images and Files
// Author: Justin Mitchel
// Source: https://kirr.co/ndywes

/**
 * Convert a Base64-encoded string to a File object
 * @param base64String 
 * @param filename 
 */
export function base64StringtoFile (base64String, filename) {
  var arr = base64String.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, {type: mime})
}

/**
 * Download a Base64-encoded file
 * @param base64Data 
 * @param filename 
 */
export function downloadBase64File (base64Data, filename) {
  var element = document.createElement('a')
  element.setAttribute('href', base64Data)
  element.setAttribute('download', filename)
  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

/**
 * Extract an Base64 Image's File Extension
 * @param base64Data 
 */
export function extractImageFileExtensionFromBase64 (base64Data) {
  return base64Data.substring('data:image/'.length, base64Data.indexOf(';base64'))
}

/**
 * Base64 Image to Canvas with a Crop
 * @param canvasRef 
 * @param image64 
 */
export function image64toCanvasRef (canvasRef, image64) {
  const canvas = canvasRef // document.createElement('canvas');
  const ctx = canvas.getContext('2d')
  const image = new Image()
  image.src = image64
  image.onload = function () {
    ctx.drawImage(
      image,
      0,
      0,
      image.width,
      image.height,
      0,
      0,
      image.width,
      image.height
    )
  }
}

/**
 * Base64 Image to Canvas with a Crop
 * @param canvasRef 
 * @param image64 
 * @param pixelCrop 
 */
export function image64toCanvasRefCrop (canvasRef, image64, pixelCrop) {
  const canvas = canvasRef // document.createElement('canvas');
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height
  const ctx = canvas.getContext('2d')
  const image = new Image()
  image.src = image64
  image.onload = function () {
    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    )
  }
}

/**
 * Decode Base64 image to type and data
 * @param data 
 */
export function decodeBase64Image(data) {
  var matches = data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
  let response = {
    type: null,
    data: null
  }
  
  if(matches!==null) {
    if (matches.length !== 3) {
      console.error(Error('Invalid input string'))
      return response
    }
    response.type = matches[1]
    response.data = Buffer.from(matches[2], 'base64')
  }
  else
    response.data = Buffer.from(data, 'base64')
  
  return response
}