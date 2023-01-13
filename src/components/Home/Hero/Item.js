import React from "react";
import image from "assets/images/waxp.gif";

const Item = () => {
  return (
    <div className="text-center text-white">
      <div className="mx-auto w-80">
        <img src={image} alt="" className="w-ful h-full object-contain" />
      </div>
      <div className="text-center text-white">
        <h2 className="mx-4 mt-4 mb-4 text-3xl font-bold md:mb-2 md:text-4xl">
          Tailwind CSS Template for Crypto, ICO and Web3
        </h2>
        <p className="text-xl md:text-lg">
          Crypto Currency, Blockchain, ICO, Web3 related website template
          crafted with Tailwind CSS. Comes with all essential UI components and
          pages to launch complete website or landing page for anything that
          related to Crypto, Blockchain and Web3.
        </p>
      </div>
    </div>
  );
};

export default Item;
