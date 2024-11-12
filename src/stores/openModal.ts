import { create } from "zustand";

type OpenModalStore = {
  openModal: boolean;
  openModalVisitorInformation: boolean;
  setOpenModal: (openModal: boolean) => void;
  setOpenModalVisitorInformation: (
    openModalVisitorInformation: boolean
  ) => void;
};

export const useOpenModalStore = create<OpenModalStore>()((set) => ({
  openModal: false,
  openModalVisitorInformation: false,
  setOpenModal: (openModal: boolean) => {
    set({ openModal });
  },
  setOpenModalVisitorInformation: (openModalVisitorInformation: boolean) => {
    set({ openModalVisitorInformation });
  },
}));
