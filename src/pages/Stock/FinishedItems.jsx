import React, { useEffect, useState } from "react";
import { TiPlus } from "react-icons/ti";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  CustomPagination,
  Info,
  PrintButton,
  Table,
  Title,
} from "../../components";
import { useFormatDate, useFormatYear, useLocalStorage } from "../../hooks";
import { getAllFinishedItems } from "../../store/action";
import AddFinishedItemStock from "./AddFinishedItemStock";

import "./stock.css";

const FinishedItems = ({ stock, singleStock, getAllFinishedItems }) => {
  const [message, setMessage] = useState({});
  const [loadingMessage, setLoadingMessage] = useState(<div>Loading...</div>);
  const { role } = useLocalStorage();

  const responseFinishedStock = (pageNumber, pageSize) => {
    getAllFinishedItems(pageNumber, pageSize)
      .then(() => {
        setLoadingMessage("");
      })
      .catch((e) =>
        setLoadingMessage(<div className="danger">Something went wrong</div>)
      );
  };

  useEffect(() => {
    document.title = "Syanko Katti Roll - Finished Items";

    responseFinishedStock();
  }, [singleStock.finishedItemId]);

  return (
    <>
      {/* add stock info */}
      <Info info={message} />

      <Title value="Finished Items" />

      {/* export and print */}
      <PrintButton
        name="Finished Items"
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
        content={stock?.data?.map(
          ({
            byProductItem,
            finishedItemQuantityDetails,
            finishedItemIngredientDetails,
            batchNo,
            manufactureNepDate,
            expiredNepDate,
          }) => {
            return finishedItemIngredientDetails.map((item) => {
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

      {/* action btns */}
      <div className="d-flex justify-content-between no-print">
        <Link
          to={`${
            role === "Dispatcher" ? "/dispatcher" : "/central-kitchen"
          }/inventory/by-products`}
          className="btn btn-outline-info"
        >
          View Inventory
        </Link>
        <button
          className="btn btn-primary d-flex align-items-center"
          data-toggle="modal"
          data-target="#add-finished__items"
        >
          <TiPlus />
          Add Finished Item
        </button>
      </div>

      {/* Add Finished Item Stock */}
      <AddFinishedItemStock setMessage={setMessage} />

      {/* Finished Items Details */}
      <div className="table-wrapper">
        {loadingMessage || (
          <>
            <Table
              items={stock?.data?.map(
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

            {/* Pagination */}
            {stock?.totalPage > 1 && (
              <CustomPagination
                totalPages={stock?.totalPage}
                paginationHandler={responseFinishedStock}
                currentPage={stock?.pageNumber}
                prevPage={stock?.previousPage}
                nextPage={stock?.nextPage}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    stock: state.finishedItemStocks,
    singleStock: state.singleFinishedItemStock,
  };
};

export default connect(mapStateToProps, { getAllFinishedItems })(FinishedItems);
