import { useEffect, useState } from "react";
import { ComicItemArray } from "../types";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import FavoritesComponent from "../components/FavoritesComponent";
import Cookies from "js-cookie";

const Comic = () => {
  const [data, setData] = useState<ComicItemArray>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [addedToFavorites, setAddedToFavorites] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const tokenCookies = Cookies.get("token");

      try {
        const response = await fetch(
          // `${process.env.REACT_APP_API_URL}/comic/${id}?userId=${user._id}`,
          `${process.env.REACT_APP_API_URL}/comic/${id}`,
          {
            method: "GET",
            // body: JSON.stringify(body),
            headers: {
              Authorization: `Bearer ${tokenCookies}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        setData(data);

        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addedToFavorites]);

  return isLoading ? (
    <div className="mt-20">
      <Loader />
    </div>
  ) : (
    <main className="container mx-auto mb-20 mt-44 h-auto lg:h-screen">
      <Link to={"/comics"} className="btn btn-marvel m-4">
        <ArrowLeftIcon className="size-5" />
        Back to the list
      </Link>
      <div className="flex flex-col gap-3 items-center">
        <h1 className="mb-8 text-center text-3xl font-bold text-white lg:mb-10">
          {data?.title}
        </h1>
      </div>
      <div className="flex flex-col items-center gap-8 lg:flex-row">
        <img
          className="mb-2 w-64 lg:w-96"
          src={`${data?.thumbnail.path}.${data?.thumbnail.extension}`}
          alt=""
        />

        <div className="px-10 flex flex-col gap-4">
          {data && (
            <FavoritesComponent
              itemId={data._id}
              label="comic"
              isFavorite={data?.isFavorite ?? false}
              addedToFavorites={addedToFavorites}
              setAddedToFavorites={setAddedToFavorites}
            />
          )}
          <p className="mb-9  text-xl leading-8 text-white lg:w-2/4">
            {data?.description}
          </p>
        </div>
      </div>
    </main>
  );
};

export default Comic;
