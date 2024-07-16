import React from "react";
import ItemCarousel from "../ItemCarousel";
import { CharacterDataType, CharacterItemArray } from "../../types";

const ComicsCarousel = ({ data }: { data: CharacterDataType }) => {
  return (
    <div className="hide-scroll-bar list-of-comics flex w-4/5 flex-nowrap overflow-x-scroll">
      {data.comics.map((comic) => {
        return <ItemCarousel item={comic} key={comic._id} />;
      })}
    </div>
  );
};

export default ComicsCarousel;
