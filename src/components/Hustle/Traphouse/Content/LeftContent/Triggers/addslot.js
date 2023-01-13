import React, { useState } from "react";
import AddForm from "../../RightContent/AddForm";

const AddSlotBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="">
      <p
        className="my-5 flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525] cursor-pointer rounded-md "
        onClick={() => setIsOpen(true)}
      >
        Add Slot
      </p>
      <AddForm isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default AddSlotBtn;
