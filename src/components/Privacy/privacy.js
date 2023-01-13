import React, { Component } from "react";

class Privacy extends Component {
  render() {
    return (
      <div className="mx-auto w-2/3 py-10">
        <div className=" text-white opacity-90">
          <p className="text-center text-[30px] font-bold text-white max-md:pt-20 pb-3 max-md:leading-8">
            Privacy Policy
          </p>
          <p className="py-2 text-center text-[15px] opacity-70">
            This privacy policy will explain how our organization Nambua Games
            LTD uses the personal data we collect from you when you use our
            website.
          </p>
          <br />
          <h2 className="pb-2 text-[18px] font-semibold">
            What data do we collect?
          </h2>
          <p>Nambua Games LTD collects the following data:</p>
          <br />
          <ul className="pl-6" style={{ listStyleType: "disc" }}>
            <li>Your WAX wallet address</li>
          </ul>
          <br />
          <br />

          <h2 className="pb-2 text-[18px] font-semibold">
            How do we collect your data?
          </h2>
          <p>
            You directly provide Nambua Games LTD with most of the data we
            collect. We collect data and process data when you:
          </p>
          <br />
          <ul className="pl-6" style={{ listStyleType: "disc" }}>
            <li>
              Use any actions inside one of our products on the WAX blockchain
            </li>
            <li>Transfer NFTs of our collection</li>
          </ul>
          <br />
          <br />

          <h2 className="pb-2 text-[18px] font-semibold">
            How will we use your data?
          </h2>
          <p>Nambua Games LTD collects your data so that we can:</p>
          <br />
          <ul className="pl-6" style={{ listStyleType: "disc" }}>
            <li>Save your progress inside The Hustle</li>
            <li>Provide game functionality to The Hustle NFTs</li>
          </ul>
          <br />
          <br />

          <h2 className="pb-2 text-[18px] font-semibold">
            How do we store your data?
          </h2>
          <p>
            As The Hustle and Hustlers Club are both products on the WAX
            blockchain, your data is stored on the blockchain.{" "}
          </p>
          <p>
            Some data might also be mirrored to a private database to provide
            game functionalities.
          </p>
          <p>Please keep in mind that the blockchain is publicly accessible.</p>
          <br />
          <br />

          <h2 className="pb-2 text-[18px] font-semibold">
            What are your data protection rights?
          </h2>
          <p>
            Nambua Games LTD would like to make sure you are fully aware of all
            of your data protection rights.{" "}
          </p>
          <p>Every user is entitled to the following:</p>
          <br />
          <ul className="pl-6" style={{ listStyleType: "disc" }}>
            <li>
              <b>The right to access</b> - You have the right to request Nambua
              Games LTD for copies of your personal data. We may charge you a
              small fee for this service.
            </li>
            <li>
              <b>The right to rectification</b> - You have the right to request
              that Nambua Games correct any information you believe is
              inaccurate. You also have the right to request Nambua Games LTD to
              complete the information you believe is incomplete.
            </li>
            <li>
              <b>The right to erasure</b> - You have the right to request that
              Nambua Games erase your personal data, under certain conditions.
            </li>
            <li>
              <b>The right to restrict processing</b> - You have the right to
              request that Nambua Games LTD restrict the processing of your
              personal data, under certain conditions.
            </li>
            <li>
              <b>The right to object to processing</b> - You have the right to
              object to Nambua Games LTD’s processing of your personal data,
              under certain conditions.
            </li>
            <li>
              <b>The right to data portability</b> - You have the right to
              request that Nambua Games LTD transfer the data that we have
              collected to another organization, or directly to you, under
              certain conditions.
            </li>
          </ul>
          <br />
          <p>
            If you make a request, we have one month to respond to you. <br />
            If you would like to exercise any of these rights, please contact us
            at our email: thehustle.io@outlook.com
          </p>
          <br />
          <br />

          <h2 className="pb-2 text-[18px] font-semibold">Cookies</h2>
          <p>
            Cookies are text files placed on your computer to collect standard
            Internet log information and visitor behaviour information. <br />
            When you visit our websites, we may collect information from you
            automatically through cookies or similar technology
          </p>
          <br />
          <br />

          <h2 className="pb-2 text-[18px] font-semibold">
            How do we use cookies?
          </h2>
          <p>
            Nambua Games LTD uses cookies in a range of ways to improve your
            experience on our website, including:
          </p>
          <br />
          <ul className="pl-6" style={{ listStyleType: "disc" }}>
            <li>Keeping you signed in</li>
          </ul>

          <br />
          <br />

          <h2 className="pb-2 text-[18px] font-semibold">
            What types of cookies do we use?
          </h2>
          <ul className="pl-6" style={{ listStyleType: "disc" }}>
            <li>
              <b>Functionality</b> – Nambua Games LTD uses these cookies so that
              we recognize you on our website and remember your previously
              selected preferences.
            </li>
          </ul>
          <br />
          <br />

          <h2 className="pb-2 text-[18px] font-semibold">
            Changes to our privacy policy
          </h2>
          <p>
            Nambua Games LTD keeps its privacy policy under regular review and
            places any updates on this web page.{" "}
          </p>
          <p>This privacy policy was last updated on 28 November 2022.</p>
          <br />
          <br />

          <h2 className="pb-2 text-[18px] font-semibold">How to contact us</h2>
          <p>
            If you have any questions about Nambua Games LTD’s privacy policy,
            the data we hold on you, or you would like to exercise one of your
            data protection rights, please do not hesitate to contact us.
          </p>
          <br />
          <br />
          <p>Email us at: thehustle.io@outlook.com</p>
        </div>
      </div>
    );
  }
}

export default Privacy;
