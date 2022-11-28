import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { FormGroup, ModalLayout } from "../../components";
import {
  getAllDropdownRawStock,
  getAllDropdownByproductStock,
  availableRawStockWithinBatch,
  availableByProductStockWithinBatch,
  addBadStock,
} from "../../store/action";

const AddBadStock = ({
  setMessage,
  dropdown,
  getAllDropdownRawStock,
  getAllDropdownByproductStock,
  availableRawStockWithinBatch,
  availableByProductStockWithinBatch,
  addBadStock,
}) => {
  useEffect(() => {
    // default stock options
    getAllDropdownRawStock();
  }, []);

  const formik = useFormik({
    initialValues: {
      ItemType: "raw",
      StockId: dropdown[0]?.rawStockId || dropdown[0]?.finishedItemId,
      StockType: "Defective",
      Quantity: "",
      Remarks: "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      // console.table(values);

      (formik.values.ItemType === "raw"
        ? availableRawStockWithinBatch(
            formik.values.StockId,
            formik.values.Quantity
          )
        : availableByProductStockWithinBatch(
            formik.values.StockId,
            formik.values.Quantity
          )
      ).then((data) => {
        data?.status !== "OK" &&
          setMessage({
            desc: data?.message,
            type: "danger",
          });

        data?.status === "OK" &&
          addBadStock(JSON.stringify(values))
            .then(() => {
              // removing customized bootstrap modal
              $("#add-bad__stock").modal("hide");

              setMessage({
                desc: "Bad Stock added successfully",
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
      });
    },
  });

  return (
    <ModalLayout
      id="add-bad__stock"
      modalType="Add"
      title="Add Bad Stock"
      formik={formik}
    >
      {/* Top Bill Detail Section */}
      <>
        <div
          className="form-group custom-radio mt-3"
          role="group"
          aria-labelledby="my-radio-group"
        >
          <label className="mr-2">Item Type:</label>

          <input
            type="radio"
            className="btn-check"
            name="ItemType"
            id="raw"
            value="raw"
            onChange={formik.handleChange}
            defaultChecked={formik.values.ItemType === "raw"}
            onClick={() => getAllDropdownRawStock()}
          />
          <label className="btn btn-outline-info" htmlFor="raw" id="raw">
            Raw
          </label>

          <input
            type="radio"
            className="btn-check"
            name="ItemType"
            id="finished"
            value="finished"
            onChange={formik.handleChange}
            defaultChecked={formik.values.ItemType === "finished"}
            onClick={() => getAllDropdownByproductStock()}
          />
          <label
            className="btn btn-outline-success"
            htmlFor="finished"
            id="finished"
          >
            ByProduct
          </label>
        </div>

        <FormGroup
          inputMethod="select"
          id="StockId"
          label="Stock Name:"
          type="Number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.StockId}
          options={dropdown?.map(
            ({
              rawStockId,
              finishedItemId,
              byProductItem,
              batchNo,
              itemName,
            }) => {
              return {
                name: `${itemName || byProductItem?.name} (${batchNo}) `,
                id: rawStockId || finishedItemId,
              };
            }
          )}
        />

        <FormGroup
          inputMethod="select"
          id="StockType"
          label="Stock Type:"
          type="Number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.StockType}
          options={[
            { name: "Defective", id: "Defective" },
            { name: "Loss", id: "Loss" },
          ]}
        />

        <FormGroup
          inputMethod="input"
          id="Quantity"
          label="Quantity:"
          type="Number"
          onChange={formik.handleChange}
          onBlur={() => {
            console.log(formik.values.ItemType);
            (formik.values.ItemType === "raw"
              ? availableRawStockWithinBatch(
                  formik.values.StockId,
                  formik.values.Quantity
                )
              : availableByProductStockWithinBatch(
                  formik.values.StockId,
                  formik.values.Quantity
                )
            ).then((data) => {
              data?.status !== "OK" &&
                setMessage({
                  desc: data?.message,
                  type: "danger",
                });
            });
          }}
          value={formik.values.Quantity}
        />

        <FormGroup
          inputMethod="input"
          id="Remarks"
          label="Remarks:"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.Remarks}
        />
      </>
    </ModalLayout>
  );
};
const mapStateToProps = (state) => {
  return {
    dropdown: state.dropdown,
  };
};

export default connect(mapStateToProps, {
  getAllDropdownRawStock,
  getAllDropdownByproductStock,
  availableRawStockWithinBatch,
  availableByProductStockWithinBatch,
  addBadStock,
})(AddBadStock);
