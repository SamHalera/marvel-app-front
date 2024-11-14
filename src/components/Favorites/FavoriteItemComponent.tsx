import React, { SetStateAction } from "react";
import { FavoriteInterface } from "../../types";
import { useCurrenUserStore } from "../../stores/currentUser";
import { Link } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/24/solid";
import { handleRemoveFavorite } from "../../libs/favoritesHandler";

const FavoriteItemComponent = ({
  dataFavorites,
  displayFav,
  setRemoveFromFavorites,
  removedFromFavorites,
}: {
  dataFavorites?: FavoriteInterface[];
  displayFav: string;
  setRemoveFromFavorites: React.Dispatch<SetStateAction<boolean>>;
  removedFromFavorites: boolean;
}) => {
  const { currentEmail } = useCurrenUserStore();
  return (
    <div className="container m-auto">
      <section className=" mt-10 flex flex-wrap justify-center gap-2">
        {dataFavorites?.map((favorite) => {
          if (favorite.user === currentEmail) {
            if (displayFav === favorite.label) {
              return (
                <div key={favorite._id} className="flex flex-col items-center">
                  <Link
                    to={`/${displayFav}/${favorite._id}`}
                    className="item m-5 flex flex-col gap-4 hover:opacity-50 items-center w-3/4"
                  >
                    <img
                      className=" h-72 w-64 object-cover object-center"
                      src={`${favorite.thumbnail.path}.${favorite.thumbnail.extension}`}
                      alt=""
                    />

                    <h3 className="text-xl text-white">
                      {favorite.title || favorite.name}
                    </h3>
                  </Link>
                  <div className="favorites">
                    <HeartIcon
                      onClick={() => {
                        handleRemoveFavorite(favorite._id, favorite.label);
                        setRemoveFromFavorites(!removedFromFavorites);
                      }}
                      className="size-6 cursor-pointer text-2xl text-[#ed1d24]"
                    />
                  </div>
                </div>
              );
            }
          }
          return null;
        })}
      </section>
    </div>
  );
};

export default FavoriteItemComponent;
