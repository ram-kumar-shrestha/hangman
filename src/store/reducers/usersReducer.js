export const usersReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ALL_USERS":
      return action.payload;
    case "GET_ALL_OUTLET_USERS":
      return action.payload;

    default:
      return state;
  }
};

export const usersStatusReducer = (state = [], action) => {
  switch (action.type) {
    case "TOGGLE_USER_STATUS":
      return action.payload;
    case "REGISTER_USER":
      return action.payload;
    case "EDIT_USER":
      return action.payload;

    default:
      return state;
  }
};

export const singleUserReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_SINGLE_USER":
      return action.payload;

    default:
      return state;
  }
};
