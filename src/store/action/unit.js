import api from "../../api";
import { authHeader } from "../../service";

export const addUnit = (values) => async (dispatch) => {
  try {
    const response = await api.post("/Item/AddNewUnit", values, {
      headers: { "Content-Type": "application/json", ...authHeader() },
    });

    dispatch({ type: "ADD_UNIT", payload: response.data });
  } catch (error) {
    throw error.request.status;
  }
};

export const getAllUnits =
  (pageNumber = null, pageSize = null) =>
  async (dispatch) => {
    try {
      const response = await api.get("/Item/GetAllUnits", {
        headers: authHeader(),
        params: {
          pageNumber,
          pageSize,
        },
      });

      dispatch({ type: "GET_ALL_UNITS", payload: response.data });
    } catch (error) {
      throw error.request.status;
    }
  };
