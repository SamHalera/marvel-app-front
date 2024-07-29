import { ChevronUpIcon } from "@heroicons/react/24/solid";
import React from "react";

const ScrollToTop = ({
  setScrollToTopHidden,
}: {
  setScrollToTopHidden: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      onClick={() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
        setScrollToTopHidden(true);
      }}
      className="fixed bottom-14 right-3 flex h-12 w-12 cursor-pointer items-center justify-center border border-solid border-red-500 bg-red-500 bg-opacity-70 transition-all duration-500 ease-in-out hover:bg-transparent hover:text-red-500"
    >
      <ChevronUpIcon className="size-6 text-white hover:text-red-500" />
    </div>
  );
};

export default ScrollToTop;
