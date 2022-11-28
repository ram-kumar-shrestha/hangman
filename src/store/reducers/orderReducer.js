export const orderReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ALL_ORDERS":
      return action.payload;

    case "GET_OUTLET_ORDERS":
      return action.payload;

    case "GET_ALL_PENDING_ORDERS":
      return action.payload;

    case "GET_ALL_APPROVED_ORDERS":
      return action.payload;

    case "GET_ALL_REJECTED_ORDERS":
      return action.payload;

    case "GET_ALL_INCOMPLETE_ORDERS":
      return action.payload;

    case "GET_OUTLET_PENDING_ORDERS":
      return action.payload;

    case "GET_OUTLET_APPROVED_ORDERS":
      return action.payload;

    case "GET_OUTLET_REJECTED_ORDERS":
      return action.payload;

    case "GET_OUTLET_INCOMPLETE_ORDERS":
      return action.payload;

    default:
      return state;
  }
};

export const singleOrderReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_SINGLE_OUTLET_ORDER":
      return action.payload;

    case "COMPLETE_INCOMPLETE_ORDER":
      return action.payload;

    case "OPPOSE_INCOMPLETE_ORDER":
      return action.payload;

    case "REQUEST_ORDER":
      return action.payload;

    case "PREPARE_ORDER":
      return action.payload;

    case "REJECT_ORDER":
      return action.payload;

    case "EDIT_ORDER":
      return action.payload;

    case "APPROVE_ORDER":
      return action.payload;

    case "APPROVE_INCOMPLETE_ORDER":
      return action.payload;

    default:
      return state;
  }
};

export const singleIncompleteOrderReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_SINGLE_INCOMPLETE_ORDER":
      return action.payload;

    default:
      return state;
  }
};

export const allOrderBillsReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ALL_ORDER_BILLINGS":
      return action.payload;

    default:
      return state;
  }
};

export const singleOrderBillsReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_SINGLE_ORDER_BILLINGS":
      return action.payload;

    case "TOGGLE_BILLINGS_STATUS":
      return action.payload;

    default:
      return state;
  }
};
