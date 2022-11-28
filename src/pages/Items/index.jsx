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
  getAllItems,
  getSetting,
  updateMinRawStockSetting,
} from "../../store/action";
import { useLocalStorage } from "../../hooks";

const Items = ({
  item,
  settings,
  singleRawStock,
  getAllItems,
  getSetting,
  updateMinRawStockSetting,
}) => {
  const [deleteModal, setDeleteModal] = useState("");
  const [settingInfo, setSettingInfo] = useState("");
  const [message, setMessage] = useState("Loading...");

  const { role } = useLocalStorage();
  const { settingId, minimumRawItemStock } = settings;

  // delete handler
  // const handleOutletDelete = (name, id) => {
  //   setDeleteModal(
  //     <DeleteModal title="Delete" name={name} id={id} deleteModule="item" />,
  //   )
  // }

  const responseItems = (pageNumber, pageSize) => {
    getAllItems(pageNumber, pageSize)
      .then(() => {
        setMessage("");
      })
      .catch((e) => {
        setMessage(<div className="danger">Something Went Wrong</div>);
        console.log(e);
      });
  };

  useEffect(() => {
    document.title = "Syanko Katti Roll - All Raw Items";

    responseItems();

    // (role === "CentralKitchenAdmin" || role === "SystemAdmin") && getSetting();
  }, [singleRawStock]);

  return (
    <>
      {deleteModal}

      {/* info */}
      <Info info={settingInfo} />

      <Title value="All Raw Items" />

      {/* export and print */}
      <PrintButton
        name="Raw Items Inventory"
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
              quantity,
              price,
              minimumStock,
              ["unit"]: unit?.unitName + " (" + unit?.acronym + ")",
            };
          }
        )}
      />

      {/* setting for  outlet blocking */}
      {/* {(role === "CentralKitchenAdmin" || role === "SystemAdmin") && (
        <Setting
          settingTitle="Minimum quantity of raw items"
          limit={minimumRawItemStock}
          name="MinimumRawItemStock"
          settingId={settingId}
          handleClick={updateMinRawStockSetting}
          setSettingInfo={setSettingInfo}
        />
      )} */}

      {/* data table */}
      {message || (
        <>
          <Table
            items={item?.data.map(
              ({ itemId, name, price, quantity, unit, minimumStock }) => {
                const editBtn =
                  role === "SystemAdmin" || role === "CentralKitchenAdmin"
                    ? {
                        ["Rate"]: price,
                        ["Edit"]: (
                          <Link
                            to={`../../inventory/edit-raw-item/${itemId}`}
                            className="btn btn-primary no-print"
                          >
                            <AiFillEdit />
                          </Link>
                        ),
                      }
                    : null;
                return {
                  name,
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
          items={item?.map(({ itemId, name, price, quantity, unit }) => {
            const editBtn =
              role === "SystemAdmin" || role === "CentralKitchenAdmin"
                ? {
                    ["Edit"]: (
                      <Link
                        to={`/inventory/edit-raw-item/${itemId}`}
                        className="btn btn-primary "
                      >
                        <AiFillEdit />
                      </Link>
                    ),
                  }
                : null;
            return {
              name,
              ["Rate"]: price,
              ["Quantity"]: quantity,
              ["Unit"]: unit?.unitName + " (" + unit?.acronym + ")",
              ...editBtn,
            };
          })}
        />
      )} */}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    settings: state.settings,
    item: state.rawItem,
    singleRawStock: state.singleRawStock,
  };
};

export default connect(mapStateToProps, {
  getAllItems,
  getSetting,
  updateMinRawStockSetting,
})(Items);
