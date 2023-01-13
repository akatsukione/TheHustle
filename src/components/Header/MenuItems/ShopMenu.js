import React, { useState } from "react";
import DropDown from "components/shared/DropDown/DropDown";
import Menus from "./Menus";

const ShopMenu = () => {
  const [isShow, setIsShow] = useState(false);

  const menusList = [
    {
      id: 1,
      label: "Pack Shop",
      url: "/pack-shop",
    },
    {
      id: 2,
      label: "Booster Shop",
      url: "/booster-shop",
    },
    {
      id: 3,
      label: "Merch Shop",
      url: "/merch-shop",
    },
  ];

  return (
    <DropDown
      isShow={isShow}
      onClose={setIsShow}
      width={'220px'}
      element={<Menus list={menusList} onSubmit={setIsShow} />}
    >
      <div type="button">
        <div
          className={`cursor-pointer bg-gradient-to-r bg-clip-text font-Montserrat font-bold capitalize tracking-wide ${
            isShow ? "text-[#e2e3e6]" : "text-[#787878]"
          }`}
          onClick={(e) => {
            e.preventDefault();
            setIsShow(true);
          }}
        >
          Shop
        </div>
      </div>
    </DropDown>
  );
};

export default ShopMenu;
