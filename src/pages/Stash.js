import React, { useLayoutEffect, useRef, useState } from "react";
import useInnerSize from "hooks/useInnerSize";
import Stash from "components/Stash";

const StashPage = ({ ual }) => {

  return (
    <div className="py-10 md:min-h-screen">
    <div className="container mx-auto ">
      <Stash ual={ual}/>
      {/* <Bottom /> */}
    </div>
  </div>
  );
};

export default StashPage;
