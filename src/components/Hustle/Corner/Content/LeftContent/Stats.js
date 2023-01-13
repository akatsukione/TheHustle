import React from "react";
import { FaTimes } from "react-icons/fa";
import Modal from "../../../../shared/Modal";

const Stats = ({ isOpen, setIsOpen }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      //   className='w-8/12'
    >
      <div
        className="w-full bg-[#1a1b1f] border rounded-xl border-[#252525]  py-4 px-6"
        style={{ boxShadow: "#a5a5a5eb 0px 0px 9px 0px" }}
      >
        <div>
          <div className="mb-2 flex items-center justify-between">
            <div />
            <h2 className="px-5 py-2 text-center font-Montserrat text-2xl font-bold text-olive">
              Character Stats
            </h2>
            <FaTimes
              className="block text-2xl text-olive hover:cursor-pointer"
              onClick={() => {
                setIsOpen(false);
              }}
            />
          </div>

          <div>
            <div className="mt-2">
              <Item text={"Name"} value={""} />
              <Item text={"Rarity"} value={""} />
              <Item text={"Level"} value={""} />
              <Item text={"Edition"} value={""} />
              <Item text={"Hustling Power"} value={""} />
              <Item text={"Collected Dirty Cash"} value={""} />
              <p className="mt-3 font-bold text-white">Attributes</p>
              <Item text={"Strength"} value={""} />
              <Item text={"Hustlers Ambition"} value={""} />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const Item = ({ text, value }) => (
  <p className="text-white">
    <span className="text-white ">{text}:</span> {"  "} {value}
  </p>
);

export default Stats;
