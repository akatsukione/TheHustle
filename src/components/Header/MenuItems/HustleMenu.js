import React, { useState } from "react";
import DropDown from "components/shared/DropDown/DropDown";
import Menus from "./Menus";

const HustleMenu = () => {
  const [isShow, setIsShow] = useState(false);

  const menusList = [
    {
      id: 1,
      label: "Consignment",
      url: "/consignment",
    },
    {
      id: 2,
      label: "The Corner",
      url: "/the-corner",
    },
    {
      id: 3,
      label: "The Traphouse",
      url: "/the-traphouse",
    },
    {
      id: 4,
      label: "Clandestine Lab",
      url: "/clandestine-lab",
    },
    {
      id: 5,
      label: "Raid",
      url: "/Raid",
    },
  ];

  return (
    <DropDown
      isShow={isShow}
      onClose={setIsShow}
      element={<Menus list={menusList} onSubmit={setIsShow} />}
    >
      <div>
        <div
          className={`cursor-pointer bg-gradient-to-r bg-clip-text font-Montserrat font-bold capitalize tracking-wide ${
            isShow ? "text-[#e2e3e6]" : "text-[#787878]"
          }`}
          onClick={(e) => {
            e.preventDefault();
            setIsShow(!isShow);
          }}
        >
          Hustle
        </div>
      </div>
    </DropDown>
  );
};

export default HustleMenu;
