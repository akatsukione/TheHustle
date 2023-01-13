import React, { useState, useEffect } from "react";

const Bottom = () => {
  const [countdown, setCountdown] = useState(60 * 60); // 1 hour in seconds
  const [canClaim, setCanClaim] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (countdown <= 0) {
      setCanClaim(true);
    } else {
      setCanClaim(false);
    }
  }, [countdown]);

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  const handleClaim = () => {
    // TODO: Handle the claim logic here
  };

  return (
    <div className="flex justify-center">
      <div className="w-full md:w-1/6">
        <div className="mt-5 flex items-center justify-center">
          <div className="w-full">
            <p className="text-center text-xl font-semibold text-white">
              Collected HCC:
            </p>
            <button
              className="my-5 flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525] block w-full rounded-md px-5 py-2.5"
              disabled={!canClaim}
              onClick={handleClaim}
            >
              {canClaim ? "Claim rewards" : `Claim available in ${minutes}m ${seconds}s`}
            </button>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-center">
          <div className="w-full">
            <p className="text-center text-xl font-semibold text-white">
              Bail Cost (HCC)
            </p>
            <button className="my-5 flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525] block w-full  rounded-md px-2 py-2.5">
              Pay Bail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bottom;
