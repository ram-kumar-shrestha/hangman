import api from "../../api";
import { authHeader } from "../../service";

export const getAllOwners =
  (pageNumber = null, pageSize = null) =>
  async (dispatch) => {
    try {
      const response = await api.get("/Outlet/GetOwnerDetails", {
        headers: authHeader(),
        params: { pageNumber, pageSize },
      });

      dispatch({
        type: "GET_ALL_OWNERS",
        payload: response.data,
      });
    } catch (error) {
      throw new Error(error);
    }
  };

export const addOwner = (ownerData) => async (dispatch) => {
  let formData = new FormData();

  Object.keys(ownerData).forEach((key) => {
    formData.append(key, ownerData[key]);
  });

  // console.table(formData)
  try {
    const response = await api.post("/Outlet/AddOwnerDetail", formData, {
      headers: { "Content-Type": "multipart/form-data", ...authHeader() },
    });
    dispatch({
      type: "ADD_OWNER",
      payload: response.data,
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const toggleOwnerActiveStatus = (id) => async (dispatch) => {
  try {
    const response = await api.patch(`/Outlet/ChangeOwnerStatus/${id}`, null, {
      headers: authHeader(),
    });

    dispatch({ type: "TOGGLE_OWNER_ACTIVE_STATUS", payload: response.data });
  } catch (error) {
    throw error.request.status;
  }
};

export const getSingleOwner = (id) => async (dispatch) => {
  try {
    const response = await api.get(`/Outlet/GetOwnerDetail/${id}`, {
      headers: authHeader(),
    });
    dispatch({
      type: "GET_SINGLE_OWNER",
      payload: response.data,
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const editOwner = (id, values) => async (dispatch) => {
  let formData = new FormData();

  Object.keys(values).forEach((key) => {
    formData.append(key, values[key]);
  });

  try {
    const response = await api.patch(
      `/Outlet/EditOwnerDetail/${id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data", ...authHeader() },
      }
    );
    dispatch({
      type: "EDIT_OWNER",
      payload: response.data,
    });
  } catch (error) {
    throw new Error(error);
  }
};
