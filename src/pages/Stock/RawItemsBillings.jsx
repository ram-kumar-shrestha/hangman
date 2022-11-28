import React, { useEffect, useState } from "react";
import { BiDetail } from "react-icons/bi";
import { TiPlus } from "react-icons/ti";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  CustomPagination,
  Info,
  Pagination,
  Table,
  Title,
} from "../../components";
import { useFormatDate, useLocalStorage } from "../../hooks";
import { getAllRawItemBillings } from "../../store/action";
import AddRawStock from "./AddRawStock";

const RawItemsBilling = ({ stock, singleStock, getAllRawItemBillings }) => {
  const [message, setMessage] = useState({});
  const [loadingMessage, setLoadingMessage] = useState(<div>Loading...</div>);
  const { role } = useLocalStorage();

  const responseRawStockBillings = (pageNumber, pageSize) => {
    getAllRawItemBillings(pageNumber, pageSize)
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
  }, [singleStock]);

  return (
    <>
      {/* add stock info */}
      <Info info={message} />

      <Title value="Raw Items Billings" />
      <div className="row d-sm-flex justify-content-between  container p-0 m-0">
        <div className="d-flex justify-content-between d-sm-block col-12 col-md-6 p-0">
          <Link
            to={`${
              role === "Dispatcher" ? "/dispatcher" : "/central-kitchen"
            }/inventory/raw-items`}
            className="btn btn-outline-info mr-4"
          >
            View Inventory
          </Link>
          <Link
            to={`${
              role === "Dispatcher" ? "/dispatcher" : "/central-kitchen"
            }/stock/stock-in-raw-items/all`}
            className="btn btn-outline-primary"
          >
            View Raw Stock
          </Link>
        </div>

        <button
          className="btn btn-primary d-flex align-items-center  mt-2 m-sm-0"
          data-toggle="modal"
          data-target="#add-raw__items"
        >
          <TiPlus />
          Add Raw Item
        </button>
      </div>

      {/* Add Raw Item Stock */}
      <AddRawStock setMessage={setMessage} />

      {/* Raw Items Details */}
      {loadingMessage || (
        <>
          <Table
            items={stock?.data?.map(
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
                  // ["Net Total (Rs.)"]: netPrice,
                  // ["Gross Total  (Rs.)"]: grossTotalPrice,
                  // ["Stocked By"]: userName,
                  // ["Date"]: useFormatDate(new Date(billingEngDate)),
                  ["Billing Date"]: billingNepDate,
                  ["Detail"]: (
                    <Link
                      to={
                        (role === "Dispatcher"
                          ? "/dispatcher/"
                          : "/central-kitchen/") +
                        "stock/raw-item-stock-billing/" +
                        `${rawItemBillingId}`
                      }
                      className="btn btn-outline-info"
                    >
                      <BiDetail />
                    </Link>
                  ),
                };
              }
            )}
          />

          {/* Pagination */}
          {stock?.totalPage > 1 && (
            <CustomPagination
              totalPages={stock?.totalPage}
              paginationHandler={responseRawStockBillings}
              currentPage={stock?.pageNumber}
              prevPage={stock?.previousPage}
              nextPage={stock?.nextPage}
            />
          )}
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
})(RawItemsBilling);
