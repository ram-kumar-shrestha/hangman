import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { TiPlus } from "react-icons/ti";

import {
  CustomPagination,
  Info,
  Pagination,
  PrintButton,
  Table,
  Title,
} from "../../components";
import { useFormatDate, useFormatYear, useLocalStorage } from "../../hooks";
import { getAllRawItems } from "../../store/action";

import "./stock.css";
import AddRawStock from "./AddRawStock";

const RawItems = ({ stock, singleStock, getAllRawItems }) => {
  const [message, setMessage] = useState({});
  const [loadingMessage, setLoadingMessage] = useState(<div>Loading...</div>);
  const { role } = useLocalStorage();

  const responseRawStock = (pageNumber, pageSize) => {
    getAllRawItems(pageNumber, pageSize)
      .then(() => {
        setLoadingMessage("");
      })
      .catch((e) =>
        setLoadingMessage(<div className="danger">Something went wrong</div>)
      );
  };

  useEffect(() => {
    document.title = "Syanko Katti Roll - Raw Items";

    responseRawStock();
  }, [singleStock.rawItemBillingId]);

  return (
    <>
      {/* add stock info */}
      <Info info={message} />

      {/* export and print */}
      <PrintButton
        name="Raw Items"
        columns={[
          { label: "Vendor", value: "vendorName" },
          { label: "Item", value: "Item" },
          {
            label: "Batch",
            value: "batchNo",
          },
          {
            label: "Purchased Date",
            value: "purchaseNepDate",
          },
          {
            label: "Expiry Date",
            value: "expiredNepDate",
          },
          {
            label: "Total Quantity",
            value: "Total Quantity",
          },
          {
            label: "Remaining Quantity",
            value: "Remaining Quantity",
          },
        ]}
        content={stock?.data?.map(
          ({
            vendorName,
            purchaseNepDate,
            itemName,
            acronym,
            rawStockQuantityDetails,
            batchNo,
            expiredNepDate,
          }) => {
            return {
              vendorName,
              ["Item"]: `${itemName} (${acronym})`,
              batchNo,
              purchaseNepDate,
              expiredNepDate,
              ["Total Quantity"]: rawStockQuantityDetails[0]?.totalQuantity,
              ["Remaining Quantity"]:
                rawStockQuantityDetails[0]?.quantityRemaining,
            };
          }
        )}
      />

      <Title value="Raw Items" />

      {/* action btns */}
      <div className="d-flex justify-content-between align-items-center no-print">
        <Link
          to={`${
            role === "Dispatcher" ? "/dispatcher" : "/central-kitchen"
          }/inventory/raw-items`}
          className="btn btn-outline-info"
        >
          View Inventory
        </Link>
        <button
          className="btn btn-primary d-flex align-items-center "
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
                vendorName,
                purchaseEngDate,
                purchaseNepDate,
                itemName,
                acronym,
                rawStockQuantityDetails,
                batchNo,
                expiredEngDate,
                expiredNepDate,
              }) => {
                return {
                  ["Vendor"]: vendorName,
                  ["Item"]: `${itemName} (${acronym})`,
                  ["Batch"]: batchNo,
                  // ["Purchased Date"]: useFormatDate(new Date(purchaseEngDate)),
                  // ["Expired Date"]: useFormatYear(
                  //   new Date(expiredEngDate)
                  // ).toLocaleString(),
                  ["Purchased Date"]: purchaseNepDate,
                  ["Expired Date"]: expiredNepDate,
                  ["Total Quantity"]: rawStockQuantityDetails[0]?.totalQuantity,
                  ["Remaining Quantity"]:
                    rawStockQuantityDetails[0]?.quantityRemaining,
                };
              }
            )}
          />

          {/* Pagination */}
          {stock?.totalPage > 1 && (
            <CustomPagination
              totalPages={stock?.totalPage}
              paginationHandler={responseRawStock}
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
    stock: state.rawStock,
    singleStock: state.singleRawStock,
  };
};

export default connect(mapStateToProps, { getAllRawItems })(RawItems);
