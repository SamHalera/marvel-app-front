const Loader = () => {
  return (
    <div className="loader mx-12 flex items-center justify-center p-10 text-3xl text-white">
      {/* <img src={spinner} alt="" className=" h-24 w-24" /> */}
      <span className="loading loading-spinner  bg-primary h-20 w-20"></span>
    </div>
  );
};
export default Loader;
