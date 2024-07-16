import React, { SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { baseAPIUrl } from "../../api";
import Input from "./Input";
import { useUserCookiesStore } from "../../stores/userCookies";
import { createUserCookies } from "../../libs/utils";

export type LoginFormValues = {
  email: string;
  password: string;
};
const LoginForm = ({
  setOpenModal,
}: {
  setOpenModal: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [errorEmail, setErrorEmail] = useState<string>("");
  const [errorPass, setErrorPass] = useState<string>("");
  const { setUserCookies } = useUserCookiesStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    try {
      const response = await fetch(`${baseAPIUrl}/user/login`, {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (data.token) {
        const cookies = createUserCookies(data);

        cookies && setUserCookies(JSON.parse(cookies));
        setOpenModal(false);
        navigate("/");
        reset();
      }
    } catch (error) {}
  };
  return (
    <div className=" flex flex-col gap-6 py-4">
      <h2 className="text-white text-2xl">
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
