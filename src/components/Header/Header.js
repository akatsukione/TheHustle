import React, {useState} from "react";
import AuthMenu from "./AuthMenu";
import GearMenus from "./GearMenus";
import HumbuggerMenu from "./Humberger/HumbuggerMenu";
import Logo from "./Logo";
import Menu from "./Menu";

const Header = ({ isTransparent = false, ual }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    ual.activeUser ? 
      <div
        className={`${
          isTransparent ? "bg-transparent" : "bg-black"
        } custom-shadow fixed top-0 z-50 w-full`}
      >
        <div className="mx-10">
          <div className="flex items-center justify-between max-sm:gap-3">
            <Logo />
            <div className="flex grow items-center justify-end">
              <Menu ual={ual}/>
              <AuthMenu
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                ual={ual}
              />
              <GearMenus/>
            </div>
            
            <HumbuggerMenu ual={ual}/>
          </div>
        </div>
      </div>
    :
      <div
        className={`${
          isTransparent ? "bg-transparent" : "bg-black"
        } custom-shadow fixed top-0 z-50 w-full`}
      >
        <div className="mx-10">
          <div className="flex items-center justify-between">
            <Logo />
            <div className="flex grow items-center justify-end">
              <Menu ual={ual}/>
              <AuthMenu
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                ual={ual}
              />
            </div>
          </div>
        </div>
      </div>
  );
};

export default Header;
