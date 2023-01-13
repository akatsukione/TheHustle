import Tippy from "@tippyjs/react";
import React, { useState, useEffect, useCallback, useRef, Component } from "react";
import ForeignExchangeImage from "assets/images/transfers/foreign-exchange.png";
import { FaInfoCircle } from "react-icons/fa";
import AttemptExchange from "./forms/AttemptExchange";
import AttemptDeposit from "./forms/AttemptDeposit"
import { useDispatch, useSelector } from "react-redux";
import AttemptWithdraw from "./forms/AttemptWithdraw";

import {refreshAll, anchorGetGRank, anchorGetHustlerTokenWithdraws} from "BlockchainInteractionWax.js"

const ForeignExchange = ({ ual }) => {
  const store = useSelector((state) => state);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenWithdraw, setIsOpenWithdraw] = useState(false);
  const [isOpenExchange, setIsOpenExchange] = useState(false);
  const [timeToExchangeMsg, setTimeToExchangeMsg] = useState("")
  const [timeToEvent, setTimeToEvent] = useState("")
  const [gLevel, setGLevel] = useState(0.0);
  const [hustlerTokenWithdraws, setHustlerTokenWithdraws] = useState(0)

  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    if (ual.activeUser) {
      const gRank = await anchorGetGRank(ual);
      setGLevel(gRank)
      const day = Math.floor(((Math.floor(Date.now() / 1000) - 1677967324) / 86400) % 7);      

      if(day === 3 || day === 4 || day === 5 || day === 6)
      {
        setTimeToExchangeMsg("Exchanging is not available at the moment!");
        const secondsUntilExchange = 7 - ((Math.floor(Date.now() / 1000) - 1677967324) / 86400) % 7;
        setTimeToEvent(Math.floor(secondsUntilExchange*86400))
      }
      else
      {
        if(gRank >= 25)
        {
        setTimeToExchangeMsg("You can exchange now!");
        const secondsUntilEnd = 3 - ((Math.floor(Date.now() / 1000) - 1677967324) / 86400) % 7;
        setTimeToEvent(Math.floor(secondsUntilEnd*86400))
        }
        else
        {
          setTimeToExchangeMsg("You can exchange now, but you have just " + Number(gRank).toFixed(1).toString() + " G Rank!");
          const secondsUntilEnd = 3 - ((Math.floor(Date.now() / 1000) - 1677967324) / 86400) % 7;
          setTimeToEvent(Math.floor(secondsUntilEnd*86400))
        }
      }
      const hustlerWithdraws = await anchorGetHustlerTokenWithdraws(ual);
      setHustlerTokenWithdraws(hustlerWithdraws)

    }    
  }, [store, ual]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const prevTimeRef = useRef();

  useEffect(() => {
    prevTimeRef.current = timeToEvent;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeToEvent(prevTime => {
        const currentTime = prevTime - 1;
        if (prevTime === 0) {
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
    const days = Math.floor(hours / 24);
  
    if (days > 0) {
      return `${days}D ${hours % 24}h:${minutes % 60 < 10 ? `0${minutes % 60}` : minutes % 60}m:${seconds < 10 ? `0${seconds}` : seconds}s`;
    } else if (hours > 0) {
      return `${hours}h:${minutes % 60 < 10 ? `0${minutes % 60}` : minutes % 60}m:${seconds < 10 ? `0${seconds}` : seconds}s`;
    }
    
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div className="">
      <div className="drop-zone relative flex flex-col items-center justify-center gap-y-5 rounded-3xl px-10 pt-10 pb-3 border border-[#2F2F2E]">
        <div className="absolute -top-8">
          <TooltipForeignExchange />
        </div>
        <div className="text-2xl font-bold text-white">Foreign Exchange</div>
        <img className="w-40" src={ForeignExchangeImage} alt="hustle" />
        <div className="mt-2 w-12">
        </div>
        <div className="text-center">
          <p className="pt-5 text-white">{timeToExchangeMsg}</p>
          <span className="text-white text-xl font-bold">{formatTime(timeToEvent)}</span>
        </div>
      </div>
      <div className="relative mt-4 flex justify-center gap-x-6 px-5">
        <div className="relative flex justify-center">
          <div className="absolute -top-1">
            <TooltipWithdrawBtn />
          </div>
          <button className="my-5 flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525] block w-full  rounded-md px-2 py-2.5"
            onClick={() => setIsOpenWithdraw(true)}>
                Withdraw
          </button>
          <AttemptWithdraw setIsOpenWithdraw={setIsOpenWithdraw} isOpenWithdraw={isOpenWithdraw} ual={ual}/>
        </div>
        <div className="relative flex justify-center">
          <div className="absolute -top-1">
            <TooltipDepositBtn />
          </div>
          <button className="my-5 flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525] block w-full  rounded-md px-2 py-2.5"
            onClick={() => setIsOpen(true)}>
                Deposit
          </button>
          <AttemptDeposit setIsOpen={setIsOpen} isOpen={isOpen} ual={ual}/>
        </div>
        {timeToExchangeMsg.includes("can exchange now") && gLevel >= 25 &&(
        <div className="relative flex justify-center">
          <div className="absolute -top-1">
            <TooltipExchangeBtn />
          </div>
          <button
            className="my-5 flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525] block w-full  rounded-md px-2 py-2.5"
            onClick={() => setIsOpenExchange(true)}
          >
            Exchange
          </button>
          <AttemptExchange
            setIsOpenExchange={setIsOpenExchange}
            isOpenExchange={isOpenExchange}
            ual={ual}
          />
        </div>
      )}
      </div>
      <div className="relative mt-5 flex justify-center">
      <p className="pt-5 text-xl font-bold text-white ">Total Hustler Tokens Withdraws: {hustlerTokenWithdraws}</p>
      </div>
    </div>
  );
};

class TooltipForeignExchange extends Component {
  render() {
    return (
      <Tippy
        content={
          <span className="">
            Clean Cash and Hustlers Token can be withdrawn, deposited or
            exchanged via the Foreign Exchange.
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

class TooltipDepositBtn extends Component {
  render() {
    return (
      <Tippy
        content={
          <span className="">Deposits are not subjected to a fee</span>
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

class TooltipWithdrawBtn extends Component {
  render() {
    return (
      <Tippy
        content={
          <span className="">Withdraws are subjected to a 5% fee. You can withdraw HTN maximum 5 days per day with a
          minimum of 60 HTN per withdraw. You can withdraw HCC as many times as you want, with a minimum of 100 HCC each time.</span>
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

class TooltipExchangeBtn extends Component {
  render() {
    return (
      <Tippy
        content={
          <span className="">
            Players can exchange a maximum of 10 Clean Cash every day tax
            free at G Rank 25
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

export default ForeignExchange;
