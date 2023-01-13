import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { anchorStakeNft, anchorUnstakeNFT } from "BlockchainInteractionWax";
import CheckBox from 'components/shared/CheckBox';
import DotsIcon from 'assets/images/icons/dots.png';
import InfoIcon from 'assets/images/icons/information.png';

const NFT = ({ type = 'equip', checked, onCheck, refresh, ual, ...item }) => {
  const [isOpenTooltip, setIsOpenTooltip] = useState(false);
  const [isOpenActionsMenu, setIsOpenActionsMenu] = useState(false);

  const handleUnpack = () => {
    setIsOpenActionsMenu(false);
  }

  const handleTransfer = () => {
    setIsOpenActionsMenu(false);
  }

  const handleStake = async (id) => {
    setIsOpenActionsMenu(false);
    await anchorStakeNft(ual.activeUser.accountName, id, ual);
    refresh('stake', [id]);
  }

  const handleUnstake = async (id) => {
    setIsOpenActionsMenu(false);
    await anchorUnstakeNFT(ual, id);
    refresh('unstake', [id]);
  }

  return <div className="flex flex-col items-center border border-[#2F2F2E] text-lime-400 hover:bg-[#252525] rounded-[30px] p-4 pb-2 relative">
    <CheckBox
      checked={checked}
      onChange={() => onCheck(item.asset_id)}
      className='absolute top-4 left-4 z-10'
    />
    <div className='w-full flex justify-center mb-2 relative'>
      <img
        src={InfoIcon}
        className="inline-block w-6 h-6 invert rounded-full cursor-pointer"
        onMouseEnter={() => setIsOpenTooltip(true)}
        onMouseLeave={() => setIsOpenTooltip(false)}
      />
      {
        isOpenTooltip && <div className="w-full text-white text-sm absolute left-0 top-10 border border-[#2F2F2E] bg-[#131312] hover:bg-[#252525] rounded-lg p-3">
          {item.description}
        </div>
      }
    </div>
    <img
      src={`https://ipfs.io/ipfs/${item.image}`}
      alt="Decoded image"
      className="w-full h-72 object-contain object-center"
    />
    <div className="w-full flex justify-center relative mt-2">
      <OutsideClickHandler
        onOutsideClick={() => setIsOpenActionsMenu(false)}
      >
        <img
          src={DotsIcon}
          className="w-6 h-6 invert rounded-full cursor-pointer"
          onClick={() => setIsOpenActionsMenu(true)}
        />
        {
          isOpenActionsMenu && <ul className="w-full absolute border border-[#2F2F2E] p-1 rounded-2xl top-10 bg-[#252525] z-20 left-0">
            {
              item.schema !== 'packs' ?
                <>
                  {
                    type === 'equip' ? <>
                      <li
                        onClick={() => handleStake(item.asset_id)}
                        className="text-center font-semibold text-base leading-10 rounded-xl bg-transparent text-lime-400 hover:text-money-green hover:bg-white transition cursor-pointer"
                      >
                        Equip
                      </li>
                      <li
                        onClick={handleTransfer}
                        className="text-center font-semibold text-base leading-10 rounded-xl bg-transparent text-lime-400 hover:text-money-green hover:bg-white transition cursor-pointer"
                      >
                        Transfer
                      </li>
                    </>
                      : <li
                        onClick={() => handleUnstake(item.asset_id)}
                        className="text-center font-semibold text-base leading-10 rounded-xl bg-transparent text-lime-400 hover:text-money-green hover:bg-white transition cursor-pointer"
                      >
                        Unequip
                      </li>
                  }
                </>
                : <li
                  onClick={handleUnpack}
                  className="text-center font-semibold text-base leading-10 rounded-xl bg-transparent text-lime-400 hover:text-money-green hover:bg-white transition cursor-pointer"
                >
                  Unpack
                </li>
            }
          </ul>
        }
      </OutsideClickHandler>
    </div>
  </div>
}

export default NFT;