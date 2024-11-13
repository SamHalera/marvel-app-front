import React from "react";
import { useNavigate } from "react-router-dom";
import { useOpenModalStore } from "../../stores/openModal";
import { ComicItemArray } from "../../types";
import ComicItemHomePage from "../ComicItemHomePage";

const ComicsHomeSection = ({
  tokenCookies,
  comics,
}: {
  tokenCookies?: string;
  comics?: ComicItemArray[] | null;
}) => {
  const { setOpenModal } = useOpenModalStore();
  const navigate = useNavigate();
  return (
    <div
      id="first-section"
      className="relative h-auto w-full lg:h-screen flex flex-col py-8"
    >
      <div className="right-[400px] top-[60px] mb-8 flex flex-col items-center lg:absolute">
        <h2 className="mb-6 flex flex-col items-center gap-3 text-3xl font-bold uppercase text-white lg:text-5xl">
          Dive into the <span className="text-red-600">Marvel Universe</span>
        </h2>
        <button
          onClick={() => {
            if (tokenCookies) {
              navigate("/comics");
            } else {
              setOpenModal(true);
            }
          }}
          className="btn btn-marvel lg:self-end"
        >
          DISCOVER
        </button>
      </div>
      <div className="left-[300px] top-[200px] mx-auto lg:absolute">
        <div className="relative flex flex-col items-center justify-center md:flex-row gap-4">
          {comics &&
            comics?.length > 0 &&
            comics?.map((item: ComicItemArray, index: number) => {
              return (
                <ComicItemHomePage key={item._id} item={item} index={index} />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ComicsHomeSection;
