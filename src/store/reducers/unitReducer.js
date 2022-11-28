export const unitReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_ALL_UNITS':
      return action.payload

    default:
      return state
  }
}
