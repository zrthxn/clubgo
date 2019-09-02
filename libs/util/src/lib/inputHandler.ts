export function handleChangeById(event, state) {
  let payload = null, _data = state.data

  switch (event.target.type) {
    case 'checkbox':
      payload = event.target.checked
      break

    case 'text':
      if(event.target.value!=='')
        payload = event.target.value
      break
  
    default:
      payload = event.target.value
      break
  }

  if(event.target.id.includes('/')) {
    if(event.target.id.split('/')[0].includes('#')) {
      let parentKey = event.target.id.split('/')[0].split('#')[0]
      let index = parseInt(event.target.id.split('/')[0].split('#')[1], 10)
      let childKey = event.target.id.split('/')[1]
      _data[parentKey][index][childKey] = payload
    }
    else {
      let parentKey = event.target.id.split('/')[0]
      let childKey = event.target.id.split('/')[1]
      _data[parentKey][childKey] = payload
    }
  }
  else
    _data[event.target.id] = payload
  
  return ({
    data: _data
  })
}

export function verifyRequirements(event, state) {
  const { iterableMembers } = state
  let payload = null, truth = true
  
  if(state.required.length!==0) {
    for(let field of state.required) {
      if(field.includes('/')) {
        let parentKey = field.split('/')[0]
        let childKey = field.split('/')[1]

        if(field[0].includes('#')) {
          parentKey = parentKey.split('#')[0]
          let requiredIndex = parseInt(parentKey.split('#')[1], 10)

          if(iterableMembers.length!==0)
            for(let itratedKey of iterableMembers)
              if(itratedKey===parentKey)
                for(let [memberIndex, iteratedMember] of state.data[itratedKey].entries())
                  if(memberIndex===requiredIndex)
                    if(iteratedMember[childKey]===null || (event.target.id.split('/')[1]===field[1] && payload===null))
                      truth = false
        }
        else {
          if(state.data[parentKey][childKey]===null || (event.target.id.split('/')[1]===childKey && payload===null))
            truth = false
        }
      }
      else
        if(state.data[field]===null || (event.target.id===field && payload===null))
          truth = false
    }
  }
  else
    truth = true

  return ({
    requiredFulfilled: truth
  })
}