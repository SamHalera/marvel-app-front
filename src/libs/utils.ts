import Cookies from "js-cookie";
import { UserInterface } from "../types";
export const truncateStr = (str: string, maxLength: number) => {
  return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
};

export const createUserCookies = (data: UserInterface) => {
  const user = data;

  Cookies.set("user", JSON.stringify(user), { expires: 15 });
  return Cookies.get("user");
};
