import StarImg from "assets/images/icons/star.png";
import CleanCashImg from "assets/images/icons/clean-cash.png";
import SlotImg from "assets/images/icons/slot.png";
import FinalImg from "assets/images/icons/hst-final.png";
import DirtyImg from "assets/images/icons/hustler-dirty-cash-token.png";
import BoostImg from "assets/images/icons/boost.png";

const Mission = ({ missionName, rewardName, rewardPeriod, lockPeriod, MintOrPeriod, starNumber, setIsStackOpen, setIsUnStackOpen }) => {
  return (
    <tr
      className="mt-5 flex w-full flex-row items- justify-between rounded-lg text-md border border-[#2F2F2E] py-3 px-5 align-bottom min-w-[940px] text-md xl:text-md h-[276px]"
    >
      <td className="flex flex-col justify-center items-center h-full w-[30px]">
        {[...Array(starNumber).keys()].map(value => <img src={StarImg} alt={StarImg} key={value} />)}
      </td>
      <td className="flex flex-col justify-between items-center ml-4 xl:mx-auto h-full">
        <div className="text-center h-[56px]">
          <p className="text-white text-lg">Mission</p>
          <p className="text-stone-400">{`“${missionName}”`}</p>
        </div>
        <div className="grow flex flex-col justify-center">
          <div className="mt-2 flex justify-center">
            <button
              className={`rounded-4 mx-1 rounded-lg border border-[#2F2F2E]   bg-transparent w-[100px] xl:w-[120px] lg:text-32 py-2 text-lime-400 hover:bg-[#252525]`}
            >
              Start
            </button>
          </div>
          <div className="mt-2 flex justify-center">
            <button
              className={`rounded-4 mx-1 rounded-lg border border-[#2F2F2E]   bg-transparent py-2 w-[100px] xl:w-[120px] text-lime-400 hover:bg-[#252525]`}
              onClick={() => setIsStackOpen(true)}
            >
              Stake
            </button>
            <button
              className={`rounded-4 mx-1 rounded-lg border border-[#2F2F2E]   bg-transparent py-2 w-[100px] xl:w-[120px] text-lime-400 hover:bg-[#252525]`}
              onClick={() => setIsUnStackOpen(true)}
            >
              Unstake
            </button>
          </div>
          <div className="mt-2 flex justify-center">
            <button
              className={`rounded-4 mx-1 rounded-lg border border-[#2F2F2E]   bg-transparent py-2 w-[100px] xl:w-[120px] text-red-600 hover:bg-gray-900`}
            >
              Offline
            </button>
          </div>
        </div>
      </td>
      <td className="flex flex-col justify-center items-center ml-4 xl:mx-auto h-full">
        <div className="h-[56px]">
          <p className="text-white text-lg">Mission Requirements</p>
        </div>
        <div className="grow flex flex-col justify-center">
          <div className="flex flex-row justify-center rounded-xl border border-[#2F2F2E]  p-3 h-[100px] xl:gap-5">
            <div className="h-90 flex flex-col items-center justify-around">
              <img alt="" src={CleanCashImg} className=" w-10" />
              <p className="text-white">2K</p>
            </div>
            <div className="h-90 flex flex-col items-center justify-around">
              <img alt="" src={SlotImg} className="w-10" />
              <p className="text-white">40K</p>
            </div>
            <div className="h-90 flex flex-col items-center justify-around">
              <img alt="" src={FinalImg} className="w-10" />
              <p className="text-white">1K</p>
            </div>
            <div className="h-90 flex flex-col items-center justify-around">
              <img alt="" src={DirtyImg} className="w-10" />
              <p className="text-white">3K</p>
            </div>
          </div>
        </div>
        
      </td>
      <td className="flex flex-col justify-center items-center ml-4 xl:mx-auto h-full">
        <div className="h-[56px]">
          <p className="text-white text-lg">Your Progress</p>
        </div>
        <div className="grow flex flex-col justify-center">
          <div className="flex h-full w-full flex-col justify-around rounded-xl border border-[#2F2F2E] w-[120px] lg:w-[140px] xl:w-[200px]">
            <div className="h-90 flex flex-row items-center justify-around">
              <img alt="" src={CleanCashImg} className="w-10" />
              <p className="text-white">2K</p>
            </div>
            <div className="h-90 flex flex-row  items-center justify-around">
              <img alt="" src={SlotImg} className="w-10" />
              <p className="text-white">40K</p>
            </div>
            <div className="h-90 flex flex-row items-center justify-around">
              <img alt="" src={FinalImg} className="w-10" />
              <p className="text-white">1K</p>
            </div>
            <div className="h-90 flex flex-row items-center justify-around">
              <img alt="" src={DirtyImg} className="w-10" />
              <p className="text-white">3K</p>
            </div>
          </div>
        </div>
      </td>
      <td className="flex flex-col justify-between items-center text-center h-full ml-4 xl:mx-auto">
        <p className="text-white  text-lg">
          {`${MintOrPeriod ? 'Allowed Mints' : 'Reward Period'}`}
        </p>
        <button
          className={`rounded-4 mx-1 rounded-lg border border-[#2F2F2E]   bg-transparent w-[100px] xl:w-[120px] py-2 text-lime-400 hover:bg-[#252525]`}
        >
          {`${rewardPeriod}`}
        </button>
        <p className="text-white">
          Lock Period
        </p>
        <button
          className={`rounded-4 mx-1 rounded-lg border border-[#2F2F2E]   bg-transparent w-[100px] xl:w-[120px] py-2 text-lime-400 hover:bg-[#252525]`}
        >
          {`${lockPeriod} days`}
        </button>
      </td>
      <td className="flex flex-col justify-between text-center ml-4 xl:mx-auto h-full">
        <div className="h-[56px]">
          <p className="text-white  text-lg">Reward</p>
          <p className=" text-stone-400">
            {`${rewardName}`}
          </p>
        </div>
        <div className="grow flex flex-col justify-center">
          <div className="flex w-full flex-col items-center justify-between h-full pt-2">
            <img alt="" src={BoostImg} className="" />
            <button
              className={`rounded-4 mx-1 mt-5 w-20 rounded-lg  border border-[#2F2F2E]  bg-transparent w-[100px]  xl:w-[120px] py-2 text-lime-400 hover:bg-[#252525]`}
            >
              Claim
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default Mission;
