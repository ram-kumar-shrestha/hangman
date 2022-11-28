export const dashboardReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_DASHBOARD_DATA":
      return action.payload;

    default:
      return state;
  }
};

export const blockStatusReducer = (state = false, action) => {
  switch (action.type) {
    case "GET_BLOCKED_STATUS":
      return action.payload;

    default:
      return state;
  }
};
export const minimumStockInfoReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_MINIMUM_STOCK_INFO":
      return action.payload;

    default:
      return state;
  }
};
