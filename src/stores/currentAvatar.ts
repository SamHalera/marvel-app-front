import { create } from "zustand";
import { CloudinaryFile } from "../types";

type CurrentAvatarStore = {
  currentAvatar: CloudinaryFile | null;
  setCurrentAvatar: (currentAvatar: CloudinaryFile | null) => void;
};

export const useCurrentAvatarStore = create<CurrentAvatarStore>()((set) => ({
  currentAvatar: null,
  setCurrentAvatar: (currentAvatar: CloudinaryFile | null) => {
    set({ currentAvatar });
  },
}));
