import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { FilterContext } from "../../App";
import { Logo, Table, Title } from "../../components";
import { useFormatYear, useLocalStorage } from "../../hooks";
import { getSingleOrderBill } from "../../store/action";

const SingleOutletBilling = ({ singleOrderBill, getSingleOrderBill }) => {
  const [message, setMessage] = useState("");
  const { id } = useParams();

  const { role } = useLocalStorage();

  useEffect(() => {
    document.title = "Syanko Katti Roll - Billing Detail";

    setMessage("Loading...");

    getSingleOrderBill(id)
      .then((data) => {
        setMessage("");
      })
      .catch((e) => {
        setMessage("");
        console.log(e);
      });
  }, [id]);

  return (
    <>
      <div className="no-print">
        <Title value="Billing Details " />
      </div>

      {message || (
        <section className="bill">
          <div className="d-flex flex-column align-items-center mb-4">
            <Logo />

            <h1 className="bill-title">Syanko Katti Roll</h1>
            <h1 className="bill-subtitle">Central Kitchen</h1>
          </div>

          <div className="d-flex justify-content-between my-2">
            <h1 className="top-section">
              Outlet: {singleOrderBill.outletName}
            </h1>
            <h1 className="top-section">
              Date: {singleOrderBill.retailNepDate}
            </h1>
          </div>
          <div className="d-flex justify-content-between my-2">
            <h1 className="top-section">
              Bill Number: {singleOrderBill.billNumber}
            </h1>
            <h1 className="top-section">
              Discount: {singleOrderBill.discount}&#37;
            </h1>
            <h1 className="top-section">VAT: {singleOrderBill.vat}&#37;</h1>
          </div>
          {/* Bill Items Detail */}

          <Table
            items={singleOrderBill.byProductItemBillQuantityDetails?.map(
              ({ byProductName, quantity, stockPrice }) => {
                return {
                  ["Item"]: byProductName,
                  ["Quantity"]: quantity,
                  ["Price (Rs.)"]: stockPrice,
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

            <div className="d-flex flex-column align-items-end ">
              <h1 className="bottom-section mb-2">
                Net Total Price: Rs. {singleOrderBill.netPrice}
              </h1>
              <h1 className="bottom-section">
                Gross Total Price: Rs. {singleOrderBill.grossTotalPrice}
              </h1>
            </div>
          </div>
        </section>
      )}
      <Link
        to={
          role === "Dispatcher" || role === "CentralKitchenAdmin"
            ? "../all"
            : "../"
        }
        className="btn btn-outline-info float-right no-print"
      >
        Back
      </Link>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    singleOrderBill: state.singleOrderBill,
  };
};

export default connect(mapStateToProps, { getSingleOrderBill })(
  SingleOutletBilling
);
