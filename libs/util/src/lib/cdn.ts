export interface IFileItem {
  ref: string,
  path: string,
  filename: string,
  originalname: string,
  metadata: {
    size: string,
    encoding: string,
    mimetype: string,
  }
}

export function findItemIndexByRef(array:Array<any>, item:number, high=0, low=0){
  // Binary Search Algorithm
  if(high >= low) {
    var mid = Math.floor((low + high) / 2)
    if(item === parseInt(array[mid].ref, 36))
      return mid
    else if(item > parseInt(array[mid].ref, 36))
      return findItemIndexByRef(array, item, high, mid + 1)
    
    return findItemIndexByRef(array, item, mid - 1, low)
  }
  return -1
}

export function sortItemArrayByRef(files, high?:number, low?:number) {
  // Quick Sort Algorithm with pivot at end
  if (low < high) { 
    var pivot = files[high].ref
    var i = low - 1
    for (var j=low; j<=high-1; j++)
      if (files[j].ref <= pivot) { 
        i++  
        let temp = files[i]
        files[i] = files[j]
        files[j] = temp 
      } 

    let pi = i + 1
    let temp = files[pi]
    
    files[pi] = files[high]
    files[high] = temp

    sortItemArrayByRef(files, low, pi - 1) 
    sortItemArrayByRef(files, pi + 1, high)
  }
  return files
}
