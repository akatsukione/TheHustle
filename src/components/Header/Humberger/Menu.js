import React, { useState, useEffect } from "react";
import HustleMenu from "./HustleMenu";
import SafehouseMenu from "./SafehouseMenu";
import MenuItem from "./MenuItem";
import ShopMenu from "./ShopMenu";
import Postoffice from "./Postoffice";
import CleanCashImg from "assets/images/icons/clean-cash.png";
import SlotImg from "assets/images/icons/slot.png";
import FinalImg from "assets/images/icons/hst-final.png";
import DirtyImg from "assets/images/icons/hustler-dirty-cash-token.png";

import { anchorGetBalance } from "BlockchainInteractionWax";
import { useSelector } from "react-redux";

const Menu = ({ handleCloseDrawer, ual }) => {
  const [cleanCash, setCleanCash] = useState(0);
  const [slot, setSlot] = useState(0);
  const [final, setFinal] = useState(0);
  const [dirty, setDirty] = useState(0);
  const store = useSelector((state) => state);

  const fetchData = async () => {
    
    if (ual.activeUser) {
      const values = await anchorGetBalance(ual);
      setCleanCash(parseFloat(values[0]).toFixed(3));
      setSlot(parseFloat(values[4]).toFixed(0));
      setFinal(parseFloat(values[2]).toFixed(3));
      setDirty(parseFloat(values[1]).toFixed(3));
    }
  };

  useEffect(() => {
    fetchData();
  }, [store, fetchData]);

  return (
    <div className="pl-4 lg:hidden items-start">
  <div className="grow justify-evenly xl:gap-5" style={{flex: 3}}>
    <div className="flex flex-col items-left justify-around">
      <img alt="" src={CleanCashImg} className=" w-10" />
      <p className="text-white">{cleanCash}</p>
    </div>
    <div className="flex flex-col items-left justify-around">
      <img alt="" src={SlotImg} className="w-5" />
      <p className="text-white">{slot}</p>
    </div>
    <div className="flex flex-col items-left justify-around">
      <img alt="" src={FinalImg} className="w-5" />
      <p className="text-white">{final}</p>
    </div>
    <div className="flex flex-col items-left justify-around">
      <img alt="" src={DirtyImg} className="w-5" />
      <p className="text-white">{dirty}</p>
    </div>
  </div>

  <ul className="mt-4">
    <li>
      <MenuItem text={"Home"} url="/" onClick={handleCloseDrawer} />
    </li>
    <SafehouseMenu handleCloseDrawer={handleCloseDrawer} />
    <HustleMenu handleCloseDrawer={handleCloseDrawer} />
    <Postoffice handleCloseDrawer={handleCloseDrawer} />
    <ShopMenu handleCloseDrawer={handleCloseDrawer} />
    <MenuItem text={"Stash"} url="/stash" onClick={handleCloseDrawer} />
    <MenuItem text={"Hustlers Club"} url="/mission" onClick={handleCloseDrawer} />
  </ul>
</div>
  );
};

export default Menu;
