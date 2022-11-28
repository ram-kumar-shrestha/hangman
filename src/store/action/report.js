import api from "../../api";
import { authHeader } from "../../service";

export const getSalesReport =
  (outletId = null, fromDate = null, toDate = null) =>
  async (dispatch) => {
    try {
      const response = await api.get("/Report/GetSalesReport", {
        params: { outletId, fromDate, toDate },
        headers: authHeader(),
      });

      dispatch({ type: "GET_SALES_REPORT", payload: response.data });
    } catch (error) {
      throw error.response;
    }
  };

export const getByproductItemWiseReport =
  (byProductItemId = null, fromDate = null, toDate = null) =>
  async (dispatch) => {
    try {
      const response = await api.get("/Report/GetFinishedItemReport", {
        params: { byProductItemId, fromDate, toDate },
        headers: authHeader(),
      });

      dispatch({
        type: "GET_BYPRODUCT_ITEMWISE_REPORT",
        payload: response.data,
      });
    } catch (error) {
      throw error.response;
    }
  };
