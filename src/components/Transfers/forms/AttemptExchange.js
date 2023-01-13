import React, { useState, useEffect, useCallback, useMemo, Component } from "react";
import { FaTimes } from "react-icons/fa";
import CleanCashIcon from "assets/images/icons/clean-cash.png";
import icon1 from "assets/images/icons/wallet.png";
import HustlersTokenIcon from "assets/images/icons/hustlers-token.png";
import Modal from "components/shared/Modal";

import { useDispatch, useSelector } from "react-redux";
import {anchorGetBalance, anchorExchangeCleanCashToHustler, refreshAll} from "BlockchainInteractionWax.js"

const RATE = 0.5;

const AttemptExchange = ({ setIsOpenExchange, isOpenExchange, ual }) => {
  const [cleanCashWallet, setCleanCashWallet] = useState(0);

  const [input, setInput] = useState(1);

  const exchangedAmount = useMemo(() => {
    if (!input) return "";
    return parseFloat(input) / RATE;
  }, [input]);

  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  async function handleExchangeClick()
  {
    setIsOpenExchange(false);
    await anchorExchangeCleanCashToHustler(ual, input);    
    await refreshAll(dispatch)    
  }

  const fetchData = useCallback(async () => {
    if (ual.activeUser && store) {
      const values = await anchorGetBalance(ual)
      setCleanCashWallet(parseFloat(values[0]).toFixed(3))
    }
  }, [ual, store]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Modal
      isOpen={isOpenExchange}
      onRequestClose={() => setIsOpenExchange(false)}
    >
      <div
        className="w-full bg-[#1a1b1f] border rounded-xl border-[#252525] py-4 px-6 font-Montserrat py-4 px-6"
        style={{ boxShadow: "#a5a5a5eb 0px 0px 9px 0px" }}
      >
        <form>
          <div className="mb-2 flex items-center justify-between">
            <div />
            <h2 className="px-5 py-2 text-center font-Montserrat text-2xl font-bold text-white">
              Exchange
            </h2>
            <FaTimes
              className="block text-2xl text-white hover:cursor-pointer"
              onClick={() => setIsOpenExchange(false)}
            />
          </div>
          <div className="text-center text-white">
            <p>Exchange Rate</p>
            <p>
              1 Clean Cash = 2 Hustler Tokens
            </p>
          </div>
          <div className=" flex items-center justify-end gap-x-2 text-white">
              <p className="mt-2">{cleanCashWallet}</p>
              <div className="h-10 w-14">
                <img src={CleanCashIcon} alt="icon" className="object- h-full w-full" />
              </div>
            </div>
          <div>
            <div className="flex items-center justify-between rounded-md bg-olive py-2 px-1.5">
              <input
                max={10}
                type="number"
                className=" flex-1 border-none bg-transparent px-2 py-2 outline-none"
                placeholder="insert amount"
                value={input}
                onChange={(e) => setInput(Math.min(e.target.value, 10))}
              />
              <p className="w-10 pl-2.5 ">
                <img
                  src={CleanCashIcon}
                  alt="icon"
                  className="object- h-full w-full"
                />
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-left text-white ">
              <p>You will receive:</p>
            </div>
            <div className="flex items-center justify-between rounded-md bg-olive py-2 px-1.5">
              <input
                type="text"
                name=""
                className="flex-1 border-none bg-transparent py-2 pl-4 outline-none"
                placeholder=""
                readOnly
                value={exchangedAmount}
                disabled
              />
              <p className="w-10 rounded-md  pl-2.5 ">
                <img
                  src={HustlersTokenIcon}
                  alt="icon"
                  className="mx-auto w-10"
                />
              </p>
            </div>
          </div>

          <div className="mt-5 flex justify-center">
            <button className="my-5 block flex flex-col items-center justify-center rounded-md rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525]"
              onClick={(e) => {e.preventDefault(); handleExchangeClick()}}>Exchange </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AttemptExchange;
