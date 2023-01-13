import React, { useEffect, useState, useCallback  } from "react";
import { FaPlus } from "react-icons/fa";
import icon1 from "assets/images/icons/solo-bood.png";
import AddBoost from "./AddBoost";
import AddForm from "./AddForm";
import data from "./data.json";
import { useDispatch, useSelector } from "react-redux";

import { anchorGetConsignmentSlots, getUpgradeCostsForConsignmentBooster, anchorGetConsignmentBoosters, anchorGetConsignmentBoostersInfo } from "BlockchainInteractionWax";


const RightContent = ({ual}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [slots, setSlots] = useState([]);
  const [currentSlots, setCurrentSlots] = useState(0);
  const [currentUsedSlots, setCurrentUsedSlots] = useState(0);
  const [upgradeSlotsCost, setUpgradeSlotsCost] = useState({
    clean_cash: 0,
    dirty_cash: 0,
    hustler_token: 0,
    slot_number: 0,
    upgrade_token: 0
  });

  const store = useSelector((state) => state);

  const fetchData = async () => {
      const value = await anchorGetConsignmentSlots(ual);
      setCurrentSlots(value);     
      const value1 = await anchorGetConsignmentBoosters(ual);
      setCurrentUsedSlots(value1);
      const upgradeCost = await (getUpgradeCostsForConsignmentBooster(ual, value)); 
      setUpgradeSlotsCost(upgradeCost)
      const imageData = await anchorGetConsignmentBoostersInfo(ual)
      setSlots(imageData);
  };

  useEffect(() => {
    fetchData();
  }, [store]);

  return (
    <div className=" order-3 mt-12 w-full md:mt-0 md:w-1/2 lg:w-4/12">
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
            Active Boosts: {currentUsedSlots} / {currentSlots}
          </p>
        </div>
        {currentSlots < 4 && (
        <p
          className="my-5 flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525] cursor-pointer rounded-md "
          onClick={() => setIsOpen(true)}
        >
          Add Slot
        </p>
      )}
      </div>
      <div className="mx-3 mr-2 h-80 overflow-y-auto rounded-md border border-[#2F2F2E] p-8">
      <div className="flex flex-wrap gap-y-4 ">
        {slots.map((slot) => (
          <Item image={slot.image} key={slot.id} />
        ))}
        {currentUsedSlots < 4 && <Add ual={ual} />}
      </div>
    </div>
    {currentUsedSlots < 4 && (
      <AddForm setIsOpen={setIsOpen} isOpen={isOpen} upgradeSlotsCost={upgradeSlotsCost} ual={ual}/>
    )}
  </div>
  );
};

const Item = ({ image }) => {
  return (
    <div className="w-full sm:w-1/2 md:w-full xl:w-1/2 ">
      <div className="h-32 w-full px-2">
        <img
          src={image}
          alt="Item Icon"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

const Add = ({ual}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full sm:w-1/2 md:w-full xl:w-1/2 ">
      <div
        className="flex h-32 w-full cursor-pointer items-center rounded-xl justify-center border border-[#2F2F2E] px-2"
        onClick={() => setIsOpen(true)}
      >
        <FaPlus className="text-5xl text-lime-400" />
      </div>
      <AddBoost isOpen={isOpen} setIsOpen={setIsOpen} ual={ual} />
    </div>
  );
};

export default RightContent;
