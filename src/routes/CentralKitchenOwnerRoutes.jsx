import { lazy } from "react";
import {
  Navigate,
  Outlet,
  Route,
  Routes,
  useOutletContext,
} from "react-router-dom";

import { NotFound } from "../pages";

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

export const CentralKitchenOwnerRoutes = () => {
  const context = useOutletContext();

  return context.role === "CentralKitchenOwner" ? (
    <Routes>
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
