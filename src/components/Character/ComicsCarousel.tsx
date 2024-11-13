import ItemCarousel from "../ItemCarousel";
import { ComicItemArray } from "../../types";

const ComicsCarousel = ({
  data,
  label,
}: {
  data: ComicItemArray[];
  label: string;
}) => {
  return (
    <div className="flex flex-col w-4/5 gap-4">
      <h3 className="text-3xl text-primary font-bold">
        {label.toUpperCase()}:
      </h3>
      <div className=" no-scrollbar list-of-comics flex w-full flex-nowrap overflow-x-scroll">
        {data.map((comic) => {
          return <ItemCarousel item={comic} key={comic._id} />;
        })}
      </div>
    </div>
  );
};

export default ComicsCarousel;
