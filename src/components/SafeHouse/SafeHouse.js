import React from "react";
import image1 from "assets/images/hustle/safehouse.PNG";
import LeftSide from "./LeftSide";
import SafeHouseTable from "./SafeHouseTable";

const SafeHouse = () => {
  return (
    <>
      <div className="img flex justify-center">
        <img width="300" height="200" src={image1} alt="Safe House Logo" />
      </div>
      <div className="md:flex">
        <LeftSide />
        <SafeHouseTable />
      </div>
    </>
  );
};

export default SafeHouse;
