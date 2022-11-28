import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";

import {
  CustomPagination,
  EditModal,
  Pagination,
  PrintButton,
  Table,
  Title,
  ToggleStatus,
} from "../../components";
import {
  getAllUsers,
  toggleUserStatus,
  getAllOutletUsers,
  getSingleUserByUserName,
} from "../../store/action";
import { useLocalStorage } from "../../hooks";

const Users = ({
  users,
  getAllUsers,
  toggleUserStatus,
  getAllOutletUsers,
  getSingleUserByUserName,
}) => {
  const [message, setMessage] = useState("Loading...");
  const [userStatus, setUserStatus] = useState(true);
  const [editModal, setEditModal] = useState("");
  const { role, outletId } = useLocalStorage();
  const [userName, setUserName] = useState("");
  const [filteredUser, setFilteredUser] = useState([]);
  const [isFilteredUser, setIsFilteredUser] = useState(false);

  const responseUser = (pageNumber, pageSize) => {
    (role === "OutletOwner"
      ? getAllOutletUsers(outletId, pageNumber, pageSize)
      : getAllUsers(pageNumber, pageSize)
    )
      .then(() => {
        setMessage("");
      })
      .catch((e) => {
        setMessage(<div className="danger">Something Went Wrong</div>);
        console.log(e);
      });
  };

  useEffect(() => {
    document.title = "Syanko Katti Roll -  All Users";

    responseUser();
  }, [users.length, userStatus]);

  useEffect(() => {
    getSingleUserByUserName(userName).then((userFiltered) => {
      setFilteredUser(userFiltered);
    });
  }, [userStatus]);

  return (
    <>
      <Title value="All Users" />

      {editModal}

      <PrintButton
        name="Users"
        columns={[
          { label: "User Name", value: "userName" },
          { label: "Email", value: "email" },
          {
            label: "Phone",
            value: "phoneNumber",
          },
          {
            label: "Status",
            value: "isActive",
          },
        ]}
        content={users?.data?.map(
          ({ userName, email, phoneNumber, id, isActive }) => {
            return {
              userName,
              email,
              phoneNumber,
              isActive: isActive ? "Active" : "Inactive",
            };
          }
        )}
      />

      {/* Filter */}
      <div className="container mt-4 no-print">
        <div className="row w-50 ">
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="form-control col-5 "
            placeholder="Filter by username"
          />

          <button
            onClick={() => {
              getSingleUserByUserName(userName).then((userFiltered) => {
                setFilteredUser(userFiltered);
              });
              setIsFilteredUser(true);
            }}
            className="btn btn-outline-info col-2 ml-2"
          >
            Filter
          </button>

          <button
            onClick={() => {
              setUserName("");
              setIsFilteredUser(false);
              setFilteredUser([]);
            }}
            className="btn btn-outline-danger col-2 ml-2"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Table */}

      {message || (
        <>
          {filteredUser?.length !== 0 ? (
            <Table
              items={[
                {
                  ["User Name"]: filteredUser?.username,
                  email: filteredUser?.email,
                  ["Phone"]: filteredUser?.phoneNumber,
                  ["Status"]: (
                    <ToggleStatus
                      status={filteredUser?.isActive}
                      changeHandler={() =>
                        toggleUserStatus(filteredUser?.id)
                          .then(() => {
                            // to cause rerender
                            setUserStatus(!userStatus);
                          })
                          .catch((e) => console.log(e))
                      }
                    />
                  ),
                  ["Edit"]: (
                    <Link
                      to={`../edit/${filteredUser?.id}`}
                      className="btn btn-outline-info no-print"
                    >
                      <AiFillEdit />
                    </Link>
                  ),
                  ["Edit Password"]: (
                    <button
                      type="button"
                      className="btn btn-outline-danger no-print"
                      data-target="#editModal"
                      data-toggle="modal"
                      onClick={() => {
                        setEditModal(
                          <EditModal
                            id={filteredUser?.id}
                            username={filteredUser?.username}
                          />
                        );
                      }}
                    >
                      <AiFillEdit />
                    </button>
                  ),
                },
              ]}
            />
          ) : (
            filteredUser?.length === 0 &&
            isFilteredUser && (
              <div className="text-danger">{userName} not found !!</div>
            )
          )}
          {(filteredUser?.length === 0 || userName === "") && !isFilteredUser && (
            <Table
              items={users?.data?.map(
                ({ userName, email, phoneNumber, id, isActive }) => {
                  return {
                    ["User Name"]: userName,
                    email,
                    ["Phone"]: phoneNumber,
                    ["Status"]: (
                      <ToggleStatus
                        status={isActive}
                        changeHandler={() =>
                          toggleUserStatus(id)
                            .then(() => {
                              // to cause rerender
                              setUserStatus(!userStatus);
                            })
                            .catch((e) => console.log(e))
                        }
                      />
                    ),
                    ["Edit"]: (
                      <Link
                        to={`../edit/${id}`}
                        className="btn btn-outline-info no-print"
                      >
                        <AiFillEdit />
                      </Link>
                    ),
                    ["Edit Password"]: (
                      <button
                        type="button"
                        className="btn btn-outline-danger no-print"
                        data-target="#editModal"
                        data-toggle="modal"
                        onClick={() => {
                          setEditModal(
                            <EditModal id={id} username={userName} />
                          );
                        }}
                      >
                        <AiFillEdit />
                      </button>
                    ),
                  };
                }
              )}
            />
          )}
          {/* Pagination */}
          {(filteredUser?.length === 0 || userName === "") &&
            !isFilteredUser &&
            users?.totalPage > 1 && (
              <CustomPagination
                totalPages={users?.totalPage}
                paginationHandler={responseUser}
                currentPage={users?.pageNumber}
                prevPage={users?.previousPage}
                nextPage={users?.nextPage}
              />
            )}
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

export default connect(mapStateToProps, {
  getAllUsers,
  toggleUserStatus,
  getAllOutletUsers,
  getSingleUserByUserName,
})(Users);
