import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { v4 as uid } from "uuid";
import ANCHOR_WALLET from "assets/images/wallet/ANCHOR_WALLET.png";
import WAX_CLOUD_WALLET from "assets/images/wallet/WAX_CLOUD_WALLET.png";
import WOMBAT_WALLET from "assets/images/wallet/WOMBAT_WALLET.png";
const MENUS = [
  {
    id: uid(),
    value: "1",
    text: "Anchor Wallet",
    icon: ANCHOR_WALLET,
  },
  {
    id: uid(),
    value: "2",
    text: "Anchor Cloud Wallet",
    icon: WAX_CLOUD_WALLET,
  },
  {
    id: uid(),
    value: "3",
    text: "Wombat Wallet",
    icon: WOMBAT_WALLET,
  },
];
const SignInMenus = ({ setIsAuthenticated }) => {
  return (
    <div className="custom-shadow bg-black p-4  text-olive">
      <div>
        <p>Please Select your wallet to login</p>

        <div className="mt-4">
          {MENUS.map((i) => (
            <Item
              key={i.id}
              text={i.text}
              icon={i.icon}
              setIsAuthenticated={setIsAuthenticated}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Item = ({ icon, text, setIsAuthenticated }) => {
  return (
    <div
      className="custom-shadow btn btn-default mb-5 flex items-center justify-between overflow-hidden rounded-md border-none py-1 pr-3 pl-2 hover:cursor-pointer"
      onClick={() => setIsAuthenticated(true)}
    >
      <IconImage url={icon} />
      <p className="text-white">{text}</p>
      <div className="text-white">
        <FaChevronRight />
      </div>
    </div>
  );
};

const IconImage = ({ url }) => {
  return (
    <div className="h-10 w-10">
      <img
        srcSet={url}
        className="h-full w-full object-contain"
        alt="Icon Url"
      />
    </div>
  );
};

export default SignInMenus;
