import { useContext } from "react";
import {
  AiOutlineBranches,
  AiOutlineStock,
  AiOutlineUserSwitch,
} from "react-icons/ai";
import { BiLabel } from "react-icons/bi";
import { FaBoxes, FaCoins, FaSortAmountDown, FaWpforms } from "react-icons/fa";
import { GiStockpiles } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import { NavContext } from "../components/layout/Sidebar";

export const CentralKitchenAdminNav = () => {
  const context = useContext(NavContext);

  return (
    context.role === "CentralKitchenAdmin" && (
      <>
        <context.DropDown
          linkId="0"
          title="Units"
          links={[
            {
              href: "/central-kitchen/units/all-units",
              DropDownTitle: "All Units",
            },

            {
              href: "/central-kitchen/units/add-unit",
              DropDownTitle: "Add a Unit",
            },
          ]}
          icon={<FaWpforms />}
          handleSideNav={context.handleSideNav}
        />

        <context.DropDown
          linkId="1"
          title="Inventory"
          links={[
            {
              href: "/central-kitchen/inventory/raw-items",
              DropDownTitle: "Raw Items",
            },
            {
              href: "/central-kitchen/inventory/by-products",
              DropDownTitle: "By Products",
            },
            {
              href: "/central-kitchen/stock/bad-stock-summary",
              DropDownTitle: "Bad Stock",
            },
            {
              href: "/central-kitchen/inventory/add-item",
              DropDownTitle: "Add an Item",
            },
          ]}
          icon={<FaBoxes />}
          handleSideNav={context.handleSideNav}
        />

        <context.DropDown
          linkId="2"
          title="Owners"
          links={[
            {
              href: "/central-kitchen/owners/view-all-owners",
              DropDownTitle: "View All owners",
            },
            {
              href: "/central-kitchen/owners/add-owner",
              DropDownTitle: "Add an Owner",
            },
          ]}
          icon={<FaCoins />}
          handleSideNav={context.handleSideNav}
        />

        <context.DropDown
          linkId="3"
          title="Outlets"
          links={[
            {
              href: "/central-kitchen/outlets/view-all-outlets",
              DropDownTitle: "View All Outlets",
            },
            {
              href: "/central-kitchen/outlets/add-outlet",
              DropDownTitle: "Add an Outlet",
            },
          ]}
          icon={<AiOutlineBranches />}
          handleSideNav={context.handleSideNav}
        />

        <context.DropDown
          linkId="4"
          title="Users"
          links={[
            {
              href: "/central-kitchen/users/view-all-users",
              DropDownTitle: "View All Users",
            },
            {
              href: "/central-kitchen/users/register-user",
              DropDownTitle: "Register a User",
            },
          ]}
          icon={<AiOutlineUserSwitch />}
          handleSideNav={context.handleSideNav}
        />

        {/*Dispatcher nav */}
        <context.DropDown
          linkId="5"
          title="Orders"
          showDropDown={false}
          links={[
            {
              href: "/central-kitchen/orders/all-orders-details",
              DropDownTitle: "View All Orders Details",
            },
            {
              href: "/central-kitchen/orders/all-orders",
              DropDownTitle: "View All Orders",
            },
            {
              href: "/central-kitchen/orders/dispatch",
              DropDownTitle: "Dispatch Orders",
              // },
              // {
              //   href: '/central-kitchen/orders/incomplete-orders',
              //   DropDownTitle: 'Incomplete Orders',
              // },
              // {
              //   href: '/central-kitchen/orders/approved-orders',
              //   DropDownTitle: 'Approved Orders',
              // },
              // {
              //   href: '/central-kitchen/orders/rejected-orders',
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
            to="/central-kitchen/outlet-order-billings/all"
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
          linkId="6"
          title="Stock In"
          links={[
            {
              href: "/central-kitchen/stock/stock-in-raw-items",
              DropDownTitle: "Raw Items",
            },
            {
              href: "/central-kitchen/stock/stock-in-finished-items",
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
            to="/central-kitchen/stock/bad-stock"
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
          linkId="7"
          title="Reports"
          links={[
            {
              href: "/central-kitchen/report/raw-item",
              DropDownTitle: "Raw Items Report",
            },
            {
              href: "/central-kitchen/report/Byproduct",
              DropDownTitle: "Byproduct Item Report",
            },
            {
              href: "/central-kitchen/report/Sales",
              DropDownTitle: "Sales Report",
            },
            {
              href: "/central-kitchen/report/byproduct-item-wise",
              DropDownTitle: "Byproduct Item Wise ",
            },
          ]}
          icon={<FaWpforms />}
          handleSideNav={context.handleSideNav}
        />
      </>
    )
  );
};
