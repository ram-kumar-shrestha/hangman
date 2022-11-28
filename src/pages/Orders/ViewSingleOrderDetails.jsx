import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { FilterContext } from "../../App";

import { Info, LinkButton, RejectModal, Table, Title } from "../../components";
import {
  getSingleOutletOrder,
  completeIncompleteOutletOrder,
  opposeIncompleteOutletOrder,
  getSingleIncompleteOutletOrder,
} from "../../store/action";
import ApproveOutletOrder from "./ApproveOutletOrder";

import "./orders.css";

const ViewSignleOrderDetails = ({
  singleOrder,
  singleIncompleteOrder,
  getSingleOutletOrder,
  opposeIncompleteOutletOrder,
  getSingleIncompleteOutletOrder,
}) => {
  const [refinedOrder, setRefinedOrder] = useState([]);
  const [orderInfo, setOrderInfo] = useState("");
  const [info, setInfo] = useState("");

  const { id } = useParams();

  const {
    orderDetails,
    outletId,
    outletName,
    outletOrderId,
    status,
    orderTargetNepDate,
  } = singleOrder;

  const { approvedOrderDetails, remainingOrderDetails } = singleIncompleteOrder;
  const [rejectModal, setRejectModal] = useState("");

  useEffect(() => {
    document.title = "Syanko Katti Roll - View Order Detail";

    // setting loading info
    setInfo(<div className="text-secondary">Loading...</div>);
    getSingleOutletOrder(id)
      .then(() => {
        setInfo(""); //resetting loading info

        setRefinedOrder(
          orderDetails?.map(({ name, unitacronym, quantity }) => {
            return {
              name: `${name} (${unitacronym})`,
              ["Quantity"]: quantity,
            };
          })
        );
      })
      .catch((e) => {
        setInfo("");
        console.log(e);
      });

    status === "Incomplete"
      ? getSingleIncompleteOutletOrder(id)
          .then(() => {})
          .catch((e) => console.log(e))
      : "";
  }, [id, status, singleOrder.outletOrderId]);

  // reject order
  const handleRejectOrder = () => {
    setRejectModal(<RejectModal id={id} />);
  };

  // force complete incomplete order
  const oppseOrderHandler = () => {
    opposeIncompleteOutletOrder(id)
      .then(() =>
        setOrderInfo({
          desc: "Order Completion completed.",
          type: "success",
        })
      )
      .catch((e) => console.log(e));
  };

  return (
    <>
      {rejectModal}
      <Title value="Order Details" />
      {info}
      <Info info={orderInfo} />

      <ApproveOutletOrder
        setOrderInfo={setOrderInfo}
        outletId={outletId}
        outletOrderId={outletOrderId}
        outletName={outletName}
        orderDetails={
          status === "Incomplete" ? remainingOrderDetails : orderDetails
        }
        status={status}
      />

      {/* {mappedTable} */}
      {/* original detail */}
      <div className="row mt-4">
        <div
          className={` ${
            status === "Incomplete" ? "col-md-4 overflow-none" : "col-md-12"
          }`}
        >
          <h6 className="font-weight-bold">Original Order Detail</h6>

          <Table items={refinedOrder} />
        </div>

        {/* completed order detail */}
        {status === "Incomplete" && approvedOrderDetails ? (
          <>
            <div className="col-md-4">
              <h6 className="font-weight-bold">Completed Order Detail</h6>

              <Table
                items={approvedOrderDetails?.map(
                  ({ name, unitacronym, quantity }) => {
                    //state is not used as the setState in async doesnot
                    return {
                      name: `${name} (${unitacronym})`,
                      ["Quantity"]: quantity,
                    };
                  }
                )}
              />
            </div>
            <div className="col-md-4">
              <h6 className="font-weight-bold">Remaining Order Detail</h6>

              <Table
                items={remainingOrderDetails?.map(
                  ({ name, unitacronym, quantity }) => {
                    //state is not used as the setState in async doesnot
                    return {
                      name: `${name} (${unitacronym})`,
                      ["Quantity"]: quantity,
                    };
                  }
                )}
              />
            </div>
          </>
        ) : null}
      </div>
      {status === "Incomplete" ? (
        <>
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <button
                className={`btn btn-outline-success  `}
                type="button"
                data-toggle="modal"
                data-target="#approve-order"
              >
                Complete
              </button>

              <button
                className={`btn btn-outline-danger ml-2 `}
                type="button"
                onClick={oppseOrderHandler}
              >
                Force Complete
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <button
                className={`btn btn-outline-success ${
                  status === "Approved" ||
                  status === "Rejected" ||
                  status === "Incomplete"
                    ? "d-none"
                    : ""
                }`}
                type="submit"
                data-toggle="modal"
                data-target="#approve-order"
              >
                Approve
              </button>

              <button
                className={`btn btn-outline-danger ml-2 ${
                  status === "Approved" ||
                  status === "Rejected" ||
                  status === "Incomplete"
                    ? "d-none"
                    : ""
                }`}
                type="button"
                data-target="#rejectModal"
                data-toggle="modal"
                onClick={handleRejectOrder}
              >
                Reject
              </button>
            </div>
          </div>
        </>
      )}
      <LinkButton
        href="../ "
        name="Back"
        className="btn btn-info float-right"
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    singleOrder: state.singleOrder,
    singleIncompleteOrder: state.singleIncompleteOrder,
  };
};

export default connect(mapStateToProps, {
  getSingleOutletOrder,
  completeIncompleteOutletOrder,
  opposeIncompleteOutletOrder,
  getSingleIncompleteOutletOrder,
})(ViewSignleOrderDetails);
