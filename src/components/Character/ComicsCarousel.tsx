import ItemCarousel from "../ItemCarousel";
import { CharacterDataType } from "../../types";

const ComicsCarousel = ({ data }: { data: CharacterDataType }) => {
  return (
    <div className="flex flex-col w-4/5 gap-4">
      <h3 className="text-3xl text-primary font-bold">COMICS:</h3>
      <div className="hide-scroll-bar list-of-comics flex w-full flex-nowrap overflow-x-scroll">
        {data.comics.map((comic) => {
          return <ItemCarousel item={comic} key={comic._id} />;
        })}
      </div>
    </div>
  );
};

export default ComicsCarousel;
