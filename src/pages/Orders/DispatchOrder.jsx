import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { BiDetail } from "react-icons/bi";
import { TiTick } from "react-icons/ti";

import {
  CustomPagination,
  NepaliDateWithResetButton,
  Table,
  Title,
} from "../../components";
import { getOutletOrders, prepareOrder } from "../../store/action";
import { useLocalStorage } from "../../hooks";
import { FilterContext } from "../../App";

const DispatchOrder = ({ order, getOutletOrders, prepareOrder }) => {
  // filter context
  const context = useContext(FilterContext);

  const [nepaliDate, setNepaliDate] = useState("");
  const [status, setStatus] = useState("Preparing");

  const [message, setMessage] = useState(<div>Loading...</div>);

  const { role } = useLocalStorage();

  const responseOrders = (pageNumber, pageSize) => {
    getOutletOrders(
      null,
      null,
      context.filterStateDispatchOrders.date === "reset"
        ? null
        : context.filterStateDispatchOrders.date || nepaliDate,
      context.filterStateDispatchOrders.status === "Cleared"
        ? "Preparing"
        : context.filterStateDispatchOrders.status || "Preparing",
      pageNumber,
      pageSize
    )
      .then(() => {
        setMessage("");
        context.filterStateDispatchOrders.date === "reset" &&
          context.setFilterStateDispatchOrders((prev) => ({
            ...prev,
            date: "reset",
          }));
      })
      .catch((e) => {
        setMessage(<div className="danger">Something Went Wrong</div>);
        console.log(e);
      });
  };

  useEffect(() => {
    document.title = "Syanko Katti Roll - Dispatch Orders";

    context.filterStateDispatchOrders.status || setStatus("Preparing");

    nepaliDate && responseOrders();
  }, [order?.length]);

  // console.log(context.filterStateDispatchOrders);

  return (
    <>
      <Title value="Dispatch Orders" />

      <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
        {/* <input
          type="Date"
          className="form-control w-25"
          onChange={(e) => {
            setDate(e.target.value);
            getOutletOrders(null, e.target.value, status);
          }}
        /> */}
        {/* <Calendar
          theme="dark"
          className="form-control nepali-date"
          onChange={({ bsDate }) => {
            setNepaliDate(bsDate);

            count > 1 && getOutletOrders(null, bsDate, status); //to prevent from qeury with date at first render
            setCount((cur) => cur + 1);
          }}
          name={`orderTargetNepDate`}
          language="en"
        /> */}

        <NepaliDateWithResetButton
          setNepaliDate={setNepaliDate}
          status={status}
          getOutletOrders={getOutletOrders}
          setMessage={setMessage}
          nepaliDate={nepaliDate}
          styleName="dispatch"
        />

        <select
          name="status"
          className="form-control  responsive-select__form"
          onChange={(e) => {
            setStatus(e.target.value);
            context.setFilterStateDispatchOrders((prev) => ({
              ...prev,
              status: e.target.value,
            }));

            getOutletOrders(
              null,
              null,
              context.filterStateDispatchOrders.date === "reset"
                ? null
                : context.filterStateDispatchOrders.date || nepaliDate,
              e.target.value
            );
          }}
          value={context.filterStateDispatchOrders.status}
        >
          <option value="Preparing">Preparing</option>
          <option value="Pending">Pending</option>
          <option value="Incomplete">Incomplete</option>
        </select>
      </div>

      {message ||
        (order?.data?.length === 0 ? (
          <div className="danger">Orders not found !!</div>
        ) : (
          ""
        )) || (
          <>
            <Table
              items={order?.data?.map(
                //setState doesnot update as required so used without state
                ({
                  outletOrderId,
                  outletName,
                  status,
                  orderDate,
                  orderNepDate,
                  orderTargetDate,
                  orderTargetNepDate,
                  remarks,
                  userName,
                  phoneNumber,
                }) => {
                  return {
                    ["Order Id"]: outletOrderId,
                    ["Outlet"]: outletName
                      .split(" ") //transforming first letter of every word to uppercase
                      .map(
                        (nameItem) =>
                          nameItem.charAt("0").toUpperCase() +
                          nameItem.slice(1) +
                          " "
                      ),
                    ["User"]: userName,
                    // ["Contact"]: phoneNumber,
                    status,
                    // ["Order Date"]: new Date(orderDate).toLocaleDateString(),
                    // ["Target Date"]: new Date(
                    //   orderTargetDate
                    // ).toLocaleDateString(),
                    ["Order Date"]: orderNepDate,
                    ["Target Date"]: orderTargetNepDate,
                    remarks,
                    ["Detail"]: (
                      <button
                        onClick={() =>
                          context.filterStateDispatchOrders.date === "reset" ||
                          context.setFilterStateDispatchOrders((prev) => ({
                            ...prev,
                            date: orderTargetNepDate,
                          }))
                        }
                      >
                        <Link
                          to={
                            (role === "Dispatcher"
                              ? "/dispatcher/"
                              : "/central-kitchen/") +
                            "orders/dispatch/" +
                            `${outletOrderId}`
                          }
                          className="btn btn-outline-info my-2"
                        >
                          <BiDetail />
                        </Link>
                      </button>
                    ),
                    ["Prepare"]: (
                      <button
                        type="button"
                        className={` btn btn-outline-success mt-2 ${
                          status !== "Pending" ? "hide-btn" : ""
                        }`}
                        onClick={() =>
                          prepareOrder(outletOrderId)
                            .then(() => getOutletOrders())
                            .catch((e) => console.log(e))
                        }
                        disabled={status === "Pending" ? false : true}
                      >
                        <TiTick />
                      </button>
                    ),
                  };
                }
              )}
            />

            {/* Pagination */}
            {order?.totalPage > 1 && (
              <CustomPagination
                totalPages={order?.totalPage}
                paginationHandler={responseOrders}
                currentPage={order?.pageNumber}
                prevPage={order?.previousPage}
                nextPage={order?.nextPage}
              />
            )}
          </>
        )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    order: state.order,
  };
};

export default connect(mapStateToProps, { getOutletOrders, prepareOrder })(
  DispatchOrder
);
