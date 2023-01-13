import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Modal from "components/shared/Modal";
import Stats from "./Stats";
import UpgradeForm from "./UpgradeForm";
import UnstakeHustlers from "./Unstake";

const ModalMenu = ({ isOpen, setIsOpen, startUpgradeTimer }) => {
  const [isUpGradeOpen, setIsUpgradeOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isUnstakeOpen, setIsUnstakeOpen] = useState(false);
  return (
    <>
      <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
        <div
          className="w-full bg-[#1a1b1f] border rounded-xl border-[#252525]  py-4 px-6"
          style={{ boxShadow: "#a5a5a5eb 0px 0px 9px 0px" }}
        >
          <div>
            <div className="mb-2 flex items-center justify-between">
              <div />
              <h2 className="px-5 py-2 text-center font-Montserrat text-2xl font-bold text-olive">
                Riley Level 3
              </h2>
              <FaTimes
                className="block text-2xl text-olive hover:cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
            </div>

            <div className="text-center">
              <div className="my-5">
                <div className="my-5 flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525] rounded-md">Collect Reward</div>
              </div>
              <div className="my-5">
                <div
                  className="my-5 flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525] rounded-md"
                  onClick={() => setIsUpgradeOpen(true)}
                >
                  Upgrade
                </div>
              </div>
              <div className="my-5">
                <div className="my-5 flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525] rounded-md">Pay bail</div>
              </div>
              <div className="my-5" onClick={() => setIsStatsOpen(true)}>
                <div className="my-5 flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525] rounded-md">Stats</div>
              </div>
              <div className="my-5">
                <div
                  className="my-5 flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525] rounded-md"
                  onClick={() => setIsUnstakeOpen(true)}
                >
                  Unstake
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <UpgradeForm
        isOpen={isUpGradeOpen}
        setIsOpen={setIsUpgradeOpen}
        startUpgradeTimer={startUpgradeTimer}
      />
      <Stats isOpen={isStatsOpen} setIsOpen={setIsStatsOpen} />
      <UnstakeHustlers isOpen={isUnstakeOpen} setIsOpen={setIsUnstakeOpen} />
    </>
  );
};

export default ModalMenu;
