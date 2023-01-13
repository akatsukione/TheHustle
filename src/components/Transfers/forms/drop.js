import React, { useState, useEffect, useCallback, useMemo, Component } from "react";
import { FaTimes } from "react-icons/fa";
import DirtyCashIcon from "assets/images/icons/hustler-dirty-cash-token.png";
import Modal from "components/shared/Modal";

import { useDispatch, useSelector } from "react-redux";
import {anchorGetBalance, anchorWithdrawCleanCashHustlerToken, refreshAll} from "BlockchainInteractionWax.js"

const AttemptDrop = ({ isOpen, setIsOpen, ual }) => {
  const [dirtyCashWallet, setDirtyCashWallet] = useState(0);
  const [input, setInput] = useState("");
  const [dirtyCashAmount, setDirtyCashAmount] = useState("0.0000");

  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    if (ual.activeUser && store) {
      const values = await anchorGetBalance(ual)
      setDirtyCashWallet(parseFloat(values[1]).toFixed(3))
    }
  }, [ual, store]);

  useEffect(() => {
    fetchData();
  }, [fetchData, store]);

  async function handleDropClick()
  {
    const dirtyCashAmountNumber = Number(dirtyCashAmount);
    setDirtyCashAmount(dirtyCashAmountNumber.toFixed(4));

    const assets = [];

    if (dirtyCashAmountNumber > 0) {
      assets.push(dirtyCashAmountNumber.toFixed(4) + " HDC");
    }

    await anchorWithdrawCleanCashHustlerToken(ual, assets);    
    await refreshAll(dispatch)
    setIsOpen(false);    
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
      <div
        className="w-full bg-[#1a1b1f] border rounded-xl border-[#252525] py-4 px-6 font-Montserrat py-4 px-6"
        style={{ boxShadow: "#a5a5a5eb 0px 0px 9px 0px" }}
      >
        <form>
          <div className="mb-2 flex items-center justify-between">
            <div />
            <h2 className="px-5 py-2 text-center font-Montserrat text-2xl font-bold text-white">
              Drop
            </h2>
            <FaTimes
              className="block text-2xl text-white hover:cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <div className="text-center text-white"></div>
          <div>
            <div className=" flex items-center justify-end gap-x-2 text-white">              
            </div>
            <p className="mb-2 text-center  text-white text-white">
              Warning! Drops are risky; you may end up losing all of your Dirty Cash!
            </p>
            <div className=" flex items-center justify-end gap-x-2 text-white">              
              <p className="mt-2">{dirtyCashWallet}</p>
              <div className="h-10 w-14">
                <img
                  src={DirtyCashIcon}
                  alt="icon"
                  className="object- h-full w-full"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 justify-center">
            <div className="flex flex-col justify-center">
              <label className="text-white h-10">Dirty Cash:</label>
            </div>
            <div className="flex flex-col justify-center flex-1 ml-2">
              <div className="flex flex-row items-center">
                <input
                  type="number"
                  className="rounded-lg border border-gray-400 p-2 w-48 h-10 mb-2"
                  value={dirtyCashAmount}
                  onChange={(event) => setDirtyCashAmount(event.target.value)}
                  placeholder="Enter amount to deposit"
                  step="0.0001"
                  min="0"
                />
                <div className="h-10 w-14">
                  <img
                    src={DirtyCashIcon}
                    alt="icon"
                    className="object- h-full w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

          <div className="mt-5 flex justify-center">
            <button className="my-5 block flex flex-col items-center justify-center rounded-md rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525]"
            onClick={(e) => {e.preventDefault(); handleDropClick()}}>Perform Drop </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AttemptDrop;
