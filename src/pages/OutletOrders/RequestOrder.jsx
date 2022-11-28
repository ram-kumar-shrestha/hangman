import { Field, FieldArray, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Calendar from "@sbmdkl/nepali-datepicker-reactjs";
import "@sbmdkl/nepali-datepicker-reactjs/dist/index.css";

import { ConfirmModal, Info, Title } from "../../components";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import {
  getAllDropdownByproducts,
  requestOrder,
  getOrderTime,
  getSetting,
} from "../../store/action";
import { NepaliDateValidate } from "../../helpers";

import "./request.css";

const RequestOrder = ({
  items,
  getAllDropdownByproducts,
  requestOrder,
  getOrderTime,
  getSetting,
  settings,
  isOrderTime,
}) => {
  const { outletId, userId } = useLocalStorage();
  const [orderInfo, setOrderInfo] = useState({});
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [requestValues, setRequestValues] = useState([]);
  const [nepaliDate, setNepaliDate] = useState("");

  useEffect(() => {
    document.title = "Syanko Katti Roll - Request Order ";

    getAllDropdownByproducts()
      .then(() => {})
      .catch((e) => console.log(e));

    getSetting().then(
      () => settings?.settingId && getOrderTime(settings?.settingId)
    );
  }, []);

  return (
    <>
      {/* order message */}
      <Info info={orderInfo} />

      <Title value="Order Details" />

      <Formik
        initialValues={{
          orderTargetNepDate: nepaliDate,
          orderDetails: [
            {
              ByProductItemId: items[0]?.byProductItemId,
              Quantity: 0,
            },
            {
              ByProductItemId: items[1]?.byProductItemId,
              Quantity: 0,
            },
            {
              ByProductItemId: items[2]?.byProductItemId,
              Quantity: 0,
            },
            {
              ByProductItemId: items[3]?.byProductItemId,
              Quantity: 0,
            },
          ],
        }} //default value of item is first of the refinedItems array
        enableReinitialize={true}
        onSubmit={(values, actions) => {
          // console.log('Target Order Date: ', values.orderTargetDate)
          // console.table(values.orderDetails);

          const { dayBeforeToday } = NepaliDateValidate(nepaliDate);

          if (dayBeforeToday) {
            return setOrderInfo({
              desc: "Order can't be requested day before today",
              type: "danger",
            });
          }

          // preventing requesting order for same item
          for (let i = 0; i < values.orderDetails.length; i++) {
            for (let j = i + 1; j < values.orderDetails.length; j++) {
              if (
                values.orderDetails[i].ByProductItemId ==
                values.orderDetails[j].ByProductItemId
              ) {
                setOrderInfo({
                  desc: `Trying to order ${items[j].name} multiple times`,
                  type: "danger",
                });
                return;
              }
            }
          }

          // requesting order
          isConfirmed &&
            requestOrder(
              JSON.stringify({
                OutletId: outletId,
                userId: userId,
                OrderTargetNepDate: values.orderTargetNepDate,
                OrderDetails: values.orderDetails,
              })
            )
              .then(() => {
                $("#confirm-modal").modal("hide");
                setOrderInfo({
                  desc: "Order requested successfully",
                  type: "success",
                });
              })
              .catch((e) => {
                $("#confirm-modal").modal("hide");
                e === 403
                  ? setOrderInfo({
                      desc: "You have been restricted from making further orders",
                      type: "danger",
                    })
                  : setOrderInfo({
                      desc: "Something went wrong",
                      type: "danger",
                    });
                console.log(e);
              }),
            // reseting form
            actions.resetForm();
        }}
      >
        {({ values }) => (
          <Form>
            <ConfirmModal
              title="Confirm Order Request"
              setIsConfirmed={setIsConfirmed}
              values={requestValues}
              items={items}
            />

            <FieldArray
              name="orderDetails"
              render={(arrayHelpers) => (
                <>
                  <div className="d-flex align-items-center">
                    <label htmlFor="orderTargetDate ">Target Order Date:</label>
                    {/* <Field
                        type="date"
                        name={`orderTargetDate`}
                        className="form-control ml-4"
                        style={{ width: "max-content" }}
                        required
                      /> */}

                    <Calendar
                      theme="dark"
                      className="form-control ml-4"
                      onChange={({ bsDate }) => setNepaliDate(bsDate)}
                      name={`orderTargetNepDate`}
                      language="en"
                    />
                  </div>

                  {/* table for tablet or desktop */}
                  <div className="table-responsive ">
                    <table className="table table-bordered table-center mt-4 request-table">
                      <thead className="thead-light">
                        <tr>
                          <th>SN</th>
                          <th>Item</th>
                          <th>Quantity</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {values.orderDetails.map((rawItems, index) => (
                          <React.Fragment key={index}>
                            {index === 0 && (
                              <>
                                <tr>
                                  <td className="p-4">1</td>

                                  <td>
                                    <Field
                                      name={`orderDetails.0.ByProductItemId`}
                                      as="select"
                                      className="form-control"
                                    >
                                      <option
                                        value={items[0]?.byProductItemId}
                                        key={items[0]?.byProductItemId}
                                      >
                                        {items[0]?.name} (
                                        {items[0]?.unit?.acronym})
                                      </option>
                                    </Field>
                                  </td>

                                  <td>
                                    <Field
                                      type="Number"
                                      name={`orderDetails.0.Quantity`}
                                      className="form-control"
                                      style={{ width: "max-content" }}
                                      required
                                    />
                                  </td>
                                  <td></td>
                                </tr>

                                <tr>
                                  <td className="p-4">2</td>

                                  <td>
                                    <Field
                                      name={`orderDetails.1.ByProductItemId`}
                                      as="select"
                                      className="form-control"
                                    >
                                      <option
                                        value={items[1]?.byProductItemId}
                                        key={items[1]?.byProductItemId}
                                      >
                                        {items[1]?.name} (
                                        {items[1]?.unit?.acronym})
                                      </option>
                                    </Field>
                                  </td>

                                  <td>
                                    <Field
                                      type="Number"
                                      name={`orderDetails.1.Quantity`}
                                      className="form-control"
                                      style={{ width: "max-content" }}
                                      required
                                    />
                                  </td>
                                  <td></td>
                                </tr>

                                <tr>
                                  <td className="p-4">3</td>

                                  <td>
                                    <Field
                                      name={`orderDetails.2.ByProductItemId`}
                                      as="select"
                                      className="form-control"
                                    >
                                      <option
                                        value={items[2]?.byProductItemId}
                                        key={items[2]?.byProductItemId}
                                      >
                                        {items[2]?.name} (
                                        {items[2]?.unit?.acronym})
                                      </option>
                                    </Field>
                                  </td>

                                  <td>
                                    <Field
                                      type="Number"
                                      name={`orderDetails.2.Quantity`}
                                      className="form-control"
                                      style={{ width: "max-content" }}
                                      required
                                    />
                                  </td>
                                  <td></td>
                                </tr>

                                <tr>
                                  <td className="p-4">4</td>

                                  <td>
                                    <Field
                                      name={`orderDetails.3.ByProductItemId`}
                                      as="select"
                                      className="form-control"
                                    >
                                      <option
                                        value={items[3]?.byProductItemId}
                                        key={items[3]?.byProductItemId}
                                      >
                                        {items[3]?.name} (
                                        {items[3]?.unit?.acronym})
                                      </option>
                                    </Field>
                                  </td>

                                  <td>
                                    <Field
                                      type="Number"
                                      name={`orderDetails.3.Quantity`}
                                      className="form-control"
                                      style={{ width: "max-content" }}
                                      required
                                    />
                                  </td>
                                  <td>
                                    <button
                                      className="btn btn-outline-primary mr-2 "
                                      type="button"
                                      onClick={(e) => {
                                        if (
                                          values.orderDetails.length >
                                          items.length - 1
                                        )
                                          return; //preventing from adding empty rows

                                        arrayHelpers.push({
                                          ByProductItemId:
                                            items[values.orderDetails.length]
                                              ?.byProductItemId,
                                          Quantity: 0,
                                        });

                                        // e.target.disabled = true;
                                      }}
                                    >
                                      &#43;
                                    </button>

                                    <button
                                      className="btn btn-outline-danger "
                                      type="button"
                                      onClick={() => {
                                        index === 0 //preventing from removing all rows
                                          ? null
                                          : arrayHelpers.remove(index);
                                      }} // remove a row from the list
                                    >
                                      &#8722;
                                    </button>
                                  </td>
                                </tr>
                              </>
                            )}

                            {index >= 4 && (
                              <tr>
                                <td className="p-4">{index + 1}</td>

                                <td>
                                  <Field
                                    name={`orderDetails.${index}.ByProductItemId`}
                                    as="select"
                                    className="form-control"
                                  >
                                    {items?.map((item, itemIndex) => {
                                      // preventing addition of same raw item multiple times
                                      if (itemIndex < index) {
                                        return null;
                                      }

                                      return (
                                        <option
                                          value={item.byProductItemId}
                                          key={item.byProductItemId}
                                        >
                                          {item.name} ({item?.unit?.acronym})
                                        </option>
                                      );
                                    })}
                                  </Field>
                                </td>

                                <td>
                                  <Field
                                    type="Number"
                                    name={`orderDetails.${index}.Quantity`}
                                    className="form-control"
                                    style={{ width: "max-content" }}
                                    required
                                  />
                                </td>
                                <td>
                                  <button
                                    className="btn btn-outline-primary mr-2 "
                                    type="button"
                                    onClick={(e) => {
                                      if (
                                        values.orderDetails.length >
                                        items.length - 1
                                      )
                                        return; //preventing from adding empty rows

                                      arrayHelpers.push({
                                        ByProductItemId:
                                          items[values.orderDetails.length]
                                            ?.byProductItemId,
                                        Quantity: 0,
                                      });
                                    }}
                                  >
                                    &#43;
                                  </button>

                                  <button
                                    className="btn btn-outline-danger "
                                    type="button"
                                    onClick={() => {
                                      index === 3 //preventing from removing all rows
                                        ? null
                                        : arrayHelpers.remove(index);
                                    }} // remove a row from the list
                                  >
                                    &#8722;
                                  </button>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* table for mobile */}
                  {/* <div className="table-mobile d-sm-none">
                    <table className="table table-bordered table-center mt-4">
                      {values.orderDetails.map((rawItems, index) => (
                        <React.Fragment key={index}>
                          {index === 0 && (
                            <> 
                              <tr>
                                <th>SN</th>
                                <td className="p-4">1</td>
                              </tr>

                              <tr>
                                <th>Item</th>
                                <td>
                                  <Field
                                    name={`orderDetails.0.ByProductItemId`}
                                    as="select"
                                    className="form-control"
                                  >
                                    <option
                                      value={items[0]?.byProductItemId}
                                      key={items[0]?.byProductItemId}
                                    >
                                      {items[0]?.name} (
                                      {items[0]?.unit?.acronym})
                                    </option>
                                  </Field>
                                </td>
                              </tr>

                              <tr>
                                <th>Quantity</th>
                                <td>
                                  <Field
                                    type="Number"
                                    name={`orderDetails.0.Quantity`}
                                    className="form-control"
                                    style={{ width: "max-content" }}
                                    required
                                  />
                                </td>
                              </tr>
 
                              <tr>
                                <th>SN</th>
                                <td className="p-4">2</td>
                              </tr>

                              <tr>
                                <th>Item</th>
                                <td>
                                  <Field
                                    name={`orderDetails.1.ByProductItemId`}
                                    as="select"
                                    className="form-control"
                                  >
                                    <option
                                      value={items[1]?.byProductItemId}
                                      key={items[1]?.byProductItemId}
                                    >
                                      {items[1]?.name} (
                                      {items[1]?.unit?.acronym})
                                    </option>
                                  </Field>
                                </td>
                              </tr>

                              <tr>
                                <th>Quantity</th>
                                <td>
                                  <Field
                                    type="Number"
                                    name={`orderDetails.1.Quantity`}
                                    className="form-control"
                                    style={{ width: "max-content" }}
                                    required
                                  />
                                </td>
                              </tr> 

                              <tr>
                                <th>SN</th>
                                <td className="p-4">3</td>
                              </tr>

                              <tr>
                                <th>Item</th>
                                <td>
                                  <Field
                                    name={`orderDetails.2.ByProductItemId`}
                                    as="select"
                                    className="form-control"
                                  >
                                    <option
                                      value={items[2]?.byProductItemId}
                                      key={items[2]?.byProductItemId}
                                    >
                                      {items[2]?.name} (
                                      {items[2]?.unit?.acronym})
                                    </option>
                                  </Field>
                                </td>
                              </tr>

                              <tr>
                                <th>Quantity</th>
                                <td>
                                  <Field
                                    type="Number"
                                    name={`orderDetails.2.Quantity`}
                                    className="form-control"
                                    style={{ width: "max-content" }}
                                    required
                                  />
                                </td>
                                <td></td>
                              </tr>
 
                              <tr>
                                <th>SN</th>
                                <td className="p-4">4</td>
                              </tr>

                              <tr>
                                <th>SN</th>
                                <td>
                                  <Field
                                    name={`orderDetails.3.ByProductItemId`}
                                    as="select"
                                    className="form-control"
                                  >
                                    <option
                                      value={items[3]?.byProductItemId}
                                      key={items[3]?.byProductItemId}
                                    >
                                      {items[3]?.name} (
                                      {items[3]?.unit?.acronym})
                                    </option>
                                  </Field>
                                </td>
                              </tr>

                              <tr>
                                <th>Quantity</th>
                                <td>
                                  <Field
                                    type="Number"
                                    name={`orderDetails.3.Quantity`}
                                    className="form-control"
                                    style={{ width: "max-content" }}
                                    required
                                  />
                                </td>
                              </tr>

                              <tr>
                                <th>Action</th>
                                <td>
                                  <button
                                    className="btn btn-outline-primary mr-2 "
                                    type="button"
                                    onClick={(e) => {
                                      arrayHelpers.push({
                                        ByProductItemId:
                                          items[index + 4]?.byProductItemId,
                                        Quantity: 0,
                                      });

                                      e.target.disabled = true;
                                    }}
                                  >
                                    &#43;
                                  </button>

                                  <button
                                    className="btn btn-outline-danger "
                                    type="button"
                                    onClick={() => {
                                      index === 0 //preventing from removing all rows
                                        ? null
                                        : arrayHelpers.remove(index);
                                    }} // remove a row from the list
                                  >
                                    &#8722;
                                  </button>
                                </td>
                              </tr>
                            </>
                          )}

                           
                          {index >= 4 && (
                            <>
                              <tr>
                                <th>SN</th>
                                <td className="p-4">{index + 1}</td>
                              </tr>

                              <tr>
                                <th>Item</th>
                                <td>
                                  <Field
                                    name={`orderDetails.${index}.ByProductItemId`}
                                    as="select"
                                    className="form-control"
                                  >
                                    {items?.map((item, itemIndex) => {
                                      // preventing addition of same raw item multiple times
                                      if (itemIndex < index) {
                                        return null;
                                      }

                                      return (
                                        <option
                                          value={item.byProductItemId}
                                          key={item.byProductItemId}
                                        >
                                          {item.name} ({item?.unit?.acronym})
                                        </option>
                                      );
                                    })}
                                  </Field>
                                </td>
                              </tr>

                              <tr>
                                <th>Quantity</th>
                                <td>
                                  <Field
                                    type="Number"
                                    name={`orderDetails.${index}.Quantity`}
                                    className="form-control"
                                    style={{ width: "max-content" }}
                                    required
                                  />
                                </td>
                              </tr>

                              <tr>
                                <th>Action</th>
                                <td>
                                  <button
                                    className="btn btn-outline-primary mr-2 "
                                    type="button"
                                    onClick={(e) => {
                                      if (index + 1 === items.length) return;

                                      arrayHelpers.push({
                                        ByProductItemId:
                                          items[index + 1]?.byProductItemId,
                                        Quantity: 0,
                                      });

                                      e.target.disabled = true;
                                    }}
                                  >
                                    &#43;
                                  </button>

                                  <button
                                    className="btn btn-outline-danger "
                                    type="button"
                                    onClick={() => {
                                      index === 3 //preventing from removing all rows
                                        ? null
                                        : arrayHelpers.remove(index);
                                    }} // remove a row from the list
                                  >
                                    &#8722;
                                  </button>
                                </td>
                              </tr>
                            </>
                          )}
                        </React.Fragment>
                      ))}
                    </table>
                  </div> */}
                </>
              )}
            />
            {values.orderDetails.length != 0 ? (
              <>
                <div className="d-flex justify-content-between mt-2">
                  <div className="d-flex align-items-center ">
                    <button
                      className="btn btn-info btn-add btn-request"
                      type="button"
                      disabled={!isOrderTime}
                      style={{ cursor: isOrderTime || "not-allowed" }}
                      data-toggle="modal"
                      data-target="#confirm-modal"
                      onClick={() => setRequestValues(values?.orderDetails)}
                    >
                      Request
                    </button>

                    {isOrderTime || (
                      <div className="order-time__info">
                        The Order Time is between{" "}
                        {settings?.orderFrom.split(":")[0] === "12"
                          ? "12"
                          : settings?.orderFrom.split(":")[0] % 12}
                        {settings?.orderFrom.slice(2)}
                        {settings?.orderFrom < "12:00:00" ? "AM" : "PM"} -{" "}
                        {settings?.orderTo.split(":")[0] === "12"
                          ? "12"
                          : settings?.orderTo.split(":")[0] % 12}
                        {settings?.orderTo.slice(2)}
                        {settings?.orderTo < "12:00:00" ? "AM" : "PM"}
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : null}
          </Form>
        )}
      </Formik>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.dropdown,
    settings: state.settings,
    isOrderTime: state.isOrderTime,
  };
};

export default connect(mapStateToProps, {
  getAllDropdownByproducts,
  requestOrder,
  getOrderTime,
  getSetting,
})(RequestOrder);
