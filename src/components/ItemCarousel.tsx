import { Link } from "react-router-dom";
import { CharacterItemArray, ComicItemArray } from "../types";

const ItemCarousel = ({
  item,
}: {
  item: ComicItemArray | CharacterItemArray;
}) => {
  const path =
    "title" in item ? `/comic/${item?._id}` : `/character/${item?._id}`;

  return (
    <div className=" w-60 shrink-0">
      <Link to={path} className="">
        <div className="overflow-hidden mb-2 peer">
          <img
            className=" hover:scale-110 duration-500 hover:opacity-50"
            src={
              item?.thumbnail
                ? `${item?.thumbnail.path}/standard_fantastic.${item?.thumbnail.extension}`
                : "/logo512.png"
            }
            alt=""
          />
        </div>
        <h3 className="text-center text-white p-2 peer-hover:text-primary duration-500 ">
          {"name" in item ? item.name : item.title}
        </h3>
      </Link>
    </div>
  );
};

export default ItemCarousel;
