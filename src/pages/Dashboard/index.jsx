import React, { useEffect } from "react";
import { RiStarSFill } from "react-icons/ri";
import { connect } from "react-redux";

import { Cards, LinkButton, Title } from "../../components";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import {
  getBlockedStatus,
  getDashboardData,
  getMinimumStockInfo,
} from "../../store/action";

import "./dashboard.css";

const Dashboard = ({
  dashboard,
  minStockInfo,
  getDashboardData,
  blockStatus,
  getBlockedStatus,
  getMinimumStockInfo,
}) => {
  const { role, outletName, outletId, outletRating, userId } =
    useLocalStorage();

  // Transforming first letter of outlet name to UPPERCASE
  let name = outletName
    ?.split(" ")
    .map(
      (nameItem) => nameItem.charAt("0").toUpperCase() + nameItem.slice(1) + " "
    );

  // outlet rating
  let starsDOM = [];
  const stars = (() => {
    for (let i = 0; i < 5; i++) {
      if (i < outletRating) {
        starsDOM = [
          ...starsDOM,
          <span className="star-fill" key={i}>
            <RiStarSFill color="rgb(229 203 54)" size={24} />
          </span>,
        ];
      } else {
        starsDOM = [
          ...starsDOM,
          <span className="star-empty" key={i}>
            <RiStarSFill color="#c1c1c1" size={24} />
          </span>,
        ];
      }
    }
  })(); //invoking function at its declaration

  useEffect(() => {
    document.title = "Syanko Katti Roll - Dashboard";

    getDashboardData(userId)
      .then(() => {})
      .catch((e) => {
        console.log(e);
      });

    // get outlet block status
    (role === "OutletOwner" || role === "OutletEmployee") &&
      getBlockedStatus(outletId);
  }, [outletId]);

  useEffect(() => {
    // get minimum stock info
    (role === "Dispatcher" || role === "CentralKitchenAdmin") &&
      getMinimumStockInfo();
  }, []);

  // seperating rawItems and byProduct
  let mappedRawItems = [];
  let mappedByproducts = [];

  minStockInfo.forEach((item, index) => {
    const itemName = item.message.split(":")[0];
    const itemQuantity = item.message.split(":")[1];

    if (item.name === "RawItem") {
      mappedRawItems = [
        ...mappedRawItems,
        <li className="min-stock__item" key={index}>
          {itemName.charAt(0).toUpperCase()}
          {itemName.slice(1)}:{itemQuantity}
        </li>,
      ];
    } else {
      mappedByproducts = [
        ...mappedByproducts,
        <li className="min-stock__item" key={index}>
          {itemName.charAt(0).toUpperCase()}
          {itemName.slice(1)}:{itemQuantity}
        </li>,
      ];
    }
  });

  return (
    <>
      {/* SystemAdmin Dashboard */}
      {(role === "SystemAdmin" ||
        role === "CentralKitchenOwner" ||
        role === "CentralKitchenAdmin") && (
        <>
          <Title value="Central Kitchen" />

          <hr />
        </>
      )}

      {/* Dispatcher Dashboard */}
      {role === "Dispatcher" && (
        <>
          <Title value="Syanko Katti Roll" />

          <div className="shorcut-btn">
            <LinkButton
              href="/dispatcher/orders/dispatch"
              className=" btn-outline-info"
              name="Dispatch Order"
            />

            <LinkButton
              href="/dispatcher/orders/all-orders-details"
              className=" btn-outline-primary"
              name="All Orders Details"
            />

            <LinkButton
              href="/dispatcher/orders/all-orders"
              className=" btn-outline-secondary"
              name="All Orders"
            />

            <LinkButton
              href="/dispatcher/outlet-order-billings/all"
              name="Billings"
              className="btn-outline-warning"
            />
          </div>

          <hr />
        </>
      )}

      {/* Outlet Owner or Employee Dashboard */}
      {(role === "OutletOwner" || role === "OutletEmployee") && (
        <>
          {blockStatus ? (
            <marquee className="danger">
              Your outlet has been blocked. Please contact admin for further
              detail!.
            </marquee>
          ) : null}

          <div className="dashboard-title d-flex flex-column align-items-center justify-content-center mb-2">
            <Title value={name} />
            <div className="stars-container"> {starsDOM}</div>
          </div>

          <div className=" shorcut-btn ">
            <LinkButton
              href="../outlet/orders/all-orders"
              name="All Orders"
              className="btn-outline-info"
            />

            <LinkButton
              href="../outlet/orders/request"
              name="Request Order"
              className=" btn-outline-primary"
            />

            <LinkButton
              href="../outlet/billings"
              name="Billings"
              className=" btn-outline-success"
            />

            <LinkButton
              href="../outlet/users/view-all-users"
              name="Users"
              className=" btn-outline-secondary"
            />

            {/* <LinkButton
            href="../outlet/sales/request"
            name="Add Sales"
            className="btn btn-primary ml-2" 
            icon={<MdAddCircle />}
          /> */}
          </div>

          <hr />
        </>
      )}

      {/* Minimum stock info */}
      {(role === "CentralKitchenAdmin" || role === "Dispatcher") && (
        <>
          {(mappedRawItems.length > 0 || mappedByproducts.length > 0) && (
            <section id="min-stock__info">
              <h1 className=" min-stock__title">
                The following items/byproducts are getting out of stock:
              </h1>
              <div className="min-stock__content mt-2 d-sm-flex justify-content-between">
                {mappedRawItems.length > 0 && (
                  <div
                    className={`raw-item ${
                      mappedByproducts.length > 0 ? "col-md-6" : "col-md-12"
                    }`}
                  >
                    <h1 className="list-title">Raw Items</h1>
                    <ul className="content-item">{mappedRawItems}</ul>
                  </div>
                )}
                {mappedByproducts.length > 0 && (
                  <div
                    className={`byproduct ${
                      mappedRawItems.length > 0 ? "col-md-6" : "col-md-12"
                    }`}
                  >
                    <h1 className="list-title">ByProducts</h1>
                    <ul className="content-item">{mappedByproducts}</ul>
                  </div>
                )}
              </div>
            </section>
          )}
          <hr />
        </>
      )}

      <Cards data={dashboard} />

      <hr />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard,
    blockStatus: state.blockStatus,
    minStockInfo: state.minStockInfo,
  };
};

export default connect(mapStateToProps, {
  getDashboardData,
  getBlockedStatus,
  getMinimumStockInfo,
})(Dashboard);
