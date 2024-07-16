import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CharacterDataType,
  CharacterItemArray,
  CharactersType,
} from "../types";
import { baseAPIUrl } from "../api";
import Loader from "../components/Loader";
import FavoritesComponent from "../components/FavoritesComponent";
import ComicsCarousel from "../components/Character/ComicsCarousel";

const Character = () => {
  const [data, setData] = useState<CharacterDataType | null>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          // `${baseAPIUrl}/comic/${id}?userId=${user._id}`,
          `${baseAPIUrl}/comics/${id}`
        );

        const data = await response.json();
        setData(data);

        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return isLoading ? (
    <Loader />
  ) : (
    <main className="one-character-main my-48">
      <div className="container mx-auto">
        <section className="character-wrapper">
          <div className="mb-9 flex items-center justify-center gap-5">
            <h2 className=" text-center text-3xl font-bold text-white">
              {data?.name}
            </h2>
            <FavoritesComponent
              //   item={data}
              label="character"
              //   userCookies={userCookies}
              //   handleAddFavorite={handleAddFavorite}
              //   handleRemoveFavorite={handleRemoveFavorite}
            />
          </div>
          <article className="character flex flex-col items-center">
            <div className="info-character mb-14 flex flex-col items-center justify-center gap-8  lg:flex-row lg:items-start">
              <img
                className=" w-72 lg:w-80"
                src={`${data?.thumbnail.path}.${data?.thumbnail.extension}`}
                alt=""
              />
              <div className="w-full px-10 text-xl leading-8 text-white lg:w-2/5">
                <p className="">{data?.description}</p>
                <p className="font-bold">
                  You can find {data?.name} in these beside{" "}
                  {data?.comics.length} comics
                </p>
              </div>
            </div>
            {data && <ComicsCarousel data={data} />}
          </article>
        </section>
      </div>
    </main>
  );
};

export default Character;
