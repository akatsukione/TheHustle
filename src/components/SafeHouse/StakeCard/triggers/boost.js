import React, { useState } from "react";
import AddBoost from "../AddBoost";

const BoostTrigger = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-[132px] mx-auto">
      <div
        className="my-5 block flex flex-col items-center justify-center border border-[#2F2F2E] text-lime-400 hover:bg-[#252525] flex h-20 w-full items-center justify-center rounded-xl"
        onClick={() => setIsOpen(true)}
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 448 512"
          className="text-5xl text-lime-400"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
        </svg>
      </div>
      <AddBoost setIsOpen={setIsOpen} isOpen={isOpen} />
    </div>
  );
};

export default BoostTrigger;
