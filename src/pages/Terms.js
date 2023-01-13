import React, { useLayoutEffect, useRef, useState } from "react";
import Terms from "components/Terms/terms";
import Footer from "components/Footer/footer";
import useInnerSize from "hooks/useInnerSize";
import SocialLinks from "components/Home/SocialLinks/SocialLinks";

const TermsPage = () => {
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
      className={`${height > contentHeight ? "min-h-screen" : ""} `}
    >
      <div ref={ref}>
        <Terms />
        <Footer />
        <SocialLinks />
      </div>
    </div>
  );
};

export default TermsPage;
