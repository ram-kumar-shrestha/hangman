import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { CustomPagination, Table, Title } from "../../components";
import { useLocalStorage } from "../../hooks";
import { getOutletInventory } from "../../store/action";

const OutletInventory = ({ finishedItemStocks, getOutletInventory }) => {
  const [message, setMessage] = useState("Loading...");

  const { outletId } = useLocalStorage();

  const responseInventory = (pageNumber, pageSize) => {
    getOutletInventory(outletId, pageNumber, pageSize)
      .then(() => {
        setMessage("");
      })
      .catch((e) => {
        console.log(e);
        setMessage("");
      });
  };
  useEffect(() => {
    document.title = "Synako Katti Roll - Inventory";

    responseInventory();
  }, []);

  return (
    <>
      <Title value="Inventory" />

      {message || (
        <>
          <Table
            items={finishedItemStocks?.data?.map(
              ({ byProductName, quantity, unitAcronym }) => {
                return {
                  ["Items"]: `${byProductName} (${unitAcronym})`,
                  ["Quantity"]: quantity,
                };
              }
            )}
          />

          {/* Pagination */}
          {finishedItemStocks?.totalPage > 1 && (
            <CustomPagination
              totalPages={finishedItemStocks?.totalPage}
              paginationHandler={responseInventory}
              currentPage={finishedItemStocks?.pageNumber}
              prevPage={finishedItemStocks?.previousPage}
              nextPage={finishedItemStocks?.nextPage}
            />
          )}
        </>
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    finishedItemStocks: state.finishedItemStocks,
  };
};
export default connect(mapStateToProps, { getOutletInventory })(
  OutletInventory
);
