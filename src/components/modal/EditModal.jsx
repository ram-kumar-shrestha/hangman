import { connect } from "react-redux";

import { editPassword } from "../../store/action";

import "./modal.css";
import { useFormik } from "formik";
import ModalLayout from "./ModalLayout";
import FormGroup from "../form-group";
import { EditPasswordValidate } from "../../helpers";

const EditModal = ({ id, username, editPassword }) => {
  const formik = useFormik({
    initialValues: {
      Password: "",
    },
    validate: EditPasswordValidate,
    onSubmit: (values) => {
      // console.log(id, JSON.stringify(values));

      editPassword(id, JSON.stringify(values))
        .then(() => {
          // document.querySelector(".modal-backdrop").remove();
          $("#editModal").modal("hide");
        })
        .catch((e) => console.log(e));

      // reset form
      formik.resetForm();
    },
  });

  return (
    <ModalLayout
      id="editModal"
      modalType="Edit"
      title="Edit Password"
      formik={formik}
    >
      <div className="modal-info my-4 p-4">
        <h6 className="modal-title">
          Are you sure to edit password for <b>{username}</b>?
        </h6>

        <FormGroup
          inputMethod="input"
          id="Password"
          label="Password:"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.Password}
          error={formik.errors.Password}
          touched={formik.touched.Password}
          styleProp="mt-4"
        />
      </div>
    </ModalLayout>
  );
};

export default connect(null, { editPassword })(EditModal);
