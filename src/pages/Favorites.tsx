import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link, Navigate } from "react-router-dom";
import Loader from "../components/Loader";

import { FavoriteInterface } from "../types";
import clsx from "clsx";
import { useCurrenUserStore } from "../stores/currentUser";
import { HeartIcon } from "@heroicons/react/24/solid";
import { handleRemoveFavorite } from "../libs/favoritesHandler";
import { useRouter } from "next/router";
import EmptyFavoritesComponent from "../components/Favorites/EmptyFavoritesComponent";
import FavoritesMenuTabs from "../components/Favorites/FavoritesMenuTabs";
import FavoriteItemComponent from "../components/Favorites/FavoriteItemComponent";

const Favorites = () => {
  const [dataFavorites, setDataFavorites] = useState<FavoriteInterface[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [displayFav, setDisplayFav] = useState<string>("character");
  const [removedFromFavorites, setRemoveFromFavorites] =
    useState<boolean>(false);
  const tokenCookies = Cookies.get("token");
  const { currentEmail } = useCurrenUserStore();

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetch");
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/favorites`,
          {
            headers: {
              Authorization: `Bearer ${tokenCookies}`,
            },
          }
        );
        const data = await response.json();
        setDataFavorites(data);
        setIsLoading(false);
      } catch (error: any) {
        console.log(error.response, "message error");
      }
    };
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removedFromFavorites]);
  return !tokenCookies ? (
    <Navigate to={"/"} />
  ) : (
    <main
      className={clsx("mt-16", {
        "h-screen": dataFavorites?.length === 0,
        "h-auto": dataFavorites && dataFavorites?.length > 0,
      })}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <h1 className=" my-32 text-center text-4xl font-bold text-white">
            My Favorites
          </h1>

          {dataFavorites?.length === 0 ? (
            <EmptyFavoritesComponent />
          ) : (
            <div>
              <FavoritesMenuTabs
                setDisplayFav={setDisplayFav}
                displayFav={displayFav}
              />

              <FavoriteItemComponent
                dataFavorites={dataFavorites}
                displayFav={displayFav}
                setRemoveFromFavorites={setRemoveFromFavorites}
                removedFromFavorites={removedFromFavorites}
              />
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default Favorites;
