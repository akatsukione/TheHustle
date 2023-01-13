import React from "react";
import { FaTimes } from "react-icons/fa";
import { v4 as uuid } from "uuid";
import icon2 from "assets/images/icons/clean-cash.png";
import icon3 from "assets/images/icons/hst-final.png";
import icon1 from "assets/images/icons/hustler-clean-cash-token.png";
import Modal from "components/shared/Modal";
const AddForm = ({ isOpen, setIsOpen }) => {
  const data = [
    {
      id: uuid(),
      icon: icon1,
      cost: "25000",
    },
    {
      id: uuid(),
      icon: icon2,
      cost: "15000",
    },
    {
      id: uuid(),
      icon: icon3,
      cost: "1000",
    },
  ];
  return (
    <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
      <div
        className="w-full bg-[#1a1b1f] border rounded-xl border-[#252525] py-4 px-6 font-Montserrat"
        id="addslot_modal"
        style={{ boxShadow: "#a5a5a5eb 0px 0px 9px 0px" }}
      >
        <div>
          <div className="mb-2 flex items-center justify-between">
            <div />
            <div />
            <h2 className="px-5 py-2 text-center font-Montserrat text-2xl font-bold text-white">
              Slot Upgrade Cost
            </h2>
            <FaTimes
              className="block text-2xl text-white hover:cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <div className="flex justify-center">
            <div>
              {data.map((item) => (
                <div
                  className="addslot-item flex items-center gap-x-3"
                  key={Math.random()}
                >
                  <div className="w-16">
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
            <button className="my-5 block flex flex-col items-center justify-center rounded-md rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525]">Add Slot</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddForm;
