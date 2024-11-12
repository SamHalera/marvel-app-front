import { createTokenCookies } from "./utils";

export const handleVisitorAuthentication = async () => {
  try {
    const username = process.env.REACT_APP_VISITOR_USERNAME;
    const email = process.env.REACT_APP_VISITOR_EMAIL;
    const password = process.env.REACT_APP_VISITOR_PASS;

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/user/signup`,
      {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      }
    );
    const { token } = await response.json();

    const cookies = createTokenCookies(token);

    return { token, error: null };
  } catch (error) {
    return { error: "Oups! Something went wrong. Try again...", token: null };
  }
};

export const handleVisitorLogout = async (token: string) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/user/delete`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
  } catch (error) {
    return { error: "Oups! Something went wrong. Try again..." };
  }
};
