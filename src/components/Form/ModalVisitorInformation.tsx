import React from "react";
import { useOpenModalStore } from "../../stores/openModal";

const ModalVisitorOptionInformation = () => {
  const { openModalVisitorInformation, setOpenModalVisitorInformation } =
    useOpenModalStore();
  return (
    <>
      <dialog
        open={openModalVisitorInformation}
        onClose={() => {
          setOpenModalVisitorInformation(false);
        }}
        className=" modal z-50 bg-slate-900/90 w-full p-4 md:p-20"
      >
        <div className="modal-box login-wrapper relative h-full">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Welcome Visitor! </h2>

            <span className="text-xl ">
              Please, be noticed that, as a visitor, all your data will be
              deleted as soon as you logout.
            </span>
            <span className="text-xl text-primary font-semibold">
              We wish you a marvelous experience!
            </span>
          </div>

          <div
            className="btn rounded-none absolute right-6 bottom-6"
            onClick={() => {
              setOpenModalVisitorInformation(false);
            }}
          >
            Close
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default ModalVisitorOptionInformation;
