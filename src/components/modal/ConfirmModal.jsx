import ModalLayout from "./ModalLayout";

const ConfirmModal = ({ title, setIsConfirmed, values, items }) => {
  return (
    <ModalLayout
      id="confirm-modal"
      modalType="Confirm"
      title={title}
      confirmModal={true}
    >
      <div className="modal-info  p-4">
        <h6 className="modal-title">
          Are you sure to request the following order ?
        </h6>
      </div>
      <table className="table table-centered ">
        <thead>
          <th>SN</th>
          <th>Name</th>
          <th>Quantiy</th>
        </thead>

        <tbody>
          {values?.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {
                    items.filter(
                      (el) => el.byProductItemId == item.ByProductItemId
                    )[0]?.name
                  }
                </td>
                <td>{item.Quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

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
          className={`btn btn-outline-primary px-5 font-weight-bold`}
          onClick={() => setIsConfirmed(true)}
        >
          Proceed
        </button>
      </div>
    </ModalLayout>
  );
};

export default ConfirmModal;
