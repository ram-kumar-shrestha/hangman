import {
  Navigate,
  Outlet,
  Route,
  Routes,
  useOutletContext,
} from "react-router-dom";

import { NotFound, ViewAllOrdersDetails } from "../pages";

export const ProcessingsUserRoutes = () => {
  const context = useOutletContext();

  return context.role === "CentralKitchenProcessing" ? (
    <Routes>
      <Route path="orders" element={<Outlet />}>
        <Route path="all-orders-details" element={<Outlet />}>
          <Route path="" element={<ViewAllOrdersDetails />} />
          {/* <Route path=":id" element={<ViewSignleOrderDetails />} /> */}

          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  ) : (
    <Navigate to="/dashboard" />
  );
};
