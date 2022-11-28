import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

import {
  CustomPagination,
  DeleteModal,
  Info,
  Pagination,
  PrintButton,
  Setting,
  Table,
  Title,
  ToggleStatus,
} from "../../components";
import {
  getAllOutlets,
  getSetting,
  updateBlockSetting,
  updateOrderTime,
  toggleBlockedStatus,
  toogleOutletActiveStatus,
} from "../../store/action";
import { useLocalStorage } from "../../hooks";

const Outlets = ({
  outlet,
  settings,
  outletStatus,
  getAllOutlets,
  getSetting,
  updateBlockSetting,
  toggleBlockedStatus,
  toogleOutletActiveStatus,
  updateOrderTime,
}) => {
  const [deleteModal, setDeleteModal] = useState("");
  const [message, setMessage] = useState("Loading...");

  const [settingInfo, setSettingInfo] = useState("");
  const { role } = useLocalStorage();

  // delete handler
  const handleOutletDelete = (name, id) => {
    setDeleteModal(
      <DeleteModal title="Delete" name={name} id={id} deleteModule="outlet" />
    );
  };

  const responseOutlet = (pageNumber, pageSize) => {
    getAllOutlets(pageNumber, pageSize)
      .then(() => {
        setMessage("");
      })
      .catch((e) => {
        setMessage(<div className="danger">Something Went Wrong</div>);
        console.log(e);
      });
  };

  useEffect(() => {
    document.title = "Syanko Katti Roll - All Outlets";
    responseOutlet();
    getSetting();
  }, [outlet?.length, settings.length, outletStatus]);

  return (
    <>
      {deleteModal}

      <Info info={settingInfo} />

      <Title value="View All Outlets" />

      {/* print and export */}
      <PrintButton
        name="Outlets"
        columns={[
          { label: "Name", value: "name" },
          { label: "Address", value: "address" },
          {
            label: "Contact",
            value: "phoneNo",
          },
          {
            label: "Owner",
            value: "owner",
          },
          {
            label: "Max. Pending Bill",
            value: "orderLimit",
          },
          {
            label: "Status",
            value: "isActive",
          },
          {
            label: "Block Status",
            value: "isBlocked",
          },
        ]}
        content={outlet?.data?.map(
          ({
            name,
            address,
            phoneNo,
            isActive,
            isBlocked,
            orderLimit,
            ownerDetail,
          }) => {
            return {
              name,
              address,
              phoneNo,
              ["owner"]: ownerDetail?.name,
              orderLimit,
              isActive: isActive ? "Active" : "Inactive",
              isBlocked: isBlocked ? "Blocked" : "Not Blocked",
            };
          }
        )}
      />

      {/* setting for  outlet blocking */}

      <div className="d-flex flex-column flex-md-row justify-content-between no-print">
        <Setting
          settingTitle="Allowed Order Time Duration"
          limit={{ OrderFrom: settings?.orderFrom, OrderTo: settings?.orderTo }}
          name="timeSetting"
          settingId={settings?.settingId}
          handleClick={updateOrderTime}
          setSettingInfo={setSettingInfo}
          timeSetting={true}
        />

        {/* <Setting
          settingTitle="Max. allowed pending bills"
          limit={settings?.orderLimit}
          name="orderLimit"
          settingId={settings?.settingId}
          handleClick={updateBlockSetting}
          setSettingInfo={setSettingInfo}
        /> */}
      </div>

      {/* data table */}
      {message || (
        <>
          <Table
            items={outlet?.data?.map(
              ({
                outletId,
                name,
                address,
                phoneNo,
                outletRating,
                isActive,
                isBlocked,
                orderLimit,
                ownerDetail,
              }) => {
                return {
                  name: name
                    ?.split(" ")
                    .map(
                      (word) =>
                        word.charAt("0").toUpperCase() + word.slice(1) + " "
                    ),
                  address,
                  ["Contact"]: phoneNo,
                  ["Owner"]: ownerDetail?.name,
                  ["Max. Pending Bill"]: orderLimit,
                  ["Status"]: (
                    <ToggleStatus
                      status={isActive}
                      changeHandler={() => {
                        toogleOutletActiveStatus(outletId)
                          .then(() => {})
                          .catch((e) => console.log(e));
                      }}
                    />
                  ),
                  ["Blocked"]: (
                    <ToggleStatus
                      status={isBlocked}
                      changeHandler={() => {
                        toggleBlockedStatus(outletId)
                          .then(() => {
                            //to cause rerender
                            setOutletStatus(!outletStatus);
                          })
                          .catch((e) => console.log(e));
                      }}
                    />
                  ),

                  ["Edit"]: (
                    <Link
                      to={`../edit/${outletId}`}
                      className="btn btn-outline-primary no-print"
                    >
                      <AiFillEdit />
                    </Link>
                  ),
                  ["Delete"]: (
                    <button
                      type="button"
                      className="btn btn-outline-danger no-print"
                      data-target="#deleteModal"
                      data-toggle="modal"
                      onClick={() =>
                        handleOutletDelete(
                          name
                            .split(" ") //transforming first letter of every word to uppercase
                            .map(
                              (nameItem) =>
                                nameItem.charAt("0").toUpperCase() +
                                nameItem.slice(1) +
                                " "
                            ),
                          outletId
                        )
                      }
                    >
                      <AiFillDelete />
                    </button>
                  ),
                };
              }
            )}
          />

          {/* Pagination */}
          {outlet?.totalPage > 1 && (
            <CustomPagination
              totalPages={outlet?.totalPage}
              paginationHandler={responseOutlet}
              currentPage={outlet?.pageNumber}
              prevPage={outlet?.previousPage}
              nextPage={outlet?.nextPage}
            />
          )}
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    outlet: state.outlet,
    outletStatus: state.outletStatus,
    settings: state.settings,
  };
};

export default connect(mapStateToProps, {
  getAllOutlets,
  getSetting,
  updateBlockSetting,
  toggleBlockedStatus,
  toogleOutletActiveStatus,
  updateOrderTime,
})(Outlets);
