import api from "../../api";
import { authHeader } from "../../service";

export const getAllOutlets = (pageNumber, pageSize) => async (dispatch) => {
  try {
    const response = await api.get("/Outlet/GetOutlets", {
      headers: authHeader(),
      params: { pageNumber, pageSize },
    });

    dispatch({
      type: "GET_ALL_OUTLETS",
      payload: response.data,
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const addOutlet = (values) => async (dispatch) => {
  try {
    const response = await api.post("/Outlet/CreateOutlet", values, {
      headers: { ...authHeader(), "Content-type": "Application/json" },
    });

    dispatch({
      type: "ADD_OUTLET",
      payload: response.data,
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const getSingleOutlet = (id) => async (dispatch) => {
  try {
    const response = await api.get(`/Outlet/GetOutlet/${id}`, {
      headers: authHeader(),
    });

    dispatch({
      type: "GET_SINGLE_OUTLET",
      payload: response.data,
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const editOutlet = (id, values) => async (dispatch) => {
  try {
    const response = await api.patch(`/Outlet/EditOutlet/${id}`, values, {
      headers: { ...authHeader(), "Content-type": "Application/json" },
    });

    dispatch({
      type: "EDIT_OUTLET",
      payload: response.data,
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteOutlet = (id) => async (dispatch) => {
  try {
    const response = await api.delete(`Outlet/DeleteOutlet/${id}`, {
      headers: {
        ...authHeader(),
        "Content-type": "application/json",
      },
    });

    dispatch({
      type: "DELETE_OUTLET",
      payload: response.data,
    });
  } catch (error) {
    throw error.response;
  }
};

export const toggleBlockedStatus = (id) => async (dispatch) => {
  try {
    const response = await api.patch(
      `/Outlet/ChangeOutletBlockStatus/${id}`,
      null,
      {
        headers: authHeader(),
      }
    );

    dispatch({ type: "TOGGLE_BLOCKED_STATUS", payload: response.data });
  } catch (error) {
    throw error.request.status;
  }
};

export const toogleOutletActiveStatus = (id) => async (dispatch) => {
  try {
    const response = await api.patch(`/Outlet/ChangeOutletStatus/${id}`, null, {
      headers: authHeader(),
    });

    dispatch({ type: "TOGGLE_OUTLET_ACTIVE_STATUS", payload: response.data });
  } catch (error) {
    throw error.request.status;
  }
};
