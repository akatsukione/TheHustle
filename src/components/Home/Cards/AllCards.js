import React from "react";
import Card from "./Card";

const AllCards = () => {
  return (
    <>
      <div className="bg-black py-20">
        <div className="container mx-auto">
          <h2 className="mb-3 ml-2 text-2xl font-bold">Game Assets</h2>
          <div className="flex-wrap gap-y-10 sm:flex">
            {ALL_CARDS.map((item) => (
              <Card key={Math.random()} {...item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllCards;

const ALL_CARDS = [
  {
    id: 1,
    title: "Token 1",
    price: 26,

    image:
      "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    title: "Token 2",
    price: 33,

    image:
      "https://images.pexels.com/photos/730564/pexels-photo-730564.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    title: "Token 3",
    price: 37,

    image:
      "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 4,
    title: "Token 4",
    price: 37,

    image:
      "https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];
