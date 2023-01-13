import React, { Component } from "react";
import ImgLaunderingIcons from "assets/images/home/laundering-icons.png";

class LaunderingIcons extends Component {
  state = {};
  render() {
    return (
      <div className="flex w-full flex-col items-start justify-center gap-x-1 py-16 px-5 md:flex-row md:px-10 md:py-24">
        <div className="px-8 order-2 flex w-full flex-col gap-y-5 md:p-5 md:order-1 md:w-1/2">
          <h2 className="text-3xl font-bold text-primary md:text-5xl font-Montserrat">
            Laundering
          </h2>
          <p className="text-md leading-8 text-white md:text-xl  xl:leading-10">
            In order to expand your empire you will need dirty cash as well as
            clean cash. With the feds watching is impossible to own a business
            built solely on dirty cash. Therefore laundering as much dirty cash as possible will help keep the feds away.
          </p>
        </div>
        <div className="order-1 w-full md:order-2 md:w-2/3">
          <img className="" src={ImgLaunderingIcons} alt="Laundering Icons" />
        </div>
      </div>
    );
  }
}

export default LaunderingIcons;
