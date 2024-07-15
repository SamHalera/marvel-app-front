import React, { SetStateAction } from "react";
import LoginForm from "./LoginForm";

const ModalLogin = ({
  openModal,
  setOpenModal,
}: {
  openModal: boolean;
  setOpenModal: React.Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      <dialog
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        className=" modal z-50 bg-slate-900/90 w-full h-screen absolute left-0 top-0 bottom-0 right-0 p-20"
      >
        <div className="modal-box login-wrapper relative h-full">
          <LoginForm setOpenModal={setOpenModal} />
          <div
            className="btn rounded-none absolute right-6 bottom-6"
            onClick={() => {
              setOpenModal(false);
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

export default ModalLogin;
