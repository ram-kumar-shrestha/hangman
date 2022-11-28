export const rawItemReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_ALL_ITEMS':
      return action.payload

    case 'DELETE_ITEM':
      return action.payload

    default:
      return state
  }
}

export const byProductItemReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_ALL_BYPRODUCTS':
      return action.payload

    case 'DELETE_BYPRODUCT':
      return action.payload

    default:
      return state
  }
}

export const singleRawItemReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_BYPRODUCTS':
      return action.payload
    case 'EDIT_BYPRODUCT':
      return action.payload
    case 'GET_SINGLE_ITEM':
      return action.payload

    default:
      return state
  }
}

export const singleByProductItemReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_BYPRODUCTS':
      return action.payload
    case 'EDIT_BYPRODUCT':
      return action.payload
    case 'GET_SINGLE_BYPRODUCT':
      return action.payload

    default:
      return state
  }
}
