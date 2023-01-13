import React from "react";
import Information from "./Information";
import StakeCard from "./StakeCard/StakeCard";

const LeftSide = () => {
  return (
    <>
      <div className="mb-4 lg:mb-0 md:w-[360px] shrink-0">
        <Information />
        <StakeCard />
      </div>
    </>
  );
};

export default LeftSide;
