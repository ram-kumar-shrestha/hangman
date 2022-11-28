import Calendar from "@sbmdkl/nepali-datepicker-reactjs";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { PrintButton, ReportHeader, Table } from "../../components";

import {
  getAllDropdownByproducts,
  getByproductItemWiseReport,
} from "../../store/action";

const CentralKitchenByproductItemWiseReport = ({
  report,
  dropdown,
  getByproductItemWiseReport,
  getAllDropdownByproducts,
}) => {
  const [toDate, setToDate] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [byProductItemId, setByProductItemId] = useState(null);
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    document.title = "Syanko Katti Roll - Sales Report";

    getAllDropdownByproducts();

    getByproductItemWiseReport(byProductItemId || null, fromDate, toDate)
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
        reportName="Byproduct Item Wise"
        fromDate={fromDate}
        toDate={toDate}
      />

      {/* export and print */}
      <PrintButton
        name="Byproduct Item Wise"
        columns={[
          { label: "Name", value: "name" },
          { label: "Batch Number", value: "batchNo" },
          {
            label: "Manufactured Date",
            value: "manufactureNepDate",
          },
          {
            label: "Expiry Date",
            value: "expiredNepDate",
          },
          {
            label: "Total",
            value: "total",
          },
          {
            label: "Remaining",
            value: "remaining",
          },
          {
            label: "Indgredients Name",
            value: "indgredientsName",
          },
          {
            label: "Indgredients Quantity",
            value: "indgredientsQuantity",
          },
          {
            label: "Indgredients Unit",
            value: "indgredientsUnit",
          },
        ]}
        content={report?.map(
          ({
            byProductItem,
            finishedItemQuantityDetails,
            finishedItemIngredientDetails,
            batchNo,
            manufactureNepDate,
            expiredNepDate,
          }) => {
            return finishedItemIngredientDetails?.map((item) => {
              return {
                name: `${byProductItem.name} (${byProductItem.acronym})`,
                batchNo,
                manufactureNepDate,
                expiredNepDate,
                ["total"]: finishedItemQuantityDetails[0].totalQuantity,
                ["remaining"]: finishedItemQuantityDetails[0].quantityRemaining,
                ["indgredientsName"]: item.ingrediantName,
                ["indgredientsQuantity"]: item.quantity,
                ["indgredientsUnit"]: item.acronym,
              };
            });
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
                getByproductItemWiseReport(
                  byProductItemId,
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
                getByproductItemWiseReport(
                  byProductItemId,
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

        <select
          name="outlet"
          className="form-control responsive-select__form "
          onChange={(e) => {
            setByProductItemId(e.target.value);

            getByproductItemWiseReport(e.target.value, fromDate, toDate);
          }}
        >
          <option value="-1" key="">
            Itemwise Filter
          </option>
          {dropdown?.map((byProductItem) => {
            return (
              <option
                value={byProductItem.byProductItemId}
                key={byProductItem.byProductItemId}
              >
                {byProductItem.name}
              </option>
            );
          })}
        </select>
      </div>

      {/* data table */}
      {message ||
        (report?.length === 0 &&
          setMessage(
            <div className="danger">No byproduct for given specifications</div>
          )) || (
          <>
            <Table
              items={report?.map(
                ({
                  manufacturedDate,
                  byProductItem,
                  finishedItemQuantityDetails,
                  finishedItemIngredientDetails,
                  batchNo,
                  expiredEngDate,
                  manufactureNepDate,
                  expiredNepDate,
                }) => {
                  const ingredients = finishedItemIngredientDetails.map(
                    ({ ingrediantName, quantity, acronym }) => {
                      return ` ${ingrediantName} (${quantity + acronym})`;
                    }
                  );

                  // console.log(ingredients)
                  return {
                    name: `${byProductItem.name} (${byProductItem.acronym})`,
                    ["Batch"]: batchNo,
                    // ["Manufactured Date"]: useFormatDate(
                    //   new Date(manufacturedDate)
                    // ),
                    // ["Expiry Date"]: useFormatYear(new Date(expiredEngDate)),
                    ["Manufactured Date"]: manufactureNepDate,
                    ["Expiry Date"]: expiredNepDate,
                    ["Total "]: finishedItemQuantityDetails[0].totalQuantity,
                    ["Remaining "]:
                      finishedItemQuantityDetails[0].quantityRemaining,
                    ["Indgredients"]: `${ingredients}`,
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
  getByproductItemWiseReport,
  getAllDropdownByproducts,
})(CentralKitchenByproductItemWiseReport);
