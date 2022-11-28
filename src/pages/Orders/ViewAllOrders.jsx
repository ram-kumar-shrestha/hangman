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

const ViewAllOrders = ({ order, getOutletOrders, prepareOrder }) => {
  const [status, setStatus] = useState("");
  const [nepaliDate, setNepaliDate] = useState("");
  const [message, setMessage] = useState(<div>Loading...</div>);

  const { role } = useLocalStorage();

  // filter context
  const context = useContext(FilterContext);

  const responseOrders = (pageNumber = null, pageSize = null) => {
    getOutletOrders(
      null,
      null,
      context.filterStateAllOrders.date === "reset"
        ? null
        : context.filterStateAllOrders.date || nepaliDate,
      context.filterStateAllOrders.status || null,
      pageNumber,
      pageSize
    ) //id = null, date = null, status = null
      .then(() => {
        setMessage("");
        context.filterStateAllOrders.date === "reset" &&
          context.setFilterStateAllOrders((prev) => ({
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
    document.title = "Syanko Katti Roll - All Orders";

    nepaliDate && responseOrders();
  }, [order?.length]);

  // console.log(context.filterStateAllOrders);

  return (
    <>
      <Title value="View All Orders" />

      <div className="d-flex flex-column flex-sm-row justify-content-between mb-2 filter">
        {/* <input
          type="Date"
          className="form-control  "
          onChange={(e) => {
            setDate(e.target.value);
            getOutletOrders(null, e.target.value, status);
          }}
        /> */}

        <NepaliDateWithResetButton
          setNepaliDate={setNepaliDate}
          status={status}
          getOutletOrders={getOutletOrders}
          setMessage={setMessage}
          nepaliDate={nepaliDate}
          styleName="all"
        />

        <select
          name="status"
          className="form-control responsive-select__form"
          onChange={(e) => {
            setStatus(e.target.value);
            context.setFilterStateAllOrders((prev) => ({
              ...prev,
              status: e.target.value,
            }));

            e.target.value &&
              getOutletOrders(
                null,
                null,
                context.filterStateAllOrders.date === "reset"
                  ? null
                  : context.filterStateAllOrders.date || nepaliDate,
                e.target.value
              );
          }}
          value={context.filterStateAllOrders.status}
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Preparing">Preparing</option>
          <option value="Approved">Approved</option>
          <option value="Incomplete">Incomplete</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {message ||
        (order.data.length === 0 ? (
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
                  orderTargetDate,
                  orderNepDate,
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
                    // ['Contact']: phoneNumber,
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
                          context.filterStateAllOrders.date === "reset" ||
                          context.setFilterStateAllOrders((prev) => ({
                            ...prev,
                            date: orderTargetNepDate,
                          }))
                        }
                      >
                        <Link
                          to={
                            (role === "Dispatcher"
                              ? `/dispatcher`
                              : `/central-kitchen`) +
                            `/orders/all-orders/${outletOrderId}`
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
  ViewAllOrders
);
