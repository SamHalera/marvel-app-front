import clsx from "clsx";
import React, { SetStateAction } from "react";

const FavoritesMenuTabs = ({
  displayFav,
  setDisplayFav,
}: {
  displayFav: string;
  setDisplayFav: React.Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="toggle-favorites flex items-center justify-center gap-8 text-2xl">
      <span
        onClick={() => {
          setDisplayFav("character");
        }}
        className={clsx("cursor-pointer ", {
          "text-primary": displayFav === "character",
        })}
      >
        Characters
      </span>
      <span
        onClick={() => {
          setDisplayFav("comic");
        }}
        className={clsx("cursor-pointer ", {
          "text-primary": displayFav === "comic",
        })}
      >
        Comics
      </span>
    </div>
  );
};

export default FavoritesMenuTabs;
