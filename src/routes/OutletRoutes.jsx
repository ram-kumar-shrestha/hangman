import { lazy } from "react";
import {
  Navigate,
  Outlet,
  Route,
  Routes,
  useOutletContext,
} from "react-router-dom";
import { useLocalStorage } from "../hooks";
import {
  EditOutletOrder,
  EditUser,
  NotFound,
  OutletOrderDetail,
  OutletReport,
  RegisterUser,
  RequestOrder,
  SingleOutletBilling,
  TrackOrder,
} from "../pages";

const Users = lazy(() => import("../pages/Users"));
const OrderBillings = lazy(() => import("../pages/OrderBillings"));
const OutletInventory = lazy(() => import("../pages/OutletInventory"));
const OutletOrders = lazy(() => import("../pages/OutletOrders/"));
const OutletApprovedOrder = lazy(() =>
  import("../pages/OutletOrders/OutletApprovedOrder")
);
const OutletIncompleteOrder = lazy(() =>
  import("../pages/OutletOrders/OutletIncompleteOrder")
);
const OutletPendingOrder = lazy(() =>
  import("../pages/OutletOrders/OutletPendingOrder")
);
const OutletRejectedOrder = lazy(() =>
  import("../pages/OutletOrders/OutletRejectedOrder")
);
const CentralKitchenSalesReport = lazy(() =>
  import("../pages/Central Kitchen Report/Sales")
);

export const OutletRoutes = () => {
  const context = useOutletContext();

  return context.role === "OutletOwner" || context.role === "OutletEmployee" ? (
    <Routes>
      <Route path="inventory" element={<OutletInventory />} />

      <Route path="billings" element={<Outlet />}>
        <Route path="" element={<OrderBillings />} />
        <Route path=":id" element={<SingleOutletBilling />} />

        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="track-order" element={<TrackOrder />} />

      <Route path="orders" element={<Outlet />}>
        <Route path="all-orders" element={<Outlet />}>
          <Route path="" element={<OutletOrders />} />
          <Route path=":id" element={<OutletOrderDetail />} />

          {/* track order for owner only */}
          <Route path="track-order" element={<Outlet />}>
            <Route path=":id" element={<TrackOrder />} />

            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="request" element={<RequestOrder />} />

        <Route path="edit/:id" element={<EditOutletOrder />} />

        <Route path="pending-orders" element={<Outlet />}>
          <Route path="*" element={<OutletPendingOrder />} />
          <Route path=":id" element={<OutletOrderDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="approved-orders" element={<Outlet />}>
          <Route path="*" element={<OutletApprovedOrder />} />
          <Route path=":id" element={<OutletOrderDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="incomplete-orders" element={<Outlet />}>
          <Route path="*" element={<OutletIncompleteOrder />} />
          <Route path=":id" element={<OutletOrderDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="rejected-orders" element={<Outlet />}>
          <Route path="*" element={<OutletRejectedOrder />} />
          <Route path=":id" element={<OutletOrderDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Route for outlet owner only */}
      <Route
        path="*"
        element={
          context.role === "OutletOwner" ? (
            <Outlet />
          ) : (
            <Navigate to="/dashboard" />
          )
        }
      >
        {/* <Route path="report" element={<OutletReport />} /> */}

        <Route path="users" element={<Outlet />}>
          <Route path="view-all-users" element={<Users />} />
          <Route path="register-user" element={<RegisterUser />} />
          <Route path="edit/:id" element={<EditUser />} />

          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="report" element={<CentralKitchenSalesReport />} />

        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  ) : (
    <Navigate to="/dashboard" />
  );
};
