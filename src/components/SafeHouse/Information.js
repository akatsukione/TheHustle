import { styled, TextField } from "@mui/material";
import React, { useState, useEffect, Component } from "react";
import { useSelector } from "react-redux";
import WarningImg from "assets/images/leaderboard/warning.png";
// import { refreshAll, G_XPRank, Leader_L_rank, MiningPowerRank, DropRank } from "BlockchainInteractionWax.js"
import Tippy from "@tippyjs/react";

import { anchorGetGRank, getLastActionMessage, anchorGetMPower, anchorGetMLCleanCashe, anchorGetuserinfors, anchorGetSCCount } from "BlockchainInteractionWax";

import { FaInfoCircle, FaPlus } from "react-icons/fa";
import ProfileForm from '../Profile/profileForm';

const MyTextField = styled(TextField)({
  border: '1px #787878 solid',
  borderRadius: '5px',
  input: {
    color: '#fff'
  }
})

const Information = ({ ual }) => {

  const [gRank, setGRank] = useState(0);
  const [StopSearch, setStopSearch] = useState(0);
  const [sucessfulDrop, setSucessfulDrop] = useState(0);
  const [shootout, setShootout] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  
  const [mPower, setMPower] = useState(0);
  const [lCCashe, setLCCashe] = useState(0);
  const [popUpMessage, setPopUpMessage] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [successfulCollectionsCount, setSuccessfulCollectionCount] = useState(0)
  
  const store = useSelector((state) => state);
  
  const fetchData = async () => {
    if (ual.activeUser) {
      const value = await anchorGetGRank(ual);
      setGRank(parseFloat(value).toFixed(1));
      const MiningP_Rank = await anchorGetMPower(ual);
      setMPower(MiningP_Rank);
      // const LCleanCashe = await anchorGetMLCleanCashe(ual);
      const LCleanCashe = "this is lcleancache";
      
      setLCCashe(LCleanCashe);
      const StopSearchEvent = await anchorGetuserinfors(ual, "consignment_stop_search");
      setStopSearch(StopSearchEvent);
      const SucessfulDrop = await anchorGetuserinfors(ual, "successful_drops");
      setSucessfulDrop(SucessfulDrop);
      const shootout = await anchorGetuserinfors(ual, "consignment_shoot_out");
      setShootout(shootout);
      const _successfulCollectionCount = await anchorGetSCCount (ual,"successful_drops");
      console.log('ss count is 0', _successfulCollectionCount)
      setSuccessfulCollectionCount(_successfulCollectionCount)
    }
  };

  useEffect(() => {
    fetchData();
  }, [store, ual]);

  async function getLastAction() {
    const value7 = await getLastActionMessage(ual);
    setPopUpMessage(value7)
    setIsPopupOpen(true);
  }

  return (
    <div
      className="mx-2 mr-2 mb-5 rounded-md py-8 px-5 text-lg border border-[#252525] text-white text-center justify-center items-center"
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-col flex-1 w-1/3">

        </div>
        <div className="flex flex-col flex-1 w-1/3 text-center">
          <div className="w-full flex flex-col items-center justify-center mb-2 relative">
            <TooltipForAvatar />
          </div>
        </div>
        <div className="flex flex-col flex-1 w-1/3">

        </div>
      </div>
      <div className="flex flex-row mb-4">
        <div className="flex flex-col  w-1/3 ">

        </div>
        <div className="flex flex-col w-1/3 p-4 justify-center items-center">
          <button onClick={() => setIsOpen(true)} style={{ height: '120px', width: '120px' }} className="b-8 flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] text-lime-400 hover:bg-[#252525] rounded-md font-bold">
            <FaPlus />
          </button>
          <ProfileForm setIsOpen={setIsOpen} isOpen={isOpen} ual={ual} />
        </div>

      </div>
      <div className="flex flex-row mb-4">
        <div className="flex flex-col w-1/3 ">

        </div>
        <div className="flex flex-col w-1/3 ">
          <MyTextField
            className=" text-base text-white text-center"
            placeholder="Enter gang name..."
            focused={false}
            size="small"
          />
        </div>
        <div className="flex flex-col flex-1 pl-5 justify-center" >
          <div className="w-full flex flex-col items-start justify-center mb-2 relative">
            <TooltipForWarning />
          </div>
        </div>
      </div>
      <div className="flex flex-row  mb-4">
        <div className="flex flex-col w-1/3 ">

        </div>
        <div className="flex flex-col w-1/3">
          <button className="p-2 flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] text-lime-400 hover:bg-[#252525] rounded-md font-bold flex flex-1">Register</button>
        </div>
        <div className="flex flex-col flex-1 justify-center pl-5">
          <div className="w-full flex flex-col items-start mb-2 relative">
            <TooltipForRegisterInfo />
          </div>
        </div>
      </div>
      <div className="flex flex-row mb-4">
        <div className="flex flex-col w-1/3 ">

        </div>
        <div className="flex flex-col w-1/3">
          <button onClick={(e) => { getLastAction() }} className="p-2 flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] text-lime-400 hover:bg-[#252525] rounded-md font-bold flex flex-1">Get Report</button>
        </div>
      </div>
      <div className="flex flex-row mb-4">
        {isPopupOpen && (

          <div className="flex flex-col items-center w-full bg-[#1a1b1f] border border-solid justify-center border-gray-500 rounded-xl py-4 px-6"
            style={{ boxShadow: "#a5a5a5eb 0px 0px 9px 0px" }}>
            <p className="text-white text-md font-semibold mb-4" style={{ textAlign: 'center' }}>
              {popUpMessage}
            </p>
            <button className="flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] py-3 px-3 text-lime-400 hover:bg-[#252525] block w-full  rounded-md px-2 py-2.5"
              onClick={() => setIsPopupOpen(false)}>
              Close
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-row mb-4 justify-center">
        <table className="w-full border border-[#2F2F2E] text-center p-1">
          <thead>
            <tr className="p-2">
              <th className="text-[#787878] text-bold-900 justify-center w-full p-4" colSpan={2}>
                Gang Stats
              </th>
            </tr>
          </thead>
          <tbody className="p-1">
              <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                <td className="w-1/2 p-2 mr-1">
                  G Rank
                </td>
                <td className="flex w-1/2 p-2 items-center justify-center">
                  {gRank}
                </td>
              </tr>
              <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                <td className="w-1/2 p-2 mr-1">
                  Total Bonus Reward
                </td>
                <td className="flex w-1/2 p-2 items-center justify-center">
                  0%
                </td>
              </tr>
              <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                <td className="w-1/2 p-2 mr-1">
                  Dirty Cash per sec
                </td>
                <td className="flex w-1/2 p-2 items-center justify-center">
                  {parseFloat(parseFloat(mPower).toFixed(6))}
                </td>
              </tr>
              <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                <td className="w-1/2 p-2 mr-1">
                  Dirty Cash per min
                </td>
                <td className="flex w-1/2 p-2 items-center justify-center">
                  {parseFloat(parseFloat(mPower * 60).toFixed(6))}
                </td>
              </tr>
              <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                <td className="w-1/2 p-2 mr-1">
                  Dirty Cash per hour
                </td>
                <td className="flex w-1/2 p-2 items-center justify-center">
                  {parseFloat(parseFloat(mPower * 3600).toFixed(6))}
                </td>
              </tr>
              <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                <td className="w-1/2 p-2 mr-1">
                  Laundered Clean Cash
                </td>
                <td className="flex w-1/2 p-2 items-center justify-center">
                  {parseFloat(parseFloat(lCCashe).toFixed(6))}
                </td>
              </tr>
              <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                <td className="w-1/2 p-2 mr-1">
                  Hustlers Token per sec
                </td>
                <td className="flex w-1/2 p-2 items-center justify-center">
                  0
                </td>
              </tr>
              <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                <td className="w-1/2 p-2 mr-1">
                  Hustlers Token per miin
                </td>
                <td className="flex w-1/2 p-2 items-center justify-center">
                  0
                </td>
              </tr>
              <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                <td className="w-1/2 p-2 mr-1">
                  Hustlers Token per hour
                </td>
                <td className="flex w-1/2 p-2 items-center justify-center">
                  0
                </td>
              </tr>
              <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                <td className="w-1/2 p-2 mr-1">
                  Sucessful Collections
                </td>
                <td className="flex w-1/2 p-2 items-center justify-center">
                  {successfulCollectionsCount}
                </td>
              </tr>
              <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                <td className="w-1/2 p-2 mr-1">
                  Stop & Searches
                </td>
                <td className="flex w-1/2 p-2 items-center justify-center">
                  {StopSearch}
                </td>
              </tr>
              <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                <td className="w-1/2 p-2 mr-1">
                  Police Shootouts
                </td>
                <td className="flex w-1/2 p-2 items-center justify-center">
                  {shootout}
                </td>
              </tr>
              <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                <td className="w-1/2 p-2 mr-1">
                  Successful Drops
                </td>
                <td className="flex w-1/2 p-2 items-center justify-center">
                  {sucessfulDrop}
                </td>
              </tr>
              <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                <td className="w-1/2 p-2 mr-1">
                  Compromised Drops
                </td>
                <td className="flex w-1/2 p-2 items-center justify-center">
                  0
                </td>
              </tr>
              <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                <td className="w-1/2 p-2 mr-1">
                  Intercepted Drops
                </td>
                <td className="flex w-1/2 p-2 items-center justify-center">
                  0
                </td>
              </tr>
              <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                <td className="w-1/2 p-2 mr-1">
                  Times Arrested
                </td>
                <td className="flex w-1/2 p-2 items-center justify-center">
                  0
                </td>
              </tr>

          </tbody>
        </table>
      </div>
      <div className="flex flex-row justify-center">
        <table className="w-full border border-[#2F2F2E] text-center">
          <thead>
            <tr className="p-2">
              <th className="text-[#787878] text-bold-900 justify-center w-full p-4" colSpan={2}>
                World Stats
              </th>
            </tr>
          </thead>
          <tbody className="p-1">
              <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                <td className="w-1/2 p-2 mr-1">
                  Sucessful Drug Deals
                </td>
                <td className="flex w-1/2 p-2 items-center justify-center">
                  <div>
                    0
                  </div>
                </td>
              </tr>
              <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                <td className="w-1/2 p-2 mr-1">
                  Stop & Searches
                </td>
                <td className="flex w-1/2 p-2 items-center justify-center">
                  <div>
                    0
                  </div>
                </td>
              </tr>
              <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                <td className="w-1/2 p-2 mr-1">
                  Police Shootouts
                </td>
                <td className="flex w-1/2 p-2 items-center justify-center">
                  <div>
                    0
                  </div>
                </td>
              </tr>
              <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                <td className="w-1/2 p-2 mr-1">
                  Successful Drops
                </td>
                <td className="flex w-1/2 p-2 items-center justify-center">
                  <div>
                    0
                  </div>
                </td>
              </tr>
              <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                <td className="w-1/2 p-2 mr-1">
                  Compromised Drops
                </td>
                <td className="flex w-1/2 p-2 items-center justify-center">
                  <div>
                    0
                  </div>
                </td>
              </tr>
              <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                <td className="w-1/2 p-2 mr-1">
                  Intercepted Drops
                </td>
                <td className="flex w-1/2 p-2 items-center justify-center">
                  <div>
                    0
                  </div>
                </td>
              </tr>
              <tr className="p-2 border-t border-[#2F2F2E] flex w-full">
                <td className="w-1/2 p-2 mr-1">
                  Total Arrests
                </td>
                <td className="flex w-1/2 p-2 items-center justify-center">
                  <div>
                    0
                  </div>
                </td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

class TooltipForAvatar extends Component {
  render() {
    return (
      <Tippy
        content={<span className="">At G Rank 100 and Hustling power 0.0192 you can add PFP to your profile</span>}
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

class TooltipForRegisterInfo extends Component {
  render() {
    return (
      <Tippy
        content={<span className="">Registered Gang will appear on the leaderboard. To register a gang you will need to be G rank level 100 with a 0.0192 Dirty Cash per Sec hustling power. The initial registration will cost 100 Clean Cash, followed by subsequent registrations at a rate of 20 Clean each</span>}
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

class TooltipForWarning extends Component {
  render() {
    return (
      <Tippy
        content={<span className="">Warning: Gang names must be free of offensive or discriminatory words. Ban risk looms if rules aren't respected. Play fair, play!</span>}
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

const Item = ({ text, value }) => (
  <div className="flex items-center justify-between text-white">
    <span className="font-bold">{text}:</span>
    <span className="relative left-2 w-12">{value}</span>
  </div>
);

export default Information;
