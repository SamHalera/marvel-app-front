import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "./Input";
import { baseAPIUrl } from "../../api";
import { redirect } from "react-router-dom";
import { toast } from "sonner";

export type SignUpFormValues = {
  username: string;
  email: string;
  password: string;
};

const SignUpForm = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [errorUsername, setErrorUsername] = useState<string>("");
  const [errorEmail, setErrorEmail] = useState<string>("");
  const [errorPass, setErrorPass] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<SignUpFormValues>();

  console.log(errors);
  const onSubmit: SubmitHandler<SignUpFormValues> = async (values) => {
    console.log(values);
    try {
      const response = await fetch(`${baseAPIUrl}/user/signup`, {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      console.log(data);
      if (data.status === 201) {
        redirect("/login");
      } else {
        if (data?.message === "This email already exists!") {
          setIsError(true);
          setErrorEmail(
            "This email already has an account, please use another one :)"
          );
        }
      }
    } catch (error) {
      console.error("error==>", error);
    }
  };
  return (
    <div className="form-wrapper flex h-auto w-full flex-col gap-4 items-center justify-center rounded-lg bg-black bg-opacity-60 pb-8 md:m-auto md:w-2/3 lg:h-3/4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <Input
          register={register}
          label={"Username"}
          name="username"
          required={true}
          error={errors.username}
          errorMessage={errorUsername}
          type="text"
        />
        <Input
          register={register}
          label={"Email"}
          name="email"
          required={true}
          error={errors.email}
          errorMessage={errorEmail}
          type="email"
        />
        <Input
          register={register}
          label={"Password"}
          name="password"
          required={true}
          error={errors.password}
          errorMessage={errorPass}
          type="password"
        />

        <button className="btn btn-marvel" type="submit">
          SIGN UP
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
