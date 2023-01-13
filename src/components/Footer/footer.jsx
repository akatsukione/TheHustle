import React, { Component } from "react";
import ImgEsrb from "assets/images/home/mature-17.png";

class Footer extends Component {
  render() {
    return (
      <footer className="mx-auto w-2/3 py-10">
        <div className="text-center">
          <img className="mx-auto w-64" alt="17+ Only" src={ImgEsrb} />
          <p className="text-2xl text-white">
            Copyright © 2022 Nambua Games LTD. All rights reserved.
          </p>
          <p className="py-5  text-white opacity-50">
            Nambua Games LTD company number 14518393 with its headquarter
            located in Birmingham, UK has been registered with Companies House
            an executive agency, sponsored by the Department for Business,
            Energy & Industrial Strategy.
          </p>
        </div>
        <div className="text-center">
          <a
            href="/terms"
            className="font-medium text-white hover:underline dark:text-white opacity-70"
          >
            T&Cs
          </a>
          <a
            href="/privacy"
            className="font-medium text-white hover:underline dark:text-white ml-10 opacity-70"
          >
            Privacy Policy
          </a>
        </div>
      </footer>
    );
  }
}

export default Footer;
