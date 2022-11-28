import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Calendar from "@sbmdkl/nepali-datepicker-reactjs";
import "@sbmdkl/nepali-datepicker-reactjs/dist/index.css";

import { PrintButton, ReportHeader, Table } from "../../components";
import { getAllRawItemBillings } from "../../store/action";

const CentralKitchenRawItemBillingsReport = ({
  stock,
  singleStock,
  getAllRawItemBillings,
}) => {
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [loadingMessage, setLoadingMessage] = useState(<div>Loading...</div>);

  const responseRawStockBillings = (pageNumber, pageSize) => {
    getAllRawItemBillings(pageNumber, pageSize, "Report", fromDate, toDate)
      .then(() => {
        setLoadingMessage("");
      })
      .catch((e) =>
        setLoadingMessage(<div className="danger">Something went wrong</div>)
      );
  };
  useEffect(() => {
    document.title = "Syanko Katti Roll - Raw Items";

    responseRawStockBillings();
  }, [stock?.length]);

  return (
    <>
      <ReportHeader
        reportName="Raw Items Billings"
        fromDate={fromDate}
        toDate={toDate}
      />

      {/* export and print */}
      <PrintButton
        name="Raw Items Billings Report"
        columns={[
          { label: "Vendor", value: "vendorName" },
          { label: "Bill Number", value: "billNumber" },
          {
            label: "Net Total (Rs.)",
            value: "netPrice",
          },
          {
            label: "Gross Total  (Rs.)",
            value: "grossTotalPrice",
          },
          {
            label: "Date",
            value: "billingNepDate",
          },
        ]}
        content={stock}
      />

      {/* filter */}
      <div className="d-flex flex-column flex-sm-row justify-content-between mb-2 no-print">
        <div className="d-flex align-items-center">
          <h6 className="mr-2">From: </h6>
          <Calendar
            theme="dark"
            className="form-control nepali-date  "
            onChange={({ bsDate }) => {
              setFromDate(bsDate);

              toDate &&
                getAllRawItemBillings(null, null, "Report", bsDate, toDate)
                  .then(() => {
                    setLoadingMessage("");
                  })
                  .catch((e) =>
                    setLoadingMessage(
                      <div className="danger">Something went wrong</div>
                    )
                  );
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
                getAllRawItemBillings(null, null, "Report", fromDate, bsDate)
                  .then(() => {
                    setLoadingMessage("");
                  })
                  .catch((e) =>
                    setLoadingMessage(
                      <div className="danger">Something went wrong</div>
                    )
                  );
            }}
            name={`orderTargetNepDate`}
            language="en"
          />
        </div>
      </div>

      {/* Raw Items Details */}
      {loadingMessage ||
        (stock.length == 0 &&
          setLoadingMessage(
            <div className="danger">
              No raw items has been purchased during this time
            </div>
          )) || (
          <>
            <Table
              items={stock?.map(
                ({
                  rawItemBillingId,
                  vendorName,
                  discount,
                  vat,
                  netPrice,
                  grossTotalPrice,
                  userName,
                  billingEngDate,
                  billingNepDate,
                }) => {
                  return {
                    ["Vendor"]: vendorName,
                    // ['Discount (%)']: discount,
                    // ['VAT (%)']: vat,
                    ["Net Total (Rs.)"]: netPrice,
                    ["Gross Total  (Rs.)"]: grossTotalPrice,
                    // ["Stocked By"]: userName,
                    // ["Date"]: useFormatDate(new Date(billingEngDate)),
                    ["Date"]: billingNepDate,
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
    stock: state.rawStockBilling,
    singleStock: state.singleRawStock,
  };
};

export default connect(mapStateToProps, {
  getAllRawItemBillings,
})(CentralKitchenRawItemBillingsReport);
