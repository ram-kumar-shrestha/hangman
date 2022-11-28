import { useContext } from "react";
import { AiOutlineStock } from "react-icons/ai";
import { BiAnalyse, BiLabel } from "react-icons/bi";
import { FaSortAmountDown } from "react-icons/fa";
import { GiStockpiles } from "react-icons/gi";
import { MdInventory } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { NavContext } from "../components/layout/Sidebar";

export const ProcessingUserNav = () => {
  const context = useContext(NavContext);
  return (
    context.role === "CentralKitchenProcessing" && (
      <>
        <li
          onClick={() => {
            context.handleSideNav();
            context.toggleDropDown();
          }}
        >
          <NavLink
            to="/processing-user/orders/all-orders-details"
            className={(navData) =>
              "nav-link" + (navData.isActive ? " active" : "")
            }
          >
            <span className="icon">
              <BiLabel />
            </span>
            View All Orders Details
          </NavLink>
        </li>
      </>
    )
  );
};
