import React, { useContext, useState, useEffect, useCallback, useRef, Component } from "react";
import { FaTimes } from "react-icons/fa";
import PlayerInGameWalletIcon from "assets/images/icons/wallet.png";
import CleanCashIcon from "assets/images/icons/clean-cash2.png";
import HustlersTokenIcon from "assets/images/icons/hustlers-token.png";
import Modal from "components/shared/Modal";

import { useDispatch, useSelector } from "react-redux";
import {anchorGetBalance, anchorWithdrawCleanCashHustlerToken, refreshAll} from "BlockchainInteractionWax.js"
import WalletContext from "context";

const AttemptWithdraw = ({ setIsOpenWithdraw, isOpenWithdraw, ual }) => {
  const { balance, setBalance } = useContext(WalletContext)
  const [cleanCashWallet, setCleanCashWallet] = useState(0);
  const [hustlerTokenWallet, setHustlerTokenWallet] = useState(0);

  const [cleanCashAmount, setCleanCashAmount] = useState("0.0000");
  const [hustlerTokenAmount, setHustlerTokenAmount] = useState("0.0000");

  async function handleWithdrawClick()
  {
    const cleanCashAmountNumber = Number(cleanCashAmount);
    setCleanCashAmount(cleanCashAmountNumber.toFixed(4));

    const hustlerTokenAmountNumber = Number(hustlerTokenAmount);
    setHustlerTokenAmount(hustlerTokenAmountNumber.toFixed(4));

    const assets = [];

    if (cleanCashAmountNumber > 0) {
      assets.push(cleanCashAmountNumber.toFixed(4) + " HCC");
    }

    if (hustlerTokenAmountNumber > 0) {
      assets.push(hustlerTokenAmountNumber.toFixed(4) + " HTN");
    }

    await anchorWithdrawCleanCashHustlerToken(ual, assets); 
    await refreshAll(dispatch)  
    
    setBalance({
      ...balance,
      cleanCash: (balance.cleanCash * 1 - cleanCashAmountNumber * 1).toFixed(3),
      final: (balance.final * 1 - hustlerTokenAmountNumber * 1).toFixed(3),
    }) 
    setIsOpenWithdraw(false);
  }

  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    if (ual.activeUser && store) {
      const values = await anchorGetBalance(ual)
      setCleanCashWallet(parseFloat(values[0]).toFixed(3))
      setHustlerTokenWallet(parseFloat(values[2]).toFixed(3))
    }
  }, [ual, store]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  return (
    <Modal isOpen={isOpenWithdraw} onRequestClose={() => setIsOpenWithdraw(false)}>
      <div
        className="w-full bg-[#1a1b1f] border rounded-xl border-[#252525] py-4 px-6 font-Montserrat py-4 px-6"
        style={{ boxShadow: "#a5a5a5eb 0px 0px 9px 0px" }}
      >
        <form>
          <div className="mb-2 flex items-center justify-between">
            <div />
            <h2 className="px-5 py-2 text-center font-Montserrat text-2xl font-bold text-white">
              Withdraw
            </h2>
            <FaTimes
              className="block text-2xl text-white hover:cursor-pointer"
              onClick={() => setIsOpenWithdraw(false)}
            />
          </div>
          <div className="text-center text-white"></div>
          <p className="mb-2 text-center  text-white text-white">
            5% Withdraw Tax </p>
          <div>          
            <div className=" flex items-center justify-end gap-x-2 text-white">              
              <p className="mt-2">{cleanCashWallet}</p>
              <div className="h-9 w-6">
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
                <label className="text-white h-10">Clean Cash:</label>
                <label className="text-white h-10">Hustlers Token:</label>
              </div>
              <div className="flex flex-col justify-center">
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
              onClick={(e) => {e.preventDefault(); handleWithdrawClick()}}>Withdraw </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AttemptWithdraw;
