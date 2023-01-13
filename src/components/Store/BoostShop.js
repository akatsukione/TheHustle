import React, { useState, useEffect, useCallback, useRef, Component } from "react";
import BoostShopLogo from "assets/images/hustle/boost-shop.png";
import { getBoosterNFTs } from 'BlockchainInteractionWax';
import Boost from "./products/Boost";
import Countdown from "react-countdown";
import Tippy from "@tippyjs/react";
import { FaInfoCircle, FaUserCircle } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";

const BoostShop = ({ ual }) => {
  const [listData, setListData] = useState([]);
  const [time, setTime] = useState(Date.now());
  const [message, setMessage] = useState("")
  const [timeUntilShop, setTimeUntilShop] = useState(0)

  const ref = useRef();

  const handleUpdate = () => {
    if (ref.current) {
      ref.current.pause();
    }
    setTime(Date.now());
  };

  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    if (ual.activeUser) {
      setListData([]);
      const boosters = await getBoosterNFTs(ual);
      setListData(boosters);

      const week = Math.floor(((Math.floor(Date.now() / 1000) - 1677967324) / 604800) % 2);
      const floor = Math.floor(((Math.floor(Date.now() / 1000) - 1677967324) / 604800)) + 1;
      const difference = floor - ((Math.floor(Date.now() / 1000) - 1677967324) / 604800);
      setTimeUntilShop(difference * 604800 * 1000)
      if (week == 0) {
        setMessage("The shop will close in:")
      }
      else {
        setMessage("The shop will open in:")
      }
    }
  }, [ual, store]);

  useEffect(() => {
    if (ref.current) {
      ref.current.start();
    }
  }, [timeUntilShop]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="BoostShop-page flex flex-col items-center border border-[#2F2F2E] text-lime-400  rounded-[30px] p-4 pb-2 relative">
      <div className="py-10 md:min-h-screen">
        <div className="container mx-auto ">
          <div className="flex flex-col items-center">
            <div className="img flex justify-center">
              <img
                width="300"
                height="200"
                src={BoostShopLogo}
                alt="Boost Shop Logo"
              />
            </div>
            <div className="w-full flex flex-col items-center justify-center mb-2 relative" style={{marginTop:"-40px" }}>
              <TooltipDDescriptionBoost />
            </div>  
            <div className="flex justify-center items-center left-0 right-0 mb-5">
              <div className='w-full h-8 flex justify-center text-white ml-2'>
                <div className="text-white text-lg mr-4">{message}</div>
                <div className="text-white text-lg ml-2">
                  <Countdown
                    ref={ref}
                    onComplete={handleUpdate}
                    date={time + timeUntilShop}
                    autoStart={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-wrap items-center justify-center pb-6 md:flex-row md:items-start md:gap-y-5 md:gap-x-8">
          {listData.map((item) => <Boost key={item.template_id} ual={ual} {...item} />)}
        </div>
      </div>
    </div>
  );
}
class TooltipDDescriptionBoost extends Component {
  render() {
    return (
      <Tippy
        content={<span className="">At G Rank 25, you can access the BoostShop</span>}
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
export default BoostShop;
