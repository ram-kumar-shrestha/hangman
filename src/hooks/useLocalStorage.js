export const useLocalStorage = () => {
  return {
    role: decodeURIComponent(atob(localStorage.getItem("role"))),
    isAuth: localStorage.getItem("isAuth"),
    user: localStorage.getItem("user"),
    token: localStorage.getItem("authToken"),
    centralKitchenId: localStorage.getItem("centralKitchenId"),
    outletName: localStorage.getItem("outletName"),
    outletRating: localStorage.getItem("outletRating"),
    outletId: localStorage.getItem("outletId"),
    userId: localStorage.getItem("userId"),
  };
};
