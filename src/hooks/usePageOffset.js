import { useLayoutEffect, useState } from "react";

export const usePageOffset = () => {
  const [offset, setOffset] = useState(0);

  useLayoutEffect(() => {
    const onScroll = () =>
      setOffset({ y: window.pageYOffset, x: window.scrollX });
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return offset;
};

export default usePageOffset;
