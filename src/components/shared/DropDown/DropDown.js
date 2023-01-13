import React from "react";
import { useDetectClickOutside } from "react-detect-click-outside";

/**
 *
 * @param {isShow: boolean , onClose: function , element: menuElements, children: children} param0
 * @returns
 */
const DropDown = (props) => {
  const {
    isShow,
    onClose,
    element,
    children,
    left = 0,
  } = props;
  const ref = useDetectClickOutside({ onTriggered: () => onClose(false) });
  return (
    <div ref={ref}>
      <div className="relative  ">
        {children}

        <div
          id="dropdown"
          className={`z-[9999] w-[176px] xl:w-[210px] block divide-y divide-gray-100 shadow dark:bg-gray-700 ${
            isShow ? "block" : "hidden"
          }`}
          style={{
            position: "absolute",
            inset: "0px auto auto 0px",
            margin: 0,
            transform: "translate(-47px, 47px)",
            left,
            top: 10,
          }}
        >
          {element}
        </div>
      </div>
    </div>
  );
};

export default DropDown;
