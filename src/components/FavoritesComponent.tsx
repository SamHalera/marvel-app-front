import { HeartIcon } from "@heroicons/react/24/solid";
import {
  handleAddFavorite,
  handleRemoveFavorite,
} from "../libs/favoritesHandler";
import { useTokenCookiesStore } from "../stores/tokenCookies";
import { useEffect, useState } from "react";
import LoaderSingleAction from "./LoaderSingleAction";

const FavoritesComponent = ({
  label,
  itemId,
  isFavorite,
  setAddedToFavorites,
  addedToFavorites,
}: {
  label: string;
  itemId: string;
  isFavorite: boolean;
  setAddedToFavorites: React.Dispatch<React.SetStateAction<boolean>>;
  addedToFavorites: boolean;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { tokenCookies } = useTokenCookiesStore();

  useEffect(() => {}, [addedToFavorites]);
  return (
    <div className="favorites z-10 h-10 flex group">
      {isLoading ? (
        <LoaderSingleAction />
      ) : isFavorite ? (
        <div className="flex gap-2 items-center">
          <HeartIcon
            onClick={() => {
              setIsLoading(true);

              handleRemoveFavorite(itemId, label);
              setAddedToFavorites(!addedToFavorites);
              setIsLoading(false);
            }}
            className="size-6 cursor-pointer text-2xl text-[#ed1d24] group-hover:size-7 duration-500"
          />
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <HeartIcon
            onClick={() => {
              setIsLoading(true);

              tokenCookies && handleAddFavorite(itemId, tokenCookies, label);
              setAddedToFavorites(!addedToFavorites);
              setIsLoading(false);
            }}
            className="size-6 cursor-pointer text-2xl hover:size-7 group-hover:text-[#ed1d24]  duration-500"
          />
        </div>
      )}
    </div>
  );
};

export default FavoritesComponent;
