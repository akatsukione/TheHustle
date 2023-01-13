import React, { Component } from "react";
import ImgTrapHouse from "assets/images/home/traphouse.png";
import ImgCorner from "assets/images/home/corner.png";
import ImgClandestineLab from "assets/images/home/clandestine-lab.png";

class Locations extends Component {
  state = {};
  render() {
    return (
      <div className="flex w-full flex-col items-start  justify-center gap-y-5 py-16 px-5 md:px-10 md:py-24 lg:flex-row">
        <div className="flex w-full flex-row mx-12 items-center justify-center gap-x-1 lg:w-2/3 lg:items-end">
          <img
            className="relative top-4 w-1/3 md:w-48 lg:top-8"
            src={ImgTrapHouse}
            alt="Trap House"
          />
          <img
            className="relative bottom-8 w-1/3 md:w-48 lg:bottom-16"
            src={ImgCorner}
            alt="Corner"
          />
          <img
            className="relative top-4 w-1/3 md:w-48 lg:top-8"
            src={ImgClandestineLab}
            alt="Clandestine Lab"
          />
        </div>
        <div className="px-8 flex w-full flex-col gap-y-5 md:p-5 lg:w-1/2">
          <h2 className="text-3xl font-bold text-primary md:text-5xl font-Montserrat">
            Locations
          </h2>
          <p className="text-md leading-8 text-white md:text-xl  xl:leading-10">
            Currently in The Hustle Universe there are 4 hustling locations:
            Consignment, The Corner, Trap House and Clandestine Lab.
          </p>
        </div>
      </div>
    );
  }
}

export default Locations;
