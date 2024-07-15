import React, { useEffect, useState } from "react";
import { CharactersType } from "../types";
import { useDebouncedCallback } from "use-debounce";
import { baseAPIUrl } from "../api";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import CharacterComponent from "../components/Character/CharacterComponent";

const Characters = () => {
  const [data, setData] = useState<CharactersType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [nbPages, setNbPages] = useState<number>(0);
  const [skip, setSkip] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filterValue, setFilterValue] = useState<string>("");

  const handleSearch = useDebouncedCallback((value: string) => {
    setFilterValue(value);
  }, 500);

  const dataFiltered = data?.results.filter((item) => {
    if (filterValue) {
      return item.name.toLowerCase().includes(filterValue.toLocaleLowerCase());
    }
    return item;
  });

  useEffect(() => {
    const fetchData = async () => {
      // const emailQuery = user ? `&email=${user.email}` : "";
      // title variable will be useless

      const emailQuery = "";

      const response = await fetch(
        `${baseAPIUrl}/characters?name=${name}${emailQuery}&skip=${skip}`
      );
      const data = await response.json();

      console.log(data);
      setData(data);
      setNbPages(Math.ceil(data.count / 100));
      setIsLoading(false);
      console.log(data);
    };
    fetchData();
  }, []);
  return (
    <main className=" mt-16">
      <section className="bg-img mb-8  h-[50vh] bg-cover bg-scroll bg-no-repeat md:bg-fixed">
        <div className="overlay bg flex h-[50vh] w-full flex-col items-center justify-center bg-black bg-opacity-80 p-4">
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
                Results: {filterValue ? dataFiltered?.length : data?.count}
              </h2>
              <div className="mt-10 flex flex-wrap justify-center gap-5">
                {dataFiltered &&
                  dataFiltered.map((result) => {
                    return (
                      <CharacterComponent
                        key={result._id}
                        character={result}
                        // userCookies={userCookies}
                        // handleAddFavorite={handleAddFavorite}
                        // handleRemoveFavorite={handleRemoveFavorite}
                        // openModal={openModal}
                        // truncateStr={truncateStr}
                      />
                    );
                  })}
              </div>
            </section>
            <Pagination
              setDataCharacters={setData}
              setIsLoading={setIsLoading}
              page={page}
              setPage={setPage}
              nbPages={nbPages}
              setSkip={setSkip}
              apiUrl={`${baseAPIUrl}/characters`}
              // token={user.token}
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default Characters;