import React from "react";

const ProfileImageUpload = ({ setImage }) => {
  return (
    <div
      className="mx-2 mb-4 rounded-md p-4"
      style={{ boxShadow: "#a5a5a5eb 0px 0px 9px 0px" }}
    >
      <div className="mb-2">
        <label for="file" className="block  font-medium text-olive">
          Select Picture.
        </label>
        <input
          type="file"
          id="file"
          className="block w-full rounded-lg bg-gray-900 p-2.5   text-olive focus:ring-blue-500 dark:bg-gray-700  dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500 "
          onChange={(e) => {
            setImage(URL.createObjectURL(e.target.files[0]));
          }}
        />
      </div>
      <div className="text-right">
        <button className=" mr-2 mb-2 rounded-lg bg-money-green px-3 py-1 text-base font-medium text-white outline-none hover:bg-money-green focus:outline-none focus:ring-money-green dark:bg-money-green dark:hover:bg-primary dark:focus:ring-money-green">
          Upload
        </button>
      </div>
    </div>
  );
};

export default ProfileImageUpload;
