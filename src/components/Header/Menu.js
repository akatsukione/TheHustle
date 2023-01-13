import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import HustleMenu from "./MenuItems/HustleMenu";
import ShopMenu from "./MenuItems/ShopMenu";
import SafehouseMenu from "./MenuItems/SafehouseMenu";
import Postoffice from "./MenuItems/Postoffice";
import CleanCashImg from "assets/images/icons/clean-cash.png";
import SlotImg from "assets/images/icons/slot.png";
import FinalImg from "assets/images/icons/hst-final.png";
import DirtyImg from "assets/images/icons/hustler-dirty-cash-token.png";
import WalletContext from "context";

import { anchorGetBalance } from "BlockchainInteractionWax";
import { useSelector } from "react-redux";

const Menu = ({ ual }) => {
  const { balance, setBalance } = useContext(WalletContext)
  const store = useSelector((state) => state);

  const fetchData = async () => {
    if (ual.activeUser) {
      const values = await anchorGetBalance(ual);
      if (isUpdatedBalance(values)) {
        setBalance({
          cleanCash: parseFloat(values[0]).toFixed(3),
          slot: parseFloat(values[4]).toFixed(0),
          final: parseFloat(values[2]).toFixed(3),
          dirty: parseFloat(values[1]).toFixed(3),
        });
      }
    }
  };

  const isUpdatedBalance = (data) => {
    return parseFloat(data[0]).toFixed(3) !== balance.cleanCash ||
      parseFloat(data[4]).toFixed(0) !== balance.slot ||
      parseFloat(data[2]).toFixed(3) !== balance.final ||
      parseFloat(data[1]).toFixed(3) !== balance.dirty
  }

  useEffect(() => {
    fetchData();
  }, [store, fetchData]);

  return (
    <div className="hidden lg:flex w-[800px] xl:w-[100%]">
      {
        !ual.activeUser ?
          <ul className="grow flex items-center justify-between">
            <Item text={"home"} url="/" />
          </ul>
          :
          <div className="grow flex">
            <ul className="grow flex items-center justify-between" style={{ flex: 7 }}>
              <Item text={"home"} url="/" />
              {/* <Item text={"Safe House"} url="/safe-house" /> */}
              <SafehouseMenu />
              <HustleMenu />
              <Postoffice />
              <ShopMenu />
              <Item text={"Stash"} url="/stash" />
              {/* <Item text={"Leader Board"} url="/leaderboard" /> */}
              <Item text={"Hustlers Club"} url="/mission" />
            </ul>

            <div className="grow flex flex-row justify-center xl:gap-5" style={{ flex: 3 }}>
              <div className="flex flex-col items-center justify-around">
                <img alt="" src={CleanCashImg} className="w-10" />
                <p className="text-white mt-2 text-xs">{balance.cleanCash}</p>
              </div>
              <div className="flex flex-col items-center justify-around">
                <img alt="" src={SlotImg} className="w-5" />
                <p className="text-white mt-2 text-xs">{balance.slot}</p>
              </div>
              <div className="flex flex-col items-center justify-around">
                <img alt="" src={FinalImg} className="w-5" />
                <p className="text-white mt-2 text-xs">{balance.final}</p>
              </div>
              <div className="flex flex-col items-center justify-around">
                <img alt="" src={DirtyImg} className="w-5" />
                <p className="text-white mt-2 text-xs">{balance.dirty}</p>
              </div>
              <div className="flex flex-col items-center justify-around">
                <p className="text-white mt-2 text-xs font-bold">Hustler: {ual.activeUser ? ual.activeUser.accountName : 'Not connected'}</p>
              </div>
            </div>
          </div>
      }
    </div>
  );
};

const Item = ({ text, url }) => {
  const location = useLocation();
  var className = location.pathname === url ? 'active' : 'inactive';

  return (
    <li className="cursor-pointer bg-gradient-to-r text-[#787878] hover:text-[#e2e3e6] bg-clip-text font-Montserrat font-bold capitalize tracking-wide">
      <Link className={className} to={url}>
        {text}
      </Link>
    </li>
  );
};

export default Menu; 
