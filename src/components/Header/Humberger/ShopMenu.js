import React, { useState } from "react";
import MenuItem from "./MenuItem";

const ShopMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
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


  const handleItemClick = () => {
    setIsOpen(false);
  };

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="">
      <div onClick={handleMenuClick}>
        <MenuItem text={"Shop"} noLink />
      </div>
      <ul className={`ml-6 ${isOpen ? "block" : "hidden"}`}>
        {menusList.map((item) => (
          <li key={item.id}>
            <MenuItem text={item.label} url={item.url} onClick={handleItemClick} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShopMenu;
