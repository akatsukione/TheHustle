import React, { useEffect, useState, useCallback, Component } from "react";
import PackShopLogo from "assets/images/hustle/pack-shop.png";
import { getPacksNFT } from 'BlockchainInteractionWax';
import Pack from "./products/Pack";
import { useDispatch, useSelector } from "react-redux";
import Tippy from "@tippyjs/react";
import { FaInfoCircle, FaUserCircle } from "react-icons/fa";
const PackShop = ({ ual }) => {
  const [listData, setListData] = useState([]);
  
  const store = useSelector((state) => state);
  // const dispatch = useDispatch();

  const fetchData = useCallback(async () => {  
    if (ual.activeUser) {
      const boosters = await getPacksNFT(ual);
      setListData(boosters);
    }
  }, [ual, store]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="PackShop-page">
      <div className="py-10 md:min-h-screen">
        <div className="container mx-auto ">
          <div className="flex flex-col items-center">
            <div className="img flex justify-center">
              <img
                width="300"
                height="200"
                src={PackShopLogo}
                alt="Pack Shop Logo"
              />
            </div>
            <div className="w-full flex flex-col items-center justify-center mb-2 relative" style={{marginTop:"-40px" }}>
              <TooltipDDescriptionPack />
            </div>  
          </div>
        </div>
        <div className="flex flex-col flex-wrap items-center justify-center pb-6 md:flex-row md:items-start md:gap-y-5 md:gap-x-24">         
          {listData.map((item) => <Pack key={item.template_id} ual={ual} {...item} />)}
        </div>
      </div>
    </div>
  );
}
class TooltipDDescriptionPack extends Component {
  render() {
    return (
      <Tippy
        content={<span className="">Mystery Packs can only be minted once you have reached G Rank Level 100</span>}
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
export default PackShop;
