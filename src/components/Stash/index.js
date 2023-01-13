import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { getNFTsInWallet, anchorGetStakedNfts, anchorGetDataFromAssetId, anchorStakeNft, anchorUnstakeNFT } from "BlockchainInteractionWax";
import NFT from './NFT';
import CheckBox from 'components/shared/CheckBox';
import StashLogo from "assets/images/logo/stash.png";
import ArrowIcon from 'assets/images/icons/arrow.svg';

const Stash = ({ ual }) => {
  const [type, setType] = useState('nft');
  const [isEquipNFT, setIsEquipNFT] = useState(true); // true: Equip NFT, false: Unequip NFT
  const [stakeData, setStakeData] = useState([]);
  const [unstakeData, setUnstakeData] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedNftIds, setSelectedNftIds] = useState([])
  const store = useSelector((state) => state);
  const fetchStakeData = useCallback(async () => {
    if (ual.activeUser) {
      const data = await getNFTsInWallet(ual.activeUser.accountName);
      setStakeData(data);
    }
  }, [ual, store]);

  const fetchUnstakeData = useCallback(async () => {
    if (ual.activeUser) {
      const data = await anchorGetStakedNfts(ual);
      const nftData = await anchorGetDataFromAssetId(data);
      setUnstakeData(nftData);
    }
  }, [ual, store]);

  const handleCheck = id => {
    const index = selectedNftIds.indexOf(id);
    const isExist = index > -1;
    let clonedNftIds = [...selectedNftIds];
    !isExist ? clonedNftIds.push(id) : clonedNftIds.splice(index, 1);
    setSelectedNftIds(clonedNftIds);
  }

  const handleControlNFTs = async () => {
    if (isEquipNFT) {
      await anchorStakeNft(ual.activeUser.accountName, selectedNftIds, ual);
    } else {
      await anchorUnstakeNFT(ual, selectedNftIds);
    }
    refreshAll(isEquipNFT ? 'stake' : 'unstake', selectedNftIds);
  }

  const refreshAll = (type, ids) => {
    let originList = type === 'stake' ? stakeData : unstakeData;
    let targetList = type === 'stake' ? unstakeData : stakeData;

    const selectedNFTList = originList.filter(item => ids.indexOf(item.asset_id) > -1);
    selectedNFTList.map(item => {
      const index = originList.indexOf(item);
      originList.splice(index, 1);
    });

    if (type === 'stake') {
      setStakeData([...originList]);
      setUnstakeData([...targetList, ...selectedNFTList]);
    } else {
      setUnstakeData([...originList]);
      setStakeData([...targetList, ...selectedNFTList]);
    }
    setIsChecked(false);
  }

  useEffect(() => {
    const listData = isEquipNFT ? stakeData.filter(item => item.schema !== 'packs') : unstakeData;
    setSelectedNftIds(isChecked ? listData.map(item => item.asset_id) : []);
  }, [isChecked]);

  useEffect(() => {
    setIsChecked(false);
    setSelectedNftIds([]);
  }, [isEquipNFT])

  useEffect(() => {
    fetchStakeData();
    fetchUnstakeData();
  }, [fetchStakeData, fetchUnstakeData]);

  return (
    <div className="flex flex-col items-center px-5">
      <img width="300" height="200" src={StashLogo} alt="Stash Logo" />

      <div className="w-full flex-col md:flex-row">
        <div className="flex flex-wrap items-center mb-3">
          {
            type === 'nft' && <>
              <span onClick={handleControlNFTs} className="cursor-pointer rounded-lg border border-[#2F2F2E] py-3 text-lime-400 hover:bg-[#252525] px-8 mr-5">
                {isEquipNFT ? `Equip` : `Unequip`}
              </span>
            </>
          }
          <button onClick={() => setType(type === 'nft' ? 'pack' : 'nft')} className="cursor-pointer rounded-lg border border-[#2F2F2E] py-3 text-lime-400 hover:bg-[#252525] px-8 mr-5">
            {type === 'nft' ? `View Packs` : `View NFTs`}
          </button>
          {
            type === 'nft' && <button
              className="rounded-lg border border-[#2F2F2E] py-3 px-8 text-lime-400 hover:bg-[#252525]"
              onClick={() => setIsEquipNFT(!isEquipNFT)}>
              {
                isEquipNFT ? <span className="flex items-center">Go to <img src={ArrowIcon} className="w-5 mx-1" /> Unequip NFT</span>
                  : <span className="flex items-center">Return to <img src={ArrowIcon} className="w-5 mx-1 rotate-180" /> Equip NFT</span>
              }
            </button>
          }
        </div>
        <CheckBox
          className="my-3"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          label="Select all"
        />
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
            {
              type === 'nft' ? <>
                {
                  isEquipNFT ? <>
                    {stakeData.filter(data => data.schema !== 'packs').map((item) => <div key={item.asset_id}>
                      <NFT
                        ual={ual}
                        refresh={refreshAll}
                        type={isEquipNFT ? 'equip' : 'unequip'}
                        checked={selectedNftIds.indexOf(item.asset_id) > -1}
                        onCheck={handleCheck}
                        {...item}
                      />
                    </div>)}
                  </>
                    : <>
                      {unstakeData.map((item) => <div key={item.asset_id}>
                        <NFT
                          ual={ual}
                          refresh={refreshAll}
                          type={isEquipNFT ? 'equip' : 'unequip'}
                          checked={selectedNftIds.indexOf(item.asset_id) > -1}
                          onCheck={handleCheck}
                          {...item}
                        />
                      </div>)}
                    </>
                }
              </>
                : <>
                  {stakeData.filter(data => data.schema === 'packs').map((item) => <div key={item.asset_id}>
                    <NFT
                      ual={ual}
                      refresh={refreshAll}
                      type={isEquipNFT ? 'equip' : 'unequip'}
                      checked={selectedNftIds.indexOf(item.asset_id) > -1}
                      onCheck={handleCheck}
                      {...item}
                    />
                  </div>)}
                </>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stash;
