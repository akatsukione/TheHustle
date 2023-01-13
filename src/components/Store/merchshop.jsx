import React, { Component } from "react";
import MerchShopLogo from "assets/images/hustle/merchshop.png";
import Merch from "./products/merch";
import { Merch1 } from "./products/merch";
import { Merch2 } from "./products/merch";
import { Merch3 } from "./products/merch";
import { Merch4 } from "./products/merch";
import { Merch5 } from "./products/merch";
import { Merch6 } from "./products/merch";
import { Merch7 } from "./products/merch";
import { Merch8 } from "./products/merch";
import { Merch9 } from "./products/merch";
import { Merch10 } from "./products/merch";
import { Merch11 } from "./products/merch";
import { Merch12 } from "./products/merch";
import { Merch13 } from "./products/merch";
import { Merch14 } from "./products/merch";
import { Merch15 } from "./products/merch";
import { Merch16 } from "./products/merch";
import { Merch17 } from "./products/merch";
import { Merch18 } from "./products/merch";
import { Merch19 } from "./products/merch";
import { Merch20 } from "./products/merch";
import { Merch21 } from "./products/merch";
import { Merch22 } from "./products/merch";
import { Merch23 } from "./products/merch";


import whitetee from "assets/images/shop/Merch Shop/TheHustleWhiteTee.png";
import blacktee from "assets/images/shop/Merch Shop/TheHustleBlackTee.png";
import whitetee2 from "assets/images/shop/Merch Shop/PoweredByCryptoTee.png";
import blacktee2 from "assets/images/shop/Merch Shop/PoweredByCryptoBlackTee.png";
import whitetee3 from "assets/images/shop/Merch Shop/EnforcerWhiteTee.png";
import blacktee3 from "assets/images/shop/Merch Shop/EnforceBlackTee.png";


class MerchShop extends Component {
  render() {
    return (
      <div className="BoostShop-page">
        <div className="py-10 md:min-h-screen">
          <div className="container mx-auto ">
            <div className="flex flex-col items-center">
              <div className="img flex justify-center">
                <div className="logo-container">
                  <img
                    width="300"
                    height="200"
                    src={MerchShopLogo}
                    alt="Merch Shop Logo"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-wrap items-center justify-center pb-6 md:flex-row md:items-start md:gap-y-5 md:gap-x-8">
            <Merch src={whitetee} title="The Hustle - White Tee (S)" />
            <Merch src={whitetee} title="The Hustle - White Tee (M)" />
            <Merch src={whitetee} title="The Hustle - White Tee (L)" />
            <Merch src={whitetee} title="The Hustle - White Tee (XL)" />
            <Merch src={blacktee} title="The Hustle - Black Tee (S)" />
            <Merch src={blacktee} title="The Hustle - Black Tee (M)" />
            <Merch src={blacktee} title="The Hustle - Black Tee (L)" />
            <Merch src={blacktee} title="The Hustle - Black Tee (XL)" />
            <Merch src={whitetee2} title="Powered By Crypto - White Tee (S)" />
            <Merch src={whitetee2} title="Powered By Crypto - White Tee (M)" />
            <Merch src={whitetee2} title="Powered By Crypto - White Tee (L)" />
            <Merch src={whitetee2} title="Powered By Crypto - White Tee (XL)" />
            <Merch src={blacktee2} title="Powered By Crypto - Black Tee (S)" />
            <Merch src={blacktee2} title="Powered By Crypto - Black Tee (M)" />
            <Merch src={blacktee2} title="Powered By Crypto - Black Tee (L)" />
            <Merch src={blacktee2} title="Powered By Crypto - Black Tee (XL)" />
            <Merch src={whitetee3} title="Enforcer - White Tee (S)" />
            <Merch src={whitetee3} title="Enforcer - White Tee (M)" />
            <Merch src={whitetee3} title="Enforcer - White Tee (L)" />
            <Merch src={whitetee3} title="Enforcer - White Tee (XL)" />
            <Merch src={blacktee3} title="Enforcer - Black Tee (S)" />
            <Merch src={blacktee3} title="Enforcer - Black Tee (M)" />
            <Merch src={blacktee3} title="Enforcer - Black Tee (L)" />
            <Merch src={blacktee3} title="Enforcer - Black Tee (XL)" />

            {/* <Merch1 src={whitetee} />
            <Merch2 src={whitetee} />
            <Merch3 src={whitetee} />
            <Merch4 src={blacktee} />
            <Merch5 src={blacktee} />
            <Merch6 src={blacktee} />
            <Merch7 src={blacktee} />
            <Merch8 src={whitetee2} />
            <Merch9 src={whitetee2} />
            <Merch10 src={whitetee2} />
            <Merch11 src={whitetee2} />
            <Merch12 src={blacktee2} />
            <Merch13 src={blacktee2} />
            <Merch14 src={blacktee2} />
            <Merch15 src={blacktee2} />
            <Merch16 src={whitetee3} />
            <Merch17 src={whitetee3} />
            <Merch18 src={whitetee3} />
            <Merch19 src={whitetee3} />
            <Merch20 src={blacktee3} />
            <Merch21 src={blacktee3} />
            <Merch22 src={blacktee3} />
            <Merch23 src={blacktee3} /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default MerchShop;
