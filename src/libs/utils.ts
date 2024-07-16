import Cookies from "js-cookie";
import { UserInterface } from "../types";
export const truncateStr = (str: string, maxLength: number) => {
  return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
};

export const createTokenCookies = (token: string) => {
  // const user = data;

  Cookies.set("token", token, { expires: 15 });
  return Cookies.get("token");
};
