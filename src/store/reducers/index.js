import { combineReducers } from "redux";

import { authReducer } from "./authReducer";
import { ownerReducer, toggleOwnerReducer } from "./ownerReducer";
import {
  outletReducer,
  toggleOutletReducer,
  singleOutletReducer,
} from "./outletReducer";

import {
  allOrderBillsReducer,
  orderReducer,
  singleIncompleteOrderReducer,
  singleOrderBillsReducer,
  singleOrderReducer,
} from "./orderReducer";

import {
  byProductItemReducer,
  rawItemReducer,
  singleByProductItemReducer,
  singleRawItemReducer,
} from "./itemReducer";

import {
  advancedItemsFilterReducer,
  advancedOutletFilterReducer,
} from "./advancedOutletFilterReducer";

import { settingsOrderTimeReducer, settingsReducer } from "./settingsReducer";

import {
  singleUserReducer,
  usersReducer,
  usersStatusReducer,
} from "./usersReducer";

import {
  blockStatusReducer,
  dashboardReducer,
  minimumStockInfoReducer,
} from "./dashboardReducer";

import { unitReducer } from "./unitReducer";

import {
  badStockReducer,
  badStockSummaryReducer,
  finishedItemStocksReducer,
  rawStockBillingReducer,
  rawStockReducer,
  singleBadStockReducer,
  singleFinishedItemStockReducer,
  singleRawStockReducer,
  stockInfoReducer,
} from "./stockReducer";
import { dropdownReducer } from "./dropdownReducer";
import { reportsReducer } from "./reportsReducer";

export const reducers = combineReducers({
  auth: authReducer,
  owner: ownerReducer,

  outlet: outletReducer,
  singleOutlet: singleOutletReducer,

  order: orderReducer,

  rawItem: rawItemReducer,
  singleRawItem: singleRawItemReducer,

  singleByProductItem: singleByProductItemReducer,
  byProduct: byProductItemReducer,

  unit: unitReducer,

  badStock: badStockReducer,
  singleBadStock: singleBadStockReducer,
  badStockSummary: badStockSummaryReducer,

  rawStock: rawStockReducer,
  rawStockBilling: rawStockBillingReducer,
  singleRawStock: singleRawStockReducer,

  finishedItemStocks: finishedItemStocksReducer,
  singleFinishedItemStock: singleFinishedItemStockReducer,

  stockInfo: stockInfoReducer,

  outletFilter: advancedOutletFilterReducer,
  itemFilter: advancedItemsFilterReducer,

  singleOrder: singleOrderReducer,
  singleIncompleteOrder: singleIncompleteOrderReducer,

  settings: settingsReducer,
  isOrderTime: settingsOrderTimeReducer,

  outletStatus: toggleOutletReducer,
  ownerStatus: toggleOwnerReducer,

  users: usersReducer,
  singleUser: singleUserReducer,
  usersStatus: usersStatusReducer,

  dashboard: dashboardReducer,
  minStockInfo: minimumStockInfoReducer,
  blockStatus: blockStatusReducer,
  dropdown: dropdownReducer,

  allOrderBills: allOrderBillsReducer,
  singleOrderBill: singleOrderBillsReducer,

  report: reportsReducer,
});
