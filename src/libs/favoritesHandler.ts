import { baseAPIUrl } from "../api";

export const handleAddFavorite = async (
  id: string,
  token: string,
  target: string
) => {
  try {
    const bodyForQuery = {
      itemId: id,
      label: target,
    };
    await fetch(
      `${baseAPIUrl}/favorites`,

      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyForQuery),
      }
    );
  } catch (error) {
    console.error(error, "<== message error");
  }
};

export const handleRemoveFavorite = async (id: string, target: string) => {
  try {
    await fetch(`${baseAPIUrl}/favorites/${id}`, {
      method: "DELETE",
      cache: "no-cache",
    });
  } catch (error) {
    console.error(error, "<== message error");
  }
};
