import api from "../../api";
import { authHeader } from "../../service";

// Raw Stock Billings
export const getAllRawItemBillings =
  (
    pageNumber = null,
    pageSize = null,
    pageMode = "",
    FromDate = null,
    ToDate = null
  ) =>
  async (dispatch) => {
    try {
      const response = await api.get("/Stock/GetAllRawItemBillings", {
        headers: authHeader(),
        params: {
          pageNumber,
          pageSize,
          pageMode,
          FromDate,
          ToDate,
        },
      });

      dispatch({ type: "GET_ALL_RAW_ITEM_BILLINGS", payload: response.data });
    } catch (error) {
      throw error.request.status;
    }
  };

export const getSingleRawItemBilling = (id) => async (dispatch) => {
  try {
    const response = await api.get(`/Stock/GetRawItemBilling/${id}`, {
      headers: authHeader(),
    });

    dispatch({ type: "GET_SINGLE_RAW_ITEM_BILLINGS", payload: response.data });
  } catch (error) {
    throw error.request.status;
  }
};

// Raw Item Stock for central kitchen
export const getAllRawItems =
  (pageNumber = null, pageSize = null) =>
  async (dispatch) => {
    try {
      const response = await api.get("/Stock/GetAllRawStocks", {
        headers: authHeader(),
        params: { pageNumber, pageSize },
      });

      dispatch({ type: "GET_ALL_RAW_ITEMS", payload: response.data });
    } catch (error) {
      throw error.request.status;
    }
  };

export const addRawStock = (values) => async (dispatch) => {
  try {
    const response = await api.post("/Stock/RawStockIn", values, {
      headers: { "Content-Type": "application/json", ...authHeader() },
    });

    dispatch({ type: "ADD_RAW_STOCK", payload: response.data });
  } catch (error) {
    throw error;
  }
};

export const availableRawStock = (RawItemId, Quantity) => async (dispatch) => {
  try {
    const response = await api.get("/Stock/GetRawItemStockValidation", {
      params: { RawItemId, Quantity: Quantity || 0 }, //preventing Quantity=null i.e ?Quantity=
      headers: authHeader(),
    });

    dispatch({ type: "AVAILABLE_RAW_STOCK", payload: response.data });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Finished Item Stock for central kitchen
export const getAllFinishedItems =
  (pageNumber = null, pageSize = null) =>
  async (dispatch) => {
    try {
      const response = await api.get("/Stock/GetAllByProducts", {
        headers: authHeader(),
        params: { pageNumber, pageSize },
      });

      dispatch({ type: "GET_ALL_FINISHED_ITEMS", payload: response.data });
    } catch (error) {
      throw error.request.status;
    }
  };

export const addfinishedItemStocks = (values) => async (dispatch) => {
  try {
    const response = await api.post("/Stock/ByProductStockIn", values, {
      headers: { "Content-Type": "application/json", ...authHeader() },
    });

    dispatch({ type: "ADD_FINISHED_STOCK", payload: response.data });
  } catch (error) {
    throw error;
  }
};

export const availableByProductStock =
  (ByProductItemId, Quantity) => async (dispatch) => {
    try {
      const response = await api.get("/Stock/GetByProductStockValidation", {
        params: { ByProductItemId, Quantity: Quantity || 0 }, //preventing Quantity=null i.e ?Quantity=
        headers: authHeader(),
      });

      dispatch({ type: "AVAILABLE_BYPRODUCT_STOCK", payload: response.data });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

// Inventory for Outlet
export const getOutletInventory =
  (id, pageNumber = null, pageSize = null) =>
  async (dispatch) => {
    try {
      const response = await api.get("/OutletStock/GetAllOutetStockDetails", {
        params: { OutletId: id, pageNumber, pageSize },
        headers: authHeader(),
      });

      dispatch({ type: "GET_OUTLET_INVENTORY", payload: response.data });
    } catch (error) {
      throw error.request.status;
    }
  };

// Bad Stock
export const getAllBadStock =
  (StockType = null, ItemType = null, pageNumber = null, pageSize = null) =>
  async (dispatch) => {
    try {
      const response = await api.get("/BadStock/GetAllBadStock", {
        headers: authHeader(),
        params: { StockType, ItemType, pageNumber, pageSize },
      });

      dispatch({ type: "GET_ALL_BAD_STOCK", payload: response.data });
    } catch (error) {
      throw error.request.status;
    }
  };

export const getAllBadStockSummary = () => async (dispatch) => {
  try {
    const response = await api.get("/BadStock/GetBadstockTotalSumDetails", {
      headers: authHeader(),
    });

    dispatch({ type: "GET_ALL_BAD_STOCK_SUMMARY", payload: response.data });
  } catch (error) {
    throw error.request.status;
  }
};

export const addBadStock = (values) => async (dispatch) => {
  try {
    const response = await api.post("/BadStock/AddNewBadStock", values, {
      headers: { "Content-type": "application/json", ...authHeader() },
    });

    dispatch({ type: "ADD_BAD_STOCK", payload: response.data });
  } catch (error) {
    throw error.request.status;
  }
};

// Bad Stock Validation
export const availableRawStockWithinBatch =
  (StockId, Quantity) => async (dispatch) => {
    try {
      const response = await api.get(
        "/BadStock/GetRawItemStockWithInBatchValidation",
        {
          params: { StockId, Quantity: Quantity || 0 }, //preventing Quantity=null i.e ?Quantity=
          headers: authHeader(),
        }
      );

      dispatch({ type: "AVAILABLE_RAW_STOCK_BATCH", payload: response.data });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export const availableByProductStockWithinBatch =
  (StockId, Quantity) => async (dispatch) => {
    try {
      const response = await api.get(
        "/BadStock/GetByProductStockWithInBatchValidation",
        {
          params: { StockId, Quantity: Quantity || 0 }, //preventing Quantity=null i.e ?Quantity=
          headers: authHeader(),
        }
      );

      dispatch({
        type: "AVAILABLE_BYPRODUCT_STOCK_BATCH",
        payload: response.data,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
