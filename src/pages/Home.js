import React, { useLayoutEffect, useRef, useState } from "react";
import Footer from "components/Footer/footer";
import Hero from "components/Home/Hero/Hero";
import useInnerSize from "hooks/useInnerSize";
import WtLondon from "components/Home/Sections/wt-london";
import GangManagement from "components/Home/Sections/gang-management";
import NFT from "components/Home/Sections/nft";
import Resources from "components/Home/Sections/resources";
import Locations from "components/Home/Sections/locations";
import Laundering from "components/Home/Sections/laundering";
import TurfWar from "components/Home/Sections/turfwar";
import HustlersClub from "components/Home/Sections/hustlersclub";
import Team from "components/Home/Sections/team";
import SocialLinks from "components/Home/SocialLinks/SocialLinks";

const Home = () => {
  const { height } = useInnerSize();
  const ref = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  useLayoutEffect(() => {
    if (ref) {
      setContentHeight(ref?.current?.clientHeight);
    }
  }, []);

  return (
    <div
      className={`bg-black ${height > contentHeight ? "min-h-screen" : ""} `}
    >
      <div ref={ref}>
        <Hero />
        <WtLondon />
        <GangManagement />
        <NFT />
        <Resources />
        <Locations />
        <Laundering />
        <TurfWar />
        <HustlersClub />
        <Team />
        <Footer />
        <SocialLinks />
      </div>
    </div>
  );
};

export default Home;
