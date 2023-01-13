import React from "react";
import { FaTimes } from "react-icons/fa";
import { v4 as uuid } from "uuid";
import icon3 from "assets/images/icons/clean-cash.png";
import icon4 from "assets/images/icons/hst-final.png";
import icon2 from "assets/images/icons/hustler-clean-cash-token.png";
import icon1 from "assets/images/icons/slot.png";
import Modal from "components/shared/Modal";

const data = [
  {
    id: uuid(),
    icon: icon2,
    cost: "25000",
    classes: "w-10 mx-auto mt-2 mb-2",
  },
  {
    id: uuid(),
    icon: icon3,
    cost: "15000",
    classes: "w-16",
  },
  {
    id: uuid(),
    icon: icon4,
    cost: "1000",
    classes: "w-16",
  },
];

const UnlockForm = ({ isOpen, setIsOpen }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      //   className='w-8/12'
    >
      <div
        className="w-full bg-[#1a1b1f] border rounded-xl border-[#252525]  py-4 px-6  font-Montserrat "
        style={{ boxShadow: "#a5a5a5eb 0px 0px 9px 0px" }}
      >
        <>
          <div className="mb-2 flex items-center justify-between">
            <div />
            <div />
            <h2 className="px-5 py-2 text-center text-2xl font-bold text-white">
              Cost
            </h2>
            <FaTimes
              className="block text-2xl text-white hover:cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>

          <div className="flex justify-center">
            <div>
              <div
                className="flex items-center justify-center gap-x-3"
                key={Math.random()}
              >
                <div className="w-10">
                  <img
                    src={icon1}
                    className="h-full w-full object-contain"
                    alt="Wallet Icon"
                  />
                </div>
                <p className="font-bold text-white">1000</p>
              </div>
              {data.map((item) => (
                <div className="flex items-center gap-x-3" key={Math.random()}>
                  <div className={item.classes}>
                    <img
                      src={item.icon}
                      className="h-full w-full object-contain"
                      alt="Token Icon"
                    />
                  </div>
                  <p className="font-bold text-white">{item.cost}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5 flex justify-center">
            <button
              className="rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525] my-5 w-40"
              onClick={() => {
                setIsOpen(false);
                handleUnlock();
              }}
            >
              Unlock
            </button>
          </div>
        </>
      </div>
    </Modal>
  );
};

let handleUnlock = () => {
  document.querySelectorAll(".locked-area").forEach((entries) => {
    entries.classList.remove("locked");
    entries.classList.add("unlocked");
  });
  document.querySelector(".lock-btn").remove();
};

export default UnlockForm;
