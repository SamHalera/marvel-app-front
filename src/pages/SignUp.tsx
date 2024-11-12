import React, { useState } from "react";
import SignUpForm from "../components/Form/SignUpForm";
import { useTokenCookiesStore } from "../stores/tokenCookies";
import { Navigate, redirect } from "react-router-dom";
import { handleVisitorAuthentication } from "../libs/demoSession";
import { useOpenModalStore } from "../stores/openModal";
import { useToastStore } from "../stores/toast";

const SignUp = () => {
  const { tokenCookies } = useTokenCookiesStore();
  const [errorEmail, setErrorEmail] = useState<string>("");
  const { setTokenCookies } = useTokenCookiesStore();

  const { setOpenModal, setOpenModalVisitorInformation } = useOpenModalStore();
  const { setErrorMessage } = useToastStore();

  return tokenCookies ? (
    <Navigate to={"/"} />
  ) : (
    <main className="form-container mb-2 h-screen bg-cover bg-scroll bg-no-repeat py-10 md:bg-fixed">
      <div className="overlay flex h-screen w-full justify-center pt-16 lg:h-screen">
        <div className="container flex flex-col justify-center gap-8 p-6 ">
          <div className="presentation flex-2 w-3/3 flex flex-col justify-center items-center gap-8 md:m-auto md:w-2/3">
            <h1 className="text-2xl font-bold uppercase text-white lg:text-3xl">
              Enter the
              <span className="text-red-600"> Marvelous World of Marvel</span>
            </h1>
            <div
              onClick={async () => {
                const authentication = await handleVisitorAuthentication();
                if (authentication.token) {
                  setTokenCookies(authentication.token);
                  redirect("/");
                  setOpenModal(false);
                  setOpenModalVisitorInformation(true);
                } else {
                  setErrorMessage(authentication.error);
                }
              }}
              className="btn btn-marvel self-center"
            >
              Use a visitor session
            </div>
          </div>
          <SignUpForm />
        </div>
      </div>
    </main>
  );
};

export default SignUp;
