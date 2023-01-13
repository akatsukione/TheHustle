import React, { useState } from "react";
import MenuItem from "./MenuItem";

const Postoffice = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menusList = [
    {
      id: 1,
      label: "Transfers",
      url: "/transfers",
    },
    {
      id: 2,
      label: "Laundering",
      url: "/laundering",
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
        <MenuItem text={"Post Office"} noLink />
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

export default Postoffice;
