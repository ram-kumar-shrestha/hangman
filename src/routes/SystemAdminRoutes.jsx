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

export const SystemAdminRoutes = () => {
  const context = useOutletContext();

  return context.role === "SystemAdmin" ? (
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

      <Route path="*" element={<NotFound />} />
    </Routes>
  ) : (
    <Navigate to="/dashboard" />
  );
};
