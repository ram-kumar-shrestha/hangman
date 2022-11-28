export const settingsReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_SETTINGS":
      return action.payload;
    case "UPDATE_BLOCK_SETTINGS":
      return action.payload;
    case "UPDATE_MIN_RAW_STOCK_SETTINGS":
      return action.payload;
    case "UPDATE_MIN_FINISHED_STOCK_SETTINGS":
      return action.payload;
    case "UPDATE_ORDER_TIME_SETTINGS":
      return action.payload;
    default:
      return state;
  }
};
export const settingsOrderTimeReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ORDER_TIME_SETTINGS":
      return action.payload;
    default:
      return state;
  }
};
