import { create } from "zustand";

type TokenCookiesStore = {
  tokenCookies: string | null;
  setTokenCookies: (tokenCookies: string | null) => void;
};

export const useTokenCookiesStore = create<TokenCookiesStore>()((set) => ({
  tokenCookies: null,
  setTokenCookies: (tokenCookies: string | null) => {
    set({ tokenCookies });
  },
}));
