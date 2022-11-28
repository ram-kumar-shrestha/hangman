import { createContext } from "react";
import { NavLink } from "react-router-dom";
import { AiFillDashboard } from "react-icons/ai";

import DropDown from "./DropDown";
import Logo from "../logo";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import {
  CentralKitchenAdminNav,
  CentralKitchenOwnerNav,
  DispatcherNav,
  OutletNav,
  ProcessingUserNav,
  SystemAdminNav,
} from "../../navigation";

export const NavContext = createContext();

const Sidebar = () => {
  const { role } = useLocalStorage();

  const handleSideNav = () => {
    const sideNav = document.querySelector(".left-nav");
    sideNav.classList.toggle("show-nav");
  };

  const toggleDropDown = () => {
    const lists = document.querySelectorAll(".dropdown-container");
    lists.forEach((item, index) => {
      item.classList.contains("show") ? item.classList.remove("show") : null; //collapsed only showed dropdown
    });
  };

  return (
    <aside className="left-nav no-print">
      <div className="logo ml-4 d-flex justify-content-between ">
        <Logo position="left" />

        <button
          onClick={handleSideNav}
          className="close-hamburger__btn  float-right mr-4"
          style={{ color: "#f1f1f1" }}
        >
          &#10006;
        </button>
      </div>
      <NavContext.Provider
        value={{ role, DropDown, handleSideNav, toggleDropDown }}
      >
        <nav className="d-flex flex-column mt-4">
          <ul>
            <li
              onClick={() => {
                handleSideNav();
                toggleDropDown();
              }}
            >
              <NavLink
                to="/dashboard"
                className={(navData) =>
                  "nav-link" + (navData.isActive ? " active" : "")
                }
              >
                <span className="icon">
                  <AiFillDashboard />
                </span>
                Dashboard
              </NavLink>
            </li>

            {/* Navigation for Central Kitchen Admin */}
            <CentralKitchenAdminNav />

            {/* Navigation for Central Kitchen Owner */}
            <CentralKitchenOwnerNav />

            {/* Navigation for System Admin */}
            <SystemAdminNav />

            {/* Navigation for Dispatcher */}
            <DispatcherNav />

            {/* Navigation for Outlet Outlet Employee and Owner */}
            <OutletNav />

            {/* Navigation for Central Kitchen Processing User */}
            <ProcessingUserNav />
          </ul>
        </nav>
      </NavContext.Provider>
    </aside>
  );
};

export default Sidebar;
