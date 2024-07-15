import React from "react";
import ItemCarousel from "../ItemCarousel";
import { CharacterDataType, CharacterItemArray } from "../../types";

const ComicsCarousel = ({ data }: { data: CharacterDataType }) => {
  return (
    <div className="hide-scroll-bar list-of-comics flex w-4/5 flex-nowrap overflow-x-scroll">
      {data.comics.map((comic) => {
        return (
          <div key={comic._id}>
            <ItemCarousel item={comic} />
          </div>
        );
      })}
    </div>
  );
};

export default ComicsCarousel;
