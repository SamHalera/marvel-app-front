import { create } from "zustand";

type ToastStore = {
  successMessage: string | null;
  errorMessage: string | null;
  infoMessage: string | null;
  setSuccessMessage: (successMessage: string | null) => void;
  setErrorMessage: (errorMessage: string | null) => void;
  setInfoMessage: (infoMessage: string | null) => void;
};

export const useToastStore = create<ToastStore>()((set) => ({
  successMessage: null,
  errorMessage: null,
  infoMessage: null,
  setSuccessMessage: (successMessage: string | null) => {
    set({ successMessage });
  },
  setErrorMessage: (errorMessage: string | null) => {
    set({ errorMessage });
  },
  setInfoMessage: (infoMessage: string | null) => {
    set({ infoMessage });
  },
}));
