import { useContext } from "react";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { BiLabel } from "react-icons/bi";
import { FaSortAmountDown, FaWpforms } from "react-icons/fa";
import { MdInventory } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { NavContext } from "../components/layout/Sidebar";

export const OutletNav = () => {
  const context = useContext(NavContext);

  return (
    (context.role === "OutletEmployee" || context.role === "OutletOwner") && (
      <>
        <li
          onClick={() => {
            context.handleSideNav();
            context.toggleDropDown();
          }}
        >
          <NavLink
            to="/outlet/inventory"
            className={(navData) =>
              "nav-link" + (navData.isActive ? " active" : "")
            }
          >
            <span className="icon">
              <MdInventory />
            </span>
            Inventory
          </NavLink>
        </li>

        <context.DropDown
          linkId="0"
          title="Orders"
          links={[
            {
              href: "/outlet/orders/all-orders",
              DropDownTitle: "View All Orders",
            },
            {
              href: "/outlet/orders/request",
              DropDownTitle: "Request Order",
            },
            // {
            //   href: '/outlet/orders/incomplete-orders',
            //   DropDownTitle: 'Incomplete Orders',
            // },
            // {
            //   href: '/outlet/orders/pending-orders',
            //   DropDownTitle: 'Pending Orders',
            // },
            // {
            //   href: '/outlet/orders/approved-orders',
            //   DropDownTitle: 'Approved Orders',
            // },
            // {
            //   href: '/outlet/orders/rejected-orders',
            //   DropDownTitle: 'Rejected Orders',
            // },
          ]}
          icon={<FaSortAmountDown />}
          // showDropDown="true"
          handleSideNav={context.handleSideNav}
        />

        <li
          onClick={() => {
            context.handleSideNav();
            context.toggleDropDown();
          }}
        >
          <NavLink
            to="/outlet/billings"
            className={(navData) =>
              "nav-link" + (navData.isActive ? " active" : "")
            }
          >
            <span className="icon">
              <BiLabel />
            </span>
            Billings
          </NavLink>
        </li>
        {/* <context.DropDown
              linkId="2"
              title="Sales"
              links={[
                {
                  href: '/outlet/Sales/all-sales',
                  DropDownTitle: 'View All Sales',
                },
                {
                  href: '/outlet/Sales/add',
                  DropDownTitle: 'Add Sales',
                },
              ]}
              icon={<FaSortAmountDown />}
              showDropDown="true"
                     handleSideNav={context.handleSideNav}
            /> */}

        {/* <li  onClick={() => {
            context.handleSideNav();
            context.toggleDropDown();
          }}>
          <NavLink
            to="/outlet/track-order"
            className={(navData) =>
              "nav-link" + (navData.isActive ? " active" : "")
            }
          >
            <span className="icon">
              <MdOutlineTrackChanges />
            </span>
            Track Order
          </NavLink>
        </li> */}

        {context.role === "OutletOwner" && (
          <>
            <context.DropDown
              linkId="1"
              title="Users"
              links={[
                {
                  href: "/outlet/users/view-all-users",
                  DropDownTitle: "View All Users",
                },
                {
                  href: "/outlet/users/register-user",
                  DropDownTitle: "Register a User",
                },
              ]}
              icon={<AiOutlineUserSwitch />}
              handleSideNav={context.handleSideNav}
            />

            <li
              onClick={() => {
                context.handleSideNav();
                context.toggleDropDown();
              }}
            >
              <NavLink
                to="/outlet/report"
                className={(navData) =>
                  "nav-link" + (navData.isActive ? " active" : "")
                }
              >
                <span className="icon">
                  <FaWpforms />
                </span>
                Order Report
              </NavLink>
            </li>
          </>
        )}
      </>
    )
  );
};
