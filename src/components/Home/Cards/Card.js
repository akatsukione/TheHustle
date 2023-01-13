import React from "react";
import { Link } from "react-router-dom";
const Card = (props) => {
  const { title, price, image, id } = props;
  return (
    <div className=" mb-6 w-full sm:mb-0 sm:w-1/2 md:w-1/3  2xl:w-1/4">
      <div className="mx-4 sm:mx-2">
        <div className="max-w-sm cursor-pointer  rounded-lg border border-gray-200 bg-olive shadow-md dark:border-gray-700 dark:bg-gray-800">
          <div className="h-[200px] overflow-hidden rounded-t-lg">
            <img src={image} alt="" className="h-full w-full object-contain" />
          </div>
          <div className="p-5">
            <Link to="/">
              <h5 className="mb-2 text-lg font-bold tracking-tight text-black dark:text-white">
                {title}
              </h5>
            </Link>
            <div className="mt-5 flex items-center justify-between">
              <p>${price}</p>
              <Link
                to={`/item/${id}`}
                className="inline-flex items-center rounded-lg bg-teal-700 py-2 px-3 text-center  font-medium text-white hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
              >
                View Asset
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
