import React, { useState } from "react";
import LeaderBoardImg from "assets/images/leaderboard/hustlersclub.png";
import InfoImg from "assets/images/icons/info.png";
import CleanCashImg from "assets/images/icons/clean-cash.png";
import Mission from "./mission";
import StackModel from "./StackModel";
import UnStackModel from "./UnStackModel";

const sortBy = [
  {
    text: "Longest Reward Period",
  },
  {
    text: "Shortest Reward Period",
  },
  {
    text: "Character Reward",
  },
  {
    text: "Boost Reward",
  },
  {
    text: "Safe Reward",
  },
  {
    text: "Pass Reward",
  },
  {
    text: "Lowest Requirement",
  },
  {
    text: "Highest Requirement",
  },
  {
    text: "Difficulty low to high",
  },
  {
    text: "Difficulty high to low",
  },
]

const missionType = [
  {
    missionName: "Say hello to my lil friend",
    rewardName: `Boost "Enforcer"`,
    rewardPeriod: "Daily",
    lockPeriod: 20,
    MintOrPeriod: false,
    starNumber: 1
  },
  {
    missionName: "Time Traveller",
    rewardName: `Boost "Safe Reset"`,
    rewardPeriod: "Daily",
    lockPeriod: 20,
    MintOrPeriod: false,
    starNumber: 1
  },
  {
    missionName: "Good Fellas",
    rewardName: `Boost "Gang Hire"`,
    rewardPeriod: "Daily",
    lockPeriod: 35,
    MintOrPeriod: false,
    starNumber: 2
  },
  {
    missionName: "Mo money, Mo problems",
    rewardName: `Boost "Safe Boost"`,
    rewardPeriod: "Every 3 days",
    lockPeriod: 40,
    MintOrPeriod: false,
    starNumber: 2
  },
  {
    missionName: "Cages are for birds",
    rewardName: `Boost "Skip Jail time"`,
    rewardPeriod: "Every 3 days",
    lockPeriod: 65,
    MintOrPeriod: false,
    starNumber: 2
  },
  {
    missionName: "Power & Respect",
    rewardName: `Boost "Production Boost"`,
    rewardPeriod: "Daily",
    lockPeriod: 120,
    MintOrPeriod: false,
    starNumber: 3
  },
  {
    missionName: "A Dogs Day",
    rewardName: `Boost "Safe Ultimate Boost"`,
    rewardPeriod: "Daily",
    lockPeriod: 120,
    MintOrPeriod: false,
    starNumber: 3
  },
  {
    missionName: "Lost Soul",
    rewardName: `Character "Epic Hustler"`,
    rewardPeriod: "0/1",
    lockPeriod: 40,
    MintOrPeriod: true,
    starNumber: 4
  },
  {
    missionName: "Thug life",
    rewardName: `Character "Epic Gangster"`,
    rewardPeriod: "0/1",
    lockPeriod: 40,
    MintOrPeriod: true,
    starNumber: 4
  },
  {
    missionName: "Street Science",
    rewardName: `Character "Epic Chemist"`,
    rewardPeriod: "0/1",
    lockPeriod: 40,
    MintOrPeriod: true,
    starNumber: 4
  },
  {
    missionName: "Baller",
    rewardName: `Character "Limited Edition"`,
    rewardPeriod: "0/1",
    lockPeriod: 40,
    MintOrPeriod: false,
    starNumber: 4
  },
  {
    missionName: "Boss Life",
    rewardName: `Pass "Immunity"`,
    rewardPeriod: "Every 2 days",
    lockPeriod: 40,
    MintOrPeriod: false,
    starNumber: 5
  },
  {
    missionName: "Fuck The Police",
    rewardName: `Pass "Get out of Jail"`,
    rewardPeriod: "Every 2 days",
    lockPeriod: 40,
    MintOrPeriod: false,
    starNumber: 5
  },
]

const Index = () => {
  const [isStackOpen, setIsStackOpen] = useState(false);
  const [isUnStackOpen, setIsUnStackOpen] = useState(false);
  return (
    <div className="flex w-full flex-col items-center justify-center pb-2 ">
      <img src={LeaderBoardImg} width="300" height="200" alt="" />
      <p className="mb-1 text-0.5xl text-white">Membership Fee</p>
      <img src={InfoImg} className="h-auto max-w-sm pt-3 shadow-lg" alt="" />
      <img
        src={CleanCashImg}
        className="h-auto w-20 max-w-sm pt-3"
        alt=""
      />

      <button
        className={`mt-3 rounded-lg  border border-[#2F2F2E]  bg-transparent  py-3 px-12 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] `}
      >
        Pay
      </button>

      <div className="mt-3 flex flex-wrap w-full justify-around lg:justify-between px-10 max-sm:flex-col">
        <div className="flex  max-sm:flex-col my-3">
          <div className="relative text-gray-600 focus-within:text-gray-400">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <button
                type="submit"
                className="focus:shadow-outline p-1 focus:outline-none"
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </span>
            <input
              type="search"
              name="q"
              className="mx-1 rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 pl-10 text-white max-sm:w-full"
              placeholder="Search Mission"
              autoComplete="off"
            />
          </div>
          <button
            className={`rounded-4 mx-1 rounded-lg border border-[#2F2F2E]   bg-transparent py-2 px-8 text-lime-400 hover:bg-[#252525] focus:bg-[#252525]  max-sm:mt-5 max-sm:w-full`}
          >
            All
          </button>
          <button
            className={`rounded-4 mx-1 rounded-lg border border-[#2F2F2E]   bg-transparent py-2 px-8 text-lime-400 hover:bg-[#252525] focus:bg-[#252525]  max-sm:mt-5 max-sm:w-full`}
          >
            Active
          </button>
        </div>
        <div className="flex flex-row my-3 justify-center align-bottom max-sm:mt-5">
          <p className="max-sm:w-15 mr-2 flex items-center text-white">
            Sort by:{" "}
          </p>
          <select
            type="search"
            name="q"
            className="mx-1 rounded-lg  border border-[#2F2F2E] bg-transparent py-2 px-3 text-white appearance-none"
            placeholder="Search Mission"
            autoComplete="off"
          >
            {
              sortBy.map((value) => 
                <option key={value.text} className="text-white bg-[#131312]">
                  {value.text}
                </option>)
            }
          </select>
        </div>
      </div>
      <div className="w-full px-10">
        {
          missionType.map(mission => 
            <div key={mission.missionName} className="overflow-x-auto">
              <Mission 
                missionName={mission.missionName} 
                rewardName={mission.rewardName} 
                rewardPeriod={mission.rewardPeriod} 
                lockPeriod={mission.lockPeriod} 
                MintOrPeriod={mission.MintOrPeriod}
                starNumber={mission.starNumber} 
                setIsStackOpen={setIsStackOpen} 
                setIsUnStackOpen={setIsUnStackOpen} 
              />
            </div>
          )
        }
      </div>
      <StackModel 
        setIsStackOpen={setIsStackOpen} 
        isStackOpen={isStackOpen} 
      />
      <UnStackModel 
        setIsUnStackOpen={setIsUnStackOpen} 
        isUnStackOpen={isUnStackOpen} 
      />
    </div>
  );
};


export default Index;


