import React from "react";
// import AuthUserMenu from "./User/AuthUserMenu";
// import WalletConnectModel from "./User/WalletConnectModel";
import logoutIcon from "assets/images/icons/logout.png";
import userIcon from "assets/images/icons/usericon.png";

const AuthMenu = ({ isAuthenticated, setIsAuthenticated, ual }) => {
  // const [isShowAuthModel, setIsShowAuthModel] = useState(false);

  const openLoginModal = () => {
    if (!ual.activeUser) {
      ual.showModal();
    }
  };

  return (
    <div className={`bg-transparent py-2 px-8 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] bg-transparent hover:bg-[#252525] focus:bg-[#252525]`}>
      {/* <AuthUserMenu /> */}
      {
        !ual.activeUser ? 
        <button
          className="w-8 cursor-pointer"
          type="button"
          onClick={openLoginModal}
        >
          <img src={userIcon} className="h-full w-full" alt="user" />
        </button>
      : <button
        className="w-6 cursor-pointer"
        onClick={ual.logout}
      >
        <img src={logoutIcon} className="h-full w-full" alt={ual.activeUser.accountName} />
      </button>
      }
      {/* <WalletConnectModel 
        setIsAuthenticated={setIsAuthenticated} 
        // isShowAuthModel={isShowAuthModel}
        // setIsShowAuthModel={setIsShowAuthModel}
      /> */}
    </div>
  );
};

export default AuthMenu;
