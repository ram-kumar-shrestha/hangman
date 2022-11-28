import { Suspense, useState } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { useLocalStorage } from "./hooks";
import { Dashboard, Login, NotFound } from "./pages";

import {
  CentralKitchenAdminRoutes,
  CentralKitchenOwnerRoutes,
  DispatcherRoutes,
  OutletRoutes,
  ProcessingsUserRoutes,
  SystemAdminRoutes,
} from "./routes";

import { ProtectedRoute } from "./service";

import { Layout } from "./components";
import { Spinner } from "./components";
import { createContext } from "react";

export const FilterContext = createContext();

export default function App() {
  const { isAuth } = useLocalStorage();
  const [filterStateAllOrders, setFilterStateAllOrders] = useState({
    date: null,
    status: null,
  });
  const [filterStateDispatchOrders, setFilterStateDispatchOrders] = useState({
    date: null,
    status: null,
  });
  const [filterStateAllBillings, setFilterStateAllBillings] = useState({
    date: null,
    status: null,
    outletId: null,
  });

  return (
    <FilterContext.Provider
      value={{
        filterStateAllBillings,
        filterStateAllOrders,
        filterStateDispatchOrders,
        setFilterStateAllBillings,
        setFilterStateAllOrders,
        setFilterStateDispatchOrders,
      }}
    >
      <BrowserRouter>
        <Suspense
          fallback={
            <Layout>
              Loading... <Spinner />
            </Layout>
          }
        >
          <Routes>
            {/* preventing from redirecting to login page in / route after login */}
            <Route element={!isAuth ? <Outlet /> : <Layout />}>
              <Route
                index
                path="/"
                element={!isAuth ? <Login /> : <Dashboard />}
              />
            </Route>

            <Route index path="/login" element={<Login />} />

            {/* Authenticated Routes */}
            <Route path="*" element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="dashboard" element={<Dashboard />} />
                {/* system admin routes */}
                <Route path="*" element={<SystemAdminRoutes />} />

                {/* central kitchen admin routes */}
                <Route
                  path="central-kitchen/*"
                  element={<CentralKitchenAdminRoutes />}
                />

                {/* central kitchen owner routes */}
                <Route
                  path="central-kitchen/owner/*"
                  element={<CentralKitchenOwnerRoutes />}
                />

                {/*Dispatcher routes */}
                <Route path="dispatcher/*" element={<DispatcherRoutes />} />

                {/* outlet owner and emplyoee routes */}
                <Route path="outlet/*" element={<OutletRoutes />} />

                {/* processing user routes */}
                <Route
                  path="processing-user/*"
                  element={<ProcessingsUserRoutes />}
                />

                <Route path="*" element={<NotFound />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </FilterContext.Provider>
  );
}
