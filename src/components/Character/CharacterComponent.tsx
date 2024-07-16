import React from "react";
import { Link } from "react-router-dom";
import { CharacterItemArray } from "../../types";
import FavoritesComponent from "../FavoritesComponent";
import { truncateStr } from "../../libs/utils";

const CharacterComponent = ({
  character,
}: {
  character: CharacterItemArray;
}) => {
  return (
    <article className="item character-item my-5 flex w-72 flex-col gap-4 md:w-48 lg:w-72">
      <Link className="" to={`/character/${character._id}`}>
        <img
          className="w-full object-cover object-center lg:h-72 lg:w-72"
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt=""
        />
      </Link>

      <h2 className="text-2xl text-white">{character.name}</h2>
      <FavoritesComponent
        itemId={character?._id}
        isFavorite={character?.isFavorite ?? false}
        label="character"
      />

      <p className=" text-white">
        {character.description && truncateStr(character.description, 100)}
      </p>
    </article>
  );
};

export default CharacterComponent;
