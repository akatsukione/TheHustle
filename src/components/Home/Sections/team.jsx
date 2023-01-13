import React, { Component } from "react";
import ImgGrizzly from "assets/images/home/grizzly.png";
import ImgDragon from "assets/images/home/dragon-image.png";
import ImgWolf from "assets/images/home/wolf.png";
import IconLinkedIn from "assets/images/home/linkedin-icon.png";

class Team extends Component {
  render() {
    return (
      <div id="team" className="py-16 md:py-24">
        <h2 className="text-center text-5xl font-bold text-primary font-Montserrat">Team</h2>
        <div className="flex flex-row items-center justify-center overflow-hidden pt-24">
          <a
            href={TeamMembers.developer.link}
            className="w-1/3 opacity-80 transition-all duration-300 ease-in-out hover:scale-95 hover:opacity-100"
          >
            <img className="mx-auto" src={ImgGrizzly} alt="Grizzly" />
            <div className="-mt-8 overflow-hidden text-center md:-mt-24">
              <p className="text-primary">{TeamMembers.developer.name}</p>
              <p className="text-white">{TeamMembers.developer.role}</p>
              <img
                className="mx-auto mt-2 w-5 cursor-pointer rounded-md"
                src={IconLinkedIn}
                alt="Developer's LinkedIn Profile"
              />
            </div>
          </a>
 <a
            href={TeamMembers.creator.link}
            className="relative bottom-20 w-1/3 opacity-80 transition-all duration-300 ease-in-out hover:scale-95 hover:opacity-100 md:bottom-40"
          >
            <img className="mx-auto" src={ImgDragon} alt="Dragon" />
            <div className="-mt-4 overflow-hidden text-center md:-mt-16">
              <p className="text-primary">{TeamMembers.creator.name}</p>
              <p className="text-white">{TeamMembers.creator.role}</p>
              <img
                className="mx-auto mt-2 w-5 cursor-pointer rounded-md"
                src={IconLinkedIn}
                alt="Game Creator's LinkedIn Profile"
              />
            </div>
          </a>
          <a
            
            href={TeamMembers.designer.link}
            className="w-1/3 opacity-80 transition-all duration-300 ease-in-out hover:scale-95 hover:opacity-100"
          >
            <img className="mx-auto" src={ImgWolf} alt="Wolf" />
            <div className="-mt-8 overflow-hidden text-center md:-mt-24">
              <p className="text-primary">{TeamMembers.designer.name}</p>
              <p className="text-white">{TeamMembers.designer.role}</p>
              <img
                className="mx-auto mt-2 w-5 rounded-md"
                src={IconLinkedIn}
                alt="Designer's LinkedIn Profile"
              />
            </div>
          </a>
        </div>
      </div>
    );
  }
}

let TeamMembers = {
  developer: {
    name: "AlexanderWoolf",
    role: "Developer",
  },
  creator: {
    name: "The Dragon",
    role: "Creator",
    link: "https://www.linkedin.com/in/arnaldo-afonso-b9a3932a/",
  },

  designer: {
    name: "Rusen Atis",
    role: "Designer",
    link: "https://www.linkedin.com/in/ru%C5%9Fen-at%C4%B1%C5%9F-372b5a197/",
  },
};

export default Team;
