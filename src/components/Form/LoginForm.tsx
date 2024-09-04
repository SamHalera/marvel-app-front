import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { redirect, useNavigate } from "react-router-dom";
import Input from "./Input";
import { useTokenCookiesStore } from "../../stores/tokenCookies";
import { createTokenCookies } from "../../libs/utils";
import { useOpenModalStore } from "../../stores/openModal";
import { useToastStore } from "../../stores/toast";

export type LoginFormValues = {
  email: string;
  password: string;
};
const LoginForm = () => {
  const [errorEmail, setErrorEmail] = useState<string>("");
  const { setTokenCookies } = useTokenCookiesStore();
  const { setOpenModal } = useOpenModalStore();
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
    } catch (error) {}
  };
  return (
    <div className=" flex flex-col gap-6 py-4">
      <h2 className="text-white text-xl md:text-2xl text-center">
        Please login if you want to go further and enjoy more{" "}
        <span className="text-red-600 font-bold">Marvelous</span> Contents
      </h2>
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
        <div className="boutons">
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
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
