import api from "../../api";
import { authHeader } from "../../service";

export const getAllOrders = () => async (dispatch) => {
  try {
    const response = await api.get("/OutletOrder/GetOutletOrders", {
      headers: authHeader(),
    });

    dispatch({ type: "GET_ALL_ORDERS", payload: response.data });
  } catch (error) {
    throw error.request.status;
  }
};

export const requestOrder = (values) => async (dispatch) => {
  try {
    const response = await api.post("/OutletOrder/AddNewOutletOrder", values, {
      headers: {
        ...authHeader(),
        "Content-type": "application/json",
      },
    });

    dispatch({ type: "REQUEST_ORDER", payload: response.data });
  } catch (error) {
    throw error.request.status;
  }
};

export const getOutletOrders =
  (
    pageMode = "",
    id = null,
    date = null,
    status = null,
    pageNumber = null,
    pageSize = null
  ) =>
  async (dispatch) => {
    try {
      const response = await api.get("/OutletOrder/GetOutletOrders", {
        params: {
          PageMode: pageMode,
          OutletId: id,
          FilterDate: date,
          Status: status,
          pageNumber,
          pageSize,
        },
        headers: authHeader(),
      });

      dispatch({ type: "GET_OUTLET_ORDERS", payload: response.data });
    } catch (error) {
      throw error.request.status;
    }
  };

export const getSingleOutletOrder = (id) => async (dispatch) => {
  try {
    const response = await api.get(`/OutletOrder/GetOutletOrder/${id}`, {
      headers: authHeader(),
    });

    dispatch({ type: "GET_SINGLE_OUTLET_ORDER", payload: response.data });
  } catch (error) {
    throw error.request.status;
  }
};

export const getSingleIncompleteOutletOrder = (id) => async (dispatch) => {
  try {
    const response = await api.get(
      `/OutletOrder/GetIncompleteOrderById/${id}`,
      {
        headers: authHeader(),
      }
    );

    dispatch({ type: "GET_SINGLE_INCOMPLETE_ORDER", payload: response.data });
  } catch (error) {
    throw error.request.status;
  }
};

export const completeIncompleteOutletOrder = (id) => async (dispatch) => {
  try {
    const response = await api.patch(
      `/OutletOrder/ApproveOrderPartially/${id}`,
      null,
      {
        headers: authHeader(),
      }
    );

    dispatch({ type: "COMPLETE_INCOMPLETE_ORDER", payload: response.data });
  } catch (error) {
    throw error.request.status;
  }
};

export const opposeIncompleteOutletOrder = (id) => async (dispatch) => {
  try {
    const response = await api.patch(
      `/OutletOrder/ApproveOrderOpposeToRequest/${id}`,
      null,
      {
        headers: authHeader(),
      }
    );

    dispatch({ type: "OPPOSE_INCOMPLETE_ORDER", payload: response.data });
  } catch (error) {
    throw error.request.status;
  }
};

export const getAllPendingOrders = () => async (dispatch) => {
  try {
    const response = await api.get("/OutletOrder/GetPendingOutletOrders", {
      headers: authHeader(),
    });

    dispatch({ type: "GET_ALL_PENDING_ORDERS", payload: response.data });
  } catch (error) {
    throw error.request.status;
  }
};

export const getAllApprovedOrders = () => async (dispatch) => {
  try {
    const response = await api.get("/OutletOrder/GetApprovedOutletOrders", {
      headers: authHeader(),
    });

    dispatch({ type: "GET_ALL_APPROVED_ORDERS", payload: response.data });
  } catch (error) {
    throw error.request.status;
  }
};

export const getAllRejectedOrders = () => async (dispatch) => {
  try {
    const response = await api.get("/OutletOrder/GetRejectedOutletOrders", {
      headers: authHeader(),
    });

    dispatch({ type: "GET_ALL_REJECTED_ORDERS", payload: response.data });
  } catch (error) {
    throw error.request.status;
  }
};

export const getAllIncompleteOrders = () => async (dispatch) => {
  try {
    const response = await api.get("/OutletOrder/GetInCompleteOutletOrders", {
      headers: authHeader(),
    });

    dispatch({ type: "GET_ALL_INCOMPLETE_ORDERS", payload: response.data });
  } catch (error) {
    throw error.request.status;
  }
};

export const getAllOutletPendingOrders = (id) => async (dispatch) => {
  try {
    const response = await api.get("/OutletOrder/GetPendingOutletOrders", {
      params: { OutletId: id },
      headers: authHeader(),
    });

    dispatch({ type: "GET_OUTLET_PENDING_ORDERS", payload: response.data });
  } catch (error) {
    throw error.request.status;
  }
};

export const getAllOutletApprovedOrders = (id) => async (dispatch) => {
  try {
    const response = await api.get(
      "/OutletOrder/GetApprovedOutletOrders",

      { params: { OutletId: id }, headers: authHeader() }
    );

    dispatch({ type: "GET_OUTLET_APPROVED_ORDERS", payload: response.data });
  } catch (error) {
    throw error.request.status;
  }
};

export const getAllOutletRejectedOrders = (id) => async (dispatch) => {
  try {
    const response = await api.get("/OutletOrder/GetRejectedOutletOrders", {
      params: { OutletId: id },
      headers: authHeader(),
    });

    dispatch({ type: "GET_OUTLET_REJECTED_ORDERS", payload: response.data });
  } catch (error) {
    throw error.request.status;
  }
};

export const getAllOutletIncompleteOrders = (id) => async (dispatch) => {
  try {
    const response = await api.get("/OutletOrder/GetInCompleteOutletOrders", {
      params: { OutletId: id },
      headers: authHeader(),
    });

    dispatch({ type: "GET_OUTLET_INCOMPLETE_ORDERS", payload: response.data });
  } catch (error) {
    throw error.request.status;
  }
};

export const approveOrder = (id, values) => async (dispatch) => {
  try {
    const response = await api.patch(
      `/OutletOrder/ApproveOutletOrder/${id}`,
      values,
      {
        headers: {
          ...authHeader(),
          "Content-type": "application/json",
        },
      }
    );

    dispatch({ type: "APPROVE_ORDER", payload: response.data });
  } catch (error) {
    throw error.request.status;
  }
};

export const approveIncompleteOrder = (id, values) => async (dispatch) => {
  try {
    const response = await api.patch(
      `/OutletOrder/ApproveIncompleteOutletOrder/${id}`,
      values,
      {
        headers: {
          ...authHeader(),
          "Content-type": "application/json",
        },
      }
    );

    dispatch({ type: "APPROVE_INCOMPLETE_ORDER", payload: response.data });
  } catch (error) {
    throw error.request.status;
  }
};

export const rejectOrder = (id, values) => async (dispatch) => {
  try {
    const response = await api.patch(
      `/OutletOrder/RejectOutletOrder/${id}`,
      values,
      {
        headers: {
          ...authHeader(),
          "Content-type": "application/json",
        },
      }
    );

    dispatch({ type: "REJECT_ORDER", payload: response.data });
  } catch (error) {
    throw error.request.status;
  }
};

export const editOrder = (id, values) => async (dispatch) => {
  try {
    const response = await api.patch(
      `/OutletOrder/EditOutletOrder/${id}`,
      values,
      {
        headers: {
          ...authHeader(),
          "Content-type": "application/json",
        },
      }
    );

    dispatch({ type: "EDIT_ORDER", payload: response.data });
  } catch (error) {
    throw error.request.status;
  }
};

export const prepareOrder = (id) => async (dispatch) => {
  try {
    const response = await api.patch(
      `/OutletOrder/PrepareOutletOrder/${id}`,
      null,
      {
        headers: {
          ...authHeader(),
          "Content-type": "application/json",
        },
      }
    );

    dispatch({ type: "PREPARE_ORDER", payload: response.data });
  } catch (error) {
    throw error.request.status;
  }
};

// Order Billings
export const getAllOrderBills =
  (
    id = null,
    FilterDate = null,
    Status = null,
    pageNumber = null,
    pageSize = null,
    pageMode = "",
    FromDate = null,
    ToDate = null
  ) =>
  async (dispatch) => {
    try {
      const response = await api.get(`/Stock/GetAllByProductItemBillings`, {
        headers: authHeader(),
        params: {
          OutletId: id,
          FilterDate,
          Status,
          pageNumber,
          pageSize,
          pageMode,
          FromDate,
          ToDate,
        },
      });

      dispatch({ type: "GET_ALL_ORDER_BILLINGS", payload: response.data });
    } catch (error) {
      throw error.request.status;
    }
  };

export const getSingleOrderBill = (id) => async (dispatch) => {
  try {
    const response = await api.get(`/Stock/GetByProductItemBilling/${id}`, {
      headers: authHeader(),
    });

    dispatch({ type: "GET_SINGLE_ORDER_BILLINGS", payload: response.data });
    return response.data;
  } catch (error) {
    throw error.request.status;
  }
};

export const toggleBillingStatus = (id) => async (dispatch) => {
  try {
    const response = await api.patch(`/Stock/ClearBillingById/${id}`, null, {
      headers: authHeader(),
    });

    dispatch({ type: "TOGGLE_BILLINGS_STATUS", payload: response.data });
  } catch (error) {
    throw error.request.status;
  }
};
