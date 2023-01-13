import React from "react";
import icon2 from "assets/images/icons/clean-cash.png";
import icon1 from "assets/images/icons/hustler-clean-cash-token.png";
import icon3 from "assets/images/shop/ht-hustler-token.png";

const Merch = ({src, title}) => {
    return (
      <div className="flex flex-col items-center justify-center p-5 md:gap-y-1 bg-teal-800 rounded-md mt-5">
        <p className="text-white">{title}</p>
        <div className="flex flex-col items-center">
          <img className="w-64" src={src} alt="hustle" />
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-3/4">
          Total Mints: 0/100
        </button>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon1} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-12" src={icon2} alt="hustle" />
          <span className="font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon3} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-2/4">
          Buy
        </button>
      </div>
       );
       };

const Merch1 = ({src}) => {
    return (
      <div className="flex flex-col items-center justify-center p-5 md:gap-y-1">
        <p className="text-white">The Hustle - White Tee (M)</p>
        <div className="flex flex-col items-center">
          <img className="w-64" src={src} alt="hustle" />
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-3/4">
          Total Mints: 0/100
        </button>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon1} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-12" src={icon2} alt="hustle" />
          <span className="font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon3} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-2/4">
          Buy
        </button>
      </div>

    );
};

const Merch2 = ({src}) => {
    return (
      <div className="flex flex-col items-center justify-center p-5 md:gap-y-1">
        <p className="text-white">The Hustle - White Tee (L)</p>
        <div className="flex flex-col items-center">
          <img className="w-64" src={src} alt="hustle" />
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-3/4">
          Total Mints: 0/100
        </button>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon1} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-12" src={icon2} alt="hustle" />
          <span className="font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon3} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-2/4">
          Buy
        </button>
      </div>

    );
};

const Merch3 = ({src}) => {
    return (
      <div className="flex flex-col items-center justify-center p-5 md:gap-y-1">
        <p className="text-white">The Hustle - White Tee (XL)</p>
        <div className="flex flex-col items-center">
          <img className="w-64" src={src} alt="hustle" />
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-3/4">
          Total Mints: 0/100
        </button>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon1} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-12" src={icon2} alt="hustle" />
          <span className="font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon3} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-2/4">
          Buy
        </button>
      </div>

    );
};

const Merch4 = ({src}) => {
    return (
      <div className="flex flex-col items-center justify-center p-5 md:gap-y-1">
        <p className="text-white">The Hustle - Black Tee (S)</p>
        <div className="flex flex-col items-center">
          <img className="w-64" src={src} alt="hustle" />
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-3/4">
          Total Mints: 0/100
        </button>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon1} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-12" src={icon2} alt="hustle" />
          <span className="font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon3} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-2/4">
          Buy
        </button>
      </div>

    );
};


const Merch5 = ({src}) => {
    return (
      <div className="flex flex-col items-center justify-center p-5 md:gap-y-1">
        <p className="text-white">The Hustle - Black Tee (M)</p>
        <div className="flex flex-col items-center">
          <img className="w-64" src={src} alt="hustle" />
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-3/4">
          Total Mints: 0/100
        </button>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon1} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-12" src={icon2} alt="hustle" />
          <span className="font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon3} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-2/4">
          Buy
        </button>
      </div>

    );
};


const Merch6 = ({src}) => {
    return (
      <div className="flex flex-col items-center justify-center p-5 md:gap-y-1">
        <p className="text-white">The Hustle - Black Tee (L)</p>
        <div className="flex flex-col items-center">
          <img className="w-64" src={src} alt="hustle" />
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-3/4">
          Total Mints: 0/100
        </button>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon1} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-12" src={icon2} alt="hustle" />
          <span className="font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon3} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-2/4">
          Buy
        </button>
      </div>

    );
};


const Merch7 = ({src}) => {
    return (
      <div className="flex flex-col items-center justify-center p-5 md:gap-y-1">
        <p className="text-white">The Hustle - Black Tee (XL)</p>
        <div className="flex flex-col items-center">
          <img className="w-64" src={src} alt="hustle" />
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-3/4">
          Total Mints: 0/100
        </button>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon1} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-12" src={icon2} alt="hustle" />
          <span className="font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon3} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-2/4">
          Buy
        </button>
      </div>

    );
};


const Merch8 = ({src}) => {
    return (
      <div className="flex flex-col items-center justify-center p-5 md:gap-y-1">
        <p className="text-white">Powered By Crypto - White Tee (S)</p>
        <div className="flex flex-col items-center">
          <img className="w-64" src={src} alt="hustle" />
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-3/4">
          Total Mints: 0/100
        </button>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon1} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-12" src={icon2} alt="hustle" />
          <span className="font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon3} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-2/4">
          Buy
        </button>
      </div>
       );
       };

const Merch9 = ({src}) => {
    return (
      <div className="flex flex-col items-center justify-center p-5 md:gap-y-1">
        <p className="text-white">Powered By Crypto - White Tee (M)</p>
        <div className="flex flex-col items-center">
          <img className="w-64" src={src} alt="hustle" />
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-3/4">
          Total Mints: 0/100
        </button>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon1} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-12" src={icon2} alt="hustle" />
          <span className="font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon3} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-2/4">
          Buy
        </button>
      </div>

    );
};

const Merch10 = ({src}) => {
    return (
      <div className="flex flex-col items-center justify-center p-5 md:gap-y-1">
        <p className="text-white">Powered By Crypto - White Tee (L)</p>
        <div className="flex flex-col items-center">
          <img className="w-64" src={src} alt="hustle" />
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-3/4">
          Total Mints: 0/100
        </button>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon1} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-12" src={icon2} alt="hustle" />
          <span className="font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon3} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-2/4">
          Buy
        </button>
      </div>

    );
};

const Merch11 = ({src}) => {
    return (
      <div className="flex flex-col items-center justify-center p-5 md:gap-y-1">
        <p className="text-white">Powered By Crypto - White Tee (XL)</p>
        <div className="flex flex-col items-center">
          <img className="w-64" src={src} alt="hustle" />
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-3/4">
          Total Mints: 0/100
        </button>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon1} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-12" src={icon2} alt="hustle" />
          <span className="font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon3} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-2/4">
          Buy
        </button>
      </div>

    );
};

const Merch12 = ({src}) => {
    return (
      <div className="flex flex-col items-center justify-center p-5 md:gap-y-1">
        <p className="text-white">Powered By Crypto - Black Tee (S)</p>
        <div className="flex flex-col items-center">
          <img className="w-64" src={src} alt="hustle" />
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-3/4">
          Total Mints: 0/100
        </button>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon1} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-12" src={icon2} alt="hustle" />
          <span className="font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon3} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-2/4">
          Buy
        </button>
      </div>
       );
       };

const Merch13 = ({src}) => {
    return (
      <div className="flex flex-col items-center justify-center p-5 md:gap-y-1">
        <p className="text-white">Powered By Crypto - Black Tee (M)</p>
        <div className="flex flex-col items-center">
          <img className="w-64" src={src} alt="hustle" />
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-3/4">
          Total Mints: 0/100
        </button>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon1} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-12" src={icon2} alt="hustle" />
          <span className="font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon3} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-2/4">
          Buy
        </button>
      </div>

    );
};

const Merch14 = ({src}) => {
    return (
      <div className="flex flex-col items-center justify-center p-5 md:gap-y-1">
        <p className="text-white">Powered By Crypto - Black Tee (L)</p>
        <div className="flex flex-col items-center">
          <img className="w-64" src={src} alt="hustle" />
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-3/4">
          Total Mints: 0/100
        </button>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon1} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-12" src={icon2} alt="hustle" />
          <span className="font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon3} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-2/4">
          Buy
        </button>
      </div>

    );
};

const Merch15 = ({src}) => {
    return (
      <div className="flex flex-col items-center justify-center p-5 md:gap-y-1">
        <p className="text-white">Powered By Crypto - Black Tee (XL)</p>
        <div className="flex flex-col items-center">
          <img className="w-64" src={src} alt="hustle" />
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-3/4">
          Total Mints: 0/100
        </button>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon1} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-12" src={icon2} alt="hustle" />
          <span className="font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon3} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-2/4">
          Buy
        </button>
      </div>

    );
};

const Merch16 = ({src}) => {
    return (
      <div className="flex flex-col items-center justify-center p-5 md:gap-y-1">
        <p className="text-white">Enforcer - White Tee (S)</p>
        <div className="flex flex-col items-center">
          <img className="w-64" src={src} alt="hustle" />
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-3/4">
          Total Mints: 0/100
        </button>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon1} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-12" src={icon2} alt="hustle" />
          <span className="font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon3} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-2/4">
          Buy
        </button>
      </div>
       );
       };

const Merch17 = ({src}) => {
    return (
      <div className="flex flex-col items-center justify-center p-5 md:gap-y-1">
        <p className="text-white">Enforcer - White Tee (M)</p>
        <div className="flex flex-col items-center">
          <img className="w-64" src={src} alt="hustle" />
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-3/4">
          Total Mints: 0/100
        </button>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon1} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-12" src={icon2} alt="hustle" />
          <span className="font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon3} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-2/4">
          Buy
        </button>
      </div>

    );
};

const Merch18 = ({src}) => {
    return (
      <div className="flex flex-col items-center justify-center p-5 md:gap-y-1">
        <p className="text-white">Enforcer - White Tee (L)</p>
        <div className="flex flex-col items-center">
          <img className="w-64" src={src} alt="hustle" />
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-3/4">
          Total Mints: 0/100
        </button>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon1} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-12" src={icon2} alt="hustle" />
          <span className="font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon3} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-2/4">
          Buy
        </button>
      </div>

    );
};

const Merch19 = ({src}) => {
    return (
      <div className="flex flex-col items-center justify-center p-5 md:gap-y-1">
        <p className="text-white">Enforcer - White Tee (XL)</p>
        <div className="flex flex-col items-center">
          <img className="w-64" src={src} alt="hustle" />
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-3/4">
          Total Mints: 0/100
        </button>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon1} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-12" src={icon2} alt="hustle" />
          <span className="font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon3} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-2/4">
          Buy
        </button>
      </div>

    );
};

const Merch20 = ({src}) => {
    return (
      <div className="flex flex-col items-center justify-center p-5 md:gap-y-1">
        <p className="text-white">Enforcer - Black Tee (S)</p>
        <div className="flex flex-col items-center">
          <img className="w-64" src={src} alt="hustle" />
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-3/4">
          Total Mints: 0/100
        </button>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon1} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-12" src={icon2} alt="hustle" />
          <span className="font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon3} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-2/4">
          Buy
        </button>
      </div>
       );
       };

const Merch21 = ({src}) => {
    return (
      <div className="flex flex-col items-center justify-center p-5 md:gap-y-1">
        <p className="text-white">Enforcer - Black Tee (M)</p>
        <div className="flex flex-col items-center">
          <img className="w-64" src={src} alt="hustle" />
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-3/4">
          Total Mints: 0/100
        </button>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon1} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-12" src={icon2} alt="hustle" />
          <span className="font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon3} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-2/4">
          Buy
        </button>
      </div>

    );
};

const Merch22 = ({src}) => {
    return (
      <div className="flex flex-col items-center justify-center p-5 md:gap-y-1">
        <p className="text-white">Enforcer - Black Tee (L)</p>
        <div className="flex flex-col items-center">
          <img className="w-64" src={src} alt="hustle" />
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-3/4">
          Total Mints: 0/100
        </button>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon1} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-12" src={icon2} alt="hustle" />
          <span className="font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon3} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-2/4">
          Buy
        </button>
      </div>

    );
};

const Merch23 = ({src}) => {
    return (
      <div className="flex flex-col items-center justify-center p-5 md:gap-y-1">
        <p className="text-white">Enforcer - Black Tee (XL)</p>
        <div className="flex flex-col items-center">
          <img className="w-64" src={src} alt="hustle" />
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-3/4">
          Total Mints: 0/100
        </button>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon1} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-12" src={icon2} alt="hustle" />
          <span className="font-bold text-white">0</span>
        </div>
        <div className="mt-5 flex flex-row items-center gap-x-3">
          <img className="w-8" src={icon3} alt="hustle" />
          <span className="relative left-2 font-bold text-white">0</span>
        </div>
        <button className="rounded-lg  border border-[#2F2F2E]  bg-transparent py-3 px-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] mt-5 w-2/4">
          Buy
        </button>
      </div>

    );
};

export default Merch;
export { Merch1 };
export { Merch2 };
export { Merch3 };
export { Merch4 };
export { Merch5 };
export { Merch6 };
export { Merch7 };
export { Merch8 };
export { Merch9 };
export { Merch10 };
export { Merch11 };
export { Merch12 };
export { Merch13 };
export { Merch14 };
export { Merch15 };
export { Merch16 };
export { Merch17 };
export { Merch18 };
export { Merch19 };
export { Merch20 };
export { Merch21 };
export { Merch22 };
export { Merch23 };

