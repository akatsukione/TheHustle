import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import icon1 from "assets/images/icons/solo-g.png";
import AddCharacter from "./AddCharacter";
import AddPass from "./AddPass";
import Character from "./Character";
import AddSlotBtn from "./Triggers/addslot";

const LeftContent = () => {
  const [character] = useState([1]);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="order-2 w-full md:w-1/2 lg:order-1 lg:w-4/12">
      <div className="mx-4 box-border  pb-4 ">
        <div className="mb-2 flex items-center justify-between">
          <div className="ml-4 flex items-center gap-x-2">
            <div className="w-8">
              <img src={icon1} alt="Solo G" className="object- h-full w-full" />
            </div>
            <p className=" text-center text-xl font-bold text-olive">
              Crew Members: 0/1
            </p>
          </div>
          <AddSlotBtn />
        </div>
        <div className="mr-2 mb-5 box-border h-80 overflow-hidden overflow-y-auto rounded-md border border-[#2F2F2E] p-6  text-center">
          <div className="justify-center- flex h-full flex-wrap items-center">
            {character.length > 0 && character.map((i) => <Character />)}
            <Add />
          </div>
        </div>

        <div className="mt-2">
          <p className="text-center  font-bold text-olive">Locked Up</p>

          <div className="mt-3 flex items-center justify-center gap-x-2">
            <div className="w-6">
              <img src={icon1} alt="Solo G" className="object- h-full w-full" />
            </div>
            <p className="text-center text-lg text-white">0/1</p>
          </div>
          <div className="mx-auto mt-2 w-5/12">
            <div
              className="my-5 flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525] flex h-24 w-full items-center justify-center rounded-xl"
              onClick={() => setIsOpen(true)}
            >
              <FaPlus className="text-5xl text-lime-400" />
            </div>
            <p className="my-5 flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525] mt-3 w-full rounded-md text-center capitalize">
              Get Out of jail
            </p>
          </div>
          <AddPass isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
    </div>
  );
};

const Add = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-1/2 ">
      <div className=" m-2 w-full">
        <div
          className="flex h-40 w-full cursor-pointer items-center justify-center  rounded-xl border border-[#2F2F2E] "
          onClick={() => setIsOpen(true)}
        >
          <FaPlus className="text-5xl text-lime-400" />
        </div>
        <AddCharacter setIsOpen={setIsOpen} isOpen={isOpen} />
      </div>
    </div>
  );
};

export default LeftContent;
