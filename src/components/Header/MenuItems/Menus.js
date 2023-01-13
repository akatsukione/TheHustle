import React from "react";
import { Link, useLocation } from "react-router-dom";
const Menus = ({ list, onSubmit }) => {
  const location = useLocation();

  return (
    <ul className="custom-shadow bg-black py-1  md:text-md lg-text-lg text-olive">
      {list.map((item) => (
        <li
          className="cursor-pointer bg-gradient-to-r text-[#787878] hover:text-[#e2e3e6] bg-clip-text font-Montserrat capitalize tracking-wide py-2 px-3"
          key={item?.id || Math.random()}
          onClick={() => onSubmit(false)}
        >
          <Link className={`${location.pathname == item.url ? "active" : "inactive"}`} to={item.url}>{item.label}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Menus;
