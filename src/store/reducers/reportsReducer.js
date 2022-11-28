export const reportsReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_SALES_REPORT":
      return action.payload;
    case "GET_BYPRODUCT_ITEMWISE_REPORT":
      return action.payload;
    default:
      return state;
  }
};
