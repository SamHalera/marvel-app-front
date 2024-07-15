import React, { ChangeEvent } from "react";

const SearchBar = ({
  setValue,
  setSkip,
  value,
  label,
  handleSearch,
}: {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setSkip: React.Dispatch<React.SetStateAction<number>>;
  value: string;
  label: string;
  handleSearch: (value: string) => void;
}) => {
  return (
    <div className="mx-auto flex w-full flex-col items-center gap-5 px-2 py-8">
      <div className="input-wrapper w-full lg:w-2/4">
        <input
          className=" w-full border border-solid border-red-500  bg-transparent  px-5 py-2 text-xl text-white"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            handleSearch(event.target.value);

            // setSkip(1);
          }}
          type="text"
          id="name"
          placeholder={`${
            label === "heroe"
              ? "Write your heroe's name"
              : "Write a comic's title"
          }`}
          //   value={value}
        />
      </div>
    </div>
  );
};

export default SearchBar;
