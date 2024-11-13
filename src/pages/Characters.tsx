import { useEffect, useState, Suspense, lazy } from "react";

import { CharactersType } from "../types";
import { useDebouncedCallback } from "use-debounce";

import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";

import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import Skeleton from "../components/Skeleton";

const CharacterComponent = lazy(
  () => import("../components/Character/CharacterComponent")
);
const Characters = () => {
  const [dataCharacter, setDataCharacter] = useState<CharactersType>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [nbPages, setNbPages] = useState<number>(0);
  const [skip, setSkip] = useState<number>(1);
  const [addedToFavorites, setAddedToFavorites] = useState(false);

  const [filterValue, setFilterValue] = useState<string>("");

  const tokenCookies = Cookies.get("token");

  const handleSearch = useDebouncedCallback((value: string) => {
    setFilterValue(value);
  }, 500);

  const dataFiltered = dataCharacter
    ? dataCharacter?.results.filter((item) => {
        if (filterValue) {
          return item.name
            .toLowerCase()
            .includes(filterValue.toLocaleLowerCase());
        }
        return item;
      })
    : [];

  useEffect(() => {
    const fetchData = async () => {
      // const emailQuery = user ? `&email=${user.email}` : "";
      // title variable will be useless

      const bodyForQuery = {
        name,
        token: tokenCookies,
        skip,
      };
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/characters`,
        {
          method: "POST",
          body: JSON.stringify(bodyForQuery),
          headers: {
            Authorization: `Bearer ${tokenCookies}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      setDataCharacter(data);
      setNbPages(Math.ceil(data.count / 100));
      setIsLoading(false);
    };

    tokenCookies && fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addedToFavorites]);
  return !tokenCookies ? (
    <Navigate to={"/"} />
  ) : (
    <main className=" mt-16">
      <section className="bg-characters mb-8  h-[50vh] bg-cover bg-scroll bg-no-repeat md:bg-fixed">
        <div className="overlay flex h-[50vh] w-full flex-col items-center justify-center bg-black bg-opacity-80 p-4">
          <h1 className="text-center text-4xl  font-bold uppercase text-white md:text-5xl">
            Find your favorite <span className="red">Heroe</span>
          </h1>
          <SearchBar handleSearch={handleSearch} label="heroe" />
        </div>
      </section>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container mx-auto my-7 px-4">
          <div className="list-container">
            <section className="mt-10 flex flex-col items-center justify-center gap-5">
              <h2 className="m-2 text-3xl font-bold text-white">
                Results:{" "}
                {filterValue ? dataFiltered?.length : dataCharacter?.count}
              </h2>
              <div className="mt-10 flex flex-wrap justify-center gap-5">
                {dataFiltered &&
                  dataFiltered.map((result) => {
                    return (
                      <Suspense key={result._id} fallback={<Skeleton />}>
                        <CharacterComponent
                          character={result}
                          addedToFavorites={addedToFavorites}
                          setAddedToFavorites={setAddedToFavorites}
                        />
                      </Suspense>
                    );
                  })}
              </div>
            </section>
            {dataCharacter && (
              <Pagination
                setDataCharacters={setDataCharacter}
                setIsLoading={setIsLoading}
                page={page}
                setPage={setPage}
                nbPages={nbPages}
                setSkip={setSkip}
                apiUrl={`${process.env.REACT_APP_API_URL}/characters`}
                token={tokenCookies}
              />
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default Characters;
