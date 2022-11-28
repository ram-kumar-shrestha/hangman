import React from "react";
import Title from "../title";

const ModalLayout = ({
  id,
  children,
  modalType,
  title,
  formik,
  multiple = false,
  billClearHandle,
  confirmModal = false,
}) => {
  const formContent = (
    <>
      {children}
      <div className="d-flex justify-content-end mt-2">
        <button
          type="button"
          className="btn btn-outline-secondary mr-2 px-4 font-weight-bold"
          data-dismiss="modal"
        >
          Close
        </button>
        <button
          type="submit"
          className={`btn ${
            modalType === "Add" ? "btn-outline-primary" : "btn-outline-danger"
          } px-5 font-weight-bold`}
        >
          {modalType}
        </button>
      </div>
    </>
  );
  return (
    <section id={id} className="modal fade" data-modal-type={modalType}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header d-flex justify-content-between align-items-center ">
            <Title value={title} />

            <span className="close-modal float-right" data-dismiss="modal">
              &#10008;
            </span>
          </div>
          {/* this has been done to avoid two form DOM element in Add Finished Items*/}
          {confirmModal ? (
            children //for confirm modal
          ) : multiple ? (
            formContent
          ) : (
            <form onSubmit={billClearHandle || formik?.handleSubmit}>
              {formContent}
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ModalLayout;
