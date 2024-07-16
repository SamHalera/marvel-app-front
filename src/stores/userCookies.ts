import { create } from "zustand";

type UserCookiesStore = {
  userCookies: string | null;
  setUserCookies: (userCookies: string | null) => void;
};

export const useUserCookiesStore = create<UserCookiesStore>()((set) => ({
  userCookies: null,
  setUserCookies: (userCookies: string | null) => {
    set({ userCookies });
  },
}));
