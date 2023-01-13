import React, { useMemo, useState } from "react";
import { FaTimes } from "react-icons/fa";
import DirtyCashIcon from "assets/images/icons/dirty-cash-token.png";
import icon1 from "assets/images/icons/wallet.png";
import icon3 from "assets/images/icons/work.png";
import Modal from "components/shared/Modal";

const RATE = 184.808723;

const ReUpForm = ({ isOpen, setIsOpen }) => {
  const [amount] = useState(10);
  const [amountInWallet] = useState(3000);

  const [input, setInput] = useState("");

  const exchangedAmount = useMemo(() => {
    if (!input) return "";
    const result = parseFloat(input) * RATE;
    return result.toLocaleString(); // add toLocaleString() here
  }, [input]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      //   className='w-8/12'
    >
      <div
        className="w-full bg-[#1a1b1f] border rounded-xl border-[#252525] py-4 px-6 font-Montserrat"
        style={{ boxShadow: "#a5a5a5eb 0px 0px 9px 0px" }}
      >
        <form>
          <div className="mb-2 flex items-center justify-between">
            <div />
            <h2 className="px-5 py-2 text-center text-2xl font-bold text-white">
              Re-up
            </h2>
            <FaTimes
              className="block text-2xl text-white hover:cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <div className="text-center text-white">
            <p>Exchange Rate</p>
            <p>
              {(9.99999999735 / RATE).toFixed(5)} Dirty Cash = {amount} Work
            </p>
          </div>
          <div>
            <div className=" flex items-center justify-end gap-x-2 text-white">
              <p className="mt-2">{amountInWallet}</p>
              <div className="h-10 w-14">
                <img
                  src={icon1}
                  alt="Wallet Icon"
                  className="object- h-full w-full"
                />
              </div>
            </div>
            <div className="flex items-center justify-between rounded-md bg-olive py-2 px-1.5">
              <input
                type="text"
                name=""
                className=" flex-1 border-none bg-transparent px-2 py-2 outline-none"
                placeholder="insert amount"
                id=""
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <p className="w-10 pl-2.5 ">
                <img
                  src={DirtyCashIcon}
                  alt="Dirty Cash Icon"
                  className="mx-auto w-10"
                />
              </p>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-left text-white ">
              <p>You will receive:</p>
            </div>
            <div className="flex items-center justify-between rounded-md bg-olive py-2 px-1.5">
              <input
                type="text"
                name=""
                className="flex-1 border-none bg-transparent py-2 pl-4 outline-none"
                placeholder="insert amount"
                readOnly
                value={exchangedAmount}
              />
              <p className="w-10 rounded-md  pl-2.5 ">
                <img
                  src={icon3}
                  alt="Works Icon"
                  className="mx-auto w-10"
                />
              </p>
            </div>
          </div>

          <div className="mt-5 flex justify-center">
            <button className="my-5 flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525] w-40">Re-up</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ReUpForm;
