import React from "react";
import {unstakeConsignment} from "BlockchainInteractionWax.js"

const UnstakeCharacter = ({ setIsOpenPopUp, isOpenPopUp, assetId, ual}) => {
  const handleYesClick = () => {
    unstakeConsignment(assetId, ual)
    setIsOpenPopUp(false);
  };

  const handleNoClick = () => {
    setIsOpenPopUp(false);
  };

  return (
    <div className="fixed z-50 top-0 left-0 h-full w-full bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-white w-80 h-40 rounded-lg p-4 flex flex-col justify-between items-center">
        <h3 className="text-lg font-bold mb-2">Are you sure you want to unstake?</h3>
        <div className="flex justify-center">
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleYesClick}>
            Yes
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={handleNoClick}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default UnstakeCharacter;