import React from "react";
// import Bottom from './Bottom';
import Content from "./Content";
import Top from "./Top";
import { UALProvider, withUAL } from "ual-reactjs-renderer";

const Consignment = ({ ual }) => {  
  return (
    <div className="py-10 md:min-h-screen">
      <div className="container mx-auto ">
        <Top ual={ual} />
        <Content ual={ual} />
        {/* <Bottom /> */}
      </div>
    </div>
  );
};

export default withUAL(Consignment);
