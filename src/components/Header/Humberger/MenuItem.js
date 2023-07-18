import React from "react";
import { Link } from "react-router-dom";

const MenuItem = ({ text, url, noLink = false, handleCloseDrawer }) => {
  const handleClick = () => {
    if (handleCloseDrawer) {
      handleCloseDrawer();
    }
  };

  return (
    <div
      className={`cursor-pointer bg-gradient-to-r bg-clip-text text-md font-Montserrat capitalize tracking-wide  text-[#787878] hover:text-[#e2e3e6] ${
        noLink ? "" : "my-2.5"
      }`}
      onClick={handleClick}
    >
      {noLink ? (
        text
      ) : (
        <Link to={url} style={{ all: "inherit" }}>
          {text}
        </Link>
      )}
    </div>
  );
};

export default MenuItem;
