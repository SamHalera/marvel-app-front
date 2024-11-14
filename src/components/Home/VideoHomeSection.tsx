import React, {
  LegacyRef,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";

import video from "../../assets/video.mp4";
const VideoHomeSection = () => {
  const [playVideo, setPlayVideo] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const videoRefCurrent = videoRef.current;
  const options = {
    root: null,
    rootMargin: "0px",
    thershold: 1,
  };
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;

      if (entry.isIntersecting) videoRef?.current?.play();
      else {
        videoRef?.current?.pause();
      }
      setPlayVideo(entry.isIntersecting);
    }, options);
    if (videoRefCurrent) observer.observe(videoRefCurrent);
    return () => {
      if (videoRefCurrent) observer.unobserve(videoRefCurrent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoRef, options]);
  return (
    <div className="w-full relative">
      <div className=" w-full h-full  absolute bg-violet-950/50 flex flex-col items-center justify-center gap-5">
        <h3 className="text-6xl font-semibold text-white text-center">
          Step into the <span className="text-primary">Marvel Universe</span>
        </h3>
        <h4 className="text-3xl text-white text-center">
          Explore epic stories, legendary heroes, and unforgettable adventures!
        </h4>
      </div>{" "}
      <video
        ref={videoRef}
        controls={false}
        width="100%"
        loop
        // autoPlay={playVideo}
        muted
        className="bg-black"
      >
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoHomeSection;
