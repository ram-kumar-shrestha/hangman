import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

import { CustomPagination, Table, Title } from "../../components";
import { getAllUnits } from "../../store/action";

const AllUnits = ({ unit, getAllUnits }) => {
  const [message, setMessage] = useState(<div>Loading..</div>);

  const responseUnit = (pageNumber, pageSize) => {
    getAllUnits(pageNumber, pageSize)
      .then(() => {
        setMessage("");
      })
      .catch((e) => {
        setMessage(<div className="danger">Something Went Wrong</div>);
        console.log(e);
      });
  };

  useEffect(() => {
    document.title = "Syanko Katti Roll - All Units";

    responseUnit();
  }, [unit.length]);
  return (
    <>
      <Title value="All Units" />

      {message || (
        <>
          <Table
            items={unit?.data?.map(({ unitId, unitName, acronym }) => {
              return {
                ["Name"]: unitName,
                acronym,
                // ['Action']: (
                //   <>
                //     <div className="d-flex ">
                //       <Link
                //         to={`../edit-unit/${unitId}`}
                //         className="btn btn-outline-info  mr-2">
                //         <AiFillEdit />
                //       </Link>

                //       <button
                //         type="button"
                //         className="btn btn-outline-danger"
                //         data-target="#deleteModal"
                //         data-toggle="modal">
                //         <AiFillDelete />
                //       </button>
                //     </div>
                //   </>
                // ),
              };
            })}
          />

          {/* Pagination */}
          {unit?.totalPage > 1 && (
            <CustomPagination
              totalPages={unit?.totalPage}
              paginationHandler={responseUnit}
              currentPage={unit?.pageNumber}
              prevPage={unit?.previousPage}
              nextPage={unit?.nextPage}
            />
          )}
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    unit: state.unit,
  };
};

export default connect(mapStateToProps, { getAllUnits })(AllUnits);
