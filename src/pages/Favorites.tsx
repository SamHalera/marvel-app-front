import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link, Navigate } from "react-router-dom";
import Loader from "../components/Loader";
import { baseAPIUrl } from "../api";

import { FavoriteInterface } from "../types";
import clsx from "clsx";
import { useCurrenUserStore } from "../stores/currentUser";
import { HeartIcon } from "@heroicons/react/24/solid";
import { handleRemoveFavorite } from "../libs/favoritesHandler";

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
      try {
        const response = await fetch(`${baseAPIUrl}/favorites`, {
          headers: {
            Authorization: `Bearer ${tokenCookies}`,
          },
        });

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
            <div className="cta mx-auto my-10 flex w-[80%] flex-col gap-5 text-center">
              <h2 className="text-2xl text-white">
                You don't have any favorite yet
              </h2>
              <h3 className="text-xl text-white">
                Give a look on these two sections:
              </h3>
              <div className="btn-groups mt-10">
                <Link
                  className=" boder m-8 cursor-pointer border border-solid border-[#ed1d24] bg-[#ed1d24] p-3 text-white"
                  to="/"
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
          ) : (
            <div>
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

              <div className="container m-auto">
                <section className=" mt-10 flex flex-wrap justify-center gap-2">
                  {dataFavorites?.map((favorite) => {
                    if (favorite.user === currentEmail) {
                      if (displayFav === favorite.label) {
                        return (
                          <div
                            key={favorite._id}
                            className="flex flex-col items-center"
                          >
                            <Link
                              to={`/${displayFav}/${favorite._id}`}
                              className="item m-5 flex flex-col gap-4 hover:opacity-50 items-center w-3/4"
                            >
                              {/* <div className="image-wrapper"> */}
                              <img
                                className=" h-72 w-64 object-cover object-center"
                                src={`${favorite.thumbnail.path}.${favorite.thumbnail.extension}`}
                                alt=""
                              />
                              {/* </div> */}
                              <h3 className="text-xl text-white">
                                {favorite.title || favorite.name}
                              </h3>
                            </Link>
                            <div className="favorites">
                              <HeartIcon
                                onClick={() => {
                                  handleRemoveFavorite(
                                    favorite._id,
                                    favorite.label
                                  );
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
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default Favorites;
