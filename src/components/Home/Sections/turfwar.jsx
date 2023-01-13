import React, { Component } from "react";
import ImgTurfWar from "assets/images/home/turf-war2.png";

class TurfWar extends Component {
  state = {};
  render() {
    return (
      <div className="flex w-full flex-col items-start justify-center gap-x-1 px-5 py-16 md:flex-row md:px-10 md:py-24">
        <div className="w-full md:w-2/3">
          <img className="" src={ImgTurfWar} alt="Laundering Icons" />
        </div>
        <div className="px-8 flex w-full flex-col gap-y-5 md:p-5 md:w-1/2">
          <h2 className="text-3xl font-bold text-primary md:text-5xl font-Montserrat">
            Turf War
          </h2>
          <p className="text-md leading-8 text-white md:text-xl  xl:leading-10">
            PVP,PVE at it's best, select your most loyal and strongest soldiers and
            send them to a turf war against other crews and the Metropolitan Police for the control of South
            London.
          </p>
        </div>
      </div>
    );
  }
}

export default TurfWar;
