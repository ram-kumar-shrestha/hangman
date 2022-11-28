import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { BiDetail } from "react-icons/bi";
import { AiFillEdit } from "react-icons/ai";

import { MdOutlineTrackChanges } from "react-icons/md";

import Calendar from "@sbmdkl/nepali-datepicker-reactjs";
import "@sbmdkl/nepali-datepicker-reactjs/dist/index.css";

import {
  CustomPagination,
  NepaliDateWithResetButton,
  Table,
  Title,
} from "../../components";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { getOutletOrders } from "../../store/action/order";
import { FilterContext } from "../../App";

const OutletOrders = ({ order, getOutletOrders }) => {
  const { outletId } = useLocalStorage();
  const [nepaliDate, setNepaliDate] = useState("");
  const [status, setStatus] = useState("");

  const [message, setMessage] = useState(<div>Loading...</div>);

  // filter context
  const context = useContext(FilterContext);

  const responseOutletOrder = (pageNumber, pageSize) => {
    getOutletOrders(
      null,
      outletId,
      context.filterStateAllOrders.date === "reset"
        ? null
        : context.filterStateAllOrders.date || nepaliDate,
      context.filterStateAllOrders.status || null,
      pageNumber,
      pageSize
    )
      .then(() => {
        setMessage(""); //reset message
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

    nepaliDate && responseOutletOrder();
  }, [order?.length]);

  return (
    <>
      <Title value="View All Orders" />

      <div className="d-flex flex-column flex-sm-row justify-content-between mb-2 filter">
        {/* <input
          type="Date"
          className="form-control  "
          onChange={(e) => {
            setDate(e.target.value);
            getOutletOrders(outletId, e.target.value, status);
          }}
        /> */}

        <NepaliDateWithResetButton
          setNepaliDate={setNepaliDate}
          status={status}
          getOutletOrders={getOutletOrders}
          outletId={outletId}
          styleName="all"
          setMessage={setMessage}
        />

        {/* <Calendar
          theme="dark"
          className="form-control nepali-date mt-2 "
          onChange={({ bsDate }) => {
            setNepaliDate(bsDate);

            getOutletOrders(outletId, bsDate, status);
          }}
          name={`orderTargetNepDate`}
          language="en"
        /> */}

        <select
          name="status"
          className="form-control h-80 mt-2 "
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
          <option value="Approved">Dispatched</option>
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
                ({
                  orderDate,
                  orderTargetDate,
                  orderNepDate,
                  orderTargetNepDate,
                  status,
                  outletOrderId,
                }) => {
                  return {
                    ["Order Id"]: outletOrderId,
                    // ["Order Date"]: new Date(orderDate).toLocaleDateString(),
                    // ["Target Date"]: new Date(
                    //   orderTargetDate
                    // ).toLocaleDateString(),
                    ["Order Date"]: orderNepDate,
                    ["Target Date"]: orderTargetNepDate,
                    status,
                    ["Detail"]: (
                      <Link
                        to={`./${outletOrderId}`}
                        className="btn btn-outline-success"
                      >
                        <BiDetail />
                      </Link>
                    ),
                    ["Track"]: (
                      <Link
                        to={`../track-order/${outletOrderId}`}
                        className="btn btn-outline-primary"
                      >
                        <MdOutlineTrackChanges />
                      </Link>
                    ),
                    ["Edit"]:
                      status === "Pending" ? (
                        <Link
                          to={`../../edit/${outletOrderId}`}
                          className="btn btn-info"
                        >
                          <AiFillEdit />
                        </Link>
                      ) : (
                        <button
                          className="btn btn-outline-info hide-btn"
                          disabled
                        >
                          <AiFillEdit />
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
                paginationHandler={responseOutletOrder}
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

// pagination

const mapStateToProps = (state) => {
  return {
    order: state.order,
  };
};

export default connect(mapStateToProps, { getOutletOrders })(OutletOrders);
