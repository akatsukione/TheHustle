import React, { useEffect, useState, Component } from "react";
import PackShopLogo from "assets/images/hustle/pack-shop.png";
import { getPackNFTs } from 'BlockchainInteractionWax';
import ProductPack from "./products/pack";
import Tippy from "@tippyjs/react";
import { FaInfoCircle, FaUserCircle } from "react-icons/fa";
const PackShop = ({ ual }) => {
  const [listData, setListData] = useState([]);
  const fetchData = async () => {
    let updatedList = [...listData];
    const getItemByName = name => {
      let index = 0;
      const filteredItems = updatedList.filter((item, i) => {
        if (item.name === name) {
          index = i;
          return true;
        }
      });
      if (filteredItems.length > 0) {
        return { ...filteredItems[0], index }
      } else {
        return null
      }
    }
  
    const data = await getPackNFTs();

    data.map(item => {
      const selectedItem = getItemByName(item.name);
      if (selectedItem) {
        const totalCount = updatedList[selectedItem.index].totalCount;
        const mintCount = updatedList[selectedItem.index].mintCount;
        updatedList[selectedItem.index].totalCount = totalCount + 1;
        if (item.owner === "nambuangongo") {
          updatedList[selectedItem.index].mintCount = mintCount + 1;
        }
      } else {
        updatedList.push({
          ...item,
          totalCount: 1, mintCount: item.owner === "nambuangongo" ? 1 : 0
        })
      }
    })
    setListData(updatedList);
  }
  useEffect(() => {
    fetchData();
  }, []);

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
          {listData.map(item => <ProductPack key={item.asset_id} {...item} />)}
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
