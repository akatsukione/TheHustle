import React from 'react';
import CheckIcon from 'assets/images/icons/check.png';

const CheckBox = ({ checked, label, onChange, className = "" }) => {
    return <div className={`flex items-center text-white cursor-pointer ${className}`} onClick={onChange}>
        <span className={`inline-block w-5 h-5 p-1 rounded-md ${!checked ? `border border-[#2F2F2E] bg-[#131312] hover:bg-[#252525]` : `bg-lime-400`}`}>
            {checked && <img src={CheckIcon} className="invert" />}
        </span>
        {label && <span className="ml-2">{label}</span>}
    </div>
}

export default CheckBox;