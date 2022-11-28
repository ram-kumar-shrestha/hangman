import api from "../../api";
import { authHeader } from "../../service";

// APIS for Raw Items
export const addItem = (values) => async (dispatch) => {
  try {
    const response = await api.post("/Item/CreateItem", values, {
      headers: { "Content-Type": "application/json", ...authHeader() },
    });

    dispatch({ type: "ADD_ITEM", payload: response.data });
  } catch (error) {
    throw error.response.data.message;
  }
};

export const getAllItems =
  (pageNumber = null, pageSize = null) =>
  async (dispatch) => {
    try {
      const response = await api.get("/Item/GetItems", {
        params: { pageNumber, pageSize },
        headers: authHeader(),
      });

      dispatch({ type: "GET_ALL_ITEMS", payload: response.data });
    } catch (error) {
      throw error.request.status;
    }
  };

export const getSingleItem = (id) => async (dispatch) => {
  try {
    const response = await api.get(`/Item/GetItem/${id}`, {
      headers: authHeader(),
    });

    dispatch({ type: "GET_SINGLE_ITEM", payload: response.data });
  } catch (error) {
    throw error.request.status;
  }
};

export const editItem = (id, values) => async (dispatch) => {
  try {
    const response = await api.patch(`/Item/EditItem/${id}`, values, {
      headers: { "Content-Type": "application/json", ...authHeader() },
    });

    dispatch({ type: "EDIT_ITEM", payload: response.data });
  } catch (error) {
    throw error.request.status;
  }
};
export const deleteItem = (id) => async (dispatch) => {
  try {
    const response = await api.delete(`/Item/DeleteItem/${id}`, {
      headers: { "Content-Type": "application/json", ...authHeader() },
    });

    dispatch({ type: "DELETE_ITEM", payload: response.data });
  } catch (error) {
    throw error.response;
  }
};

// APIS for Finished Items
export const addByproduct = (values) => async (dispatch) => {
  try {
    const response = await api.post("/Item/CreateByProductItem", values, {
      headers: { "Content-Type": "application/json", ...authHeader() },
    });

    dispatch({ type: "ADD_BYPRODUCTS", payload: response.data });
  } catch (error) {
    throw error.response.data.message;
  }
};

export const getAllByproducts =
  (pageNumber = null, pageSize = null) =>
  async (dispatch) => {
    try {
      const response = await api.get("/Item/GetByProducts", {
        params: { pageNumber, pageSize },
        headers: authHeader(),
      });

      dispatch({ type: "GET_ALL_BYPRODUCTS", payload: response.data });
    } catch (error) {
      throw error.request.status;
    }
  };

export const getSingleByproduct = (id) => async (dispatch) => {
  try {
    const response = await api.get(`/Item/GetByProduct/${id}`, {
      headers: authHeader(),
    });

    dispatch({ type: "GET_SINGLE_BYPRODUCT", payload: response.data });
  } catch (error) {
    throw error.request.status;
  }
};

export const editByproduct = (id, values) => async (dispatch) => {
  try {
    const response = await api.patch(`/Item/EditByProductItem/${id}`, values, {
      headers: { "Content-Type": "application/json", ...authHeader() },
    });

    dispatch({ type: "EDIT_BYPRODUCT", payload: response.data });
  } catch (error) {
    throw error.request.status;
  }
};

export const deleteByproduct = (id) => async (dispatch) => {
  try {
    const response = await api.delete(`/Item/DeleteByProductItem/${id}`, {
      headers: { "Content-Type": "application/json", ...authHeader() },
    });

    dispatch({ type: "DELETE_BYPRODUCT", payload: response.data });
  } catch (error) {
    throw error.response;
  }
};
