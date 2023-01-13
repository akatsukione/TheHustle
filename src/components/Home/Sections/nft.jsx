import React, { Component } from "react";
import ImgCharacter from "assets/images/shop/character-placeholder2.png";
import ImgCharacter3 from "assets/images/shop/character-placeholder3.png";
import ImgCharacter2 from "assets/images/shop/transporter.png";
import ImgSkipJailTime from "assets/images/shop/get-out-of-jail.png";
import ImgPrisonBreak from "assets/images/shop/prison-break.jpeg";

class NFT extends Component {
  render() {
    return (
      <div className="px-8 flex w-full flex-col items-start justify-center gap-x-1 py-16 md:flex-row md:px-5 md:py-24 md:px-10">
        <div className="flex w-full flex-wrap items-center justify-center md:w-1/2 md:flex-row md:items-end md:gap-x-1">
          <img
            className="w-1/2 md:w-1/4"
            src={ImgCharacter2}
            alt="transporter"
          />
          <img
            className="w-1/2 md:w-1/4"
            src={ImgCharacter3}
            alt="Character Placeholder3"
          />
          <img
            className="w-1/2 md:w-1/4"
            src={ImgCharacter}
            alt="Character Placeholder2"
          />
          <img
            className="w-1/2 md:w-1/4"
            src={ImgPrisonBreak}
            alt="Skip Jail Time Boost Placeholder"
          />
          <img
            className="w-1/2 md:w-1/4"
            src={ImgSkipJailTime}
            alt="Skip Jail Time Boost Placeholder"
          />
        </div>
        <div className="flex w-full flex-col gap-y-5 p-5 md:w-1/2">
          <h2 className="text-3xl font-bold text-primary md:text-5xl font-Montserrat">NFT's</h2>
          <p className="text-md leading-8 text-white md:text-xl  xl:leading-10">
            Currently in The Hustle Universe there are 5 types of NFT’s:
            Characters, Boost Cards, Passes, Season Passes and Safes. Users will require at least
            one character NFT in order to play the game.
          </p>
        </div>
      </div>
    );
  }
}

export default NFT;
