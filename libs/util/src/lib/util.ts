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