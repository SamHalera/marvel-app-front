import React from "react";
import { Link } from "react-router-dom";
import { CharacterItemArray } from "../../types";
import FavoritesComponent from "../FavoritesComponent";
import { truncateStr } from "../../libs/utils";

const CharacterComponent = ({
  character,
  setAddedToFavorites,
  addedToFavorites,
}: {
  character: CharacterItemArray;
  setAddedToFavorites: React.Dispatch<React.SetStateAction<boolean>>;
  addedToFavorites: boolean;
}) => {
  return (
    <article className="item character-item my-5 flex w-72 flex-col gap-2 md:w-48 lg:w-72">
      <Link className="peer" to={`/character/${character._id}`}>
        <img
          className="w-full object-cover object-center lg:h-72 lg:w-72 hover:opacity-50 duration-500"
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt=""
        />
      </Link>

      <h2 className="text-2xl text-white peer-hover:text-primary duration-500">
        {character.name}
      </h2>
      <FavoritesComponent
        itemId={character?._id}
        isFavorite={character?.isFavorite ?? false}
        label="character"
        addedToFavorites={addedToFavorites}
        setAddedToFavorites={setAddedToFavorites}
      />

      <p className=" text-white peer-hover:text-primary duration-500">
        {character.description && truncateStr(character.description, 100)}
      </p>
    </article>
  );
};

export default CharacterComponent;
