import React, { useState, useEffect, useContext, useCallback, useRef, Component } from "react";
import { FaTimes } from "react-icons/fa";
import PlayerAccWalletIcon from "assets/images/icons/player-acc-wallet.png";
import CleanCashIcon from "assets/images/icons/clean-cash2.png";
import DirtyCashIcon from "assets/images/icons/dirty-cash-token.png";
import HustlersTokenIcon from "assets/images/icons/hustlers-token.png";
import Modal from "components/shared/Modal";
import WalletContext from "context";

import { useDispatch, useSelector } from "react-redux";

import { anchorGetUserResourcesFromWallet, refreshAll, anchorDepositTokens } from "BlockchainInteractionWax.js"

const AttemptDeposit = ({ isOpen, setIsOpen, ual }) => {
  const { balance, setBalance } = useContext(WalletContext)
  const [dirtyCashWallet, setDirtyCashWallet] = useState(0);
  const [cleanCashWallet, setCleanCashWallet] = useState(0);
  const [hustlerTokenWallet, setHustlerTokenWallet] = useState(0);

  const [dirtyCashAmount, setDirtyCashAmount] = useState("0.0000");
  const [cleanCashAmount, setCleanCashAmount] = useState("0.0000");
  const [hustlerTokenAmount, setHustlerTokenAmount] = useState("0.0000");

  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    if (ual.activeUser) {
      const result = await anchorGetUserResourcesFromWallet(ual);
      result.forEach((row) => {
        if (row.key === "HCC") {
          setCleanCashWallet(row.value.toFixed(3))
        }
        else if (row.key === "HDC") {
          setDirtyCashWallet(row.value.toFixed(3))
        }
        else if (row.key === "HTN") {
          setHustlerTokenWallet(row.value.toFixed(3))
        }
      })
    }
    else {
      //await refreshAll(dispatch)
    }
  }, [ual, store]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function handleDepositClick() {
    const dirtyCashAmountNumber = Number(dirtyCashAmount);
    setDirtyCashAmount(dirtyCashAmountNumber.toFixed(4));

    const cleanCashAmountNumber = Number(cleanCashAmount);
    setCleanCashAmount(cleanCashAmountNumber.toFixed(4));

    const hustlerTokenAmountNumber = Number(hustlerTokenAmount);
    setHustlerTokenAmount(hustlerTokenAmountNumber.toFixed(4));

    const assets = [dirtyCashAmountNumber.toFixed(4) + " HDC", cleanCashAmountNumber.toFixed(4) + " HCC", hustlerTokenAmountNumber.toFixed(4) + " HTN"]
    await anchorDepositTokens(ual, assets);
    await refreshAll(dispatch)
    setBalance({
      ...balance,
      dirty: (dirtyCashAmountNumber * 1 + balance.dirty * 1).toFixed(3),
      cleanCash: (cleanCashAmountNumber * 1 + balance.cleanCash * 1).toFixed(3),
      final: (hustlerTokenAmountNumber * 1 + balance.final * 1).toFixed(3),
    })
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
              Deposit
            </h2>
            <FaTimes
              className="block text-2xl text-olive hover:cursor-pointer"
              onClick={() => {
                setIsOpen(false);
              }}
            />
          </div>
          <div className="text-center text-white"></div>
          <div>
            <div className=" flex items-center justify-end gap-x-2 text-white">
              <p className="mt-2">{dirtyCashWallet}</p>
              <div className="h-6 w-6">
                <img
                  src={DirtyCashIcon}
                  alt="icon"
                  className="object- h-full w-full"
                />
              </div>
              <p className="mt-2">{cleanCashWallet}</p>
              <div className="h-10 w-8">
                <img
                  src={CleanCashIcon}
                  alt="icon"
                  className="object- h-full w-full"
                />
              </div>
              <p className="mt-2">{hustlerTokenWallet}</p>
              <div className="h-6 w-6">
                <img
                  src={HustlersTokenIcon}
                  alt="icon"
                  className="object- h-full w-full"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 justify-center">
              <div className="flex flex-col justify-center">
                <label className="text-white h-10">Dirty Cash:</label>
                <label className="text-white h-10">Clean Cash:</label>
                <label className="text-white h-10">Hustlers Token:</label>
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
                <input
                  type="number"
                  className="rounded-lg border border-gray-400 p-2 w-48 h-10 mb-2"
                  value={cleanCashAmount}
                  onChange={(event) => setCleanCashAmount(event.target.value)}
                  placeholder="Enter amount to deposit"
                  step="0.0001"
                  min="0"
                />
                <input
                  type="number"
                  className="rounded-lg border border-gray-400 p-2 w-48 h-10 mb-2"
                  value={hustlerTokenAmount}
                  onChange={(event) => setHustlerTokenAmount(event.target.value)}
                  placeholder="Enter amount to deposit"
                  step="0.0001"
                  min="0"
                />
              </div>
            </div>
          </div>

          <div className="mt-5 flex justify-center">
            <button className="my-5 block flex flex-col items-center justify-center rounded-md rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525]"
              onClick={(e) => { e.preventDefault(); handleDepositClick() }}>Deposit </button>

          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AttemptDeposit;
