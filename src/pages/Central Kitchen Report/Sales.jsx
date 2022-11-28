import Calendar from "@sbmdkl/nepali-datepicker-reactjs";

import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { PrintButton, ReportHeader, Table } from "../../components";
import { useLocalStorage } from "../../hooks";
import { getSalesReport, getAllDropdownOutlets } from "../../store/action";

const CentralKitchenSalesReport = ({
  report,
  dropdown,
  getSalesReport,
  getAllDropdownOutlets,
}) => {
  const [toDate, setToDate] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [outletName, setOutletName] = useState(null);
  const [message, setMessage] = useState("Loading...");
  const { role, outletId } = useLocalStorage();

  useEffect(() => {
    document.title = "Syanko Katti Roll - Sales Report";

    getAllDropdownOutlets();

    getSalesReport(
      outletId !== "null" ? outletId : outletName,
      fromDate,
      toDate
    )
      .then((data) => {
        setMessage("");
      })
      .catch((e) => {
        setMessage(<div className="danger">Something went wrong</div>);
        console.error(e);
      });
  }, [report?.length]);

  return (
    <>
      <ReportHeader
        reportName="Sales Customer Wise"
        fromDate={fromDate}
        toDate={toDate}
      />

      {/* export and print */}
      <PrintButton
        name="Sales Report"
        columns={[
          { label: "NUMBER/MITI", value: "billNumberOrDate" }, // Top level data
          { label: "CUSTOMER/PRODUCT", value: "customerOrProduct" }, // Custom format
          {
            label: "QUANTITY",
            value: "quantity",
          },
          {
            label: "RATE",
            value: "rate",
          },
          {
            label: "NET AMT",
            value: "netAmount",
          }, // Run functions
        ]}
        content={report}
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
                getSalesReport(
                  outletId !== "null" ? outletId : outletName,
                  bsDate,
                  toDate
                ).then(() => {
                  setMessage("");
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

              fromDate &&
                getSalesReport(
                  outletId !== "null" ? outletId : outletName,
                  fromDate,
                  bsDate
                ).then(() => {
                  setMessage("");
                });
            }}
            name={`orderTargetNepDate`}
            language="en"
          />
        </div>

        {(role === "CentralKitchenAdmin" ||
          role === "CentralKitchenOwner" ||
          role === "SystemAdmin") && (
          <select
            name="outlet"
            className="form-control responsive-select__form mt-2"
            onChange={(e) => {
              setOutletName(e.target.value);

              getSalesReport(
                outletId !== "null" ? outletId : e.target.value,
                fromDate,
                toDate
              );
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
        )}
      </div>

      {/* data table */}
      {message ||
        (report?.length === 0 &&
          setMessage(
            <div className="danger">No sales for given specifications</div>
          )) || (
          <>
            <Table
              isSN={false}
              items={report?.map(
                ({
                  billNumberOrDate,
                  customerOrProduct,
                  quantity,
                  rate,
                  netAmount,
                }) => {
                  return {
                    ["NUMBER / MITI"]: billNumberOrDate,
                    ["CUSTOMER / PRODUCT"]: customerOrProduct,
                    ["QUANTIY"]: quantity,
                    ["RATE"]: rate,
                    ["NET AMT"]: netAmount,
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
    report: state.report,
    dropdown: state.dropdown,
  };
};

export default connect(mapStateToProps, {
  getSalesReport,
  getAllDropdownOutlets,
})(CentralKitchenSalesReport);
