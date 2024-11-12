import Cookies from "js-cookie";
import { useEffect } from "react";

const Test = () => {
  const tokenCookies = Cookies.get("token");
  console.log(tokenCookies);
  useEffect(() => {
    console.log("inside test");
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/official/characters`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${tokenCookies}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log("data==>", data);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>TEST</div>;
};

export default Test;
