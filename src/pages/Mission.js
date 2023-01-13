import React, { useLayoutEffect, useRef, useState } from "react";
import Mission from "components/Mission";
import useInnerSize from "hooks/useInnerSize";
// import SocialLinks from "components/Home/SocialLinks/SocialLinks";

const MissionPage = () => {
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
        <Mission />
        {/* <SocialLinks /> */}
      </div>
    </div>
  );
};

export default MissionPage;
