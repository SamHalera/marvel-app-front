import { CharacterItemArray } from "../types";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const ItemCarouselHome = ({ item }: { item: CharacterItemArray }) => {
  const tokenCookies = Cookies.get("token");
  return (
    <>
      <div className="relative mr-3 w-60 shrink-0">
        {tokenCookies ? (
          <Link to={`/character/${item._id}`}>
            <div className="overflow-hidden h-72 peer">
              <img
                className="mb-2 h-72 object-cover object-center  hover:scale-110 duration-500 hover:opacity-50"
                src={`${item.thumbnail.path}/standard_fantastic.${item.thumbnail.extension}`}
                alt=""
              />
            </div>
            <h3 className="absolute bottom-8 h-14 w-full bg-[#ed1d24] peer-hover:bg-[#721215] duration-500 bg-opacity-80 p-2 text-center font-bold text-white">
              {item.name}
            </h3>
          </Link>
        ) : (
          <div>
            <div className="overflow-hidden h-72">
              <img
                className="mb-2 h-72 object-cover object-center "
                src={`${item.thumbnail.path}/standard_fantastic.${item.thumbnail.extension}`}
                alt=""
              />
            </div>
            <h3 className="absolute bottom-8 h-14 w-full bg-[#ed1d24]  bg-opacity-80 p-2 text-center font-bold text-white">
              {item.name}
            </h3>
          </div>
        )}
      </div>
    </>
  );
};

export default ItemCarouselHome;
