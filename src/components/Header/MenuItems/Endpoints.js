import React from "react";

const MENUS = [
  {
    value: "1",
    label: "wax1.greymass.com",
  },
  {
    value: "2",
    label: "wax2.greymass.com",
  },
  {
    value: "3",
    label: "wax3.greymass.com",
  },
];

const Endpoints = ({ list, onSubmit }) => {
  return (
      <select
        id="countries"
        className="btn btn-default custom-shadow mt-3 w-full rounded-md border-none"
      >
        {MENUS.map(({ label, value }) => (
          <option className="bg-black" value={value} key={value}>
            {label}
          </option>
        ))}
      </select>
  );
};

export default Endpoints;
