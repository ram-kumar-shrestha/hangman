import api from "../../api";
import { authHeader } from "../../service";

export const getAllUsers =
  (pageNumber = null, pageSize = null) =>
  async (dispatch) => {
    try {
      const response = await api.get("/Authenticate/GetAllUsers", {
        headers: authHeader(),
        params: { pageNumber, pageSize },
      });

      dispatch({
        type: "GET_ALL_USERS",
        payload: response.data,
      });
    } catch (error) {
      throw new Error(error);
    }
  };

export const getAllOutletUsers =
  (id, pageNumber = null, pageSize = null) =>
  async (dispatch) => {
    try {
      const response = await api.get("/Authenticate/GetAllUsers", {
        params: { OutletId: id, pageNumber, pageSize },
        headers: authHeader(),
      });

      dispatch({
        type: "GET_ALL_OUTLET_USERS",
        payload: response.data,
      });
    } catch (error) {
      throw new Error(error);
    }
  };

export const toggleUserStatus = (id) => async (dispatch) => {
  try {
    const response = await api.patch(
      `/Authenticate/ToggleUserStatus/${id}`,
      null,
      {
        headers: authHeader(),
      }
    );

    dispatch({
      type: "TOGGLE_USER_STATUS",
      payload: response.data,
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const getSingleUser = (id) => async (dispatch) => {
  try {
    const response = await api.get(`/Authenticate/GetUser/${id}`, {
      headers: authHeader(),
    });

    dispatch({
      type: "GET_SINGLE_USER",
      payload: response.data,
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const getSingleUserByUserName = (username) => async (dispatch) => {
  try {
    const response = await api.get(
      `/Authenticate/GetUserByUsername/${username}`,
      {
        headers: authHeader(),
      }
    );

    dispatch({
      type: "GET_SINGLE_USER",
      payload: response.data,
    });

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const registerUser = (values) => async (dispatch) => {
  try {
    const response = await api.post(`/authenticate/register`, values, {
      headers: { ...authHeader(), "Content-type": "Application/json" },
    });

    dispatch({
      type: "REGISTER_USER",
      payload: response.data,
    });
  } catch (error) {
    throw error.response;
  }
};

export const editUser = (id, values) => async (dispatch) => {
  try {
    const response = await api.patch(`/Authenticate/EditUser/${id}`, values, {
      headers: { ...authHeader(), "Content-type": "Application/json" },
    });

    dispatch({
      type: "EDIT_USER",
      payload: response.data,
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const editPassword = (id, values) => async (dispatch) => {
  try {
    const response = await api.patch(
      `/Authenticate/EditUserPassword/${id}`,
      values,
      {
        headers: { ...authHeader(), "Content-type": "Application/json" },
      }
    );

    dispatch({
      type: "EDIT_USER",
      payload: response.data,
    });
  } catch (error) {
    throw new Error(error);
  }
};
