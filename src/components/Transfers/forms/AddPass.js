import React, { useState, useEffect, useCallback, useMemo, Component } from "react";
import { FaTimes } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import Modal from "components/shared/Modal";

import { useDispatch, useSelector } from "react-redux";
import {  anchorGetStakedNfts, anchorGetDataFromImmunityPass, anchorAddImmunity, refreshAll } from "BlockchainInteractionWax";

const AddPass = ({ isOpen, setIsOpen, ual }) => {
  const [listData, setListData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    if (ual.activeUser) {
      const data = await anchorGetStakedNfts(ual);
      const nftData = await anchorGetDataFromImmunityPass(data, ual)
      const newNftData = nftData.filter((item) => item.template_id === "605912");
      setListData(newNftData);
    }

  }, [ual, store]);

  async function handleAddImmunity (asset_id) {
    await anchorAddImmunity(asset_id, ual);
    await refreshAll(dispatch)   
    setIsOpen(false);         
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const hours = Math.floor(minutes / 60);
  
    if (hours > 0) {
      return `${hours}:${minutes % 60 < 10 ? `0${minutes % 60}` : minutes % 60}:${seconds < 10 ? `0${seconds}` : seconds}`;
    }
    
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };  

  useEffect(() => {
    const interval = setInterval(() => {
      setListData(prevListData => prevListData.map(item => ({
        ...item,
        cooldown: item.cooldown > 0 ? item.cooldown - 1 : 0,
      })));
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
        <div
          className="w-full bg-[#1a1b1f] border rounded-xl border-[#252525] py-4 px-6"
          style={{ boxShadow: "#a5a5a5eb 0px 0px 9px 0px" }}
        >
          <div className="mb-2 flex items-center justify-between">
            <div />
            <div />
            <h2 className="px-5 py-2 text-center font-Montserrat text-2xl font-bold text-olive">
              Add Immunity
            </h2>
            <FaTimes
              className="block text-2xl text-olive hover:cursor-pointer"
              onClick={() => {
                setIsOpen(false);
              }}
            />
          </div>
          <ul className="h-80 overflow-y-auto w-full">
          {listData.map((item) => (
          <li key={item.asset_id} className="flex items-center justify-between p-2 border-b-2 border-gray-500">
            <div className="relative flex items-center" style={{ width: '33.33%' }}>
              <img src={`https://ipfs.io/ipfs/${item.image}`} alt="Decoded image" className="mr-2" style={{ width: "100%", height: "auto" }} />
              {item.cooldown > 0 && (
                <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">
                    {formatTime(item.cooldown)}
                  </span>
                </div>
              )}
            </div>
            <div style={{ color: "white", fontSize: "20px", width: '33.33%', marginLeft: '10px' }}>{item.name}</div>
            {item.cooldown === 0  ? (
              <div className="my-5 flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525] flex h-24 w-full items-center justify-center rounded-xl" onClick={() => handleAddImmunity(item.asset_id)} style={{ width: '33.33%' }} disabled={isLoading}>
                <FaPlus className="text-5xl text-lime-400" />
              </div>
            ) : (
              <div style={{ width: '33.33%' }}></div>
            )}
          </li>
        ))}
        </ul>
        </div>
      </Modal>
    </>
  );
};

export default AddPass;
