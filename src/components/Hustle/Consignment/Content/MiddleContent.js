import React, { useEffect, useState, useCallback  } from "react";
import CleanCashIcon from "assets/images/icons/clean-cash.png";
import DirtyCashIcon from "assets/images/icons/dirty-cash-token.png";
import { asset_id } from "./LeftContent";
import { useDispatch, useSelector } from "react-redux";
import {collectConsignment, getConsignmentRewards, isJailed, getConsignmentBailCost, payBail,
          getIfWorkingConsignment, mineConsignment, getTimeToClaim, getTimeToUpgrade, refreshAll,
          getLastActionMessage} from "BlockchainInteractionWax.js"

const MiddleContent = ({ ual, assetId }) => {

  const store = useSelector((state) => state);
  const [rewards, setRewards] = useState(0);
  const [isLockedUp, setIsLockedUp] = useState(0)
  const [bailCost, setBailCost] = useState(0)
  const [isWorking, setIsWorking] = useState(0)
  const [remainingTime, setRemainingTime] = useState(0); // 1 hour in seconds
  const [remainingUpgradeTime, setremainingUpgradeTime] = useState(0); 
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState("");
  
const dispatch = useDispatch();

  async function handleCollectRewardsClick() {
    await collectConsignment(assetId , ual)
    refreshAll(dispatch)    
  };

  async function handlePayBailClick() {
    await payBail(assetId, ual);
    refreshAll(dispatch)
  }

  async function handleMineConsignmentClick() {
    await mineConsignment(ual, assetId)
    refreshAll(dispatch)
  }

  const fetchData = async () => {
    if (ual.activeUser) {
      const value = await getConsignmentRewards(assetId, ual);
      setRewards(value)
      const value1 = await isJailed(ual)
      setIsLockedUp(value1)

      const value2 = await getConsignmentBailCost(assetId, ual)
      setBailCost(value2)
      
      const value3 = await getIfWorkingConsignment(ual, assetId);
      setIsWorking(value3)

      const value4 = await getTimeToClaim(ual);
      setRemainingTime(value4)
    }
    const value5 = await getTimeToUpgrade(ual, assetId);
    setremainingUpgradeTime(value5)

    const value7 = await getLastActionMessage(ual);
    if(value7 !== popUpMessage && popUpMessage !== "")
    {
      setPopUpMessage(value7)
      setIsPopupOpen(true);
    }
    else
    {
      setPopUpMessage(value7)
    }
  };

  useEffect(() => {
    fetchData();
  }, [store]);

  return (
    <div className="order-1 mb-5 w-full md:mb-0 lg:order-2 lg:w-4/12 ">
      <div className="flex justify-center ">
        <div className="w-1/2">
        {isLockedUp === 0 && isWorking === 0 &&(
          <div className="mt-5 flex items-center justify-center">
            <div className="w-full">           
              <div className="flex flex-col items-center justify-center gap-y-1">                
                <p className="text-center text-xl font-semibold text-white">
                  Collected Dirty Cash
                </p>                
                <div className="w-10">
                  <img
                    src={DirtyCashIcon}
                    alt="Dirty Cash"
                    className="object- h-full w-full"
                  />
                </div>
                <p className="mb-2 font-bold text-white">{rewards}</p>
              </div>
              {remainingTime < 1 && (                                   
              <button className="my-5 flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525] block w-full rounded-md px-5 py-2.5" onClick={handleCollectRewardsClick}>
                Collect rewards
              </button>              
              )}
            </div>
          </div>
          )}
          {isLockedUp === 0 && isWorking === 1 && remainingUpgradeTime <= 1 && isPopupOpen === false &&(
          <div className="mt-5 flex items-center justify-center">              
              <div className="w-full">
              <button className="my-5 flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525] block w-full rounded-md px-5 py-2.5" onClick={handleMineConsignmentClick}>
                Start Hustling
              </button>
              </div> 
            </div>
          )}
          {bailCost != 0 && isLockedUp === 1 && isPopupOpen === false &&(
          <div className="mt-5 flex items-center justify-center">
            <div className="w-full">
              <div className="flex flex-col items-center justify-center gap-y-1">
                <p className="text-center text-xl font-semibold text-white">
                  Bail Cost
                </p>
                <div className="w-16">
                  <img
                    src={CleanCashIcon}
                    alt="Clean Cash"
                    className="object- h-full w-full"
                  />
                </div>
                <p className="mb-2 font-bold text-white">{bailCost}</p>
              </div>

              <button className="my-5 flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525] block w-full  rounded-md px-2 py-2.5" onClick={handlePayBailClick}>
                Pay Bail
              </button>
            </div>
          </div>
          )}
        {isPopupOpen && (
        
        <div className="flex flex-col items-center w-full bg-[#1a1b1f] border border-solid justify-center border-gray-500 rounded-xl py-4 px-6"
          style={{ boxShadow: "#a5a5a5eb 0px 0px 9px 0px" }}>
          <p className="text-white text-md font-semibold mb-4" style={{textAlign: 'center'}}>
            {popUpMessage}
          </p>
          <button className="flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525] block w-full  rounded-md px-2 py-2.5"
            onClick={() => setIsPopupOpen(false)}>
            Close
          </button>
        </div>
      )}
        </div>        
      </div>
    </div>
  );
};

export default MiddleContent;
