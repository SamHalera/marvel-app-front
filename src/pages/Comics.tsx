import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { baseAPIUrl } from "../api";
import { ComicsType } from "../types";

import ComicComponent from "../components/Comic/ComicComponent";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import { useDebouncedCallback } from "use-debounce";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const Comics = () => {
  const [data, setData] = useState<ComicsType>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [nbPages, setNbPages] = useState<number>(0);
  const [skip, setSkip] = useState<number>(1);
  const [filterValue, setFilterValue] = useState<string>("");
  const [addedToFavorites, setAddedToFavorites] = useState(false);

  const tokenCookies = Cookies.get("token");
  // if (!tokenCookies) return Navigate({ to: "/" });

  const handleSearch = useDebouncedCallback((value: string) => {
    setFilterValue(value);
  }, 500);
  const dataFiltered = data
    ? data?.results.filter((item) => {
        if (filterValue) {
          return item.title
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
        title,
        token: tokenCookies,
        skip,
      };
      const response = await fetch(`${baseAPIUrl}/comics`, {
        method: "POST",
        body: JSON.stringify(bodyForQuery),
        headers: {
          Authorization: `Bearer ${tokenCookies}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      setData(data);
      setNbPages(Math.ceil(data.count / 100));
      setIsLoading(false);
    };

    tokenCookies && fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addedToFavorites]);
  return !tokenCookies ? (
    <Navigate to={"/"} />
  ) : (
    <main className="comics-main mt-24">
      <section className="bg-comics mb-8  h-[50vh] bg-cover bg-scroll bg-no-repeat md:bg-fixed">
        <div className="overlay bg flex h-[50vh] w-full flex-col items-center justify-center bg-black bg-opacity-80 p-4">
          <h1 className=" text-center text-4xl font-bold uppercase text-white md:text-5xl">
            Find your favorite <span className="red">Comic</span>
          </h1>
          <SearchBar label="comic" handleSearch={handleSearch} />
        </div>
      </section>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container m-auto p-5">
          <div className="list-container">
            <section className="list comics-list mt-10 flex flex-col flex-wrap items-center justify-center gap-5">
              <div>
                {/* <Results data={data} /> */}
                <h2 className="m-2 text-3xl font-bold text-white">
                  Results: {filterValue ? dataFiltered?.length : data?.count}
                </h2>
              </div>
              <div className="mt-10 flex flex-wrap justify-center gap-5">
                {dataFiltered &&
                  dataFiltered.map((result) => {
                    return (
                      <ComicComponent
                        key={result._id}
                        comic={result}
                        addedToFavorites={addedToFavorites}
                        setAddedToFavorites={setAddedToFavorites}
                      />
                    );
                  })}
              </div>
            </section>
          </div>
        </div>
      )}
      {data && (
        <Pagination
          setDataComics={setData}
          setIsLoading={setIsLoading}
          page={page}
          setPage={setPage}
          nbPages={nbPages}
          setSkip={setSkip}
          apiUrl={`${baseAPIUrl}/comics`}
        />
      )}
    </main>
  );
};

export default Comics;
