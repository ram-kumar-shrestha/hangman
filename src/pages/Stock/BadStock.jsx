import React, { useEffect, useState } from "react";
import { TiPlus } from "react-icons/ti";
import { connect } from "react-redux";

import AddBadStock from "./AddBadStock";
import {
  CustomPagination,
  Info,
  Pagination,
  Table,
  Title,
} from "../../components";
import { useLocalStorage } from "../../hooks";
import { getAllBadStock } from "../../store/action";
import { Link } from "react-router-dom";

const BadStock = ({ badStock, singleBadStock, getAllBadStock }) => {
  const [message, setMessage] = useState("");
  const [loadingMessage, setLoadingMessage] = useState("Loading...");
  const [itemType, setItemType] = useState("");
  const [stockType, setStockType] = useState("");

  const { role } = useLocalStorage();

  const responseBadStock = (pageNumber, pageSize) => {
    getAllBadStock(stockType, itemType, pageNumber, pageSize)
      .then(() => {
        setLoadingMessage("");
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    document.title = "Syanko Katti Roll - Bad Stock";

    responseBadStock();
  }, [singleBadStock]);

  return (
    <>
      <Title value="Bad Stocks" />

      {/* only dispatcher can add bad stock */}
      <>
        {(role === "Dispatcher" || role === "CentralKitchenAdmin") && (
          <>
            {/* add stock info */}
            <Info info={message} />
            <div className="d-flex flex-column flex-sm-row justify-content-around align-items-center">
              <button
                type="button"
                className="btn btn-outline-primary d-flex align-items-center justify-content-center col-12 col-sm-auto mt-2 "
                data-toggle="modal"
                data-target="#add-bad__stock"
              >
                <TiPlus /> Add Bad Stock
              </button>

              <select
                name="status"
                className="form-control col-md-3 mt-2"
                onChange={(e) => {
                  setStockType(e.target.value);
                  getAllBadStock(e.target.value, itemType);
                }}
              >
                <option value="">Stock Type</option>
                <option value="Defective">Defective Stock</option>
                <option value="Loss">Loss Stock</option>
                <option value="Expired">Expired Stock</option>
              </select>

              <select
                name="status"
                className="form-control col-md-3 mt-2"
                onChange={(e) => {
                  setItemType(e.target.value);
                  getAllBadStock(stockType, e.target.value);
                }}
              >
                <option value="">All Items</option>
                <option value="raw">RawItem</option>
                <option value="finished">Finished/Byproduct</option>
              </select>

              <Link
                to="../bad-stock-summary"
                className="btn btn-outline-info mt-2 col-md-3"
              >
                Stock Summary
              </Link>
            </div>

            {/* Add Raw Item Stock */}
            <AddBadStock setMessage={setMessage} />
          </>
        )}

        {/* Bad Stock Detail */}
        {loadingMessage ||
          (badStock?.data.length === 0 && (
            <div className="danger">No items in bad stock!</div>
          )) || (
            <>
              <Table
                items={badStock?.data.map(
                  ({
                    stockName,
                    unitAcronym,
                    stockType,
                    itemType,
                    quantity,
                    remarks,
                  }) => {
                    return {
                      ["Stock"]: `${stockName} (${unitAcronym})`,
                      ["Item Type"]: itemType,
                      ["Stock Type"]: stockType,
                      quantity,
                      remarks,
                    };
                  }
                )}
              />

              {/* Pagination */}
              {badStock?.totalPage > 1 && (
                <CustomPagination
                  totalPages={badStock?.totalPage}
                  paginationHandler={responseBadStock}
                  currentPage={badStock?.pageNumber}
                  prevPage={badStock?.previousPage}
                  nextPage={badStock?.nextPage}
                />
              )}
            </>
          )}
      </>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    badStock: state.badStock,
    singleBadStock: state.singleBadStock,
  };
};

export default connect(mapStateToProps, { getAllBadStock })(BadStock);
