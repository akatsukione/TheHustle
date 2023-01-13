import React from "react";
import image1 from "assets/images/hustle/safehouse.PNG";
import StakeCard from "components/SafeHouse/StakeCard/StakeCard";

const Safe = () => {
  return (
    <>
      <div className="img flex justify-center">
        <img width="300" height="200" src={image1} alt="Safe House Logo" />
      </div>
      <div className="pt-12 pb-10 md:min-h-screen ">
        <div className="lg:container mx-auto">
          <StakeCard />
        </div>
      </div>
    </>
    
  );
};

export default Safe;
