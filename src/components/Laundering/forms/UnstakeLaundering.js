import React, { useState, useEffect, useCallback } from "react";
import { FaTimes } from "react-icons/fa";
import DirtyCashTokenIcon from "assets/images/icons/dirty-cash-token.png";
import Modal from "components/shared/Modal";
import UnstakeConfirmation from "./UnstakeConfirmation";

import { useDispatch, useSelector } from "react-redux";
import {anchorGetStakedLaundering, refreshAll} from "BlockchainInteractionWax.js"

const UnstakeLaundering = ({ setIsOpenUnstake, isOpenUnstake, ual }) => {
  const [dirtyCashAmount, setDirtyCashAmount] = useState("0.0000");
  const [dirtyCashWallet, setDirtyCashWallet] = useState(0);

  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    if (ual.activeUser && store) {
      const value = await anchorGetStakedLaundering(ual)
      setDirtyCashWallet(parseFloat(value).toFixed(3))
    }
  }, [ual, store]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const [isUnstakeOpen, setIsUnstakeOpen] = useState("");

  return (
    <Modal isOpen={isOpenUnstake} onRequestClose={() => setIsOpenUnstake(false)}>
      <div
        className="w-full bg-[#1a1b1f] border rounded-xl border-[#252525] py-4 px-6 font-Montserrat"
        style={{ boxShadow: "#a5a5a5eb 0px 0px 9px 0px" }}
      >
        <form>
          <div className="mb-2 flex items-center justify-between">
            <div />
            <h2 className="px-5 py-2 text-center text-2xl font-bold text-white">
              Unstake
            </h2>
            <FaTimes
              className="block text-2xl text-white hover:cursor-pointer"
              onClick={() => setIsOpenUnstake(false)}
            />
          </div>
          <div className="text-center text-white"></div>
          <div className=" flex items-center justify-end gap-x-2 text-white">
              <p className="mt-2">{dirtyCashWallet}</p>
              <div className="h-10 w-14">
                <img src={DirtyCashTokenIcon} alt="icon" className="object- h-full w-80%" />
              </div>
            </div>       
          <div className="grid grid-cols-2 gap-4 justify-center">
              <div className="flex flex-col justify-center">
                <label className="text-white h-10">Dirty Cash:</label>
              </div>
              <div className="flex flex-col justify-center">
              <input
                  type="number"
                  className="rounded-lg border border-gray-400 p-2 w-48 h-10 mb-2"
                  value={dirtyCashAmount}
                  onChange={(event) => setDirtyCashAmount(event.target.value)}
                  placeholder="Enter amount to deposit"
                  step="0.0001"
                  min="0"
                />             
              </div>
            </div>
          <div className="mt-4">
            <div className="text-center text-white ">
              <p className="">You will be charged a 5% fee to unstake</p>
            </div>
          </div>
        </form>
        <div className="mt-5 flex justify-center">          
          <button className="my-5 block flex flex-col items-center justify-center rounded-md rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525]"
            onClick={(e) => {e.preventDefault(); setIsUnstakeOpen(true)}}>Unstake</button>
        </div>
        <UnstakeConfirmation
          isOpen={isUnstakeOpen}
          setIsOpen={setIsUnstakeOpen}
          setIsOpenUnstake={setIsOpenUnstake}
          dirtyCashAmount={dirtyCashAmount}
          ual={ual}
        />
      </div>
    </Modal>
  );
};

export default UnstakeLaundering;
