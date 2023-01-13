import React, { useState } from 'react';
import dirty_cash_icon from "assets/images/icons/hustler-dirty-cash-token.png";
import clean_cash_icon from "assets/images/icons/clean-cash.png";
import hustler_token_icon from "assets/images/shop/ht-hustler-token.png";
import InfoIcon from 'assets/images/icons/information.png';
import { buyPacks, refreshAll} from "BlockchainInteractionWax.js"
import { useDispatch } from "react-redux";

const Pack = ({ ual, name, image, description, template_id, remaining, pack_price, total_packs, g_rank }) => {
  const [isOpenTooltip, setIsOpenTooltip] = useState(false);

  const dispatch = useDispatch();

  async function buyPack() {
    await buyPacks(ual, template_id)
    await new Promise(resolve => setTimeout(resolve, 500));
    await refreshAll(dispatch)
  }

  return (
    <div className="flex flex-col items-center">
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
        <div className="flex flex-col items-center">
          <div style={{ width: '300px', height: '300px' }}>
            <img
              className="object-contain w-full h-full"
              src={`https://ipfs.io/ipfs/${image}`}
              alt={name}
            />
          </div>
        </div>
      </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-3/4">
        Total Mints: {total_packs-remaining} / {total_packs}
        </button>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={dirty_cash_icon} alt="hustle" />
          <span className="relative left-2 font-bold text-white">{pack_price[1]}</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-12" src={clean_cash_icon} alt="hustle" />
          <span className="font-bold text-white">{pack_price[0]}</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={hustler_token_icon} alt="hustle" />
          <span className="relative left-2 font-bold text-white">{pack_price[2]}</span>
        </div>
        <button
          onClick={buyPack}
          className={`rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-2/4 ${g_rank && remaining > 0 ? `cursor-pointer` : `cursor-not-allowed opacity-30`}`}
        >
          Buy
        </button>
      </div>
    </div>
  );
}

export default Pack;
