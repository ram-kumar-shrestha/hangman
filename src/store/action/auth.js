import api from "../../api";

export const login = (values) => async (dispatch) => {
  try {
    const response = await api.post("/authenticate/Login", values, {
      headers: { "Content-type": "application/json" },
    });

    localStorage.setItem("authToken", response.data.token);
    localStorage.setItem("user", response.data.user.normalizedUserName);
    localStorage.setItem("role", response.data.userRoles);
    localStorage.setItem(
      "centralKitchenId",
      response.data.user.centralKitchenId
    );
    localStorage.setItem("isAuth", true);
    localStorage.setItem("outletName", response.data.outletName);
    localStorage.setItem("outletRating", response.data.rating);
    localStorage.setItem("outletId", response.data.user.outletId);
    localStorage.setItem("userId", response.data.user.id);

    dispatch({
      type: "LOG_IN",
      payload: response.data,
    });
  } catch (error) {
    throw error.request.status;
  }
};

//logout
export const logout = () => async (dispatch) => {
  try {
    localStorage.clear();

    dispatch({
      type: "LOG_OUT",
      payload: "",
    });
  } catch (error) {
    console.log(error);
  }
};
