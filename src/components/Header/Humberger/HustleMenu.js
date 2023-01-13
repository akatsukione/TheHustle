import React, { useState } from "react";
import MenuItem from "./MenuItem";

const HustleMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
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
      url: "/raid",
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
        <MenuItem text={"Hustle"} noLink />
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

export default HustleMenu;

