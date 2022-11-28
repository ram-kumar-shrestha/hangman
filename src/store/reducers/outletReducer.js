export const outletReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ALL_OUTLETS":
      return action.payload;
    case "ADD_OUTLET":
      return action.payload;

    case "EDIT_OUTLET":
      return action.payload;
    case "DELETE_OUTLET":
      return action.payload;

    default:
      return state;
  }
};

export const toggleOutletReducer = (state = [], action) => {
  switch (action.type) {
    case "TOGGLE_BLOCKED_STATUS":
      return action.payload;
    case "TOGGLE_OUTLET_ACTIVE_STATUS":
      return action.payload;

    default:
      return state;
  }
};

export const singleOutletReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_SINGLE_OUTLET":
      return action.payload;

    default:
      return state;
  }
};
