import React, { useState } from "react";
import ModalMenu from "./ModalMenu";
import CountdownTimer from "./Timer";
const Character = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpgradeStart, setIsUpgradeStart] = useState(false);
  const [upgradedDeadline, setUpgradedDeadline] = useState(Date.now());

  const startUpgradeTimer = (time) => {
    setIsUpgradeStart(true);
    setUpgradedDeadline(Date.now() + time);
  };
  const stopUpgradeTimer = (time) => {
    setIsUpgradeStart(false);
    setUpgradedDeadline(Date.now());
  };

  return (
    <div>
      <div>
        <div>
          {isUpgradeStart && (
            <CountdownTimer
              date={upgradedDeadline}
              stopUpgradeTimer={stopUpgradeTimer}
            />
          )}
        </div>
        <div
          className="h-60 w-60 cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <img
            src="https://images.pexels.com/photos/102100/pexels-photo-102100.jpeg?auto=compress&cs=tinysrgb&w=1600"
            className="h-full w-full object-contain"
            alt=""
          />
        </div>
      </div>
      <ModalMenu
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        startUpgradeTimer={startUpgradeTimer}
      />
    </div>
  );
};

export default Character;
