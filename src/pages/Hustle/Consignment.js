import React from "react";
import ConsignmentContainer from "components/Hustle/Consignment/Consignment";
import { UALProvider, withUAL } from "ual-reactjs-renderer";
const Consignment = ({ ual }) => {
  return (
    <div>
      <ConsignmentContainer ual={ual} />
    </div>
  );
};

export default Consignment;
