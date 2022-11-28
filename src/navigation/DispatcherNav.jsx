import { useContext } from "react";
import { AiOutlineStock } from "react-icons/ai";
import { BiAnalyse, BiLabel } from "react-icons/bi";
import { FaSortAmountDown } from "react-icons/fa";
import { GiStockpiles } from "react-icons/gi";
import { MdInventory } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { NavContext } from "../components/layout/Sidebar";

export const DispatcherNav = () => {
  const context = useContext(NavContext);
  return (
    context.role === "Dispatcher" && (
      <>
        <context.DropDown
          linkId="0"
          title="Inventory"
          links={[
            {
              href: "/dispatcher/inventory/raw-items",
              DropDownTitle: "Raw Items",
            },
            {
              href: "/dispatcher/inventory/by-products",
              DropDownTitle: "By Products",
            },
          ]}
          icon={<MdInventory />}
          handleSideNav={context.handleSideNav}
        />

        <context.DropDown
          linkId="1"
          title="Orders"
          showDropDown={false}
          links={[
            {
              href: "/dispatcher/orders/all-orders-details",
              DropDownTitle: "View All Orders Details",
            },
            {
              href: "/dispatcher/orders/all-orders",
              DropDownTitle: "View All Orders",
            },
            {
              href: "/dispatcher/orders/dispatch",
              DropDownTitle: "Dispatch Orders",
              // },
              // {
              //   href: '/dispatcher/orders/incomplete-orders',
              //   DropDownTitle: 'Incomplete Orders',
              // },
              // {
              //   href: '/dispatcher/orders/approved-orders',
              //   DropDownTitle: 'Approved Orders',
              // },
              // {
              //   href: '/dispatcher/orders/rejected-orders',
              //   DropDownTitle: 'Rejected Orders',
            },
          ]}
          icon={<FaSortAmountDown />}
          handleSideNav={context.handleSideNav}
        />

        <li
          onClick={() => {
            context.handleSideNav();
            context.toggleDropDown();
          }}
        >
          <NavLink
            to="/dispatcher/outlet-order-billings/all"
            className={(navData) =>
              "nav-link" + (navData.isActive ? " active" : "")
            }
          >
            <span className="icon">
              <BiLabel />
            </span>
            Outlet Billings
          </NavLink>
        </li>

        <context.DropDown
          linkId="2"
          title="Stock In"
          links={[
            {
              href: "/dispatcher/stock/stock-in-raw-items",
              DropDownTitle: "Raw Items",
            },
            {
              href: "/dispatcher/stock/stock-in-finished-items",
              DropDownTitle: "Finished Items",
            },
          ]}
          icon={<AiOutlineStock />}
          handleSideNav={context.handleSideNav}
        />

        <li
          onClick={() => {
            context.handleSideNav();
            context.toggleDropDown();
          }}
        >
          <NavLink
            to="/dispatcher/stock/bad-stock"
            className={(navData) =>
              "nav-link" + (navData.isActive ? " active" : "")
            }
          >
            <span className="icon">
              <GiStockpiles />
            </span>
            Bad Stock
          </NavLink>
        </li>

        <context.DropDown
          linkId="3"
          title="Report"
          links={[
            {
              href: "/dispatcher/report/raw-items",
              DropDownTitle: "Raw Items Report",
            },
            {
              href: "/dispatcher/report/byproducts",
              DropDownTitle: "Byproducts Report",
            },
          ]}
          icon={<BiAnalyse />}
          handleSideNav={context.handleSideNav}
        />
      </>
    )
  );
};
