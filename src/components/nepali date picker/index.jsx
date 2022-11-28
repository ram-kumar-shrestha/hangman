import Calendar from "@sbmdkl/nepali-datepicker-reactjs";
import "@sbmdkl/nepali-datepicker-reactjs/dist/index.css";
import { useContext, useEffect } from "react";
import { FilterContext } from "../../App";

const NepaliDateWithResetButton = ({
  setNepaliDate,
  nepaliDate,
  status,
  outletId = null,
  getOutletOrders = null,
  getAllOrderBills = null,
  setMessage = null,
  pageMode = "",
  styleName = null,
}) => {
  // filter context
  const context = useContext(FilterContext);
  const todayNepDate = NepaliFunctions.GetCurrentBsDate();

  useEffect(() => {
    // the context is set from here because the
    // nepali calender date picker changes its
    // value to today as the page mounts so its hard to control there

    document
      .querySelector(".nepali-date__container")
      .addEventListener("click", (e) => {
        if (!e.target.classList.contains("_249_g", " _2eP5_")) return;

        switch (styleName) {
          case "all":
            //all order
            context.setFilterStateAllOrders((prev) => ({
              ...prev,
              date:
                todayNepDate.year +
                "-" +
                todayNepDate.month +
                "-" +
                e.target.innerHTML,
            }));
            break;
          case "dispatch":
            context.setFilterStateDispatchOrders((prev) => ({
              ...prev,
              date:
                todayNepDate.year +
                "-" +
                todayNepDate.month +
                "-" +
                e.target.innerHTML,
            }));
            break;

          case "billings":
            //all billings
            context.setFilterStateAllBillings((prev) => ({
              ...prev,
              date:
                todayNepDate.year +
                "-" +
                todayNepDate.month +
                "-" +
                e.target.innerHTML,
            }));
            break;

          default:
            break;
        }
      });
  });

  const setDateValue = (className, contextState, date) => {
    document.querySelector(".nepali-date." + className).value =
      contextState === "reset"
        ? "yyyy - mm - dd"
        : contextState !== null
        ? contextState
        : date;
  };

  return (
    <div className="row container align-items-center mt-2">
      <div className="nepali-date__container">
        <Calendar
          theme="dark"
          className={"form-control nepali-date  " + styleName}
          onChange={({ bsDate }) => {
            setNepaliDate(bsDate);

            switch (styleName) {
              case "all":
                //all order
                setDateValue("all", context.filterStateAllOrders.date, bsDate);
                getOutletOrders &&
                  getOutletOrders(
                    null,
                    outletId !== "null" ? outletId : null,
                    context.filterStateAllOrders.date === "reset"
                      ? null
                      : context.filterStateAllOrders.date || bsDate,
                    context.filterStateAllOrders.status === "Cleared"
                      ? status
                      : context.filterStateAllOrders.status || status,
                    null,
                    null
                  )
                    .then(() => {
                      setMessage("");
                      context.filterStateAllOrders.date === "reset" ||
                        context.setFilterStateAllOrders((prev) => ({
                          ...prev,
                          date: null,
                        }));
                    })
                    .catch((e) => {
                      setMessage(
                        <div className="danger">Something went wrong</div>
                      );
                    });

                break;
              case "dispatch":
                //dispatch order
                setDateValue(
                  "dispatch",
                  context.filterStateDispatchOrders.date,
                  bsDate
                );
                getOutletOrders &&
                  getOutletOrders(
                    null,
                    outletId !== "null" ? outletId : null,
                    context.filterStateDispatchOrders.date === "reset"
                      ? null
                      : context.filterStateDispatchOrders.date || bsDate,
                    context.filterStateDispatchOrders.status === "Cleared"
                      ? status
                      : context.filterStateDispatchOrders.status || status,
                    null,
                    null
                  )
                    .then(() => {
                      setMessage("");
                      context.filterStateDispatchOrders.date === "reset" ||
                        context.setFilterStateDispatchOrders((prev) => ({
                          ...prev,
                          date: null,
                        }));
                    })
                    .catch((e) => {
                      setMessage(
                        <div className="danger">Something went wrong</div>
                      );
                    });

                break;
              case "billings":
                //all billings
                setDateValue(
                  "billings",
                  context.filterStateAllBillings.date,
                  bsDate
                );
                getAllOrderBills &&
                  getAllOrderBills(
                    context.filterStateAllBillings.outletId ||
                      (outletId !== "null" ? outletId : null),
                    context.filterStateAllBillings.date === "reset"
                      ? null
                      : context.filterStateAllBillings.date || bsDate,
                    context.filterStateAllBillings.status || status,
                    null,
                    null,
                    pageMode
                  )
                    .then(() => {
                      setMessage("");

                      context.filterStateAllBillings.date === "reset" ||
                        context.setFilterStateAllBillings((prev) => ({
                          ...prev,
                          date: null,
                        }));
                    })
                    .catch((e) => {
                      setMessage(
                        <div className="danger">Something went wrong</div>
                      );
                    });

                break;
              default:
                break;
            }
          }}
          name={`orderTargetNepDate`}
          language="en"
        />
      </div>

      <button
        className="btn btn-outline-info mt-2 col-12 col-sm-auto  mt-sm-0 ml-sm-2"
        onClick={() => {
          setNepaliDate("");
          document.querySelector(".nepali-date").value = "yyyy - mm - dd";

          switch (styleName) {
            case "all":
              //all order
              context.setFilterStateAllOrders((prev) => ({
                ...prev,
                date: "reset",
              }));

              break;
            case "dispatch":
              //dispatch order
              context.setFilterStateDispatchOrders((prev) => ({
                ...prev,
                date: "reset",
              }));

              break;
            case "billings":
              //all billings
              context.setFilterStateAllBillings((prev) => ({
                ...prev,
                date: "reset",
              }));
              break;
            default:
              break;
          }

          getOutletOrders && getOutletOrders(pageMode, null, null, status);

          getAllOrderBills &&
            getAllOrderBills(
              outletId !== "null" ? outletId : null,
              null,
              status,
              null,
              null,
              pageMode
            )
              .then(() => {
                setMessage("");
              })
              .catch((e) => {
                setMessage(<div className="danger">Something went wrong</div>);
              });
        }}
      >
        Reset Date
      </button>
    </div>
  );
};

export default NepaliDateWithResetButton;
