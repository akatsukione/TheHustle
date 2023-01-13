import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
import icon1 from "assets/images/icons/solo-g.png";
import AddCharacter from "./AddCharacter";
import AddPass from "./AddPass";
import Character from "./Character";
import ModalMenu from "./ModalMenu"
import SkipUpgradeForm from "./SkipUpgradeForm"
import PropTypes from 'prop-types';

import {isConsignmentStaked, isJailed, isJailedTime, getOutOfJail, getTimeToClaim,
   getTimeLeftInJail, getTimeToUpgrade, getSkipUpgradeCostsForGhost, refreshAll} from "BlockchainInteractionWax.js"

var asset_id = ""

const LeftContent = ({ ual, onAssetIdChange, onRefresh }) => {
  const store = useSelector((state) => state);
  const [character] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLockedUp, setIsLockedUp] = useState(0)
  const [isStaked, setIsStaked] = useState(0)
  const [isLockedUpExpired, setIsLockedUpExpired] = useState(0)

  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    if (ual.activeUser) {
      const value = await isConsignmentStaked(ual);
      if(value[0] != "")
      {
        setIsStaked(1);
      }
      else
      {
        setIsStaked(0)
      }
      const value1 = await isJailed(ual)
      setIsLockedUp(value1)
      const value2 = await isJailedTime(ual);
      setIsLockedUpExpired(value2)
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [store]);

  async function handleGetOutOfJail () {
    await getOutOfJail(ual, asset_id)
    refreshAll(dispatch)
  };
  
  return (
    <div className="order-2 w-full md:w-1/2 lg:order-1 lg:w-4/12">
      <div className="mx-4 box-border  pb-4 ">
        <div className="mb-3 flex items-center gap-x-2">
          <div className="w-8">
            <img src={icon1} alt="Solo-G" className="object- h-full w-full" />
          </div>
          <p className="text-center text-xl font-bold text-olive">
          <p1>Crew Member: {isStaked}/1</p1>            
          </p>
        </div>
        <div className="custom-shadow mr-2 box-border h-80 overflow-hidden rounded-md border border-[#2F2F2E] p-6 text-center ">
          <div className="flex h-full items-center justify-center">
            {character.length > 0 ? (
              character.map((i) => <Character />)
            ) : (
              <Add ual={ual} onAssetIdChange={onAssetIdChange} onRefresh={onRefresh} store={store}/>
            )}
          </div>
        </div>

        <div className="mt-2">
          <p className="text-center  font-bold text-olive">Locked Up</p>

          <div className="mt-3 flex items-center justify-center gap-x-2">
            <div className="w-6">
              <img src={icon1} alt="Solo-G" className="object- h-full w-full" />
            </div>
            <p className="text-center text-lg text-white">{isLockedUp}/1</p>
          </div>
          {isLockedUp === 1 && isLockedUpExpired === 0 &&(
          <div className="mx-auto mt-2 w-5/12">
            <div
              className="my-5 flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525] flex h-24 w-full items-center justify-center rounded-xl"
              onClick={() => setIsOpen(true)}
            >
              <FaPlus className="text-5xl text-lime-400" />
            </div>    
            <AddPass isOpen={isOpen} setIsOpen={setIsOpen} ual={ual} asset_id={asset_id} />        
          </div>
          )}
          {isLockedUp === 1 && isLockedUpExpired === 1 && (
            <div className="mx-auto mt-2 w-5/12">
            <div>
          
          <button className="my-5 flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525] mt-3 w-full rounded-md text-center capitalize" onClick={handleGetOutOfJail}>
              Get Out of jail
            </button>
            </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Add = ({ ual, onAssetIdChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPopUp, setIsOpenPopUp] = useState(false);
  const [activeUser, setActiveUser] = useState(null);
  const [imageSrc, setImageSrc] = useState("");
  const [assetId, setAssetID] = useState("");
  const [isCharacterAdded, setIsCharacterAdded] = useState(false);
  const [remainingTimeClaim, setRemainingTimeClaim] = useState(0);
  const [remainingTimeJail, setRemainingTimeJail] = useState(0); 
  const [remainingUpgradeTime, setremainingUpgradeTime] = useState(0); 
  const [isOpenSkipPopUp, setIsOpenSkipPopUp] = useState(false)
  const prevRemainingTimeClaim = useRef(null);

  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  const [skipUpgradeCost, setSkipUpgradeCost] = useState({
    b_clean_cash: 5,
    b_dirty_cash: 5,
    b_hustlers_token: 5
  });

  const handleClick = () => {
    if (isCharacterAdded) {
      setIsOpenPopUp(true);
      onAssetIdChange(assetId);
      setIsOpenSkipPopUp(true);
    } else {
      setIsOpen(true);
    }
    if (ual && ual.activeUser) {
      setActiveUser(ual.activeUser.accountName);
    }
  };

  const prevTimeRef = useRef();

  useEffect(() => {
    prevTimeRef.current = remainingTimeClaim;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTimeClaim(prevTime => {
        const currentTime = prevTime - 1;
        if (prevTime === 1) {
          refreshAll(dispatch);
        }
        prevTimeRef.current = currentTime;
        return currentTime;
      });

      setRemainingTimeJail(prevTime => {
        const currentTime = prevTime - 1;
        if (prevTime === 1) {
          refreshAll(dispatch);
        }
        prevTimeRef.current = currentTime;
        return currentTime;
      });

      setremainingUpgradeTime(prevTime => {
        const currentTime = prevTime - 1;
        if (prevTime === 1) {
          refreshAll(dispatch);
        }
        prevTimeRef.current = currentTime;
        return currentTime;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const hours = Math.floor(minutes / 60);
  
    if (hours > 0) {
      return `${hours}:${minutes % 60 < 10 ? `0${minutes % 60}` : minutes % 60}:${seconds < 10 ? `0${seconds}` : seconds}`;
    }
    
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  useEffect(() => {
    async function fetchImageSrc() {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const link = await isConsignmentStaked(ual);
      setImageSrc(link[0]);
      setAssetID(link[1]);
      asset_id = link[1];
      setIsCharacterAdded(Boolean(link[1]));
      onAssetIdChange(link[1]);
    }
    fetchImageSrc();
  }, [ual, store]);

  const fetchData = async () => {
    if (ual.activeUser) {
      const value = await getTimeToClaim(ual);
      setRemainingTimeClaim(value)
      const value1 = await getTimeLeftInJail(ual);
      setRemainingTimeJail(value1)      
      const value2 = await getTimeToUpgrade(ual, assetId);
      setremainingUpgradeTime(value2);
      const value3 = await getSkipUpgradeCostsForGhost(ual, assetId);
      setSkipUpgradeCost(value3)
    }
  };

  useEffect(() => {
    fetchData();
  }, [store]);

  return (
    <>
      <div
        className="flex h-full w-full cursor-pointer items-center justify-center  rounded-xl  px-2"
        onClick={handleClick}
      >
        {imageSrc !== "" ? (
          <div className="relative">
            <img
              src={imageSrc}
              alt="your-image-description"
              className="max-w-full max-h-full mx-auto"
              style={{ maxHeight: "55%", maxWidth: "55%" }}
            />
            {  remainingTimeClaim > 1 &&  (
              <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center max-w-full max-h-full mx-auto" style={{ maxHeight: "100%", maxWidth: "55%" }}>
                <span className="text-white text-xl font-bold">Time to collect: {formatTime(remainingTimeClaim)}</span>
              </div>
            )}

          {remainingTimeJail > 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center max-w-full max-h-full mx-auto" style={{ maxHeight: "100%", maxWidth: "55%" }}>
              <span className="text-white text-xl font-bold">
                Time in jail: {formatTime(remainingTimeJail)}
              </span>
            </div>
          )}
          {remainingUpgradeTime > 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center max-w-full max-h-full mx-auto" style={{ maxHeight: "100%", maxWidth: "55%" }}>
              <span className="text-white text-xl font-bold">
                Time to upgrade: {formatTime(remainingUpgradeTime)}
              </span>
            </div>
          )}
          </div>
        ) : (
          <FaPlus className="text-5xl text-lime-400" />
        )}
      </div>
      {isOpen && (
        <AddCharacter
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          activeUser={activeUser}
          ual={ual}
        />
      )}
      {isOpenPopUp && remainingTimeClaim <= 1 && remainingTimeJail <= 1 && remainingUpgradeTime <= 1 &&(
        <ModalMenu
          setIsOpenPopUp={setIsOpenPopUp}
          isOpenPopUp={isOpenPopUp}
          assetId={assetId}
          ual={ual}
        />
      )}
      {isOpenPopUp && remainingUpgradeTime > 0 &&(
        <SkipUpgradeForm          
          isOpenSkipPopUp={isOpenSkipPopUp}
          setIsOpenSkipPopUp={setIsOpenSkipPopUp}
          assetId={assetId}
          ual={ual}
          skipUpgradeCost={skipUpgradeCost}
        />
      )}
    </>
  );
};

LeftContent.propTypes = {
  onAssetIdChange: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
};
export {LeftContent, asset_id};
