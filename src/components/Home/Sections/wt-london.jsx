import React, { Component } from "react";
import ImgLondon from "assets/images/home/welcome-to-london.png";

class WtLondon extends Component {
  render() {
    return (
      <div className="flex w-full flex-col items-center justify-center py-16 px-5 md:flex-row md:px-10 md:py-12">
        <div className="w-full md:w-1/2 lg:mx-12">
          <img src={ImgLondon} alt="Welcome to London" />
        </div>
        <div className="flex w-full flex-col gap-y-5 md:w-1/2 md:p-5">
          <h2 className="text-3xl mx-8 md:mx-0 font-bold text-primary md:text-5xl font-Montserrat">
            Welcome To London
          </h2>
          <p className="text-md mx-8 md:mx-0 leading-7 text-white md:text-xl md:leading-6 lg:leading-7 xl:leading-10">
            Power isn't given, it's taken in this city. Everyone wants to be the
            Guv'nor and rule the city. Finding themselves dealing with some of
            the city's scariest and ruthless people of the criminal world as well
            as the UK Government. Just like everyone else in this city you want
            to make a name for yourself and be biggest Kingpin in London City.
            In order to embark on a journey that will change your life forever,
            you will need to build your own crew. The City is for the taking.
          </p>
        </div>
      </div>
    );
  }
}

export default WtLondon;
