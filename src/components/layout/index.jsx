import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Actions from "./Actions";

import "./layout.css";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const { role } = useLocalStorage();

  return (
    <section>
      <Header />
      <Sidebar />
      <div className="main-footer__container d-flex flex-column justify-content-between">
        <main className="print-content">
          <Outlet context={{ role }} />
        </main>

        {(role === "CentralKitchenAdmin" || role === "SystemAdmin") && (
          <Actions
            relativePath={
              role === "CentralKitchenAdmin" ? "/central-kitchen" : ""
            }
          />
        )}

        <Footer />
      </div>
    </section>
  );
};

export default Layout;
