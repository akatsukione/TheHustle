import React, { useState, useEffect, useCallback } from "react";
import { FaTimes } from "react-icons/fa";
import Modal from "components/shared/Modal";
import {  anchorGetStakedNfts, anchorUnstakeNFT, anchorGetDataFromAssetId, refreshAll } from "BlockchainInteractionWax";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const UnstakeNFT = ({ isOpenUnstake, setIsOpenUnstake, ual }) => {
  const [listData, setListData] = useState([]);
  
  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
      if (ual.activeUser) {
        const data = await anchorGetStakedNfts(ual);
        const nftData = await anchorGetDataFromAssetId(data);
        setListData(nftData);        
      }
    }, [ual, store]);

  async function handleUnstake(asset_id){
    await anchorUnstakeNFT(ual, asset_id);
    await refreshAll(dispatch)   
    setIsOpenUnstake(false);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Modal isOpen={isOpenUnstake} onRequestClose={() => setIsOpenUnstake(false)}>
        <div
          className="w-full bg-[#1a1b1f] border rounded-xl border-[#252525] py-4 px-6"
          style={{ boxShadow: "#a5a5a5eb 0px 0px 9px 0px" }}
        >
          <div className="mb-2 flex items-center justify-between">
            <div />
            <div />
            <h2 className="px-5 py-2 text-center font-Montserrat text-2xl font-bold text-olive">
              Unequip
            </h2>
            <FaTimes
              className="block text-2xl text-olive hover:cursor-pointer"
              onClick={() => {
                setIsOpenUnstake(false);
              }}
            />
          </div>
          <ul className="h-80 overflow-y-auto w-full">
          {listData.map((item) => (
            <li key={item.asset_id} className="flex items-center justify-between p-2 border-b-2 border-gray-500">
                <div className="flex items-center" style={{ width: '33.33%' }}>
                <img
                    src={`https://ipfs.io/ipfs/${item.image}`}
                    alt="Decoded image"
                    className="mr-2"
                    style={{ width: "100%", height: "auto" }}/>
                <span style={{ color: "white", fontSize: "25px" }}>{item.name}</span>
                </div>
                <div
                className="my-5 flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525] flex h-24 w-full items-center justify-center rounded-xl"
                onClick={() => handleUnstake(item.asset_id)}
                style={{ width: '33.33%' }}
                >
                <FaPlus className="text-5xl text-lime-400" />
                </div>
            </li>
            ))}
        </ul>
        </div>
      </Modal>
    </>
  );
};
export default UnstakeNFT;
