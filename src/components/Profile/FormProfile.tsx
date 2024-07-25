import React, { useState } from "react";
import { UserInterface } from "../../types";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserIcon } from "@heroicons/react/24/solid";
import Input from "../Form/Input";

export type FormProfileValues = {
  username: string;
  email: string;
  password: string;
  newPassword: string;
  confirmNewPassword: string;
};
const FormProfile = ({ userData }: { userData: UserInterface }) => {
  const [errorUsername, setErrorUsername] = useState<string>("");
  const [errorEmail, setErrorEmail] = useState<string>("");
  const [errorPass, setErrorPass] = useState<string>("");
  const [errorNewPass, setErrorNewPass] = useState<string>("");
  const [errorConfirmPass, setErrorConfirmPass] = useState<string>("");
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm<FormProfileValues>({
    values: {
      username: userData.username ?? "",
      email: userData.email ?? "",
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit: SubmitHandler<FormProfileValues> = async (values) => {
    console.log(values);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-3/3 mx-auto flex flex-col gap-5 lg:w-2/3"
    >
      <h2 className=" my-6 text-center text-2xl font-bold text-white">
        {userData.username}
      </h2>
      <div className="flex flex-col gap-6">
        <Input
          register={register}
          name="username"
          label="Username"
          required={false}
          error={errors.username}
          type="text"
          errorMessage={errorUsername}
        />
        <Input
          register={register}
          name="email"
          label="Email"
          required={false}
          error={errors.email}
          type="email"
          errorMessage={errorEmail}
        />
        <div className="lex flex-col gap-4">
          <Input
            register={register}
            name="password"
            label="Password"
            required={false}
            error={errors.password}
            type="password"
            errorMessage={errorPass}
          />
          <Input
            register={register}
            name="newPassword"
            label="New password"
            required={false}
            error={errors.newPassword}
            type="password"
            errorMessage={errorNewPass}
          />
          <Input
            register={register}
            name="confirmPassword"
            label="Confirm new password"
            required={false}
            error={errors.confirmNewPassword}
            type="password"
            errorMessage={errorConfirmPass}
          />
        </div>
        <button
          disabled={!isDirty}
          className="btn btn-marvel self-start"
          type="submit"
        >
          VALIDATE
        </button>
      </div>
    </form>
  );
};

export default FormProfile;
