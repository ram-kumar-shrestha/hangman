import { lazy } from "react";
import {
  Navigate,
  Outlet,
  Route,
  Routes,
  useOutletContext,
} from "react-router-dom";

import {
  AddItem,
  AddOutlet,
  AddOwner,
  AddUnit,
  EditByproduct,
  EditItem,
  EditOutlet,
  EditOwner,
  EditUser,
  NotFound,
  OwnerDetail,
  RegisterUser,
  SingleOutletBilling,
  ViewAllOrdersDetails,
  ViewRawStockBilling,
  ViewSignleOrderDetails,
} from "../pages";

const Items = lazy(() => import("../pages/Items"));
const AllUnits = lazy(() => import("../pages/Unit"));
const ByProducts = lazy(() => import("../pages/Items/ByProducts"));
const Owners = lazy(() => import("../pages/Owners"));
const Outlets = lazy(() => import("../pages/Outlets"));
const Users = lazy(() => import("../pages/Users"));
const BadStock = lazy(() => import("../pages/Stock/BadStock"));
const BadStockSummary = lazy(() => import("../pages/Stock/BadStockSummary"));
const CentralKitchenOrderBillingsReport = lazy(() =>
  import("../pages/Central Kitchen Report/Byproduct")
);
const CentralKitchenRawItemBillingsReport = lazy(() =>
  import("../pages/Central Kitchen Report/RawItem")
);
const CentralKitchenSalesReport = lazy(() =>
  import("../pages/Central Kitchen Report/Sales")
);
const CentralKitchenByproductItemWiseReport = lazy(() =>
  import("../pages/Central Kitchen Report/ByproductItemWise")
);

const ViewAllOrders = lazy(() => import("../pages/Orders/ViewAllOrders"));
const DispatchOrder = lazy(() => import("../pages/Orders/DispatchOrder"));
const ApprovedOrders = lazy(() => import("../pages/Orders/ApprovedOrders"));
const RejectedOrders = lazy(() => import("../pages/Orders/RejectedOrders"));
const IncompleteOrders = lazy(() => import("../pages/Orders/IncompleteOrders"));
const OrderBillings = lazy(() => import("../pages/OrderBillings"));
const RawItemsBillings = lazy(() => import("../pages/Stock/RawItemsBillings"));
const RawItems = lazy(() => import("../pages/Stock/RawItems"));
const FinishedItems = lazy(() => import("../pages/Stock/FinishedItems"));

export const CentralKitchenAdminRoutes = () => {
  const context = useOutletContext();

  return context.role === "CentralKitchenAdmin" ? (
    <Routes>
      <Route path="inventory" element={<Outlet />}>
        {/* <Route path="bad-stock" element={<BadStock />} /> */}
        <Route path="bad-stock-summary" element={<BadStockSummary />} />
        <Route path="raw-items" element={<Items />} />
        <Route path="by-products" element={<ByProducts />} />
        <Route path="add-item" element={<AddItem />} />
        <Route path="edit-raw-item/:id" element={<EditItem />} />
        <Route path="edit-byproduct/:id" element={<EditByproduct />} />

        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="units" element={<Outlet />}>
        <Route path="all-units" element={<AllUnits />} />
        <Route path="add-unit" element={<AddUnit />} />

        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="owners" element={<Outlet />}>
        <Route path="view-all-owners" element={<Owners />} />
        <Route path="add-owner" element={<AddOwner />} />
        <Route path=":id" element={<OwnerDetail />} />
        <Route path="edit/:id" element={<EditOwner />} />

        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="outlets" element={<Outlet />}>
        <Route path="view-all-outlets" element={<Outlets />} />
        <Route path="add-outlet" element={<AddOutlet />} />
        <Route path="edit/:id" element={<EditOutlet />} />

        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="users" element={<Outlet />}>
        <Route path="view-all-users" element={<Users />} />
        <Route path="register-user" element={<RegisterUser />} />
        <Route path="edit/:id" element={<EditUser />} />

        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="report" element={<Outlet />}>
        <Route
          path="raw-item"
          element={<CentralKitchenRawItemBillingsReport />}
        />
        <Route
          path="byproduct"
          element={<CentralKitchenOrderBillingsReport />}
        />
        <Route path="sales" element={<CentralKitchenSalesReport />} />
        <Route
          path="byproduct-item-wise"
          element={<CentralKitchenByproductItemWiseReport />}
        />

        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Dispatcher route */}

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

      <Route path="*" element={<NotFound />} />
    </Routes>
  ) : (
    <Navigate to="/dashboard" />
  );
};
