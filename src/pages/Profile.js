import React from "react";
import profilelogo from "assets/images/hustle/profile.PNG";
import Information from "components/SafeHouse/Information";

const Profile = ({ual}) => {
  return (
    <>
      <div className="img flex justify-center">
        <img width="300" height="200" src={profilelogo} alt="Profile Logo" />
      </div>
      <div className="flex w-full flex-col gap-x-24 gap-y-24 md:flex-row md:justify-center">
        <div className="mx-auto flex w-3/4 flex-col gap-y-5 md:mx-0 md:w-2/5">
          <Information ual={ual}/>
        </div>
      </div>
    </>
    
  );
};

export default Profile;
