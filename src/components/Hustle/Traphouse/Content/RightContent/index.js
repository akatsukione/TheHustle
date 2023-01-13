import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import icon1 from "assets/images/icons/solo-bood.png";
import AddBoost from "./AddBoost";
import AddForm from "./AddForm";
import data from "./data.json";
const RightContent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [slots, setSlots] = useState(data);
  const [totalSlots] = useState(8);

  useEffect(() => {
    setSlots(data.slice(0, 3));
  }, []);

  return (
    <div className=" order-3 mt-12 w-full md:mt-0 md:w-1/2 lg:w-4/12 ">
      <div className="mb-2 flex flex-wrap items-center justify-around">
        <div className="ml-4 flex items-center gap-x-2">
          <div className="w-10">
            <img
              src={icon1}
              alt="Solo Blood"
              className="object- h-full w-full"
            />
          </div>
          <p className=" text-center text-xl font-bold text-olive">
            Active Boosts: {slots.length} / {totalSlots}
          </p>
        </div>
        <p
          className="my-5 flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525] cursor-pointer rounded-md "
          onClick={() => setIsOpen(true)}
        >
          Add Slot
        </p>
      </div>
      <div className="mx-3 mr-2 h-80  overflow-y-auto rounded-xl border border-[#2F2F2E] p-8  ">
        <div className="flex flex-wrap gap-y-4 ">
          {slots.map((slot) => (
            <Item image={slot.image} key={slot.id} />
          ))}
          <Add />
        </div>
      </div>
      <AddForm setIsOpen={setIsOpen} isOpen={isOpen} />
    </div>
  );
};

const Item = ({ image }) => {
  return (
    <div className="w-full sm:w-1/2 md:w-full xl:w-1/2 ">
      <div className="h-32 w-full px-2">
        <img src={image} alt="No Clue" className="h-full w-full object-cover" />
      </div>
    </div>
  );
};
const Add = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full sm:w-1/2 md:w-full xl:w-1/2 ">
      <div
        className="flex h-32 w-full cursor-pointer items-center  rounded-xl justify-center border border-[#2F2F2E] px-2"
        onClick={() => setIsOpen(true)}
      >
        <FaPlus className="text-5xl text-lime-400" />
      </div>
      <AddBoost isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default RightContent;
