export const rawStockReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ALL_RAW_ITEMS":
      return action.payload;

    default:
      return state;
  }
};

export const rawStockBillingReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ALL_RAW_ITEM_BILLINGS":
      return action.payload;

    default:
      return state;
  }
};

export const singleRawStockReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_RAW_STOCK":
      return action.payload;

    case "GET_SINGLE_RAW_ITEM_BILLINGS":
      return action.payload;

    default:
      return state;
  }
};

export const finishedItemStocksReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ALL_FINISHED_ITEMS":
      return action.payload;

    case "GET_OUTLET_INVENTORY":
      return action.payload;

    default:
      return state;
  }
};

export const singleFinishedItemStockReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_FINISHED_STOCK":
      return action.payload;
    default:
      return state;
  }
};

export const stockInfoReducer = (state = [], action) => {
  switch (action.type) {
    case "AVAILABLE_RAW_STOCK":
      return action.payload;

    case "AVAILABLE_BYPRODUCT_STOCK":
      return action.payload;
    default:
      return state;
  }
};

export const badStockReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ALL_BAD_STOCK":
      return action.payload;

    default:
      return state;
  }
};

export const singleBadStockReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_BAD_STOCK":
      return action.payload;

    default:
      return state;
  }
};
export const badStockSummaryReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ALL_BAD_STOCK_SUMMARY":
      return action.payload;

    default:
      return state;
  }
};
