import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

import {
  CustomPagination,
  DeleteModal,
  Info,
  PrintButton,
  Setting,
  Table,
  Title,
} from "../../components";
import {
  getAllByproducts,
  getSetting,
  updateMinByproductStockSetting,
} from "../../store/action";
import { useLocalStorage } from "../../hooks";

const ByProducts = ({
  item,
  settings,
  getSetting,
  updateMinByproductStockSetting,
  singleFinishedItemStock,
  getAllByproducts,
}) => {
  const [deleteModal, setDeleteModal] = useState("");
  const [settingInfo, setSettingInfo] = useState("");
  const [message, setMessage] = useState("Loading...");

  const { role } = useLocalStorage();

  const { settingId, minimumByProductStock } = settings;
  // delete handler
  // const handleOutletDelete = (name, id) => {
  //   setDeleteModal(
  //     <DeleteModal
  //       title="Delete"
  //       name={name}
  //       id={id}
  //       deleteModule="byproduct"
  //     />,
  //   )
  // }

  const responseItems = (pageNumber, pageSize) => {
    getAllByproducts(pageNumber, pageSize)
      .then(() => {
        setMessage("");
      })
      .catch((e) => {
        setMessage(<div className="danger">Something Went Wrong</div>);
        console.log(e);
      });
  };

  useEffect(() => {
    document.title = "Syanko Katti Roll - All By Products";

    responseItems();

    // (role === "CentralKitchenAdmin" || role === "SystemAdmin") && getSetting();
  }, [singleFinishedItemStock]);

  return (
    <>
      {deleteModal}
      {/* info */}
      <Info info={settingInfo} />

      <Title value="All Byproducts" />

      {/* export and print */}
      <PrintButton
        name="Finished Items Inventory"
        columns={[
          { label: "Name", value: "name" },
          { label: "Price", value: "price" },
          {
            label: "Quantity",
            value: "quantity",
          },
          {
            label: "Minimum Quantity",
            value: "minimumStock",
          },
          {
            label: "Unit",
            value: "unit",
          },
        ]}
        content={item?.data?.map(
          ({ name, price, quantity, unit, minimumStock }) => {
            return {
              name,
              price,
              quantity,
              minimumStock,
              ["unit"]: unit?.unitName + " (" + unit?.acronym + ")",
            };
          }
        )}
      />

      {/* setting for  outlet blocking */}
      {/* {(role === "CentralKitchenAdmin" || role === "SystemAdmin") && (
        <Setting
          settingTitle="Minimum quantity of byproducts"
          limit={minimumByProductStock}
          name="MinimumRawItemStock"
          settingId={settingId}
          handleClick={updateMinByproductStockSetting}
          setSettingInfo={setSettingInfo}
        />
      )} */}

      {/* data table */}

      {message || (
        <>
          <Table
            items={item?.data?.map(
              ({
                byProductItemId,
                name,
                price,
                quantity,
                unit,
                minimumStock,
              }) => {
                const editBtn =
                  role === "SystemAdmin" || role === "CentralKitchenAdmin"
                    ? {
                        ["Edit"]: (
                          <Link
                            to={`../../inventory/edit-byproduct/${byProductItemId}`}
                            className="btn btn-primary no-print"
                          >
                            <AiFillEdit />
                          </Link>
                        ),
                      }
                    : "";
                return {
                  name,
                  ["Rate"]: price,
                  ["Quantity"]: quantity,
                  ["Minimum Quantity"]: minimumStock,
                  ["Unit"]: unit?.unitName + " (" + unit?.acronym + ")",
                  ...editBtn,
                };
              }
            )}
          />

          {/* Pagination */}
          {item?.totalPage > 1 && (
            <CustomPagination
              totalPages={item?.totalPage}
              paginationHandler={responseItems}
              currentPage={item?.pageNumber}
              prevPage={item?.previousPage}
              nextPage={item?.nextPage}
            />
          )}
        </>
      )}

      {/* {message || (
        <Pagination
          itemsPerPage={5}
          items={item?.map(
            ({ byProductItemId, name, price, quantity, unit }) => {
              const editBtn =
                role === "SystemAdmin" || role === "CentralKitchenAdmin"
                  ? {
                      ["Edit"]: (
                        <Link
                          to={`/inventory/edit-byproduct/${byProductItemId}`}
                          className="btn btn-primary "
                        >
                          <AiFillEdit />
                        </Link>
                      ),
                    }
                  : "";
              return {
                name,
                ["Rate"]: price,
                ["Quantity"]: quantity,
                ["Unit"]: unit?.unitName + " (" + unit?.acronym + ")",
                ...editBtn,
              };
            }
          )}
        />
      )} */}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    settings: state.settings,
    item: state.byProduct,
    singleFinishedItemStock: state.singleFinishedItemStock,
  };
};

export default connect(mapStateToProps, {
  getAllByproducts,
  getSetting,
  updateMinByproductStockSetting,
})(ByProducts);
