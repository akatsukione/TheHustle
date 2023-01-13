import React, { useState, useEffect, useCallback } from "react";
import { FaTimes } from "react-icons/fa";
import Modal from "components/shared/Modal";

import { useDispatch, useSelector } from "react-redux";
import {anchorUnstakeDirtyLaundering, refreshAll} from "BlockchainInteractionWax.js"

const UnstakeConfirmation = ({ isOpen, setIsOpen, setIsOpenUnstake, dirtyCashAmount, ual }) => {

  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  async function unstakeConfirm()
  {
    await anchorUnstakeDirtyLaundering(ual, dirtyCashAmount)
    await new Promise(resolve => setTimeout(resolve, 500));
    await refreshAll(dispatch)
    setIsOpen(false)
    setIsOpenUnstake(false)
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      //   className='w-8/12'
    >
      <div
        className="w-full bg-[#1a1b1f] border rounded-xl border-[#252525] py-4 px-6 font-Montserrat py-4 px-6"
        style={{ boxShadow: "#a5a5a5eb 0px 0px 9px 0px" }}
      >
        <>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="px-5 py-2 text-center font-Montserrat text-2xl text-olive">
              Are you sure you want to unstake your Dirty Cash? Your current laundering progress will be lost! 
            </h2>
            <FaTimes
              className="block text-2xl text-olive hover:cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>

          <div className="flex justify-center gap-2">
            <button className="rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525] my-5 w-28"
              onClick={(e) => {e.preventDefault(); unstakeConfirm()}}>Yes</button>
            <button
              className="rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525] my-5 w-28"
              onClick={() => setIsOpen(false)}            >              No            </button>
          </div>
        </>
      </div>
    </Modal>
  );
};

export default UnstakeConfirmation;
