import ItemCarousel from "./ItemCarousel";
import { CharacterItemArray, ComicItemArray } from "../types";

const Carousel = ({
  data,
  label,
}: {
  data: ComicItemArray[] | CharacterItemArray[];
  label: string;
}) => {
  return (
    <div className="flex flex-col w-4/5 gap-4">
      <h3 className="text-3xl text-primary font-bold">
        {label.toUpperCase()}:
      </h3>
      <div className=" no-scrollbar list-of-comics flex w-full flex-nowrap overflow-x-scroll">
        {data.length > 0 &&
          data?.map((item) => {
            return <ItemCarousel item={item} key={item._id} />;
          })}
      </div>
    </div>
  );
};

export default Carousel;
