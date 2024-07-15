import React, { useEffect, useState } from "react";
import { ComicItemArray } from "../types";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { baseAPIUrl } from "../api";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import FavoritesComponent from "../components/FavoritesComponent";

const Comic = () => {
  const [data, setData] = useState<ComicItemArray | null>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          // `${baseAPIUrl}/comic/${id}?userId=${user._id}`,
          `${baseAPIUrl}/comic/${id}`
        );

        const data = await response.json();
        setData(data);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <div className="mt-20">
      <Loader />
    </div>
  ) : (
    <main className="container mx-auto mb-20 mt-44 h-auto lg:h-screen">
      <Link to={"/comics"} className="btn btn-marvel">
        <ArrowLeftIcon className="size-5" />
        Back to the list
      </Link>
      <h1 className="mb-8 text-center text-3xl font-bold text-white lg:mb-10">
        {data?.title}
      </h1>
      <div className="flex flex-col items-center gap-8 lg:flex-row">
        <img
          className="mb-2 w-64 lg:w-96"
          src={`${data?.thumbnail.path}.${data?.thumbnail.extension}`}
          alt=""
        />
        <div className="px-10">
          <p className="mb-9  text-xl leading-8 text-white lg:w-2/4">
            {data?.description}
          </p>

          <FavoritesComponent
            // item={data}
            label="comic"
            // userCookies={userCookies}
            // handleAddFavorite={handleAddFavorite}
            // handleRemoveFavorite={handleRemoveFavorite}
          />
        </div>
      </div>
    </main>
  );
};

export default Comic;
