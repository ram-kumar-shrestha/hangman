export const ownerReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ALL_OWNERS":
      return action.payload;
    case "GET_SINGLE_OWNER":
      return action.payload;
    case "ADD_OWNER":
      return action.payload;
    case "EDIT_OWNER":
      return action.payload;

    default:
      return state;
  }
};

export const toggleOwnerReducer = (state = [], action) => {
  switch (action.type) {
    case "TOGGLE_OWNER_ACTIVE_STATUS":
      return action.payload;

    default:
      return state;
  }
};
