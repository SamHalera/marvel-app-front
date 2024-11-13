import React from "react";

const HeroComponent = () => {
  return (
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
  );
};

export default HeroComponent;
