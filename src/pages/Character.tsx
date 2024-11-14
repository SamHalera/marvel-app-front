import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CharacterDataType } from "../types";

import Loader from "../components/Loader";
import FavoritesComponent from "../components/FavoritesComponent";

import Cookies from "js-cookie";
import Carousel from "../components/Carousel";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const Character = () => {
  const [dataCharacter, setDataCharacter] = useState<CharacterDataType>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [addedToFavorites, setAddedToFavorites] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenCookies = Cookies.get("token");
        const body = {
          id,
        };
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/comics/${id}`,

          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              Authorization: `Bearer ${tokenCookies}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        data && setDataCharacter(data);

        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addedToFavorites]);

  return isLoading ? (
    <Loader />
  ) : (
    <main className="container mx-auto mb-20 mt-44 h-auto lg:h-auto">
      <Link to={"/characters"} className="btn btn-marvel m-4">
        <ArrowLeftIcon className="size-5" />
        Back to the Characters list
      </Link>
      <div className="container mx-auto">
        <section className="character-wrapper">
          <div className="mb-9 flex flex-col items-center justify-center gap-5">
            <h1 className=" text-center text-6xl font-bold text-white">
              {dataCharacter?.name}
            </h1>
          </div>
          <article className="character flex flex-col items-center">
            <div className="info-character mb-14 flex flex-col items-center justify-center gap-8  lg:flex-row lg:items-start">
              <img
                className=" w-72 lg:w-96"
                src={`${dataCharacter?.thumbnail.path}.${dataCharacter?.thumbnail.extension}`}
                alt=""
              />
              <div className="w-full px-10 text-xl leading-8 text-white lg:w-2/5">
                {dataCharacter && (
                  <FavoritesComponent
                    itemId={dataCharacter._id}
                    isFavorite={dataCharacter?.isFavorite ?? false}
                    label="character"
                    addedToFavorites={addedToFavorites}
                    setAddedToFavorites={setAddedToFavorites}
                  />
                )}
                <p className="italic">
                  {dataCharacter?.description
                    ? dataCharacter.description
                    : "Description not available"}
                </p>
              </div>
            </div>
            {dataCharacter?.comics && (
              <Carousel data={dataCharacter.comics} label="comics" />
            )}
          </article>
        </section>
      </div>
    </main>
  );
};

export default Character;
