import React, { useState } from "react";
import TraphouseLogo from "assets/images/logo/traphouse.png";
import icon1 from "assets/images/icons/work.png";
import ReUpForm from "./ReupForm";
import UnlockForm from "../forms/UnlockForm";

const Top = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUnlockOpen, setIsUnlockOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="img relative">
          <img width="300" height="200" src={TraphouseLogo} alt="Corner" />
          <button
            className="lock-btn my-5 flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] bg-[#111] py-3 px-3 text-lime-400 hover:bg-[#252525] absolute top-20 left-20 w-40 rounded-md font-Montserrat font-bold"
            onClick={() => setIsUnlockOpen(true)}
          >
            Unlock Area
          </button>
        </div>
        <div className="locked-area locked flex items-center gap-x-2">
         
   
          <div className="flex flex-col items-center font-Montserrat">
            <p className="mb-1 text-md font-bold text-olive">Remaining Work</p>
            <div className="flex items-center gap-x-2">
              <div className="w-16">
                <img src={icon1} alt="" className="object- h-full w-full" />
              </div>
              <p className="mb-1 text-xl font-bold text-olive">0</p>
              <div className="w-16">
                <img src={icon1} alt="Work" className="object- h-full w-full" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => setIsOpen(true)}
            className="locked-area locked my-5 flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525] w-32 rounded-md font-Montserrat font-bold"
          >
            Re-up
          </button>
        </div>
      </div>
      <ReUpForm setIsOpen={setIsOpen} isOpen={isOpen} />
      <UnlockForm setIsOpen={setIsUnlockOpen} isOpen={isUnlockOpen} />
    </>
  );
};

export default Top;
