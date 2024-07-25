import LoginForm from "./LoginForm";
import { useOpenModalStore } from "../../stores/openModal";

const ModalLogin = () => {
  const { openModal, setOpenModal } = useOpenModalStore();
  console.log(openModal);

  return (
    <>
      <dialog
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        //-full h-screen absolute left-0 top-0 bottom-0 right-0
        className=" modal z-50 bg-slate-900/90 w p-20"
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
