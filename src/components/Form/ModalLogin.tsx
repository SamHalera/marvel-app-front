import LoginForm from "./LoginForm";
import { useOpenModalStore } from "../../stores/openModal";

const ModalLogin = () => {
  const { openModal, setOpenModal } = useOpenModalStore();

  return (
    <>
      <dialog
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        className=" modal z-50 bg-slate-900/90 w-full p-4 md:p-20"
      >
        <div className="modal-box login-wrapper relative h-full">
          <LoginForm />

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
