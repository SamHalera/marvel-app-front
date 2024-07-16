import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CharactersType, ComicItemArray, ComicsType } from "../types";
import { baseAPIUrl } from "../api";
import clsx from "clsx";
import ItemCarouselHome from "../components/ItemCarouselHome";
import ModalLogin from "../components/Form/ModalLogin";
import { useOpenModalStore } from "../stores/openModal";

const Home = () => {
  const [characters, setChararcters] = useState<CharactersType | null>();
  const [comics, setComics] = useState<ComicsType | null>();
  const { openModal, setOpenModal } = useOpenModalStore();

  const navigate = useNavigate();

  const arrayComics: ComicItemArray[] = [];
  if (comics && comics?.results?.length > 0) {
    for (let i = 0; i < 3; i++) {
      const index = Math.floor(Math.random() * comics?.results.length);
      if (!comics.results[i].thumbnail.path.includes("image_not_available")) {
        arrayComics.push(comics.results[index]);
      }
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const limit = 20;
        const response = await fetch(`${baseAPIUrl}?limit=${limit}`);
        const data = await response.json();

        setChararcters(data[0]);
        setComics(data[1]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  console.log(openModal);
  return (
    <>
      <main className="relative flex flex-col items-center justify-center">
        <div className="hero h-screen w-full bg-cover bg-scroll bg-no-repeat p-[1px] md:bg-fixed ">
          <div className="relative z-0 flex h-screen w-full flex-col items-center justify-center bg-neutral-950 bg-opacity-80 ">
            <div className="m-5">
              <h1 className=" mb-8 flex flex-col gap-3  text-4xl font-bold uppercase text-white md:text-5xl">
                Welcome to the
                <span className="text-red-600"> Marvelous World of Marvel</span>
              </h1>
              <h2 className=" text-4xl text-white">
                Discover all the heroes and their Comics Sagas
              </h2>
            </div>
            <a
              href="#first-section"
              className="scroll absolute bottom-12 flex h-12 w-8  cursor-pointer items-center justify-center rounded-[33px] border border-solid border-red-500"
            >
              <div className=" h-2 w-1  rounded-full bg-red-500"></div>
            </a>
          </div>
        </div>
        <div
          id="first-section"
          className="relative h-auto w-full lg:h-screen flex flex-col py-8"
        >
          <div className="right-[400px] top-[60px] mb-8 flex flex-col items-center lg:absolute">
            <h2 className="mb-6 flex flex-col items-center gap-3 text-3xl font-bold uppercase text-white lg:text-5xl">
              Dive into the{" "}
              <span className="text-red-600">Marvel Universe</span>
            </h2>
            <button
              onClick={() => {
                navigate("/comics");
                setOpenModal(true);
              }}
              className="btn btn-marvel  self-end"
            >
              DISCOVER
            </button>
          </div>
          <div className="left-[300px] top-[200px] mx-auto lg:absolute">
            <div className="relative flex flex-col items-center justify-center md:flex-row">
              {arrayComics.length > 0 &&
                arrayComics.map((item: ComicItemArray, index: number) => {
                  return (
                    <div
                      key={item._id}
                      className={clsx("lg:absolute lg:h-[450px] lg:w-[350px]", {
                        "lg:left-[0px] lg:top-[0px]": index === 0,
                        "lg:left-[200px] lg:top-[75px]": index === 1,
                        "lg:left-[400px] lg:top-[150px]": index === 2,
                      })}
                    >
                      <div className="">
                        <img
                          className="h-68 w-52 object-contain object-center lg:h-[450px] lg:w-[350px]"
                          src={`${item.thumbnail.path}.${arrayComics[0].thumbnail.extension}`}
                          alt=""
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="section-heroe h-auto w-full bg-cover bg-scroll bg-no-repeat md:bg-fixed lg:h-screen">
          <div className="flex h-screen w-full flex-col items-center justify-center bg-neutral-950 bg-opacity-80 lg:items-start">
            <div className=" lg:w-4/4  w-4/5 lg:ml-44">
              <div className="mb-8">
                <h2 className="mb-12 flex flex-col gap-3 text-3xl font-bold uppercase text-white lg:text-4xl">
                  Find your <span className="text-red-600">Favorite Heroe</span>
                </h2>

                <button
                  onClick={() => {
                    navigate("/characters");
                    setOpenModal(true);
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
      </main>
    </>
  );
};

export default Home;
