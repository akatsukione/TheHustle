import React, { useState, useEffect, useCallback } from "react";
import { FaTimes } from "react-icons/fa";
import Modal from "components/shared/Modal";
import {  useSelector } from "react-redux";

import {anchortGetNftInformation, getConsignmentStats} from "BlockchainInteractionWax.js"

const Stats = ({ isOpen, setIsOpen, ual, assetId }) => {

  const [nftData, setNftData] = useState([{name: "Default Name", level: 0, rarity: "Unknown", type: "Unknown", edition: "Unknown"}]);
  const [miningPower, setMiningPower] = useState(0)
  const store = useSelector((state) => state);

  const fetchData = useCallback(async () => {
    if (ual.activeUser) {     
      const value = await anchortGetNftInformation(ual, assetId)
      setNftData(value)
      const value1 = await getConsignmentStats(ual, assetId)
      setMiningPower(value1)
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [store]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}     
    >
      <div
        className="w-full bg-[#1a1b1f] border rounded-xl border-[#252525]  py-4 px-6"
        style={{ boxShadow: "#a5a5a5eb 0px 0px 9px 0px" }}
      >
        <div>
          <div className="mb-2 flex items-center justify-between">
            <div />
            <h2 className="px-5 py-2 text-center font-Montserrat text-2xl font-bold text-olive">
              Character Stats
            </h2>
            <FaTimes
              className="block text-2xl text-olive hover:cursor-pointer"
              onClick={() => {
                setIsOpen(false);
              }}
            />
          </div>

          <div>
            <div className="mt-2">
              <Item text={"Name"} value={nftData[0].name ?? "N/A"} />
              <Item text={"Rarity"} value={nftData[0].rarity ?? "N/A"} />
              <Item text={"Level"} value={nftData[0].level ?? "N/A"} />
              <Item text={"Edition"} value={nftData[0].edition ?? "N/A"} />      
              <Item text={"Type"} value={nftData[0].type ?? "N/A"} />     
              <Item text={"Mining Power/h"} value={miningPower?? "N/A"} />   
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const Item = ({ text, value }) => (
  <p className="text-white">
    <span className="text-white ">{text}:</span> {"  "} {value}
  </p>
);

export default Stats;
