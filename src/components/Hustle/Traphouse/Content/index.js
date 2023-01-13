import React from "react";
import LeftContent from "./LeftContent";
import MiddleContent from "./MiddleContent";
import RightContent from "./RightContent";
const Content = () => {
  return (
    <div>
      <div className="locked-area locked flex flex-col flex-wrap items-center justify-between pb-6 md:flex-row md:items-start md:gap-y-5">
        <LeftContent />
        <MiddleContent />
        <RightContent />
      </div>
    </div>
  );
};

export default Content;
