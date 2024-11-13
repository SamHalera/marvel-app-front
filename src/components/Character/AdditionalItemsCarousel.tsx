import ItemCarousel from "../ItemCarousel";
import { AdditionalItemFromCharacterOfficialType } from "../../types";

const AdditionalItemsCarousel = ({
  data,
  label,
}: {
  data: AdditionalItemFromCharacterOfficialType;
  label: string;
}) => {
  return (
    <div className="flex flex-col w-4/5 gap-4 mb-8">
      <h3 className="text-3xl text-primary font-bold">
        {label.toUpperCase()}:
      </h3>
      <div className="hide-scroll-bar list-of-comics flex w-full flex-nowrap overflow-x-scroll">
        {/* {data.items.map((item) => {
          return <ItemCarousel item={item} key={item.name} label={label} />;
        })} */}
      </div>
    </div>
  );
};

export default AdditionalItemsCarousel;
