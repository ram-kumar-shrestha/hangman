import api from "../../api";
import { authHeader } from "../../service";

export const getAllDropdownUnits = () => async (dispatch) => {
  try {
    const response = await api.get("/DropDown/GetAllUnits", {
      headers: authHeader(),
    });

    dispatch({ type: "GET_ALL_DROPDOWN_UNITS", payload: response.data });
  } catch (error) {
    throw error.response;
  }
};

export const getAllDropdownOwners = () => async (dispatch) => {
  try {
    const response = await api.get("/DropDown/GetOwnerDetails", {
      headers: authHeader(),
    });

    dispatch({ type: "GET_ALL_DROPDOWN_OWNERS", payload: response.data });
  } catch (error) {
    throw error.response;
  }
};

export const getAllDropdownOutlets = () => async (dispatch) => {
  try {
    const response = await api.get("/DropDown/GetOutlets", {
      headers: authHeader(),
    });

    dispatch({ type: "GET_ALL_DROPDOWN_OUTLETS", payload: response.data });
  } catch (error) {
    throw error.response;
  }
};

export const getAllDropdownRawItems = () => async (dispatch) => {
  try {
    const response = await api.get("/DropDown/GetItems", {
      headers: authHeader(),
    });

    dispatch({ type: "GET_ALL_DROPDOWN_RAW_ITEMS", payload: response.data });

    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const getAllDropdownByproducts = () => async (dispatch) => {
  try {
    const response = await api.get("/DropDown/GetByProducts", {
      headers: authHeader(),
    });

    dispatch({ type: "GET_ALL_DROPDOWN_BYPRODUCTS", payload: response.data });

    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const getAllDropdownRawStock = () => async (dispatch) => {
  try {
    const response = await api.get("/DropDown/GetAllRawStocks", {
      headers: authHeader(),
    });

    dispatch({ type: "GET_ALL_DROPDOWN_RAW_STOCK", payload: response.data });
  } catch (error) {
    throw error.response;
  }
};

export const getAllDropdownByproductStock = () => async (dispatch) => {
  try {
    const response = await api.get("/DropDown/GetAllByProducts", {
      headers: authHeader(),
    });

    dispatch({
      type: "GET_ALL_DROPDOWN_BYPRODUCT_STOCK",
      payload: response.data,
    });
  } catch (error) {
    throw error.response;
  }
};
