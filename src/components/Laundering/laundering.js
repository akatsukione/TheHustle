import Tippy from "@tippyjs/react";
import React, { useState, useEffect, useCallback, useRef, Component } from "react";
import { FaInfoCircle } from "react-icons/fa";
import launderingImg from "assets/images/hustle/laundering.png";
import icon2 from "assets/images/icons/clean-cash.png";
import icon1 from "assets/images/icons/hustler-clean-cash-token.png";
import icon3 from "assets/images/icons/clean-cash.png";
import StakeLaundering from "./forms/StakeLaundering";
import UnstakeLaundering from "./forms/UnstakeLaundering";

import { useDispatch, useSelector } from "react-redux";
import { anchorGetLaunderedInfo, anchorCollectLaundering, anchorCollectUnstaked, refreshAll } from "BlockchainInteractionWax";

const Laundering = ({ual}) => {
  const [isOpenUnstake, setIsOpenUnstake] = useState(false);
  const [isOpenStakeLaundering, setIsOpenStakeLaundering] = useState(false);
  const [stakedDirtyCash, setStakedDirtyCash] = useState(0);
  const [unstakedTime, setUnstakedTime] = useState(0);
  const [dailyPay, setDailyPay] = useState(0);
  const [lastStakedTime, setLastStakedTime] = useState(0);
  const [launderedCash, setLaunderedCash] = useState(0);
  const [totalStaked, setTotalStaked] = useState(0);
  const [totalBurned, setTotalBurned] = useState(0);
  const [totalLaundered, setTotalLaundered] = useState(0);
  const [timeToEvent, setTimeToEvent] = useState(0)
  const [eventValue, setEventValue] = useState("Default")

  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    if (ual.activeUser) {
      const values = await anchorGetLaunderedInfo(ual);
      if(values !== 0){
      setStakedDirtyCash(parseFloat(values.staked_amount).toFixed(4))
      setTotalStaked(parseFloat(values.total_staked).toFixed(4))
      setTotalBurned(parseFloat(values.total_burned).toFixed(4))
      setTotalLaundered(parseFloat(values.total_laundered).toFixed(4))
      setDailyPay(parseFloat(values.staked_amount*0.008).toFixed(4))
      const days = Math.floor((Math.floor(Date.now() / 1000) - values.staked_time) / 86400)      
      if(days > 0)
      {
        setLaunderedCash(Math.min(parseFloat(days*values.staked_amount*0.008).toFixed(4), parseFloat(values.total_staked).toFixed(4)))

      }
      else
      {
        setLaunderedCash(0)
      }
      setLastStakedTime(values.last_staked_time)
      setUnstakedTime(values.unstaked_time)
      if(Math.floor(Date.now() / 1000) < values.last_staked_time && values.staked_amount > 0 && values.unstaked_time > 0)
      {
        setEventValue("Time left until unstake and collect first daily reward")
        setTimeToEvent(values.last_staked_time - Math.floor(Date.now() / 1000))
      }
      else if(values.unstaked_time > 0)
      {
        setEventValue("Time left until you can claim your unstaked dirty cash")
        setTimeToEvent(values.unstaked_time - Math.floor(Date.now() / 1000))
      }
      else if (values.staked_amount > 0)
      {
        setEventValue("Time until next reward")
        setTimeToEvent(Math.floor(86400 - ((Math.floor(Date.now() / 1000) - values.staked_time) / 86400 - days) * 86400))
      }
    }
    }

  }, [ual, store]);

  async function collectCleanCash()
  {
    await anchorCollectLaundering(ual);
    await new Promise(resolve => setTimeout(resolve, 500));
    await refreshAll(dispatch)
  }

  async function claimUnstake()
  {
    await anchorCollectUnstaked(ual);
    await new Promise(resolve => setTimeout(resolve, 500));
    await refreshAll(dispatch)
  }

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const prevTimeRef = useRef();

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
    
    return `${minutes}m:${seconds < 10 ? `0${seconds}` : seconds}s`;
  };

  return (
    <div className="laundering-page min-h-screen">
      <div className="bg-[#131312] py-10">
        <div className="container mx-auto ">
          <div className="flex flex-col items-center">
            <div className="img flex justify-center">
              <img width="300" height="200" src={launderingImg} alt="hustle" />
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-x-24 gap-y-24 md:flex-row md:justify-center">
          {/* LEFT SIDEBAR 
          ===========================================================================*/}
          <div className="mx-auto w-3/4 rounded-3xl border border-[#2F2F2E] px-5 pb-5 md:mx-0 md:w-1/4">
            <div className="py-5 text-center text-xl font-bold text-white">
              <p className="">Dirty Cash</p>
              <p className="">Laundering Properties</p>
            </div>
            <div className="flex flex-col justify-between gap-y-4 text-white md:w-full md:justify-center">
              <div className="">
                <span className="font-bold">Type: </span>
                <span className="font-medium">Locked</span>
              </div>
              <div className="">
                <span className="font-bold">Daily pay-out: </span>
                <span className="font-medium">0.8%</span>
              </div>
              <div className="">
                <span className="font-bold">Reward Period: </span>
                <span className="font-medium">24h</span>
              </div>
              <div className="">
                <span className="font-bold">Unstake Fee: </span>
                <span className="font-medium">5%</span>
              </div>
              <div className="">
                <span className="font-bold">Total Max Stake: </span>
                <span className="font-medium">100k</span>
              </div>
              <div className="flex items-center">
                <span className="font-bold">Total Staked: {totalStaked}</span>
                <img className="w-8" src={icon1} alt="hustle" />
              </div>
              <div className="flex items-center">
                <span className="font-bold">Total Burned: {totalBurned}</span>
                <img
                  className="relative w-12"
                  src={icon2}
                  alt="hustle"
                />
              </div>
              <div className="flex items-center">
                <span className="font-bold">Total Laundered: {totalLaundered}</span>
                <img className="relative w-12" src={icon2} alt="hustle" />
              </div>
              {timeToEvent > 0 &&(
              <div className="flex items-center">
                <span className="font-bold">{eventValue}: {formatTime(timeToEvent)}</span>
              </div>)}
            </div>              
          </div>
          {/* MAIN 
          ===========================================================================*/}
          <div className="mx-auto flex w-3/4 flex-col gap-y-5 md:mx-0 md:w-1/4">
            <div className="">
              <div className="relative flex items-center justify-center">
                <div className="absolute bottom-2">
                  <InfoIcon />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center rounded-3xl border border-[#2F2F2E] py-5">
                <div className="w-16">
                  <img
                    src={icon1}
                    alt="hustle"
                    className="object- h-full w-full"
                  />
                </div>
                <p className="mb-4 mt-1 text-center text-xl font-semibold text-white">
                  Staked Dirty Cash
                </p>
                <p className="text-xl font-bold text-white">{stakedDirtyCash}</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center rounded-3xl rounded-3xl border border-[#2F2F2E] py-5">
              <div className="w-32">
                <img
                  src={icon2}
                  alt="hustle"
                  className="object- h-full w-full"
                />
              </div>
              <p className="mb-4 mt-1 text-center text-xl font-semibold text-white">
                Daily Pay-out
              </p>
              <p className="text-xl font-bold text-white">{dailyPay}</p>
            </div>
            <div className="flex w-full justify-center gap-x-5 font-bold">
            {lastStakedTime < Math.floor(Date.now() / 1000) && unstakedTime == 0 &&(
            <button className="my-5 flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525] block w-full  rounded-md px-2 py-2.5"
                onClick={() => setIsOpenUnstake(true)}>
                    Unstake
              </button>
            )}
              <UnstakeLaundering setIsOpenUnstake={setIsOpenUnstake} isOpenUnstake={isOpenUnstake} ual={ual}/>
              {(unstakedTime == 0 || totalStaked === undefined) && (
              <button className="my-5 flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525] block w-full  rounded-md px-2 py-2.5"
                onClick={() => setIsOpenStakeLaundering(true)}>
                    Stake
              </button>
              )}              
              <StakeLaundering setIsOpenStakeLaundering={setIsOpenStakeLaundering} isOpenStakeLaundering={isOpenStakeLaundering} ual={ual}/>
              { unstakedTime > 0 && unstakedTime < Math.floor(Date.now() / 1000) && (
              <button className="my-5 flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525] block w-full  rounded-md px-2 py-2.5"
                onClick={() => claimUnstake()}>
                    Claim Unstaked
              </button>
            )}
            </div>
          </div>
          {/* RIGHT SIDEBAR 
          ===========================================================================*/}
          <div className="mx-auto flex w-3/4 flex-col gap-y-5 md:mx-0 md:w-1/4">
            <div className="flex min-h-full flex-col items-center justify-center gap-y-1 rounded-3xl border border-[#2F2F2E] py-10 md:py-0">
              <div className="w-32">
                <img
                  src={icon2}
                  alt="hustle"
                  className="object- h-full w-full"
                />
              </div>
              <p className="text-center text-xl font-semibold text-white">
                Laundered Cash
              </p>
              <p className="mt-5 text-xl font-bold text-white">{launderedCash}</p>
              <button className="mt-5 rounded-lg  border border-[#2F2F2E] bg-transparent w-1/2 py-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525]"
               onClick={() => collectCleanCash()}>
                    Collect
              </button>
            </div>
          </div>
          {/* END INNER */}
        </div>
      </div>
    </div>
  );
};

class InfoIcon extends Component {
  state = {};
  render() {
    return (
      <Tippy
        content={
          <span className="">
            1% of your staked Dirty Cash will be burned every 24 hours in order
            to produce Clean Cash
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

export default Laundering;
