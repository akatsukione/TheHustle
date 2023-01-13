import React, { useState} from "react";
import { FaTimes } from "react-icons/fa";
import icon3 from "assets/images/icons/clean-cash.png";
import icon4 from "assets/images/icons/hst-final.png";
import icon2 from "assets/images/icons/hustler-clean-cash-token.png";
import icon1 from "assets/images/icons/slot.png";
import Modal from "components/shared/Modal";


import {anchorUpgradeConsignment, refreshAll} from "BlockchainInteractionWax.js"
import { useDispatch, useSelector } from "react-redux";

import { v4 as uuid } from "uuid";

const data = [
  {
    id: uuid(),
    icon: icon1,
    cost: "10",
    key: "upgrade_token",
    classes: "w-16",
  },
  {
    id: uuid(),
    icon: icon4,
    cost: "25000",
    key: "hustlers_token",
    classes: "w-16",
  },
  {
    id: uuid(),
    icon: icon3,
    cost: "15000",
    key: "clean_cash",
    classes: "w-16",
  },
  {
    id: uuid(),
    icon: icon2,
    cost: "1000",
    key: "dirty_cash",
    classes: "w-16",
  },
];

const UpgradeForm = ({ isOpen, setIsOpen, upgradeCost, ual, assetId }) => {

  const [isLoading, setIsLoading] = useState(false);
  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  async function handleUpgradeClick() {
    setIsLoading(true);
    await anchorUpgradeConsignment(ual, assetId);
    refreshAll(dispatch)
    setIsLoading(false);
    setIsOpen(false);
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
    >
      <div
        className="w-full bg-[#1a1b1f] border rounded-xl border-[#252525]  py-4 px-6"
        style={{ boxShadow: "#a5a5a5eb 0px 0px 9px 0px" }}
      >
        <>
          <div className="mb-2 flex items-center justify-between">
            <div />
            <div />
            <h2 className="px-5 py-2 text-center font-Montserrat text-2xl font-bold text-white">
              Ghost Upgrade Cost
            </h2>
            <FaTimes
              className="block text-2xl text-white hover:cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>

          <div className="flex justify-center">
            <div>
              {data.map((item) => (
                <div className="flex items-center gap-x-3" key={item.id}>
                  <div className={item.classes}>
                    <img
                      src={item.icon}
                      className="h-full w-full object-contain"
                      alt="Token Icon"
                    />
                  </div>
                  <p className="font-bold text-white">
                    {upgradeCost[item.key]}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5 flex justify-center">
            <button
              className="my-5 flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525] w-40" onClick={handleUpgradeClick} disabled={isLoading}>
              Upgrade
            </button>
          </div>
        </>
      </div>
    </Modal>
  );
};

export default UpgradeForm;
