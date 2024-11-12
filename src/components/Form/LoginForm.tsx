import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, redirect, useNavigate } from "react-router-dom";
import Input from "./Input";
import { useTokenCookiesStore } from "../../stores/tokenCookies";
import { createTokenCookies } from "../../libs/utils";
import { useOpenModalStore } from "../../stores/openModal";
import { useToastStore } from "../../stores/toast";
import { handleVisitorAuthentication } from "../../libs/demoSession";
import { useCurrenUserStore } from "../../stores/currentUser";

export type LoginFormValues = {
  email: string;
  password: string;
};
const LoginForm = () => {
  const [errorEmail, setErrorEmail] = useState<string>("");
  const { setTokenCookies } = useTokenCookiesStore();

  const { setOpenModal, setOpenModalVisitorInformation } = useOpenModalStore();
  const { setErrorMessage } = useToastStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/user/login`,
        {
          method: "POST",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();

      if (data?.message === "Unauthorized!")
        setErrorMessage("Invalid credentials!");
      if (data.token) {
        const cookies = createTokenCookies(data.token);

        cookies && setTokenCookies(cookies);
        setOpenModal(false);
        redirect("/");
        reset();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className=" flex flex-col gap-4 py-1">
      <h2 className="text-white text-xl md:text-2xl text-center">
        In order to go further and enjoy more
        <span className="text-red-600 font-bold"> Marvelous</span> Contents
      </h2>
      <div className="flex flex-col items-center gap-2">
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
        <span> {errorEmail}</span>
        <div></div>
      </div>
      <span className="text-white text-xl md:text-2xl text-center">Or</span>
      <h2 className="text-white text-xl md:text-2xl text-center">Login</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 justify-center mx-auto w-3/4"
      >
        <Input
          register={register}
          name="email"
          label="Email"
          type="text"
          required={true}
          error={errors.email}
          errorMessage={errorEmail}
        />
        <Input
          register={register}
          name="password"
          label="Password"
          type="password"
          required={true}
          error={errors.email}
          errorMessage={errorEmail}
        />
        <button className="btn btn-marvel self-start" type="submit">
          LOGIN
        </button>
        <div className="flex flex-col gap-5">
          <div
            onClick={() => {
              setOpenModal(false);
              navigate("/signup");
              // Navigate({ to: "/signup" });
            }}
            className="hover:text-primary transition-colors text-white cursor-pointer"
          >
            Not a member yet? Sign up for free
          </div>
          <div
            onClick={() => {
              setOpenModal(false);
              navigate("/forgotten-password");
              // Navigate({ to: "/signup" });
            }}
            className="hover:text-primary transition-colors text-white cursor-pointer"
          >
            Did you forget your password?
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
