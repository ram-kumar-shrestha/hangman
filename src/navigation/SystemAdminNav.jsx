import { useContext } from "react";
import { AiOutlineBranches, AiOutlineUserSwitch } from "react-icons/ai";
import { FaBoxes, FaCoins, FaWpforms } from "react-icons/fa";
import { NavContext } from "../components/layout/Sidebar";

export const SystemAdminNav = () => {
  const context = useContext(NavContext);
  return (
    context.role === "SystemAdmin" && (
      <>
        {/* <context.DropDown
              linkId="0"
              title="Central Kitchen"
              links={[
                {
                  href: '/central-kitchen/all-central-kitchen',
                  DropDownTitle: 'View All Central Kitchen',
                },
                {
                  href: '/central-kitchen/add-central-kitchen',
                  DropDownTitle: 'Add a Central Kitchen',
                },
              ]}
              icon={<GiKitchenKnives />}
            /> */}

        <context.DropDown
          linkId="0"
          title="Units"
          links={[
            {
              href: "/units/all-units",
              DropDownTitle: "All Units",
            },

            {
              href: "/units/add-unit",
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
            { href: "/inventory/raw-items", DropDownTitle: "Raw Items" },
            {
              href: "/inventory/by-products",
              DropDownTitle: "By Products",
            },
            {
              href: "/inventory/bad-stock-summary",
              DropDownTitle: "Bad Stock",
            },
            { href: "/inventory/add-item", DropDownTitle: "Add an Item" },
          ]}
          icon={<FaBoxes />}
          handleSideNav={context.handleSideNav}
        />

        <context.DropDown
          linkId="2"
          title="Owners"
          links={[
            {
              href: "/owners/view-all-owners",
              DropDownTitle: "View All owners",
            },
            { href: "/owners/add-owner", DropDownTitle: "Add an Owner" },
          ]}
          icon={<FaCoins />}
          handleSideNav={context.handleSideNav}
        />

        <context.DropDown
          linkId="3"
          title="Outlets"
          links={[
            {
              href: "/outlets/view-all-outlets",
              DropDownTitle: "View All Outlets",
            },
            { href: "/outlets/add-outlet", DropDownTitle: "Add an Outlet" },
          ]}
          icon={<AiOutlineBranches />}
          handleSideNav={context.handleSideNav}
        />

        <context.DropDown
          linkId="4"
          title="Users"
          links={[
            {
              href: "/users/view-all-users",
              DropDownTitle: "View All Users",
            },
            {
              href: "/users/register-user",
              DropDownTitle: "Register a User",
            },
          ]}
          icon={<AiOutlineUserSwitch />}
          handleSideNav={context.handleSideNav}
        />

        <context.DropDown
          linkId="5"
          title="Reports"
          links={[
            {
              href: "/report/raw-item",
              DropDownTitle: "Raw Items Report",
            },
            {
              href: "/report/Byproduct",
              DropDownTitle: "Byproduct Item Report",
            },
            {
              href: "/report/Sales",
              DropDownTitle: "Sales Report",
            },
            {
              href: "/report/byproduct-item-wise",
              DropDownTitle: "Byproduct Item Wise Report",
            },
          ]}
          icon={<FaWpforms />}
          handleSideNav={context.handleSideNav}
        />
      </>
    )
  );
};
