import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import "./App.css";
import Header from "./components/Header/Header";
import Corner from "./components/Hustle/Corner";
import Home from "./pages/Home";
import Consignment from "./pages/Hustle/Consignment";
import SafeHouse from "./pages/SafeHouse";
import TermsPage from "./pages/Terms";
import PrivacyPage from "./pages/Privacy";
import LeaderBoard from "./pages/LeaderBoard";
import Mission from "./pages/Mission";
import Stash from "./pages/Stash";
import Laundering from "./components/Laundering/laundering";
import PackShop from "./components/Store/PackShop";
import BoostShop from "./components/Store/BoostShop";
import MerchShop from "./components/Store/merchshop";
import Transfers from "./components/Transfers/transfers";
import Traphouse from "./components/Hustle/Traphouse";
import Clandestine from "./components/Hustle/Clandestine";
import Raid from "./pages/Hustle/Raid";

import { ReactComponent as ScrollUpSVG } from "assets/images/icons/scrollup.svg";
import GRank from "pages/GRank";
import Profile from "pages/Profile";
import Safe from "pages/Safe";
import WalletContext from "context";

const App = ({ ual }) => {
  const [balance, setBalance] = useState({
    cleanCash: 0,
    slot: 0,
    final: 0,
    dirty: 0,
  });

  return (
    <div>
      <div className="App font-[Montserrat]">
        <WalletContext.Provider value={{ balance, setBalance }}>
          <BrowserRouter>
            <Header ual={ual} />
            <ScrollToTop smooth component={<ScrollUpSVG />} />
            <div className="md:pt-20 bg-[#131312]">
              <Routes>
                {/* Profile, G Rank, Safe , Leader board  */}
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile ual={ual} />} />
                <Route path="/g-rank" element={<GRank ual={ual} />} />
                <Route path="/safe" element={<Safe ual={ual} />} />
                <Route path="/consignment" element={<Consignment ual={ual} />} />
                <Route path="/the-corner" element={<Corner ual={ual} />} />
                <Route path="/the-traphouse" element={<Traphouse ual={ual} />} />
                <Route path="/clandestine-lab" element={<Clandestine ual={ual} />} />
                <Route path="/Raid" element={<Raid ual={ual} />} />
                <Route path="/laundering" element={<Laundering ual={ual} />} />
                <Route path="/pack-shop" element={<PackShop ual={ual} />} />
                <Route path="/booster-shop" element={<BoostShop ual={ual} />} />
                <Route path="/merch-shop" element={<MerchShop ual={ual} />} />
                <Route path="/transfers" element={<Transfers ual={ual} />} />
                <Route path="/stash" element={<Stash ual={ual} />} />
                <Route path="/terms" element={<TermsPage ual={ual} />} />
                <Route path="/privacy" element={<PrivacyPage ual={ual} />} />
                <Route path="/leaderboard" element={<LeaderBoard ual={ual} />} />
                <Route path="/mission" element={<Mission ual={ual} />} />
              </Routes>
            </div>
          </BrowserRouter>
        </WalletContext.Provider>
      </div>
    </div>
  );
};

export default App;
