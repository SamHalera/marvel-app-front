import React, { ChangeEvent } from "react";
import { CharactersType, ComicsType } from "../types";

const Pagination = ({
  setDataCharacters,
  setDataComics,
  setIsLoading,
  page,
  setPage,
  setSkip,
  nbPages,
  apiUrl,
  token,
}: {
  setDataCharacters?: React.Dispatch<
    React.SetStateAction<CharactersType | null>
  >;
  setDataComics?: React.Dispatch<React.SetStateAction<ComicsType | undefined>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setSkip: React.Dispatch<React.SetStateAction<number>>;
  nbPages: number;
  apiUrl: string;
  token: string;
}) => {
  const handlePagination = async (value: number, event: any) => {
    event.preventDefault();
    setIsLoading(true);
    if (value <= 1) {
      value = 1;
    } else if (value >= nbPages) {
      value = nbPages;
    }
    try {
      const bodyForQuery = {
        skip: value,
      };

      const response = await fetch(`${apiUrl}`, {
        method: "POST",
        body: JSON.stringify(bodyForQuery),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      setDataCharacters && setDataCharacters(data);
      setDataComics && setDataComics(data);
      setPage(value);
      setSkip(value);
      setIsLoading(false);
    } catch (error) {
      console.error(error, "message error");
    }
  };
  return (
    <div className="">
      <div className=" m-8 flex flex-wrap items-center justify-center gap-3">
        {page <= 1 ? (
          <span className="disabled font-bold">prev</span>
        ) : (
          <span
            className="prev cursor-pointer font-bold text-white"
            onClick={(event) => {
              handlePagination(page - 1, event);
            }}
          >
            prev
          </span>
        )}

        {/* //which value for input ?? */}
        <form
          onSubmit={(event) => {
            handlePagination(page, event);
          }}
        >
          <input
            className=" mr-3 w-16 border border-solid border-[#ed1d24] bg-transparent p-2 text-white"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              let value = parseFloat(event.target.value);
              console.log("value", value);
              if (value <= 0) {
                value = 1;
              } else if (value > nbPages) {
                value = nbPages;
              }
              setPage(value);
            }}
            type="number"
            name="page"
            id=""
            value={page <= 1 ? 1 : page >= nbPages ? nbPages : page}
          />
          <input
            className="boredr-solid cursor-pointer border border-[#ed1d24] bg-[#ed1d24] px-3 py-2 text-white"
            type="submit"
            value="GO"
          />
        </form>
        <span className="text-bold text-white">of</span>
        <span className="text-white">{nbPages}</span>

        {page >= nbPages ? (
          <span className="disabled font-bold">next</span>
        ) : (
          <span
            className="next cursor-pointer font-bold text-white"
            onClick={(event) => {
              handlePagination(page + 1, event);
            }}
          >
            next
          </span>
        )}
      </div>
    </div>
  );
};

export default Pagination;
