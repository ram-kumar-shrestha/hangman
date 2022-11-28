export const advancedOutletFilterReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_SINGLE_OUTLET_SUMMARY_DETAILS':
      return action.payload
    default:
      return state
  }
}

export const advancedItemsFilterReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_ITEMS_SUMMARY_DETAILS':
      return action.payload
    default:
      return state
  }
}
