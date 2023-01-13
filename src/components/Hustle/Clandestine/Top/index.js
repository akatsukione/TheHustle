import React, { useState } from "react";
import ClandestineLogo from "assets/images/logo/clandestine-lab.png";
import icon1 from "assets/images/icons/work.png";
import ReUpForm from "./ReupForm";
import UnlockForm from "components/Hustle/Clandestine/forms/UnlockForm";

const Top = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUnlockOpen, setIsUnlockOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center font-Montserrat">
        <div className="img relative">
          <img width="300" height="200" src={ClandestineLogo} alt="Corner" />
          <button
            className="lock-btn absolute top-20 left-20 font-bold absolute top-20 left-20 rounded-lg border border-[#2F2F2E] bg-[#111] py-3 px-3 text-lime-400 hover:bg-[#252525] mt-5 w-40"
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
                <img src={icon1} alt="Corner" className="object- h-full w-full" />
              </div>
              <p className="mb-1 text-xl font-bold text-olive">0</p>
              <div className="w-16">
                <img src={icon1} alt="Work" className="object- h-full w-full" />
              </div>
            </div>
            <button
              onClick={() => setIsOpen(true)}
              className="locked-area locked rounded-lg border border-[#2F2F2E] bg-[#111] py-3 px-3 text-lime-400 hover:bg-[#252525] mt-5 w-40 font-bold "
            >
              Re-up
            </button>
          </div>
        </div>
      </div>
      <ReUpForm setIsOpen={setIsOpen} isOpen={isOpen} />
      <UnlockForm setIsOpen={setIsUnlockOpen} isOpen={isUnlockOpen} />
    </>
  );
};

export default Top;
