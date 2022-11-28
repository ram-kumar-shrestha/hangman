export const dropdownReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ALL_DROPDOWN_UNITS":
      return action.payload;
    case "GET_ALL_DROPDOWN_OWNERS":
      return action.payload;
    case "GET_ALL_DROPDOWN_OUTLETS":
      return action.payload;
    case "GET_ALL_DROPDOWN_RAW_ITEMS":
      return action.payload;
    case "GET_ALL_DROPDOWN_BYPRODUCTS":
      return action.payload;
    case "GET_ALL_DROPDOWN_RAW_STOCK":
      return action.payload;
    case "GET_ALL_DROPDOWN_BYPRODUCT_STOCK":
      return action.payload;
    default:
      return state;
  }
};
