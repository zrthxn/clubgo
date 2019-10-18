export function serialize(_object, _radical='') {
  let _serial = {}
  for (const key in _object) {
    if (_object.hasOwnProperty(key)){
      let element = _object[key]

      if(typeof element==='object' && !Array.isArray(element)) {
        if(key.match(/\$/))
          _serial[key] = element
        else
          _serial = { 
            ..._serial, 
            ...serialize(element, _radical + key + '.')
          }
      } 
      else
        _serial[ (_radical + key).toString() ] = element
    }
  }
  return _serial
}

export function exportAsCSV(items:Array<Array<string>>, filename:string, headers?:Array<string>) {
  var csv = convertToCSV(items, headers)
  var exportedFilename = filename || 'export.csv'

  var blob = new Blob([csv], { 
    type: 'text/csv;charset=utf-8;' 
  })

  if (navigator.msSaveBlob)
    navigator.msSaveBlob(blob, exportedFilename)
  else {
    var link = document.createElement('a')

    if (link.download !== undefined) {
      var url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', exportedFilename)
      
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      
      link.click()
      document.body.removeChild(link)
    }
  }
}

export function convertToCSV(items:Array<object>, headers?:Array<string>) {
  var csv = '', useKeyAsHeader = false

  if(headers!==undefined) {
    if(headers.length!==0) {
      for (const header of headers) {
        csv += header + ','
      }
    }
    else {
      let item = items[0]
      item = serialize(item)
      for (const key in item)
        if (item.hasOwnProperty(key))
          csv += key + ','
    }
    csv += '\r\n'
  }

  for (let item of items){
    item = serialize(item)
    for (const key in item) {
      if (item.hasOwnProperty(key)) {
        item[key].toString().replace(/,/g, ' ')
        csv += item[key] + ','
      }
    }
    csv += '\r\n'
  }

  return csv
}
