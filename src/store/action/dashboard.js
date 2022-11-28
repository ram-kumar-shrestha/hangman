import api from "../../api";
import { authHeader } from "../../service";

export const getDashboardData = (id) => async (dispatch) => {
  try {
    const response = await api.get("/Home/DashboardSummaryDatas", {
      params: { UserId: id },
      headers: authHeader(),
    });

    dispatch({
      type: "GET_DASHBOARD_DATA",
      payload: response.data,
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const getBlockedStatus = (id) => async (dispatch) => {
  try {
    const response = await api.get(`/Home/IsOutletBlocked/${id}`, {
      headers: authHeader(),
    });

    dispatch({
      type: "GET_BLOCKED_STATUS",
      payload: response.data,
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const getMinimumStockInfo = () => async (dispatch) => {
  try {
    const response = await api.get(
      `/Home/GetMinimumStockDetailsForEmpoweredPersonal`,
      {
        headers: authHeader(),
      }
    );

    dispatch({
      type: "GET_MINIMUM_STOCK_INFO",
      payload: response.data,
    });
  } catch (error) {
    throw new Error(error);
  }
};
