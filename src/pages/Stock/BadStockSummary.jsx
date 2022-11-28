import React, { useEffect, useState } from "react";
import { TiPlus } from "react-icons/ti";
import { connect } from "react-redux";

import AddBadStock from "./AddBadStock";
import { Info, Pagination, Title } from "../../components";
import { useLocalStorage } from "../../hooks";
import { getAllBadStockSummary } from "../../store/action";
import { Link } from "react-router-dom";

const BadStockSummary = ({
  badStockSummary,
  singleBadStock,
  getAllBadStockSummary,
}) => {
  const [message, setMessage] = useState("");
  const [loadingMessage, setLoadingMessage] = useState("Loading...");
  const [badRawStock, setBadRawStock] = useState([]);
  const [badByproductStock, setBadByproductStock] = useState([]);

  const { role } = useLocalStorage();

  useEffect(() => {
    document.title = "Syanko Katti Roll - Bad Stock Summary";

    let tempBadRawStock = []; //to prevent duplicate data by rerendering
    let tempBadByproductStock = [];

    getAllBadStockSummary()
      .then(() => {
        setLoadingMessage("");

        badStockSummary.map(({ itemType, itemName, itemCount, acronym }) => {
          itemType === "RawItem"
            ? (tempBadRawStock = [
                ...tempBadRawStock,
                {
                  Name: `${itemName} (${acronym})`,
                  Quantity: itemCount,
                },
              ])
            : (tempBadByproductStock = [
                ...tempBadByproductStock,
                {
                  Name: `${itemName} (${acronym})`,
                  Quantity: itemCount,
                },
              ]);
        });
        setBadRawStock(tempBadRawStock);
        setBadByproductStock(tempBadByproductStock);
      })
      .catch((e) => console.error(e));
  }, [badStockSummary.length, singleBadStock]);

  return (
    <>
      <Title value="Bad Stock Summary" />

      {/* only dispatcher can add bad stock */}
      <>
        {(role === "Dispatcher" || role === "CentralKitchenAdmin") && (
          <>
            {/* add stock info */}
            <Info info={message} />

            <div className="d-flex justify-content-between align-items-center">
              <button
                type="button"
                className="btn btn-outline-primary d-flex align-items-center"
                data-toggle="modal"
                data-target="#add-bad__stock"
              >
                <TiPlus /> Add Bad Stock
              </button>

              <Link
                to="../bad-stock "
                className="btn btn-outline-info float-right"
              >
                Bad Stock Detail
              </Link>
            </div>
            {/* Add Raw Item Stock */}
            <AddBadStock setMessage={setMessage} />
          </>
        )}

        {/* Bad Stock Detail */}
        {loadingMessage || (
          <section id="stock-details " className="mt-4 row">
            {badRawStock.length > 0 && (
              <div
                className={
                  badByproductStock.length > 0 ? "col-md-6" : "col-md-12"
                }
              >
                <h6 className="font-weight-bold ">Bad Raw Stock </h6>
                <Pagination itemsPerPage={50} items={badRawStock} />
              </div>
            )}

            {badByproductStock.length > 0 && (
              <div
                className={badRawStock.length > 0 ? "col-md-6" : "col-md-12"}
              >
                <h6 className="font-weight-bold ">Bad Byproduct Stock</h6>
                <Pagination itemsPerPage={50} items={badByproductStock} />
              </div>
            )}
          </section>
        )}
      </>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    badStockSummary: state.badStockSummary,
    singleBadStock: state.singleBadStock,
  };
};

export default connect(mapStateToProps, { getAllBadStockSummary })(
  BadStockSummary
);
