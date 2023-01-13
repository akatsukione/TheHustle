import React, { useState, useEffect, Component } from "react";
import LeaderBoardImg from "assets/images/leaderboard/leaderboard.png";
import WarningImg from "assets/images/leaderboard/warning.png";
import Img1 from "assets/images/leaderboard/1.png";
import Img2 from "assets/images/leaderboard/2.png";
import Img3 from "assets/images/leaderboard/3.png";
import { useSelector } from "react-redux";
import Tippy from "@tippyjs/react";
import { FaInfoCircle, FaUserCircle } from "react-icons/fa";

import { refreshAll, G_XPRank, Leader_L_rank, MiningPowerRank, DropRank } from "BlockchainInteractionWax.js";

const image = [Img1, Img2, Img3];
const columnNames = [
  ["Rank", "Gang", "DCPS"],
  ["Rank", "Gang", "Clean Cash"],
  ["Rank", "Gang", "G Rank"],
  ["Rank", "Gang", "Drops"],
];
const title = [
  "Hustling Power Leaderboard",
  "Laundering Leaderboard",
  "G Rank Leaderboard",
  "Drops Leaderboard",
];
const power = [];
const laundering = [];
const rank = [];
const drops = [];

const LeaderBoard = ({ ual }) => {
  const [index, setIndex] = React.useState(0);
  const [data, setData] = React.useState([power, laundering, rank, drops]);
  const store = useSelector((state) => state);

  const fetchData = async () => {
    if (ual.activeUser) {
      const G_Rank = await G_XPRank(ual);
      const _Leader_L_rank = await Leader_L_rank(ual);
      const MiningP_Rank = await MiningPowerRank(ual);
      const Drop_Rank = await DropRank(ual);
      setData([MiningP_Rank, _Leader_L_rank, G_Rank, Drop_Rank]);
    }
    console.log('ual log', ual);
    console.log('data log', data);
  };

  useEffect(() => {
    fetchData();
  }, [store, ual, index]);

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <img src={LeaderBoardImg} width="300" height="200" alt="" />
      <div className="flex px-10 text-center">
        <img src={WarningImg} className="h-8 w-8" alt="" />
        <p className="text-xl text-white md:px-5 container">
          Players must have at least one character in the game and complete a collection in order to appear on our Leaderboards. Only the top 100 players will be displayed.
        </p>
      </div>
      <div className="flex w-full justify-center py-10 px-10 max-sm:flex-col md:flex-row">
        <button
          className={`rounded-full border border-[#2F2F2E] bg-transparent py-3 px-4 font-bold ${index === 0 ? "bg-[#252525]" : ""} text-lime-400 hover:bg-[#252525] focus:bg-[#252525] max-sm:my-1 sm:mx-2 md:mx-10`}
          onClick={() => {
            setIndex(0);
          }}
        >
          Hustling Power
        </button>
        <button
          className={`rounded-full border border-[#2F2F2E] bg-transparent py-3 px-4 font-bold ${index === 1 ? "bg-[#252525]" : ""} text-lime-400 hover:bg-[#252525] focus:bg-[#252525] max-sm:my-1 sm:mx-2 md:mx-10`}
          onClick={() => {
            setIndex(1);
          }}
        >
          Laundering
        </button>
        <button
          className={`rounded-full border border-[#2F2F2E] bg-transparent py-3 px-4 font-bold ${index === 2 ? "bg-[#252525]" : ""} text-lime-400 hover:bg-[#252525] focus:bg-[#252525] max-sm:my-1 sm:mx-2 md:mx-10`}
          onClick={() => {
            setIndex(2);
          }}
        >
          G Rank
        </button>
        <button
          className={`rounded-full border border-[#2F2F2E] bg-transparent py-3 px-4 font-bold ${index === 3 ? "bg-[#252525]" : ""} text-lime-400 hover:bg-[#252525] focus:bg-[#252525] max-sm:my-1 sm:mx-2 md:mx-10`}
          onClick={() => {
            setIndex(3);
          }}
        >
          Drops
        </button>
      </div>
      <div className="text-center">
        <p className="px-5 py-10 text-4xl text-white">{title[index]}</p>
        {index === 0 && (
          <div className="w-full flex flex-col items-center justify-center mb-2 relative">
            <TooltipDDescriptionMP />
          </div>
        )}
        {index === 1 && (
          <div className="w-full flex flex-col items-center justify-center mb-2 relative">
            <TooltipDDescriptionL />
          </div>
        )}
        {index === 2 && (
          <div className="w-full flex flex-col items-center justify-center mb-2 relative">
            <TooltipDDescriptionGXP />
          </div>
        )}
        {index === 3 && (
          <div className="w-full flex flex-col items-center justify-center mb-2 relative">
            <TooltipDDescriptionDZ />
          </div>
        )}
      </div>
      <table className="w-full container text-white  text-center border-separate border-spacing-1">
        <thead className="mt-2">
          <tr className="mt-2 flex w-full mx-auto border border-[#2F2F2E] p-1">
            <th className="w-1/6 py-2">
              {columnNames[index][0]}
            </th>
            <th className="w-3/6 py-2 border-l border-[#2F2F2E]">
              {columnNames[index][1]}
            </th>
            <th className="w-2/6 py-2 border-l border-[#2F2F2E]">
              {columnNames[index][2]}
            </th>
          </tr>
        </thead>
        <tbody className="mt-2">
          {data[index].map((item, i) => (
            <tr className="mt-2 my-5 flex w-full mx-auto border border-[#2F2F2E] p-1 hover:bg-[#252525]" key={i} >
              <td className="flex justify-center w-1/6" >
                {i > 2 ? (
                  <div className="w-10 h-10 py-2">
                    {i + 1}
                  </div>
                ) : (
                  <img className="w-10 h-10 py-1" src={image[i]} alt="" />
                )}
              </td>
              <td className=" flex w-3/6 py-2 border-l border-[#2F2F2E] justify-center items-center">
                <div className="flex md:w-2/5 max-sm:w-0">

                </div>
                <div className="flex md:w-3/5 max-sm:w-full max-sm:justify-center max-sm:items-center">
                  <FaUserCircle className="rounded-full mr-2 inline-block h-7 w-7 "/> {item[0]}
                </div>
              </td>
              <td className="w-2/6 py-2 border-l border-[#2F2F2E]" >
                {item[1]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

class TooltipDDescriptionMP extends Component {
  render() {
    return (
      <Tippy
        content={<span className="">This leaderboard tracks every active account overall mining power based on the amount of Dirty Cash they generate every second.</span>}
        popperOptions={{
          placement: "right",
        }}
      >
        <p className="text-xl text-white">
          <FaInfoCircle />
        </p>
      </Tippy>
    );
  }
}

class TooltipDDescriptionL extends Component {
  render() {
    return (
      <Tippy
        content={<span className="">This leaderboard tracks how much Clean Cash every active account has laundered to date.</span>}
        popperOptions={{
          placement: "right",
        }}
      >
        <p className="text-xl text-white">
          <FaInfoCircle />
        </p>
      </Tippy>
    );
  }
}

class TooltipDDescriptionGXP extends Component {
  render() {
    return (
      <Tippy
        content={<span className="">This leaderboard tracks every active account current G Rank level.</span>}
        popperOptions={{
          placement: "right",
        }}
      >
        <p className="text-xl text-white">
          <FaInfoCircle />
        </p>
      </Tippy>
    );
  }
}

class TooltipDDescriptionDZ extends Component {
  render() {
    return (
      <Tippy
        content={<span className="">This leaderboard tracks every active account total successful drops performed to date.</span>}
        popperOptions={{
          placement: "right",
        }}
      >
        <p className="text-xl text-white">
          <FaInfoCircle />
        </p>
      </Tippy>
    );
  }
}

export default LeaderBoard;
