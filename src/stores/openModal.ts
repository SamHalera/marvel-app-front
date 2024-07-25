import { create } from "zustand";

type OpenModalStore = {
  openModal: boolean;

  setOpenModal: (openModal: boolean) => void;
};

export const useOpenModalStore = create<OpenModalStore>()((set) => ({
  openModal: false,

  setOpenModal: (openModal: boolean) => {
    set({ openModal });
  },
}));
