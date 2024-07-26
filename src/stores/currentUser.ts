import { create } from "zustand";
import { CloudinaryFile } from "../types";

type CurrentUserStore = {
  currentEmail: string | null;
  currentUsername: string | null;
  currentAvatar: CloudinaryFile | null;
  setCurrentEmail: (currenctEmail: string | null) => void;
  setCurrentUsername: (currentUsername: string | null) => void;
  setCurrentAvatar: (currentAvatar: CloudinaryFile | null) => void;
};

export const useCurrenUserStore = create<CurrentUserStore>()((set) => ({
  currentEmail: null,
  currentUsername: null,
  currentAvatar: null,
  setCurrentEmail: (currentEmail: string | null) => {
    set({ currentEmail });
  },
  setCurrentUsername: (currentUsername: string | null) => {
    set({ currentUsername });
  },
  setCurrentAvatar: (currentAvatar: CloudinaryFile | null) => {
    set({ currentAvatar });
  },
}));
