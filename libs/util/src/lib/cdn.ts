export interface IFileItem {
  fileRef: string,
  filename: string,
  contentType?: string,
  originalFilename?: string,
  metadata?: {
    sizeInBytes?: number
  }
}

export function findItemIndexByRef(array, item:number, high:number=0, low=0){
  // Binary Search Algorithm
  if(high >= low) {
    var mid = Math.floor((low + high) / 2)
    if(item === parseInt(array[mid].fileRef, 16))
      return mid
    else if(item > parseInt(array[mid].fileRef, 16))
      return findItemIndexByRef(array, item, high, mid + 1)
    
    return findItemIndexByRef(array, item, mid - 1, low)
  }
  return -1
}

export function sortItemArrayByRef(array, _right:number=0, _left=0) {
  let index
  if (array.length > 1) {
    index = partition(array, _left, _right)
    if (_left < index-1)
      sortItemArrayByRef(array, _left, index-1)
    
    if (index < _right)
      sortItemArrayByRef(array, index, _right)
  }
  return array

  function partition(items, left, right) {
    let pivot = items[Math.floor((right + left) / 2)]

    while (left <= right) {
      while (items[left] < pivot)
        left++
      while (items[right] > pivot)
        right--

      if (left <= right) {
        let temp = items[left]
        items[left] = items[right]
        items[right] = temp
        left++
        right--
      }
    }
    return left
  }
}
