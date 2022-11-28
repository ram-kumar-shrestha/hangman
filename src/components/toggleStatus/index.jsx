import React from "react";

import "./toggle.css";

const ToggleStatus = ({ status, changeHandler = null, billNumber = 0 }) => {
  return (
    <>
      <label className="switch no-print">
        <input
          type="checkbox"
          checked={status ? true : false}
          onChange={changeHandler} //not used for billings
          data-is-cleared={billNumber && status} //used only for billings
          data-toggle={billNumber && !status && "modal"}
          data-target={billNumber && !status && `#clear-bill-${billNumber}`} //`clear-bill-${billNumber}` is used to open unique modal
          readOnly
          className="no-print"
        />
        <span className="slider round no-print"></span>
      </label>
    </>
  );
};

export default ToggleStatus;
