import { useContext } from "react";
import { FaWpforms } from "react-icons/fa";
import { NavContext } from "../components/layout/Sidebar";

export const CentralKitchenOwnerNav = () => {
  const context = useContext(NavContext);

  return (
    context.role === "CentralKitchenOwner" && (
      <>
        <context.DropDown
          linkId="0"
          title="Reports"
          links={[
            {
              href: "/central-kitchen/owner/report/raw-item",
              DropDownTitle: "Raw Items Report",
            },
            {
              href: "/central-kitchen/owner/report/byproduct",
              DropDownTitle: "Byproduct Report",
            },
            {
              href: "/central-kitchen/owner/report/sales",
              DropDownTitle: "Sales Report",
            },
            {
              href: "/central-kitchen/owner/report/byproduct-item-wise",
              DropDownTitle: "Byproduct Item Wise Report",
            },
          ]}
          icon={<FaWpforms />}
          showDropDown="true"
          handleSideNav={context.handleSideNav}
        />
      </>
    )
  );
};
