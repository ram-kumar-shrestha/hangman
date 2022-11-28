import { Field, FieldArray, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Calendar from "@sbmdkl/nepali-datepicker-reactjs";
import "@sbmdkl/nepali-datepicker-reactjs/dist/index.css";

import { ModalLayout } from "../../components";
import { useLocalStorage } from "../../hooks";
import {
  getAllDropdownByproducts,
  addfinishedItemStocks,
  getAllDropdownRawItems,
  availableRawStock,
} from "../../store/action";
import { NepaliDateValidate } from "../../helpers";

const AddFinishedItemStock = ({
  dropdown,
  getAllDropdownByproducts,
  addfinishedItemStocks,
  getAllDropdownRawItems,
  availableRawStock,
  setMessage,
}) => {
  const { userId, centralKitchenId } = useLocalStorage();

  const [nepaliDate, setNepaliDate] = useState("");
  const [refinedRawItems, setRefinedRawItems] = useState([]);
  const [refinedByproducts, setRefinedByproducts] = useState([]);

  useEffect(() => {
    getAllDropdownByproducts()
      .then((data) => setRefinedByproducts(data))
      .catch((e) => console.error(e));

    getAllDropdownRawItems()
      .then((data) => setRefinedRawItems(data))
      .catch((e) => console.error(e));
  }, []);

  const BatchNoValidate = (value) => {
    let error;

    if (!value) {
      error = "*Batch Number Required";
    }

    return error;
  };

  const todayNepDate = NepaliFunctions.GetCurrentBsDate();

  return (
    <>
      <Formik
        initialValues={{
          ByProductItemId: refinedByproducts[0]?.byProductItemId,
          // BatchNo: "",
          // ExpiredEngDate: "",
          ExpiredNepDate: `${todayNepDate.year}-${todayNepDate.month}-${todayNepDate.day}`,
          FinishedItemIngredientDetails: [
            {
              ItemId: refinedRawItems[0]?.itemId,
              Quantity: "",
            },
          ],
          FinishedItemQuantityDetails: [
            {
              TotalQuantity: 0,
            },
          ],
        }}
        enableReinitialize={true}
        onSubmit={(values, actions) => {
          let successCount = 0;
          let dateCount = 0;
          //out of stock message
          values.FinishedItemIngredientDetails.forEach((item) => {
            const { dayBeforeToday } = NepaliDateValidate(nepaliDate);

            if (dayBeforeToday) {
              return setMessage({
                desc: "Expiration Date can not be day before today",
                type: "danger",
              });
            } else {
              dateCount++;
            }

            availableRawStock(item.ItemId, item.Quantity).then((data) => {
              data?.status !== "OK" &&
                setMessage({
                  desc: data?.message,
                  type: "danger",
                });

              if (data?.status?.toLowerCase() === "ok") {
                successCount++;
              }

              // Confirmation Dialog
              // add finished stock
              // only approve if item is available in stock
              if (
                successCount === values.FinishedItemIngredientDetails.length &&
                dateCount === values.FinishedItemIngredientDetails.length
              ) {
                confirm(message)
                  ? addfinishedItemStocks(
                      JSON.stringify({
                        ManufacturedDate: new Date(),
                        UserId: userId,
                        CentralKitchenId: centralKitchenId,
                        ...values,
                      })
                    )
                      .then(() => {
                        // removing customized bootstrap modal
                        $("#add-finished__items").modal("hide");

                        // reset forms only if finished items stock is added successfully
                        actions.resetForm();

                        setMessage({
                          desc: "Finished Stock added successfully",
                          type: "success",
                        });
                      })
                      .catch((e) => {
                        setMessage({
                          desc: "Something went wrong",
                          type: "danger",
                        });
                        console.log(e);
                      })
                  : "";
              }
            });
          });

          // information detail for confirmation dialog
          let ingredients = [];

          const selectedByproduct = refinedByproducts.filter(
            (item) => item.byProductItemId === parseInt(values.ByProductItemId)
          )[0];

          values.FinishedItemIngredientDetails.forEach((ingredient, index) => {
            let selectedRawItem = refinedRawItems.filter(
              (raw) => raw.itemId === parseInt(ingredient.ItemId)
            )[0];

            ingredients = [
              ...ingredients,
              `${selectedRawItem.name} -> ${ingredient.Quantity} ${selectedRawItem.unit.acronym}`,
            ];
          });

          const message = `
          Are you sure to add following finished item?
          Byproduct Name: ${selectedByproduct.name} ( ${
            selectedByproduct.unit.acronym
          } )
          Quantity: ${values.FinishedItemQuantityDetails[0].TotalQuantity} ${
            refinedByproducts.filter(
              (item) => item.byProductItemId === values.ByProductItemId
            )[0]?.unit.acronym
          }
          Ingredients: ${ingredients}
          `;
        }}
      >
        {({ values, errors, touched }) => (
          <Form>
            <ModalLayout
              id="add-finished__items"
              modalType="Add"
              title="Add Finished Item"
              multiple={true}
            >
              <div className="row">
                <div className="form-group col-md-6 mb-0">
                  <label htmlFor="item">Byproduct Name:</label>

                  <Field
                    as="select"
                    name="ByProductItemId"
                    className="form-control"
                    id="item"
                  >
                    {refinedByproducts.map((item) => (
                      <option
                        value={item.byProductItemId}
                        key={item.byProductItemId}
                      >
                        {`${item.name} ( ${item.unit.acronym})`}
                      </option>
                    ))}
                  </Field>
                </div>

                <div className="form-group col-md-6 mb-0">
                  <label htmlFor="quantity">Quantity:</label>

                  <Field
                    type="number"
                    min={0}
                    name="FinishedItemQuantityDetails.[0].TotalQuantity"
                    className="form-control"
                    id="quantity"
                    required
                  />
                </div>
              </div>

              <div className="row">
                {/* <div className="form-group col-md-6 mb-0">
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

                <div className="form-group col-md-6 mb-0">
                  <label htmlFor="ExpiredEngDate">Expiration Date:</label>

                  {/* <Field
                    type="Date"
                    name="ExpiredEngDate"
                    className="form-control"
                    id="ExpiredEngDate"
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                   */}

                  <Calendar
                    theme="dark"
                    className="form-control nepali-date"
                    onChange={({ bsDate }) => (values.ExpiredNepDate = bsDate)}
                    name="ExpiredNepDate"
                    required
                    language="en"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="item">Raw Items:</label>
                <div className="table-responsive">
                  <FieldArray
                    name="FinishedItemIngredientDetails"
                    render={(arrayHelpers) => (
                      <>
                        <table className="table table-bordered table-center mt-4">
                          <thead className="thead-light">
                            <tr>
                              <th>SN</th>
                              <th>Item</th>
                              <th>Quantity</th>
                              <th>Action</th>
                            </tr>
                          </thead>

                          <tbody>
                            {values.FinishedItemIngredientDetails.map(
                              (items, index) => (
                                <React.Fragment key={index}>
                                  <tr>
                                    <td className="p-4">{index + 1}</td>

                                    <td>
                                      <Field
                                        name={`FinishedItemIngredientDetails.${index}.ItemId`}
                                        as="select"
                                        className="form-control"
                                      >
                                        {refinedRawItems?.map(
                                          (raw, rawIndex) => {
                                            // preventing addition of same raw item multiple times
                                            if (rawIndex < index) {
                                              return null;
                                            }
                                            return (
                                              <option
                                                value={raw.itemId}
                                                key={raw.itemId}
                                              >
                                                {`${raw.name} ( ${raw.unit.acronym})`}
                                              </option>
                                            );
                                          }
                                        )}
                                      </Field>
                                    </td>

                                    <td>
                                      <Field
                                        type="Number"
                                        name={`FinishedItemIngredientDetails.${index}.Quantity`}
                                        className="quantity form-control "
                                        onBlur={() =>
                                          availableRawStock(
                                            items.ItemId,
                                            items.Quantity
                                          ).then((data) => {
                                            data?.status !== "OK" &&
                                              setMessage({
                                                desc: data?.message,
                                                type: "danger",
                                              });
                                          })
                                        }
                                        required
                                      />
                                    </td>

                                    <td>
                                      <button
                                        className="btn btn-outline-primary mr-2 "
                                        type="button"
                                        onClick={() =>
                                          index === dropdown.length - 1 //preventing adding more rows than raw items
                                            ? null
                                            : arrayHelpers.push({
                                                ItemId:
                                                  refinedRawItems[index + 1]
                                                    ?.itemId,
                                                Quantity: "",
                                              })
                                        }
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
                                </React.Fragment>
                              )
                            )}
                          </tbody>
                        </table>
                      </>
                    )}
                  />
                </div>
              </div>
            </ModalLayout>
          </Form>
        )}
      </Formik>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    dropdown: state.dropdown,
  };
};

export default connect(mapStateToProps, {
  getAllDropdownByproducts,
  addfinishedItemStocks,
  getAllDropdownRawItems,
  availableRawStock,
})(AddFinishedItemStock);
