import React from "react";
import Logo from "../logo";
import Title from "../title";

let date = new Date();
date = date.toLocaleDateString();

const ReportHeader = ({ reportName, fromDate, toDate }) => {
  return (
    <>
      <div className="row mt-2 mb-5 align-items-center ">
        <div className="col-md-2 text-center">
          <Logo />
        </div>

        <div className="col-md-8">
          <Title value="Syanko Katti Roll" />
          <h6 className="text-center font-weight-bold">Inventory</h6>
          <h6
            className="text-center font-weight-bold"
            style={{ fontSize: "0.8em" }}
          >
            {reportName} Report
          </h6>
        </div>

        <h6 className="col-md-2 text-center mt-4">Date: {date}</h6>
      </div>

      <p className="text-center print mb-0">{reportName.toUpperCase()} </p>

      <p className="text-center">
        Report Date: {fromDate} to {toDate}
      </p>
    </>
  );
};

export default ReportHeader;
