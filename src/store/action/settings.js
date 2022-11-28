import api from "../../api";
import { authHeader } from "../../service";

export const getSetting = () => async (dispatch) => {
  try {
    const response = await api.get("/Setting/GetSetting", {
      headers: authHeader(),
    });

    dispatch({ type: "GET_SETTINGS", payload: response.data });
  } catch (error) {
    throw error.request.status;
  }
};

export const updateBlockSetting = (id, limit) => async (dispatch) => {
  try {
    const response = await api.patch(
      `/Setting/EditSetting/${id}`,
      { settingId: id, orderLimit: limit },
      {
        headers: authHeader(),
      }
    );

    dispatch({ type: "UPDATE_BLOCK_SETTINGS", payload: response.data });
  } catch (error) {
    throw error.request.status;
  }
};

export const updateOrderTime = (id, value) => async (dispatch) => {
  try {
    const response = await api.patch(
      `/Setting/EditOrderTimeSetting/${id}`,
      value,
      {
        headers: authHeader(),
      }
    );

    dispatch({ type: "UPDATE_ORDER_TIME_SETTINGS", payload: response.data });
  } catch (error) {
    throw error.request.status;
  }
};

export const getOrderTime = (id, value) => async (dispatch) => {
  try {
    const response = await api.get(`/Setting/CheckOrderTime/${id}`, {
      headers: authHeader(),
    });

    dispatch({ type: "GET_ORDER_TIME_SETTINGS", payload: response.data });
  } catch (error) {
    throw error.request.status;
  }
};

export const updateMinRawStockSetting = (id, limit) => async (dispatch) => {
  try {
    const response = await api.patch(
      `/Setting/EditRawStockSetting/${id}`,
      { settingId: id, MinimumRawItemStock: limit },
      {
        headers: authHeader(),
      }
    );

    dispatch({ type: "UPDATE_MIN_RAW_STOCK_SETTINGS", payload: response.data });
  } catch (error) {
    throw error.request.status;
  }
};

export const updateMinByproductStockSetting =
  (id, limit) => async (dispatch) => {
    try {
      const response = await api.patch(
        `/Setting/EditByProductSetting/${id}`,
        { settingId: id, MinimumByProductStock: limit },
        {
          headers: authHeader(),
        }
      );

      dispatch({
        type: "UPDATE_MIN_FINISHED_STOCK_SETTINGS",
        payload: response.data,
      });
    } catch (error) {
      throw error.request.status;
    }
  };
