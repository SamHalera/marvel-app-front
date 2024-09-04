import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CharacterDataType } from "../types";

import Loader from "../components/Loader";
import FavoritesComponent from "../components/FavoritesComponent";
import ComicsCarousel from "../components/Character/ComicsCarousel";

import Cookies from "js-cookie";

const Character = () => {
  const [data, setData] = useState<CharacterDataType>();
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
          // `${process.env.REACT_APP_API_URL}/comic/${id}?userId=${user._id}`,
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

        data && setData(data);

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
    <main className="one-character-main my-48">
      <div className="container mx-auto">
        <section className="character-wrapper">
          <div className="mb-9 flex flex-col items-center justify-center gap-5">
            <h2 className=" text-center text-3xl font-bold text-white">
              {data?.name}
            </h2>
          </div>
          <article className="character flex flex-col items-center">
            <div className="info-character mb-14 flex flex-col items-center justify-center gap-8  lg:flex-row lg:items-start">
              <img
                className=" w-72 lg:w-80"
                src={`${data?.thumbnail.path}.${data?.thumbnail.extension}`}
                alt=""
              />
              <div className="w-full px-10 text-xl leading-8 text-white lg:w-2/5">
                {data && (
                  <FavoritesComponent
                    itemId={data._id}
                    isFavorite={data?.isFavorite ?? false}
                    label="character"
                    addedToFavorites={addedToFavorites}
                    setAddedToFavorites={setAddedToFavorites}
                  />
                )}
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
