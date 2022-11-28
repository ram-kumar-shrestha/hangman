import { lazy } from "react";
import {
  Navigate,
  Outlet,
  Route,
  Routes,
  useOutletContext,
} from "react-router-dom";

const Items = lazy(() => import("../pages/Items"));
const ByProducts = lazy(() => import("../pages/Items/ByProducts"));
const ViewAllOrders = lazy(() => import("../pages/Orders/ViewAllOrders"));
const DispatchOrder = lazy(() => import("../pages/Orders/DispatchOrder"));
const ApprovedOrders = lazy(() => import("../pages/Orders/ApprovedOrders"));
const RejectedOrders = lazy(() => import("../pages/Orders/RejectedOrders"));
const IncompleteOrders = lazy(() => import("../pages/Orders/IncompleteOrders"));
const OrderBillings = lazy(() => import("../pages/OrderBillings"));
const RawItemsBillings = lazy(() => import("../pages/Stock/RawItemsBillings"));
const RawItems = lazy(() => import("../pages/Stock/RawItems"));
const FinishedItems = lazy(() => import("../pages/Stock/FinishedItems"));
const BadStock = lazy(() => import("../pages/Stock/BadStock"));
const BadStockSummary = lazy(() => import("../pages/Stock/BadStockSummary"));
const CentralKitchenOrderBillingsReport = lazy(() =>
  import("../pages/Central Kitchen Report/Byproduct")
);
const CentralKitchenRawItemBillingsReport = lazy(() =>
  import("../pages/Central Kitchen Report/RawItem")
);

import {
  NotFound,
  SingleOutletBilling,
  ViewAllOrdersDetails,
  ViewRawStockBilling,
  ViewSignleOrderDetails,
} from "../pages";

export const DispatcherRoutes = () => {
  const context = useOutletContext();

  return context.role === "Dispatcher" ? (
    <Routes>
      <Route path="inventory" element={<Outlet />}>
        <Route path="raw-items" element={<Items />} />
        <Route path="by-products" element={<ByProducts />} />

        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="orders" element={<Outlet />}>
        <Route path="all-orders" element={<Outlet />}>
          <Route path="" element={<ViewAllOrders />} />
          <Route path=":id" element={<ViewSignleOrderDetails />} />

          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="all-orders-details" element={<Outlet />}>
          <Route path="" element={<ViewAllOrdersDetails />} />
          {/* <Route path=":id" element={<ViewSignleOrderDetails />} /> */}

          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="dispatch/*" element={<Outlet />}>
          <Route path="*" element={<DispatchOrder />} />
          <Route path=":id" element={<ViewSignleOrderDetails />} />

          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="incomplete-orders" element={<Outlet />}>
          <Route path="*" element={<IncompleteOrders />} />
          <Route path=":id" element={<ViewSignleOrderDetails />} />

          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="approved-orders" element={<Outlet />}>
          <Route path="*" element={<ApprovedOrders />} />
          <Route path=":id" element={<ViewSignleOrderDetails />} />

          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="rejected-orders" element={<Outlet />}>
          <Route path="*" element={<RejectedOrders />} />
          <Route path=":id" element={<ViewSignleOrderDetails />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="outlet-order-billings" element={<Outlet />}>
        <Route path="all" element={<OrderBillings />} />
        <Route path=":id" element={<SingleOutletBilling />} />

        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="stock" element={<Outlet />}>
        <Route path="stock-in-raw-items" element={<Outlet />}>
          <Route path="" element={<RawItemsBillings />} />
          <Route path="all" element={<RawItems />} />

          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="raw-item-stock-billing" element={<Outlet />}>
          <Route path=":id" element={<ViewRawStockBilling />} />

          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="stock-in-finished-items" element={<Outlet />}>
          <Route path="" element={<FinishedItems />} />

          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="bad-stock" element={<BadStock />} />
        <Route path="bad-stock-summary" element={<BadStockSummary />} />

        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="report" element={<Outlet />}>
        <Route
          path="raw-items"
          element={<CentralKitchenRawItemBillingsReport />}
        />
        <Route
          path="byproducts"
          element={<CentralKitchenOrderBillingsReport />}
        />

        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  ) : (
    <Navigate to="/dashboard" />
  );
};
