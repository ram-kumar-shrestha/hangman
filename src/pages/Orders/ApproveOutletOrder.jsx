import { Field, FieldArray, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useRef } from "react";
import { connect } from "react-redux";

import { ModalLayout } from "../../components";
import { useLocalStorage } from "../../hooks";
import {
  getAllByproducts,
  approveOrder,
  approveIncompleteOrder,
  availableByProductStock,
} from "../../store/action";

const ApproveOutletOrder = ({
  outletId,
  outletOrderId,
  orderDetails,
  status,
  setOrderInfo,
  byProduct,
  outletName,
  getAllByproducts,
  approveOrder,
  approveIncompleteOrder,
  availableByProductStock,
}) => {
  const { userId, centralKitchenId } = useLocalStorage();

  // Form Validation
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

  return (
    <Formik
      initialValues={{
        Discount: 0,
        Vat: 0,
        NetPrice: 0,
        GrossTotalPrice: 0,
        OutletId: outletId,
        OutletOrderId: outletOrderId,
        ByProductItemBillQuantityDetails: orderDetails?.map(
          ({ name, byProductItemId, unitacronym, quantity, price }) => {
            return {
              name,
              price,
              byProductItemId,
              unitacronym,
              BYPRODUCTITEMID: byProductItemId,
              QUANTITY: quantity,
              STOCKPRICE: 0,
            };
          }
        ),
      }}
      enableReinitialize={true}
      onSubmit={(values, actions) => {
        // console.log(values);
        let successCount = 0;

        // STOCK VALIDATION
        values.ByProductItemBillQuantityDetails?.forEach((singleByproduct) => {
          availableByProductStock(
            singleByproduct.byProductItemId,
            singleByproduct.QUANTITY
          ).then((data) => {
            data?.status !== "OK" &&
              setOrderInfo({
                desc: data?.message,
                type: "danger",
              });

            if (data?.status?.toLowerCase() === "ok") {
              successCount++;
            }

            // only approve if item is available in stock
            if (
              successCount === values.ByProductItemBillQuantityDetails.length
            ) {
              (status === "Incomplete"
                ? approveIncompleteOrder(
                    outletOrderId,
                    JSON.stringify({
                      RetailEngDate: new Date(),
                      UserId: userId,
                      CentralKitchenId: centralKitchenId,
                      ...values,
                    })
                  )
                : approveOrder(
                    outletOrderId,
                    JSON.stringify({
                      RetailEngDate: new Date(),
                      UserId: userId,
                      CentralKitchenId: centralKitchenId,
                      ...values,
                    })
                  )
              )
                .then(() => {
                  // removing customized bootstrap modal
                  $("#approve-order").modal("hide");
                  // reset forms only if finished items stock is added successfully
                  actions.resetForm();
                  setOrderInfo({
                    desc: "Order Approved successfully",
                    type: "success",
                  });
                })
                .catch((e) => {
                  setOrderInfo({
                    desc: "Something went wrong",
                    type: "danger",
                  });
                  console.log(e);
                });
            }
          });
        });

        actions.resetForm();
      }}
    >
      {({ values, errors, touched }) => (
        <Form>
          <ModalLayout
            id="approve-order"
            modalType="Add"
            title="Approve Order"
            multiple={true}
          >
            {/* Top Bill Detail Section */}
            <>
              {/* Outlet Name */}
              <h5 className="text-center font-weight-bold mt-2 title">
                {outletName}
              </h5>
              <br />

              <div className="row  ">
                <div className="form-group col-md-6">
                  <label htmlFor="Discount">Discount:</label>
                  <Field
                    type="Number"
                    step="0.01"
                    min={0.0}
                    max={100.0}
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
                <div className="form-group col-md-6">
                  <label htmlFor="Vat">VAT:</label>
                  <Field
                    type="Number"
                    step="0.01"
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

            {/* Approve Order Details */}
            <div className="table-responsive">
              <table className={`table table-bordered table-center mt-4 `}>
                <thead className="thead-light">
                  <tr>
                    <th>SN</th>
                    <th>Ordered Item</th>
                    <th>
                      <div className="sort">Quantity</div>
                    </th>
                    <th>Price (Rs.)</th>
                  </tr>
                </thead>
                <FieldArray
                  name="ByProductItemBillQuantityDetails"
                  render={(arrayHelpers) => (
                    <tbody>
                      {values.ByProductItemBillQuantityDetails &&
                      values.ByProductItemBillQuantityDetails.length > 0
                        ? values.ByProductItemBillQuantityDetails.map(
                            (datum, index) => (
                              <React.Fragment key={index}>
                                <tr>
                                  <td className="p-4">{index + 1}</td>

                                  <td className="p-4">{`${datum.name} (${datum.unitacronym})`}</td>

                                  <td>
                                    <Field
                                      name={`ByProductItemBillQuantityDetails.${index}.QUANTITY`}
                                      type="number"
                                      step="0.01"
                                      min={0}
                                      max={
                                        orderDetails &&
                                        orderDetails[index]?.quantity
                                      }
                                      required
                                      className={`form-control  `}
                                      onBlur={() => {
                                        availableByProductStock(
                                          datum.byProductItemId,
                                          datum.QUANTITY
                                        ).then((data) => {
                                          data?.status !== "OK" &&
                                            setOrderInfo({
                                              desc: data?.message,
                                              type: "danger",
                                            });
                                        });
                                      }}
                                    />
                                  </td>
                                  <td>
                                    <Field
                                      name={`ByProductItemBillQuantityDetails.${index}.STOCKPRICE`}
                                      type="number"
                                      step="0.01"
                                      min={0}
                                      className={`form-control  `}
                                      value={
                                        (datum.STOCKPRICE = (
                                          datum.QUANTITY * datum.price
                                        ).toFixed(2))
                                      }
                                      required
                                      readOnly
                                    />
                                  </td>
                                </tr>
                              </React.Fragment>
                            )
                          )
                        : null}
                    </tbody>
                  )}
                />
              </table>
            </div>

            {/* Bill Summary */}
            <div className="row  ">
              <div className="form-group col-md-6">
                <label htmlFor="NetPrice">Net Price:</label>
                <Field
                  type="Number"
                  min={0}
                  step="0.01"
                  name="NetPrice"
                  className="form-control"
                  id="NetPrice"
                  value={(() => {
                    let temNetPrice = 0;
                    for (
                      let i = 0;
                      i < values.ByProductItemBillQuantityDetails?.length;
                      i++
                    ) {
                      temNetPrice +=
                        values.ByProductItemBillQuantityDetails[i]?.QUANTITY *
                        values.ByProductItemBillQuantityDetails[i]?.price;
                    }
                    values.NetPrice = temNetPrice.toFixed(2);
                    return temNetPrice.toFixed(2);
                  })()}
                  readOnly
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="GrossTotalPrice">Gross Total Price:</label>
                <Field
                  type="Number"
                  step="0.01"
                  min={0}
                  name="GrossTotalPrice"
                  className="form-control"
                  id="GrossTotalPrice"
                  value={(() => {
                    let temGrossTotalPrice = 0;
                    let temGrossTotalPriceFinal = 0;
                    let temNetPrice = 0;
                    for (
                      let i = 0;
                      i < values.ByProductItemBillQuantityDetails?.length;
                      i++
                    ) {
                      temNetPrice +=
                        values.ByProductItemBillQuantityDetails[i]?.QUANTITY *
                        values.ByProductItemBillQuantityDetails[i]?.price;
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
                  required
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
    byProduct: state.byProduct,
  };
};

export default connect(mapStateToProps, {
  getAllByproducts,
  approveOrder,
  approveIncompleteOrder,
  availableByProductStock,
})(ApproveOutletOrder);
