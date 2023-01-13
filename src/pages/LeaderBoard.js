import React, { useLayoutEffect, useRef, useState } from "react";
import LeaderBoard from "components/LeaderBoard";
import useInnerSize from "hooks/useInnerSize";
// import SocialLinks from "components/Home/SocialLinks/SocialLinks";

const LeaderBoardPage = ({ual}) => {
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
      className={`pt-12 ${height > contentHeight ? "min-h-screen" : ""} `}
    >
      <div ref={ref}>
        <LeaderBoard ual={ual}/>
        {/* <SocialLinks /> */}
      </div>
    </div>
  );
};

export default LeaderBoardPage;
