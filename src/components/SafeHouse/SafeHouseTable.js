import Tippy from "@tippyjs/react";
import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import data from "./data1.json";
import UnlockModal from "./Unlock/UnlockModal";

const SafeHouseTable = () => {
  const [items, setItems] = useState(data);

  const activate = (id) => {
    setItems((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return { ...item, isActivated: true };
        }
        return item;
      });
    });
  };

  return (
    <div className="grow shrink overflow-x-auto mx-2 md:mr-2">
      <div className="rounded-md border border-[#252525] w-full">
        <div className="py-2 text-center text-white">
          <div className="flex justify-center gap-x-1">
            <h2 className="my-2 text-2xl font-bold md:text-3xl">
              G rank mission
            </h2>
            <InfoIcon />
          </div>
          <p className="my-3 text-base mx-3">
            Complete the missions by collecting G Ranks and activating the
            missions to gain bonus
          </p>
        </div>
        <div
          className="relative w-full overflow-x-auto"
        >
          <table className="table w-full text-left  text-white dark:text-gray-400 ">
            <thead className="border-t border-[#252525] uppercase text-white">
              <tr>
                <th scope="col" className="w-1/12 py-3 px-6">
                  Missions
                </th>
                <th scope="col" className="w-3/12 py-3 px-6">
                  Activation Cost
                </th>
                <th scope="col" className="w-1/12 py-3 px-6">
                  Bonus
                </th>
                <th scope="col" className="py-3 px-6">
                  Current Progress
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <Item
                  key={item.id}
                  id={item.id}
                  bonus={item.bonus}
                  count={item.count}
                  index={index + 1}
                  activate={activate}
                  isActivated={item.isActivated}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const InfoIcon = () => (
  <Tippy
    content={
      <span>
        Each account can accrued up to +5% bonus reward for every location
      </span>
    }
    popperOptions={{
      placement: "right",
    }}
  >
    <p className="text-xl text-white">
      <FaInfoCircle />
    </p>
  </Tippy>
);

const Item = ({ bonus, count, index, activate, isActivated, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <UnlockModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        activate={activate}
        id={id}
      />
      <tr className="w-full border-b border-t border-[#252525] odd:bg-[#151514]">
        <td className="text-center">M{index}</td>
        <td className="whitespace-nowrap py-3 px-6 font-medium text-gray-900 dark:text-white">
          <button
            className="block flex flex-col items-center justify-center rounded-md rounded-lg border border-[#252525] px-2 text-lime-400 hover:bg-[#252525] py-2 w-[128px] rounded-lg font-medium"
            onClick={() => setIsOpen(true)}
          >
            {isActivated ? "Active" : "Activate"}
          </button>
        </td>
        <td className="py-2 px-6">
          {bonus > 0 ? `+` : ""}
          {bonus}%
        </td>
        <td className="py-2 px-6">
          <div className="w-full rounded-full bg-lime-200">
            <div className="w-8/12 rounded-full bg-lime-700 p-0.5 text-center text-xs font-medium leading-none text-black">
              {count}
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default SafeHouseTable;
