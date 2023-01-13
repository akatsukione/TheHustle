import React, { useState } from "react";
import AddForm from "../AddForm";

const UpgradeSlotTrigger = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="">
      <button
        className="my-5 block flex flex-col items-center justify-center rounded-lg rounded-lg border border-[#2F2F2E] bg-[#111] py-3 px-3 text-lime-400 hover:bg-[#252525] my-3 px-4 py-3"
        onClick={() => setIsOpen(true)}
      >
        Add Slot
      </button>
      <AddForm setIsOpen={setIsOpen} isOpen={isOpen} />
    </div>
  );
};

export default UpgradeSlotTrigger;
