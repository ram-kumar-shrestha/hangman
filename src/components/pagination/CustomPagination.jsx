import React, { useEffect, useRef, useState } from "react";

import "./pagination.css";
import SpreadPagination from "./SpreadPagination";
const CustomPagination = ({
  totalPages,
  paginationHandler,
  currentPage,
  nextPage,
  prevPage,
}) => {
  const midPage = parseInt(totalPages / 2);

  const [pageList, setPageList] = useState([]);

  useEffect(() => {
    let tempPageList = [];
    for (let i = 0; i < totalPages; i++) {
      const styleName =
        i + 1 > 3 &&
        i + 1 !== midPage &&
        i + 1 !== totalPages &&
        i + 1 != currentPage &&
        i + 1 != nextPage &&
        i + 1 != prevPage
          ? "d-none "
          : "";

      const activeClassName = currentPage === i + 1 ? "active" : "";

      tempPageList = [
        ...tempPageList,
        <li className={`page-item ${styleName} ${activeClassName}`} key={i}>
          <button
            className="page-link"
            onClick={(e) => {
              paginationHandler(i + 1, 50);
              showHiddenPageHandler(e);
            }}
          >
            {i + 1}
          </button>
        </li>,
      ];
    }

    setPageList(tempPageList);
  }, [currentPage, totalPages]);

  const paginationRef = useRef();

  const showHiddenPageHandler = (e) => {
    paginationRef.current.childNodes.forEach((list, index) => {
      if (
        e.target.parentElement.nextSibling === list ||
        e.target.parentElement.previousSibling === list
      ) {
        list.classList.remove("d-none");
      } else if (
        index + 1 > 50 &&
        index + 1 < totalPages &&
        (e.target.parentElement.nextSibling !== list ||
          e.target.parentElement.previousSibling !== list)
      ) {
        list.classList.add("d-none");
      } else {
      }

      index + 1 === midPage && list.classList.remove("d-none");
      e.target.parentElement.classList.remove("d-none");
    });
  };

  return (
    <nav aria-label="Page navigation " className="pagination-container">
      <ul className="pagination" ref={paginationRef}>
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={(e) => {
              currentPage > 0 && paginationHandler(prevPage, 50);
              // setCurrentPage((cur) => cur - 1);
              // activePageHandler(e);
            }}
          >
            &lt;&lt;
          </button>
        </li>

        {pageList.length > 5 ? (
          <>
            {/* first three page no */}
            {pageList.slice(0, 3)}

            <SpreadPagination
              totalPage={totalPages}
              clickHandler={showHiddenPageHandler}
            />

            {/* Mid point Page */}
            {pageList.slice(3, midPage)}

            {/* Remaining page upto last page */}
            {pageList.slice(midPage, totalPages - 1)}

            <SpreadPagination
              totalPage={totalPages}
              clickHandler={showHiddenPageHandler}
            />

            {/* last page no. */}
            {pageList.slice(-1)}
          </>
        ) : (
          pageList
        )}

        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={(e) => {
              currentPage < totalPages && paginationHandler(nextPage, 50);
              // setCurrentPage((cur) => cur + 1);
              // activePageHandler(e);
            }}
          >
            &gt;&gt;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default CustomPagination;
