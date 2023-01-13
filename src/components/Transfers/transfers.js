import React from "react";
import TransfersLogo from "assets/images/transfers/transfers.PNG";
import DropZone from "./dropzone";
import ForeignExchange from "./foreignexchange";

const Transfers = ({ ual }) => {
    return (
      <div className="laundering-page">
        <div className="py-10 md:min-h-screen">
          <div className="container mx-auto ">
            <div className="flex flex-col items-center">
              <div className="img flex justify-center">
                <img
                  width="300"
                  height="200"
                  src={TransfersLogo}
                  alt="Transfers Logo"
                />
              </div>
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-y-24 md:flex-row md:items-start md:gap-x-24">
              <DropZone ual={ual}/>
              <ForeignExchange ual={ual}/>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Transfers;
