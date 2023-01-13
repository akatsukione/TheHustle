import React, { Component } from "react";
import ImgHustlersClub from "assets/images/home/hustlers-club.png";

class HustlersClub extends Component {
  render() {
    return (
      <div className="flex w-full flex-col items-start justify-center gap-x-1 px-5 pb-16 md:flex-row md:px-10 md:pb-24">
        <div className="p-8 order-2 flex w-full flex-col gap-y-5 md:p-5 md:order-1 md:w-2/3">
          <h2 className="text-3xl font-bold text-primary md:text-5xl font-Montserrat">
            Hustlers Club
          </h2>
          <p className="text-md leading-8 text-white md:text-xl xl:leading-10">
            A club that every hustler needs a membership for. Weekly NFT rewards
            are given out to members who successfully complete the missions.
          </p>
        </div>
        <div className="order-1 w-full md:order-2 md:w-1/2">
          <img src={ImgHustlersClub} alt="Laundering Icons" />
        </div>
      </div>
    );
  }
}

export default HustlersClub;
