import React, { useContext, useEffect, useState } from "react";
import { BiDetail } from "react-icons/bi";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FilterContext } from "../../App";

import {
  CustomPagination,
  ModalLayout,
  NepaliDateWithResetButton,
  Table,
  Title,
  ToggleStatus,
} from "../../components";
import { useLocalStorage } from "../../hooks";
import {
  getAllOrderBills,
  getAllDropdownOutlets,
  toggleBillingStatus,
} from "../../store/action";

import "./billings.css";
const OrderBillings = ({
  dropdown,
  allOrderBills,
  singleOrderBill,
  getAllOrderBills,
  getAllDropdownOutlets,
  toggleBillingStatus,
}) => {
  const [nepaliDate, setNepaliDate] = useState("");
  const [status, setStatus] = useState(""); //for filtering purpose
  const [billStatus, setBillStatus] = useState("");
  const [billNo, setBillNo] = useState("");
  const [billId, setBillId] = useState("");
  const [outletName, setOutletName] = useState("");
  const [message, setMessage] = useState("Loading...");
  const { role, outletId } = useLocalStorage();

  const context = useContext(FilterContext);

  let baseLink;
  if (role === "Dispatcher") {
    baseLink = "/dispatcher/outlet-order-billings";
  } else if (role === "CentralKitchenAdmin") {
    baseLink = "/central-kitchen/outlet-order-billings";
  } else {
    baseLink = "/outlet/billings";
  }

  const responseBillings = (pageNumber = null, pageSize = null) => {
    // preventing from sending ?OutletId=null in query for Dispatcher
    getAllOrderBills(
      context.filterStateAllBillings.outletId ||
        (outletId !== "null" ? outletId : outletName),
      context.filterStateAllBillings.date === "reset"
        ? null
        : context.filterStateAllBillings.date || nepaliDate,
      context.filterStateAllBillings.status || null,
      pageNumber,
      pageSize
    )
      .then(() => {
        setMessage("");
        context.filterStateAllBillings.date === "reset" &&
          context.setFilterStateAllBillings((prev) => ({
            ...prev,
            date: "reset",
          }));
      })
      .catch((e) => {
        setMessage(<div className="danger">Something went wrong</div>);
        console.log(e);
      });
  };

  useEffect(() => {
    document.title = "Syanko Katti Roll - All Order Bills";
  }, [billId]);

  useEffect(() => {
    getAllDropdownOutlets();
    nepaliDate && responseBillings();
  }, [singleOrderBill]);

  console.log(context.filterStateAllBillings);
  return (
    <>
      <Title value="All Order Bills" />

      <div className="d-flex flex-column flex-sm-row justify-content-between mb-2">
        {/* <input
          type="Date"
          className="form-control w-25"
          onChange={(e) => {
            setDate(e.target.value);
            getOutletOrders(null, e.target.value, status);
          }}
        /> */}

        <NepaliDateWithResetButton
          setNepaliDate={setNepaliDate}
          outletId={outletId}
          status={status}
          getAllOrderBills={getAllOrderBills}
          setMessage={setMessage}
          styleName="billings"
        />

        {(role === "Dispatcher" || role === "CentralKitchenAdmin") && (
          <select
            name="outlet"
            className="form-control responsive-select__form mt-2 mr-2"
            onChange={(e) => {
              setOutletName(e.target.value);
              context.setFilterStateAllBillings((prev) => ({
                ...prev,
                outletId: e.target.value,
              }));

              getAllOrderBills(
                e.target.value,
                context.filterStateAllBillings.date === "reset"
                  ? null
                  : context.filterStateAllBillings.date || nepaliDate,
                context.filterStateAllBillings.status || status
              )
                .then(() => {
                  setMessage("");
                })
                .catch((e) => {
                  e === 404
                    ? setMessage(
                        <div className="danger">
                          No bill has been issued for given specifications
                        </div>
                      )
                    : setMessage(
                        <div className="danger">Something went wrong</div>
                      );
                });
            }}
            value={context.filterStateAllBillings.outletId}
          >
            <option value="" key="">
              Filter By Outlet
            </option>
            {dropdown?.map((outlet) => {
              return (
                <option value={outlet.outletId} key={outlet.outletId}>
                  {outlet.name}
                </option>
              );
            })}
          </select>
        )}

        <select
          name="status"
          className="form-control responsive-select__form mt-2"
          onChange={(e) => {
            setStatus(e.target.value);
            context.setFilterStateAllBillings((prev) => ({
              ...prev,
              status: e.target.value,
            }));
            getAllOrderBills(
              context.filterStateAllBillings.outletId ||
                (outletId !== "null" ? outletId : outletName),
              context.filterStateAllBillings.date === "reset"
                ? null
                : context.filterStateAllBillings.date || nepaliDate,
              e.target.value
            )
              .then(() => {
                setMessage("");
              })
              .catch((e) => {
                e === 404
                  ? setMessage(
                      <div className="danger">
                        No bill has been issued for given specifications
                      </div>
                    )
                  : setMessage(
                      <div className="danger">Something went wrong</div>
                    );
              });
          }}
          value={context.filterStateAllBillings.status}
        >
          <option value="">Filter By Status</option>
          <option value="Cleared">Cleared</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      {/**modal for bill clearing */}
      {/* only for billings */}

      <ModalLayout
        id={`clear-bill-${billNo}`}
        modalType="Clear"
        title="Clear Bill"
        billClearHandle={(e) => {
          e.preventDefault();

          // removing customized bootstrap modal
          $(`#clear-bill-${billNo}`).modal("hide");

          !billStatus ? toggleBillingStatus(billId) : null; //only call api if bill is not cleared;
        }}
      >
        <h6 className="text-bold mt-2">
          Are you sure to clear bill <strong>{billNo}</strong>?
        </h6>
      </ModalLayout>

      {message ||
        (allOrderBills?.data?.length === 0 &&
          setMessage(
            <div className="danger">
              No bill has been issued for given specifications
            </div>
          )) || (
          <>
            <Table
              items={allOrderBills?.data?.map(
                ({
                  outletName,
                  // retailEngDate,
                  retailNepDate,
                  billNumber,
                  discount,
                  vat,
                  isBillCleared,
                  netPrice,
                  grossTotalPrice,
                  byProductItemBillingId,
                }) => {
                  return {
                    ["Outlet"]: outletName,
                    ["Bill Number"]: billNumber,
                    // ['Discount (%)']: discount,
                    // ['VAT (%)']: vat,
                    ["Net Total(Rs.)"]: netPrice,
                    ["Gross Total (Rs.)"]: grossTotalPrice,
                    ["Date"]: retailNepDate,
                    ["Status"]: (
                      <div
                        className={
                          role === "Dispatcher" ||
                          role === "CentralKitchenAdmin"
                            ? null
                            : isBillCleared
                            ? "cleared"
                            : "pending"
                        }
                        onClick={() => {
                          setBillNo(billNumber);
                          setBillStatus(isBillCleared);
                          setBillId(byProductItemBillingId);

                          context.filterStateAllBillings.date === "reset" &&
                            context.setfilterStateAllBillings((prev) => ({
                              ...prev,
                              date: "reset",
                            }));
                        }}
                      >
                        {role === "Dispatcher" ||
                        role === "CentralKitchenAdmin" ? (
                          <ToggleStatus
                            status={isBillCleared}
                            billNumber={billNumber}
                          />
                        ) : isBillCleared ? (
                          "Cleared"
                        ) : (
                          "Pending"
                        )}
                      </div>
                    ),
                    ["Detail"]: (
                      <button
                        onClick={() =>
                          context.filterStateAllBillings.date === "reset" ||
                          context.setFilterStateAllBillings((prev) => ({
                            ...prev,
                            date: retailNepDate,
                          }))
                        }
                      >
                        <Link
                          to={baseLink + `/${byProductItemBillingId}`}
                          className="btn btn-outline-info"
                        >
                          <BiDetail />
                        </Link>
                      </button>
                    ),
                  };
                }
              )}
            />

            {nepaliDate && (
              <p className="gross-total ">
                gross total billings of {nepaliDate}:
                <b> Rs. {allOrderBills?.grossTotal}</b>
              </p>
            )}

            {allOrderBills?.totalPage > 1 && (
              <CustomPagination
                totalPages={allOrderBills?.totalPage}
                paginationHandler={responseBillings}
                currentPage={allOrderBills?.pageNumber}
                prevPage={allOrderBills?.previousPage}
                nextPage={allOrderBills?.nextPage}
              />
            )}
          </>
        )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    allOrderBills: state.allOrderBills,
    singleOrderBill: state.singleOrderBill,
    dropdown: state.dropdown,
  };
};

export default connect(mapStateToProps, {
  getAllOrderBills,
  getAllDropdownOutlets,
  toggleBillingStatus,
})(OrderBillings);
