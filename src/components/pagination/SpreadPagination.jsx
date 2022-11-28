import React from "react";

const SpreadPagination = ({ totalPage, currentPage, clickHandler }) => {
  return (
    totalPage > 3 && (
      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
        <button className="page-link" onClick={clickHandler}>
          ...
        </button>
      </li>
    )
  );
};

export default SpreadPagination;
