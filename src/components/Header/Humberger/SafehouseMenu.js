import React, { useState } from "react";
import MenuItem from "./MenuItem";

const SafehouseMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menusList = [
    {
      id: 1,
      label: "Profile",
      url: "/profile",
    },
    {
      id: 2,
      label: "G-Rank",
      url: "/g-rank",
    },
    {
      id: 3,
      label: "Safe",
      url: "/safe",
    },
    {
      id: 4,
      label: "Leaderboard",
      url: "/leaderboard",
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
        <MenuItem text={"Safehouse"} noLink />
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

export default SafehouseMenu;

