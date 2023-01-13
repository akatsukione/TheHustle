import React, { useState } from "react";
import DropDown from "components/shared/DropDown/DropDown";
import settingsIcon from "assets/images/icons/settings.png";
import Endpoints from "./MenuItems/Endpoints";

const GearMenus = () => {
  const [isShow, setIsShow] = useState(false);

  return (
    <DropDown
      isShow={isShow}
      left={-100}
      onClose={setIsShow}
      element={<Endpoints />}
    >
      <div>
        <button
          className="w-8 cursor-pointer"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setIsShow(!isShow);
          }}
        >
          <img src={settingsIcon} className="h-full w-full" alt="settings" />
        </button>
      </div>
    </DropDown>
  );
};

export default GearMenus;
