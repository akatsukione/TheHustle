import React from "react";
import icon2 from "assets/images/icons/clean-cash.png";
import icon3 from "assets/images/icons/hst-final.png";
import icon1 from "assets/images/icons/hustler-clean-cash-token.png";
import upgradeToken from "assets/images/icons/slot.png";

const AuthUserMenu = () => {
  return (
    <div className="py-3 text-white">
      <div>
        <p className="text-center font-bold">Thedragon.gm</p>
        <div id="user_wallet" className="flex gap-x-2">
          <Item icon={icon1} text="201" />
          <Item icon={icon2} text="201" />
          <Item icon={icon3} text="201" />
          <Item icon={upgradeToken} text="20" />
        </div>
      </div>
    </div>
  );
};

const Item = ({ icon, text }) => {
  return (
    <div className="flex items-center gap-x-2">
      <div className="w-8">
        <img src={icon} alt="Token Icon" className="h-full w-full" />
      </div>
      <p>{text}</p>
    </div>
  );
};

export default AuthUserMenu;
