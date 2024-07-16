import { HeartIcon } from "@heroicons/react/24/solid";
import {
  handleAddFavorite,
  handleRemoveFavorite,
} from "../libs/cookiesHandler";

const FavoritesComponent = ({
  label,
  itemId,
  isFavorite,
}: {
  label: string;
  itemId: string;
  isFavorite: boolean;
}) => {
  return (
    <div className="favorites z-10">
      {isFavorite ? (
        <HeartIcon
          onClick={() => {
            handleRemoveFavorite(itemId, "character");
          }}
          className="size-6 cursor-pointer text-2xl text-[#ed1d24]"
        />
      ) : (
        <div className="flex gap-2 items-center">
          <HeartIcon
            onClick={() => {
              // handleAddFavorite(itemId, "character")
            }}
            className="size-6 cursor-pointer text-2xl"
          />
          <span className="ml-2 text-xs text-white">add to favorites</span>
        </div>
      )}
    </div>
  );
};

export default FavoritesComponent;
