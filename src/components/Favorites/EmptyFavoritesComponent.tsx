import React from "react";
import { Link } from "react-router-dom";

const EmptyFavoritesComponent = () => {
  return (
    <div className="cta mx-auto my-10 flex w-[80%] flex-col gap-5 text-center">
      <h2 className="text-2xl text-white">You don't have any favorite yet</h2>
      <h3 className="text-xl text-white">Give a look on these two sections:</h3>
      <div className="btn-groups mt-10">
        <Link
          className=" boder m-8 cursor-pointer border border-solid border-[#ed1d24] bg-[#ed1d24] p-3 text-white"
          to="/characters"
        >
          Characters
        </Link>
        <Link
          className=" boder m-8 cursor-pointer border border-solid border-[#ed1d24] bg-[#ed1d24] p-3 text-white"
          to="/comics"
        >
          Comics
        </Link>
      </div>
    </div>
  );
};

export default EmptyFavoritesComponent;
