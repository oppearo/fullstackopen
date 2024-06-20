const filterReducer = (state = 'ALL', action) => {
  console.log('ACTION: ', action)
  switch (action.type) {
    case 'SET_FILTER':
      return action.payload
    case 'ALL':
    default:
      return state
  }
}

export const filterChange = content => {
  return {
    type: 'SET_FILTER',
    payload: content,
  }
}


export default filterReducer