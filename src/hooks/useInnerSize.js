import { useLayoutEffect, useState } from "react";

export function useInnerSize() {
  const [size, setSize] = useState(0);
  useLayoutEffect(() => {
    function updateSize() {
      setSize({ height: window.innerHeight, width: window.innerWidth });
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
}

export default useInnerSize;
