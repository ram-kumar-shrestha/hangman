import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Pagination } from "../../components";
import {
  getAllDropdownOutlets,
  getOutletOrderForAdvanceFilter,
  getItemsForAdvanceFilter,
} from "../../store/action";

import Calendar from "@sbmdkl/nepali-datepicker-reactjs";
import "@sbmdkl/nepali-datepicker-reactjs/dist/index.css";

const ViewAllOrdersDetails = ({
  dropdown,
  outletFilter,
  itemFilter,
  getAllDropdownOutlets,
  getOutletOrderForAdvanceFilter,
  getItemsForAdvanceFilter,
}) => {
  const [nepaliDate, setNepaliDate] = useState("");

  useEffect(() => {
    document.title = "Syanko Katti Roll - Advanced Search";
    getAllDropdownOutlets()
      .then(() => {})
      .catch((e) => console.log(e));

    nepaliDate && getItemsForAdvanceFilter(nepaliDate);
  }, [nepaliDate]);

  // only query if there is outletid
  useEffect(() => {
    nepaliDate &&
      getOutletOrderForAdvanceFilter(nepaliDate, dropdown[0]?.outletId);
  }, [dropdown[0]?.outletId]);

  return (
    <>
      <h5 className=" text-center font-weight-bold">All Orders</h5>

      <div className="row justify-content-between container mt-2 p-0 pl-sm-3">
        <select
          className="form-control col-md-3 "
          onChange={(e) => {
            getOutletOrderForAdvanceFilter(nepaliDate, e.target.value);
          }}
        >
          {dropdown?.map((outlet) => (
            <option value={outlet.outletId} key={outlet.outletId}>
              {outlet.name}
            </option>
          ))}
        </select>

        {/* <input
          type="date"
          className="form-control col-md-2 mb-2"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);

            e.target.value !== "" &&
              (getOutletOrderForAdvanceFilter(e.target.value, formOutletId),
              getItemsForAdvanceFilter(e.target.value));
          }}
        /> */}

        <Calendar
          theme="dark"
          className="form-control mt-2 nepali-date"
          onChange={({ bsDate }) => {
            setNepaliDate(bsDate);

            nepaliDate !== "" &&
              (getOutletOrderForAdvanceFilter(bsDate, dropdown[0]?.outletId),
              getItemsForAdvanceFilter(bsDate));
          }}
          name={`orderTargetNepDate`}
          language="en"
        />
      </div>

      <div className="row">
        <div className="col-md-8">
          <h6 className="mt-4 font-weight-bold">Outlet Order Detail</h6>

          <Pagination
            itemsPerPage={50}
            items={outletFilter?.map(({ itemName, unitAcronym, itemCount }) => {
              return {
                ["Item"]: `${itemName} (${unitAcronym})`,
                ["Quantity"]: itemCount,
              };
            })}
          />
        </div>
        <div className="col-md-4">
          <h6 className="mt-4 font-weight-bold">Items Details</h6>

          <Pagination
            itemsPerPage={50}
            items={itemFilter?.map(({ itemName, acronym, itemCount }) => {
              return {
                ["Item"]: `${itemName} (${acronym})`,
                ["Quantity"]: itemCount,
              };
            })}
          />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    dropdown: state.dropdown,
    outletFilter: state.outletFilter,
    itemFilter: state.itemFilter,
  };
};

export default connect(mapStateToProps, {
  getAllDropdownOutlets,
  getOutletOrderForAdvanceFilter,
  getItemsForAdvanceFilter,
})(ViewAllOrdersDetails);
