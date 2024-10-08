import { useEffect, useState } from "react";
import FormProfile from "../components/Profile/FormProfile";
import { UserInterface } from "../types";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";

const Profile = () => {
  const [userData, setUserData] = useState<UserInterface>();

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const navigate = useNavigate();
  const tokenCookies = Cookies.get("token");
  !tokenCookies && navigate("/");
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/user/profile`,
          {
            headers: {
              Authorization: `Bearer ${tokenCookies}`,
            },
          }
        );

        const data = await response.json();

        setUserData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitted]);
  return !tokenCookies ? (
    <Navigate to={"/"} />
  ) : (
    <div className="mb-11 mt-40 flex h-auto flex-col">
      <h1 className=" my-18 text-center text-4xl font-bold text-white">
        MY PROFILE
      </h1>

      <div className="mx-auto mt-6 w-4/5">
        <div className="">
          {userData && (
            <FormProfile userData={userData} setIsSubmitted={setIsSubmitted} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
