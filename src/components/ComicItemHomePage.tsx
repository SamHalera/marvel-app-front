import React from "react";
import { ComicItemArray } from "../types";
import clsx from "clsx";

const ComicItemHomePage = ({
  item,
  index,
}: {
  item: ComicItemArray;
  index: number;
}) => {
  return (
    <div
      className={clsx("lg:absolute lg:h-[450px] lg:w-[350px]", {
        "lg:left-[0px] lg:top-[0px]": index === 0,
        "lg:left-[200px] lg:top-[75px]": index === 1,
        "lg:left-[400px] lg:top-[150px]": index === 2,
      })}
    >
      <div className="">
        <img
          className="h-68 w-52 object-contain object-center lg:h-[450px] lg:w-[350px]"
          src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
          alt=""
        />
      </div>
    </div>
  );
};

export default ComicItemHomePage;
