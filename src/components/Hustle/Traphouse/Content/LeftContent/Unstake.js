import React from "react";
import { FaTimes } from "react-icons/fa";
import Modal from "components/shared/Modal";

const UnstakeHustlers = ({ isOpen, setIsOpen, onConfirm, onCancel }) => {
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
        <>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="w-full px-5 py-2 text-center font-Montserrat text-2xl text-olive">
              Are you sure you want to unstake all of your characters from this
              location?
            </h2>
            <FaTimes
              className="block text-2xl text-olive hover:cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>

          <div className="flex justify-center gap-2">
            <button
              className="my-5 flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525]"
              onClick={() => setIsOpen(false)}
            >
              Yes
            </button>
            <button
              className="my-5 flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525]"
              onClick={() => setIsOpen(false)}
            >
              No
            </button>
          </div>
          {/* <p className=" mt-2 text-center text-olive">
            This will cost $1111 to skip this time
          </p> */}
        </>
      </div>
    </Modal>
  );
};

export default UnstakeHustlers;
