import React from "react";
import { CharacterItemArray } from "../types";
import { Link } from "react-router-dom";

const ItemCarouselHome = ({ item }: { item: CharacterItemArray }) => {
  return (
    <>
      <div className="relative mr-3 w-60 shrink-0">
        <Link to={`/character/${item._id}`}>
          <div className="overflow-hidden h-72 peer">
            <img
              className="mb-2 h-72 object-cover object-center  hover:scale-110 duration-500 hover:opacity-50"
              src={`${item.thumbnail.path}/standard_fantastic.${item.thumbnail.extension}`}
              alt=""
            />
          </div>
          <h3 className="absolute bottom-8 h-14 w-full bg-[#ed1d24] peer-hover:bg-[#721215] duration-500 bg-opacity-80 p-2 text-center font-bold text-white">
            {item.name}
          </h3>
        </Link>
      </div>
    </>
  );
};

export default ItemCarouselHome;
