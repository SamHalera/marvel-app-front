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
      `${process.env.REACT_APP_API_URL}/favorites`,

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
    await fetch(`${process.env.REACT_APP_API_URL}/favorites/${id}`, {
      method: "DELETE",
      cache: "no-cache",
    });
  } catch (error) {
    console.error(error, "<== message error");
  }
};
