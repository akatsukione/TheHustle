import React, { useState, useEffect, useCallback } from "react";
import { FaTimes } from "react-icons/fa";
import Modal from "components/shared/Modal";
import Stats from "./Stats";
import UpgradeForm from "./UpgradeForm";
import {unstakeConsignment, getUpgradeCostsForGhost, anchortGetNftInformation, refreshAll} from "BlockchainInteractionWax.js"
import { useDispatch, useSelector } from "react-redux";

const ModalMenu = ({ isOpenPopUp, setIsOpenPopUp, assetId,  ual }) => {
  const [isUpGradeOpen, setIsUpgradeOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [nftData, setNftData] = useState([{name: "Default Name", level: 0, rarity: "Unknown", type: "Unknown", edition: "Unknown"}]);
  const [upgradeCost, setUpgradeCost] = useState({
    clean_cash: 5,
    dirty_cash: 5,
    hustler_token: 5,
    upgrade_token: 5
  });
  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  async function handleUnstakeConsignment(assetId, ual) {    
    await unstakeConsignment(assetId, ual);
    refreshAll(dispatch)
    setIsOpenPopUp(false);
  }


  const fetchData = useCallback(async () => {
    if (ual.activeUser) {     
      const upgradeCost = await (getUpgradeCostsForGhost(ual, assetId)); 
      setUpgradeCost(upgradeCost)
      const value = await anchortGetNftInformation(ual, assetId)
      setNftData(value)
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [store]);

  return (
    <>
      <Modal isOpen={isOpenPopUp} onRequestClose={() => setIsOpenPopUp(false)}>
        <div
          className="w-full bg-[#1a1b1f] border rounded-xl border-[#252525]  py-4 px-6"
          style={{ boxShadow: "#a5a5a5eb 0px 0px 9px 0px" }}
        >
          <div>
            <div className="mb-2 flex items-center justify-between">
              <div />
              <h2 className="px-5 py-2 text-center font-Montserrat text-2xl font-bold text-olive">
                {nftData.name} {nftData.level}
              </h2>
              <FaTimes
                className="block text-2xl text-olive hover:cursor-pointer"
                onClick={() => setIsOpenPopUp(false)}
              />
            </div>

            <div className="text-center">
              <div className="my-5">
                <div
                  className="my-5 flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525] rounded-md"
                  onClick={() => setIsUpgradeOpen(true)}
                >Upgrade
                </div>
              </div>
              <div className="my-5" onClick={() => setIsStatsOpen(true)}>
                <div className="my-5 flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525] rounded-md">Stats</div>
              </div>
              <div className="my-5 text-center" onClick={() => { handleUnstakeConsignment(assetId, ual); }}>
              <div className="flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525] rounded-md">
                Unstake
              </div>
            </div>
            </div>
          </div>
        </div>
      </Modal>
      { <UpgradeForm
        isOpen={isUpGradeOpen}
        setIsOpen={setIsUpgradeOpen}    
        upgradeCost={upgradeCost}    
        ual={ual}
        assetId={assetId}
      /> }
      <Stats isOpen={isStatsOpen} setIsOpen={setIsStatsOpen} ual={ual} assetId={assetId}/>
    </>
  );
};

export default ModalMenu;
