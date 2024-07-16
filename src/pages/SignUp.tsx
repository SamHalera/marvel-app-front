import React from "react";
import SignUpForm from "../components/Form/SignUpForm";
import { useTokenCookiesStore } from "../stores/tokenCookies";
import { Navigate } from "react-router-dom";

const SignUp = () => {
  const { tokenCookies } = useTokenCookiesStore();

  return tokenCookies ? (
    <Navigate to={"/"} />
  ) : (
    <main className="form-container mb-2 h-screen bg-cover bg-scroll bg-no-repeat py-10 md:bg-fixed">
      <div className="overlay flex h-screen w-full justify-center pt-16 lg:h-screen">
        <div className="container flex flex-col-reverse justify-center gap-8 p-6 ">
          <SignUpForm />
          <div className="presentation flex-2 w-3/3 flex flex-col justify-center items-center gap-8 md:m-auto md:w-2/3">
            <h1 className="text-2xl font-bold uppercase text-white lg:text-3xl">
              Enter the
              <span className="text-red-600"> Marvelous World of Marvel</span>
            </h1>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
