import { HeartIcon } from "@heroicons/react/24/solid";
import React from "react";

const FavoritesComponent = ({ label }: { label: string }) => {
  return (
    <div className="favorites z-10">
      <HeartIcon className="size-6 cursor-pointer text-2xl text-[#ed1d24]" />
      <div className="flex gap-2 items-center">
        <HeartIcon className="size-6 cursor-pointer text-2xl" />
        <span className="ml-2 text-xs text-white">add to favorites</span>
      </div>
    </div>
  );
};

export default FavoritesComponent;
