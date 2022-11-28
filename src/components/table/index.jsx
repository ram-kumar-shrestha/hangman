import React, { useState } from "react";
import { BiSortAlt2 } from "react-icons/bi";
import { useLocalStorage } from "../../hooks";

import "./table.css";

const Table = ({ items, isSN = true }) => {
  const [count, setCount] = useState(0);

  const { role } = useLocalStorage();

  const sortHandler = () => {
    items.sort(
      (prevItem, nextItem) =>
        count % 2 === 0 //sort asc and dsc alternately after each click
          ? Number(nextItem.Quantity) - Number(prevItem.Quantity) //DESCENDING ORDER
          : Number(prevItem.Quantity) - Number(nextItem.Quantity) //ASCENDING ORDER
    );

    // this causes rerender
    setCount(count + 1);

    // console.table(items)
  };
  const mappedTable = items?.map((item, index) => {
    return (
      <React.Fragment key={index}>
        {index === 0 ? (
          <thead className="thead-light">
            <tr>
              {isSN && <th style={{ fontSize: "0.9rem" }}>SN</th>}

              {Object.keys(item).map((title) => (
                <React.Fragment key={title}>
                  <th
                    style={{ whiteSpace: "nowrap" }}
                    className={
                      (title.toLowerCase() === "edit" ||
                        title.toLowerCase() === "blocked" ||
                        title.toLowerCase() === "delete" ||
                        title.toLowerCase() === "status" ||
                        title.toLowerCase() === "details" ||
                        title.toLowerCase() === "edit password") &&
                      "no-print"
                    }
                  >
                    {/** TO ADD SORT ICON IN QUANTITY**/}
                    {title === "Quantity" ? (
                      <div className="sort" onClick={sortHandler}>
                        {title.charAt("0").toUpperCase() + title.slice(1)}
                        <span className="sort-icon">
                          <BiSortAlt2 />
                        </span>
                      </div>
                    ) : (
                      title.charAt("0").toUpperCase() + title.slice(1)
                    )}

                    {/** TO ADD UNIT**/}
                    {title === "Rate" || title === "Total" ? (
                      <small className="sort-icon">
                        {" "}
                        &#10088; Rs. &#10089;
                      </small>
                    ) : (
                      ""
                    )}
                  </th>
                </React.Fragment>
              ))}
            </tr>
          </thead>
        ) : null}

        <tbody>
          <tr>
            {isSN && <td>{index + 1}</td>}
            {Object.keys(item).map((title, index) => {
              let classStyle = null;

              switch (String(item[title]).toLowerCase()) {
                case "pending":
                  classStyle = "pending";
                  break;
                case "incomplete":
                  classStyle = "pending";
                  break;
                case "approved":
                  classStyle = "approved";
                  break;
                case "rejected":
                  classStyle = "rejected";
                  break;
                case "remaining":
                  classStyle = "remaining";
                  break;
                case "cleared":
                  classStyle = "cleared";
                  break;
                case "preparing":
                  classStyle = "preparing";
                  break;
                case "active":
                  classStyle = "active-owner"; //active class is used for nav so active-owner is used
                  break;
                case "inactive":
                  classStyle = "inactive-owner";
                  break;
                case "loss":
                  classStyle = "loss";
                  break;
                case "defective":
                  classStyle = "defective";
                  break;
                case "expired":
                  classStyle = "expired";
                  break;

                default:
                  classStyle = null;
                  break;
              }

              return (
                // console.log(title)
                <td key={index}>
                  <div className={classStyle}>
                    {(role === "OutletEmployee" || role === "OutletOwner") &&
                    item[title] === "Approved"
                      ? "Dispatched"
                      : item[Object.keys(item)[index]]}
                  </div>
                </td>
              );
            })}
          </tr>
        </tbody>
      </React.Fragment>
    );
  });

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-center mt-4">
        {mappedTable}
      </table>
    </div>
  );
};

export default Table;
