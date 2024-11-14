import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CharactersType, ComicItemArray } from "../types";

import ItemCarouselHome from "../components/ItemCarouselHome";

import { useOpenModalStore } from "../stores/openModal";
import Cookies from "js-cookie";
import ComicItemHomePage from "../components/ComicItemHomePage";
import HeroComponent from "../components/Home/HeroComponent";
import ComicsHomeSection from "../components/Home/ComicsHomeSection";
import CharactersHomeSection from "../components/Home/CharactersHomeSection";
import VideoHomeSection from "../components/Home/VideoHomeSection";

const Home = () => {
  const [characters, setChararcters] = useState<CharactersType | null>();
  const [comics, setComics] = useState<ComicItemArray[] | null>();
  const { setOpenModal } = useOpenModalStore();

  const tokenCookies = Cookies.get("token");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const limit = 20;
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}?limit=${limit}`
        );

        const data = await response.json();
        if (!data.error) {
          const charactersData = data[0];
          const comicsData = data[1];
          setChararcters(charactersData);

          const arrayComicsData = comicsData.results.filter(
            (item: ComicItemArray, index: number) => {
              if (
                !item.thumbnail.path.includes("image_not_available") &&
                index < 3
              ) {
                return item;
              }
              return null;
            }
          );

          setComics(arrayComicsData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <main className="relative flex flex-col items-center justify-center">
        <HeroComponent />
        <ComicsHomeSection tokenCookies={tokenCookies} comics={comics} />
        <div className="w-full">
          <VideoHomeSection />
        </div>
        <CharactersHomeSection
          tokenCookies={tokenCookies}
          characters={characters}
        />
      </main>
    </>
  );
};

export default Home;
