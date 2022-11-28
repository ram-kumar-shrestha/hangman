import { Field, FieldArray, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Calendar from "@sbmdkl/nepali-datepicker-reactjs";
import "@sbmdkl/nepali-datepicker-reactjs/dist/index.css";

import { ModalLayout } from "../../components";
import { useLocalStorage } from "../../hooks";
import { addRawStock, getAllDropdownRawItems } from "../../store/action";
import { NepaliDateValidate } from "../../helpers";

const AddRawStock = ({
  dropdown,
  addRawStock,
  getAllDropdownRawItems,
  setMessage,
}) => {
  const { userId, centralKitchenId } = useLocalStorage();

  useEffect(() => {
    document.title = "Syanko Katti Roll - Raw Items";

    getAllDropdownRawItems();
  }, [dropdown?.length]);

  // Form Validation
  const VendorNameValidate = (value) => {
    let error;

    if (!value) {
      error = "*Vendor Name Required";
    }

    return error;
  };
  const BillNumberValidate = (value) => {
    let error;

    if (!value) {
      error = "*Bill Number Required";
    }

    return error;
  };
  const DiscountValidate = (value) => {
    let error;

    if (value < 0) {
      error = "*Discount Required";
    }

    return error;
  };
  const VatValitdate = (value) => {
    let error;

    if (value < 0) {
      error = "*VAT Required";
    }

    return error;
  };
  const BatchNoValidate = (value) => {
    let error;

    if (!value) {
      error = "*Batch Number Required";
    }

    return error;
  };

  const todayNepDate = NepaliFunctions.GetCurrentBsDate();
  return (
    <Formik
      initialValues={{
        BillNumber: "",
        // BatchNo: "",
        VendorName: "",
        Discount: 0,
        Vat: 0,
        NetPrice: 0,
        GrossTotalPrice: 0,
        RawItemBillDetails: [
          {
            ItemId: dropdown[0]?.itemId,
            // ExpiredEngDate: "",
            ExpiredNepDate: `${todayNepDate.year}-${todayNepDate.month}-${todayNepDate.day}`,
            Quantity: "",
            StockPrice: 0,
          },
        ],
      }}
      enableReinitialize={true}
      onSubmit={(values, actions) => {
        let count = 0;
        values.RawItemBillDetails.map((item, index) => {
          const { dayBeforeToday } = NepaliDateValidate(item.ExpiredNepDate);

          if (dayBeforeToday) {
            return setMessage({
              desc: "Expiration Date can not be day before today",
              type: "danger",
            });
          } else {
            count++;
          }

          if (count === values.RawItemBillDetails.length) {
            addRawStock(
              JSON.stringify({
                BillingEngDate: new Date(),
                UserId: userId,
                CentralKitchenId: centralKitchenId,
                ...values,
              })
            )
              .then(() => {
                // removing customized bootstrap modal
                $("#add-raw__items").modal("hide");

                setMessage({
                  desc: "Raw Stock added successfully",
                  type: "success",
                });
              })
              .catch((e) => {
                setMessage({
                  desc: "Something went wrong",
                  type: "danger",
                });
                console.log(e);
              });
          }
        });

        // reseting form
        actions.resetForm();
      }}
    >
      {({ values, errors, touched }) => (
        <Form>
          <ModalLayout
            id="add-raw__items"
            modalType="Add"
            title="Add Raw Item"
            multiple={true}
          >
            {/* Top Bill Detail Section */}
            <>
              <div className="row">
                <div className="form-group col-md-12 mb-0">
                  <label htmlFor="VendorName">Vendor:</label>
                  <Field
                    type="text"
                    name="VendorName"
                    className="form-control mb-2"
                    id="VendorName"
                    validate={VendorNameValidate}
                    required
                  />
                  {errors.VendorName && touched.VendorName && (
                    <span className="danger">{errors.VendorName}</span>
                  )}
                </div>

                {/* <div className="form-group col-md-4 mb-0 mb-0">
                  <label htmlFor="BatchNo">Batch Number:</label>

                  <Field
                    type="text"
                    name="BatchNo"
                    className="form-control"
                    id="BatchNo"
                    validate={BatchNoValidate}
                    required
                  />

                  {errors.BatchNo && touched.BatchNo && (
                    <span className="danger">{errors.BatchNo}</span>
                  )}
                </div> */}
              </div>

              <div className="row  ">
                <div className="form-group col-md-4 mb-0">
                  <label htmlFor="BillNumber">Bill Number:</label>
                  <Field
                    type="text"
                    name="BillNumber"
                    className="form-control"
                    id="BillNumber"
                    validate={BillNumberValidate}
                    required
                  />
                  {errors.BillNumber && touched.BillNumber && (
                    <span className="danger">{errors.BillNumber}</span>
                  )}
                </div>

                <div className="form-group col-md-4 mb-0">
                  <label htmlFor="Discount">Discount:</label>
                  <Field
                    type="Number"
                    min={0}
                    max={100}
                    name="Discount"
                    className="form-control"
                    id="Discount"
                    validate={DiscountValidate}
                    required
                  />
                  {errors.Discount && touched.Discount && (
                    <span className="danger">{errors.Discount}</span>
                  )}
                </div>
                <div className="form-group col-md-4 mb-0">
                  <label htmlFor="Vat">VAT:</label>
                  <Field
                    type="Number"
                    min={0}
                    max={100}
                    name="Vat"
                    className="form-control"
                    id="Vat"
                    validate={VatValitdate}
                    required
                  />
                  {errors.Vat && touched.Vat && (
                    <span className="danger">{errors.Vat}</span>
                  )}
                </div>
              </div>
            </>

            {/* Raw Items Details */}
            {/* <div className="table-responsive"> */}
            <div className="raw-stock__table">
              <FieldArray
                name="RawItemBillDetails"
                render={(arrayHelpers) => (
                  <>
                    <table className="table table-bordered table-center   ">
                      <caption>Raw Item Detials:</caption>
                      <thead className="thead-light">
                        <tr>
                          <th>SN</th>
                          <th>Item</th>
                          <th>Quantity</th>
                          {/* <th>Unit</th> */}
                          {/* <th>Price</th> */}
                          <th>Expiration Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {values.RawItemBillDetails.map((rawItem, index) => (
                          <React.Fragment key={index}>
                            <tr>
                              <td className="p-4">{index + 1}</td>

                              {/* Raw Item */}
                              <td>
                                <Field
                                  name={`RawItemBillDetails.${index}.ItemId`}
                                  as="select"
                                  className="form-control"
                                >
                                  {dropdown?.map((optionItem, optionIndex) => {
                                    // preventing addition of same raw item multiple times
                                    if (optionIndex < index) {
                                      return null;
                                    }
                                    return (
                                      <option
                                        value={optionItem.itemId}
                                        key={optionItem.itemId}
                                      >
                                        {`${optionItem.name} ( ${optionItem?.unit?.acronym})`}
                                      </option>
                                    );
                                  })}
                                </Field>
                              </td>
                              {/* Raw Item Quantity */}
                              <td>
                                <Field
                                  type="Number"
                                  min={0}
                                  name={`RawItemBillDetails.${index}.Quantity`}
                                  className="quantity form-control "
                                  required
                                />
                              </td>

                              {/* Raw Item Price */}
                              <td className="d-none">
                                <Field
                                  type="hidden"
                                  min={0}
                                  name={`RawItemBillDetails.${index}.StockPrice`}
                                  value={
                                    (rawItem.StockPrice =
                                      rawItem.Quantity *
                                      dropdown?.find(
                                        (optionItem) =>
                                          optionItem.itemId ===
                                          parseInt(rawItem.ItemId)
                                      )?.price)
                                  }
                                  className="quantity  "
                                />
                              </td>

                              {/* expiration date */}
                              <td>
                                {/* <Field
                                  type="Date"
                                  name={`RawItemBillDetails.${index}.ExpiredEngDate`}
                                  min={new Date().toISOString().split("T")[0]}
                                  className=" form-control "
                                  required
                                /> */}

                                <Calendar
                                  theme="dark"
                                  className="form-control nepali-date"
                                  onChange={({ bsDate }) => {
                                    values.RawItemBillDetails[
                                      index
                                    ].ExpiredNepDate = bsDate;
                                  }}
                                  name={`RawItemBillDetails.${index}.ExpiredNepDate`}
                                  language="en"
                                />
                              </td>

                              {/* Raw Item add or remove new row */}
                              <td>
                                <button
                                  className="btn btn-outline-primary mr-2 "
                                  type="button"
                                  onClick={() => {
                                    index === dropdown.length - 1 //preventing adding more rows than raw items
                                      ? null
                                      : arrayHelpers.push({
                                          ItemId: dropdown[index + 1]?.itemId,
                                          ExpiredNepDate: "",
                                          Quantity: "",
                                          StockPrice: 0,
                                        });
                                  }}
                                >
                                  &#43;
                                </button>

                                <button
                                  className="btn btn-outline-danger "
                                  type="button"
                                  onClick={() =>
                                    index === 0 //preventing from removing all rows
                                      ? null
                                      : arrayHelpers.remove(index)
                                  } // remove a row from the list
                                >
                                  &#8722;
                                </button>
                              </td>
                            </tr>
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
              />
            </div>

            {/* Bill Summary */}
            <div className="row d-none ">
              <div className="form-group col-md-6">
                <label htmlFor="NetPrice">Net Price:</label>
                <Field
                  type="Number"
                  min={0}
                  name="NetPrice"
                  className="form-control"
                  id="NetPrice"
                  value={(() => {
                    let temNetPrice = 0;
                    for (let i = 0; i < values.RawItemBillDetails.length; i++) {
                      temNetPrice += values.RawItemBillDetails[i].StockPrice;
                    }
                    values.NetPrice = temNetPrice;
                    return temNetPrice;
                  })()}
                  readOnly
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="GrossTotalPrice">Gross Total Price:</label>
                <Field
                  type="Number"
                  min={0}
                  name="GrossTotalPrice"
                  className="form-control"
                  id="GrossTotalPrice"
                  value={(() => {
                    let temGrossTotalPrice = 0;
                    let temGrossTotalPriceFinal = 0;
                    let temNetPrice = 0;
                    for (let i = 0; i < values.RawItemBillDetails.length; i++) {
                      temNetPrice += values.RawItemBillDetails[i].StockPrice;
                    }
                    temGrossTotalPrice =
                      temNetPrice - temNetPrice * values.Discount * 0.01;

                    temGrossTotalPriceFinal = parseFloat(
                      temGrossTotalPrice +
                        temGrossTotalPrice * values.Vat * 0.01
                    ).toFixed(2);

                    values.GrossTotalPrice = temGrossTotalPriceFinal;

                    return temGrossTotalPriceFinal;
                  })()}
                  readOnly
                />
              </div>
            </div>
          </ModalLayout>
        </Form>
      )}
    </Formik>
  );
};

const mapStateToProps = (state) => {
  return {
    dropdown: state.dropdown,
  };
};

export default connect(mapStateToProps, {
  getAllDropdownRawItems,
  addRawStock,
})(AddRawStock);
