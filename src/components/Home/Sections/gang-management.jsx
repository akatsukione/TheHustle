import React, { Component } from "react";
import ImgGang from "assets/images/home/game-logic-graph.png";

class GangManagement extends Component {
  render() {
    return (
      <div className="flex w-full flex-col items-start justify-center py-16 px-5 md:flex-row md:px-10 md:py-12">
        <div className="order-1 w-full md:order-2 md:w-1/2 lg:mx-12">
          <img src={ImgGang} alt="Gang Managemnet" />
        </div>
        <div className="order-2 flex w-full flex-col gap-y-5 md:order-1 md:w-1/2">
          <h2 className="text-3xl mx-8 md:mx-5 font-bold text-primary md:text-5xl font-Montserrat">
            Gang Management
          </h2>
          <p className="text-md mx-8 md:mx-5 leading-7 text-white md:text-xl md:leading-6 lg:leading-7 xl:leading-10">
            Experience the most extensive and ever evolving role playing game in
            the wax blockchain. Manage your crew and rise from a street level
            hustler to becoming the next El Chapo. You decide your path!
          </p>
        </div>
      </div>
    );
  }
}

export default GangManagement;
