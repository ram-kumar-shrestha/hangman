import Calendar from "@sbmdkl/nepali-datepicker-reactjs";
import "@sbmdkl/nepali-datepicker-reactjs/dist/index.css";

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { PrintButton, ReportHeader, Table } from "../../components";
import { useLocalStorage } from "../../hooks";
import { getAllOrderBills, getAllDropdownOutlets } from "../../store/action";

const CentralKitchenOrderBillingsReport = ({
  dropdown,
  allOrderBills,
  getAllOrderBills,
  getAllDropdownOutlets,
}) => {
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [status, setStatus] = useState("");
  const [outletName, setOutletName] = useState("");
  const [message, setMessage] = useState("Loading...");
  const { role, outletId } = useLocalStorage();

  useEffect(() => {
    document.title = "Syanko Katti Roll - Byproduct Items Report";

    getAllDropdownOutlets();

    getAllOrderBills(
      outletId !== "null" ? outletId : outletName,
      null,
      null,
      null,
      null,
      "Report",
      fromDate,
      toDate
    )
      .then(() => {
        setMessage("");
      })
      .catch((e) => {
        setMessage(<div className="danger">Something went wrong</div>);
        console.log(e);
      });
  }, [allOrderBills?.bpibvMlst?.length]);

  return (
    <>
      <ReportHeader
        reportName="Byproduct Items  "
        fromDate={fromDate}
        toDate={toDate}
      />

      {/* print and export */}
      <PrintButton
        name="Byproduct Items Report"
        columns={[
          { label: "Outlet", value: "outletName" },
          { label: "Bill Number", value: "billNumber" },
          {
            label: "Net Total(Rs.)",
            value: "netPrice",
          },
          {
            label: "Gross Total (Rs.)",
            value: "grossTotalPrice",
          },
          {
            label: "Date",
            value: "retailNepDate",
          },
          {
            label: "Status",
            value: "isBillCleared",
          },
        ]}
        content={allOrderBills?.bpibvMlst?.map(
          ({
            outletName,
            retailNepDate,
            billNumber,

            isBillCleared,
            netPrice,
            grossTotalPrice,
          }) => {
            return {
              outletName,
              billNumber,
              netPrice,
              grossTotalPrice,
              retailNepDate,
              isBillCleared: isBillCleared ? "Cleared" : "Pending",
            };
          }
        )}
      />

      {/* filter */}
      <div className="d-flex flex-column flex-sm-row justify-content-between mb-2 no-print">
        <div className="d-flex align-items-center">
          <h6 className="mr-2">From</h6>
          <Calendar
            theme="dark"
            className="form-control nepali-date  "
            onChange={({ bsDate }) => {
              setFromDate(bsDate);

              toDate &&
                getAllOrderBills(
                  outletId !== "null" ? outletId : null,
                  null,
                  status,
                  null,
                  null,
                  "Report",
                  bsDate,
                  toDate
                )
                  .then(() => {
                    setMessage("");
                  })
                  .catch((e) => {
                    setMessage(
                      <div className="danger">Something went wrong</div>
                    );
                  });
            }}
            name={`orderTargetNepDate`}
            language="en"
          />
        </div>

        <div className="d-flex align-items-center">
          <h6 className="mr-2">To:</h6>
          <Calendar
            theme="dark"
            className="form-control nepali-date  "
            onChange={({ bsDate }) => {
              setToDate(bsDate);

              toDate &&
                getAllOrderBills(
                  outletId !== "null" ? outletId : null,
                  null,
                  status,
                  null,
                  null,
                  "Report",
                  toDate,
                  bsDate
                )
                  .then(() => {
                    setMessage("");
                  })
                  .catch((e) => {
                    setMessage(
                      <div className="danger">Something went wrong</div>
                    );
                  });
            }}
            name={`orderTargetNepDate`}
            language="en"
          />
        </div>
      </div>
      <div className="d-flex flex-column flex-sm-row justify-content-between mb-2 no-print">
        <select
          name="outlet"
          className="form-control responsive-select__form mt-2"
          onChange={(e) => {
            setOutletName(e.target.value);

            getAllOrderBills(
              e.target.value,
              null,
              status,
              null,
              null,
              "Report",
              fromDate,
              toDate
            )
              .then(() => {
                setMessage("");
              })
              .catch((e) => {
                setMessage(<div className="danger">Something went wrong</div>);
              });
          }}
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

        <select
          name="status"
          className="form-control responsive-select__form mt-2"
          onChange={(e) => {
            setStatus(e.target.value);
            getAllOrderBills(
              outletId !== "null" ? outletId : outletName,
              null,

              e.target.value,
              null,
              null,
              "Report",
              fromDate,
              toDate
            )
              .then(() => {
                setMessage("");
              })
              .catch((e) => {
                setMessage(<div className="danger">Something went wrong</div>);
              });
          }}
        >
          <option value="">Filter By Status</option>
          <option value="Cleared">Cleared</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      {/* data table */}
      {message ||
        (allOrderBills?.bpibvMlst?.length === 0 &&
          setMessage(
            <div className="danger">
              No bill has been issued for given specifications
            </div>
          )) || (
          <>
            <Table
              items={allOrderBills?.bpibvMlst?.map(
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
                    ["Status"]: isBillCleared ? "Cleared" : "Pending",
                  };
                }
              )}
            />
          </>
        )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    allOrderBills: state.allOrderBills,
    dropdown: state.dropdown,
  };
};

export default connect(mapStateToProps, {
  getAllOrderBills,
  getAllDropdownOutlets,
})(CentralKitchenOrderBillingsReport);
