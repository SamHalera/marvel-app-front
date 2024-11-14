import React from "react";
import { ComicItemArray } from "../../types";
import { Link } from "react-router-dom";
import { truncateStr } from "../../libs/utils";
import FavoritesComponent from "../FavoritesComponent";
import { motion } from "framer-motion";

const ComicComponent = ({
  comic,
  setAddedToFavorites,
  addedToFavorites,
  index,
}: {
  comic: ComicItemArray;
  setAddedToFavorites: React.Dispatch<React.SetStateAction<boolean>>;
  addedToFavorites: boolean;
  index: number;
}) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0, once: true }}
      transition={{
        duration: 0.6,
        type: "tween",
        ease: "easeInOut",
        delay: index / 10,
      }}
      className="item comics-item my-5 flex w-72 flex-col gap-2 md:w-48 lg:w-72"
    >
      <Link to={`/comic/${comic._id}`} className="peer">
        <img
          className="w-full object-cover object-center lg:h-72 lg:w-72 hover:opacity-50 duration-500"
          src={`${comic.thumbnail.path}/standard_fantastic.${comic.thumbnail.extension}`}
          alt=""
        />
      </Link>
      <h2 className="text-2xl text-white peer-hover:text-primary duration-500">
        {comic.title}
      </h2>
      <FavoritesComponent
        itemId={comic?._id}
        isFavorite={comic?.isFavorite ?? false}
        label="comic"
        addedToFavorites={addedToFavorites}
        setAddedToFavorites={setAddedToFavorites}
      />
      <p className="text-white">
        {comic.description && truncateStr(comic.description, 120)}
      </p>
    </motion.article>
  );
};

export default ComicComponent;
