import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import { Table, Title } from "../../components";
import { getSingleOwner } from "../../store/action";

const OwnerDetail = ({ getSingleOwner, owner }) => {
  const { id } = useParams();
  const [refinedOwner, setRefinedOwner] = useState([]);
  const [specificName, setSpecificName] = useState("");

  useEffect(() => {
    document.title = "Syanko Katti Roll - Owner Detail";

    getSingleOwner(id)
      .then(() => {
        let { ["outlets"]: outlets } = owner;
        let { ["specifiedOwnerName"]: ownerSpecificName } = owner;

        setSpecificName(ownerSpecificName);

        setRefinedOwner(
          //outletId and centralKitchen may get used in future if central kitchen is more than one
          outlets.map(({ name, address, phoneNo, isActive }) => {
            return {
              name,
              address,
              phoneNo,
              ["Status"]: isActive ? "Active" : "Inactive",
            };
          })
        );
      })
      .catch((e) => console.log(e));
  }, [id, owner?.outlets]);

  return (
    <>
      <Title value="Owner Details" />
      <h6 className="mt-4">
        Unique User Name:<strong> {specificName}</strong>
      </h6>
      <Table items={refinedOwner} />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    owner: state.owner,
  };
};

export default connect(mapStateToProps, { getSingleOwner })(OwnerDetail);
