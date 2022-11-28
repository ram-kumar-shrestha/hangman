import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Table, Title } from "../../components";
import { useFormatYear } from "../../hooks";
import { getSingleRawItemBilling } from "../../store/action";

const ViewRawStockBilling = ({ singleStock, getSingleRawItemBilling }) => {
  const { id } = useParams();
  const [loadingMessage, setLoadingMessage] = useState(<div>Loading...</div>);

  const billRef = useRef();

  useEffect(() => {
    document.title = "Syanko Katti Roll - Raw Item Bill Detail";

    getSingleRawItemBilling(id)
      .then(() => {
        setLoadingMessage("");
      })
      .catch((e) => {
        console.log(e);
        setLoadingMessage(<div className="danger">Something went wrong</div>);
      });
  }, [singleStock.length, singleStock?.billNumber, id]);

  return (
    <>
      <div className="no-print">
        <Title value="Billing Detail" />
      </div>

      {loadingMessage || (
        <section className="bill" ref={billRef}>
          <div className="d-flex justify-content-between my-2">
            <h1 className="top-section">Vendor: {singleStock.vendorName} </h1>
            <h1 className="top-section">
              Date: {useFormatYear(new Date(singleStock.billingEngDate))}
            </h1>
          </div>

          <div className="d-flex justify-content-between my-2">
            <h1 className="top-section">
              Bill Number: {singleStock.billNumber}
            </h1>
            <h1 className="top-section">
              Discount: {singleStock.discount}&#37;
            </h1>
            <h1 className="top-section">VAT: {singleStock.vat}&#37;</h1>
          </div>

          <Table
            items={singleStock.rawItemBillDetails?.map(
              ({ itemName, unitAcronym, quantity, stockPrice }) => {
                return {
                  ["Item"]: `${itemName} (${unitAcronym})`,
                  quantity,
                  // ["Price (Rs.)"]: stockPrice,
                };
              }
            )}
          />

          <div className="d-flex justify-content-between align-items-center">
            <button
              type="button"
              className="btn btn-info btn-print no-print"
              onClick={() => print()}
            >
              Print
            </button>

            {/* <div className="d-flex flex-column align-items-end ">
              <h1 className="bottom-section mb-2">
                Net Total Price: Rs. {singleStock.netPrice}
              </h1>
              <h1 className="bottom-section">
                Gross Total Price: Rs. {singleStock.grossTotalPrice}
              </h1>
            </div> */}
          </div>
        </section>
      )}
      <Link
        to="../../stock-in-raw-items"
        className="btn btn-outline-info float-right no-print"
      >
        Back
      </Link>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    singleStock: state.singleRawStock,
  };
};
export default connect(mapStateToProps, { getSingleRawItemBilling })(
  ViewRawStockBilling
);
