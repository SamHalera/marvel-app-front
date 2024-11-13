import React from "react";
import { useOpenModalStore } from "../../stores/openModal";
import { useNavigate } from "react-router-dom";
import { CharacterItemArray, CharactersType } from "../../types";
import ItemCarouselHome from "../ItemCarouselHome";

const CharactersHomeSection = ({
  tokenCookies,
  characters,
}: {
  tokenCookies?: string;
  characters?: CharactersType | null;
}) => {
  const { setOpenModal } = useOpenModalStore();
  const navigate = useNavigate();
  return (
    <div className="section-heroe h-auto w-full bg-cover bg-scroll bg-no-repeat md:bg-fixed lg:h-screen">
      <div className="flex h-screen w-full flex-col items-center justify-center bg-neutral-950 bg-opacity-80 lg:items-start">
        <div className=" lg:w-4/4  w-4/5 lg:ml-44">
          <div className="mb-8">
            <h2 className="mb-12 flex flex-col gap-3 text-3xl font-bold uppercase text-white lg:text-4xl">
              Find your <span className="text-red-600">Favorite Heroe</span>
            </h2>

            <button
              onClick={() => {
                if (tokenCookies) {
                  navigate("/characters");
                } else {
                  setOpenModal(true);
                }
              }}
              className="btn btn-marvel"
            >
              DISCOVER
            </button>
          </div>
          <div className="carousel hide-scroll-bar md:4/6 lg:w-6/6 w-5/5 flex h-80 overflow-scroll">
            {characters &&
              characters.results.length > 0 &&
              characters.results.map((oneCharacter) => {
                return (
                  <ItemCarouselHome
                    key={oneCharacter._id}
                    item={oneCharacter}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharactersHomeSection;
