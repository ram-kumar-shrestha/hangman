import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { BiDetail } from "react-icons/bi";
import { AiFillEdit } from "react-icons/ai";

import { getAllOwners, toggleOwnerActiveStatus } from "../../store/action";
import {
  CustomPagination,
  PrintButton,
  Table,
  Title,
  ToggleStatus,
} from "../../components";

const Owners = ({
  owner,
  ownerStatus,
  getAllOwners,
  toggleOwnerActiveStatus,
}) => {
  const [message, setMessage] = useState(<div>Loading...</div>);

  const responseOwner = (pageNumber, pageSize) => {
    getAllOwners(pageNumber, pageSize)
      .then(() => {
        setMessage("");

        // console.table(refinedOwner)
      })
      .catch((e) => {
        setMessage(<div className="danger">Something Went Wrong</div>);
        console.log(e);
      });
  };

  useEffect(() => {
    document.title = "Syanko Katti Roll -  All Owners";

    responseOwner();
  }, [ownerStatus]); //reload data on page refresh

  return (
    <>
      <Title value="All Owners" />

      {/* export and print */}
      <PrintButton
        name="Owners"
        columns={[
          { label: "Name", value: "name" },
          { label: "Address", value: "address" },
          {
            label: "Contact",
            value: "mobileNo",
          },
          {
            label: "Status",
            value: "isActive",
          },
          {
            label: "Outlets",
            value: "outlets",
          },
        ]}
        content={owner?.data?.map(
          ({ name, address, mobileNo, isActive, outlets }) => {
            return {
              name,
              address,
              mobileNo,
              isActive: isActive ? "Active" : "Inactive",
              ["outlets"]: outlets.length,
            };
          }
        )}
      />

      {/* data table */}
      {message || (
        <>
          <Table
            items={owner?.data?.map(
              ({
                ownerDetailId,
                name,
                address,
                mobileNo,
                userPhoto,
                isActive,
                outlets,
              }) => {
                return {
                  name,
                  address,
                  mobileNo,
                  // ['Photo']: userPhoto,
                  // ["Status"]: isActive ? "Active" : "Inactive",
                  ["Outlets"]: outlets.length,

                  ["Status"]: (
                    <ToggleStatus
                      status={isActive}
                      changeHandler={() => {
                        toggleOwnerActiveStatus(ownerDetailId)
                          .then(() => {})
                          .catch((e) => console.log(e));
                      }}
                    />
                  ),
                  ["Details"]: (
                    <Link
                      to={`../${ownerDetailId}`}
                      className="btn btn-outline-info no-print"
                    >
                      <BiDetail />
                    </Link>
                  ),
                  ["Edit"]: (
                    <Link
                      to={`../edit/${ownerDetailId}`}
                      className="btn btn-outline-info no-print"
                    >
                      <AiFillEdit />
                    </Link>
                  ),
                };
              }
            )}
          />

          {/* Pagination */}
          {owner?.totalPage > 1 && (
            <CustomPagination
              totalPages={owner?.totalPage}
              paginationHandler={responseOwner}
              currentPage={owner?.pageNumber}
              prevPage={owner?.previousPage}
              nextPage={owner?.nextPage}
            />
          )}
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    owner: state.owner,
    ownerStatus: state.ownerStatus,
  };
};

export default connect(mapStateToProps, {
  getAllOwners,
  toggleOwnerActiveStatus,
})(Owners);
