import Tippy from "@tippyjs/react";
import React, { useState, useEffect, useCallback, useMemo, Component } from "react";
import DropZoneIcon from "assets/images/transfers/drop-zone.png";
import { FaInfoCircle } from "react-icons/fa";
import { FaExclamationTriangle } from "react-icons/fa";
import AttemptDrop from "./forms/drop";
import AddPass from "./forms/AddPass";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";

import {isImmunityStaked, getLastActionMessage, refreshAll, anchorGetFailedDrops, anchorGetTotalDrops} from "BlockchainInteractionWax.js"

const DropZone = ({ ual }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPassOpen, setIsPassOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [popUpMessage, setPopUpMessage] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [failedDrops, setFailedDrops] = useState(0)
  const [totalDrops, setTotalDrops] = useState(0)

  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    if (ual.activeUser) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const link = await isImmunityStaked(ual);
      setImageSrc(link[0]);

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
      const failedDropsCount = await anchorGetFailedDrops(ual)
      setFailedDrops(failedDropsCount)

      const totalDropsCount = await anchorGetTotalDrops(ual)
      setTotalDrops(totalDropsCount)
      }

  }, [ual, store]);

  useEffect(() => {
    fetchData();
  }, [fetchData, store]);
  
  return (
    <div className="">
      <div className="drop-zone relative flex flex-col items-center justify-center gap-y-5 rounded-3xl px-10 pt-10 pb-3 border border-[#2F2F2E] max-w-md">
        <div className="absolute -top-8">
          <TooltipDropZone />
        </div>
        <div className="text-2xl font-bold text-white">Drop Zone</div>
        <img className="w-12" src={DropZoneIcon} alt="icon" />
        <div
          className="flex h-full cursor-pointer items-center justify-center rounded-3xl border hover:bg-[#252525] focus:bg-[#252525]  border-[#2F2F2E]"
          onClick={() => imageSrc === "" && setIsPassOpen(true)}
        >
          {imageSrc !== "" ? (
          <div className="relative h-full w-full">
            <img
              src={imageSrc}
              alt="your-image-description"
              className="h-full w-full object-cover"
            />
          </div>
          ) : (            
            <FaPlus className="text-5xl text-lime-400 relative z-1" />
          )}
        </div>
        <div className="absolute bottom-10">
          <TooptipImmunityPass />
        </div>
        <p className="pt-5 text-xl font-bold text-white">Immunity Pass</p>
      </div>
      <div className="relative mt-5 flex justify-center">
      <div className="absolute -top-1">
        <TooltipAttemptDrop />
      </div>
      {failedDrops < 3 ? (
        <button
          className="flex w-1/2 flex-col items-center justify-center rounded-md rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525] mt-10 w-40"
          onClick={() => setIsOpen(true)}
        >
          Attempt a Drop
        </button>
      ) : null}
    </div>
      <AttemptDrop setIsOpen={setIsOpen} isOpen={isOpen} ual={ual}/>
      <AddPass setIsOpen={setIsPassOpen} isOpen={isPassOpen} ual={ual}/>
      {isPopupOpen && (
        
        <div className="flex flex-col items-center max-w-md bg-[#1a1b1f] border border-solid justify-center border-gray-500 rounded-xl py-4 px-6"
          style={{ boxShadow: "#a5a5a5eb 0px 0px 9px 0px" }}>
          <p className="text-white text-md font-semibold mb-4" style={{textAlign: 'center'}}>
            {popUpMessage}
          </p>
          <button className="flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525] block max-w-md  rounded-md px-2 py-2.5"
            onClick={() => setIsPopupOpen(false)}>
            Close
          </button>
        </div>
      )}
      <div className="relative mt-5 flex justify-center">
      <p className="pt-5 text-xl font-bold text-white ">Total Drops: {totalDrops}</p>
      </div>
    </div>
  );
};

class TooltipDropZone extends Component {
  state = {};
  render() {
    return (
      <Tippy
        content={
          <span className="">Attempt a drop to withdraw Dirty Cash</span>
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
  }
}

class TooptipImmunityPass extends Component {
  state = {};
  render() {
    return (
      <Tippy
        content={
          <span className="">
            Immunity pass allows players to make a drop of up to 1000 dirty cash
            without it being intercepted
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
  }
}

class TooltipAttemptDrop extends Component {
  state = {};
  render() {
    return (
      <Tippy
        content={
          <span className="">
            Drops are risky, you may end up losing all of your rewards
          </span>
        }
        popperOptions={{
          placement: "right",
        }}
      >
        <p className="text-xl text-white">
          <FaExclamationTriangle />
        </p>
      </Tippy>
    );
  }
}

export default DropZone;
