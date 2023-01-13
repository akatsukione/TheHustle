import React, { useState, useEffect, useCallback, useRef } from "react";
import Countdown from "react-countdown";
import dirty_cash_icon from "assets/images/icons/hustler-dirty-cash-token.png";
import clean_cash_icon from "assets/images/icons/clean-cash3.png";
import hustler_token_icon from "assets/images/shop/ht-hustler-token.png";
import InfoIcon from 'assets/images/icons/information.png';

import { useDispatch, useSelector } from "react-redux";
import { buyBooster, refreshAll} from "BlockchainInteractionWax.js"

const Boost = ({ ual, name, image, description, template_id, remaining, boost_price, userBoost }) => {
  const [isOpenTooltip, setIsOpenTooltip] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(Date.now());

  const ref = useRef();
 
  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    if (ref.current) {
      ref.current.pause();
    }
    setIsActive(true);
    setTime(Date.now());

    const week = Math.floor(((Math.floor(Date.now() / 1000) - 1677967324) / 604800) % 2);
    if(week == 1)
    {
      setIsActive(false);
    }

    if( userBoost - Date.now()/1000 < 0)
    {      
      setCooldown(0)      
    }
  };

  const fetchData = useCallback(async () => {  
    if (ual.activeUser) {
      const week = Math.floor(((Math.floor(Date.now() / 1000) - 1677967324) / 604800) % 2);
      if(week == 1)
      {
        setIsActive(false);
        return;
      }
      const time_difference = userBoost - Date.now()/1000
      if (time_difference < 0)
      {
        setCooldown(0);
        setIsActive(true);
      }
      else
      {        
        setCooldown(time_difference)      
        setIsActive(false);
      }
    }
  }, [ual, store]);

  useEffect(() => {
    fetchData();
  }, [fetchData, ual, store]); 

  useEffect(() => {
    if (cooldown > 0) { 
      ref.current.start();
      setIsActive(false)
    }
  }, [cooldown, isActive]);

  async function buyBoost()  {
    await buyBooster(ual, template_id)
    await new Promise(resolve => setTimeout(resolve, 500));
    await refreshAll(dispatch)
}

  return (
    <div className="flex flex-col items-center">
      <div className='w-full h-8 flex justify-center text-white mb-2'>
        <Countdown
          ref={ref}
          onComplete={handleUpdate}
          date={time + cooldown*1000}
          autoStart={true}
        />
      </div>
      <div className="flex flex-col items-center border border-[#2F2F2E] text-lime-400 hover:bg-[#252525] rounded-[30px] p-4 pb-2 relative">
        <div className='w-full flex justify-center mb-2 relative'>
          <img
            src={InfoIcon}
            className="inline-block w-6 h-6 invert rounded-full cursor-pointer"
            onMouseEnter={() => setIsOpenTooltip(true)}
            onMouseLeave={() => setIsOpenTooltip(false)}
          />
          {
            isOpenTooltip && <div className="w-full text-white text-sm absolute left-0 top-10 border border-[#2F2F2E] bg-[#131312] hover:bg-[#252525] rounded-lg p-3">
              {description}
            </div>
          }
        </div>
        <p className="font-medium text-lg mb-3 text-white">{name}</p>
        <div className="flex flex-col items-center">
          <img className="w-64"
            src={`https://ipfs.io/ipfs/${image}`}
            alt={name}
          />
        </div>
        <button className="rounded-lg border border-[#2F2F2E] bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-3/4">
  Total Mints: {20 - remaining} / 20
</button>
<div className="mt-5 flex flex-row items-center gap-x-3">
  <div className="flex items-center">
    <img className="w-8" src={clean_cash_icon} alt="hustle" />
    <span className="relative left-2 font-bold text-white">{boost_price[0]}</span>
  </div>
</div>
<div className="mt-5 flex flex-row items-center gap-x-3">
  <div className="flex items-center">
    <img className="w-12" src={dirty_cash_icon} alt="hustle" />
    <span className="flex-1 font-bold text-white">{boost_price[1]}</span>
  </div>
</div>
<div className="mt-5 flex flex-row items-center gap-x-3">
  <div className="flex items-center">
    <img className="w-8" src={hustler_token_icon} alt="hustle" />
    <span className="relative left-2 font-bold text-white">{boost_price[2]}</span>
  </div>
</div>
<button
  onClick={buyBoost}
  className={`rounded-lg border border-[#2F2F2E] bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-2/4 ${
    isActive && remaining > 0 ? `cursor-pointer` : `cursor-not-allowed opacity-30`
  }`}
>
  Buy
</button>
      </div>
    </div>
  );
}

export default Boost;
