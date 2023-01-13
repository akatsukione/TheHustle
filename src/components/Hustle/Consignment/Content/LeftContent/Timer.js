import React, { useState } from "react";
import Countdown from "react-countdown";
import UpgradeConfirm from "./UpgradeConfirm";

// Renderer callback with condition

const renderer = (props) => {
  const {
    hours,
    minutes,
    seconds,
    completed,
    days,
    api,
    props: compProps,
  } = props;

  if (completed || api.isStopped()) return "Character upgraded successfully!";
  const getDays = days ? days + (days === 1 ? " Day" : " Days") : "";
  const getHours = hours ? hours + (hours === 1 ? " Hour" : " Hours") : "";
  const getMin = minutes ? minutes + (minutes === 1 ? " Min" : " Min") : "";
  const getSec = seconds ? seconds + (seconds === 1 ? " Sec" : " Sec") : "";
  const { isOpen, setIsOpen } = compProps;

  const confirmHandler = () => {
    api.stop();
    setIsOpen(false);
  };
  const cancelHandler = () => {
    setIsOpen(false);
  };

  return (
    <div className="mb-2">
      <p>
        Upgrading will finish in:{getDays} {getHours} {getMin} {getSec}
      </p>
      <button
        className="my-5 flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525]"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Skip this time
      </button>
      <UpgradeConfirm
        onConfirm={confirmHandler}
        onCancel={cancelHandler}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
};

const CountDownTimer = ({ date, stopUpgradeTimer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isStopped, setIsStopped] = useState(false);

  if (isStopped) return null;

  const completeHandler = () => {
    setTimeout(() => {
      stopUpgradeTimer();
      setIsStopped(true);
    }, 5 * 1000);
  };

  return (
    <div>
      <Countdown
        date={date}
        renderer={renderer}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        onStop={completeHandler}
        onComplete={completeHandler}
      />
    </div>
  );
};

export default CountDownTimer;
