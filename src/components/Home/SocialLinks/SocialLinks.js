import React from "react";
import {
  FaDiscord,
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaMedium,
  FaSkype,
  FaTelegramPlane,
  FaTwitch,
  FaTwitter,
} from "react-icons/fa";

const SocialLinks = () => {
  return (
    <div className="fixed left-0 top-0 h-full items-center p-5">
      <ul className="flex h-full flex-col items-center justify-end gap-3">
        {ITEMS.map((item) => (
          <Item
            key={Math.random()}
            element={item?.icon}
            url={item?.url}
            bg={item?.bg}
          />
        ))}
      </ul>
    </div>
  );
};

const Item = ({ element, url, bg }) => {
  if (url === "/" || url === "") return null;
  return (
    <a
      target={"_blank"}
      href={url}
      className={` ${
        bg ? bg : randomColor()
      } text-md cursor-pointer rounded-full bg-[#b7a368] p-1 text-black text-black`}
      rel="noreferrer"
    >
      {element}
    </a>
  );
};

const ITEMS = [
  {
    url: "https://discord.gg/thehustle",
    icon: <FaDiscord />,
    bg: "bg-primary",
  },
  {
    url: "/",
    icon: <FaFacebook />,
    bg: "bg-blue-700",
  },
  {
    url: "/",
    icon: <FaLinkedinIn />,
    bg: "bg-cyan-600",
  },
  {
    url: "/",
    icon: <FaInstagram />,
    bg: "bg-pink-600",
  },
  {
    url: "/",
    icon: <FaSkype />,
    bg: "bg-sky-600",
  },
  {
    url: "https://twitter.com/TheHustleWAX?t=GvlIOfT96GSRIlmk3G_ldw&s=08",
    icon: <FaTwitter />,
    bg: "bg-primary",
  },
  {
    url: "https://t.me/+3Ptio6WO_1A2MDlk",
    icon: <FaTelegramPlane />,
    bg: "bg-primary",
  },
  {
    url: "/",
    icon: <FaTwitch />,
    bg: "bg-violet-600",
  },
  {
    url: "https://medium.com/@thehustle.io",
    icon: <FaMedium />,
    bg: "bg-primary",
  },
];

const randomColor = () => {
  const COLORS = [
    "bg-orange-500",
    "bg-orange-500",
    "bg-amber-500",
    "bg-yellow-500",
    "bg-lime-500",
    "bg-green-500",
    "bg-emerald-500",
    "bg-teal-500",
    "bg-sky-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-purple-500",
    "bg-fuchsia-500",
    "bg-pink-500",
    "bg-rose-500",
  ];

  const index = Math.ceil(Math.random() * (COLORS.length - 1));

  return COLORS[index];
};

export default SocialLinks;
