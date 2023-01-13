import React, { useState, useEffect } from "react";
import image1 from "assets/images/hustle/consignment.PNG";
import icon1 from "assets/images/icons/work.png";
import ReUpForm from "./ReupForm";
import {  useSelector } from "react-redux";

import { anchorGetBalance } from "BlockchainInteractionWax";

const Top = ({ ual }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [workResource, setWorkResource] = useState(0);

  const store = useSelector((state) => state);

  const fetchData = async () => {
    if (ual.activeUser) {
      const values = await anchorGetBalance(ual);
      setWorkResource(parseFloat(values[3]).toFixed(3));      
    }
  };

  useEffect(() => {
    fetchData();
  }, [store]);

  return (
    <>
      <div className="flex flex-col items-center font-Montserrat">
        <div className="img">
          <img width="300" height="200" src={image1} alt="Consignment Logo" />
        </div>
        <div className="flex flex-col items-center font-Montserrat">
          <p className="mb-1 text-md font-bold text-olive">Remaining Work</p>
          <div className="flex items-center gap-x-2">
            <div className="w-16">
              <img src={icon1} alt="" className="object- h-full w-full" />
            </div>
            <p className="mb-1 text-xl font-bold text-olive">
            {workResource}
            </p>
            <div className="w-16">
              <img src={icon1} alt="" className="object- h-full w-full" />
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="my-5 flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525] w-32 rounded-md font-bold "
        >
          Re-up
        </button>
      </div>
      <ReUpForm setIsOpen={setIsOpen} isOpen={isOpen} ual={ual}/>
    </>
  );
};

export default Top;

